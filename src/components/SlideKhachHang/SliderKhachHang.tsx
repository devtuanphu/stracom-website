import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const SliderKhachHang = (listlogo: any) => {
  const baseUrl = process.env.URL_API;

  return (
    <div className="sliderContainer flex items-center overflow-hidden max-h-[100px]">
      <Marquee
        speed={50} // Điều chỉnh tốc độ cuộn
        direction="left" // Hướng cuộn, "left" hoặc "right"
        pauseOnHover={false} // Tạm dừng khi hover
      >
        {listlogo.listlogo.map((logo: any, index: any) => {
          return (
            <div
              key={index}
              className="logo-item flex items-center justify-center h-[100px] max-h-[100px] mx-4"
            >
              <Image
                src={`${baseUrl}${logo.urlImage.data.attributes.url}` || "/"}
                alt={logo.alt}
                layout="responsive"
                width={200}
                height={50}
                objectFit="cover"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default SliderKhachHang;
