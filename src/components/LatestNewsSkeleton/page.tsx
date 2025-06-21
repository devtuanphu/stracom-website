import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LatestNewsSkeleton: React.FC = () => {
  return (
    <>
      <h2 className="text-[24px] font-bold text-[#374151]">
        <Skeleton width={200} />
      </h2>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="py-[16px]">
          <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
            <div className="tablet:col-span-7 mobile:col-span-12">
              <div className="flex flex-col gap-[16px]">
                <div className="w-fit h-8 px-2 py-1 bg-gray-200 rounded-md justify-start items-center gap-2 inline-flex">
                  <Skeleton width={80} height={24} />
                </div>
                <h3 className="laptop:text-[20px] tablet:text-[16px] mobile:text-[18px] text-[#374151] font-bold line-clamp-2">
                  <Skeleton />
                </h3>
                <p className="laptop:text-[18px] tablet:text-[13px] mobile:text-[16px] text-[#8899A8] line-clamp-3">
                  <Skeleton count={2} />
                </p>
                <div className="flex justify-start">
                  <Skeleton width={100} height={40} />
                </div>
              </div>
            </div>
            <div className="tablet:col-span-5 mobile:col-span-12">
              <div className="mobile:min-w-[196px] mobile:min-h-[196px] tablet:aspect-square laptop:max-w-[196px] tablet:min-h-[100px] tablet:min-w-[100px] relative mobile:mx-auto">
                <Skeleton height="100%" width="100%" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LatestNewsSkeleton;
