import { supabase } from '../lib/supabase';
import { smsService } from './twilioService';

export const notificationService = {
  // Check if user has notifications enabled
  async getUserNotificationSettings(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('phone_number, notification_settings')
        .eq('id', userId)
        .single();

      if (error || !data) return null;
      
      return {
        phoneNumber: data.phone_number,
        settings: data.notification_settings || {}
      };
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return null;
    }
  },

  // Send notification for new earnings
  async notifyEarning(promoterId, amount, campaignTitle) {
    try {
      const userSettings = await this.getUserNotificationSettings(promoterId);
      
      if (!userSettings?.phoneNumber || !userSettings?.settings?.earnings) {
        return { success: false, reason: 'Notifications disabled or no phone number' };
      }

      return await smsService.sendEarningNotification(
        userSettings.phoneNumber,
        amount.toFixed(2),
        campaignTitle
      );
    } catch (error) {
      console.error('Error sending earning notification:', error);
      return { success: false, error: error.message };
    }
  },

  // Send notification for campaign milestones
  async notifyCampaignMilestone(marketerId, campaignTitle, milestone) {
    try {
      const userSettings = await this.getUserNotificationSettings(marketerId);
      
      if (!userSettings?.phoneNumber || !userSettings?.settings?.campaigns) {
        return { success: false, reason: 'Notifications disabled or no phone number' };
      }

      return await smsService.sendCampaignAlert(
        userSettings.phoneNumber,
        campaignTitle,
        'milestone',
        milestone
      );
    } catch (error) {
      console.error('Error sending campaign notification:', error);
      return { success: false, error: error.message };
    }
  },

  // Send budget warning
  async notifyBudgetWarning(marketerId, campaignTitle, remainingBudget, totalBudget) {
    try {
      const userSettings = await this.getUserNotificationSettings(marketerId);
      
      if (!userSettings?.phoneNumber || !userSettings?.settings?.campaigns) {
        return { success: false, reason: 'Notifications disabled or no phone number' };
      }

      const percentage = ((remainingBudget / totalBudget) * 100).toFixed(0);
      const alertType = remainingBudget === 0 ? 'budget_depleted' : 'budget_low';
      const details = remainingBudget === 0 
        ? 'Please add more budget to continue.' 
        : `$${remainingBudget.toFixed(2)} remaining (${percentage}%)`;

      return await smsService.sendCampaignAlert(
        userSettings.phoneNumber,
        campaignTitle,
        alertType,
        details
      );
    } catch (error) {
      console.error('Error sending budget warning:', error);
      return { success: false, error: error.message };
    }
  },

  // Send payout confirmation
  async notifyPayout(promoterId, amount, method = 'Bank Transfer') {
    try {
      const userSettings = await this.getUserNotificationSettings(promoterId);
      
      if (!userSettings?.phoneNumber || !userSettings?.settings?.payouts) {
        return { success: false, reason: 'Notifications disabled or no phone number' };
      }

      return await smsService.sendPayoutConfirmation(
        userSettings.phoneNumber,
        amount.toFixed(2),
        method
      );
    } catch (error) {
      console.error('Error sending payout notification:', error);
      return { success: false, error: error.message };
    }
  },

  // Send welcome message on signup
  async sendWelcome(userId, userType, name) {
    try {
      const userSettings = await this.getUserNotificationSettings(userId);
      
      if (!userSettings?.phoneNumber) {
        return { success: false, reason: 'No phone number provided' };
      }

      return await smsService.sendWelcomeMessage(
        userSettings.phoneNumber,
        userType,
        name || 'User'
      );
    } catch (error) {
      console.error('Error sending welcome message:', error);
      return { success: false, error: error.message };
    }
  },

  // Monitor campaigns for alerts
  async checkCampaignAlerts() {
    try {
      // Get all active campaigns with low budget
      const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('*, profiles!marketer_id(phone_number, notification_settings)')
        .eq('is_active', true)
        .or('remaining_budget.lt.payout_per_click,remaining_budget.lt.budget.mul.0.1');

      if (error || !campaigns) return;

      for (const campaign of campaigns) {
        const profile = campaign.profiles;
        if (profile?.phone_number && profile?.notification_settings?.campaigns) {
          const percentageRemaining = (campaign.remaining_budget / campaign.budget) * 100;
          
          if (campaign.remaining_budget < campaign.payout_per_click) {
            // Budget depleted
            await this.notifyBudgetWarning(
              campaign.marketer_id,
              campaign.title,
              0,
              campaign.budget
            );
          } else if (percentageRemaining < 10) {
            // Low budget warning
            await this.notifyBudgetWarning(
              campaign.marketer_id,
              campaign.title,
              campaign.remaining_budget,
              campaign.budget
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking campaign alerts:', error);
    }
  },

  // Send daily summaries
  async sendDailySummaries() {
    try {
      // Get marketers with daily summary enabled
      const { data: marketers, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'marketer')
        .not('phone_number', 'is', null)
        .eq('notification_settings->>daily_summary', true);

      if (error || !marketers) return;

      for (const marketer of marketers) {
        // Get today's stats
        const today = new Date().toISOString().split('T')[0];
        const { data: stats } = await supabase
          .rpc('get_marketer_daily_stats', {
            marketer_id: marketer.id,
            date: today
          });

        if (stats && marketer.phone_number) {
          await smsService.sendDailySummary(marketer.phone_number, stats);
        }
      }
    } catch (error) {
      console.error('Error sending daily summaries:', error);
    }
  },

  // Send weekly earnings summary
  async sendWeeklySummaries() {
    try {
      // Get promoters with weekly summary enabled
      const { data: promoters, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'promoter')
        .not('phone_number', 'is', null)
        .eq('notification_settings->>weekly_summary', true);

      if (error || !promoters) return;

      for (const promoter of promoters) {
        // Get this week's stats
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        
        const { data: stats } = await supabase
          .rpc('get_promoter_weekly_stats', {
            promoter_id: promoter.id,
            week_start: weekStart.toISOString()
          });

        if (stats && promoter.phone_number) {
          await smsService.sendWeeklyEarnings(promoter.phone_number, stats);
        }
      }
    } catch (error) {
      console.error('Error sending weekly summaries:', error);
    }
  }
};