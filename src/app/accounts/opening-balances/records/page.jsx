"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Recording from "../../components/utils/Balances/Recording";
import ApprovalModel from "../../components/utils/Balances/Recording/ApprovalModel";
import RejectedReasonModel from "../../components/utils/Balances/Recording/RejectedReasonModel";
import RequestModel from "../../components/utils/Balances/Recording/RequestModel";
import ReviewRequestModel from "../../components/utils/Balances/Recording/ReviewRequestModel";
import DeleteModel from "../../components/utils/Balances/Recording/DeleteModel";

const RecordsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fiscalYear = searchParams.get("year") || "2026";
  const openingDate = searchParams.get("date") || "2026-01-01";

  const query = new URLSearchParams({
    year: fiscalYear,
    date: openingDate,
  }).toString();

  const [activeRow, setActiveRow] = useState(null);
  const [openApprovedModel, setOpenApprovedModel] = useState(false);
  const [openRejectedModel, setOpenRejectedModel] = useState(false);
  const [rejectMode, setRejectMode] = useState("reject");
  const [openRequestModel, setOpenRequestModel] = useState(false);
  const [openReviewModel, setOpenReviewModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const goToEntry = (typeId = "general-accounts") => {
    router.push(`/accounts/opening-balances/${typeId}?${query}`);
  };

  return (
    <>
      <Recording
        onNewBatch={() => {
          router.push(`/accounts/opening-balances?${query}`);
        }}
        onChangeLog={() => {
          console.log("open change log");
        }}
        onViewDetails={(row) => {
          const year =
            fiscalYear ||
            row?.fiscalYear?.match(/\d{4}/)?.[0] ||
            "2026";
          const batch = row?.batchCode || `JV-${year}-OPEN`;
          const q = new URLSearchParams({
            year,
            date: openingDate,
            batch,
          }).toString();
          router.push(`/accounts/opening-balances/approved?${q}`);
        }}
        onApprove={(row) => {
          setActiveRow(row);
          setOpenApprovedModel(true);
        }}
        onReject={(row) => {
          setActiveRow(row);
          setRejectMode("reject");
          setOpenRejectedModel(true);
        }}
        onViewRejectReason={(row) => {
          setActiveRow(row);
          setRejectMode("view");
          setOpenRejectedModel(true);
        }}
        onContinueEntry={() => goToEntry()}
        onEdit={() => goToEntry()}
        onDelete={(row) => {
          setActiveRow(row);
          setOpenDeleteModel(true);
        }}
        onRequestReopen={(row) => {
          setActiveRow(row);
          setOpenRequestModel(true);
        }}
        onReviewRequest={(row) => {
          setActiveRow(row);
          setOpenReviewModel(true);
        }}
        onExport={(rows) => {
          console.log("export records", rows?.length);
        }}
        onLinkZatca={() => {
          console.log("link zatca");
        }}
        onExportAudit={() => {
          console.log("export audit trail");
        }}
      />

      <ApprovalModel
        openApprovedModel={openApprovedModel}
        setOpenApprovedModel={setOpenApprovedModel}
        row={activeRow}
        fiscalYear={fiscalYear}
        onConfirm={(row) => {
          console.log("approve confirmed", row);
        }}
      />

      <RejectedReasonModel
        openRejectedModel={openRejectedModel}
        setOpenRejectedModel={setOpenRejectedModel}
        row={activeRow}
        mode={rejectMode}
        initialReason={rejectMode === "view" ? "unbalanced" : ""}
        initialNote={
          rejectMode === "view"
            ? "رفضت الدفعة لوجود فارق غير متوازن بمبلغ 350,000.00 ر.س."
            : ""
        }
        onConfirm={(payload) => {
          console.log("reject confirmed", payload);
          if (payload?.reason) goToEntry();
        }}
      />

      <RequestModel
        openRequestModel={openRequestModel}
        setOpenRequestModel={setOpenRequestModel}
        row={activeRow}
        fiscalYear={fiscalYear}
        onConfirm={(payload) => {
          console.log("reopen request sent", payload);
        }}
      />

      <ReviewRequestModel
        openReviewModel={openReviewModel}
        setOpenReviewModel={setOpenReviewModel}
        row={activeRow}
        fiscalYear={fiscalYear}
        onApprove={(payload) => {
          console.log("reopen approved", payload);
        }}
        onReject={(payload) => {
          console.log("reopen rejected", payload);
        }}
        onPreviewAttachment={(file) => {
          console.log("preview attachment", file);
        }}
        onDownloadAttachment={(file) => {
          console.log("download attachment", file);
        }}
      />

      <DeleteModel
        openDeleteModel={openDeleteModel}
        setOpenDeleteModel={setOpenDeleteModel}
        row={activeRow}
        onConfirm={(row) => {
          console.log("delete confirmed", row);
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
    <RecordsPageContent />
  </Suspense>
);

export default page;
