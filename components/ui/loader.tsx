import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'tactical' | 'minimal';
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ className, size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-3',
        className,
      )}
    >
      <div
        className={cn(
          'border-4 border-orchi-gray rounded-full animate-spin',
          'border-t-orchi-red',
          sizeClasses[size],
        )}
      />
      {text && (
        <p className={cn('text-orchi-light', textSizeClasses[size])}>{text}</p>
      )}
    </div>
  );
};

export default Loader;
