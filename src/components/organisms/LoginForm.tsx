import React, { useState } from 'react';
import { InputField } from '../molecules/InputField';
import { Button } from '../atoms/Button';
import { Divider } from '../atoms/Divider';
import { SocialLoginButton } from '../atoms/SocialLoginButton';

export interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(e);
    }, 1500);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-6 bg-white p-8 rounded-xl shadow-md"
      role="form"
      aria-label="Login Form"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <InputField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" disabled={isLoading} />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
      </div>

      <Button
        label="Sign in"
        type="submit"
        isLoading={isLoading}
      />

      <Divider />

      <div className="flex flex-col gap-3">
        <SocialLoginButton
          provider="Google"
          icon="google"
          disabled={isLoading}
        />
        <SocialLoginButton
          provider="GitHub"
          icon="github"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};