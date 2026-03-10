import React, { useState } from 'react';
import { LoginForm } from '../organisms';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (Math.random() > 0.7) {
        setError("Invalid email or password.");
      }
    }, 1500);
  };

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Login Page"
    >
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
    </main>
  );
};
