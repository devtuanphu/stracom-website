"use client";
import Image from "next/image";
import React from "react";
import CTE_Desktop from "../../../public/images/banner/CTA_Desktop.png";
import CTE_Mobile from "../../../public/images/banner/CTA_MOBILE.png";
import CTE_Tablet from "../../../public/images/banner/CTA_TABLET.png";
import { useTranslations } from "next-intl";

const ContactEndClient = () => {
  const t = useTranslations("contact_end");
  return (
    <>
      <div className="py-[80px] relative overflow-hidden">
        <div className="w-full relative tablet:h-[256px] mobile:h-[362px] flex mobile:flex-col tablet:flex-row  items-center laptop:px-[78px] tablet:px-[42px] mobile:gap-[80px] mobile:py-[40px] mobile:px-8  justify-between section-contact">
          <Image
            src={CTE_Desktop.src || "/"}
            className="hidden laptop:block z-0"
            alt="banner"
            layout="fill"
            objectFit="cover"
          />
          <Image
            src={CTE_Tablet.src || "/"}
            className="mobile:hidden tablet:block laptop:hidden z-0"
            alt="banner"
            layout="fill"
            objectFit="cover"
          />
          <Image
            src={CTE_Mobile.src || "/"}
            className="tablet:hidden mobile:block z-0"
            alt="banner"
            layout="fill"
            objectFit="cover"
          />
          <div className="relative z-1">
            <p className="font-medium  text-[#fff] mobile:hidden laptop:block">
              {t("introduce")}
            </p>
            <h2 className="pt-[15px] font-bold text-[40px] text-[#ffff] mobile:hidden  laptop:block">
              {t("contact_us")}
            </h2>
            <p className="font-medium text-[15px]  text-[#fff]  laptop:hidden mobile:block">
              {t("introduce")}
            </p>
            <h2 className="pt-[8px] mobile:pt-[16px] font-bold text-[24px] tablet:max-w-[310px] text-[#ffff]  laptop:hidden mobile:block">
              {t("contact_us")}
            </h2>
          </div>
          <div className="relative z-1">
            <a
              href="tel:0888167247"
              className="flex items-center bg-[#28A645] justify-center rounded-[32px] py-[12px] px-[24px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M15.1871 18.7232C12.6558 18.7232 9.06208 16.9107 5.74958 13.7857C1.24958 9.47317 -0.656665 4.66067 1.34333 2.53567C1.43708 2.44192 1.56208 2.34817 1.68708 2.28567L4.21833 0.848169C4.87458 0.473169 5.68708 0.660669 6.12458 1.28567L7.96833 3.91067C8.18708 4.22317 8.28083 4.59817 8.18708 4.97317C8.12458 5.31692 7.90583 5.62942 7.59333 5.84817L6.49958 6.56692C7.34333 7.78567 9.62458 10.8169 13.2496 12.9732C13.2808 13.0044 13.3121 12.9732 13.3121 12.9732L14.0933 11.9107C14.5308 11.3169 15.3746 11.1607 16.0308 11.5669L18.7808 13.3169C19.4371 13.7232 19.6246 14.5669 19.2183 15.2232L17.7183 17.6294C17.6246 17.7544 17.5308 17.8794 17.4371 17.9732C16.8746 18.4732 16.0933 18.7232 15.1871 18.7232ZM4.93708 2.06692C4.90583 2.06692 4.93708 2.06692 4.93708 2.06692L2.37458 3.50442C1.18708 4.78567 2.65583 8.87942 6.74958 12.7544C10.9058 16.6919 15.1871 18.0982 16.5621 16.9107L18.0621 14.5044L15.3121 12.7544C15.2808 12.7544 15.2496 12.7544 15.2496 12.7544L14.4683 13.8169C14.0308 14.4107 13.1871 14.5669 12.5621 14.1919C8.65583 11.8482 6.21833 8.59817 5.34333 7.31692C5.12458 7.00442 5.06208 6.62942 5.12458 6.28567C5.18708 5.91067 5.40583 5.59817 5.71833 5.41067L6.81208 4.69192L4.99958 2.09817C4.96833 2.09817 4.93708 2.06692 4.93708 2.06692Z"
                  fill="white"
                />
              </svg>
              <span className="mx-[8px] text-[#fff]">
                {t("call_now")} 0888 167 247
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactEndClient;
