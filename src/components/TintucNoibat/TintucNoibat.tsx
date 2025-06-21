"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; // Cơ bản CSS
import "swiper/css/navigation"; // CSS cho module Navigation
import Image from "next/image";
import demo_tin_tuc from "../../../public/images/tin-tuc/demo-tin-tuc.jpg";
import { Swiper as SwiperClass } from "swiper";
import IconNextCricle from "../icons/IconNextCricle";
import IconPrevCricle from "../icons/IconPrevCricle";
import Link from "next/link";
import { useTranslations } from "next-intl";
interface TintucNoibatProps {
  name: string;
  data: any;
}

const TintucNoibat: React.FC<TintucNoibatProps> = ({ name, data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const t = useTranslations("home");
  const translate = useTranslations("detail_post");
  const onPrev = (): void => {
    swiperRef.current?.slidePrev();
  };

  const onNext = (): void => {
    swiperRef.current?.slideNext();
  };
  const baseUrl = process.env.URL_API;
  return (
    <>
      <h2 className="font-bold text-[32px]">{name}</h2>
      <Swiper
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTotalSlides(swiper.slides.length);
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
      >
        {data.map((item: any, key: any) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="laptop:min-h-[820px] laptop:h-[820px] tablet:min-h-[686px] tablet:h-[686px] mobile:min-h-[670px] mobile:h-[670px]">
                <div className="py-[16px] relative overflow-hidden desktop:h-full min-h-[400px] max-h-[400px]">
                  <Image
                    src={`${baseUrl}${
                      item?.seo?.thumbnail?.data?.attributes?.url || "/"
                    }`}
                    layout="fill"
                    // width={100}
                    // height={100}
                    objectFit="cover"
                    alt="tin-tuc-tieu-diem"
                    className="mobile:rounded-xl desktop:rounded-none desktop:w-full "
                  />
                </div>
                <h1 className="desktop:text-[40px] mt-4 laptop:text-[28px] mobile:text-[18px] laptop:leading-[56px] mobile:leading-[25.2px] tablet:text-[#374151] mobile:text-black font-bold line-clamp-2">
                  {item.title}
                </h1>
                <p className="tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base tablet:text-[#8899A8] laptop:leading-[38.4px] mobile:text-black line-clamp-5">
                  {item.seo.description}
                </p>
                <button className="text-[#fff] bg-[#3B559E] px-[24px] py-[12px] flex items-center rounded-[50px] absolute bottom-1">
                  <Link
                    href={item.slug ? `/${item.slug}` : "/"}
                    className="mr-[10px]"
                  >
                    {t("let_see")}
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="16"
                    viewBox="0 0 9 16"
                    fill="none"
                  >
                    <path
                      d="M0.96875 15.9062C0.78125 15.9062 0.625 15.8438 0.46875 15.7188C0.1875 15.4375 0.1875 15 0.46875 14.7188L7.03125 8L0.46875 1.3125C0.1875 1.03125 0.1875 0.59375 0.46875 0.3125C0.75 0.03125 1.1875 0.03125 1.46875 0.3125L8.53125 7.5C8.8125 7.78125 8.8125 8.21875 8.53125 8.5L1.46875 15.6875C1.34375 15.8125 1.15625 15.9062 0.96875 15.9062Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="py-[24px] flex gap-[10px]">
        <button onClick={onPrev}>
          <IconPrevCricle active={currentIndex === 0 ? false : true} />
        </button>
        <button onClick={onNext}>
          <IconNextCricle
            active={currentIndex === totalSlides - 1 ? false : true}
          />
        </button>
      </div>
    </>
  );
};

export default TintucNoibat;
