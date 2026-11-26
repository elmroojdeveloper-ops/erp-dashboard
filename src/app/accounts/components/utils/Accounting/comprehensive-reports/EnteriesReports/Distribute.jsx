"use client";

import React from "react";
import { FiMapPin, FiTruck, FiLayers } from "react-icons/fi";

const defaultBranches = [
  {
    id: "riyadh-hq",
    title: "الرياض - الفرع الرئيسي",
    shareLabel: "52.8%",
    entriesCount: "2,450",
    entriesUnit: "قيد مسجل",
    amountLabel: "16.20 مليون ر.س",
    iconType: "hq",
    progressPercent: 52.8,
  },
  {
    id: "jeddah-ops",
    title: "جدة - العمليات اللوجستية",
    shareLabel: "28.7%",
    entriesCount: "1,480",
    entriesUnit: "قيد مسجل",
    amountLabel: "8.10 مليون ر.س",
    iconType: "logistics",
    progressPercent: 28.7,
  },
  {
    id: "eastern-khobar",
    title: "المنطقة الشرقية - الخبر",
    shareLabel: "18.5%",
    entriesCount: "890",
    entriesUnit: "قيد مسجل",
    amountLabel: "4.15 مليون ر.س",
    iconType: "eastern",
    progressPercent: 18.5,
  },
];

const Distribute = ({
  branches = defaultBranches,
  onViewCostCenters,
}) => {
  const renderIcon = (type) => {
    switch (type) {
      case "logistics":
        return <FiTruck className="h-4 w-4 text-[#0d658a]" />;
      case "eastern":
        return <FiLayers className="h-4 w-4 text-[#0d658a]" />;
      default:
        return <FiMapPin className="h-4 w-4 text-[#0d658a]" />;
    }
  };

  return (
    <section
      dir="rtl"
      className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Row */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <FiMapPin className="h-4 w-4 text-[#0d658a]" />
          <h2 className="text-[13px] font-black text-[#0f172a]">
            توزيع القيود حسب الفروع ومراكز التكلفة
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewCostCenters}
          className="text-[11px] font-bold text-[#0d658a] transition hover:underline"
        >
          عرض قائمة الفروع (3)
        </button>
      </div>

      {/* 3 Branch Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {branches.map((branch) => (
          <article
            key={branch.id}
            className="flex flex-col justify-between rounded-xl border border-[#e6ecf2] bg-[#fafcfd] p-3.5 transition hover:border-[#cbd5e1] hover:bg-white"
          >
            {/* Top: Icon + Title + Share Pill */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e0f2fe] bg-[#f0f9ff]">
                  {renderIcon(branch.iconType)}
                </div>
                <h3 className="truncate text-[12px] font-extrabold text-[#0f172a]">
                  {branch.title}
                </h3>
              </div>

              <span className="shrink-0 rounded-md bg-[#f0f9ff] px-2 py-0.5 text-[10px] font-extrabold text-[#0d658a]">
                {branch.shareLabel}
              </span>
            </div>

            {/* Middle: Entries Count & Amount */}
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-black text-[#0f172a] leading-none">
                  {branch.entriesCount}
                </span>
                <span className="text-[10px] font-bold text-[#64748b]">
                  {branch.entriesUnit}
                </span>
              </div>

              <span className="text-[11.5px] font-extrabold text-[#0d658a]">
                {branch.amountLabel}
              </span>
            </div>

            {/* Bottom: Progress Track */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
              <div
                className="h-full rounded-full bg-[#0d658a] transition-all"
                style={{ width: `${Math.min(100, Math.max(0, branch.progressPercent))}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Distribute;