import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary-600`} />
    </div>
  );
};

export default Loading; 