"use client";

import React, { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import EnterBalance from "../../components/utils/Balances/EnterBalance";

const EnterBalancePageContent = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const fiscalYear = searchParams.get("year") || "2026";
  const openingDate = searchParams.get("date") || "2026-01-01";
  const typeId = params?.id;

  const query = new URLSearchParams({
    year: fiscalYear,
    date: openingDate,
  }).toString();

  const backToTypes = () => {
    const q = new URLSearchParams({
      step: "types",
      year: fiscalYear,
      date: openingDate,
    });
    router.push(`/accounts/opening-balances?${q.toString()}`);
  };

  return (
    <EnterBalance
      typeId={typeId}
      fiscalYear={fiscalYear}
      openingDate={openingDate}
      onBack={backToTypes}
      onPrevStep={backToTypes}
      onImport={() => {
        console.log("import", typeId);
      }}
      onSaveDraft={() => {
        console.log("save draft", typeId);
      }}
      onSaveAndContinue={() => {
        router.push(`/accounts/opening-balances/${typeId}/check?${query}`);
      }}
      onAddRow={() => {
        console.log("add row", typeId);
      }}
    />
  );
};

const page = () => (
  <Suspense
    fallback={
      <div className="py-10 text-center text-sm text-muted">جاري التحميل...</div>
    }
  >
    <EnterBalancePageContent />
  </Suspense>
);

export default page;
