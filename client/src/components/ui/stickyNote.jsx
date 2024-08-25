import React from "react";

const StickyNote = ({ variant = "peach" }) => {
  const colorVariants = {
    pink: "#FF9AA2",
    lightPink: "#FFB7B2",
    peach: "#FFDAC1",
    mintGreen: "#E2F0CB",
    aqua: "#B5EAD7",
    lavender: "#C7CEEA",
  };

  const color = colorVariants[variant] || colorVariants.peach;

  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="2" dy="-2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M5 0 Q0 0 0 5 V55 Q0 60 5 60 H200 V0 Z"
        fill={color}
        filter="url(#shadow)"
      />
    </svg>
  );
};

export default StickyNote;
