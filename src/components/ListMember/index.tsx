"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IconAngleRight from "../icons/IconAngleRight";
import Image from "next/image";
import { apiService } from "@/services/api.service";
import Loading from "../Loading";
import { useTranslations } from "next-intl";

interface UrlProps {
  url: string;
  locale: string;
}

interface Logo {
  height: number | `${number}` | undefined;
  width: number | `${number}` | undefined;
  id: number;
  url: string;
  formats: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface Member {
  id: number;
  title: string;
  description: string;
  path: string;
  logo: Logo;
}

interface ResponseData {
  data: Member[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const ListMember = ({ url, locale }: UrlProps) => {
  const baseUrl = process.env.URL_API || "";
  const t = useTranslations("home");

  const [dataThanhVien, setDataThanhVien] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isInitialMount = useRef(true);

  const fetchData = async (page: number) => {
    try {
      const endpoint =
        locale === "vi"
          ? `${url}/1/card-thanh-vien?page=${page}&pageSize=6&locale=${locale}`
          : `${url}/2/card-thanh-vien?page=${page}&pageSize=6&locale=${locale}`;
      const response = await apiService.get<ResponseData>(endpoint);
      setDataThanhVien((prevMembers) => [...prevMembers, ...response.data]);
      setTotalPages(response.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      fetchData(page);
      isInitialMount.current = false;
    }
  }, [page]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchData(nextPage);
  };

  if (!dataThanhVien.length) {
    return (
      <div className="text-center font-bold text-[48px]">Chưa có DATA CMS</div>
    );
  }
  return (
    <div className="pb-[80px]">
      <div className="container">
        <div className="grid grid-cols-12 desktop:gap-[50px] tablet:gap-[32px]">
          {dataThanhVien.map((item) => (
            <div
              key={item.id}
              className="col-span-12 tablet:col-span-6 desktop:col-span-4 pb-[32px] desktop:pb-[0px] ">
              <div className="border border-[#DFE4EA] desktop:h-[450px] mobile:h-[500px] relative">
                <div className="px-[24px] pb-[24px] pt-[100px] flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-[24px]">
                    <div className="flex justify-center ">
                      <div className="max-w-[200px] min-w-[100px] h-[100px] overflow-hidden">
                        <Image
                          src={item.logo ? baseUrl + item.logo.url : ""}
                          alt={item.title}
                          width={item.logo ? item.logo.width : 0}
                          height={item.logo ? item.logo.height : 0}
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <h2 className="text-center font-semibold text-[28px] ">
                      {item.title}
                    </h2>
                    <p className="text-[#6B7280] text-[18px] h-[85px] overflow-y-hidden line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button className="py-[16px] flex items-center text-[16px] text-[#28A645] px-[24px] bg-[#FFFFFF] btn-truy-cap-web">
                      <Link
                        href={item.path || "/"}
                        target="_blank"
                        className="mr-[8px]">
                        {t("visit_our_website")}
                      </Link>
                      <IconAngleRight width="16" height="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {dataThanhVien.length >= 6 ? (
          <div className="flex justify-center pt-[40px]">
            <button
              onClick={handleLoadMore}
              className="py-[12px] px-[24px] bg-[#28A645] text-[white] rounded-[50px] border border-[#28A645] hover:bg-[#fff] hover:text-[#28A645]">
              {t("see_more")}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ListMember;
