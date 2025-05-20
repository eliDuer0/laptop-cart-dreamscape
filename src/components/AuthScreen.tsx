
import React, { useState } from 'react';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  
  const handleAuthSuccess = () => {
    // The AuthContext will handle the user state update
  };

  // If user is already logged in, don't show the auth screen
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray px-4 py-12">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm 
            onSuccess={handleAuthSuccess} 
            onToggleForm={() => setIsLogin(false)} 
          />
        ) : (
          <SignupForm 
            onSuccess={() => setIsLogin(true)} 
            onToggleForm={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
