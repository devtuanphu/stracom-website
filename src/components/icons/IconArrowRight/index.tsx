import React from "react";

interface IconArrowRightProps {
  width?: number;
  height?: number;
}
const IconArrowRight: React.FC<IconArrowRightProps> = ({ width, height }) => {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5998 11.3996L13.8373 3.52461C13.4998 3.18711 12.9748 3.18711 12.6373 3.52461C12.2998 3.86211 12.2998 4.38711 12.6373 4.72461L18.9373 11.1371H2.9998C2.5498 11.1371 2.1748 11.5121 2.1748 11.9621C2.1748 12.4121 2.5498 12.8246 2.9998 12.8246H19.0123L12.6373 19.3121C12.2998 19.6496 12.2998 20.1746 12.6373 20.5121C12.7873 20.6621 13.0123 20.7371 13.2373 20.7371C13.4623 20.7371 13.6873 20.6621 13.8373 20.4746L21.5998 12.5996C21.9373 12.2621 21.9373 11.7371 21.5998 11.3996Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconArrowRight;
