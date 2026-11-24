"use client";

import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiInfo,
  FiLock,
  FiArrowLeft,
} from "react-icons/fi";
import {
  MdOutlineEditCalendar,
  MdOutlineEventAvailable,
  MdOutlineReceiptLong,
} from "react-icons/md";

const cx = (...c) => c.filter(Boolean).join(" ");

const STEPS = [
  { id: 1, label: "تحديد الفترة" },
  { id: 2, label: "دليل الحسابات" },
  { id: 3, label: "إدخال الأرصدة" },
  { id: 4, label: "المطابقة والاعتماد" },
];

const FISCAL_YEARS = [
  { value: "2026", label: "2026 (السنة المالية القادمة)" },
  { value: "2025", label: "2025 (السنة المالية الحالية)" },
  { value: "2024", label: "2024" },
];

const fieldBase =
  "h-[41px] w-full rounded-lg border border-[#eef2f5] bg-white text-[14px] font-medium text-[#2b2b2b] shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const BalanceSetting = ({
  onContinue,
  initialFiscalYear = "2026",
  initialOpeningDate = "2026-01-01",
}) => {
  const [fiscalYear, setFiscalYear] = useState(initialFiscalYear);
  const [openingDate, setOpeningDate] = useState(initialOpeningDate);

  useEffect(() => {
    setFiscalYear(initialFiscalYear);
    setOpeningDate(initialOpeningDate);
  }, [initialFiscalYear, initialOpeningDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue?.({ fiscalYear, openingDate });
  };

  return (
    <div dir="rtl" className="mx-auto w-full pb-8">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-[#d7e7f0] bg-[#eaf3f8] px-4 text-[11px] font-medium text-primary">
            <span className="size-[5px] rounded-full bg-primary" aria-hidden />
            الخطوة 1 من 4: التهيئة وتحديد الفترة
          </span>

          {/* Icon */}
          <div className="relative mt-4 flex size-24 items-center justify-center rounded-full bg-[#e9f0f4] text-primary">
            <FiCalendar className="size-9" />
            <span className="absolute -bottom-[3px] -right-1 flex size-8 items-center justify-center rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]">
              <FiLock className="size-4 text-[#1f9d55]" />
            </span>
          </div>

          <h1 className="mt-[18px] text-[26px] font-bold leading-9 text-[#2b2b2b]">
            بدء إعداد الأرصدة الافتتاحية
          </h1>
          <p className="mt-1.5 max-w-[440px] text-[13px] leading-[22px] text-[#4b4b4b]">
            حدد السنة المالية وتاريخ بدء القيود لإنشاء الحسابات الافتتاحية وربط
            موازين المراجعة المعتمدة بدقة.
          </p>
        </div>

        {/* Stepper */}
        <div className="mt-6 flex items-start">
          {STEPS.map((step, index) => {
            const active = step.id === 1;
            const done = step.id < 1;
            return (
              <React.Fragment key={step.id}>
                <div className="flex w-[72px] shrink-0 flex-col items-center gap-[5px] text-center sm:w-[114px]">
                  <div
                    className={cx(
                      "flex size-8 items-center justify-center rounded-full text-[11px] font-bold",
                      active
                        ? "bg-primary text-white"
                        : done
                          ? "bg-primary/15 text-primary"
                          : "bg-[#eaf1f5] text-[#5b6770]"
                    )}
                  >
                    {step.id}
                  </div>
                  <span
                    className={cx(
                      "text-[10px] leading-[14px]",
                      active
                        ? "font-bold text-primary"
                        : "font-medium text-[#6b7280]"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className="mt-[10px] flex flex-1 justify-center"
                    aria-hidden
                  >
                    <div
                      className={cx(
                        "h-[2px] w-[41%]",
                        done ? "bg-primary" : "bg-[#dde5ea]"
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Fields */}
        <div className="mt-10">
          {/* Fiscal year */}
          <div className="text-right">
            <label
              htmlFor="fiscal-year"
              className="mb-2 block text-[11px] font-semibold leading-4 text-[#2b2b2b]"
            >
              السنة المالية المستهدفة
              <span className="mr-1 text-[#e11d48]">*</span>
            </label>
            <div className="relative">
              <select
                id="fiscal-year"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className={cx(fieldBase, "appearance-none pl-10 pr-11")}
              >
                {FISCAL_YEARS.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
              <FiCalendar className="pointer-events-none absolute right-[15px] top-1/2 size-4 -translate-y-1/2 text-[#4b4b4b]" />
              <FiChevronDown className="pointer-events-none absolute left-[9px] top-1/2 size-4 -translate-y-1/2 text-[#6b7280]" />
            </div>
            <p className="mt-1.5 text-[10px] leading-[14px] text-[#6b7280]">
              السنوات المالية المرتبطة بنظام الضرائب والفوترة الإلكترونية
            </p>
          </div>

          {/* Opening date */}
          <div className="mt-5 text-right">
            <label
              htmlFor="opening-date"
              className="mb-2 block text-[11px] font-semibold leading-4 text-[#2b2b2b]"
            >
              تاريخ القيد الافتتاحي
              <span className="mr-1 text-[#e11d48]">*</span>
            </label>
            <div className="relative">
              <input
                id="opening-date"
                type="date"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                className={cx(
                  fieldBase,
                  "relative pl-10 pr-11",
                  "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                )}
              />
              <MdOutlineEventAvailable className="pointer-events-none absolute right-[14px] top-1/2 size-[18px] -translate-y-1/2 text-[#4b4b4b]" />
              <MdOutlineEditCalendar className="pointer-events-none absolute left-[11px] top-1/2 size-[18px] -translate-y-1/2 text-[#6b7280]" />
            </div>
            <p className="mt-1.5 text-[10px] leading-[14px] text-[#6b7280]">
              يتم اعتبار هذا اليوم نقطة انطلاق للترحيل وحساب الإهلاك والتسويات
            </p>
          </div>
        </div>

        {/* Alert */}
        <div className="mt-[26px] flex items-center gap-2 rounded-xl bg-[#eaf3f8] px-4 py-4 text-right">
          <FiInfo className="size-5 shrink-0 text-primary" />
          <div className="max-w-[560px]">
            <p className="text-[12px] font-bold leading-[17px] text-primary">
              تنبيه رقابي هام
            </p>
            <p className="mt-0.5 text-[11px] leading-[19px] text-[#3d4852]">
              لا يمكن تعديل هذا التاريخ أو السنة المالية بعد الانتقال للخطوات
              اللاحقة وتوليد مسودة القيد، وفقاً لمعايير الرقابة المحاسبية
              المعتمدة في ROOJ ERP.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[15px] font-bold text-white transition hover:bg-primary-dark"
        >
          <span>المتابعة إلى إدخال الأرصدة</span>
          <FiArrowLeft className="size-4" />
        </button>

        {/* Footer */}
        <div className="mt-[25px] flex items-center justify-between border-b border-[#eef2f5] pb-2">
          <p className="flex items-center gap-1.5 text-[10px] text-[#4b4b4b]">
            <MdOutlineReceiptLong className="size-4 text-[#1f9d55]" />
            سيتم تلقائياً إنشاء قيد افتتاح تجريبي رقم:
          </p>
          <span className="rounded bg-[#e6f0f6] px-2 py-1 text-[11px] font-bold leading-[15px] text-primary">
            JV-{fiscalYear}-OPEN
          </span>
        </div>
      </form>
    </div>
  );
};

export default BalanceSetting;