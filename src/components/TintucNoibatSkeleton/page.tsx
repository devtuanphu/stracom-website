import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TintucNoibatSkeleton: React.FC = () => {
  return (
    <>
      <h2 className="font-bold text-[32px]">
        <Skeleton width={200} />
      </h2>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="py-[16px] relative bg-gray-200 overflow-hidden desktop:h-full min-h-[400px] max-h-[400px]">
              <Skeleton height="100%" width="100%" />
            </div>
            <h1 className="desktop:text-[40px] mt-4 laptop:text-[28px] mobile:text-[18px] laptop:leading-[56px] mobile:leading-[25.2px] tablet:text-[#374151] mobile:text-black font-bold line-clamp-3">
              <Skeleton />
            </h1>
            <p className="tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base tablet:text-[#8899A8] laptop:leading-[38.4px] mobile:text-black line-clamp-5">
              <Skeleton count={3} />
            </p>
            <div className="text-[#fff] bg-gray-200 px-[24px] py-[12px] flex items-center rounded-[50px]">
              <Skeleton width={100} height={40} />
            </div>
          </div>
        </div>
      </div>
      <div className="py-[24px] flex gap-[10px]">
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
      </div>
    </>
  );
};

export default TintucNoibatSkeleton;
