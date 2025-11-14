import React, { useState, useEffect } from 'react';
import { supabase } from '@reava/hooks';
import { smsService } from '../services/twilioService';
import { useAuth } from '@reava/hooks';

function NotificationSettings() {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notifications, setNotifications] = useState({
    earnings: true,
    campaigns: true,
    payouts: true,
    weekly_summary: true
  });
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('phone_number, notification_settings')
        .eq('id', user.id)
        .single();

      if (data) {
        setPhoneNumber(data.phone_number || '');
        setNotifications(data.notification_settings || notifications);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: phoneNumber,
          notification_settings: notifications,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const sendTestSMS = async () => {
    if (!phoneNumber) {
      setMessage('Please enter a phone number first.');
      return;
    }

    setTesting(true);
    setMessage('');

    try {
      const result = await smsService.sendSMS(
        phoneNumber,
        'Test message from REVA! Your SMS notifications are working correctly. 🎉'
      );

      if (result.success) {
        setMessage('Test SMS sent successfully! Check your phone.');
      } else {
        setMessage('Failed to send test SMS. Please check your phone number.');
      }
    } catch (error) {
      console.error('Error sending test SMS:', error);
      setMessage('Error sending test SMS. Please try again.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">SMS Notifications</h3>
      
      <div className="mb-6">
        <label className="block text-white/80 mb-2">Phone Number</label>
        <div className="flex gap-2">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50"
          />
          <button
            onClick={sendTestSMS}
            disabled={testing}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {testing ? 'Sending...' : 'Test SMS'}
          </button>
        </div>
        <p className="text-white/60 text-sm mt-1">Include country code (e.g., +1 for US)</p>
      </div>

      <div className="space-y-3 mb-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications.earnings}
            onChange={(e) => setNotifications({...notifications, earnings: e.target.checked})}
            className="w-4 h-4 text-purple-600"
          />
          <span className="text-white">Earning notifications (when you earn from clicks)</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications.campaigns}
            onChange={(e) => setNotifications({...notifications, campaigns: e.target.checked})}
            className="w-4 h-4 text-purple-600"
          />
          <span className="text-white">Campaign alerts (budget warnings, milestones)</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications.payouts}
            onChange={(e) => setNotifications({...notifications, payouts: e.target.checked})}
            className="w-4 h-4 text-purple-600"
          />
          <span className="text-white">Payout confirmations</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications.weekly_summary}
            onChange={(e) => setNotifications({...notifications, weekly_summary: e.target.checked})}
            className="w-4 h-4 text-purple-600"
          />
          <span className="text-white">Weekly performance summaries</span>
        </label>
      </div>

      {message && (
        <div className={`p-3 rounded-lg mb-4 ${message.includes('Error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
          {message}
        </div>
      )}

      <button
        onClick={saveSettings}
        disabled={saving}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {saving ? 'Saving...' : 'Save Notification Settings'}
      </button>
    </div>
  );
}

export default NotificationSettings;