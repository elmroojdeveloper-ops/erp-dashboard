"use client";

import React from "react";
import { FiChevronDown, FiDownload, FiSliders } from "react-icons/fi";

const Header = ({
  onExport,
  onCustomize,
  periodBadge = "محدث: الربع الثالث 2024",
  breadcrumbItems = [
    { label: "المحاسبة العامة", href: null },
    { label: "التقارير المالية", href: null },
    { label: "تقارير الأصول الثابتة", href: null, active: true },
  ],
  title = "تقارير الأصول الثابتة",
}) => {
  return (
    <header
      dir="rtl"
      className="flex flex-wrap mt-4 items-center justify-between gap-4 py-1 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Right Side: Breadcrumb, Title & Period Badge */}
      <div className="min-w-0 text-right">
        <nav
          aria-label="مسار التنقل"
          className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[#64748b]"
        >
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 && <span className="text-[#94a3b8]">‹</span>}
              <span
                className={
                  item.active ? "font-bold text-[#086382]" : undefined
                }
              >
                {item.label}
              </span>
            </React.Fragment>
          ))}
        </nav>

        <div className="mt-1 flex flex-wrap items-center gap-2.5">
          <h1 className="text-[24px] font-black leading-[1.25] text-[#0f172a] sm:text-[26px]">
            {title}
          </h1>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-2.5 py-0.5 text-[10.5px] font-bold text-[#086382]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#086382]" />
            <span>{periodBadge}</span>
          </span>
        </div>
      </div>

      {/* Left Side: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-[36px] items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
        >
          <FiDownload className="h-3.5 w-3.5 text-[#64748b]" />
          <span>تصدير (PDF / Excel)</span>
          <FiChevronDown className="h-3.5 w-3.5 text-[#64748b]" />
        </button>

        <button
          type="button"
          onClick={onCustomize}
          className="inline-flex h-[36px] items-center gap-1.5 rounded-lg bg-[#086382] px-3.5 text-[12px] font-extrabold text-white transition hover:bg-[#064e67]"
        >
          <FiSliders className="h-3.5 w-3.5" />
          <span>تخصيص التقرير</span>
        </button>
      </div>
    </header>
  );
};

export default Header;