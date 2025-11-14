import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@reava/ui';

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-surface/70 to-background">
      <Card className="w-full max-w-xl border-white/5 bg-surface/80 p-10 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-primary-200">Access limited</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-50">You need elevated clearance</h1>
        <p className="mt-3 text-sm text-neutral-400">
          This area of the dashboard is restricted. Request an admin upgrade or return to the control center overview.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button as={Link} to="/overview" className="sm:w-48">
            Back to overview
          </Button>
          <Button
            as="a"
            href="mailto:support@reava.co"
            variant="outline"
            className="sm:w-48 border-white/20 text-neutral-100 hover:bg-white/10"
          >
            Contact admin
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Unauthorized;
