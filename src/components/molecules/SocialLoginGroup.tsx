import React from 'react';
import { SocialLoginButton } from '../atoms';

export const SocialLoginGroup: React.FC = () => {
  return (
    <div 
      className="grid grid-cols-2 gap-4 w-full sm:flex sm:flex-col sm:gap-3"
      role="group"
      aria-label="Social Login Options"
    >
      <SocialLoginButton provider="Google" icon="G" />
      <SocialLoginButton provider="Apple" icon="A" />
      <SocialLoginButton provider="GitHub" icon="GH" />
      <SocialLoginButton provider="Microsoft" icon="M" />
    </div>
  );
};
