"use client";

import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiLock } from "react-icons/fi";
import { MdOutlineEditNote, MdOutlineHourglassTop } from "react-icons/md";

const cx = (...c) => c.filter(Boolean).join(" ");

const CARD =
  "rounded-[12px] border border-[#EEF2F5] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]";

const TONES = {
  green: {
    bar: "border-[#0b6b45]",
    iconBox: "bg-[#e3f3ea] text-[#0b6b45]",
    sub: "text-[#0b6b45]",
    count: "text-[#1f1f1f]",
    pill: "bg-[#7cf0b5] text-[#0b5f3a]",
  },
  slate: {
    bar: "border-[#596273]",
    iconBox: "bg-[#eceef0] text-[#4b5563]",
    sub: "text-[#6b7280]",
    count: "text-[#1f1f1f]",
    pill: "border border-[#d6d9dd] bg-[#e5e7ea] text-[#3f4651]",
  },
  amber: {
    bar: "border-[#b9791f]",
    iconBox: "bg-[#faebd7] text-[#b9791f]",
    sub: "text-[#b9791f]",
    count: "text-[#b9791f]",
    pill: "border border-[#f3d3a2] bg-[#fdebd0] text-[#a8661a]",
  },
  red: {
    bar: "border-[#b3211f]",
    iconBox: "bg-[#fde4e4] text-[#c0272d]",
    sub: "text-[#c0272d]",
    count: "text-[#c0272d]",
    pill: "border border-[#f5bcbc] bg-[#fde1e1] text-[#b3211f]",
  },
};

const DEFAULT_STATS = [
  {
    id: "approved",
    tone: "green",
    icon: FiLock,
    title: "دفعات معتمدة ومقفولة",
    subtitle: "سنوات مؤرشفة ومقفولة 🔒",
    count: "3",
    pill: "آخر إقفال: سنة 2025",
    footer: {
      text: "مرحلة نهائياً إلى القيود التأسيسية",
      icon: FiCheckCircle,
      iconClass: "text-[#0b6b45]",
    },
  },
  {
    id: "drafts",
    tone: "slate",
    icon: MdOutlineEditNote,
    title: "مسودات قيد الإعداد",
    subtitle: "عمليات جارية غير مرحلة",
    count: "2",
    pill: "السنة المالية 2026",
    progress: { label: "متوسط الإنجاز الكلي", value: 45 },
  },
  {
    id: "pending",
    tone: "amber",
    icon: MdOutlineHourglassTop,
    title: "دفعات بانتظار الاعتماد",
    subtitle: "بانتظار المدير المالي ⏳",
    count: "1",
    pill: "دفعة المركز الرئيسي",
    footer: { text: "❗ تتطلب مراجعة وتوقيع المدير المالي ⚠️" },
  },
  {
    id: "rejected",
    tone: "red",
    icon: FiAlertCircle,
    title: "دفعات مرفوضة ومسترجعة",
    subtitle: "فروقات غير متوازنة ❌",
    count: "1",
    pill: "فارق مالي",
    footer: {
      text: "تحتاج تصحيح الفوارق المحاسبية وإعادة الرفع",
      icon: FiInfo,
      iconClass: "text-[#c0272d]",
    },
  },
];

const StatCard = ({ stat }) => {
  const tone = TONES[stat.tone];
  const Icon = stat.icon;
  const FooterIcon = stat.footer?.icon;

  return (
    <div className={cx(CARD, "border-r-[5px] px-5 py-5", tone.bar)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 text-right">
          <h3 className="text-[13.5px] font-bold leading-5 text-[#2b2b2b]">
            {stat.title}
          </h3>
          <p className={cx("mt-0.5 text-[11px] font-medium leading-4", tone.sub)}>
            {stat.subtitle}
          </p>
        </div>
        <span
          className={cx(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            tone.iconBox
          )}
        >
          <Icon className="size-[18px]" />
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className={cx("text-[28px] font-bold leading-none", tone.count)}>
          {stat.count}
        </span>
        <span
          className={cx(
            "inline-flex h-5 items-center rounded-full px-2.5 text-[10.5px] font-bold",
            tone.pill
          )}
        >
          {stat.pill}
        </span>
      </div>

      {stat.progress ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] leading-4">
            <span className="text-[#6b7280]">{stat.progress.label}</span>
            <span className="font-bold text-[#0b5a86]">
              {stat.progress.value}%
            </span>
          </div>
          <div
            className="mt-1.5 h-[5px] w-full overflow-hidden rounded-full bg-[#dde4ea]"
            role="progressbar"
            aria-valuenow={stat.progress.value}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#0b5a86]"
              style={{ width: `${stat.progress.value}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-1.5 text-[11px] leading-4 text-[#4b4b4b]">
          {FooterIcon && (
            <FooterIcon
              className={cx("mt-0.5 size-[13px] shrink-0", stat.footer.iconClass)}
            />
          )}
          <span>{stat.footer.text}</span>
        </div>
      )}
    </div>
  );
};

const Cards = ({ stats = DEFAULT_STATS }) => {
  return (
    <div
      dir="rtl"
      className="grid w-full grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default Cards;
