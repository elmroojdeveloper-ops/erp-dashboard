"use client";

import React, { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import EnterBalances from "../../../components/utils/Balances/EnterBalances";

const CheckPageContent = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const fiscalYear = searchParams.get("year") || "2026";
  const openingDate = searchParams.get("date") || "2026-01-01";
  const typeId = params?.id;
  const entryCode = `JV-${fiscalYear}-OPEN`;

  const query = new URLSearchParams({
    year: fiscalYear,
    date: openingDate,
  }).toString();

  return (
    <EnterBalances
      fiscalYear={fiscalYear}
      openingDate={openingDate}
      entryCode={entryCode}
      onBack={() => {
        router.push(`/accounts/opening-balances/${typeId}?${query}`);
      }}
      onCancelEdit={() => {
        router.push(`/accounts/opening-balances/${typeId}?${query}`);
      }}
      onEditSection={(section) => {
        const targetId = section?.id || typeId;
        router.push(`/accounts/opening-balances/${targetId}?${query}`);
      }}
      onSaveDraft={() => {
        console.log("save draft", { typeId, fiscalYear, openingDate });
      }}
      onLockDraft={() => {
        console.log("lock draft", { typeId, fiscalYear, openingDate });
      }}
      onApprove={() => {
        router.push(`/accounts/opening-balances/records?${query}`);
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
    <CheckPageContent />
  </Suspense>
);

export default page;
