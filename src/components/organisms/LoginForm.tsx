import React from 'react';
import { InputField, PrimaryButton, Divider, SocialLoginButton } from '../atoms';
import { SocialLoginGroup } from '../molecules';

export interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error = null }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md flex flex-col"
      role="form"
      aria-label="User Login Form"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <InputField 
          type="email" 
          label="Email address" 
          placeholder="you@example.com" 
          required 
          autoComplete="email"
        />
        <InputField 
          type="password" 
          label="Password" 
          placeholder="••••••••" 
          required 
          autoComplete="current-password"
        />
      </div>

      <PrimaryButton type="submit" label="Sign in" isLoading={isLoading} />

      <Divider />

      <SocialLoginGroup />
    </form>
  );
};
