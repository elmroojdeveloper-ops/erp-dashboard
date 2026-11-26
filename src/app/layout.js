import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erp.elmrooj.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "ERP System | الحسابات",
  description: "نظام إدارة الموارد المؤسسية",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased">{children}</body>
    </html>
  );
}
