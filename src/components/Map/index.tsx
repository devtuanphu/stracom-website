import React from "react";

interface MapProps {
  src: string;
  className?: string; // Thêm prop className
}

const Map: React.FC<MapProps> = ({ src, className }) => {
  return (
    <div className={className}>
      {" "}
      {/* Bọc iframe trong một div */}
      <iframe
        src={src}
        width="100%" // Đặt width là 100%
        height="100%" // Đặt height là auto
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

export default Map;
