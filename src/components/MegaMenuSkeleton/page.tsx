import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MegaMenuSkeletonProps {
  activeKey: string | null;
}

const MegaMenuSkeleton: React.FC<MegaMenuSkeletonProps> = ({ activeKey }) => {
  return (
    <div className="flex justify-between gap-[32.5px] bg-[#fefefe]">
      <div className="w-[300px] flex-col justify-start items-start gap-8 inline-flex">
        <Skeleton width={300} height={40} />
        <Skeleton width={300} height={20} count={3} />
        <Skeleton width={150} height={40} />
      </div>
      <div className="min-h-full w-1 bg-[#28A645] rounded"></div>
      <div className="flex-1 grid grid-cols-3 gap-[30px]">
        {(activeKey === "Sản phẩm" || activeKey === "Dự án") && (
          <>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div className="flex flex-col items-start gap-4" key={index}>
                  <div className="w-full min-h-[108px] gap-4">
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="100%" height={20} count={2} />
                  </div>
                  {Array(4)
                    .fill(0)
                    .map((_, childIndex) => (
                      <div key={childIndex}>
                        <Skeleton width="100%" height={20} />
                      </div>
                    ))}
                </div>
              ))}
          </>
        )}
        {(activeKey === "Dịch vụ" || activeKey === "Thông tư nghị định") && (
          <>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div className="flex flex-col items-start gap-4" key={index}>
                  <div className="w-full min-h-[108px] gap-4">
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="100%" height={20} count={2} />
                  </div>
                </div>
              ))}
          </>
        )}
        {activeKey === "Về chúng tôi" && (
          <>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div className="flex flex-col items-start gap-4" key={index}>
                  <div className="w-full min-h-[108px] gap-4">
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="100%" height={20} count={2} />
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MegaMenuSkeleton;
