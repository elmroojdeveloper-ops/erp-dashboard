"use client";

import React, { useEffect, useState } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import ModalPortal from "./ModalPortal";

const REASON_OPTIONS = [
  {
    value: "unbalanced",
    title: "فروقات غير متوازنة",
    description: "إجمالي المدين لا يساوي إجمالي الدائن في الدفعة.",
  },
  {
    value: "incomplete_docs",
    title: "مستندات مؤيدة ناقصة",
    description: "نقص في كشوف الحساب أو ميزان المراجعة أو مرفقات الاعتماد.",
  },
  {
    value: "wrong_classification",
    title: "خطأ في التصنيف المحاسبي",
    description: "تصنيف خاطئ لبنود الأرصدة أو ربط حساب غير صحيح.",
  },
  {
    value: "other",
    title: "سبب آخر",
    description: "يرجى توضيح السبب بالتفصيل في خانة الملاحظات.",
  },
];

const RejectedReasonModel = ({
  openRejectedModel,
  setOpenRejectedModel,
  row = null,
  mode = "reject",
  initialReason = "",
  initialNote = "",
  onConfirm,
}) => {
  const [reason, setReason] = useState(initialReason);
  const [note, setNote] = useState(initialNote);
  const [error, setError] = useState("");

  const isView = mode === "view";

  useEffect(() => {
    if (openRejectedModel) {
      setReason(initialReason || "");
      setNote(initialNote || row?.approverNote || "");
      setError("");
    }
  }, [openRejectedModel, initialReason, initialNote, row]);

  const handleClose = () => setOpenRejectedModel?.(false);

  const handleConfirm = () => {
    if (isView) {
      handleClose();
      return;
    }
    if (!reason) {
      setError("يرجى اختيار سبب الرفض");
      return;
    }
    if (reason === "other" && !note.trim()) {
      setError("يرجى كتابة تفاصيل السبب");
      return;
    }
    const selected = REASON_OPTIONS.find((o) => o.value === reason);
    onConfirm?.({
      row,
      reason,
      reasonTitle: selected?.title || "",
      note: note.trim(),
    });
    handleClose();
  };

  return (
    <ModalPortal open={openRejectedModel} onClose={handleClose}>
    <div
      dir="rtl"
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] overflow-hidden rounded-[16px] border-t-[3px] border-t-[#DC2626] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.25)]"
      >
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex size-[44px] shrink-0 items-center justify-center rounded-[12px] border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]">
                <FiAlertCircle className="size-[22px] stroke-[2]" />
              </div>
              <div>
                <h2
                  id="reject-modal-title"
                  className="text-[17px] font-extrabold leading-snug text-[#1E293B]"
                >
                  {isView
                    ? "سبب رفض الدفعة الافتتاحية"
                    : "تحديد سبب رفض الدفعة الافتتاحية"}
                </h2>
                <p className="mt-1.5 text-[12px] leading-5 text-[#64748B]">
                  {row?.batchCode ? (
                    <>
                      الدفعة{" "}
                      <span dir="ltr" className="font-bold text-[#334155]">
                        {row.batchCode}
                      </span>
                      {row.batchTitle ? ` — ${row.batchTitle}` : ""}
                    </>
                  ) : (
                    "يرجى تحديد سبب واضح لإرجاع الدفعة للتصحيح."
                  )}
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

          <div className="mt-4 space-y-2.5" role="radiogroup" aria-label="سبب الرفض">
            {REASON_OPTIONS.map((option) => {
              const selected = reason === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-[10px] border px-3.5 py-3 transition ${
                    selected
                      ? "border-[#FCA5A5] bg-[#FEF2F2]"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                  } ${isView ? "pointer-events-none opacity-90" : ""}`}
                >
                  <input
                    type="radio"
                    name="reject-reason"
                    value={option.value}
                    checked={selected}
                    disabled={isView}
                    onChange={() => {
                      setReason(option.value);
                      setError("");
                    }}
                    className="mt-1 size-4 shrink-0 accent-[#DC2626]"
                  />
                  <span className="min-w-0 text-right">
                    <span className="block text-[13px] font-bold text-[#1E293B]">
                      {option.title}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-5 text-[#64748B]">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-[12px] font-bold text-[#334155]">
              ملاحظات إضافية {!isView && reason === "other" ? "(إلزامي)" : "(اختياري)"}
            </label>
            <textarea
              value={note}
              disabled={isView}
              onChange={(e) => {
                setNote(e.target.value);
                setError("");
              }}
              rows={3}
              placeholder="اذكر سبب الرفض بالتفصيل للرجوع إليه..."
              className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[12.5px] text-[#1E293B] outline-none placeholder:text-[#94A3B8] focus:border-[#FCA5A5] focus:bg-white disabled:cursor-default disabled:opacity-80"
            />
          </div>

          {error && (
            <p className="mt-2 text-[12px] font-semibold text-[#DC2626]">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#E6ECEF] bg-[#F8FAFC] px-6 py-3.5">
          <button
            type="button"
            onClick={handleConfirm}
            className={`inline-flex h-[38px] cursor-pointer items-center justify-center rounded-[8px] px-4 text-[12.5px] font-bold text-white transition ${
              isView
                ? "bg-[#64748B] hover:bg-[#475569]"
                : "bg-[#DC2626] hover:bg-[#B91C1C]"
            }`}
          >
            {isView ? "إغلاق" : "تأكيد الرفض وإرجاع الدفعة"}
          </button>

          {!isView && (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-[38px] cursor-pointer items-center justify-center rounded-[8px] border border-[#CBD5E1] bg-white px-5 text-[12.5px] font-bold text-[#334155] transition hover:bg-[#F1F5F9]"
            >
              إلغاء
            </button>
          )}
        </div>
      </div>
    </div>
    </ModalPortal>
  );
};

export default RejectedReasonModel;
