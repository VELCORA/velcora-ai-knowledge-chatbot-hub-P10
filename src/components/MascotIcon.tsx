import React from 'react';

interface MascotIconProps {
  className?: string;
  size?: number;
}

export const MascotIcon: React.FC<MascotIconProps> = ({
  className = '',
  size = 28,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-110"
      >
        {/* Soft Shadow */}
        <ellipse cx="50" cy="92" rx="34" ry="6" fill="black" fillOpacity="0.18" />

        {/* Left Ear - Letter 'A' antenna */}
        <path
          d="M 30 38 L 27 10 L 37 10 L 34 38 Z"
          fill="#18181b"
          stroke="#09090b"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M 28 20 L 36 20"
          stroke="#f4f4f5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Right Ear - Letter 'I' antenna with top/bottom bars */}
        <path
          d="M 67 10 L 77 10 M 72 10 L 72 38 M 67 36 L 77 36"
          stroke="#18181b"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cute Tail curled on bottom right */}
        <path
          d="M 72 78 C 88 82, 94 65, 88 56 C 85 52, 80 54, 82 59 C 85 66, 78 72, 70 70"
          fill="#18181b"
          stroke="#09090b"
          strokeWidth="1"
        />

        {/* Fluffy Main Body */}
        <rect
          x="18"
          y="28"
          width="64"
          height="60"
          rx="26"
          fill="#18181b"
        />

        {/* White Plush Belly Band */}
        <rect
          x="18"
          y="50"
          width="64"
          height="18"
          fill="#fafafa"
        />

        {/* Band stitch line details */}
        <line x1="10" y1="59" x2="20" y2="59" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="59" x2="90" y2="59" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />

        {/* "velcora" text stitched on white band */}
        <text
          x="50"
          y="63"
          textAnchor="middle"
          fill="#09090b"
          fontSize="8.5"
          fontFamily="monospace, sans-serif"
          fontWeight="bold"
          letterSpacing="2"
        >
          velcora
        </text>

        {/* Shiny Black Button Eyes */}
        <circle cx="37" cy="42" r="5" fill="#09090b" />
        <circle cx="35.5" cy="40.5" r="1.5" fill="#ffffff" />
        
        <circle cx="63" cy="42" r="5" fill="#09090b" />
        <circle cx="61.5" cy="40.5" r="1.5" fill="#ffffff" />

        {/* Cute Nose / Whiskers micro accents */}
        <path d="M 47 47 L 50 49 L 53 47" stroke="#3f3f46" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 23 44 L 29 45 M 23 48 L 28 47" stroke="#3f3f46" strokeWidth="1" strokeLinecap="round" />
        <path d="M 77 44 L 71 45 M 77 48 L 72 47" stroke="#3f3f46" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
};
