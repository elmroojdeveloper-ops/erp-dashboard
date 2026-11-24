"use client";

import React from "react";
import { FiInfo } from "react-icons/fi";
import Header from "./Recording/Header";
import Cards from "./Recording/Cards";
import Table from "./Recording/Table";
import CategoriesReadiness from "./Recording/CategoriesReadiness";
import AuditTrail from "./Recording/AuditTrail";

const Recording = ({
  onNewBatch,
  onChangeLog,
  onViewDetails,
  onApprove,
  onReject,
  onViewRejectReason,
  onContinueEntry,
  onEdit,
  onDelete,
  onRequestReopen,
  onReviewRequest,
  onExport,
  onLinkZatca,
  onExportAudit,
}) => {
  return (
    <div dir="rtl" className="mx-auto flex w-full flex-col gap-4 pb-8">
      <Header onNewBatch={onNewBatch} onChangeLog={onChangeLog} />
      <Cards />
      <Table
        onViewDetails={onViewDetails}
        onApprove={onApprove}
        onReject={onReject}
        onViewRejectReason={onViewRejectReason}
        onContinueEntry={onContinueEntry}
        onEdit={onEdit}
        onDelete={onDelete}
        onRequestReopen={onRequestReopen}
        onReviewRequest={onReviewRequest}
        onExport={onExport}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AuditTrail onExportAudit={onExportAudit} />
        <CategoriesReadiness onLinkZatca={onLinkZatca} />
      </div>

      <div className="flex items-center gap-2 rounded-[8px] border border-[#E6ECEF] bg-[#F5F8FA] px-4 py-2.5">
        <FiInfo className="size-4 shrink-0 text-[#64748B]" />
        <p className="text-[11.5px] leading-5 text-[#64748B]">
          معاينة حالة السجل الفارغ في حال عدم تسجيل أي دفعات مستقبلية
        </p>
      </div>
    </div>
  );
};

export default Recording;
