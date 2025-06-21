import React from "react";
import Image from "next/image";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
const searchData = {
  populate: ["bai_viets.seo.thumbnail,bai_viets.danh_muc_cons"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchData(endpoint: any) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
const Construction = async (locale: any) => {
  const t = await getTranslations("home");

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_HOME}?${searchParams}&locale=${locale.locale}`
  );
  const baseUrl = process.env.URL_API;

  const baiviet = (
    dataTinTuc as {
      data: {
        attributes: {
          bai_viets: {
            data: {
              attributes: {
                title: string;
                slug: string;
                content: string;
                type: string;
                danh_muc_cons: {
                  data: {
                    attributes: {
                      category: string;
                      name: string;
                    };
                  }[];
                };
                seo: {
                  title: string;
                  description: string;
                  thumbnail: {
                    data: {
                      attributes: {
                        width: number;
                        height: number;
                        url: string;
                      };
                    };
                  };
                };
              };
            }[];
          };
        };
      };
    }
  )?.data?.attributes?.bai_viets?.data;

  return (
    <>
      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-12 laptop:col-span-8">
          <div className="flex flex-col gap-[24px]">
            {baiviet?.slice(0, 2)?.map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex mobile:flex-col tablet:flex-row items-stretch">
                  <div className="relative  mobile:pb-[84.85%]  tablet:pb-0 tablet:min-w-[268px] desktop:min-w-[312px] tablet:h-[280px]">
                    <Image
                      src={
                        `${baseUrl}${item.attributes.seo.thumbnail.data.attributes.url}` ||
                        "/"
                      }
                      alt="du-an"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#F4F7FF] p-[24px] w-full h-full ">
                      <div className="flex flex-col gap-[16px] laptop:max-w-[394px]">
                        <h5 className="text-[#28A645] font-bold line-clamp-1">
                          {item.attributes.danh_muc_cons?.data[0]?.attributes
                            ?.name || "Dự án"}
                        </h5>
                        <h2 className="text-[18px] min-h-[58px] font-bold text-[#374151] leading-[28.8px] line-clamp-2">
                          {item.attributes.title}
                        </h2>
                        <p className="text-[#9CA3AF] leading-[25.6px] line-clamp-3">
                          {item.attributes.seo.description}
                        </p>
                        <Link
                          href={
                            item.attributes.slug ? item.attributes.slug : "/"
                          }
                          className="flex items-center ">
                          <span className="text-[#3B559E] font-medium mr-[10px]">
                            {t("read_now")}
                          </span>
                          <Image
                            src="/images/svg-home/arrow-right.svg"
                            alt=""
                            height={20}
                            width={20}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-12 laptop:col-span-4 mobile:hidden laptop:block">
          <div className="bg-[#F3FFF8] h-[280px] p-6">
            {baiviet?.slice(2, 3)?.map((item, key) => {
              return (
                <>
                  <div className=" flex flex-col gap-[16px]">
                    <h5 className="text-[#28A645] font-bold">
                      {item.attributes.danh_muc_cons?.data[0]?.attributes
                        ?.name || "Dự án"}
                    </h5>
                    <h2 className="font-bold text-[18px] min-h-[58px] leading-[28.8px] text-[#111928]">
                      {item.attributes.title}
                    </h2>
                    <p className="text-[#374151] leading-[25.6px] line-clamp-3">
                      {item.attributes.seo.description}
                    </p>
                    <Link
                      href={item.attributes.slug || "/"}
                      className="flex items-center ">
                      <span className="text-[#3B559E] font-medium mr-[10px]">
                        {t("read_now")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none">
                        <path
                          d="M18 9.69189L11.5312 3.12939C11.25 2.84814 10.8125 2.84814 10.5312 3.12939C10.25 3.41064 10.25 3.84814 10.5312 4.12939L15.7812 9.47314H2.5C2.125 9.47314 1.8125 9.78564 1.8125 10.1606C1.8125 10.5356 2.125 10.8794 2.5 10.8794H15.8437L10.5312 16.2856C10.25 16.5669 10.25 17.0044 10.5312 17.2856C10.6562 17.4106 10.8437 17.4731 11.0312 17.4731C11.2187 17.4731 11.4062 17.4106 11.5312 17.2544L18 10.6919C18.2812 10.4106 18.2812 9.97314 18 9.69189Z"
                          fill="#3B559E"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
          <div className="py-[12px] w-full bg-[#F3FFF8] px-[36px]">
            <hr style={{ borderColor: "#28A645" }} />
          </div>
          <div className="bg-[#F3FFF8] h-[280px] p-6">
            {baiviet?.slice(3, 4)?.map((item, key) => {
              return (
                <>
                  <div className=" flex flex-col gap-[16px]">
                    <h5 className="text-[#28A645] font-bold line-clamp-1">
                      {item.attributes.danh_muc_cons?.data[0]?.attributes
                        ?.name || "Dự án"}
                    </h5>
                    <h2 className="font-bold text-[18px] min-h-[58px] leading-[28.8px] text-[#111928] line-clamp-2">
                      {item.attributes.title}
                    </h2>
                    <p className="text-[#374151] leading-[25.6px] line-clamp-3">
                      {item.attributes.seo.description}
                    </p>
                    <Link
                      href={item.attributes.slug || "/"}
                      className="flex items-center ">
                      <span className="text-[#3B559E] font-medium mr-[10px]">
                        {t("read_now")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none">
                        <path
                          d="M18 9.69189L11.5312 3.12939C11.25 2.84814 10.8125 2.84814 10.5312 3.12939C10.25 3.41064 10.25 3.84814 10.5312 4.12939L15.7812 9.47314H2.5C2.125 9.47314 1.8125 9.78564 1.8125 10.1606C1.8125 10.5356 2.125 10.8794 2.5 10.8794H15.8437L10.5312 16.2856C10.25 16.5669 10.25 17.0044 10.5312 17.2856C10.6562 17.4106 10.8437 17.4731 11.0312 17.4731C11.2187 17.4731 11.4062 17.4106 11.5312 17.2544L18 10.6919C18.2812 10.4106 18.2812 9.97314 18 9.69189Z"
                          fill="#3B559E"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Construction;
