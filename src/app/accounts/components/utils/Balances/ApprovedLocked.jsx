"use client";

import React from "react";
import Header from "./ApprovedLocked/Header";
import MetaBar from "./ApprovedLocked/MetaBar";
import SummaryCards from "./ApprovedLocked/SummaryCards";
import AccountsTable from "./ApprovedLocked/AccountsTable";
import FooterBar from "./ApprovedLocked/FooterBar";

const ApprovedLocked = ({
  fiscalYear = "2026",
  batchCode = "JV-2026-OPEN",
  balanceDate = "01/01/2026 م",
  approvedAt = "02/01/2026 م - 10:45 ص",
  approver = "أحمد المحاسب (مدير مالي)",
  debitTotal = "54,225,000.00",
  creditTotal = "54,225,000.00",
  onRequestReopen,
  onExportExcel,
  onExportPdf,
  onPrint,
  onViewJournal,
}) => {
  return (
    <div dir="rtl" className="mx-auto flex w-full flex-col gap-3.5 pb-8">
      <Header
        fiscalYear={fiscalYear}
        onRequestReopen={onRequestReopen}
        onExportExcel={onExportExcel}
        onExportPdf={onExportPdf}
        onPrint={onPrint}
      />
      <MetaBar
        fiscalYear={fiscalYear}
        balanceDate={balanceDate}
        batchCode={batchCode}
      />
      <SummaryCards
        debitTotal={debitTotal}
        creditTotal={creditTotal}
        approvedAt={approvedAt}
        approver={approver}
      />
      <AccountsTable />
      <FooterBar
        batchCode={batchCode}
        onViewJournal={onViewJournal}
        onExportExcel={onExportExcel}
        onExportPdf={onExportPdf}
        onPrint={onPrint}
      />
    </div>
  );
};

export default ApprovedLocked;
