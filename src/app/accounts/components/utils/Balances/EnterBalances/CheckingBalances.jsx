"use client";

import React, { useState } from "react";
import {
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiEye,
  FiInfo,
  FiSend,
} from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const CARD = "rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]";

const SECTIONS = [
  {
    id: "general-accounts",
    title: "1. الحسابات العامة",
    subtitle: "بنك، صندوق، رأس مال والاحتياطيات",
    rows: [
      {
        code: "101001",
        name: "صندوق المركز الرئيسي والخزينة",
        type: "أصل متداول",
        debit: "1,450,000.00",
        credit: "0.00",
      },
      {
        code: "301001",
        name: "رأس مال صاحب المنشأة",
        type: "حقوق ملكية",
        debit: "0.00",
        credit: "40,000,000.00",
      },
      {
        code: "102001",
        name: "البنك الأهلي - الحساب الجاري",
        type: "أصل متداول",
        debit: "8,750,000.00",
        credit: "0.00",
      },
    ],
  },
  {
    id: "customers-receivables",
    title: "2. أرصدة العملاء والذمم المدينة",
    subtitle: "فواتير آجلة وحوافظ قبض قائمة",
    rows: [
      {
        code: "110201",
        name: "شركة الحلول التقنية المحدودة",
        type: "ذمم مدينة",
        debit: "2,340,000.00",
        credit: "0.00",
      },
      {
        code: "110205",
        name: "مؤسسة النور للتجارة",
        type: "ذمم مدينة",
        debit: "875,500.00",
        credit: "0.00",
      },
    ],
  },
  {
    id: "suppliers-payables",
    title: "3. أرصدة الموردين والذمم الدائنة",
    subtitle: "فواتير شراء غير مسددة ومقدمات",
    rows: [
      {
        code: "201001",
        name: "ذمم الموردين التجاريين المجمعة",
        type: "خصم متداول",
        debit: "0.00",
        credit: "4,225,000.00",
      },
      {
        code: "201015",
        name: "مورد الأجهزة المكتبية",
        type: "خصم متداول",
        debit: "0.00",
        credit: "640,000.00",
      },
    ],
  },
  {
    id: "products-costs",
    title: "4. المنتجات والمخزون وبضاعة أول المدة",
    subtitle: "قيمة المخزون الافتتاحية حسب المستودعات",
    rows: [
      {
        code: "120101",
        name: "مخزون الفرع الرئيسي",
        type: "مخزون",
        debit: "6,120,000.00",
        credit: "0.00",
      },
      {
        code: "120110",
        name: "مخزون مستودع السلي",
        type: "مخزون",
        debit: "3,480,000.00",
        credit: "0.00",
      },
    ],
  },
  {
    id: "fixed-assets-dep",
    title: "5. الأصول الثابتة ومجمعات الإهلاك",
    subtitle: "القيمة الدفترية ومجمع الإهلاك المتراكم",
    rows: [
      {
        code: "105001",
        name: "الأراضي والعقارات الاستثمارية",
        type: "أصل غير متداول",
        debit: "32,500,000.00",
        credit: "0.00",
      },
      {
        code: "105901",
        name: "مجمع إهلاك المباني والمعدات",
        type: "مجمع إهلاك",
        debit: "0.00",
        credit: "9,150,500.00",
      },
    ],
  },
];

const SectionBlock = ({ section, open, onToggle, onEdit }) => (
  <div className="overflow-hidden rounded-xl border border-[#e6ecef] bg-white">
    <div className="flex items-center justify-between gap-3 bg-[#f7fafc] px-5 py-3.5">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center justify-between gap-3 text-right"
      >
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-[#2b2b2b]">{section.title}</p>
          <p className="mt-0.5 text-[11px] text-[#6b7280]">{section.subtitle}</p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
          {open ? (
            <FiChevronUp className="size-4" />
          ) : (
            <FiChevronDown className="size-4" />
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(section);
        }}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#d7e7f0] bg-white px-3 py-2 text-[12px] font-semibold text-primary transition hover:bg-[#eaf3f8]"
      >
        <FiEdit2 className="size-3.5" />
        <span>تعديل</span>
      </button>
    </div>

    {open && (
      <div className="overflow-x-auto border-t border-[#eef2f5]">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[110px_1.4fr_120px_130px_130px_72px] gap-2 bg-[#f4f7fa] px-5 py-3 text-[11px] font-bold text-[#65717d]">
            <span>كود الحساب</span>
            <span>اسم الحساب</span>
            <span>التصنيف</span>
            <span className="text-left">مدين (ر.س)</span>
            <span className="text-left">دائن (ر.س)</span>
            <span className="text-center">إجراء</span>
          </div>

          {section.rows.map((row) => (
            <div
              key={row.code}
              className="grid grid-cols-[110px_1.4fr_120px_130px_130px_72px] items-center gap-2 border-t border-[#eef2f5] px-5 py-3 text-[12px]"
            >
              <span className="font-bold text-primary">{row.code}</span>
              <span className="font-medium text-[#2b2b2b]">{row.name}</span>
              <span className="inline-flex w-fit rounded-full bg-[#eef3f6] px-2.5 py-1 text-[10px] font-semibold text-[#52606D]">
                {row.type}
              </span>
              <span className="text-left font-semibold text-[#2b2b2b]" dir="ltr">
                {row.debit}
              </span>
              <span className="text-left font-semibold text-[#2b2b2b]" dir="ltr">
                {row.credit}
              </span>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  aria-label="عرض"
                  className="text-[#6b7280] transition hover:text-primary"
                >
                  <FiEye className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="تعديل"
                  onClick={() => onEdit?.(section, row)}
                  className="text-[#6b7280] transition hover:text-primary"
                >
                  <FiEdit2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const FooterTotals = ({
  debitTotal = "54,225,000.00",
  creditTotal = "54,225,000.00",
  difference = "0.00",
}) => (
  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
    <div className="text-right">
      <p className="text-[11px] text-[#6b7280]">إجمالي المدين</p>
      <p className="mt-0.5 text-[14px] font-bold text-[#2b2b2b]" dir="ltr">
        {debitTotal}{" "}
        <span className="text-[11px] font-medium text-[#6b7280]">ر.س</span>
      </p>
    </div>
    <div className="text-right">
      <p className="text-[11px] text-[#6b7280]">إجمالي الدائن</p>
      <p className="mt-0.5 text-[14px] font-bold text-[#2b2b2b]" dir="ltr">
        {creditTotal}{" "}
        <span className="text-[11px] font-medium text-[#6b7280]">ر.س</span>
      </p>
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-[#e2f3ea] px-3 py-2">
      <FiCheckCircle className="size-4 shrink-0 text-[#0b6b45]" />
      <div className="text-right">
        <p className="text-[11px] text-[#4b6b5a]">الفرق</p>
        <p className="text-[14px] font-bold text-[#0b6b45]" dir="ltr">
          {difference}{" "}
          <span className="text-[11px] font-medium">ر.س</span>
        </p>
      </div>
    </div>
  </div>
);

const CheckingBalances = ({
  onBack,
  onApprove,
  onSaveDraft,
  onLockDraft,
  onEditSection,
  onCancelEdit,
  debitTotal,
  creditTotal,
  difference,
}) => {
  const [openIds, setOpenIds] = useState([
    "general-accounts",
    "customers-receivables",
  ]);

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div dir="rtl" className="w-full space-y-4">
      <section className="space-y-3">
        {SECTIONS.map((section) => (
          <SectionBlock
            key={section.id}
            section={section}
            open={openIds.includes(section.id)}
            onToggle={() => toggle(section.id)}
            onEdit={(sec, row) => onEditSection?.(sec, row)}
          />
        ))}
      </section>

      {/* Footer — مطابق لفيجما */}
      <footer className={cx(CARD, "overflow-hidden")}>
        <div className="flex min-h-[76px] flex-wrap items-center justify-between gap-4 border-b border-[#eef2f5] py-4 pl-4 pr-[30px]">
          {/* يمين RTL: المجاميع */}
          <FooterTotals
            debitTotal={debitTotal}
            creditTotal={creditTotal}
            difference={difference}
          />

          {/* شمال RTL: الأزرار */}
          <div className="flex flex-wrap items-center gap-[15px]">
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-primary px-8 text-[16px] font-bold text-white transition hover:bg-primary-dark"
            >
              <FiSend className="size-4" />
              <span>إرسال للاعتماد</span>
            </button>

            <button
              type="button"
              onClick={onSaveDraft || onLockDraft}
              className="inline-flex h-11 items-center rounded-[4px] bg-[#e6e6e9] px-3 text-[16px] font-medium text-[#5f6368] transition hover:bg-[#dcdce1]"
            >
              حفظ كمسودة
            </button>

            <button
              type="button"
              onClick={onCancelEdit || onBack}
              className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-primary bg-white px-4 text-[14px] font-semibold text-primary transition hover:bg-[#eaf3f8]"
            >
              <FiEdit2 className="size-4" />
              <span>إعادة التعديل</span>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-[#eaf3f8] px-5 py-3">
          <FiInfo className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-[12px] leading-5 text-[#3d4852]">
            يرجى التأكد من أن الميزان متساوٍ قبل إرسال طلب الاعتماد النهائي
            للجهة المعنية.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CheckingBalances;
