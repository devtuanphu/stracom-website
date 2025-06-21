"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "../LanguageSwitch";
import IconClose from "../icons/IconClose";
import IconAngleDown from "../icons/IconAngleDown";
import IconAngleUp from "../icons/IconAngleUp";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";
import Loading from "../Loading";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
import NTSLogo from "../../../public/images/logo/logo.png";
import Skeleton from "react-loading-skeleton";

const MobileMenuNew = ({
  locale,
  isOpen,
  toggleMenu,
}: {
  locale: string;
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const t = useTranslations("menu");
  const [menuItems, setMenuItems] = useState([
    {
      key: "Về chúng tôi",
      name: t("about_us"),
      pathname: "/ve-chung-toi",
      label: <div className="flex items-center gap-3">{t("about_us")}</div>,
      showIcon: true,
    },
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
    if (cachedData[key]) {
      return; // Skip API call if data is already cached
    }

    const endpoint = `${process.env.URL_API}/api/custom-${handleGetEndPoint(
      key
    )}?&locale=${locale}`;
    console.log("engpoint", endpoint);
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
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
    }
  };

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [openSubKeys, setOpenSubKeys] = useState<{ [key: string]: string[] }>(
    {}
  );

  const rootSubmenuKeys = menuItems.map((item: any) => item.key);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSubOpenChange = (rootKey: string, keys: string[]) => {
    const latestOpenKey = keys.find(
      (key) => openSubKeys[rootKey]?.indexOf(key) === -1
    );
    setOpenSubKeys({
      ...openSubKeys,
      [rootKey]: latestOpenKey ? [latestOpenKey] : [],
    });
  };

  const renderTitleWithIcon = (title: string, key: string) => {
    const isOpen = openKeys.includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? (
          <IconAngleUp width="16" height="16" />
        ) : (
          <IconAngleDown width="16" height="16" />
        )}
      </div>
    );
  };

  const renderChildTitleWithIcon = (
    title: string,
    key: string,
    rootKey: string
  ) => {
    const isOpen = openSubKeys[rootKey] && openSubKeys[rootKey].includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? <IconMinus /> : <IconPlus />}
      </div>
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-4 shadow px-[31px] py-4">
        <Link href={`/${locale}`} className="my-auto">
          <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
        </Link>
        <button onClick={toggleMenu} className="text-lg">
          <IconClose />
        </button>
      </div>

      {loading ? (
        <Menu mode="inline" className="mt-4 flex flex-col gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <Menu.Item
              key={index}
              className="text-black text-lg font-semibold leading-relaxed"
            >
              <Skeleton height={30} />
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        <Menu
          mode="inline"
          className="mt-4 flex flex-col gap-2"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {menuItems.map((item: any) => {
            const cachedItem = cachedData[item.key];
            if (
              !cachedItem?.danh_muc_cons ||
              cachedItem?.danh_muc_cons.length === 0
            ) {
              return (
                <Menu.Item
                  key={item.key}
                  className="text-black text-lg font-semibold leading-relaxed"
                >
                  <Link
                    href={item.pathname || "/"}
                    className="!text-black !text-lg !font-semibold leading-relaxed"
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            }
            return (
              <Menu.SubMenu
                key={item.key}
                title={renderTitleWithIcon(item.name, item.key)}
                className="text-black text-lg font-semibold px-0"
              >
                <Menu
                  mode="inline"
                  openKeys={openSubKeys[item.key] || []}
                  onOpenChange={(keys) => onSubOpenChange(item.key, keys)}
                >
                  {item.key === "Về chúng tôi" ? null : (
                    <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                      <Link
                        href={item.pathname || "/"}
                        className="!text-[#3B559E] text-base font-normal leading-relaxed px-0"
                      >
                        {locale === "vi" ? "Đến trang " : "Go to "} {item.name}
                      </Link>
                    </Menu.Item>
                  )}

                  {cachedItem.danh_muc_cons.map((danhMucItem: any) => {
                    if (
                      !danhMucItem.bai_viet ||
                      danhMucItem.bai_viet.length === 0
                    ) {
                      return (
                        <Menu.Item
                          key={danhMucItem.slug}
                          className="!text-base !font-normal !text-[#000]"
                        >
                          <Link
                            href={danhMucItem.slug || "/"}
                            className="!text-base !font-normal !text-[#000] "
                          >
                            {danhMucItem.name}
                          </Link>
                        </Menu.Item>
                      );
                    }
                    return (
                      <Menu.SubMenu
                        key={danhMucItem.slug}
                        title={renderChildTitleWithIcon(
                          danhMucItem.name,
                          danhMucItem.slug,
                          item.key
                        )}
                        className="!text-base !font-normal !text-[#000] "
                      >
                        <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                          <Link
                            href={danhMucItem.slug || "/"}
                            className="!text-[#3B559E] text-base font-normal leading-relaxed"
                          >
                            {locale === "vi" ? "Đến trang " : "Go to "}{" "}
                            {danhMucItem.name}
                          </Link>
                        </Menu.Item>
                        {danhMucItem.bai_viet
                          .slice(0, 4)
                          .map((baiVietItem: any) => (
                            <Menu.Item
                              key={baiVietItem.slug}
                              className="text-[#3B559E] text-base font-normal leading-relaxed"
                            >
                              <Link
                                href={baiVietItem.slug || "/"}
                                className="!text-gray-500 !text-base !font-normal leading-relaxed"
                              >
                                {baiVietItem.title}
                              </Link>
                            </Menu.Item>
                          ))}
                      </Menu.SubMenu>
                    );
                  })}
                </Menu>
              </Menu.SubMenu>
            );
          })}
        </Menu>
      )}
    </div>
  );
};

export default MobileMenuNew;
