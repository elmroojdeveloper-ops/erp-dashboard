/** جذر السب دومين erp.elmrooj.com هو public_html/erp، فالمسارات من / وليس /erp */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erp.elmrooj.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
