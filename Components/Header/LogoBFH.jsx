import React from "react";

const LogoBFH = ({ className }) => (
  <svg className={className} viewBox="-1 0 63 96" xmlns="http://www.w3.org/2000/svg">
    <path d="M46.9,47.5c0,0-0.3-0.1-0.3-0.4c0-0.2,0.1-0.3,0.2-0.4c7-4.4,11.3-12.4,11.3-21.7c0-13.8-11.2-25-25-25H3.5C1.6,0,0,1.6,0,3.5v89C0,94.4,1.6,96,3.5,96l33.1,0c13.8,0,25-11.2,25-25C61.6,60.2,55.9,51,46.9,47.5z" />
    <path
      className={`${className} accent`}
      style={{ fill: "white" }}
      d="M33.8,78.2c0,0.4-0.4,0.8-0.8,0.8h-1.3c-0.4,0-0.8-0.4-0.8-0.8v-8.6h-7.8v8.6c0,0.4-0.4,0.8-0.8,0.8H21c-0.4,0-0.8-0.4-0.8-0.8V58.1c0-0.4,0.4-0.8,0.8-0.8h1.3c0.4,0,0.8,0.4,0.8,0.8V67h7.8v-8.9c0-0.4,0.4-0.8,0.8-0.8H33c0.4,0,0.8,0.4,0.8,0.8V78.2z M33.8,18.6c0,0.4-0.4,0.8-0.8,0.8H23v7h8.5c0.4,0,0.8,0.4,0.8,0.8v0.9c0,0.4-0.4,0.8-0.8,0.8H23v8.9c0,0.4-0.4,0.8-0.8,0.8h-1.3c-0.4,0-0.8-0.4-0.8-0.8V17.7c0-0.4,0.4-0.8,0.8-0.8H33c0.4,0,0.8,0.4,0.8,0.8V18.6z"
    />
  </svg>
);

export default LogoBFH;