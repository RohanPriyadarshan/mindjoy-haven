import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If still loading, you can return a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If auth is required and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If auth is NOT required and user is logged in, redirect to home
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the children
  return <>{children}</>;
};

export default AuthGuard;
