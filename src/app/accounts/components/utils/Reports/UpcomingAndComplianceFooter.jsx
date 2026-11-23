"use client";

import React from "react";
import { FiBell, FiArrowLeft, FiShield } from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_UPCOMING = {
  title: "فواتير مبيعات تستحق خلال الـ 7 أيام القادمة",
  badgeText: "320,400 ر.س (8 فواتير)",
  items: [
    {
      id: "1",
      label: "شركة الأفق (غدًا): 120,000 ر.س",
      dotColor: "#dc2626",
    },
    {
      id: "2",
      label: "مؤسسة البناء (خلال 3 أيام): 95,400 ر.س",
      dotColor: "#0e6787",
    },
    {
      id: "3",
      label: "شركة الرواد (خلال 6 أيام): 105,000 ر.س",
      dotColor: "#64748b",
    },
  ],
  actionText: "عرض كل الفواتير المستحقة (17 فاتورة)",
};

const DEFAULT_COMPLIANCE = {
  title: "الامتثال والاعتماد الرسمي",
  text: "التقارير مطابقة لمعايير هيئة الزكاة والضريبة والجمارك (ZATCA Phase 2) ومعتمدة محاسبيًا لدفاتر قيود المبيعات.",
};

const UpcomingAndComplianceFooter = ({
  upcoming = DEFAULT_UPCOMING,
  compliance = DEFAULT_COMPLIANCE,
  onViewAllInvoices,
  onSelectInvoice,
  className = "",
}) => {
  return (
    <section
      dir="rtl"
      className={cx("grid grid-cols-1 gap-4 lg:grid-cols-12", className)}
    >
      {/* الكارد اليمين: فواتير مبيعات تستحق خلال الـ 7 أيام القادمة */}
      <div className="rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] lg:col-span-8">
        {/* الهيدر: الجرس + العنوان + الشارة الدائرية الزرقاء */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f2f7] text-[#1b7398]">
              <FiBell size={15} />
            </span>
            <h2 className="max-w-[170px] text-[13.5px] font-extrabold leading-[20px] text-[#111827]">
              {upcoming.title}
            </h2>
          </div>

          {upcoming.badgeText && (
            <span className="flex h-[56px] w-[112px] shrink-0 items-center justify-center rounded-full bg-[#cdebfa] px-2 text-center text-[10.5px] font-extrabold leading-[14px] text-[#0b5a78]">
              {upcoming.badgeText}
            </span>
          )}
        </div>

        {/* صف العناصر + زر عرض الكل على اليسار */}
        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onViewAllInvoices?.()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 self-start rounded-xl bg-[#e9f2f7] px-3.5 text-[11px] font-extrabold text-[#1b7398] transition hover:bg-[#dce9f1] sm:self-center"
          >
            <span>{upcoming.actionText}</span>
            <FiArrowLeft size={12} />
          </button>

          <div className="flex flex-1 flex-col gap-2">
            {upcoming.items?.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectInvoice?.(item)}
                className="flex w-full items-center justify-between gap-2 rounded-xl bg-[#eef2f6] px-3.5 py-2 text-right text-[11.5px] font-extrabold text-[#111827] transition hover:bg-[#e3e9ef]"
              >
                <span className="leading-4">{item.label}</span>
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.dotColor }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* الكارد اليسار: الامتثال والاعتماد الرسمي */}
      <div className="flex items-center justify-between gap-3 rounded-[22px] bg-[#e5f3ec] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-4">
        <div className="text-right">
          <h2 className="text-[13.5px] font-extrabold leading-5 text-[#0e7a43]">
            {compliance.title}
          </h2>
          <p className="mt-1.5 text-[11px] font-medium leading-[18px] text-[#4b5563]">
            {compliance.text}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9e6d8] text-[#0e7a43]">
          <FiShield size={18} strokeWidth={2.2} />
        </div>
      </div>
    </section>
  );
};

export default UpcomingAndComplianceFooter;