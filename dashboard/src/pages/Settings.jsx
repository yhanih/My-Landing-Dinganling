import React, { useState } from 'react';
import { Card, Button } from '@reava/ui';
import { useAuth } from '@reava/hooks';

const Settings = () => {
  const { user } = useAuth();
  const [teamNotifications, setTeamNotifications] = useState(true);
  const [autoPayouts, setAutoPayouts] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-50">Operating preferences</h1>
        <p className="mt-2 text-sm text-neutral-400">Personalize the way your team collaborates across Reava.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/5 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold text-neutral-50">Team communication</h2>
          <p className="text-sm text-neutral-400">Decide who hears about campaign shifts, payouts, and experiments.</p>
          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4">
              <span className="text-sm text-neutral-200">Notify team on new promoter approvals</span>
              <input
                type="checkbox"
                checked={teamNotifications}
                onChange={(event) => setTeamNotifications(event.target.checked)}
                className="h-5 w-5 rounded border-white/20 bg-white/10 text-primary-500 focus:ring-primary-300"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4">
              <span className="text-sm text-neutral-200">Enable auto payouts for trusted promoters</span>
              <input
                type="checkbox"
                checked={autoPayouts}
                onChange={(event) => setAutoPayouts(event.target.checked)}
                className="h-5 w-5 rounded border-white/20 bg-white/10 text-primary-500 focus:ring-primary-300"
              />
            </label>
          </div>
          <Button className="mt-6 w-full sm:w-auto">Save preferences</Button>
        </Card>

        <Card className="border-white/5 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold text-neutral-50">Account</h2>
          <p className="text-sm text-neutral-400">Manage credentials and security.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Email</p>
              <p className="mt-2 text-sm font-semibold text-neutral-100">{user?.email}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Role</p>
              <p className="mt-2 text-sm font-semibold text-neutral-100">{user?.role ?? 'marketer'}</p>
            </div>
          </div>
          <Button variant="outline" className="mt-6 w-full justify-center sm:w-auto">
            Request account export
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
