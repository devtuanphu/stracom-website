/** @type {import('next').NextConfig} */

import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();
const nextConfig = {
  images: {
    domains: ["stracom.vn"], // Thêm tên miền bạn đang sử dụng vào đây
    remotePatterns: [
      {
        protocol: "https", // Đảm bảo protocol là HTTPS nếu tên miền của bạn sử dụng HTTPS
        hostname: "admin.stracom.vn", // Thêm tên miền cụ thể
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1338",
      },
    ],
  },
  env: {
    URL_API: process.env.URL_API,
    DEV_TOKEN: process.env.DEV_TOKEN,
  },
};

export default nextIntlConfig(nextConfig);
