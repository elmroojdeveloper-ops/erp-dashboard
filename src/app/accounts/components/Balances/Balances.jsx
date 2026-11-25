"use client";

import React, { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BalanceSetting from "../utils/Balances/BalanceSetting";
import BalancesType from "../utils/Balances/BalancesType";

const BalancesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = searchParams.get("step") === "types" ? 2 : 1;
  const fiscalYear = searchParams.get("year") || "2026";
  const openingDate = searchParams.get("date") || "2026-01-01";

  const entryCode = useMemo(
    () => `JV-${fiscalYear}-OPEN`,
    [fiscalYear]
  );

  const buildQuery = (extra = {}) => {
    const q = new URLSearchParams({
      year: fiscalYear,
      date: openingDate,
      ...extra,
    });
    return q.toString();
  };

  if (step === 2) {
    return (
      <BalancesType
        fiscalYear={fiscalYear}
        openingDate={openingDate}
        entryCode={entryCode}
        onBack={() => {
          router.push(`/accounts/opening-balances?${buildQuery()}`);
        }}
        onSelectType={(type) => {
          router.push(
            `/accounts/opening-balances/${type.id}?${buildQuery()}`
          );
        }}
        onImport={() => {
          console.log("import opening balances", { fiscalYear, openingDate });
        }}
      />
    );
  }

  return (
    <BalanceSetting
      initialFiscalYear={fiscalYear}
      initialOpeningDate={openingDate}
      onContinue={({ fiscalYear: year, openingDate: date }) => {
        router.push(
          `/accounts/opening-balances?${buildQuery({
            year,
            date,
            step: "types",
          })}`
        );
      }}
    />
  );
}

export default function Balances() {
  return (
    <Suspense fallback={null}>
      <BalancesContent />
    </Suspense>
  );
}
