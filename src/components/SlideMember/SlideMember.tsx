"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import IconArrowRight from "../icons/IconArrowRight";
import IconAngleRight from "../icons/IconAngleRight";
import Link from "next/link";
import { useTranslations } from "next-intl";
interface cardThanhVienProps {
  cardThanhVien: cardThanhVien[];
}
interface cardThanhVien {
  id: number;
  title: string;
  description: string;
  path: string;
  logo: {
    data: {
      attributes: {
        url: string;
        height: number;
        width: number;
      };
    };
  };
}
const Slidemember = (cardThanhVien: cardThanhVienProps) => {
  const baseUrl = process.env.URL_API;
  const t = useTranslations("home");

  // const member = [
  //   {
  //     name: "Irritec",
  //     describe:
  //       "This is a short description about this card.This is a short description about this card.",
  //     urlLogo: "/images/logoDoiTac/logo1.png",
  //     width: 194,
  //     height: 44,
  //   },
  //   {
  //     name: "Tata Garden",
  //     describe:
  //       "This is a short description about this card.This is a short description about this card.",
  //     urlLogo: "/images/logoDoiTac/logo7.png",
  //     width: 103,
  //     height: 103,
  //   },
  //   {
  //     name: "Irricons",
  //     describe:
  //       "This is a short description about this card.This is a short description about this card.",
  //     urlLogo: "/images/logoDoiTac/logo5.png",
  //     width: 190,
  //     height: 45,
  //   },
  // ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="slider-member swiper-container"
      >
        {cardThanhVien.cardThanhVien && cardThanhVien.cardThanhVien.length > 0
          ? cardThanhVien.cardThanhVien.map((item, key) => (
              <SwiperSlide key={key}>
                <div className="py-[24px] px-[16px]">
                  <div className="flex flex-col gap-[24px] pt-[10%]">
                    <div className="flex justify-center max-h-[50px] max-w-[200px] mx-auto">
                      <Image
                        src={
                          `${baseUrl}${item.logo?.data?.attributes?.url}` || "/"
                        }
                        alt="logo"
                        height={item.logo?.data?.attributes?.height}
                        width={item.logo?.data?.attributes?.width}
                      />
                    </div>
                    <h5 className="text-center text-[#000] font-bold text-[20px]">
                      {item.title}
                    </h5>
                    <p className="text-[#6B7280] text-[18px] line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="py-[24px] flex justify-center">
                    <button className="py-[16px] flex  items-center text-[16px] text-[#28A645] px-[24px] bg-[#FFFFFF] btn-truy-cap-web">
                      <Link
                        href={item.path ? item.path : "/"}
                        target="_blank"
                        className="mr-[8px]"
                      >
                        {t("visit_our_website")}
                      </Link>
                      <IconAngleRight width="16" height="16" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))
          : "Chưa có dữ liệu"}
      </Swiper>
    </>
  );
};

export default Slidemember;
