"use client";
import React, { useState, useEffect } from "react";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEndClient from "@/components/ContactEndClient/ContactEndClient";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Pagination, Breadcrumb } from "antd";
import { apiService } from "@/services/api.service";
import notFoundBanner from "../../../../public/images/banner/404Banner.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
import MetaData from "@/components/MetaData/MetaData";

interface Article {
  id: number;
  attributes: {
    seo: any;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    type: string | null;
  };
}

interface ArticleData {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface DetailSubCategory {
  id: number;
  attributes: {
    seo: any;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    category: string;
    content: string;
  };
}

interface DetailSubCategoryData {
  data: DetailSubCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

interface Localization {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    bai_viet_tieu_diem: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    type: string | null;
    danh_muc_cons: {
      data: DetailSubCategory[];
    };
  };
}

interface DetailArticle {
  id: number;
  attributes: {
    seo: any;
    title: string;
    slug: string;
    content: string;
    bai_viet_tieu_diem: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    type: string | null;
    localizations: {
      danh_muc_cons: any;
      data: Localization[];
    };
    danh_muc_cons: {
      data: DetailSubCategory[];
    };
  };
}

interface DetailArticleData {
  data: DetailArticle[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Page: React.FC<{ params: any }> = ({ params }) => {
  const slug = params.slug;
  let locale = params.locale;
  const token = process.env.DEV_TOKEN;
  const translate = useTranslations("404");
  const t = useTranslations("detail_post");
  const [data, setData] = useState<Article[]>([]);
  const [detailSubCategory, setDetailSubCategory] = useState<
    DetailSubCategory[]
  >([]);
  const [detailBaiViet, setDetailBaiViet] = useState<DetailArticle[]>([]);
  const [baiVietTieuDiem, setBaiVietTieuDiem] = useState<DetailArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<DetailArticle[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isHaveData, setIsHaveData] = useState<boolean>(true);
  const [seoCategory, setSeoCategory] = useState<any>("");
  const [seoDetailNews, setSeoDetailNews] = useState<any>("");

  const checkLastSegmentIsNumeric = (input: string) => {
    const segments = input.split("-");
    const lastSegment = segments[segments.length - 1];
    return /^\d{13}$/.test(lastSegment);
  };

  async function fetchData(page = 1): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(
        `${ENDPOINT.GET_BAIVIET}?populate=seo.thumbnail&danh_muc_cons&filters[danh_muc_cons][slug][$eq]=${slug}&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pagination.pageSize}&sort=createdAt:DESC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: ArticleData = await response.json();

      setData(result.data);
      setPagination({
        ...pagination,
        current: page,
        total: result.meta.pagination.total,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchDetailSubCategory(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(
        `${ENDPOINT.GET_DANHMUCCON}?filters[slug]=${slug}&locale=${locale}&populate=seo.thumbnail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: DetailSubCategoryData = await response.json();
      setDetailSubCategory(result.data);
      setSeoCategory(result.data[0]?.attributes?.seo);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchDetailBaiViet(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(
        `${ENDPOINT.GET_BAIVIET}?filters[slug]=${params.slug}&populate=localization,seo.thumbnail&locale=${locale}&populate=danh_muc_cons,localizations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: DetailArticleData = await response.json();
      setDetailBaiViet(result.data);
      result.data.length === 0 && setIsHaveData(false);
      setSeoDetailNews(result.data[0]?.attributes?.seo);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBaiVietTieuDiem(danh_muc_cons: string): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(
        // `${ENDPOINT.GET_BAIVIET}?
        // filters[bai_viet_tieu_diem]=true&
        // populate=danh_muc_cons,localizations.danh_muc_cons,seo.thumbnail&locale=${locale}`,
        `${ENDPOINT.GET_BAIVIET}?populate=danh_muc_cons,localizations.danh_muc_cons,seo.thumbnail&locale=${locale}&filters[danh_muc_cons][name][$containsi]=${danh_muc_cons}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: DetailArticleData = await response.json();
      setBaiVietTieuDiem(result.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(pagination.current);
    fetchDetailSubCategory();
    fetchDetailBaiViet();
  }, []);
  useEffect(() => {
    if (detailBaiViet && detailBaiViet.length > 0) {
      console.log("detailBaiViet", detailBaiViet);
      fetchBaiVietTieuDiem(
        detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes?.name
      );
    }
  }, [detailBaiViet]);

  const dataBaiViet =
    locale === "vi"
      ? detailBaiViet[0]?.attributes?.content
      : detailBaiViet[0]?.attributes?.localizations?.data[0].attributes
          ?.content;

  let breadcum: any;
  let subBreadcum: any;
  let slugSubBreadcum: any;

  !checkLastSegmentIsNumeric(slug)
    ? (breadcum =
        locale === "vi"
          ? detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.category
          : detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.category)
    : "";

  !checkLastSegmentIsNumeric(slug)
    ? (subBreadcum =
        locale === "vi"
          ? detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.name
          : detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.name)
    : "";

  !checkLastSegmentIsNumeric(slug)
    ? (slugSubBreadcum =
        locale === "vi"
          ? detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.slug
          : detailBaiViet[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.slug)
    : "";

  const filterArticlesByCategoryName = () => {
    setLoading(true);

    const detailBaiVietNames =
      detailBaiViet[0]?.attributes?.danh_muc_cons?.data.map(
        (danhMuc) => danhMuc.attributes.name
      );
    const currentSlug = params.slug;

    const filtered = baiVietTieuDiem.filter((article) => {
      if (article.attributes.slug === currentSlug) {
        return false;
      }

      return article.attributes.danh_muc_cons?.data.some((danhMuc) => {
        return detailBaiVietNames.includes(danhMuc.attributes.name);
      });
    });

    const sorted = filtered.sort((a, b) => {
      if (a.attributes.bai_viet_tieu_diem === b.attributes.bai_viet_tieu_diem) {
        return (
          new Date(b.attributes.createdAt).getTime() -
          new Date(a.attributes.createdAt).getTime()
        );
      }
      return (
        (b.attributes.bai_viet_tieu_diem ? 1 : 0) -
        (a.attributes.bai_viet_tieu_diem ? 1 : 0)
      );
    });

    console.log("sorted", sorted);
    setFilteredArticles(sorted);
    setLoading(false);
  };

  useEffect(() => {
    filterArticlesByCategoryName();
  }, [baiVietTieuDiem, detailBaiViet]);
  useEffect(() => {
    console.log("baiVietTieuDiem", baiVietTieuDiem);
  }, [baiVietTieuDiem]);

  const handlePageChange = (page: number): void => {
    fetchData(page);
  };

  const filteredData = data.map((item: any) => {
    const { title, slug, locale, subTitle, seo, id, createdAt } =
      item.attributes;
    return {
      id,
      title,
      slug,
      locale,
      subTitle,
      seo,
      createdAt,
    };
  });
  const recomenData = filteredArticles.map((item: any) => {
    const { title, slug, locale, subTitle, seo, id, createdAt } =
      item.attributes;
    return {
      id,
      title,
      slug,
      locale,
      subTitle,
      seo,
      createdAt,
    };
  });
  const renderCategory = (category: string) => {
    switch (category) {
      case "Sản phẩm":
        return locale === "vi" ? "Sản phẩm" : "Products";
      case "Dịch vụ":
        return locale === "vi" ? "Dịch vụ" : "Services";
      case "Dự án":
        return locale === "vi" ? "Dự án" : "Projects";
      case "Thông tư nghị định":
        return locale === "vi" ? "Thông tư - nghị định" : "Circular - Decree";
      default:
        return category;
    }
  };

  const DetailDanhMuc = () => {
    return (
      <>
        <div className="desktop:pt-[80px] pt-[32px] pb-[64px] container">
          <div className="flex flex-col gap-[24px] desktop:gap-[40px]">
            <h5 className="text-[#28A645]  text-[18px] desktop:text-[20px] font-medium text-center">
              {renderCategory(detailSubCategory[0]?.attributes?.category)}
            </h5>
            <h1 className="text-[24px] laptop:text-[54px] tablet:text-[40px] mobile:text-[32px] font-bold text-center">
              {detailSubCategory[0]?.attributes?.name}
            </h1>
            <p className="text-[#8899A8] text-center">
              {detailSubCategory[0]?.attributes?.description}
            </p>

            <div
              className="blog-content desktop:py-[40px] desktop:px-[120px] mobile:px-0 mobile:pb-[20px]"
              dangerouslySetInnerHTML={{
                __html: detailSubCategory[0]?.attributes?.content
                  ? detailSubCategory[0]?.attributes?.content
                  : "",
              }}
            />
          </div>
        </div>
        {filteredData.length > 0 ? (
          <>
            <div className="container">
              <BoxTinTuc data={filteredData} locale={locale} />
            </div>
            <div className="py-[40px] container flex justify-center">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
              />
            </div>
            <div className="container">
              <ContactEndClient />
            </div>
          </>
        ) : loading ? (
          <div className="flex justify-center py-8">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex h-[500px] bg-[#3B559E] mb-[80px]">
              <div className="w-full h-full flex flex-col justify-center items-center gap-[35px]">
                <h2 className="text-center text-[#fff] text-[48px] font-bold leading-[130px]">
                  {translate("no_article")}
                </h2>

                <Link
                  href="/"
                  className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal"
                >
                  {translate("back_home")}
                </Link>
              </div>
            </div>
            <div className="container">
              <ContactEndClient />
            </div>
          </>
        )}
      </>
    );
  };

  const DetailNew = () => {
    return (
      <>
        {detailBaiViet[0] ? (
          <>
            <div className=" bg-gray-50 ">
              <div className="container mx-auto py-4 text-gray-500 text-base font-medium leading-normal">
                <Link href={"/"}>{locale === "en" ? "Home" : "Trang chủ"}</Link>
                <span className="mx-2"> / </span>
                <Link
                  href={`${
                    breadcum === "Sản phẩm"
                      ? "/san-pham"
                      : breadcum === "Dịch vụ"
                      ? "/dich-vu"
                      : breadcum === "Góc chuyên gia"
                      ? "/goc-chuyen-gia"
                      : breadcum === "Dự án"
                      ? "/du-an"
                      : breadcum === "Thông tư nghị định"
                      ? "/thong-tu-nghi-dinh"
                      : ""
                  }`}
                >
                  {locale === "vi" ? breadcum : renderCategory(breadcum)}
                </Link>
                {breadcum ? <span className="mx-2"> / </span> : null}
                <Link href={slugSubBreadcum ? `/${slugSubBreadcum}` : "/"}>
                  {subBreadcum}
                </Link>
                {subBreadcum ? <span className="mx-2 "> / </span> : null}
                <Link className="text-[#000]" href={``}>
                  {detailBaiViet[0]?.attributes?.title}
                </Link>
              </div>
            </div>
            <div className="container">
              <p className="text-center text-green-600 mobile:text-[18px] tablet:text-[20px] font-medium leading-normal tablet:my-6 mobile:my-4">
                {breadcum && renderCategory(breadcum)}
              </p>
              <h2 className="text-gray-800 laptop:text-[54px] tablet:text-[40px] mobile:text-[32px] font-bold leading-normal text-center laptop:mb-[24px] mobile:mb-[16px]">
                {detailBaiViet[0]?.attributes?.title}
              </h2>
            </div>

            <div
              className="blog-content desktop:py-[40px] laptop:px-[156px] tablet:px-[128px] mobile:px-[16px] mobile:pb-[20px]"
              dangerouslySetInnerHTML={{
                __html: dataBaiViet ? dataBaiViet : "",
              }}
            />

            <div className="container">
              <ContactEndClient />
            </div>
            <div className="bg-[#F3F6FE] py-[80px]">
              <div className="container">
                <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
                  <h2 className="text-black laptop:text-[32px] mobile:text-[18px] font-bold capitalize ">
                    {t("title_post")}
                  </h2>
                  <Link
                    href={`/${locale}/tin-tuc`}
                    className="text-center text-[#3B559E] text-base font-medium leading-normal inline-flex  items-center gap-2.5"
                  >
                    {t("go_to_news_page")}
                    <IconArrowRight width={20} height={20} />
                  </Link>
                </div>
                <BoxTinTuc data={recomenData.slice(0, 3)} locale={locale} />
              </div>
            </div>
          </>
        ) : (
          isHaveData === false && (
            <>
              <div className="">
                <div className="flex laptop:h-[800px] mobile:h-[500px] bg-[#3B559E] mb-[80px]">
                  <div className="w-full h-full flex flex-col justify-center items-center gap-[35px]">
                    <h2 className="text-center text-[#fff] text-[100px] font-bold leading-[130px]">
                      {translate("404")}
                    </h2>
                    <p className="text-[22px] font-[600] text-[#fff]">
                      {translate("not_found")}
                    </p>
                    <p className="text-[16px] font-[400] text-[#fff]">
                      {translate("maybe_delete")}
                    </p>
                    <Link
                      href="/"
                      className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal"
                    >
                      {translate("back_home")}
                    </Link>
                  </div>
                </div>
                <div className="container">
                  <ContactEndClient />
                </div>
              </div>
            </>
          )
        )}
      </>
    );
  };

  const baseUrl = process.env.URL_API;
  return (
    <>
      {checkLastSegmentIsNumeric(slug) ? (
        <MetaData
          seoTitle={seoCategory?.title}
          seoDescription={seoCategory?.description}
          seoKeywords={seoCategory?.keyword}
          seoAuthor="Công ty xử lý nước NTS"
          seoImage={`${baseUrl}${seoCategory?.thumbnail?.data?.attributes?.url}`}
          seoUrl={baseUrl}
          seoType="website"
        />
      ) : (
        <MetaData
          seoTitle={seoDetailNews?.title}
          seoDescription={seoDetailNews?.description}
          seoKeywords={seoDetailNews?.keyword}
          seoAuthor="Công ty xử lý nước NTS"
          seoImage={`${baseUrl}${seoDetailNews?.thumbnail?.data?.attributes?.url}`}
          seoUrl={baseUrl}
          seoType="website"
        />
      )}

      {loading ? (
        <div className="min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {checkLastSegmentIsNumeric(slug) ? <DetailDanhMuc /> : <DetailNew />}
        </>
      )}
    </>
  );
};

export default Page;
