import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FFB6D9 0%, #FF8DC7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20%",
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="50" cy="45" rx="30" ry="32" fill="#FFF" opacity="0.95" />
          <path
            d="M35 25 Q30 15 25 20 Q20 25 25 30"
            fill="#FFF"
            stroke="#FFE6F0"
            strokeWidth="2"
            opacity="0.9"
          />
          <path
            d="M50 18 Q50 10 55 15 Q58 18 55 22"
            fill="#FFF"
            stroke="#FFE6F0"
            strokeWidth="2"
            opacity="0.9"
          />
          <path
            d="M65 25 Q70 15 75 20 Q80 25 75 30"
            fill="#FFF"
            stroke="#FFE6F0"
            strokeWidth="2"
            opacity="0.9"
          />
          <ellipse cx="40" cy="45" rx="6" ry="8" fill="#1a1a1a" />
          <ellipse cx="60" cy="45" rx="6" ry="8" fill="#1a1a1a" />
          <ellipse cx="40" cy="47" rx="4" ry="6" fill="#8B4513" />
          <ellipse cx="60" cy="47" rx="4" ry="6" fill="#8B4513" />
          <circle cx="39" cy="44" r="3" fill="#FFF" />
          <circle cx="59" cy="44" r="3" fill="#FFF" />
          <circle cx="41" cy="48" r="1.5" fill="#FFF" opacity="0.8" />
          <circle cx="61" cy="48" r="1.5" fill="#FFF" opacity="0.8" />
          <path
            d="M33 38 Q38 36 43 37"
            stroke="#FFB6D9"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M57 37 Q62 36 67 38"
            stroke="#FFB6D9"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="32" cy="52" rx="5" ry="4" fill="#FFB6D9" opacity="0.6" />
          <ellipse cx="68" cy="52" rx="5" ry="4" fill="#FFB6D9" opacity="0.6" />
          <circle cx="34" cy="52" r="2" fill="#FF8DC7" opacity="0.3" />
          <circle cx="66" cy="52" r="2" fill="#FF8DC7" opacity="0.3" />
          <path
            d="M45 57 Q50 60 55 57"
            stroke="#FFB6D9"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="40" y="70" width="20" height="18" rx="4" fill="#FFF" opacity="0.9" />
          <circle cx="25" cy="68" r="5" fill="#FFF" />
          <circle cx="25" cy="68" r="3" fill="#FFD93D" />
          <circle cx="20" cy="72" r="4" fill="#FFF" />
          <circle cx="20" cy="72" r="2" fill="#FFD93D" />
          <circle cx="30" cy="72" r="4" fill="#FFF" />
          <circle cx="30" cy="72" r="2" fill="#FFD93D" />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
