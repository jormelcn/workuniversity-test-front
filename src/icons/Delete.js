import React from "react";

export default function Delete({ color, srtoke, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill= "none"
      viewBox="0 0 24 24"
      width={width ? width : "none"}
       stroke={color ? color : "currentColor"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={srtoke ? srtoke : 2}
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
