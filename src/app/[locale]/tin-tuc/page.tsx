"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../../styles/pages/tin-tuc.css";
import TintucNoibat from "@/components/TintucNoibat/TintucNoibat";
import demo_tin_tuc_2 from "../../../../public/images/tin-tuc/demo-tin-tuc-2.jpg";
import IconSearch from "@/components/icons/IconSearch";
import IconWater from "@/components/icons/IconWater";
import IconDesign from "@/components/icons/IconDesign";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { formatDistanceToNowStrict } from "date-fns";
import { vi, enUS } from "date-fns/locale";

import demo_goc_chuyen_gia from "../../../../public/images/goc-chuyen-gia/demo_chuuyen_gia.png";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useTranslations } from "use-intl";
import TintucNoibatSkeleton from "../../../components/TintucNoibatSkeleton/page";
import LatestNewsSkeleton from "../../../components/LatestNewsSkeleton/page";
import BoxTinTucSkeleton from "@/components/BoxTinTucSkeleton";

interface danhMucBaiViet {
  id: number;
  attributes: {
    name: string;
  };
}
interface tintuc {
  id: number;
  attributes: {
    createdAt: string;
    title: string;
    slug: string;
    type: string;
    bai_viet_tieu_diem: boolean;
    seo: {
      description: string;
      thumbnail: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
    danh_muc_bai_viets: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
  };
}
interface ResponseDataTinTuc {
  data: tintuc[];
}
interface ResponseDanhMucBaiViet {
  data: danhMucBaiViet[];
}
const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets "].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

const Page: React.FC = (params: any) => {
  let locale = params.params.locale;
  const [dataDanhMucBaiViet, setDataDanhMucBaiViet] = useState<
    danhMucBaiViet[]
  >([]);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [tintuc, setTintuc] = useState<tintuc[]>([]);
  const [tintucWithFilter, setTintucWithFilter] = useState<tintuc[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDanhMuc, setFilterDanhMuc] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchValue(searchValue), 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const fetchDataTinTuc = async () => {
    try {
      setLoading(true);
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}&filters[type][$containsi]=Tin tức&sort=createdAt:DESC `;
      const response = await apiService.get<ResponseDataTinTuc>(endpoint);
      setTintuc(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTinTucWithFilter = async (
    searchValue: string,
    category: string
  ) => {
    try {
      setLoading(true);
      const filters = [
        `filters[title][$containsi]=${searchValue}`,
        `filters[type][$containsi]=Tin tức`,
        `pagination[pageSize]=${displayedCount}`,
        `sort=createdAt:DESC`,
      ];

      if (category) {
        filters.push(
          `filters[danh_muc_bai_viets][name][$containsi]=${category}`
        );
      }

      const endpoint = `${
        process.env.URL_API
      }/api/bai-viets?${searchParams}&locale=${locale}&${filters.join("&")}`;
      const response = await apiService.get<ResponseDataTinTuc>(endpoint);
      setTintucWithFilter(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchDataDanhMucBaiViet = async () => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-muc-bai-viets?locale=${locale}`;
      const response = await apiService.get<ResponseDanhMucBaiViet>(endpoint);
      setDataDanhMucBaiViet(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataTinTuc();
    fetchDataDanhMucBaiViet();
  }, []);

  useEffect(() => {
    fetchDataTinTucWithFilter(debouncedSearchValue, filterDanhMuc);
  }, [debouncedSearchValue, displayedCount, filterDanhMuc]);

  const baseUrl = process.env.URL_API;

  const handleSetFilterDanhMuc = (name: string) => {
    const newFilterDanhMuc = filterDanhMuc === name ? "" : name;
    setFilterDanhMuc(newFilterDanhMuc);
    fetchDataTinTucWithFilter(debouncedSearchValue, newFilterDanhMuc);
  };

  const filteredAndLimitedArticles = tintucWithFilter.length
    ? tintucWithFilter
        .filter((item: tintuc) => {
          if (filterDanhMuc === "") {
            return true;
          }
          return item?.attributes?.danh_muc_bai_viets?.data.some(
            (danhMuc) => danhMuc.attributes?.name === filterDanhMuc
          );
        })
        .map((item: tintuc) => item?.attributes)
    : [];

  const loadMoreArticles = () => {
    setDisplayedCount((prevCount) => prevCount + 6);
  };

  const t = useTranslations("detail_post");

  const formatTimeBadge = (createdAt: string) => {
    const timeAgo = formatDistanceToNowStrict(new Date(createdAt), {
      addSuffix: true,
      locale: locale === "en" ? enUS : vi,
    });
    return timeAgo;
  };

  return (
    <>
      <div className="container py-[32px] desktop:py-[50px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 tablet:col-span-6">
            {tintuc && tintuc.length > 0 ? (
              <TintucNoibat
                data={tintuc
                  .filter(
                    (item) => item?.attributes?.bai_viet_tieu_diem === true
                  )
                  .map((item) => item?.attributes)}
                name={t("features_article")}
              />
            ) : (
              <TintucNoibatSkeleton />
            )}
          </div>
          <div className="col-span-12 tablet:col-span-6">
            {tintuc && tintuc.length > 0 ? (
              <>
                <h2 className="text-[24px] font-bold text-[#374151]">
                  {t("lastest_news")}
                </h2>
                {tintuc.slice(0, 3).map((item) => {
                  return (
                    <div key={item.id} className="py-[16px]">
                      <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                        <div className="tablet:col-span-7 mobile:col-span-12">
                          <div className="flex flex-col gap-[16px]">
                            <div className="w-fit h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                              <div className="text-[#3B559E] text-base font-normal leading-normal">
                                {item.attributes.createdAt
                                  ? formatTimeBadge(item.attributes.createdAt)
                                  : t("lastest_news_tag")}
                              </div>
                            </div>
                            <h3 className="laptop:text-[20px] tablet:text-[16px] mobile:text-[18px] text-[#374151] font-bold line-clamp-2">
                              {item?.attributes?.title || "có lỗi"}
                            </h3>
                            <p className="laptop:text-[18px] tablet:text-[13px] mobile:text-[16px] text-[#8899A8] line-clamp-3">
                              {item?.attributes?.seo?.description || "có lỗi"}
                            </p>
                            <div className="flex justify-start">
                              <Link
                                href={
                                  item.attributes.slug
                                    ? `/${item.attributes.slug}`
                                    : "/"
                                }
                                className="text-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view"
                              >
                                {t("read_now")}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="tablet:col-span-5 mobile:col-span-12">
                          <div className="mobile:min-w-[196px] mobile:min-h-[196px] tablet:aspect-square laptop:max-w-[196px] tablet:min-h-[100px] tablet:min-w-[100px] relative mobile:mx-auto">
                            <Image
                              // height={196}
                              // width={196}
                              src={
                                `${baseUrl}${item.attributes?.seo?.thumbnail?.data?.attributes?.url}` ||
                                "/"
                              }
                              fill
                              objectFit="cover"
                              alt="tin-tuc-moi-len"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <LatestNewsSkeleton />
            )}
          </div>
        </div>
        <div className="py-[40px]">
          <hr />
        </div>

        <div className="flex tablet:flex-row mobile:flex-col  justify-between gap-4">
          <div>
            <h2 className="text-[35px] font-bold">{t("news")}</h2>
          </div>
          <div className="relative flex items-center justify-center">
            <input
              className="focus:outline-none laptop:p-[24px] tablet:pr-[40px] laptop:pr-[68px] mobile:px-[24px]  mobile:py-[3px] mobile:w-full tablet:w-fit rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
              onChange={(e: any) => setSearchValue(e.target.value)}
              placeholder={t("search")}
            />
            <button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10px] mobile:hidden laptop:flex">
              <IconSearch width="30" height="30" />
            </button>
            <button className="w-[32px] h-[32px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[0px] mobile:top-[0px] tablet:top-[10px] laptop:top-0 mobile:flex laptop:hidden">
              <IconSearch width="14" height="14" />
            </button>
          </div>
        </div>

        <div className="py-[50px]">
          <div className="flex gap-4  laptop:flex-wrap laptop:overflow-hidden mobile:flex-nowrap mobile:overflow-auto pb-2 ">
            {dataDanhMucBaiViet && dataDanhMucBaiViet.length > 0
              ? dataDanhMucBaiViet.map((item: danhMucBaiViet) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleSetFilterDanhMuc(item?.attributes?.name)
                      }
                      className={`${
                        filterDanhMuc === item?.attributes?.name
                          ? `bg-[#3B559E] border-[#3B559E]`
                          : `bg-[#fff] border  border-[#3B559E]`
                      } py-[8px] px-[10px] flex items-center rounded-[24px] border w-fit`}
                    >
                      <span
                        className={`text-12px font-medium text-nowrap  ${
                          filterDanhMuc === item?.attributes?.name
                            ? `text-[#fff]`
                            : `text-[#3B559E] `
                        }`}
                      >
                        {item?.attributes?.name}
                      </span>
                    </button>
                  );
                })
              : "Chưa có dữ liệu"}
          </div>
        </div>

        {loading ? (
          <BoxTinTucSkeleton />
        ) : filteredAndLimitedArticles.length > 0 ? (
          <BoxTinTuc data={filteredAndLimitedArticles} locale={locale} />
        ) : (
          <div className="col-span-12">
            <h3 className="text-center text-black text-[32px] font-bold">
              {t("nodata_news")}
            </h3>
          </div>
        )}

        <div className="py-[40px] flex justify-center">
          <button
            className="py-[16px] px-[24px] bg-[#3B559E] border border-[#3B559E] text-[#fff] font-medium rounded-[50px]"
            onClick={loadMoreArticles}
          >
            {t("load_more_news")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
