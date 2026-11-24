"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FiCheck,
  FiExternalLink,
  FiFileText,
  FiInfo,
  FiLock,
  FiSend,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import ModalPortal from "./ModalPortal";

const MAX_REASON = 500;

const SECTION_OPTIONS = [
  { id: "general", label: "1. الحسابات العامة وشجرة الدليل" },
  { id: "customers", label: "2. العملاء والذمم المدينة" },
  { id: "suppliers", label: "3. الموردون والذمم الدائنة" },
  { id: "inventory", label: "4. المنتجات ومخزون أول المدة" },
  { id: "assets", label: "5. الأصول الثابتة ومجمعات الإهلاك" },
];

const DEFAULT_REASON =
  "تم اكتشاف حساب بنكي لدى مصرف الراجحي غير مدرج ضمن الأرصدة الافتتاحية المعتمدة بمبلغ 125,000.00 ر.س، ويتطلب فتح قسم الحسابات العامة لإجراء التسوية اللازمة.";

const RequestModel = ({
  openRequestModel,
  setOpenRequestModel,
  row = null,
  fiscalYear = "2026",
  approvalDate = "02/01/2026 - 10:45 ص",
  originalApprover = "أحمد المحاسب (مدير مالي)",
  onConfirm,
}) => {
  const fileInputRef = useRef(null);
  const [reason, setReason] = useState("");
  const [selectedSections, setSelectedSections] = useState(["general"]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!openRequestModel) {
      setReason("");
      setSelectedSections(["general"]);
      setFile(null);
      setError("");
      setDragging(false);
      return;
    }
    setReason(DEFAULT_REASON);
    setSelectedSections(["general"]);
    setFile({
      name: "مذكرة_تسوية_حساب_البنك_2026.pdf",
      sizeLabel: "1.4 MB",
    });
  }, [openRequestModel]);

  const handleClose = useCallback(() => {
    setOpenRequestModel?.(false);
  }, [setOpenRequestModel]);

  const year = useMemo(() => {
    return fiscalYear || row?.fiscalYear?.match(/\d{4}/)?.[0] || "2026";
  }, [fiscalYear, row]);

  const code = row?.batchCode || `JV-${year}-OPEN`;
  const reasonCount = reason.length;

  const toggleSection = (id) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const acceptFile = (nextFile) => {
    if (!nextFile) return;
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(nextFile.type) && !/\.(pdf|png|jpe?g)$/i.test(nextFile.name)) {
      setError("صيغة الملف غير مدعومة. المسموح: PDF, PNG, JPG");
      return;
    }
    if (nextFile.size > 10 * 1024 * 1024) {
      setError("حجم الملف أكبر من 10MB");
      return;
    }
    setError("");
    setFile({
      name: nextFile.name,
      sizeLabel: `${(nextFile.size / (1024 * 1024)).toFixed(1)} MB`,
      raw: nextFile,
    });
  };

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("يرجى كتابة سبب طلب إعادة الفتح");
      return;
    }
    if (reason.trim().length < 20) {
      setError("المبرر قصير جدًا، يرجى التفصيل أكثر");
      return;
    }
    onConfirm?.({
      row,
      note: reason.trim(),
      sections: selectedSections,
      file,
    });
    handleClose();
  };

  return (
    <ModalPortal open={!!openRequestModel} onClose={handleClose}>
      <div
        dir="rtl"
        onClick={handleClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/55 p-3 sm:p-5"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[min(92vh,900px)] w-full max-w-[720px] flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.28)]"
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

            <div className="flex items-start gap-3 pe-10">
              <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#237B9F] text-white">
                <FiLock className="size-5" />
              </span>
              <div>
                <h2
                  id="request-modal-title"
                  className="text-[17px] font-extrabold leading-7 text-[#0F172A] sm:text-[18px]"
                >
                  طلب إعادة فتح الأرصدة الافتتاحية للتعديل
                </h2>
                <p className="mt-1 text-[12px] leading-5 text-[#64748B]">
                  تقديم طلب إداري للمدير المالي لفك إقفال الأرصدة المعتمدة وتصحيح
                  القيود
                </p>
              </div>
            </div>
          </div>

          {/* Content — سكرول داخلي */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            {/* Audit warning */}
            <div className="flex items-start gap-3 rounded-[10px] border border-[#F5D061] bg-[#FFF8DB] px-3.5 py-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
                <FiInfo className="size-3.5" />
              </span>
              <div>
                <div className="text-[12.5px] font-bold text-[#92400E]">
                  تنبيه تدقيق رقابي صارم
                </div>
                <p className="mt-1 text-[11.5px] leading-5 text-[#78716C]">
                  هذا الإجراء يتطلب موافقة المدير المالي، وسيُسجَّل في سجل التدقيق
                  الرقمي، ولا يمكن التراجع عنه بعد الاعتماد الرسمي.
                </p>
              </div>
            </div>

            {/* Locked batch data */}
            <div className="rounded-[12px] border border-[#D6E8F2] bg-[#F0F7FB] p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[13px] font-bold text-[#1E293B]">
                  بيانات الدفعة المحاسبية المقفلة
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[10.5px] font-bold text-[#047857]">
                  <FiLock className="size-2.5" />
                  مقفلة بالنظام
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-[10.5px] font-medium text-[#64748B]">
                    رقم الدفعة
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-[12.5px] font-bold text-[#237B9F]">
                    <span dir="ltr">{code}</span>
                    <FiExternalLink className="size-3" />
                  </div>
                </div>
                <div>
                  <div className="text-[10.5px] font-medium text-[#64748B]">
                    السنة المالية
                  </div>
                  <div className="mt-1 text-[12.5px] font-bold text-[#1E293B]">
                    {year} م [السنة الجارية]
                  </div>
                </div>
                <div>
                  <div className="text-[10.5px] font-medium text-[#64748B]">
                    تاريخ الاعتماد
                  </div>
                  <div className="mt-1 text-[12.5px] font-bold text-[#1E293B]">
                    {approvalDate}
                  </div>
                </div>
                <div>
                  <div className="text-[10.5px] font-medium text-[#64748B]">
                    المعتمد الأصلي
                  </div>
                  <div className="mt-1 text-[12.5px] font-bold text-[#1E293B]">
                    {originalApprover}
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="mb-1.5 block text-[12.5px] font-bold text-[#1E293B]">
                سبب طلب إعادة الفتح <span className="text-[#DC2626]">*</span>
              </label>
              <textarea
                value={reason}
                maxLength={MAX_REASON}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
                rows={4}
                placeholder="يرجى كتابة المبرر المحاسبي الدقيق لطلب إعادة الفتح..."
                className="w-full resize-none rounded-[10px] border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[12.5px] leading-6 text-[#1E293B] outline-none placeholder:text-[#94A3B8] focus:border-[#237B9F]"
              />
              <div className="mt-1 text-left text-[11px] font-medium text-[#94A3B8]" dir="ltr">
                {reasonCount} / {MAX_REASON} حرف
              </div>
            </div>

            {/* Sections */}
            <div>
              <label className="mb-1 block text-[12.5px] font-bold text-[#1E293B]">
                الأقسام المطلوب تعديلها (اختياري - تحديد نطاق الفتح)
              </label>
              <p className="mb-2.5 text-[11px] leading-5 text-[#64748B]">
                سيتم فك إقفال الأقسام المحددة فقط، وبقاء بقية الأقسام مقفلة
                ومحمية.
              </p>
              <div className="flex flex-wrap gap-2">
                {SECTION_OPTIONS.map((section) => {
                  const active = selectedSections.includes(section.id);
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                        active
                          ? "border-[#237B9F] bg-[#237B9F] text-white"
                          : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-[#CBD5E1]"
                      }`}
                    >
                      {active && <FiCheck className="size-3 stroke-[2.5]" />}
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upload */}
            <div>
              <label className="mb-2 block text-[12.5px] font-bold text-[#1E293B]">
                إرفاق مستند داعم أو محضر فحص (اختياري)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                className="hidden"
                onChange={(e) => acceptFile(e.target.files?.[0])}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  acceptFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed px-4 py-5 transition ${
                  dragging
                    ? "border-[#237B9F] bg-[#EAF5FA]"
                    : "border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#94A3B8]"
                }`}
              >
                <FiUploadCloud className="size-7 text-[#237B9F]" />
                <p className="mt-2 text-[12px] font-semibold text-[#334155]">
                  اسحب الملف وأفلته هنا، أو تصفح لاختيار ملف من جهازك
                </p>
                <p className="mt-1 text-[10.5px] text-[#94A3B8]">
                  PDF, PNG, JPG — بحد أقصى 10MB
                </p>
              </button>

              {file && (
                <div className="mt-2.5 flex items-center justify-between gap-3 rounded-[10px] border border-[#D6E8F2] bg-[#F0F7FB] px-3.5 py-2.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#FEE2E2] text-[#DC2626]">
                      <FiFileText className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-bold text-[#1E293B]">
                        {file.name}
                      </div>
                      <div className="mt-0.5 text-[10.5px] font-medium text-[#64748B]">
                        {file.sizeLabel} — جاهز للرفع
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#D1FAE5] text-[#059669]">
                      <FiCheck className="size-3 stroke-[2.5]" />
                    </span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      title="حذف الملف"
                      className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-[#FEE2E2] hover:text-[#DC2626]"
                    >
                      <FiTrash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="text-[12px] font-semibold text-[#DC2626]">{error}</p>
            )}
          </div>

          {/* Footer — ثابت */}
          <div className="flex shrink-0 flex-col gap-3 border-t border-[#E6ECEF] bg-[#F8FAFC] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#059669]">
              <MdOutlineVerifiedUser className="size-3.5" />
              <span>مشفر ومسجل بنظام التدقيق الرقمي</span>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[8px] border border-[#CBD5E1] bg-[#EEF2F5] px-5 text-[12.5px] font-bold text-[#475569] transition hover:bg-[#E2E8F0]"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#237B9F] px-4 text-[12.5px] font-bold text-white transition hover:bg-[#1B6280]"
              >
                <FiSend className="size-3.5" />
                <span>إرسال الطلب للمراجعة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default RequestModel;
