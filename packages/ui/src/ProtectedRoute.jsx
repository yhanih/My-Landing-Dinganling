import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@reava/hooks';

const ProtectedRoute = ({ children, roles }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center bg-surface text-neutral-100">
        <span className="animate-pulse text-sm uppercase tracking-[0.3em] text-neutral-400">
          Loading Reava
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
