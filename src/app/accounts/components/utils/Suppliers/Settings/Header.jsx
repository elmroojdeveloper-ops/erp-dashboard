"use client";

import React from "react";
import { FiSliders } from "react-icons/fi";

const defaultStats = [
  {
    id: "custom-fields",
    label: "إجمالي الحقول المخصصة",
    value: "5 حقول نشطة",
  },
  {
    id: "categories",
    label: "التصنيفات المعتمدة",
    value: "6 تصنيفات",
  },
];

const Header = ({
  icon: Icon = FiSliders,
  title = "إعدادات وتخصيص الموردين",
  badge = "v2.4",
  subtitle = "خصص حقول وسياسات الموردين لتناسب طبيعة عمل مؤسستك ونشاطك التجاري بدون الحاجة لأي برمجة",
  stats = defaultStats,
}) => {
  return (
    <header
      dir="rtl"
      className="flex w-full flex-col justify-between gap-5 rounded-[22px] border border-[#e6ecf2] bg-white px-6 py-5 text-[#1e293b] shadow-2xs lg:flex-row lg:items-center"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* يمين الهيدر: الأيقونة + العنوان + الشارة + الوصف */}
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#086382] text-white shadow-2xs">
          <Icon className="size-6" />
        </div>

        <div className="min-w-0 text-right">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[22px] font-black leading-tight text-[#0f172a] sm:text-[26px]">
              {title}
            </h1>

            {badge && (
              <span className="rounded-[8px] bg-[#dbeefe] px-2.5 py-0.5 text-[12px] font-extrabold text-[#0369a1]">
                {badge}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-1.5 max-w-2xl text-[13px] font-semibold leading-relaxed text-[#64748b] sm:text-[14px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* يسار الهيدر: صندوق الإحصائيات المقسّم */}
      {Array.isArray(stats) && stats.length > 0 && (
        <div className="flex shrink-0 items-center divide-x divide-x-reverse divide-[#dde5ee] self-start rounded-[16px] border border-[#e8eef5] bg-[#f4f7fa] lg:self-center">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center px-5 py-3 text-right"
            >
              <span className="whitespace-pre-line text-[11.5px] font-bold leading-snug text-[#64748b]">
                {item.label}
              </span>
              <span className="mt-0.5 text-[15px] font-black text-[#0f172a] tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;