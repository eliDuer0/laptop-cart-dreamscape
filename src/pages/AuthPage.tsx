
import React from 'react';
import AuthScreen from '@/components/AuthScreen';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <AuthScreen />;
};

export default AuthPage;
