import React from 'react';
import { LoginForm } from '../organisms/LoginForm';

export const LoginPage: React.FC = () => {
  const handleLoginSubmit = (e: React.FormEvent) => {
    // Handling submission in parent page component
    alert('Login successful!');
  };

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8"
      role="main"
      aria-label="Login Page"
    >
      <LoginForm onSubmit={handleLoginSubmit} />
    </main>
  );
};