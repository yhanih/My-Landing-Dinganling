import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@reava/ui';
import { useAuth } from '@reava/hooks';

const TopBar = () => {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/5 bg-background/80 px-6 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-primary-200">Realtime performance</p>
        <h2 className="text-xl font-semibold text-neutral-50">Welcome back, {user?.user_metadata?.full_name || user?.email}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-200 transition-all duration-200 hover:bg-white/10 lg:inline-flex"
        >
          View site
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => logout()}
          className="border-white/20 text-neutral-100 hover:bg-white/10"
        >
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
