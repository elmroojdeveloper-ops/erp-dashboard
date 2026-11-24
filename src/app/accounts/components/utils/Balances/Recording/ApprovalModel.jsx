"use client";

import React, { useEffect, useState } from "react";
import { FiCheck, FiFileText, FiLock, FiShield, FiX } from "react-icons/fi";
import { FaLandmark } from "react-icons/fa";
import ModalPortal from "./ModalPortal";

const formatMoney = (val) => {
  const num = Number(val);
  if (Number.isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ApprovalModel = ({
  openApprovedModel,
  setOpenApprovedModel,
  row = null,
  fiscalYear = "2026",
  entryCode,
  debitTotal,
  creditTotal,
  variance = "0.00",
  onConfirm,
}) => {
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    if (!openApprovedModel) setAcknowledged(false);
  }, [openApprovedModel]);

  const year =
    fiscalYear ||
    row?.fiscalYear?.match(/\d{4}/)?.[0] ||
    "2026";
  const code = entryCode || row?.batchCode || `JV-${year}-OPEN`;
  const debit = formatMoney(debitTotal ?? row?.debit ?? 0);
  const credit = formatMoney(creditTotal ?? row?.credit ?? 0);
  const diff = formatMoney(
    variance ?? Math.abs(Number(row?.debit || 0) - Number(row?.credit || 0))
  );

  const handleClose = () => setOpenApprovedModel?.(false);

  return (
    <ModalPortal open={openApprovedModel} onClose={handleClose}>
    <div
      dir="rtl"
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="approval-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[680px] overflow-hidden rounded-[16px] border-t-[3px] border-t-[#10B981] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.25)]"
      >
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex size-[44px] shrink-0 items-center justify-center rounded-[12px] border border-[#CCFBF1] bg-[#F0FDFA] text-[#0D9488]">
                <FiShield className="size-[22px] stroke-[2]" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#FDE68A] bg-[#FFFBEB] px-2 py-0.5 text-[10.5px] font-bold leading-none text-[#B45309]">
                  <FiLock className="size-2.5 stroke-[2.5]" />
                  <span>إجراء مالي غير قابل للتراجع</span>
                </div>

                <h2
                  id="approval-modal-title"
                  className="mt-2 text-[17.5px] font-extrabold leading-snug text-[#1E293B]"
                >
                  هل أنت متأكد من اعتماد الأرصدة الافتتاحية نهائيًا؟
                </h2>

                <div className="mt-1 flex items-center gap-1.5 text-[11.5px] font-bold leading-tight text-[#DC2626]">
                  <span>⚠</span>
                  <span>لن تتمكن من التعديل عليها بعد الاعتماد</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="إغلاق"
              className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#475569]"
            >
              <FiX className="size-4 stroke-[2]" />
            </button>
          </div>

          <div className="mt-4 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#1E293B]">
                <FaLandmark className="size-3.5 text-[#0D9488]" />
                <span>ملخص الأرصدة المتوازنة للسنة {year}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[10.5px] font-bold leading-none text-[#047857]">
                <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#10B981] text-white">
                  <FiCheck className="size-2.5 stroke-[3]" />
                </span>
                <span>توازن تام (الفارق: {diff} ر.س)</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3">
                <div className="text-[11px] font-medium text-[#64748B]">
                  إجمالي الطرف المدين
                </div>
                <div className="mt-1 flex items-baseline gap-1 text-[#0F172A]">
                  <span
                    className="text-[16px] font-extrabold tracking-tight"
                    dir="ltr"
                  >
                    {debit}
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">
                    ر.س
                  </span>
                </div>
              </div>

              <div className="rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3">
                <div className="text-[11px] font-medium text-[#64748B]">
                  إجمالي الطرف الدائن
                </div>
                <div className="mt-1 flex items-baseline gap-1 text-[#0F172A]">
                  <span
                    className="text-[16px] font-extrabold tracking-tight"
                    dir="ltr"
                  >
                    {credit}
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">
                    ر.س
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[12px] font-bold text-[#334155]">
              يترتب على هذا الإجراء المحاسبي التالي فوراً:
            </div>

            <div className="mt-2.5 space-y-2">
              <div className="flex items-start gap-3 rounded-[10px] border border-[#E6ECEF] bg-[#F8FAFC]/70 px-3.5 py-2.5">
                <div className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#E0F2FE] text-[#0284C7]">
                  <FiFileText className="size-3.5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#1E293B]">
                    ترحيل القيد الافتتاحي (
                    <span dir="ltr">{code}</span>)
                  </div>
                  <p className="mt-0.5 text-[11px] leading-[1.5] text-[#64748B]">
                    إنشاء سند قيد رسمي آلي وترحيله لدفاتر الأستاذ العام وتثبيت
                    ميزان المراجعة.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[10px] border border-[#E6ECEF] bg-[#F8FAFC]/70 px-3.5 py-2.5">
                <div className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#FEF3C7] text-[#D97706]">
                  <FiLock className="size-3.5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#1E293B]">
                    إقفال شاشات الإدخال الخمس التأسيسية
                  </div>
                  <p className="mt-0.5 text-[11px] leading-[1.5] text-[#64748B]">
                    تحويل أرصدة البنوك، العملاء، الموردين، المخزون، والأصول إلى
                    وضع القراءة فقط.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[10px] border border-[#E6ECEF] bg-[#F8FAFC]/70 px-3.5 py-2.5">
                <div className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#E0E7FF] text-[#4F46E5]">
                  <FiShield className="size-3.5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#1E293B]">
                    التوثيق الرقمي والربط الزكوي (
                    <span dir="ltr">ZATCA</span>)
                  </div>
                  <p className="mt-0.5 text-[11px] leading-[1.5] text-[#64748B]">
                    إصدار ختم رقمي مشفر وسلسلة تدقيق تمنع التعديل الرجعي حسب
                    أنظمة هيئة الزكاة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <label className="mt-3.5 flex cursor-pointer items-start gap-2.5 rounded-[10px] border border-[#E2E8F0] bg-[#F1F5F9]/80 px-3.5 py-3 transition hover:bg-[#F1F5F9]">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-[4px] border-[#94A3B8] accent-[#0D9488]"
            />
            <span className="text-[11.5px] font-semibold leading-[1.55] text-[#334155]">
              أقر بأنني قمت بمراجعة كافة الأرصدة والوثائق المؤيدة بدقة، وأتحمل
              المسؤولية المحاسبية والنظامية الكاملة عن اعتماد هذا السجل وقفل
              السنة المالية السابقة.
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between border-t border-[#E6ECEF] bg-[#F8FAFC] px-6 py-3.5">
          <button
            type="button"
            disabled={!acknowledged}
            onClick={() => {
              onConfirm?.(row);
              handleClose();
            }}
            className={`inline-flex h-[38px] items-center gap-2 rounded-[8px] px-4 text-[12.5px] font-bold text-white transition ${
              acknowledged
                ? "cursor-pointer bg-[#10B981] hover:bg-[#059669]"
                : "cursor-not-allowed bg-[#A7C7BC]"
            }`}
          >
            <span>تأكيد الاعتماد وترحيل القيد</span>
            <span className="inline-flex size-4 items-center justify-center rounded-full border border-white/80">
              <FiCheck className="size-2.5 stroke-[2.5]" />
            </span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-[38px] cursor-pointer items-center justify-center rounded-[8px] border border-[#CBD5E1] bg-white px-5 text-[12.5px] font-bold text-[#334155] transition hover:bg-[#F1F5F9]"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  );
};

export default ApprovalModel;
