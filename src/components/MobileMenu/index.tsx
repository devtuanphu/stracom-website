import React, { useEffect, useState } from "react";
import IconClose from "../icons/IconClose";
import IconGlobe from "../icons/IconGlobe";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import Link from "next/link";
import IconAngleLeft from "../icons/IconAngleLeft";
import IconArrowRight from "../icons/IconArrowRight";

interface MenuItem {
  name?: string;
  url: string;
  children: MenuItem[];
  content?: MenuItem[];
  baiViet?: MenuItem[];
  title?: string; // Thêm thuộc tính title (optional)
}

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  data: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  data,
  isOpen,
  toggleMenu,
}) => {
  const [mobileMenu, setMobileMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const newMegaMenu = data.map((item: any) => ({
        key: item.attributes.slug,
        title: item.attributes.name,
        description: item.attributes.description,
        url: `/${item.attributes.slug}`,
        baiViet: item.attributes.bai_viets.data.map((baiViet: any) => ({
          title: baiViet.attributes.title,
          url: `/${baiViet.attributes.slug}`,
          icon: <IconAngleRight width={"16"} height={"16"} />,
        })),
        content: item.attributes.danh_muc_cons.data.map((subItem: any) => ({
          title: subItem.attributes.name,
          description: subItem.attributes.description,
          url: `${subItem.attributes.slug}`, // Hoặc điều chỉnh đường dẫn tùy ý
          icon: <IconAngleRightColorFull />,
          baiViet: subItem.attributes.bai_viets.data.map((baiViet: any) => ({
            title: baiViet.attributes.title,
            url: `/${baiViet.attributes.slug}`,
            icon: <IconAngleRight width={"16"} height={"16"} />,
          })),
        })),
      }));

      setMobileMenu(newMegaMenu);
      setIsLoading(false);
    }
  }, [data]);

  const [currentMenu, setCurrentMenu] = useState<MenuItem[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<MenuItem[]>([]);
  const [previousMenu, setPreviousMenu] = useState<MenuItem[]>([]);
  const [menuTransition, setMenuTransition] = useState<string>("enter");

  useEffect(() => {
    if (mobileMenu.length > 0) {
      setCurrentMenu(mobileMenu);
      setBreadcrumb([{ title: "Menu", children: mobileMenu, url: "/" }]);
    }
  }, [mobileMenu]);

  const handleMenuItemClick = (item: any) => {
    setMenuTransition("exit");
    setTimeout(() => {
      if (item.baiViet && item.baiViet.length > 0) {
        setCurrentMenu(item.baiViet);
      } else if (item.content && item.content.length > 0) {
        setCurrentMenu(item.content);
      } else {
        window.location.href = item.url;
        return;
      }
      setBreadcrumb([...breadcrumb, item]);
      setMenuTransition("enter");
    }, 300);
  };
  const handleBack = () => {
    if (breadcrumb.length > 1) {
      setMenuTransition("exit");
      setTimeout(() => {
        const newBreadcrumb = [...breadcrumb];
        newBreadcrumb.pop();
        const prevLevel = newBreadcrumb[newBreadcrumb.length - 1];

        setCurrentMenu(prevLevel.content || prevLevel.children);

        setBreadcrumb(newBreadcrumb);
        setMenuTransition("enter");
      }, 300);
    } else {
    }
  };

  return (
    <>
      {!isLoading && (
        <div
          onClick={toggleMenu}
          className={`fixed inset-0 bg-white z-30 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full h-full flex flex-col justify-between">
            <div className="flex h-[48px] justify-between items-center p-4 border-b relative">
              {breadcrumb.length > 1 && (
                <button
                  onClick={handleBack}
                  className="text-black absolute top-3 left-4">
                  <IconAngleLeft />
                </button>
              )}
              <p className="w-full text-black text-lg font-bold text-center">
                {breadcrumb.length > 1
                  ? breadcrumb[breadcrumb.length - 1].title
                  : "Menu"}
              </p>
              <button
                onClick={toggleMenu}
                className="text-black absolute top-4 right-4">
                <IconClose />
              </button>
            </div>
            <ul
              className={`text-black py-8 px-4 gap-4 mb-auto flex flex-col items-center transition-transform duration-300 ${
                menuTransition === "enter"
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}>
              {currentMenu.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleMenuItemClick(item)}
                  className="text-black text-lg font-semibold leading-relaxed cursor-pointer hover:bg-gray-100 p-2 w-full text-left flex justify-between items-center">
                  {item.title}
                  <IconAngleRight width={"16"} height={"16"} />
                </li>
              ))}
            </ul>
            <div className="w-full h-[50px] px-4 my-2 justify-between items-center inline-flex">
              {breadcrumb.length <= 1 ? (
                <button className="w-full h-[50px] px-4 items-center gap-1 flex rounded-lg border-[#3B559E] shadow border justify-center text-[#3B559E]">
                  <IconGlobe />
                  <p className="text-black text-lg font-medium leading-relaxed">
                    VN
                  </p>
                </button>
              ) : (
                <div className="w-full h-[52px] px-6 py-3.5 rounded-lg shadow border border-[#3B559E] justify-between items-center inline-flex">
                  <Link href={breadcrumb[1].url || "/"}>
                    <p className="text-[#3B559E] text-base font-medium leading-normal text-left flex justify-between">
                      Tới trang {breadcrumb[1].title}
                    </p>
                  </Link>
                  <div className="w-6 h-6 relative text-[#3B559E]">
                    <IconArrowRight />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
