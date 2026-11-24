"use client";

import React from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiFileText,
  FiLock,
  FiPlus,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { FaArchive, FaBuilding, FaLandmark } from "react-icons/fa";

const CARDS = [
  {
    id: "general-accounts",
    badge: "شجرة الحسابات",
    badgeBg: "bg-[#E6ECEF]",
    badgeText: "text-[#52606D]",
    icon: FaLandmark,
    title: "الحسابات العامة",
    description:
      "أرصدة البنوك، الصناديق النقدية، رأس المال، والاحتياطيات والعهد النقدية لترحيل القيد المالي الافتتاحي المباشر.",
    tag: "بنك، صندوق، رأس مال",
  },
  {
    id: "products-costs",
    badge: "المخزون السلعي",
    badgeBg: "bg-[#E6ECEF]",
    badgeText: "text-[#52606D]",
    icon: FaArchive,
    title: "المنتجات والتكاليف",
    description:
      "قيمة المخزون الافتتاحية لبضاعة أول المدة وكميات وتكاليف الأصناف المفصلة بالمستودعات والفروع.",
    tag: "قيمة المخزون الافتتاحية",
  },
  {
    id: "suppliers-payables",
    badge: "الذمم الدائنة",
    badgeBg: "bg-[#FCE8E8]",
    badgeText: "text-[#C84B4B]",
    icon: FiTruck,
    title: "الموردون والذمم الدائنة",
    description:
      "الأرصدة المستحقة للموردين التجاريين، فواتير الشراء السابقة غير المسددة، والدفعات والمقدمات المسجلة.",
    tag: "أرصدة مستحقة للموردين",
  },
  {
    id: "customers-receivables",
    badge: "الذمم المدينة",
    badgeBg: "bg-[#E3F3ED]",
    badgeText: "text-[#2D8A68]",
    icon: FiUsers,
    title: "العملاء والذمم المدينة",
    description:
      "الأرصدة المستحقة من العملاء التجاريين، فواتير المبيعات الآجلة المعلقة، وحوافظ أوراق القبض والشيكات.",
    tag: "أرصدة مستحقة من العملاء",
  },
  {
    id: "fixed-assets-dep",
    badge: "الأصول الرأسمالية",
    badgeBg: "bg-[#E6ECEF]",
    badgeText: "text-[#52606D]",
    icon: FaBuilding,
    title: "الأصول الثابتة والإهلاك",
    description:
      "القيمة الدفترية الافتتاحية للأصول والمعدات، مجمعات الإهلاك المتراكمة السابقة، ومواقع تشغيل الأصول.",
    tag: "القيمة الدفترية للأصول",
  },
];

const STEPS = [
  { id: 1, label: "تحديد الفترة" },
  { id: 2, label: "دليل الحسابات" },
  { id: 3, label: "إدخال الأرصدة" },
  { id: 4, label: "المطابقة والاعتماد" },
];

const formatDate = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y} م`;
};

const BalancesType = ({
  fiscalYear = "2026",
  openingDate = "2026-01-01",
  entryCode = "JV-2026-OPEN",
  onBack,
  onSelectType,
  onImport,
}) => {
  return (
    <div dir="rtl" className="flex w-full flex-col gap-4 pb-6">
      {/* Page header */}
      <section className="flex items-center justify-between rounded-[14px] border border-[#E6ECEF] bg-[#F8FAFB] px-6 py-5">
        <div>
          <h1 className="text-[20px] font-bold leading-snug text-[#237B9F]">
            اختيار نوع الأرصدة الافتتاحية
          </h1>
          <p className="mt-1 text-[13.5px] font-normal text-[#64748B]">
            حدد نمط الحسابات المُراد تدقيق وإدراج أرصدتها المبدئية لحقبة{" "}
            {fiscalYear}. ستنقلك كل فئة لشاشة القيود المطابقة لمعايير الهيئة.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex shrink-0 items-center gap-2 text-[13.5px] font-semibold text-[#237B9F] transition hover:text-[#1B6280]"
        >
          <span>الرجوع</span>
          <FiArrowLeft className="size-4" />
        </button>
      </section>

      {/* Meta + stepper */}
      <section className="rounded-[14px] border border-[#E6ECEF] bg-[#F8FAFB] px-6 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex h-[34px] items-center justify-center gap-2 rounded-lg bg-[#E9EFF2] px-4 text-[12px]">
            <FiFileText className="size-3.5 text-[#52606D]" />
            <span className="font-medium text-[#52606D]">مسودة القيد:</span>
            <span className="font-bold tracking-wide text-[#334155]" dir="ltr">
              {entryCode}
            </span>
          </div>

          <div className="flex h-[34px] items-center justify-center gap-2 rounded-lg bg-[#E9EFF2] px-4 text-[12px]">
            <FiCalendar className="size-3.5 text-[#237B9F]" />
            <span className="font-medium text-[#52606D]">
              تاريخ القيد الافتتاحي:
            </span>
            <span className="font-bold text-[#237B9F]">
              {formatDate(openingDate)}
            </span>
          </div>

          <div className="flex h-[34px] items-center justify-center gap-2 rounded-lg bg-[#E9EFF2] px-4 text-[12px]">
            <FiLock className="size-3.5 text-[#237B9F]" />
            <span className="font-medium text-[#52606D]">
              السنة المالية المستهدفة:
            </span>
            <span className="font-bold text-[#237B9F]">{fiscalYear} م</span>
          </div>
        </div>

        <div className="mt-5 mb-1 flex items-start justify-between px-2 sm:px-8">
          {STEPS.map((step, index) => {
            const active = step.id === 2;
            const done = step.id < 2;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex size-[30px] items-center justify-center rounded-full text-[12px] font-bold ${
                      active
                        ? "bg-[#237B9F] text-white"
                        : done
                          ? "bg-[#E3EFF3] text-[#237B9F]"
                          : "bg-[#E9EFF2] text-[#64748B]"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`text-[11px] ${
                      active
                        ? "font-bold text-[#237B9F]"
                        : "font-semibold text-[#475569]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`mt-[14px] h-px min-w-[24px] flex-1 ${
                      done ? "bg-[#237B9F]" : "bg-[#CBD5E1]"
                    }`}
                    aria-hidden
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Type cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((card) => {
          const CardIcon = card.icon;
          return (
            <div
              key={card.id}
              className="flex min-h-[224px] flex-col justify-between rounded-[14px] border border-[#E6ECEF] bg-[#F8FAFB] p-5 transition hover:border-[#CBD5E1]"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex size-[46px] items-center justify-center rounded-[11px] bg-[#E3EFF3] text-[#237B9F]">
                    <CardIcon className="size-5" />
                  </div>
                  <span
                    className={`${card.badgeBg} ${card.badgeText} rounded-full px-3 py-1 text-[11px] font-semibold`}
                  >
                    {card.badge}
                  </span>
                </div>

                <h2 className="mt-4 text-[15.5px] font-bold text-[#1E293B]">
                  {card.title}
                </h2>
                <p className="mt-1.5 text-[12px] leading-[1.65] text-[#64748B]">
                  {card.description}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between pt-4">
                <span className="rounded-full bg-[#EFF3F6] px-3 py-1 text-[10.5px] font-medium text-[#64748B]">
                  {card.tag}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectType?.(card)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-bold text-[#237B9F] transition hover:text-[#1B6280]"
                >
                  <span>بدء الإدخال</span>
                  <FiArrowLeft className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer actions */}
      <footer className="mt-auto flex flex-col gap-3 rounded-[14px] border border-[#E6ECEF] bg-[#F8FAFB] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 text-[12.5px] font-medium text-[#6D717F] transition hover:text-[#334155]"
        >
          <span>رجوع للخطوة السابقة (تحديد السنة والتاريخ)</span>
          <FiArrowRight className="size-4" />
        </button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-[12.5px] text-[#64748B]">
            أو يمكنك رفع ملف إكسل موحد لكافة الأرصدة دفعة واحدة
          </span>
          <button
            type="button"
            onClick={onImport}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#237B9F] px-5 text-[13px] font-semibold text-white transition hover:bg-[#1D6887]"
          >
            <FiPlus className="size-4" />
            <span>استيراد الارصدة الافتتاحية</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BalancesType;
