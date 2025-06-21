// path: ./components/BoxTinTucSkeleton/BoxTinTucSkeleton.js

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BoxTinTucSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-8 overflow-hidden">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="col-span-12 tablet:col-span-6 laptop:col-span-6 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto w-full">
          <div className="relative">
            <div className="max-h-[280px] laptop:h-[280px] tablet:h-[220px] mobile:min-h-[220px] tablet:min-h-[280px] relative overflow-hidden bg-slate-200">
              <Skeleton height="100%" />
            </div>
            <div className="absolute top-[10%] left-[5%]">
              <Skeleton width={100} height={20} />
            </div>
          </div>
          <div className="mt-[24px] mb-[16px]">
            <Skeleton height={30} width="80%" />
          </div>
          <Skeleton count={3} />
        </div>
      ))}
    </div>
  );
};

export default BoxTinTucSkeleton;
