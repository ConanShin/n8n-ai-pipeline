import React from 'react';
import LoginForm from '../organisms/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login submitted:', data);
    // Here you would typically dispatch an action or call an API
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" role="main" aria-label="Login Page">
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
};

export default LoginPage;
