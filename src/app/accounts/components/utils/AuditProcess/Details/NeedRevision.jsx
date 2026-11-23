"use client";

import React from "react";
import {
  FiAlertCircle,
  FiFileText,
  FiBookOpen,
  FiCopy,
  FiLoader,
  FiClock,
} from "react-icons/fi";

/* ============================================================
   بيانات تجريبية مطابقة للصورة (استبدلها ببيانات الـ API)
============================================================ */
const MOCK_REVISION_ITEMS = [
  {
    id: "REV-1",
    title: "قيد غير متوازن",
    category: "الحسابات الختامية",
    timeAgo: "منذ 20 دقيقة",
    entryNumber: "JE/2024/00123",
    amount: "1,245,600",
    currency: "ر.س",
    iconType: "alert", // "alert" | "doc" | "book" | "copy" | "loader"
  },
  {
    id: "REV-2",
    title: "قيد بدون مستند مؤيد",
    category: "مصاريف عامة",
    timeAgo: "منذ 3 ساعات",
    entryNumber: "JE/2023/00122",
    amount: "1,245,600",
    currency: "ر.س",
    iconType: "doc",
  },
  {
    id: "REV-3",
    title: "خطأ في التصنيف المحاسبي",
    category: "مصاريف عامة",
    timeAgo: "منذ 5 ساعات",
    entryNumber: "JE/2023/00122",
    amount: "1,245,600",
    currency: "ر.س",
    iconType: "book",
  },
  {
    id: "REV-4",
    title: "قيد مكرر",
    category: "مصاريف عامة",
    timeAgo: "منذ 5 ساعات",
    entryNumber: "JE/2023/00122",
    amount: "1,245,600",
    currency: "ر.س",
    iconType: "copy",
  },
  {
    id: "REV-5",
    title: "في انتظار توضيح",
    category: "مصاريف عامة",
    timeAgo: "منذ 5 ساعات",
    entryNumber: "JE/2023/00122",
    amount: "1,245,600",
    currency: "ر.س",
    iconType: "loader",
  },
];

const cx = (...c) => c.filter(Boolean).join(" ");

const ICON_MAP = {
  alert: {
    Icon: FiAlertCircle,
    boxClass: "bg-[#fdecec] text-[#dc2626]",
  },
  doc: {
    Icon: FiFileText,
    boxClass: "bg-[#eaf4f8] text-[#1b7398]",
  },
  book: {
    Icon: FiBookOpen,
    boxClass: "bg-[#fdecec] text-[#dc2626]",
  },
  copy: {
    Icon: FiCopy,
    boxClass: "bg-[#fdecec] text-[#dc2626]",
  },
  loader: {
    Icon: FiLoader,
    boxClass: "bg-[#eaf4f8] text-[#1b7398]",
  },
};

const NeedRevision = ({
  items = MOCK_REVISION_ITEMS,
  badgeText = "تتطلب تدخل فوري",
  onSelectEntry,
  className = "",
}) => {
  return (
    <section
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* ===== رأس القسم ===== */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[15px] font-extrabold text-[#1f2937]">
          القيود التي تحتاج مراجعة
        </h2>

        {badgeText && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fdecec] px-2.5 py-1 text-[11px] font-bold text-[#dc2626]">
            <FiAlertCircle size={12} />
            <span>{badgeText}</span>
          </span>
        )}
      </div>

      {/* ===== قائمة القيود ===== */}
      <div className="divide-y divide-[#f1f5f9]">
        {items.map((item) => {
          const iconConfig = ICON_MAP[item.iconType] || ICON_MAP.alert;
          const IconComponent = iconConfig.Icon;

          return (
            <div
              key={item.id}
              role={onSelectEntry ? "button" : undefined}
              tabIndex={onSelectEntry ? 0 : undefined}
              onClick={() => onSelectEntry?.(item)}
              onKeyDown={(e) => {
                if (!onSelectEntry) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectEntry(item);
                }
              }}
              className={cx(
                "flex items-center justify-between gap-3 py-3.5 first:pt-1 last:pb-1 transition-colors",
                onSelectEntry &&
                  "cursor-pointer rounded-xl px-2 hover:bg-[#f8fbfc]"
              )}
            >
              {/* يمين البند: الأيقونة + العنوان والتصنيف والوقت ورقم القيد */}
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={cx(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    iconConfig.boxClass
                  )}
                >
                  <IconComponent size={15} strokeWidth={2.2} />
                </div>

                <div className="min-w-0 space-y-1 text-right">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-bold text-[#1f2937]">
                      {item.title}
                    </span>
                    {item.category && (
                      <span className="rounded-md bg-[#2578A2] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[#8c96a0]">
                    <span className="inline-flex items-center gap-1">
                      <FiClock size={11} />
                      <span>{item.timeAgo}</span>
                    </span>
                    {item.entryNumber && (
                      <>
                        <span>•</span>
                        <span dir="ltr" className="font-medium text-[#6b7280]">
                          {item.entryNumber}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* يسار البند: المبلغ والعملة */}
              <div className="shrink-0 text-left">
                <span
                  dir="ltr"
                  className="text-[13px] font-extrabold text-[#1f2937]"
                >
                  {item.amount}
                </span>
                {item.currency && (
                  <span className="mr-1 text-[11px] font-bold text-[#6b7280]">
                    {item.currency}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NeedRevision;