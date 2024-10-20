import React from 'react';

interface DottedGridProps {
  className?: string;
}

export const DottedGrid: React.FC<DottedGridProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700 bg-[size:30px_30px] [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.8))] dark:[mask-image:linear-gradient(0deg,#1f2937,rgba(31,41,55,0.8))]"></div>
    </div>
  );
};
