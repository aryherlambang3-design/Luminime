import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = "", size = 140, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Anime Character Image */}
      <div
        className="relative flex-shrink-0 overflow-hidden rounded-3xl"
        style={{
          width: size,
          height: size,
          boxShadow: "0 0 20px 4px rgba(236, 72, 153, 0.5), 0 0 40px 8px rgba(236, 72, 153, 0.2)",
          border: "1.5px solid rgba(236, 72, 153, 0.4)",
          background: "#000",
        }}
      >
        <Image
          src="/logo.png"
          alt="LumineStream Logo"
          fill
          className="object-contain object-bottom scale-[1.9]"
          priority
        />
      </div>

      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            LumineStream
          </span>
          <span className="text-[10px] sm:text-xs text-pink-300">Your Anime Paradise</span>
        </div>
      )}
    </div>
  );
}

// Icon only version (untuk navbar mobile, dll)
export function LogoIcon({ className = "", size = 90 }: { className?: string; size?: number }) {
  return <Logo className={className} size={size} showText={false} />;
}
