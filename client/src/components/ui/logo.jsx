import React from 'react';
import { Link } from 'wouter';

export function Logo({ className = '', size = 'md', withText = true }) {
  // Size variants
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  // Text size variants
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <Link href="/" className={`flex items-center gap-x-2 ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background */}
          <circle cx="16" cy="16" r="15" fill="url(#logo-grad1)" />
          
          {/* Main O shape */}
          <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" fill="url(#logo-innerGrad)" />
          
          {/* Decorative elements */}
          <circle cx="16" cy="16" r="11" stroke="#4F46E5" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="logo-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            
            <radialGradient id="logo-innerGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {withText && (
        <div className={`font-bold ${textSizes[size]} tracking-tight`}>
          <span className="text-white">dev</span>
          <span className="text-indigo-500">O</span>
          <span className="text-devoops-blue">o</span>
          <span className="text-devoops-cyan">p</span>
          <span className="text-white">s</span>
        </div>
      )}
    </Link>
  );
}

export default Logo;