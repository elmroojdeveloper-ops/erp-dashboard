"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ApprovedLocked from "../../components/utils/Balances/ApprovedLocked";
import RequestModel from "../../components/utils/Balances/Recording/RequestModel";

const ApprovedPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fiscalYear = searchParams.get("year") || "2026";
  const openingDate = searchParams.get("date") || "2026-01-01";
  const batchCode = searchParams.get("batch") || `JV-${fiscalYear}-OPEN`;

  const query = new URLSearchParams({
    year: fiscalYear,
    date: openingDate,
  }).toString();

  const [openRequestModel, setOpenRequestModel] = useState(false);

  const formatDate = (iso) => {
    const [y, m, d] = (iso || "").split("-");
    if (!y || !m || !d) return "01/01/2026 م";
    return `${d}/${m}/${y} م`;
  };

  return (
    <>
      <ApprovedLocked
        fiscalYear={fiscalYear}
        batchCode={batchCode}
        balanceDate={formatDate(openingDate)}
        onRequestReopen={() => setOpenRequestModel(true)}
        onExportExcel={() => console.log("export excel", batchCode)}
        onExportPdf={() => console.log("export pdf", batchCode)}
        onPrint={() => {
          if (typeof window !== "undefined") window.print();
        }}
        onViewJournal={() => {
          console.log("view linked journal", batchCode);
        }}
      />

      <RequestModel
        openRequestModel={openRequestModel}
        setOpenRequestModel={setOpenRequestModel}
        row={{ batchCode, fiscalYear: `${fiscalYear} م` }}
        fiscalYear={fiscalYear}
        onConfirm={(payload) => {
          console.log("reopen request from approved view", payload);
          router.push(`/accounts/opening-balances/records?${query}`);
        }}
      />
    </>
  );
};

const page = () => (
  <Suspense
    fallback={
      <div className="py-10 text-center text-sm text-muted">جاري التحميل...</div>
    }
  >
    <ApprovedPageContent />
  </Suspense>
);

export default page;
