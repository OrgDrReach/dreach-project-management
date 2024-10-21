import React from 'react';

export const DottedGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full grid grid-cols-[repeat(20,1fr)] gap-4">
        {Array.from({ length: 400 }).map((_, index) => (
          <div 
            key={`dot-${index}`} 
            className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 opacity-30"
          />
        ))}
      </div>
    </div>
  );
};
