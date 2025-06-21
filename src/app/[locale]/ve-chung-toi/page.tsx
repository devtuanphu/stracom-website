import React from "react";
import Image from "next/image";
import "../../../styles/pages/ve-chung-toi.css";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import imageOne from "../../../../public/images/ve-chung-toi/01.png";
import imageTwo from "../../../../public/images/ve-chung-toi/02.png";
import imageThree from "../../../../public/images/ve-chung-toi/03.png";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { Metadata } from "next";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { getTranslations } from "next-intl/server";

const searchData = {
  populate: [
    "main.seo.thumbnail",
    "main.videoAbout",
    "main.boxAbout",
    "main.cacTongThau",
    "main.cacDoiTacNuocNgoai",
    "main.cacChuDauTuNuocNgoai",
    "main.cacCongTyVaTapDoan",
  ].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_VECHUNGTOI}?${searchParams}}&locale=${params.params.locale}`
  );
  const seo =
    (dataVeChungToi as { data: { attributes: { seo: any } } })?.data?.attributes
      ?.seo || {};

  const baseUrl = process.env.URL_API;

  return {
    metadataBase: new URL(baseUrl || ""),
    title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
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
      url: `${baseUrl}/home`,
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
        seo.twitterTitle ||
        seo.title ||
        "Trang chủ - Công ty TNHH Kỹ thuật NTS",
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
  const t = await getTranslations("aboutUs");
  let locale = params.params.locale;
  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_VECHUNGTOI}?${searchParams}&locale=${locale}`
  );

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}&locale=${locale}`
  );

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

  const baseUrl = process.env.URL_API;
  const contentFirst = (
    dataVeChungToi as {
      data: { attributes: { main: { contentFirst: string } } };
    }
  )?.data?.attributes?.main.contentFirst;
  const contentEnd = (
    dataVeChungToi as { data: { attributes: { main: { contentEnd: string } } } }
  )?.data?.attributes?.main.contentEnd;
  const boxAbout = (
    dataVeChungToi as {
      data: {
        attributes: {
          main: {
            boxAbout: { id: number; title: string; description: string }[];
          };
        };
      };
    }
  )?.data?.attributes?.main.boxAbout;

  const videoAbout = (
    dataVeChungToi as {
      data: {
        attributes: {
          main: {
            videoAbout: {
              data: {
                attributes: {
                  width: number;
                  height: number;
                  url: string;
                  ext: string;
                };
              };
            };
          };
        };
      };
    }
  )?.data?.attributes?.main.videoAbout?.data?.attributes;

  const cacTongThau = (
    dataVeChungToi as {
      data: {
        attributes: { main: { cacTongThau: { id: number; item: string }[] } };
      };
    }
  )?.data?.attributes?.main.cacTongThau;
  const cacDoiTacNuocNgoai = (
    dataVeChungToi as {
      data: {
        attributes: {
          main: { cacDoiTacNuocNgoai: { id: number; item: string }[] };
        };
      };
    }
  )?.data?.attributes?.main.cacDoiTacNuocNgoai;
  const cacChuDauTuNuocNgoai = (
    dataVeChungToi as {
      data: {
        attributes: {
          main: { cacChuDauTuNuocNgoai: { id: number; item: string }[] };
        };
      };
    }
  )?.data?.attributes?.main.cacChuDauTuNuocNgoai;
  const cacCongTyVaTapDoan = (
    dataVeChungToi as {
      data: {
        attributes: {
          main: { cacCongTyVaTapDoan: { id: number; item: string }[] };
        };
      };
    }
  )?.data?.attributes?.main.cacCongTyVaTapDoan;

  const supportedVideoExtensions = [".mp4", ".mov", ".avi"];
  const supportedImageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

  return (
    <>
      <div className=" justify-center ">
        <div className="container">
          <div className="flex justify-center py-[67px]">
            <Image
              src="/images/ve-chung-toi/logo-ve-toi.png"
              alt="Về NTS"
              width={653}
              height={97}
            />
          </div>
          <div className="flex justify-center pt-[40px] overflow-hidden">
            <div className="max-w-[1000px]">
              <p className="text-[20px] font-medium">
                {/* Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định hướng trở
                thành nhà cung cấp hàng đầu cho các giải pháp kỹ thuật công
                trình. Tất cả đều hướng đến trọng tâm là phục vụ tiện ích cho
                cuộc sống một cách bền vững và lâu dài. Theo đó những lĩnh vực
                chính mà NTS theo đuổi một cách tâm huyết ngay từ những ngày đầu
                là: Tư vấn cơ điện, Xử lý nước, Tái sử dụng nước; Cung cấp thiết
                bị sân vườn, thiết bị tưới cây; Thiết bị thu hồi nước mưa và các
                tiện ích khác… */}
                {contentFirst || "description "}
              </p>
              <div className="pt-[40px] overflow-hidden relative">
                {(videoAbout &&
                  supportedVideoExtensions.includes(videoAbout.ext) && (
                    <video controls>
                      <source
                        src={`${baseUrl}${videoAbout.url}`}
                        width={1920}
                        height={1080}
                        type={`video/${videoAbout.ext.slice(1)}`}
                      />
                    </video>
                  )) ||
                  (videoAbout &&
                    supportedImageExtensions.includes(videoAbout.ext) && (
                      <Image
                        src={`${baseUrl}${videoAbout.url}` || "/"}
                        layout="responsive"
                        width={1920}
                        height={1080}
                        alt="Về chúng tôi"
                        className="rounded-[32px]"
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-[24px]">
          <div className="flex justify-center">
            <div className="max-w-[1000px] pb-[40px]">
              <div className="grid grid-cols-12 gap-4 tablet:gap-8 mobile:gap-4">
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    {t("contractors")}
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacTongThau &&
                      cacTongThau.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    {t("partners")}
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacDoiTacNuocNgoai &&
                      cacDoiTacNuocNgoai.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                    {/* <li className="text-[20px] font-medium">
                      Claber Spa Italy
                    </li>
                    <li className="text-[20px] font-medium">Ecopa Spa Italy</li>
                    <li className="text-[20px] font-medium">
                      Solveit Vina Korea
                    </li> */}
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    {t("investors")}
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacChuDauTuNuocNgoai &&
                      cacChuDauTuNuocNgoai.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    {t("corporations")}
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacCongTyVaTapDoan &&
                      cacCongTyVaTapDoan.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <p className="text-[20px] font-medium laptop:mt-[40px] tablet:mt-[32px] mobile:mt-4">
                {contentEnd || "description "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* <BoxTinTuc data={tintuc ? tintuc.slice(0, 3) : []} /> */}
        <ContactEnd />
      </div>
    </>
  );
};

export default page;
