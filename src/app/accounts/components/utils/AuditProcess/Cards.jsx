"use client";

import React from "react";
import { FiRefreshCw, FiAward, FiAlertCircle } from "react-icons/fi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_STATS = {
  totalAudits: 24,
  inProgress: 8,
  complianceRate: "92%",
  pendingNotes: 15,
};

const Cards = ({
  stats = DEFAULT_STATS,
  activeFilter,
  onSelectFilter,
  className = "",
}) => {
  const {
    totalAudits = 24,
    inProgress = 8,
    complianceRate = "92%",
    pendingNotes = 15,
  } = stats || {};

  const cards = [
    {
      key: "all",
      title: "إجمالي العمليات",
      value: totalAudits,
      featured: true,
      Icon: HiOutlineClipboardDocumentList,
      iconBoxClass: "bg-white/15 text-white",
      titleClass: "text-white",
      valueClass: "text-white",
    },
    {
      key: "active",
      title: "تحت التنفيذ",
      value: inProgress,
      featured: false,
      Icon: FiRefreshCw,
      iconBoxClass: "bg-[#eaf4f8] text-[#1b7398]",
      titleClass: "text-[#374151]",
      valueClass: "text-[#1f2937]",
    },
    {
      key: "compliance",
      title: "معدل الامتثال",
      value: complianceRate,
      featured: false,
      Icon: FiAward,
      iconBoxClass: "bg-[#eaf4f8] text-[#1b7398]",
      titleClass: "text-[#374151]",
      valueClass: "text-[#1f2937]",
    },
    {
      key: "pending_notes",
      title: "ملاحظات معلقة",
      value: pendingNotes,
      featured: false,
      Icon: FiAlertCircle,
      iconBoxClass: "bg-[#fdecec] text-[#dc2626]",
      titleClass: "text-[#374151]",
      valueClass: "text-[#dc2626]",
    },
  ];

  return (
    <section
      dir="rtl"
      className={cx(
        "my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {cards.map((card) => {
        const IconComponent = card.Icon;
        const isActive = activeFilter === card.key;

        return (
          <div
            key={card.key}
            role={onSelectFilter ? "button" : undefined}
            tabIndex={onSelectFilter ? 0 : undefined}
            onClick={() => onSelectFilter?.(card.key)}
            onKeyDown={(e) => {
              if (!onSelectFilter) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectFilter(card.key);
              }
            }}
            className={cx(
              "flex min-h-[106px] items-start justify-between rounded-[20px] p-4 transition-all",
              card.featured
                ? "bg-gradient-to-l from-[#176b8f] to-[#095372] text-white shadow-[0_6px_18px_rgba(9,83,114,0.18)]"
                : "bg-white text-[#1f2937] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.05)]",
              onSelectFilter && "cursor-pointer",
              isActive && !card.featured && "ring-2 ring-[#1b7398]/50"
            )}
          >
            {/* يمين الكرت: العنوان والقيمة */}
            <div className="flex flex-col items-start justify-between gap-2 text-right">
              <span
                className={cx(
                  "text-[13.5px] font-bold leading-5",
                  card.titleClass
                )}
              >
                {card.title}
              </span>
              <span
                dir="ltr"
                className={cx(
                  "text-[24px] font-extrabold leading-7 tracking-tight",
                  card.valueClass
                )}
              >
                {card.value}
              </span>
            </div>

            {/* يسار الكرت: الأيقونة */}
            <div
              className={cx(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                card.iconBoxClass
              )}
            >
              <IconComponent size={18} strokeWidth={2.2} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Cards;