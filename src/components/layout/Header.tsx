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

const Header = (params: any) => {
  const locale = params.locale;
  const t = useTranslations("menu");
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([
    {
      key: "Sản phẩm",
      name: t("products"),
      pathname: "/san-pham",
      label: <div className="flex items-center gap-3">{t("products")}</div>,
      showIcon: true,
    },
    {
      key: "Dịch vụ",
      name: t("services"),
      pathname: "/dich-vu",
      label: <div className="flex items-center gap-3">{t("services")}</div>,
      showIcon: true,
    },
    {
      key: "Dự án",
      name: t("projects"),

      pathname: "/du-an",
      label: <div className="flex items-center gap-3">{t("projects")}</div>,
      showIcon: true,
    },
    {
      key: "Đối tác",
      name: t("partners"),
      pathname: "/doi-tac",
      label: (
        <Link href="/doi-tac" className="flex items-center gap-3">
          {t("partners")}
        </Link>
      ),
      showIcon: false,
    },
    {
      key: "Về chúng tôi",
      name: t("about_us"),
      pathname: "/ve-chung-toi",
      label: <div className="flex items-center gap-3">{t("about_us")}</div>,
      showIcon: true,
    },
    {
      key: "Tin tức",
      name: t("newsTitle"),
      pathname: "/tin-tuc",
      label: (
        <Link href="/tin-tuc" className="flex items-center gap-3">
          {t("newsTitle")}
        </Link>
      ),
      showIcon: false,
    },
    {
      key: "Thông tư nghị định",
      name: t("circular_decree"),
      pathname: "/thong-tu-nghi-dinh",
      label: (
        <div className="flex items-center gap-3">{t("circular_decree")}</div>
      ),
      showIcon: true,
    },
  ]);
  const [activeKey, setActiveKey] = useState<string | null>(pathname);
  const [activeItem, setActiveItem] = useState<any>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataVeChungToi, setDataVeChungToi] = useState<any>([]);
  const fetchDataVeChungToi = async () => {
    const listEndPoint = [
      `${process.env.URL_API}/api/ve-chung-toi?populate=main&locale=${locale}`,
      `${process.env.URL_API}/api/goc-chuyen-gia?locale=${locale}`,
      `${process.env.URL_API}/api/cong-ty-thanh-vien?locale=${locale}`,
      locale === "en"
        ? `${process.env.URL_API}/api/danh-muc-cons?locale=en&filters[category][$eqi]=Dự án&filters[name][$eqi]=Community Project`
        : `${process.env.URL_API}/api/danh-muc-cons?filters[category]=Dự án&filters[name][$eqi]=Dự án cộng đồng`,
    ];
    try {
      const responses = await Promise.all(
        listEndPoint.map((endpoint) => apiService.get<any>(endpoint))
      );
      const [veChungToi, gocChuyenGia, congTyThanhVien, duAnCongDong] =
        responses.map((res) => res.data);
      setDataVeChungToi([
        {
          id: 1,
          name: veChungToi.attributes.main.name,
          description: veChungToi.attributes.main.description,
          slug: "/ve-chung-toi",
        },
        {
          id: 2,
          name: t("expertopinion"),
          description: gocChuyenGia.attributes.description,
          slug: "/goc-chuyen-gia",
        },
        {
          id: 3,
          name: t("member_company"),
          description: congTyThanhVien.attributes.description,
          slug: "/cong-ty-thanh-vien",
        },
        {
          id: 4,
          name: duAnCongDong[0].attributes.name,
          description: duAnCongDong[0].attributes.description,
          slug: duAnCongDong[0].attributes.slug,
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleGetEndPoint = (key: any) => {
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

  const fetchDataMobile = async (key: any) => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-muc-cons?filters[category][$eqi]=${key}&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      const danhMucData = response.data.map((item: any) => ({
        description: item.attributes.description,
        name: item.attributes.name,
        slug: item.attributes.slug,
      }));
      const baiVietPromises = danhMucData.map(async (danhMucItem: any) => {
        const baiVietData = await fetchData(danhMucItem.name);
        return { ...danhMucItem, baiViet: baiVietData };
      });
      return await Promise.all(baiVietPromises);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchDescription = async (name: string) => {
    try {
      const endpoint = `${process.env.URL_API}/api/${name}?populate=main&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      const description = response.data.attributes.main.description;
      return description;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async (name: string) => {
    try {
      const endpoint = `${process.env.URL_API}/api/bai-viets?populate=danh_muc_cons&filters[danh_muc_cons][name][$eq]=${name}&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      return response.data.map((item: any) => ({
        title: item.attributes.title,
        slug: item.attributes.slug,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDataVeChungToi();
  }, [locale]);

  useEffect(() => {
    const fetchMegaMenu = async () => {
      setLoading(true);
      try {
        const newMegaMenu = await Promise.all(
          menuItems.map(async (menu: any) => {
            let danhMuc;
            if (menu.key === "Về chúng tôi") {
              danhMuc = dataVeChungToi;
            } else {
              danhMuc = await fetchDataMobile(menu.key);
            }

            const key = handleGetEndPoint(menu.key);

            const description = await fetchDescription(key);
            return { ...menu, danhMuc, description };
          })
        );

        setMenuItems(newMegaMenu);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMegaMenu();
  }, [locale, dataVeChungToi]);

  // get pathname to active navigation
  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  const handleMouseEnter = (key: string, condition: boolean) => {
    if (condition) {
      // if (key === "Về chúng tôi") {
      //   setActiveKey(key);
      //   setActiveItem(menuItems.filter((item: any) => item.key === activeKey));
      //   setIsMenuOpen(true);
      // } else {

      setActiveKey(key);
      setActiveItem(menuItems.filter((item: any) => item.key === key));
      setIsMenuOpen(true);
      // }
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

  return (
    <header className="flex laptop:h-[100px] mobile:h-[72px] border-spacing-0 bg-white z-50 fixed top-0 left-0 w-screen mobile:shadow ">
      <div className="container">
        <div className="hidden laptop:flex w-full max-w-full  p-0 px-4 h-[100px] mx-auto justify-between">
          <div className="flex w-full">
            <Link href={`/${locale}`} className="my-auto">
              <Image src={NTSLogo.src} alt="NTS Logo" width={80} height={40} />
            </Link>
            <ul className="hidden laptop:flex bg-transparent w-full justify-between mx-8">
              {menuItems.map((item) => {
                const isActive = pathname === item.pathname;
                return (
                  <li
                    key={item.key}
                    className={`border-b-2 border-transparent flex items-center`}
                    onMouseEnter={() => {
                      handleMouseEnter(item.key, item.showIcon);
                    }}
                    onMouseLeave={handleMouseLeave}>
                    <div
                      className={`font-inter text-base font-medium leading-6 hover:text-[#28A645] ${
                        isActive ? "text-[#28A645]" : "text-[#3B559E]"
                      } text-left flex items-center gap-3 cursor-pointer 
                    ${activeKey === item.key ? "text-[#28A645]" : ""}`}>
                      {item.label}
                      {item.showIcon &&
                        (activeKey === item.key ? (
                          <IconAngleUp width="12" height="12" />
                        ) : (
                          <IconAngleDown width="12" height="12" />
                        ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="hidden laptop:flex">
              <LanguageSwitch />
            </div>
          </div>
        </div>
        <div className="mobile:flex laptop:hidden w-full h-[72px] px-[15px] py-4 bg-white justify-between items-center inline-flex">
          <Link href={`/${locale}`}>
            <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
          </Link>
          <div className="w-8 h-8 px-[0.85px] py-[6.30px] justify-center items-center">
            <button
              className="w-[30.30px] h-[19.40px] relative"
              onClick={toggleMenu}>
              <IconMenu />
            </button>

            <MobileMenuNew
              locale={locale}
              isOpen={isOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>

        <MegaMenu
          menuItems={activeItem}
          locale={locale}
          loading={loading}
          activeKey={activeKey}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
    </header>
  );
};

export default Header;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      locale: locale || "vi", // Kiểu của locale là string | undefined
    },
  };
};
