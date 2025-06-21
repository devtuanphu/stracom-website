"use client";
import Image from "next/image";
import NTSLogo from "../../../public/images/logo/logo.png";
import IconAngleDown from "../icons/IconAngleDown";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconAngleUp from "../icons/IconAngleUp";
import LanguageSwitch from "../LanguageSwitch";
import { GetServerSideProps } from "next";
import IconMenu from "../icons/IconMenu";
import MobileMenu from "../MobileMenu";
import MegaMenu from "../MegaMenu";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
import MobileMenuNew from "../MobileMenuNew";
import { Descriptions } from "antd";

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
interface ResponseDataDanhMuc {
  data: {
    id: number;
    attributes: {
      main: {
        name: string;
        description: string;
      };
    };
  }[];
}
interface Menu {
  key: string;
  description: string;
  label: JSX.Element;
  name: string;
  pathname: string;
  showIcon: boolean;
  danhmuc: any;
}

const HeaderNew = (params: any) => {
  const locale = params.locale;
  const t = useTranslations("menu");
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState([
    {
      key: "Về chúng tôi",
      name: t("about_us"),
      pathname: "/ve-chung-toi",
      label: t("about_us"),
      showIcon: true,
    },
    {
      key: "Sản phẩm",
      name: t("products"),
      pathname: "/san-pham",
      label: t("products"),
      showIcon: true,
    },
    {
      key: "Dịch vụ",
      name: t("services"),
      pathname: "/dich-vu",
      label: t("services"),
      showIcon: true,
    },
    {
      key: "Dự án",
      name: t("projects"),
      pathname: "/du-an",
      label: t("projects"),
      showIcon: true,
    },
    {
      key: "Đối tác",
      name: t("partners"),
      pathname: "/doi-tac",
      label: t("partners"),
      showIcon: false,
    },

    {
      key: "Tin tức",
      name: t("newsTitle"),
      pathname: "/tin-tuc",
      label: t("newsTitle"),
      showIcon: false,
    },
    {
      key: "Thông tư nghị định",
      name: t("circular_decree"),
      pathname: "/thong-tu-nghi-dinh",
      label: t("circular_decree"),
      showIcon: true,
    },
  ]);

  const [activeKey, setActiveKey] = useState<string | null>(pathname);
  const [activeItem, setActiveItem] = useState<any>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cachedData, setCachedData] = useState<{ [key: string]: any }>({});

  const handleGetEndPoint = (key: string) => {
    switch (key) {
      case "Sản phẩm":
        return "san-pham";
      case "Products":
        return "san-pham";
      case "Dịch vụ":
        return "dich-vu";
      case "Services":
        return "dich-vu";
      case "Dự án":
        return "du-an";
      case "Project":
        return "du-an";
      case "Về chúng tôi":
        return "ve-chung-toi";
      case "About Us":
        return "ve-chung-toi";
      case "Thông tư nghị định":
        return "thong-tu-nghi-dinh";
      case "Circular - Decree":
        return "thong-tu-nghi-dinh";
      default:
        return "";
    }
  };

  const fetchHeader = async (key: string) => {
    const endpoint = `${process.env.URL_API}/api/custom-${handleGetEndPoint(
      key
    )}?limitDanhMuc=${
      key === "Sản phẩm" || key === "Dự án" ? 3 : 6
    }&limitBaiViet=${
      key === "Sản phẩm" || key === "Dự án" ? 4 : 0
    }&locale=${locale}`;

    try {
      const response = await apiService.get<any>(endpoint);

      const itemData = {
        ...menuItems.find((item) => item.key === key),
        description: response.description,
        danh_muc_cons: response.danh_muc_cons,
      };

      setCachedData((prev) => ({
        ...prev,
        [key]: itemData,
      }));
      setActiveItem(itemData);
    } catch (error) {}
  };
  const fetchDataVeChungToi = async () => {
    if (cachedData["Về chúng tôi"]) {
      setActiveItem({
        ...menuItems.find((item: any) => item.key === "Về chúng tôi"),
        description: cachedData["Về chúng tôi"].description,
        danh_muc_cons: cachedData["Về chúng tôi"].danh_muc_cons,
      });
      return;
    }

    const listEndPoint = [
      `${process.env.URL_API}/api/ve-chung-toi?populate=main&locale=${locale}`,
      `${process.env.URL_API}/api/goc-chuyen-gia?locale=${locale}`,
      `${process.env.URL_API}/api/cong-ty-thanh-vien?locale=${locale}`,
      locale === "en"
        ? `${process.env.URL_API}/api/danh-muc-cons?locale=en&filters[category][$eqi]=Dự án&filters[name][$eqi]=community projects`
        : `${process.env.URL_API}/api/danh-muc-cons?filters[category]=Dự án&filters[name][$eqi]=dự án cộng đồng`,
    ];

    try {
      const responses = await Promise.all(
        listEndPoint.map((endpoint) => apiService.get<any>(endpoint))
      );

      const [veChungToi, gocChuyenGia, congTyThanhVien, duAnCongDong] =
        responses.map((res) => res.data);

      const data = {
        ...menuItems.find((item: any) => item.key === "Về chúng tôi"),
        description: veChungToi.attributes.main.description,
        danh_muc_cons: [
          {
            id: 1,
            name: veChungToi.attributes.main.name,
            description: veChungToi.attributes.main.description,
            slug: "/ve-chung-toi",
          },
          {
            id: 2,
            name: t("expertopinion"),
            description: gocChuyenGia?.attributes?.description,
            slug: "/goc-chuyen-gia",
          },
          {
            id: 3,
            name: t("member_company"),
            description: congTyThanhVien?.attributes?.description,
            slug: "/cong-ty-thanh-vien",
          },
          {
            id: 4,
            name: duAnCongDong[0]?.attributes?.name,
            description: duAnCongDong[0]?.attributes?.description,
            slug: duAnCongDong[0]?.attributes?.slug,
          },
        ],
      };

      setCachedData((prev) => ({
        ...prev,
        "Về chúng tôi": data,
      }));

      setActiveItem({
        ...menuItems.find((item: any) => item.key === "Về chúng tôi"),
        ...data,
      });
    } catch (error) {}
  };

  const handleMouseEnter = async (key: string, condition: boolean) => {
    if (condition) {
      setLoading(true);
      setActiveKey(key);
      setIsMenuOpen(true);

      if (cachedData[key]) {
        console.log("Using cached data for:", key);
        setActiveItem(cachedData[key]);
        setLoading(false);
        return;
      }
      if (key === "Về chúng tôi") {
        await fetchDataVeChungToi();
      } else {
        await fetchHeader(key);
      }
      setLoading(false);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (
      relatedTarget &&
      relatedTarget instanceof HTMLElement &&
      !relatedTarget.closest(".mega-menu-container")
    ) {
      setActiveKey(null);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const foundItem = menuItems.find((item) =>
      pathname.startsWith(`/${item.key}`)
    );
    setActiveKey(foundItem ? foundItem.key : null);
    setIsMenuOpen(false);
    setIsOpen(false);
  }, [pathname, menuItems]);

  // mobileMenu
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("cachedData", cachedData);
  }, [cachedData]);
  useEffect(() => {
    console.log("activeItem", activeItem);
  }, [activeItem]);

  return (
    <>
      <header className="flex laptop:h-[100px] mobile:h-[72px] border-spacing-0 bg-white z-50 fixed top-0 left-0 w-screen mobile:shadow ">
        <div className="container">
          <div className="hidden laptop:flex w-full max-w-full  p-0  h-[100px] mx-auto justify-between">
            <div className="flex w-full">
              <Link href={`/${locale}`} className="my-auto">
                <Image
                  src={NTSLogo.src}
                  alt="NTS Logo"
                  width={80}
                  height={40}
                />
              </Link>
              <ul className="hidden laptop:flex bg-transparent w-full justify-between mx-8">
                {menuItems.map((item) => {
                  const isActive = pathname === item.pathname;
                  return (
                    <li
                      key={item.key}
                      className={`border-b-2 border-transparent flex items-center`}
                    >
                      <div
                        className={`font-inter text-base font-medium leading-6 hover:text-[#28A645] ${
                          isActive ? "text-[#28A645]" : "text-[#3B559E]"
                        } text-left flex items-center gap-3 cursor-pointer 
                    ${activeKey === item.key ? "text-[#28A645]" : ""}`}
                      >
                        <Link href={item.pathname}>{item.label}</Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {/* <div className="hidden laptop:flex">
                <LanguageSwitch />
              </div> */}
            </div>
          </div>
          <div className="mobile:flex laptop:hidden w-full h-[72px] px-[15px] py-4 bg-white justify-between items-center inline-flex">
            <Link href={`/${locale}`}>
              <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
            </Link>
            <div className="w-8 h-8 px-[0.85px] py-[6.30px] justify-center items-center">
              <button
                className="w-[30.30px] h-[19.40px] relative"
                onClick={toggleMenu}
              >
                <IconMenu />
              </button>

              <MobileMenuNew
                locale={locale}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
              />
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed w-full h-full z-40 top-0 left-0 bg-[#000] bg-opacity-30"></div>
      )}
    </>
  );
};

export default HeaderNew;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      locale: locale || "vi", // Kiểu của locale là string | undefined
    },
  };
};
