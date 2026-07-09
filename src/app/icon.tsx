import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="50" cy="45" rx="30" ry="32" fill="#FFB6D9" />
          <path
            d="M50 18 Q50 10 55 15 Q58 18 55 22"
            fill="#FFB6D9"
            stroke="#FF8DC7"
            strokeWidth="2"
          />
          <ellipse cx="40" cy="45" rx="6" ry="8" fill="#FFF" />
          <ellipse cx="60" cy="45" rx="6" ry="8" fill="#FFF" />
          <ellipse cx="40" cy="47" rx="4" ry="6" fill="#8B4513" />
          <ellipse cx="60" cy="47" rx="4" ry="6" fill="#8B4513" />
          <circle cx="39" cy="45" r="2.5" fill="#FFF" />
          <circle cx="59" cy="45" r="2.5" fill="#FFF" />
          <path
            d="M46 57 Q50 59 54 57"
            stroke="#FF8DC7"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="28" cy="65" r="4" fill="#FFF" />
          <circle cx="28" cy="65" r="2.5" fill="#FFD93D" />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
