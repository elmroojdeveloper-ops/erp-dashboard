"use client";

import React, { useState } from "react";
import {
  FiArchive,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiFileText,
  FiFilter,
  FiLock,
  FiPlus,
  FiPlusCircle,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiTrendingDown,
  FiTrendingUp,
  FiTruck,
} from "react-icons/fi";
import {
  MdOutlineAccountBalance,
  MdOutlineConstruction,
  MdOutlineGroups,
} from "react-icons/md";

const cx = (...c) => c.filter(Boolean).join(" ");

const CARD = "rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]";

/* ----------------------------- Static data ----------------------------- */

const PILLS = [
  {
    id: "draft",
    grow: 319,
    tone: "grey",
    icon: FiFileText,
    label: "مسودة القيد:",
    value: "JV-2026-OPEN",
  },
  {
    id: "date",
    grow: 363,
    tone: "blue",
    icon: FiCalendar,
    label: "تاريخ القيد الافتتاحي:",
    value: "01/01/2026 م",
  },
  {
    id: "year",
    grow: 326,
    tone: "blue",
    icon: FiLock,
    label: "السنة المالية المستهدفة:",
    value: "2026 م",
  },
];

const STEPS = [
  { id: 1, label: "تحديد الفترة", variant: "strong" },
  { id: 2, label: "دليل الحسابات", variant: "muted" },
  { id: 3, label: "إدخال الأرصدة", variant: "active" },
  { id: 4, label: "المطابقة والاعتماد", variant: "muted" },
];

const TABS = [
  {
    id: 1,
    label: "1. الحسابات العامة (بنك، صندوق، رأس مال)",
    icon: MdOutlineAccountBalance,
    count: 6,
  },
  { id: 2, label: "2. المنتجات والتكاليف والمخزون", icon: FiArchive },
  { id: 3, label: "3. أرصدة الموردين", icon: FiTruck },
  { id: 4, label: "4. أرصدة العملاء", icon: MdOutlineGroups },
  { id: 5, label: "5. الأصول الثابتة", icon: MdOutlineConstruction },
];

const TYPE_FILTERS = [
  "جميع أنواع الحسابات",
  "أصل متداول",
  "أصل غير متداول",
  "خصم متداول",
];

const ROWS = [
  {
    no: 1,
    code: "101001",
    name: "صندوق المركز الرئيسي والخزينة",
    note: "الفرع الرئيسي - النقد وما في حكمه",
    type: { label: "أصل متداول", tone: "green" },
    debit: "1,450,000.00",
    credit: "0.00",
    side: "debit",
  },
  {
    no: 2,
    code: "105001",
    name: "الأراضي والعقارات الاستثمارية",
    note: "مجمع مستودعات السلي - الرياض",
    type: { label: "أصل غير متداول", tone: "blue" },
    debit: "32,500,000.00",
    credit: "0.00",
    side: "debit",
  },
  {
    no: 3,
    code: "201001",
    name: "ذمم الموردين التجاريين المجمعة",
    note: "الالتزامات قصيرة الأجل المعتمدة",
    type: { label: "خصم متداول", tone: "grey" },
    debit: "0.00",
    credit: "4,225,000.00",
    side: "credit",
  },
];

const BADGE_TONES = {
  green: { box: "bg-[#d6f5e4] text-[#0e6b40]", dot: "bg-[#0e6b40]" },
  blue: { box: "bg-[#cde6fa] text-[#1f6fa8]", dot: "bg-[#1f6fa8]" },
  grey: { box: "bg-[#e4e6e9] text-[#4b5563]", dot: "bg-[#4b5563]" },
};

// أعمدة الجدول (من اليمين لليسار)
const HEAD_COLS =
  "grid-cols-[36px_minmax(323px,1fr)_192px_158px_144px_139px_106px]";
const BODY_COLS =
  "grid-cols-[36px_minmax(323px,1fr)_192px_158px_76px_158px_155px]";

/* ------------------------------ Sub-parts ------------------------------ */

const InfoPill = ({ grow, tone, icon: Icon, label, value }) => (
  <div
    style={{ flex: `${grow} 1 0%` }}
    className={cx(
      "flex h-8 min-w-0 items-center gap-1.5 rounded-lg px-[14px]",
      tone === "grey"
        ? "bg-[#e8e8ec] text-[#4b4b4b]"
        : "bg-[#e6f0f7] text-primary"
    )}
  >
    <Icon className="size-[14px] shrink-0" />
    <span className="text-[11px]">{label}</span>
    <span
      className={cx(
        "text-[13px] font-bold",
        tone === "grey" && "text-[#3f3f46]"
      )}
    >
      {value}
    </span>
  </div>
);

const Stepper = () => (
  <div className="mt-8 flex items-start">
    {STEPS.map((step, index) => {
      const active = step.variant === "active";
      return (
        <React.Fragment key={step.id}>
          <div className="flex w-[84px] shrink-0 flex-col items-center gap-[5px] text-center sm:w-[116px]">
            <div
              className={cx(
                "flex size-8 items-center justify-center rounded-full text-[12px] font-bold",
                active
                  ? "bg-primary text-white"
                  : "bg-[#e8eff4] text-[#5b6770]"
              )}
            >
              {step.id}
            </div>
            <span
              className={cx(
                "text-[11px] leading-[15px]",
                step.variant === "strong" && "font-bold text-[#2b2b2b]",
                step.variant === "muted" && "text-[#6b7280]",
                active && "text-primary"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div className="mt-[10px] flex flex-1 justify-center" aria-hidden>
              <div className="h-[2px] w-[40%] bg-[#dde5ea]" />
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const AmountCell = ({ value, filled }) => (
  <div
    className={cx(
      "flex h-10 w-[158px] items-center justify-end gap-[17px] rounded-lg px-3",
      filled && "bg-[#f0f3f5]"
    )}
  >
    <span
      className={cx(
        "text-[13px]",
        filled ? "font-bold text-[#2b2b2b]" : "text-[#9ca3af]"
      )}
    >
      {value}
    </span>
    <span className="text-[11px] text-[#9ca3af]">ر.س</span>
  </div>
);

const TotalCard = ({ icon: Icon, label, value }) => (
  <div className="flex h-[82px] items-center gap-7 rounded-lg bg-[#eaf1f8] pr-[29px] pl-4">
    <Icon className="size-[22px] shrink-0 text-primary" />
    <div className="text-right">
      <p className="text-[12px] leading-4 text-[#4b4b4b]">{label}</p>
      <p className="mt-[3px] flex items-baseline gap-1.5 leading-7">
        <span className="text-[20px] font-bold text-[#2b2b2b]">{value}</span>
        <span className="text-[11px] font-medium text-[#4b4b4b]">ر.س</span>
      </p>
    </div>
  </div>
);

/* ------------------------------- Component ------------------------------ */

const EnterBalance = ({
  onBack,
  onImport,
  onSaveDraft,
  onSaveAndContinue,
  onPrevStep,
  onAddRow,
}) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div dir="rtl" className="mx-auto w-full space-y-6 pb-8">
      {/* Header */}
      <div
        className={cx(
          CARD,
          "flex min-h-[116px] flex-wrap items-center justify-between gap-4 px-6 py-5"
        )}
      >
        <div className="text-right">
          <h1 className="text-[24px] font-bold leading-8 text-primary">
            إدخال الأرصدة الافتتاحية للحسابات
          </h1>
          <p className="mt-2.5 text-[15px] leading-6 text-[#4b4b4b]">
            أدخل أو راجع الأرصدة الافتتاحية المدينة والدائنة لشجرة الحسابات بدقة
            قبل الانتقال للخطوة التالية.
          </p>
        </div>

        <div className="flex items-center gap-[11px]">
          <button
            type="button"
            onClick={onImport}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-[14px] text-[14px] font-medium text-white transition hover:bg-primary-dark"
          >
            <FiPlus className="size-[18px]" />
            <span>استيراد الارصدة الافتتاحية</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-[14px] font-medium text-primary"
          >
            <FiArrowRight className="size-4" />
            <span>الرجوع</span>
          </button>
        </div>
      </div>

      {/* Period summary + stepper */}
      <div className={cx(CARD, "p-6")}>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {PILLS.map((pill) => (
            <InfoPill key={pill.id} {...pill} />
          ))}
        </div>
        <Stepper />
      </div>

      {/* Tabs */}
      <div className={cx(CARD, "overflow-x-auto")}>
        <div className="flex h-[54px] min-w-max items-center gap-7 px-3">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cx(
                  "flex h-[41px] shrink-0 items-center gap-2 rounded-lg px-4 text-[13px]",
                  active
                    ? "bg-[#e4eef6] font-bold text-primary"
                    : "text-[#4b4b4b]"
                )}
              >
                <Icon className="size-[18px] shrink-0" />
                <span>{tab.label}</span>
                {active && tab.count ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#cfe3f2] text-[11px] font-bold text-primary">
                    {tab.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className={cx(CARD, "flex h-[76px] items-center gap-6 px-4")}>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ابحث باسم الحساب أو الرقم (مثال: 101001، بنك، صندوق)..."
            className="h-11 w-full rounded-lg border border-[#d9dfe4] bg-white pl-4 pr-[35px] text-[13px] text-[#2b2b2b] outline-none placeholder:text-[#6b7280] focus:border-primary"
          />
          <FiSearch className="pointer-events-none absolute right-[11px] top-1/2 size-4 -translate-y-1/2 text-[#4b4b4b]" />
        </div>

        <div className="relative flex-1">
          <select
            defaultValue={TYPE_FILTERS[0]}
            className="h-11 w-full appearance-none rounded-lg border border-[#d9dfe4] bg-white pl-10 pr-[33px] text-[13px] text-[#4b4b4b] outline-none focus:border-primary"
          >
            {TYPE_FILTERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FiFilter className="pointer-events-none absolute right-[10px] top-1/2 size-4 -translate-y-1/2 text-[#4b4b4b]" />
          <FiChevronDown className="pointer-events-none absolute left-[15px] top-1/2 size-4 -translate-y-1/2 text-[#4b4b4b]" />
        </div>

        <button
          type="button"
          aria-label="تحديث"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#d9dfe4] bg-white text-[#2b2b2b]"
        >
          <FiRefreshCw className="size-5" />
        </button>
      </div>

      {/* Accounts table */}
      <div className={cx(CARD, "overflow-hidden")}>
        <div className="flex h-[70px] items-center gap-[10px] px-[22px]">
          <h2 className="text-[20px] font-bold text-primary">
            الحسابات المُدخلة
          </h2>
          <span className="inline-flex h-[21px] items-center rounded-full bg-primary px-2.5 text-[11px] font-bold text-white">
            3 حسابات
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1120px]">
            {/* Head */}
            <div
              className={cx(
                "grid h-[49px] items-center bg-[#eef3f7] pr-[22px] text-[15px] font-medium text-[#4b4b4b]",
                HEAD_COLS
              )}
            >
              <span>#</span>
              <span className="pr-2">اسم الحساب</span>
              <span className="pr-1">نوع الحساب</span>
              <span className="text-center">الرصيد الافتتاحي مدين</span>
              <span aria-hidden />
              <span>الرصيد الافتتاحي دائن</span>
              <span className="pl-[26px] text-left">إجراء</span>
            </div>

            {/* Rows */}
            {ROWS.map((row, index) => {
              const tone = BADGE_TONES[row.type.tone];
              return (
                <div
                  key={row.no}
                  className={cx(
                    "grid h-[83px] items-center pr-[22px]",
                    index < ROWS.length - 1 && "border-b border-[#e8ecef]",
                    BODY_COLS
                  )}
                >
                  <span className="text-[13px] text-[#6b7280]">{row.no}</span>

                  <div>
                    <p className="text-[13px] font-bold leading-5 text-primary">
                      {row.code}
                    </p>
                    <p className="text-[13px] font-medium leading-5 text-[#2b2b2b]">
                      {row.name}
                    </p>
                    <p className="text-[10px] leading-4 text-[#6b7280]">
                      {row.note}
                    </p>
                  </div>

                  <div>
                    <span
                      className={cx(
                        "inline-flex h-[23px] items-center gap-[5px] rounded-full px-[10px] text-[11px] font-bold",
                        tone.box
                      )}
                    >
                      <span className={cx("size-1.5 rounded-full", tone.dot)} />
                      {row.type.label}
                    </span>
                  </div>

                  <AmountCell value={row.debit} filled={row.side === "debit"} />
                  <span aria-hidden />
                  <AmountCell
                    value={row.credit}
                    filled={row.side === "credit"}
                  />

                  <div className="flex justify-end pl-10">
                    <button
                      type="button"
                      aria-label="حذف السطر"
                      className="text-[#6b7280]"
                    >
                      <FiTrash2 className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add row */}
        <div className="flex justify-end px-9 pt-[37px]">
          <button
            type="button"
            onClick={onAddRow}
            className="inline-flex items-center gap-3 text-[15px] font-medium text-primary"
          >
            <FiPlusCircle className="size-5" />
            <span>إضافة سطر جديد</span>
          </button>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-1 gap-6 px-6 pb-6 pt-[34px] lg:grid-cols-3">
          <TotalCard
            icon={FiTrendingUp}
            label="إجمالي الرصيد المدين"
            value="49,225,000.00"
          />
          <TotalCard
            icon={FiTrendingDown}
            label="إجمالي الرصيد الدائن"
            value="49,225,000.00"
          />

          <div className="flex h-[82px] items-center gap-4 rounded-lg bg-[#e2f3ea] px-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#0b6b45] text-white">
              <FiCheckCircle className="size-6" />
            </span>
            <div className="max-w-[180px] text-right">
              <p className="flex items-center gap-1.5 text-[13px] font-bold leading-[18px] text-[#0b6b45]">
                <span className="size-2 rounded-full bg-[#0b6b45]" />
                الأرصدة متوازنة تماما
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-[#4b4b4b]">
                الفارق الحالي:{" "}
                <span className="font-bold text-[#0b6b45]">0.00 ر.س</span>{" "}
                (القيد جاهز للاعتماد)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div
        className={cx(
          CARD,
          "flex min-h-[76px] flex-wrap items-center justify-between gap-4 py-4 pl-4 pr-[30px]"
        )}
      >
        <button
          type="button"
          onClick={onPrevStep}
          className="inline-flex items-center gap-2 text-[12px] text-[#4b4b4b]"
        >
          <FiArrowRight className="size-4" />
          <span>رجوع للخطوة السابقة (اختيار نوع الأرصدة)</span>
        </button>

        <div className="flex items-center gap-[15px]">
          <button
            type="button"
            onClick={onSaveAndContinue}
            className="inline-flex h-11 items-center gap-3 rounded-[4px] bg-primary px-8 text-[16px] font-bold text-white transition hover:bg-primary-dark"
          >
            <FiArrowLeft className="size-4" />
            <span>حفظ ومتابعة إلى الخطوة التالية</span>
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex h-11 items-center rounded-[4px] bg-[#e6e6e9] px-3 text-[16px] font-medium text-[#5f6368]"
          >
            حفظ كمسودة
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterBalance;