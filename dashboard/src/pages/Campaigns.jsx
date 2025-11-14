import React from 'react';
import { Card, Button } from '@reava/ui';

const campaigns = [
  {
    name: 'Influencer Pilot 2025',
    status: 'Live',
    budget: '$120k',
    cpa: '$12.40',
    reach: '2.4M',
    updated: '3m ago',
  },
  {
    name: 'Launch Partners',
    status: 'Scaling',
    budget: '$86k',
    cpa: '$9.85',
    reach: '1.6M',
    updated: '12m ago',
  },
  {
    name: 'Creator Pods',
    status: 'Experiment',
    budget: '$42k',
    cpa: '$14.10',
    reach: '940k',
    updated: '21m ago',
  },
];

const Campaigns = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-50">Campaign orchestration</h1>
          <p className="text-sm text-neutral-400">
            Align the growth engine across marketers, promoters, and shared conversion touchpoints.
          </p>
        </div>
        <Button size="sm" className="shadow-card">
          New campaign
        </Button>
      </div>

      <Card className="border-white/5 bg-surface/80 p-0">
        <div className="overflow-hidden rounded-2xl">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5 text-left text-sm uppercase tracking-[0.3em] text-neutral-400">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">CPA</th>
                <th className="px-6 py-4 font-medium">Reach</th>
                <th className="px-6 py-4 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-neutral-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.name} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold text-neutral-50">{campaign.name}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-100">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{campaign.budget}</td>
                  <td className="px-6 py-4">{campaign.cpa}</td>
                  <td className="px-6 py-4">{campaign.reach}</td>
                  <td className="px-6 py-4 text-neutral-400">{campaign.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Campaigns;
