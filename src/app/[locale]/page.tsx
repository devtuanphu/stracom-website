"use server";
import SlideHome from "@/components/Slidehome/SlideHome";
import SliderKhachHang from "@/components/SlideKhachHang/SliderKhachHang";
import "../../styles/pages/home.css";
import Image from "next/image";
import SlideMember from "@/components/SlideMember/SlideMember";
import Construction from "@/components/Construction/Construction";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import bannerMember from "../../../public/images/bannerHome/banner-member.png";
import Link from "next/link";
import AboutUsSlider from "@/components/AboutUsSlider";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";

import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

const searchData = {
  populate: [
    "seo.thumbnail",
    "banner.urlImage",
    "listlogo.urlImage",
    "gioiThieu",
    "gioiThieu.image1",
    "gioiThieu.image2",
    "gioiThieu.image3",
    "boxServices",
    "descriptionThanhVien",
    "cardThanhVien.logo",
  ].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchData(endpoint: string) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataHome = await fetchData(
    `${ENDPOINT.GET_HOME}?${searchParams}}&locale=${params.params.locale}`
  );
  const seo =
    (dataHome as { data: { attributes: { seo: any } } })?.data?.attributes
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

interface HomeProps {
  banner: {
    urlImage: string;
    [key: string]: any;
  }[];
  listlogo: {
    urlImage: string;
    [key: string]: any;
  }[];
  gioiThieu: {
    description: string;
    image1: { url: string };
    image2: { url: string };
    image3: { url: string };
    [key: string]: any;
  };
  boxService: any[];
  descriptionThanhVien: string;
  cardThanhVien: any[];
}

const Home: React.FC = async (params: any) => {
  let locale = params.params.locale;

  const dataHome = await fetchData(
    `${ENDPOINT.GET_HOME}?${searchParams}&locale=${locale}`
  );

  const baseUrl = process.env.URL_API;
  const listlogo =
    (dataHome as { data: { attributes: { listlogo: any } } })?.data?.attributes
      ?.listlogo || [];

  const banner = (dataHome as { data: { attributes: { banner: any } } })?.data
    ?.attributes?.banner;

  const gioiThieu = (dataHome as { data: { attributes: { gioiThieu: any } } })
    ?.data?.attributes?.gioiThieu;
  const gioiThieuImage1 = (
    dataHome as {
      data: {
        attributes: {
          gioiThieu: { image1: { data: { attributes: { url: string } } } };
        };
      };
    }
  )?.data?.attributes?.gioiThieu?.image1?.data?.attributes?.url;
  const gioiThieuImage2 = (
    dataHome as {
      data: {
        attributes: {
          gioiThieu: { image2: { data: { attributes: { url: string } } } };
        };
      };
    }
  )?.data?.attributes?.gioiThieu?.image2?.data?.attributes?.url;
  const gioiThieuImage3 = (
    dataHome as {
      data: {
        attributes: {
          gioiThieu: { image3: { data: { attributes: { url: string } } } };
        };
      };
    }
  )?.data?.attributes?.gioiThieu?.image3?.data?.attributes?.url;
  const boxService =
    (dataHome as { data: { attributes: { boxServices: any } } })?.data
      ?.attributes?.boxServices || [];
  const descriptionThanhVien =
    (dataHome as { data: { attributes: { descriptionThanhVien: any } } })?.data
      ?.attributes?.descriptionThanhVien || [];
  const descriptionDuAn =
    (dataHome as { data: { attributes: { descriptionDuAn: any } } })?.data
      ?.attributes?.descriptionDuAn || [];

  const cardThanhVien = (
    dataHome as { data: { attributes: { cardThanhVien: any } } }
  )?.data?.attributes?.cardThanhVien;

  const t = await getTranslations("home");

  return (
    <main>
      <SlideHome banner={banner} />

      <div className="flex justify-center">
        <div className="container">
          <div className="laptop:pb-[80px] mobile:pb-[72px] laptop:pt-[48px] mobile:pt-[40px]">
            <SliderKhachHang listlogo={listlogo} />
          </div>
        </div>
      </div>
      <div className="section-gioi-thieu py-6">
        <div>
          <div className="flex justify-center">
            <div className="container z-30">
              <div className="grid laptop:grid-cols-2 mobile:grid-cols-1 laptop:gap-[45px] mobile:gap-[72px]">
                <div className="col-span-1 grid grid-cols-2 tablet:gap-[25px] mobile:gap-4">
                  <div className="relative h-full desktop:max-h-[400px] laptop:max-h-[320px] tablet:max-h-[390px] mobile:max-h-[200px] rounded-2xl overflow-hidden my-auto">
                    <Image
                      src={`${baseUrl}${gioiThieuImage1}` || "/"}
                      alt="Image 1"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-[25px]">
                    <div className="flex-1 relative desktop:min-h-[400px] laptop:min-h-[320px] tablet:min-h-[390px] mobile:min-h-[200px] rounded-2xl overflow-hidden">
                      <Image
                        src={`${baseUrl}${gioiThieuImage2}` || "/"}
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1 relative desktop:min-h-[400px] laptop:min-h-[320px] tablet:min-h-[390px] mobile:min-h-[200px] rounded-2xl overflow-hidden">
                      <Image
                        src={`${baseUrl}${gioiThieuImage3}` || "/"}
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="gap-6">
                    <h4 className="text-[#3B559E] desktop:text-5xl mobile:text-[28px] tablet:text-[40px] font-semibold capitalize tablet:leading-[76.80px] mobile:leading-[44.8px] mobile:text-center laptop:text-left">
                      {t("introduce_about_us")}
                    </h4>
                    <div className="text-gray-900 desktop:text-2xl mobile:text-base tablet:text-[20px] font-medium leading-[38.40px] laptop:my-6 mobile:my-4 laptop:text-left mobile:text-center">
                      {gioiThieu && gioiThieu?.description}
                    </div>
                    <div className="inline-flex mobile:justify-center laptop:justify-start  w-full">
                      <Link
                        href={`/${locale}/ve-chung-toi`}
                        className="bg-[#3B559E] text-[#fff] py-[12px] px-[24px] rounded-[50px] border border-[#3B559E] hover:bg-[#fff] hover:text-[#3B559E]"
                      >
                        {t("about_us")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[0px] laptop:h-[110px]"></div>
      </div>
      <AboutUsSlider dataBoxService={boxService} locale={locale} />
      <div className="section-member tablet:my-[120px] mobile:my-[32px] relative">
        <Image
          src={bannerMember.src || "/"}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="-z-10"
        />
        <div className="flex justify-center">
          <div className="container">
            <div className="grid grid-cols-12 gap-6 pt-[5%]">
              <div className="col-span-12">
                <div className="flex justify-center">
                  <div>
                    <h2 className="font-bold laptop:text-[48px] tablet:text-[40px] mobile:text-[28px] text-center">
                      {t("member_company")}
                    </h2>
                    <p className="pt-[24px] mobile:text-[16px] tablet:text-[20px] laptop:text-[18px] max-w-[572px] font-medium text-center">
                      {descriptionThanhVien && descriptionThanhVien}
                    </p>
                    <div className="pt-[24px] flex justify-center">
                      <Link
                        href={"/cong-ty-thanh-vien"}
                        className="py-[12px] px-[24px] bg-[#28A645] text-[white] rounded-[50px] border border-[#28A645] hover:bg-[#fff] hover:text-[#28A645]"
                      >
                        {t("see_more")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 relativ flex justify-center">
                <div className="h-[417px] w-[356px] card-member relative z-30">
                  <SlideMember cardThanhVien={cardThanhVien} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[80px]">
        <div className="flex justify-center">
          <div className="laptop:w-[1038px]">
            <div className="text-center">
              <h3 className="text-[#28A645] text-[20px] font-bold">
                {t("project")}
              </h3>
              <h2 className="text-[#111928] laptop:text-[48px] tablet:text-[40px] mobile:text-[28px]  mobile:font-[600] laptop:py-[16px]">
                {t("our_project")}
              </h2>
              <div className="flex justify-center px-4">
                <p className="laptop:text-[#637381] tablet:text-[#1F2A37] tablet:text-[20px] mobile:text-base tablet:leading-[32px] laptop:w-[572px] laptop:font-[400] mobile:font-[500] ">
                  {(descriptionDuAn && descriptionDuAn) ||
                    "no content description"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="container">
            <div className="pt-[40px]">
              <Construction locale={locale} />
            </div>
            <ContactEnd />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
