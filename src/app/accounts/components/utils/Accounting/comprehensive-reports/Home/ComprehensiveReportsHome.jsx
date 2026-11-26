"use client";

import { useRouter } from "next/navigation";
import KpiCards from "./Cards";
import Filter from "./Filter";
import Header from "./Header";
import ReportsCards from "./ReportsCards";

const reportRoutes = {
  "journal-entries": "/accounts/Entries",
  "fixed-assets": "/accounts/FixedAsset",
  "audit-trail": "/accounts/AuditProcess",
  "opening-balances": "/accounts/opening-balances",
  "financial-statements": "/accounts/Reports",
};

const ComprehensiveReportsHome = () => {
  const router = useRouter();

  const openReport = (id) => {
    const href = reportRoutes[id];
    if (href) router.push(href);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-5 pb-6">
      <Header />
      <Filter />
      <KpiCards />
      <ReportsCards onOpenReport={openReport} />
    </div>
  );
};

export default ComprehensiveReportsHome;
