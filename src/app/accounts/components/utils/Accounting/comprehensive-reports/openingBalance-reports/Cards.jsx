"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import {
  FiShield,
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronLeft,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const defaultAuditCards = [
  {
    id: "total_audits",
    title: "إجمالي عمليات التدقيق",
    badgeText: null,
    badgeTone: "neutral",
    value: "12,480",
    valueColor: "text-[#0f172a]",
    iconType: "audit_shield",
    iconBg: "bg-[#e8f1f6]",
    iconColor: "text-[#086382]",
    deltaText: "↑ +9.4% تغطية رقابية شاملة",
    deltaTone: "teal",
    sparkColor: "#086382",
    sparkData: [
      { v: 18 },
      { v: 26 },
      { v: 23 },
      { v: 35 },
      { v: 32 },
      { v: 46 },
    ],
    actionLabel: null,
  },
  {
    id: "matched_approved",
    title: "معاملات مطابقة ومعتمدة",
    badgeText: "97.7%",
    badgeTone: "green",
    value: "12,194",
    valueColor: "text-[#047857]",
    iconType: "verified_shield",
    iconBg: "bg-[#e6f5ec]",
    iconColor: "text-[#059669]",
    deltaText: "+1.8% تحسن مستمر بالامتثال",
    deltaTone: "green",
    deltaIcon: "up",
    sparkColor: "#047857",
    sparkData: [
      { v: 20 },
      { v: 28 },
      { v: 33 },
      { v: 31 },
      { v: 42 },
      { v: 47 },
    ],
    actionLabel: null,
  },
  {
    id: "unmatched_gaps",
    title: "معاملات غير مطابقة / فجوات",
    badgeText: "2.3%",
    badgeTone: "red",
    value: "286",
    valueColor: "text-[#b42318]",
    iconType: "warning",
    iconBg: "bg-[#fbeae9]",
    iconColor: "text-[#b42318]",
    deltaText: "-14.2% انخفاض المخالفات",
    deltaTone: "red",
    deltaIcon: "down",
    sparkColor: null,
    sparkData: null,
    actionLabel: "متابعة المعلقات",
  },
];

const renderCardIcon = (iconType, colorClass) => {
  switch (iconType) {
    case "audit_shield":
      return <FiShield className={`h-5 w-5 ${colorClass}`} />;
    case "verified_shield":
      return <LuShieldCheck className={`h-5 w-5 ${colorClass}`} />;
    case "warning":
      return <FiAlertTriangle className={`h-5 w-5 ${colorClass}`} />;
    default:
      return <FiShield className={`h-5 w-5 ${colorClass}`} />;
  }
};

const getTopBadgeClasses = (tone) => {
  if (tone === "green") {
    return "border-[#ccebd9] bg-[#eaf7f0] text-[#047857]";
  }
  if (tone === "red") {
    return "border-[#f6d5d3] bg-[#fdf0ef] text-[#b42318]";
  }
  return "border-[#e2e8f0] bg-[#f4f7fa] text-[#475569]";
};

const getDeltaBadgeClasses = (tone) => {
  if (tone === "red") {
    return "border-[#f8d7d5] bg-[#fdf1f0] text-[#b42318]";
  }
  if (tone === "teal") {
    return "border-[#cce8df] bg-[#e9f7f2] text-[#047857]";
  }
  return "border-[#ccebd9] bg-[#eaf7f0] text-[#047857]";
};

const Cards = ({ cards = defaultAuditCards, onFollowUpPending }) => {
  return (
    <section
      dir="rtl"
      className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {cards.map((card) => (
        <article
          key={card.id}
          className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.02)]"
        >
          {/* Top Row: Text on Right + Badge & Icon Box on Left */}
          <div className="flex items-start justify-between gap-3">
            {/* Right: Title & Main Value */}
            <div className="min-w-0 flex-1 text-right">
              <h2 className="text-[13px] font-extrabold text-[#475569]">
                {card.title}
              </h2>

              <div
                className={`mt-2.5 text-[30px] font-black leading-none tracking-tight tabular-nums ${card.valueColor}`}
                dir="auto"
              >
                {card.value}
              </div>
            </div>

            {/* Left: Top Badge + Icon Box */}
            <div className="flex shrink-0 items-center gap-2">
              {card.badgeText && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-extrabold tabular-nums ${getTopBadgeClasses(
                    card.badgeTone
                  )}`}
                  dir="auto"
                >
                  {card.badgeText}
                </span>
              )}

              <div
                className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] ${card.iconBg}`}
              >
                {renderCardIcon(card.iconType, card.iconColor)}
              </div>
            </div>
          </div>

          {/* Bottom Row: Delta Badge on Right + Sparkline / Action on Left */}
          <div className="mt-5 flex items-center justify-between gap-3">
            {/* Right: Delta Badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-extrabold tabular-nums ${getDeltaBadgeClasses(
                card.deltaTone
              )}`}
              dir="auto"
            >
              {card.deltaIcon === "up" && (
                <FiTrendingUp className="h-3.5 w-3.5 shrink-0" />
              )}
              {card.deltaIcon === "down" && (
                <FiTrendingDown className="h-3.5 w-3.5 shrink-0" />
              )}
              <span>{card.deltaText}</span>
            </span>

            {/* Left: Sparkline or Action Button */}
            {card.sparkData?.length ? (
              <div className="h-[34px] w-[96px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={card.sparkData}
                    margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
                  >
                    <defs>
                      <linearGradient
                        id={`spark-${card.id}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={card.sparkColor}
                          stopOpacity={0.22}
                        />
                        <stop
                          offset="100%"
                          stopColor={card.sparkColor}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={card.sparkColor}
                      strokeWidth={2}
                      fill={`url(#spark-${card.id})`}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : card.actionLabel ? (
              <button
                type="button"
                onClick={() => onFollowUpPending?.(card)}
                className="inline-flex h-[30px] items-center gap-1 rounded-[8px] border border-[#dce8f0] bg-[#f2f7fb] px-3 text-[11px] font-extrabold text-[#086382] transition hover:bg-[#e5f0f8]"
              >
                <span>{card.actionLabel}</span>
                <FiChevronLeft className="h-3.5 w-3.5" />
              </button>
            ) : (
              <span />
            )}
          </div>
        </article>
      ))}
    </section>
  );
};

export default Cards;