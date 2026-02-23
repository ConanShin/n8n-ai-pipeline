import React from 'react';
import SocialButton, { SocialButtonProps } from '../atoms/SocialButton';

export interface SocialLoginGroupProps {
  providers: Omit<SocialButtonProps, 'onClick'> & { onClick?: () => void }[];
}

const SocialLoginGroup: React.FC<SocialLoginGroupProps> = ({ providers }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {providers.map((provider) => (
        <SocialButton
          key={provider.provider} // Assuming provider name is unique
          provider={provider.provider}
          icon={provider.icon}
          onClick={provider.onClick || (() => {})}
          disabled={provider.disabled}
        />
      ))}
    </div>
  );
};

export default SocialLoginGroup;
