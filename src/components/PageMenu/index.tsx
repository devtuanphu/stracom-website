"use client";
import { Collapse } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconArrowRight from "../icons/IconArrowRight";
import IconAngleRight from "../icons/IconAngleRight";
import IconChemicalBottle from "../icons/IconChemiscalBottle";
import IconCircleDesign from "../icons/IconCircleDesign";
import IconCircleLeaf from "../icons/IconCircleLeaf";
import { useTranslations } from "next-intl";
import { apiService } from "@/services/api.service";
import Loading from "../Loading";
import PageMenuSkeleton from "../PageMenuSkeleton";

interface props {
  menu: any;
  locale: any;
}
interface ResponseData {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
      description: string;
      main: any;
    };
  }[];
}
const PageMenu = (props: props): JSX.Element => {
  const t = useTranslations("home");
  const { menu, locale } = props;
  const [loading, setLoading] = useState(true);
  const [formatMenu, setFormatMenu] = useState<any>();
  const fetchData = async (menu: any) => {
    try {
      const endpoint = `${process.env.URL_API}/api/custom-${menu}?limitBaiViet=3&locale=${locale}`;
      const response = await apiService.get<ResponseData>(endpoint);
      return setFormatMenu(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const fetchDataBaiViet =
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      await fetchData(menu);
      setLoading(false);
    };
    fetchMenu();
  }, [menu]);
  useEffect(() => {
    console.log("formatMenu", formatMenu);
  }, [formatMenu]);

  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Khởi tạo với null
  const [isLoading, setIsLoading] = useState(true);
  const handleMenuClick = (name: string) => {
    setActiveMenu((prevActiveMenu) => (prevActiveMenu === name ? null : name));
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <PageMenuSkeleton />
        </div>
      ) : (
        <div className=" flex-col justify-start items-start gap-16 flex w-full my-[40px] desktop:px-[120px]">
          {formatMenu &&
            formatMenu.danh_muc_cons.map((item: any) => {
              return (
                <div key={item.id} className="flex w-full">
                  <div className=" flex-col w-full gap-4">
                    <div className="text-gray-700 tablet:text-[28px] mobile:text-lg font-bold   leading-[44.80px] flex justify-between items-center mb-8">
                      <div className="flex items-center capitalize gap-6">
                        <p>{item.name}</p>
                      </div>
                      <Link
                        href={item.slug ? `/${locale}/${item.slug}` : "/"}
                        className="mobile:hidden tablet:inline-flex h-12 px-6 py-3 rounded-[50px] border border-[#3B559E] text-[#3B559E] justify-center items-center gap-2 inline-flex hover:border-[#28A645] hover:text-[#28A645] transition-colors ease-linear"
                      >
                        <div className="text-center  text-base font-medium  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                          {t("see_all")}
                        </div>
                        <div className="">
                          <IconAngleRight width="16" height="16" />
                        </div>
                      </Link>
                    </div>
                    {item.bai_viet.length > 0
                      ? item.bai_viet.slice(0, 3).map((child: any) => {
                          return (
                            <div
                              key={child.title}
                              className={` text-gray-500 tablet:text-2xl mobile:text-base font-medium cursor-pointer leading-[38.40px] flex items-center justify-between w-full desktop:pt-6  pl-2 tablet:mb-6 mobile:mb-2 border-b-2 border-zinc-200 flex-col overflow-hidden`}
                              onClick={() => handleMenuClick(child.title)}
                            >
                              <div
                                className={`flex w-full justify-between items-center `}
                              >
                                <p className="line-clamp-1">{child.title}</p>
                                <div
                                  className={`transform transition-transform duration-300 p-4 ${
                                    activeMenu === child.title
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                >
                                  <IconAngleRightColorFull />
                                </div>
                              </div>
                              <div
                                className={`transform origin-top transition-all desktop:mt-4  w-full  overflow-hidden duration-300 ease-in-out ${
                                  activeMenu === child.title
                                    ? "max-h-96 pb-4 mt-4"
                                    : "max-h-0"
                                }`}
                              >
                                <p className=" text-slate-400 tablet:text-xl mobile:text-base font-light  tablet:leading-loose mb-4 select-none line-clamp-2">
                                  {child.description ||
                                    "Không có hoặc chưa CMS seo.description"}
                                </p>

                                <Link
                                  href={child?.slug || "/"}
                                  className=" h-10 px-4 py-2 bg-[#3B559E] rounded-[32px] justify-center items-center gap-2.5 inline-flex"
                                >
                                  <p className="text-center text-white text-base font-medium  leading-normal">
                                    {t("see_more")}
                                  </p>
                                  <div className="w-5 h-5 relative text-white ">
                                    <IconArrowRight width={24} height={24} />
                                  </div>
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      : null}
                    <Link
                      href={item.slug ? `/${locale}/${item.slug}` : "/"}
                      className="mobile:inline-flex tablet:hidden h-12 mt-4 px-6 py-3 rounded-[50px] border border-[#3B559E] justify-center items-center gap-2 inline-flex  hover:border-[#28A645] hover:text-[#28A645] transition-colors ease-linear "
                    >
                      <div className="text-center text-[#3B559E]  text-base font-medium  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                        {t("see_all")}
                      </div>
                      <div className="text-[#3B559E]">
                        <IconAngleRight width="16" height="16" />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* <div className=" flex-col justify-start items-start flex w-full my-[40px] desktop:px-[120px]">
        {menu?.attributes?.bai_viets?.data?.length > 0 && !isLoading
          ? menu?.attributes?.bai_viets?.data?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="flex w-full
              ">
                  <div className=" flex-col w-full gap-4">
                    <div
                      key={item.attributes.title}
                      className={`text-gray-500 tablet:text-2xl mobile:text-base font-medium cursor-pointer leading-[38.40px] flex items-center justify-between w-full desktop:pt-2  pl-2 tablet:mb-2 mobile:mb-2 border-b-2 border-zinc-200 flex-col overflow-hidden`}
                      onClick={() => handleMenuClick(item.attributes.title)}>
                      <div
                        className={`flex w-full justify-between items-center ${
                          menu?.attributes?.slug === "dich-vu" ||
                          menu?.attributes?.slug === "en/dich-vu"
                            ? "text-[#374151]"
                            : "text-gray-500"
                        }`}>
                        {item.attributes.title}
                        <div
                          className={`transform transition-transform duration-300 p-4 ${
                            activeMenu === item.attributes.title
                              ? "rotate-90"
                              : ""
                          }`}>
                          {item.attributes.icon || <IconAngleRightColorFull />}
                        </div>
                      </div>
                      <div
                        className={`transform origin-top transition-all desktop:mt-4  w-full  overflow-hidden duration-300 ease-in-out ${
                          activeMenu === item.attributes.title
                            ? "max-h-96 pb-4 mt-0"
                            : "max-h-0"
                        }`}>
                        <p className=" text-slate-400 tablet:text-xl mobile:text-base font-light  tablet:leading-loose mb-4 select-none">
                          {item.attributes.seo.description ||
                            "description mac dinh"}
                        </p>

                        <Link
                          href={`/${locale}/${item.attributes?.slug}`}
                          className=" h-10 px-4 py-2 bg-[#3B559E] rounded-[32px] justify-center items-center gap-2.5 inline-flex">
                          <p className="text-center text-white text-base font-medium  leading-normal">
                            {t("see_more")}
                          </p>
                          <div className="w-5 h-5 relative text-white ">
                            <IconArrowRight width={24} height={24} />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div> */}
    </>
  );
};

export default PageMenu;
