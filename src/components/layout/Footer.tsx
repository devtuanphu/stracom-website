"use server";
import logoFullWidth from "../../../public/images/logo/logo-fullwidth.png";
import LogoBoCongThuong from "../../../public/images/logo/logoBoCongThuong.png";
import IconPhone from "../icons/IconPhone";
import IconLocation from "../icons/IconLocation";
import Map from "../Map";
import Image from "next/image";
import Link from "next/link";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { getTranslations } from "next-intl/server";

const searchData = {
  populate: [
    "phone",
    "address",
    "sanpham",
    "dichvu",
    "congty",
    "icon.urlIcon",
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
const Footer = async (locale: any) => {
  const t = await getTranslations("footer");
  const dataFooter = await fetchData(
    `${ENDPOINT.GET_FOOTER}?${searchParams}&locale=${locale.locale}`
  );
  const baseUrl = process.env.URL_API;

  const phoneNumber = (dataFooter as { data: { attributes: { phone: any } } })
    ?.data?.attributes.phone;
  const address = (dataFooter as { data: { attributes: { address: any } } })
    ?.data?.attributes.address;
  const sanpham = (
    dataFooter as {
      data: {
        attributes: { sanpham: { id: any; title: any; path: string }[] };
      };
    }
  )?.data?.attributes.sanpham;
  const giayphep = (
    dataFooter as {
      data: {
        attributes: { giayphep: string };
      };
    }
  )?.data?.attributes.giayphep;
  const banquyen = (
    dataFooter as {
      data: {
        attributes: { banquyen: string };
      };
    }
  )?.data?.attributes.banquyen;
  const congty = (
    dataFooter as {
      data: {
        attributes: { congty: { id: any; title: any; path: string }[] };
      };
    }
  )?.data?.attributes.congty;
  const dichvu = (
    dataFooter as {
      data: {
        attributes: { dichvu: { id: any; title: any; path: string }[] };
      };
    }
  )?.data?.attributes.dichvu;
  const icon = (
    dataFooter as {
      data: {
        attributes: {
          icon: {
            id: any;
            urlIcon: {
              data: {
                attributes: { url: string; width: number; height: number };
              };
            };
            alt: string;
            path: string;
          }[];
        };
      };
    }
  )?.data?.attributes.icon;

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9277600307532!2d106.77582227570356!3d10.816840358445626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526f09a002519%3A0x5490599bcffafcdb!2zMTUgxJAuIFPhu5EgMywgS2h1IGTDom4gY8awIEdpYSBIb8OgLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1716304643844!5m2!1sen!2s";

  return (
    <>
      <footer>
        <div className="grid grid-cols-1 laptop:grid-cols-12 px-[16px] desktop:px-[135px] desktop:pt-[75px] pt-[40px] pb-4 bg-[#3B559E] gap-4">
          <div className="mobile:col-span-12 laptop:col-span-3">
            <div className=" mobile:col-span-12  laptop:col-span-3">
              <div className="flex-col justify-start items-start gap-4 flex w-full">
                <div className="px-2 pb-4 rounded-lg flex-col justify-start items-start gap-4 flex">
                  <Image
                    src={logoFullWidth.src || "/"}
                    alt="logo NTS"
                    width={304}
                    height={40}
                  />
                </div>
                <div className="justify-start items-center gap-2.5 desktop:inline-flex mobile:flex">
                  <div className=" justify-center items-center desktop:inline-flex mobile:flex">
                    <div className="">
                      <a href={`tel:${phoneNumber}`} target="_blank">
                        <IconPhone />
                      </a>
                    </div>
                  </div>
                  <a
                    href={`tel:${phoneNumber}}`}
                    target="_blank"
                    className="text-white text-sm font-medium  leading-snug hover:text-[#28A645] transition-colors ease-linear">
                    {phoneNumber}
                  </a>
                </div>
                <div className="justify-start items-center gap-2.5 desktop:inline-flex mobile:flex">
                  <div className=" justify-center items-center flex">
                    <div className=" relative">
                      <a
                        href="https://maps.app.goo.gl/5Xvr5GSDVnPz393Y9"
                        target="_blank">
                        <IconLocation />
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/5Xvr5GSDVnPz393Y9"
                    target="_blank"
                    className=" text-white text-sm font-medium  leading-snug desktop:max-w-[300px] laptop:w-full hover:text-[#28A645] transition-colors ease-linear">
                    {address}
                  </a>
                </div>
                <div className="w-full desktop:max-w-[312px] desktop:max-h-[312px] mobile:w-full mobile:h-full">
                  <Map
                    src={mapSrc}
                    className="mobile:aspect-1.55 desktop:aspect-[6/5]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mobile:col-span-12 laptop:col-start-4 laptop:col-end-13 desktop:pl-[40px] laptop:pl-[24px] desktop:flex justify-between mobile:grid mobile:grid-cols-2 gap-4">
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex flex-col gap-6">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  {t("products")}
                </p>
                <div className=" h-24 flex-col justify-start items-start gap-3 inline-flex">
                  {sanpham &&
                    sanpham?.map((item) => {
                      return (
                        <Link
                          key={item?.id}
                          href={item?.path || "/"}
                          className="text-white text-base font-normal  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                          {item?.title}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex flex-col gap-6">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2 ">
                  {t("services")}
                </p>
                <div className="flex-col justify-start items-start gap-3 flex">
                  {dichvu &&
                    dichvu?.map((item) => {
                      return (
                        <Link
                          key={item?.id}
                          href={item?.path || "/"}
                          className="text-white text-base font-normal  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                          {item?.title}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex flex-col gap-6">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  {t("NTS_company")}
                </p>
                <div className="flex-col justify-start items-start gap-3 flex">
                  {congty &&
                    congty?.map((item) => {
                      return (
                        <Link
                          key={item?.id}
                          href={item?.path || "/"}
                          className="text-white text-base font-normal  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                          {item?.title}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex flex-col gap-6">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  {t("followUs")}
                </p>
                <div className="flex-col justify-start items-start gap-[25px] flex">
                  <div className="grid grid-cols-5 gap-[15px]">
                    {icon &&
                      icon?.map((item) => {
                        return (
                          <div key={item?.id}>
                            <a href={item?.path || "/"} target="_blank">
                              <Image
                                src={
                                  `${baseUrl}${item?.urlIcon?.data?.attributes?.url}` ||
                                  "/"
                                }
                                alt={item?.alt}
                                width={32}
                                height={32}
                              />
                            </a>
                          </div>
                        );
                      })}
                    {/* <div className="">
                      <IconFacebookRounded />
                    </div>
                    <div className="">
                      <IconYoutubeRounded />
                    </div>
                    <div className="">
                      <IconYoutubeRounded />
                    </div>
                    <div className="">
                      <IconYoutubeRounded />
                    </div>
                    <div className="">
                      <IconYoutubeRounded />
                    </div>
                    <div className="">
                      <IconYoutubeRounded />
                    </div> */}
                  </div>
                  <Image
                    src={LogoBoCongThuong.src || "/"}
                    alt="logo Bộ Công Thương"
                    width={186}
                    height={70}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" tablet:block w-full px-2 py-4 border-t bg-[#3B559E] border-white justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-white text-base font-normal  leading-normal ">
            <p>{giayphep ? giayphep : t("licence")}</p>
            <p>{banquyen ? banquyen : <>Copyright 2024 © NTSE.VN </>}</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
