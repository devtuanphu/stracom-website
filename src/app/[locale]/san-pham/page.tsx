import IconAngleRightColorFull from "@/components/icons/IconAngleRightColorFull";
import bannerSanPham from "../../../../public/images/banner/banner-san-pham.png";
import Image from "next/image";
import Link from "next/link";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import PageMenu from "@/components/PageMenu";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
import { useEffect } from "react";
import { getTranslations } from "next-intl/server";
import Loading from "@/components/Loading";
const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets"].toString(),
};
const searchSanPham = {
  populate: ["main.seo.thumbnail"].toString(),
};
const searchDataDanhMuc = {
  populate: ["bai_viets.seo", "danh_muc_cons.bai_viets.seo "].toString(),
};

const searchParamsDanhMucSanPham = new URLSearchParams(
  searchDataDanhMuc
).toString();
const searchParamsSanPham = new URLSearchParams(searchSanPham).toString();
const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataBaiViet = await fetchData(
    `${ENDPOINT.GET_SANPHAM}?${searchParamsSanPham}}&locale=${params.params.locale}`
  );
  const seo =
    (dataBaiViet as { data: { attributes: { main: { seo: any } } } })?.data
      ?.attributes?.main?.seo || {};

  const baseUrl = process.env.URL_API;

  return {
    metadataBase: new URL(baseUrl || ""),
    title: seo.title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
    description:
      seo.description ||
      "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
    keywords:
      seo.keywords ||
      "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
    authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/tin-tuc`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: "Image description",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle || seo.title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}
async function fetchData(endpoint: string) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const page = async (params: any) => {
  let locale = params.params.locale;

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}&locale=${locale}`
  );
  const dataSanPham = await fetchData(
    `${ENDPOINT.GET_SANPHAM}?${searchParamsSanPham}&locale=${locale}`
  );
  // const dataDanhMuc = await fetchData(
  //   `${ENDPOINT.GET_DANHMUCCON}?filters[category][$eqi]=Sản phẩm&locale=${locale}`
  // );
  const sanPham = (
    dataSanPham as {
      data: {
        attributes: {
          main: {
            name: string;
            description: string;
          };
        };
      };
    }
  )?.data?.attributes?.main;
  // const danhMuc = (
  //   dataDanhMuc as {
  //     data: {
  //       attributes: {
  //         name: string;
  //         slug: string;
  //         description: string;
  //         danh_muc_cons: {
  //           data: {
  //             attributes: {
  //               name: string;
  //               slug: string;
  //               description: string;
  //               bai_viets: {
  //                 data: {
  //                   attributes: {
  //                     title: string;
  //                     slug: string;
  //                     content: string;
  //                     type: string;
  //                     bai_viet_tieu_diem: boolean;
  //                     seo: {
  //                       title: string;
  //                       description: string;
  //                       keyword: string;
  //                     };
  //                   };
  //                 }[];
  //               };
  //             };
  //           }[];
  //         };

  //         bai_viets: {
  //           data: {
  //             attributes: {
  //               title: string;
  //               slug: string;
  //               content: string;
  //               type: string;
  //               bai_viet_tieu_diem: boolean;
  //               seo: {
  //                 title: string;
  //                 description: string;
  //                 keyword: string;
  //               };
  //             };
  //           }[];
  //         };
  //       };
  //     }[];
  //   }
  // )?.data;

  const baiViet = dataTinTuc as {
    data: {
      attributes: {
        id: number;
        title: string;
        slug: string;
        type: string;
        bai_viet_tieu_diem: boolean;
        danh_muc_bai_viets: {
          data: {
            attributes: {
              name: string;
            };
          }[];
        };
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
      };
    }[];
  };

  const tintuc = baiViet?.data
    .filter((item) => item?.attributes?.type === "Tin tức")
    .map((item) => item.attributes);

  const t = await getTranslations("detail_post");
  const translate = await getTranslations("menu");

  return (
    <div>
      <div className="relative w-full h-[18.5%] desktop:min-h-[682px] laptop:min-h-[455px] tablet:min-h-[400px] mobile:min-h-[200px] overflow-hidden">
        <Image
          src={bannerSanPham || "/"}
          alt="banner"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="container">
        <div className=" flex-col justify-start items-center gap-6 flex mt-[40px]">
          <h2 className="text-black mobile:text-[32px] tablet:text-[40px] desktop:text-[54px] font-bold  capitalize leading-normal">
            {sanPham?.name || "chưa có content CMS"}
          </h2>
          <p className="text-gray-500 text-xl font-medium mobile:text-[16px] tablet:text-[20px]   leading-normal desktop:px-[120px] text-center">
            {sanPham?.description || "chưa có content CMS"}
          </p>
        </div>
        <PageMenu menu="san-pham" locale={locale} />
      </div>
      <div className="bg-[#F3F6FE] py-[80px]">
        <div className="container">
          <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
            <h2 className="text-black text-[32px] font-bold capitalize leading-[51.20px]">
              {translate("news")}
            </h2>
            <Link
              href={`/${locale}/tin-tuc`}
              className="text-center text-[#3B559E] text-base font-medium leading-normal inline-flex gap-2.5  hover:text-[#28A645] transition-all ease-linear"
            >
              {t("go_to_news_page")} <IconArrowRight width={20} height={20} />
            </Link>
          </div>
          <BoxTinTuc data={tintuc.slice(0, 3)} locale={locale} />
        </div>
      </div>
      <div className="container">
        <ContactEnd />
      </div>
    </div>
  );
};
export default page;
