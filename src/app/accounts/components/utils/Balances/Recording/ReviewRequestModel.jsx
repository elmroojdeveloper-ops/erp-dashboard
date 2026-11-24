"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCheck,
  FiDownload,
  FiEye,
  FiFileText,
  FiLock,
  FiMapPin,
  FiPaperclip,
  FiSettings,
  FiSlash,
  FiUnlock,
  FiX,
} from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi2";
import ModalPortal from "./ModalPortal";

const DEFAULT_SECTIONS = [
  {
    id: "general",
    label: "1. الحسابات العامة (شجرة الحسابات والذمم)",
    locked: false,
  },
  {
    id: "customers",
    label: "2. العملاء والذمم المدينة (محمي)",
    locked: true,
  },
  {
    id: "suppliers",
    label: "3. الموردون والذمم الدائنة (محمي)",
    locked: true,
  },
  {
    id: "inventory",
    label: "4. المنتجات والمخزون (محمي)",
    locked: true,
  },
  {
    id: "assets",
    label: "5. الأصول الثابتة والإهلاك (محمي)",
    locked: true,
  },
];

const DEFAULT_JUSTIFICATION = (
  <>
    تم اكتشاف حساب فرعي لدى مصرف الراجحي برقم IBAN{" "}
    <span className="font-bold text-[#EA580C]" dir="ltr">
      SA0380000000000102002
    </span>{" "}
    يحمل رصيدًا افتتاحيًا قدره{" "}
    <span className="font-bold text-[#EA580C]">250,000.00 ر.س</span> لم يُدرج ضمن
    الدفعة المعتمدة، ويتطلب فتح قسم الحسابات العامة فقط لإجراء التسوية العاجلة
    قبل إصدار التقارير الشهرية.
  </>
);

const ReviewRequestModel = ({
  openReviewModel,
  setOpenReviewModel,
  row = null,
  requestId = "#REQ-2026-08",
  fiscalYear = "2026",
  requesterName = "سارة العتيبي",
  requesterInitials = "س.ع",
  requesterRole = "محاسب أول — رئيس قسم الحسابات العامة",
  submittedAt = "اليوم، 10:45 ص (منذ 35 دقيقة)",
  branch = "الفرع الرئيسي - الرياض",
  lockedBatchTotal = "54,225,000.00",
  justification,
  sections = DEFAULT_SECTIONS,
  attachment = {
    name: "محضر_مطابقة_وتسوية_حساب_الراجحي_2026.pdf",
    size: "1.4 MB",
    signedLabel: "موقع إلكترونياً من المحاسب القانوني الداخلي",
  },
  auditorName = "أحمد المحاسب (المدير المالي)",
  onApprove,
  onReject,
  onPreviewAttachment,
  onDownloadAttachment,
}) => {
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setOpenReviewModel?.(false);
  }, [setOpenReviewModel]);

  useEffect(() => {
    if (!openReviewModel) {
      setRejectReason("");
      setError("");
    }
  }, [openReviewModel]);

  const code = row?.batchCode || "JV-2026-OPEN";
  const year = fiscalYear || row?.fiscalYear?.match(/\d{4}/)?.[0] || "2026";

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setError("سبب الرفض إلزامي عند رفض الطلب");
      return;
    }
    onReject?.({ row, note: rejectReason.trim() });
    handleClose();
  };

  const handleApprove = () => {
    onApprove?.({ row, note: rejectReason.trim() });
    handleClose();
  };

  return (
    <ModalPortal open={!!openReviewModel} onClose={handleClose}>
      <div
        dir="rtl"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/55 p-3 sm:p-5"
        onClick={handleClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[min(92vh,900px)] w-full max-w-[760px] flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.28)]"
        >
          {/* Header — ثابت */}
          <div className="relative shrink-0 border-b border-[#EEF2F5] px-5 pb-4 pt-5 sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              aria-label="إغلاق"
              className="absolute left-4 top-4 inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-[#F1F5F9] text-[#64748B] transition hover:bg-[#E2E8F0] hover:text-[#334155]"
            >
              <FiX className="size-4 stroke-[2]" />
            </button>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-1 text-[10.5px] font-bold text-[#1D4ED8]">
              <MdOutlineVerifiedUser className="size-3.5" />
              <span>صلاحية المدير المالي فقط • قرار حوكمة رقابي</span>
            </div>

            <h2
              id="review-modal-title"
              className="mt-3 pe-10 text-[18px] font-extrabold leading-7 text-[#0F172A] sm:text-[20px]"
            >
              مراجعة طلب إعادة فتح الأرصدة الافتتاحية
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex h-7 items-center rounded-full bg-[#F1F5F9] px-2.5 text-[11px] font-semibold text-[#475569]">
                الدفعة:{" "}
                <span className="ms-1 font-bold text-[#1E293B]" dir="ltr">
                  {code}
                </span>
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-[#F1F5F9] px-2.5 text-[11px] font-semibold text-[#475569]">
                السنة المالية: {year} م
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-[#F1F5F9] px-2.5 text-[11px] font-semibold text-[#475569]">
                الطلب:{" "}
                <span className="ms-1 font-bold text-[#1E293B]" dir="ltr">
                  {requestId}
                </span>
              </span>
            </div>

            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-[6px] border border-[#F5D061] bg-[#FFF8DB] px-2.5 py-1 text-[11px] font-bold text-[#A16207]">
              <FiLock className="size-3" />
              <span>طلب إعادة فتح قيد المراجعة</span>
            </div>
          </div>

          {/* Content — سكرول داخلي */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            <div className="rounded-[12px] border border-[#D6E8F2] bg-[#F0F7FB] p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-[#237B9F] text-[13px] font-bold text-white">
                    {requesterInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-bold text-[#0F172A]">
                        {requesterName}
                      </span>
                      <span className="inline-flex h-5 items-center rounded-full bg-[#E2E8F0] px-2 text-[10px] font-bold text-[#475569]">
                        مقدم الطلب
                      </span>
                    </div>
                    <p className="mt-1 text-[11.5px] text-[#64748B]">
                      {requesterRole}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#64748B]">
                      <span className="inline-flex items-center gap-1">
                        <HiOutlineClock className="size-3.5" />
                        تاريخ التقديم: {submittedAt}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FiMapPin className="size-3.5" />
                        {branch}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full shrink-0 rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3 lg:w-[240px]">
                  <div className="text-[11px] font-medium text-[#64748B]">
                    إجمالي قيمة الدفعة المقفلة
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span
                      className="text-[20px] font-extrabold tracking-tight text-[#237B9F]"
                      dir="ltr"
                    >
                      {lockedBatchTotal}
                    </span>
                    <span className="text-[12px] font-bold text-[#237B9F]">
                      ر.س
                    </span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#059669]">
                    <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#D1FAE5] text-[9px]">
                      ✓
                    </span>
                    المعادلة متوازنة محاسبياً
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-bold text-[#1E293B]">
                <span className="text-[16px] leading-none text-[#237B9F]">❝</span>
                <span>
                  المبرر المحاسبي وسبب طلب إعادة الفتح (حسب إفادة مقدم الطلب):
                </span>
              </div>
              <div className="rounded-[10px] border border-[#E2E8F0] border-r-[4px] border-r-[#F59E0B] bg-[#F8FAFC] px-4 py-3 text-[12.5px] leading-6 text-[#334155]">
                {justification || DEFAULT_JUSTIFICATION}
              </div>
            </div>

            <div>
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#1E293B]">
                  <FiSettings className="size-3.5 text-[#237B9F]" />
                  <span>الأقسام المطلوب فك إقفالها للتعديل:</span>
                </div>
                <span className="text-[10.5px] font-semibold text-[#94A3B8]">
                  نطاق محصور ومراقب أمنياً
                </span>
              </div>
              <p className="mb-2.5 text-[11px] leading-5 text-[#64748B]">
                سيتم فتح الأقسام المحددة فقط للتعديل، وبقاء بقية الأقسام مقفلة
                ومحمية من أي تغيير.
              </p>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) =>
                  section.locked ? (
                    <span
                      key={section.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[11px] font-semibold text-[#64748B]"
                    >
                      <FiLock className="size-3" />
                      {section.label}
                    </span>
                  ) : (
                    <span
                      key={section.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#237B9F] px-3 py-1.5 text-[11px] font-bold text-white"
                    >
                      <FiCheck className="size-3 stroke-[2.5]" />
                      {section.label}
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-bold text-[#1E293B]">
                <FiPaperclip className="size-3.5 text-[#237B9F]" />
                <span>المستند والتقرير الداعم المرفق:</span>
              </div>
              <div className="flex flex-col gap-3 rounded-[10px] border border-[#D6E8F2] bg-[#F0F7FB] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[#FEE2E2] text-[#DC2626]">
                    <FiFileText className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[12.5px] font-bold text-[#1E293B]">
                      {attachment.name}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#64748B]">
                      <span>{attachment.size}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#059669]">
                        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#D1FAE5] text-[8px]">
                          ✓
                        </span>
                        {attachment.signedLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onPreviewAttachment?.(attachment)}
                    className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#CBD5E1] bg-white px-3 text-[11px] font-bold text-[#334155] transition hover:bg-[#F8FAFC]"
                  >
                    <FiEye className="size-3.5 text-[#64748B]" />
                    معاينة المستند
                  </button>
                  <button
                    type="button"
                    onClick={() => onDownloadAttachment?.(attachment)}
                    title="تحميل"
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-[7px] border border-[#CBD5E1] bg-white text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#237B9F]"
                  >
                    <FiDownload className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#DC2626]">
                  <FiAlertTriangle className="size-3.5" />
                  <span>سبب الرفض (إلزامي فقط في حال اتخاذ قرار الرفض):</span>
                </div>
                <span className="text-[10.5px] font-medium text-[#94A3B8]">
                  يتم إشعاره آلياً للمحاسب
                </span>
              </div>
              <textarea
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  setError("");
                }}
                rows={3}
                placeholder="يرجى كتابة المبرر المحاسبي والإداري في حال رفض الطلب..."
                className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[12.5px] text-[#1E293B] outline-none placeholder:text-[#94A3B8] focus:border-[#FCA5A5]"
              />
              {error ? (
                <p className="mt-1.5 text-[12px] font-semibold text-[#DC2626]">
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          {/* Footer — ثابت */}
          <div className="shrink-0 border-t border-[#E6ECEF] bg-[#F8FAFC] px-5 py-3.5 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[8px] border border-[#CBD5E1] bg-[#EEF2F5] px-4 text-[12.5px] font-bold text-[#475569] transition hover:bg-[#E2E8F0]"
              >
                إلغاء وإغلاق النافذة
              </button>

              <div className="flex flex-col gap-2 sm:flex-row-reverse sm:items-center">
                <button
                  type="button"
                  onClick={handleApprove}
                  className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-[#237B9F] px-4 text-[12.5px] font-bold text-white transition hover:bg-[#1B6280]"
                >
                  <FiUnlock className="size-3.5" />
                  <span>الموافقة وإعادة الفتح للتعديل</span>
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border border-[#FCA5A5] bg-[#FEF2F2] px-4 text-[12.5px] font-bold text-[#DC2626] transition hover:bg-[#FEE2E2]"
                >
                  <FiSlash className="size-3.5" />
                  <span>رفض الطلب (مع السبب)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-2 border-t border-[#E6ECEF] bg-[#F1F5F9] px-5 py-3 sm:px-6">
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
              <MdOutlineVerifiedUser className="size-3" />
            </span>
            <p className="text-[11px] leading-5 text-[#64748B]">
              سيتم تسجيل هذا الإجراء في سجل التدقيق تلقائياً باسم:{" "}
              <span className="font-bold text-[#334155]">{auditorName}</span>{" "}
              وتوثيق التوقيع الرقمي مع حفظ نسخة في الأرشيف الرقابي (WORM
              Storage).
            </p>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ReviewRequestModel;
