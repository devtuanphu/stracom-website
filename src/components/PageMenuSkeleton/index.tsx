import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PageMenuSkeleton: React.FC = () => {
  return (
    <div className="flex-col justify-start items-start gap-16 flex w-full my-[40px] desktop:px-[120px]">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex w-full">
            <div className="flex-col w-full gap-4">
              <div className="text-gray-700 tablet:text-[28px] mobile:text-lg font-bold leading-[44.80px] flex justify-between items-center mb-8">
                <div className="flex items-center capitalize gap-6">
                  <Skeleton width={150} height={30} />
                </div>
                <Skeleton width={100} height={40} />
              </div>
              {Array(3)
                .fill(0)
                .map((_, childIndex) => (
                  <div
                    key={childIndex}
                    className={`text-gray-500 tablet:text-2xl mobile:text-base font-medium cursor-pointer leading-[38.40px] flex items-center justify-between w-full desktop:pt-6 pl-2 tablet:mb-6 mobile:mb-2 border-b-2 border-zinc-200 flex-col overflow-hidden`}>
                    <div className={`flex w-full justify-between items-center`}>
                      <Skeleton width="70%" height={30} />
                      <Skeleton width={30} height={30} />
                    </div>
                    <div className="transform origin-top transition-all desktop:mt-4 w-full overflow-hidden duration-300 ease-in-out max-h-0">
                      <Skeleton width="90%" height={60} />
                      <Skeleton width={100} height={40} />
                    </div>
                  </div>
                ))}
              <Skeleton width={100} height={40} className="mobile:mt-4" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PageMenuSkeleton;
