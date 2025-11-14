import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';
import Overview from '../pages/Overview.jsx';
import Campaigns from '../pages/Campaigns.jsx';
import Analytics from '../pages/Analytics.jsx';
import Settings from '../pages/Settings.jsx';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-surface/80 via-background to-background/90 text-neutral-100">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-background/60 p-6 sm:p-10">
          <Routes>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
