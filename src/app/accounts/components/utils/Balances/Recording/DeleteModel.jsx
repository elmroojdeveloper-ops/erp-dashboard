"use client";

import React from "react";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import ModalPortal from "./ModalPortal";

const formatMoney = (val) => {
  const num = Number(val);
  if (Number.isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const DeleteModel = ({
  openDeleteModel,
  setOpenDeleteModel,
  row = null,
  onConfirm,
}) => {
  const handleClose = () => setOpenDeleteModel?.(false);

  const code = row?.batchCode || "—";
  const title = row?.batchTitle || "مسودة أرصدة افتتاحية";
  const debit = formatMoney(row?.debit ?? 0);
  const credit = formatMoney(row?.credit ?? 0);

  return (
    <ModalPortal open={openDeleteModel} onClose={handleClose}>
      <div
        dir="rtl"
        onClick={handleClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-4"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[520px] overflow-hidden rounded-[16px] border-t-[3px] border-t-[#DC2626] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.25)]"
        >
          <div className="px-6 pt-5 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex size-[44px] shrink-0 items-center justify-center rounded-[12px] border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]">
                  <FiTrash2 className="size-[20px] stroke-[2]" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#FECACA] bg-[#FEF2F2] px-2 py-0.5 text-[10.5px] font-bold leading-none text-[#B91C1C]">
                    <FiAlertTriangle className="size-2.5 stroke-[2.5]" />
                    <span>إجراء غير قابل للاسترجاع</span>
                  </div>

                  <h2
                    id="delete-modal-title"
                    className="mt-2 text-[17px] font-extrabold leading-snug text-[#1E293B]"
                  >
                    هل أنت متأكد من حذف هذه المسودة؟
                  </h2>

                  <p className="mt-1.5 text-[12px] leading-5 text-[#64748B]">
                    سيتم حذف المسودة نهائيًا من سجل الأرصدة الافتتاحية ولن تتمكن
                    من استرجاعها لاحقًا.
                  </p>
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

            <div className="mt-4 rounded-[12px] border border-[#FECACA] bg-[#FEF2F2]/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-medium text-[#64748B]">
                    رقم الدفعة
                  </div>
                  <div
                    className="mt-0.5 text-[13px] font-extrabold text-[#1E293B]"
                    dir="ltr"
                  >
                    {code}
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-2.5 py-1 text-[10.5px] font-bold text-[#64748B]">
                  مسودة قيد الإعداد
                </span>
              </div>

              <div className="mt-3 text-[12px] font-semibold text-[#334155]">
                {title}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-[8px] border border-[#FECACA] bg-white px-3 py-2">
                  <div className="text-[10.5px] text-[#64748B]">المدين</div>
                  <div className="mt-0.5 text-[12.5px] font-bold text-[#1E293B]" dir="ltr">
                    {debit} ر.س
                  </div>
                </div>
                <div className="rounded-[8px] border border-[#FECACA] bg-white px-3 py-2">
                  <div className="text-[10.5px] text-[#64748B]">الدائن</div>
                  <div className="mt-0.5 text-[12.5px] font-bold text-[#1E293B]" dir="ltr">
                    {credit} ر.س
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-[10px] border border-[#FDE68A] bg-[#FFFBEB] px-3.5 py-2.5">
              <FiAlertTriangle className="mt-0.5 size-3.5 shrink-0 text-[#D97706]" />
              <p className="text-[11.5px] leading-5 text-[#92400E]">
                لا يمكن حذف الدفعات المعتمدة أو المقفلة. الحذف متاح فقط للمسودات
                غير المرحلة.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#E6ECEF] bg-[#F8FAFC] px-6 py-3.5">
            <button
              type="button"
              onClick={() => {
                onConfirm?.(row);
                handleClose();
              }}
              className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-[8px] bg-[#DC2626] px-4 text-[12.5px] font-bold text-white transition hover:bg-[#B91C1C]"
            >
              <FiTrash2 className="size-3.5" />
              <span>تأكيد الحذف</span>
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

export default DeleteModel;
