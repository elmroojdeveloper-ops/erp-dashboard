"use client";

import React, { useMemo } from "react";
import { FiCalendar, FiFileText, FiLock } from "react-icons/fi";
import TopHeader from "./EnterBalances/TopHeader";
import Cards from "./EnterBalances/Cards";
import CheckingBalances from "./EnterBalances/CheckingBalances";

const formatDate = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y} م`;
};

const EnterBalances = ({
  fiscalYear = "2026",
  openingDate = "2026-01-01",
  entryCode,
  onBack,
  onApprove,
  onSaveDraft,
  onLockDraft,
  onEditSection,
  onCancelEdit,
}) => {
  const code = entryCode || `JV-${fiscalYear}-OPEN`;

  const pills = useMemo(
    () => [
      {
        id: "draft",
        grow: 319,
        tone: "grey",
        icon: FiFileText,
        label: "مسودة القيد:",
        value: code,
      },
      {
        id: "date",
        grow: 363,
        tone: "blue",
        icon: FiCalendar,
        label: "تاريخ القيد الافتتاحي:",
        value: formatDate(openingDate),
      },
      {
        id: "year",
        grow: 326,
        tone: "blue",
        icon: FiLock,
        label: "السنة المالية المستهدفة:",
        value: `${fiscalYear} م`,
      },
    ],
    [code, fiscalYear, openingDate]
  );

  return (
    <div dir="rtl" className="mx-auto flex w-full flex-col gap-4 pb-8">
      <TopHeader currentStep={4} pills={pills} />
      <Cards />
      <CheckingBalances
        entryCode={code}
        onBack={onBack}
        onApprove={onApprove}
        onSaveDraft={onSaveDraft}
        onLockDraft={onLockDraft}
        onEditSection={onEditSection}
        onCancelEdit={onCancelEdit || onBack}
      />
    </div>
  );
};

export default EnterBalances;
