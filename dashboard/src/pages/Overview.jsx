import React from 'react';
import StatCard from '../components/StatCard.jsx';
import { Card, Button } from '@reava/ui';

const statBlocks = [
  { title: 'Total Revenue', value: '$482.2K', delta: '+18.4%', trend: '▲ Momentum' },
  { title: 'Active Campaigns', value: '87', delta: '+6.2%', trend: '● Steady' },
  { title: 'Avg. Conversion', value: '4.8%', delta: '+1.2%', trend: '▲ Improving' },
  { title: 'New Promoters', value: '126', delta: '+9.4%', trend: '▲ Surging' },
];

const recentSignals = [
  {
    name: 'Creator Collectives',
    status: 'Live',
    kpis: '7.2k engagements • $52k revenue',
    delta: '+12% WoW',
  },
  {
    name: 'Gamer Link Drops',
    status: 'Scaling',
    kpis: '3.9k engagements • $21k revenue',
    delta: '+6% WoW',
  },
  {
    name: 'Campus Catalysts',
    status: 'Experiment',
    kpis: '1.8k engagements • $8.4k revenue',
    delta: '+21% WoW',
  },
];

const Overview = () => {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold text-neutral-50">Realtime pulse</h1>
        <p className="mt-2 text-sm text-neutral-300">
          Monitor campaign performance, conversion velocity, and the trust loop across the Reava network.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {statBlocks.map((block) => (
            <StatCard key={block.title} {...block} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="border-white/5 bg-surface/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-50">Engagement flow</h2>
              <p className="text-sm text-neutral-400">Rolling 14 day view across all live funnels</p>
            </div>
            <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-neutral-100">
              Export report
            </Button>
          </div>
          <div className="mt-10 h-64 rounded-2xl border border-dashed border-white/10 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10"></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Clicks → Leads</p>
              <p className="mt-2 text-2xl font-semibold text-neutral-100">32.4%</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Lead → Signups</p>
              <p className="mt-2 text-2xl font-semibold text-neutral-100">18.9%</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Signups → Revenue</p>
              <p className="mt-2 text-2xl font-semibold text-neutral-100">11.4%</p>
            </div>
          </div>
        </Card>

        <Card className="border-white/5 bg-surface/80 p-6">
          <h2 className="text-xl font-semibold text-neutral-50">Signals feed</h2>
          <p className="mt-1 text-sm text-neutral-400">Fresh cohorts powering the trust graph</p>
          <div className="mt-6 space-y-4">
            {recentSignals.map((signal) => (
              <div key={signal.name} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-50">{signal.name}</p>
                    <p className="text-xs uppercase tracking-[0.4em] text-primary-200">{signal.status}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary-100">{signal.delta}</span>
                </div>
                <p className="mt-3 text-sm text-neutral-300">{signal.kpis}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Overview;
