import React from "react";
import Head from "next/head"; // Đảm bảo bạn đã cài đặt và sử dụng thư viện next/head cho Next.js

interface Props {
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  seoAuthor?: string;
  seoImage?: string;
  seoUrl?: string;
  seoType?: string;
}

const MetaData = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  seoAuthor,
  seoImage,
  seoUrl,
  seoType = "website",
}: Props) => {
  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      {seoAuthor && <meta name="author" content={seoAuthor} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      {seoImage && <meta property="og:image" content={seoImage} />}
      {seoUrl && <meta property="og:url" content={seoUrl} />}
      <meta property="og:type" content={seoType} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {seoImage && <meta name="twitter:image" content={seoImage} />}
    </>
  );
};

export default MetaData;
