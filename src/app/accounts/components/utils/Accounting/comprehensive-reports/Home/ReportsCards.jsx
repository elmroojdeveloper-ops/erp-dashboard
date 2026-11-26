"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiArrowUp,
  FiArrowDown,
  FiArrowLeft,
  FiMoreHorizontal,
  FiFileText,
  FiBookOpen,
  FiLayers,
  FiShield,
} from "react-icons/fi";
import { LuScale } from "react-icons/lu";
import { FaArchive } from "react-icons/fa";

const REPORT_HREFS = {
  "journal-entries": "/accounts/reports/journal-entries",
  "chart-of-accounts": "/accounts/reports/chart-of-accounts",
  "fixed-assets": "/accounts/reports/fixed-assets",
  "opening-balances": "/accounts/reports/opening-balances",
  "audit-trail": "/accounts/reports/audit-trail",
};

const defaultCategories = [
  {
    id: "journal-entries",
    href: "/accounts/comprehensive-reports/EntriesReports",
    title: "تقارير القيود اليومية",
    badge: "نشط",
    description:
      "إجمالي القيود اليومية المرحلة والآلية، حركة تداول العمليات، وتسويات القيود المعلقة والدورية.",
    metric1Label: "إجمالي القيود",
    metric1Value: "4,820 قيد",
    metric2Label: "قيمة تداولات الشهر",
    metric2Value: "28.45M ر.س",
    subReportsLabel: "8 تقارير فرعية",
    iconType: "journal",
    topAccent: "bg-[#f59e0b]",
    usageOrder: 1,
  },
  {
    id: "chart-of-accounts",
    href: "/accounts/comprehensive-reports/AccountsReports",
    title: "تقرير دليل الحسابات",
    badge: "نشط",
    description:
      "الهيكل الشجري للحسابات العامة، الحسابات التجميعية والفرعية، ومطابقة أرصدة الدليل المالي المعتمد.",
    metric1Label: "إجمالي الحسابات",
    metric1Value: "1,420",
    metric2Label: "مطابقة ميزان المراجعة",
    metric2Value: "100% متطابق",
    subReportsLabel: "4 تقارير فرعية",
    iconType: "chart",
    topAccent: "bg-[#0d658a]",
    usageOrder: 2,
  },
  {
    id: "fixed-assets",
    href: "/accounts/comprehensive-reports/AssetReports",
    title: "تقارير الأصول الثابتة",
    badge: "نشط",
    description:
      "متابعة صافي القيمة الدفترية، معدلات الإهلاك السنوية، وسجل استبعاد وتخريد الأصول ومطابقتها...",
    metric1Label: "إجمالي الأصول",
    metric1Value: "284 أصل",
    metric2Label: "صافي القيمة الدفترية",
    metric2Value: "19.42M ر.س",
    subReportsLabel: "6 تقارير فرعية",
    iconType: "assets",
    topAccent: "bg-[#10b981]",
    usageOrder: 3,
  },
  {
    id: "opening-balances",
    href: "/accounts/comprehensive-reports/OpeningBalanceReports",
    title: "تقارير الأرصدة الافتتاحية",
    badge: "نشط",
    description:
      "مطابقة حقوق الملكية، أرصدة بداية السنة المالية السابقة، وسجلات القيود الافتتاحية المعتمدة...",
    metric1Label: "توازن حقوق الملكية",
    metric1Value: "100% متزن",
    metric2Label: "الأرصدة الافتتاحية",
    metric2Value: "98.45M ر.س",
    subReportsLabel: "4 تقارير فرعية",
    iconType: "opening",
    topAccent: "bg-[#3b82f6]",
    usageOrder: 4,
  },
  {
    id: "audit-trail",
    href: "/accounts/comprehensive-reports/AuditReports",
    title: "سجل عمليات التدقيق والرقابة",
    badge: "نشط",
    description:
      "سجل الامتثال والرقابة الداخلية، كشف الفجوات وتعديلات السجلات، ومطابقة متطلبات هيئة الزكاة...",
    metric1Label: "عملية مطابقة",
    metric1Value: "12,194 تحقق",
    metric2Label: "نسبة الامتثال",
    metric2Value: "98.4% متوافق",
    subReportsLabel: "5 تقارير فرعية",
    iconType: "audit",
    topAccent: "bg-[#e11d48]",
    usageOrder: 5,
  },
];

const ReportsCards = ({
  categories = defaultCategories,
  journalEntriesHref = "/accounts/reports/journal-entries",
  onOpenReport,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  const visibleCategories = useMemo(() => {
    const list = (categories || []).filter((cat) => {
      const q = searchTerm.trim();
      if (!q) return true;
      return (
        cat.title.includes(q) ||
        cat.description.includes(q) ||
        cat.metric1Value.includes(q) ||
        cat.metric2Value.includes(q)
      );
    });

    return [...list].sort((a, b) =>
      sortAsc
        ? (a.usageOrder ?? 0) - (b.usageOrder ?? 0)
        : (b.usageOrder ?? 0) - (a.usageOrder ?? 0)
    );
  }, [categories, searchTerm, sortAsc]);

  const getReportHref = (cat) => {
    if (cat.href) return cat.href;
    if (cat.id === "journal-entries" && journalEntriesHref) {
      return journalEntriesHref;
    }
    return REPORT_HREFS[cat.id] || "/accounts/reports";
  };

  const renderIcon = (type) => {
    switch (type) {
      case "journal":
        return <FiFileText className="h-4 w-4 text-[#d97706]" />;
      case "chart":
        return <FiBookOpen className="h-4 w-4 text-[#0d658a]" />;
      case "assets":
        return <FaArchive className="h-3.5 w-3.5 text-[#059669]" />;
      case "opening":
        return <LuScale className="h-4 w-4 text-[#2563eb]" />;
      case "audit":
        return <FiShield className="h-4 w-4 text-[#e11d48]" />;
      default:
        return <FiLayers className="h-4 w-4 text-[#0d658a]" />;
    }
  };

  const renderIconBoxClass = (type) => {
    switch (type) {
      case "journal":
        return "bg-[#fef3c7]/70 border-[#fde68a]";
      case "chart":
        return "bg-[#e0f2fe]/70 border-[#bae6fd]";
      case "assets":
        return "bg-[#d1fae5]/70 border-[#a7f3d0]";
      case "opening":
        return "bg-[#e0e7ff]/70 border-[#c7d2fe]";
      case "audit":
        return "bg-[#ffe4e6]/70 border-[#fecdd3]";
      default:
        return "bg-[#f0f9ff] border-[#bae6fd]";
    }
  };

  return (
    <div
      dir="rtl"
      className="space-y-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* SEARCH & FILTER TOOLBAR */}
      <section className="rounded-xl border border-[#e6ecf2] bg-white p-3">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن تقارير محاسبية محددة، قيود، أو أرصدة..."
              className="h-[34px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-8 text-[11.5px] font-medium text-[#1e293b] placeholder-[#94a3b8] focus:border-[#0d658a] focus:bg-white focus:outline-none"
            />
            <FiSearch className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setFilterTab("all")}
              className={`h-[30px] rounded-md px-3 ${
                filterTab === "all"
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569]"
              }`}
            >
              الكل
            </button>

            <button
              type="button"
              onClick={() => setFilterTab("active")}
              className={`h-[30px] rounded-md px-2.5 ${
                filterTab === "active"
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569]"
              }`}
            >
              نشط
            </button>

            <button
              type="button"
              onClick={() => setFilterTab("info")}
              className={`h-[30px] rounded-md px-2.5 ${
                filterTab === "info"
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569]"
              }`}
            >
              معلومات
            </button>

            <button
              type="button"
              onClick={() => setFilterTab("classify")}
              className={`h-[30px] rounded-md px-2.5 ${
                filterTab === "classify"
                  ? "bg-[#0d658a] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569]"
              }`}
            >
              تصنيف
            </button>

            <button
              type="button"
              onClick={() => setSortAsc((prev) => !prev)}
              className="inline-flex h-[30px] items-center gap-1 rounded-md border border-[#e2e8f0] bg-white px-2.5 text-[#334155]"
            >
              {sortAsc ? (
                <FiArrowUp className="h-3 w-3 text-[#64748b]" />
              ) : (
                <FiArrowDown className="h-3 w-3 text-[#64748b]" />
              )}
              <span>ترتيب الأكثر استخداماً</span>
            </button>
          </div>
        </div>
      </section>

      {/* REPORTS GRID */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((cat) => {
          const href = getReportHref(cat);

          return (
            <article
              key={cat.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e6ecf2] bg-white p-5"
            >
              {/* Top Colored Accent Bar */}
              <span
                className={`absolute inset-x-0 top-0 h-[4px] ${
                  cat.topAccent || "bg-[#0d658a]"
                }`}
              />

              <div>
                {/* Top Row: Icon Box & Menu */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${renderIconBoxClass(
                      cat.iconType
                    )}`}
                  >
                    {renderIcon(cat.iconType)}
                  </div>
                  <button
                    type="button"
                    aria-label={`خيارات ${cat.title}`}
                    className="rounded p-1 text-[#94a3b8]"
                  >
                    <FiMoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Title + Active Badge */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-black text-[#0f172a] leading-snug">
                    {cat.title}
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold text-[#15803d]">
                    {cat.badge || "نشط"}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-[11.5px] font-medium leading-[1.65] text-[#64748b] line-clamp-2">
                  {cat.description}
                </p>

                {/* Two Mini Metrics Box */}
                <div className="mt-4 grid grid-cols-2 rounded-xl border border-[#f1f5f9] bg-[#f8fafc] px-3 py-2.5 text-right">
                  <div className="border-l border-[#e2e8f0] pl-3">
                    <span className="block text-[10px] font-semibold text-[#64748b]">
                      {cat.metric1Label}
                    </span>
                    <strong className="mt-1 block text-[13px] font-black text-[#0f172a]">
                      {cat.metric1Value}
                    </strong>
                  </div>

                  <div className="pr-3">
                    <span className="block text-[10px] font-semibold text-[#64748b]">
                      {cat.metric2Label}
                    </span>
                    <strong className="mt-1 block text-[13px] font-black text-[#0d658a]">
                      {cat.metric2Value}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Footer Metadata + CTA Link */}
              <div className="mt-4">
                <div className="flex items-center justify-between border-t border-[#f1f5f9] pt-3 pb-3.5 text-[10.5px] font-bold text-[#64748b]">
                  <span className="text-[#94a3b8] tracking-widest">&lt;&gt;</span>
                  <span className="inline-flex items-center gap-1">
                    <span>{cat.subReportsLabel}</span>
                    <FiFileText className="h-3.5 w-3.5 text-[#94a3b8]" />
                  </span>
                </div>

                <Link
                  href={href}
                  onClick={() => onOpenReport?.(cat.id)}
                  className="flex h-[38px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#0d658a] px-4 text-[12px] font-extrabold text-white transition hover:bg-[#094e6b]"
                >
                  <span>عرض التقرير</span>
                  <FiArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default ReportsCards;