import React from 'react';
import { Card } from '@reava/ui';

const StatCard = ({ title, value, delta, trend }) => {
  return (
    <Card className="group border-white/5 bg-surface/70 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-neutral-50">{value}</p>
        </div>
        <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-200">
          {trend}
        </span>
      </div>
      <p className="mt-6 text-sm text-neutral-300">
        <span className="font-semibold text-primary-200">{delta}</span> vs previous cycle
      </p>
    </Card>
  );
};

export default StatCard;
