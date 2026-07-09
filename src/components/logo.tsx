import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = "", size = 160, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Anime Character Image */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.jpg"
          alt="LumineStream Logo"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>
      
      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            LumineStream
          </span>
          <span className="text-xs text-pink-300">Your Anime Paradise</span>
        </div>
      )}
    </div>
  );
}

// Icon only version (untuk navbar mobile, dll)
export function LogoIcon({ className = "", size = 80 }: { className?: string; size?: number }) {
  return <Logo className={className} size={size} showText={false} />;
}
