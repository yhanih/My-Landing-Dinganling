import React from 'react';
import { Card } from '@reava/ui';

const cohorts = [
  { channel: 'TikTok Creators', lift: '+32%', resonance: 'High', velocity: '3.2x' },
  { channel: 'Community Drops', lift: '+21%', resonance: 'Medium', velocity: '2.4x' },
  { channel: 'Affiliate Partners', lift: '+18%', resonance: 'High', velocity: '1.9x' },
  { channel: 'Influencer UGC', lift: '+27%', resonance: 'High', velocity: '2.8x' },
];

const Analytics = () => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-semibold text-neutral-50">Attribution intelligence</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Understand which trust loops are compounding revenue and where the promoter network needs reinforcement.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/5 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold text-neutral-50">Cohort lift</h2>
          <p className="text-sm text-neutral-400">Last 30 days vs baseline</p>
          <div className="mt-6 space-y-4">
            {cohorts.map((cohort) => (
              <div key={cohort.channel} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-50">{cohort.channel}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-200">Resonance: {cohort.resonance}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary-100">{cohort.lift}</p>
                  <p className="text-xs text-neutral-400">Velocity {cohort.velocity}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/5 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold text-neutral-50">Momentum map</h2>
          <p className="text-sm text-neutral-400">Cross-network trust indicators</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-sm font-medium text-neutral-300">Promoter retention</p>
              <p className="mt-3 text-3xl font-semibold text-neutral-50">94%</p>
              <p className="mt-1 text-xs text-primary-200">+6% vs last month</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-sm font-medium text-neutral-300">Verified conversions</p>
              <p className="mt-3 text-3xl font-semibold text-neutral-50">68.4%</p>
              <p className="mt-1 text-xs text-primary-200">+3.1% vs last month</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-sm font-medium text-neutral-300">Avg. payout speed</p>
              <p className="mt-3 text-3xl font-semibold text-neutral-50">37m</p>
              <p className="mt-1 text-xs text-primary-200">Instant for top promoters</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-sm font-medium text-neutral-300">Trust score</p>
              <p className="mt-3 text-3xl font-semibold text-neutral-50">92/100</p>
              <p className="mt-1 text-xs text-primary-200">Best-in-class</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
