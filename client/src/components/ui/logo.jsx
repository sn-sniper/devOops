import React from "react";
import { Link } from "wouter";
import iconPath from "@/assets/ICON.png";

export function Logo({ className = "", size = "md", withText = true }) {
  // Size variants
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  // Text size variants
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <Link href="/" className={`flex items-center gap-x-2 ${className}`}>
      {/* <div className={`relative ${sizes[size]}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
         
          <circle cx="16" cy="16" r="15" fill="url(#logo-grad1)" />

          
          <circle
            cx="16"
            cy="16"
            r="8"
            stroke="white"
            strokeWidth="2"
            fill="url(#logo-innerGrad)"
          />

          
          <circle
            cx="16"
            cy="16"
            r="11"
            stroke="#4F46E5"
            strokeWidth="1"
            strokeDasharray="2 2"
            fill="none"
          />

          
          <defs>
            <linearGradient id="logo-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <radialGradient
              id="logo-innerGrad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </div> */}

      {withText && (
        <div
          className={`font-bold ${textSizes[size]} tracking-tight uppercase flex gap-[2px] [align-items:center]`}
        >
          <span className="text-white">d</span>
          <span className="text-white">e</span>
          <span className="text-white">v</span>
          <img
            src={iconPath}
            alt="DevOops Icon"
            className="w-10 h-full object-contain filter brightness-0 invert"
          />
          <span className="text-white">p</span>
          <span className="text-white">s</span>
        </div>
      )}
    </Link>
  );
}

export default Logo;
