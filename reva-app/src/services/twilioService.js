import twilio from 'twilio';

let connectionSettings = null;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=twilio',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.account_sid || !connectionSettings.settings.api_key || !connectionSettings.settings.api_key_secret)) {
    throw new Error('Twilio not connected');
  }
  return {
    accountSid: connectionSettings.settings.account_sid,
    apiKey: connectionSettings.settings.api_key,
    apiKeySecret: connectionSettings.settings.api_key_secret,
    phoneNumber: connectionSettings.settings.phone_number
  };
}

export async function getTwilioClient() {
  const { accountSid, apiKey, apiKeySecret } = await getCredentials();
  return twilio(apiKey, apiKeySecret, {
    accountSid: accountSid
  });
}

export async function getTwilioFromPhoneNumber() {
  const { phoneNumber } = await getCredentials();
  return phoneNumber;
}

// SMS notification service
export const smsService = {
  // Send SMS notification
  async sendSMS(to, body) {
    try {
      const client = await getTwilioClient();
      const fromNumber = await getTwilioFromPhoneNumber();
      
      const message = await client.messages.create({
        body: body,
        from: fromNumber,
        to: to
      });
      
      console.log('SMS sent successfully:', message.sid);
      return { success: true, messageId: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { success: false, error: error.message };
    }
  },

  // Send campaign alert to marketer
  async sendCampaignAlert(phoneNumber, campaignTitle, alertType, details) {
    const messages = {
      budget_low: `🚨 REVA Alert: Your campaign "${campaignTitle}" has less than 10% budget remaining. ${details}`,
      budget_depleted: `❌ REVA Alert: Your campaign "${campaignTitle}" budget is depleted and has been paused. ${details}`,
      high_activity: `📈 REVA Success: Your campaign "${campaignTitle}" is getting high engagement! ${details}`,
      milestone: `🎯 REVA Milestone: Your campaign "${campaignTitle}" has reached ${details}!`
    };

    const body = messages[alertType] || `REVA Update: ${campaignTitle} - ${details}`;
    return await this.sendSMS(phoneNumber, body);
  },

  // Send earning notification to promoter
  async sendEarningNotification(phoneNumber, amount, campaignTitle) {
    const body = `💰 REVA Earnings: You've earned $${amount} from a click on "${campaignTitle}"! Check your dashboard for details.`;
    return await this.sendSMS(phoneNumber, body);
  },

  // Send payout confirmation
  async sendPayoutConfirmation(phoneNumber, amount, method) {
    const body = `✅ REVA Payout: Your payout of $${amount} has been processed via ${method}. It should arrive within 2-3 business days.`;
    return await this.sendSMS(phoneNumber, body);
  },

  // Send welcome message
  async sendWelcomeMessage(phoneNumber, userType, name) {
    const messages = {
      marketer: `Welcome to REVA, ${name}! 🚀 You're all set to create performance marketing campaigns. Login to your dashboard to get started.`,
      promoter: `Welcome to REVA, ${name}! 💰 Start earning by promoting campaigns. Check your dashboard for available opportunities.`
    };

    const body = messages[userType] || `Welcome to REVA, ${name}! Thank you for joining our performance marketing platform.`;
    return await this.sendSMS(phoneNumber, body);
  },

  // Send verification code
  async sendVerificationCode(phoneNumber, code) {
    const body = `Your REVA verification code is: ${code}. This code expires in 10 minutes.`;
    return await this.sendSMS(phoneNumber, body);
  },

  // Send daily summary to marketer
  async sendDailySummary(phoneNumber, stats) {
    const body = `📊 REVA Daily Summary:
Campaigns: ${stats.activeCampaigns}
Clicks Today: ${stats.clicksToday}
Spent Today: $${stats.spentToday}
Remaining Budget: $${stats.remainingBudget}`;
    return await this.sendSMS(phoneNumber, body);
  },

  // Send weekly earnings summary to promoter
  async sendWeeklyEarnings(phoneNumber, stats) {
    const body = `📈 REVA Weekly Earnings:
Total Clicks: ${stats.totalClicks}
Valid Clicks: ${stats.validClicks}
Earnings: $${stats.totalEarnings}
Top Campaign: ${stats.topCampaign}`;
    return await this.sendSMS(phoneNumber, body);
  }
};