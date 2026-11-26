"use client";

import React, { useMemo, useState } from "react";

const defaultMonthlyData = [
  {
    id: "oct-25",
    label: "أكتوبر 25",
    received: 78,
    paid: 62,
    receivedAmount: "1,180,000 ر.س",
    paidAmount: "940,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "nov-25",
    label: "نوفمبر 25",
    received: 85,
    paid: 72,
    receivedAmount: "1,320,000 ر.س",
    paidAmount: "1,090,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "dec-25",
    label: "ديسمبر 25",
    received: 90,
    paid: 78,
    receivedAmount: "1,410,000 ر.س",
    paidAmount: "1,195,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "jan-26",
    label: "يناير 26",
    received: 80,
    paid: 58,
    receivedAmount: "1,225,000 ر.س",
    paidAmount: "885,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "feb-26",
    label: "فبراير 26",
    received: 88,
    paid: 69,
    receivedAmount: "1,365,000 ر.س",
    paidAmount: "1,040,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "mar-26",
    label: "مارس 26 (الحالي)",
    received: 94,
    paid: 64,
    receivedAmount: "1,485,000 ر.س",
    paidAmount: "980,000 ر.س",
    isForecast: false,
    isCurrent: true,
  },
  {
    id: "apr-26",
    label: "أبريل 26 (توقع)",
    received: 73,
    paid: 52,
    receivedAmount: "1,110,000 ر.س",
    paidAmount: "790,000 ر.س",
    isForecast: true,
    isCurrent: false,
  },
];

const defaultQuarterlyData = [
  {
    id: "q2-25",
    label: "الربع الثاني 25",
    received: 74,
    paid: 65,
    receivedAmount: "3,420,000 ر.س",
    paidAmount: "2,980,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "q3-25",
    label: "الربع الثالث 25",
    received: 82,
    paid: 71,
    receivedAmount: "3,890,000 ر.س",
    paidAmount: "3,250,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "q4-25",
    label: "الربع الرابع 25",
    received: 89,
    paid: 76,
    receivedAmount: "4,150,000 ر.س",
    paidAmount: "3,610,000 ر.س",
    isForecast: false,
    isCurrent: false,
  },
  {
    id: "q1-26",
    label: "الربع الأول 26 (الحالي)",
    received: 94,
    paid: 68,
    receivedAmount: "4,480,000 ر.س",
    paidAmount: "3,120,000 ر.س",
    isForecast: false,
    isCurrent: true,
  },
  {
    id: "q2-26",
    label: "الربع الثاني 26 (توقع)",
    received: 77,
    paid: 60,
    receivedAmount: "3,640,000 ر.س",
    paidAmount: "2,790,000 ر.س",
    isForecast: true,
    isCurrent: false,
  },
];

const MonthlyTrendChart = ({
  title = "اتجاه المستحقات الشهرية للموردين (2025 - 2026 م)",
  subtitle = "مقارنة الفواتير الجديدة الصادرة شهرياً مقابل إجمالي المدفوعات المسددة للموردين",
  monthlySeries = defaultMonthlyData,
  quarterlySeries = defaultQuarterlyData,
  onPeriodModeChange,
}) => {
  const [periodMode, setPeriodMode] = useState("monthly"); // "monthly" | "quarterly"
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = useMemo(() => {
    return periodMode === "monthly" ? monthlySeries : quarterlySeries;
  }, [periodMode, monthlySeries, quarterlySeries]);

  const handleSwitchMode = (nextMode) => {
    setPeriodMode(nextMode);
    setHoveredIndex(null);
    onPeriodModeChange?.(nextMode);
  };

  // Chart coordinate system (0..700 width, 0..220 height)
  const svgWidth = 700;
  const svgHeight = 220;
  const baselineY = 196;
  const topPadding = 32;
  const usableHeight = baselineY - topPadding;

  const slotWidth = svgWidth / Math.max(items.length, 1);
  const barWidth = 22;
  const barGap = 6;

  const computedBars = useMemo(() => {
    return items.map((item, index) => {
      // Reverse X position so index 0 appears on the far right (RTL)
      const visualSlotIndex = items.length - 1 - index;
      const slotCenterX =
        visualSlotIndex * slotWidth + slotWidth / 2;

      const pairTotalWidth = barWidth * 2 + barGap;
      const receivedX = slotCenterX - pairTotalWidth / 2;
      const paidX = receivedX + barWidth + barGap;

      const clampedReceived = Math.max(12, Math.min(100, Number(item.received) || 0));
      const clampedPaid = Math.max(10, Math.min(100, Number(item.paid) || 0));

      const receivedHeight = (clampedReceived / 100) * usableHeight;
      const paidHeight = (clampedPaid / 100) * usableHeight;

      const receivedY = baselineY - receivedHeight;
      const paidY = baselineY - paidHeight;

      // Trend curve anchor slightly above the taller bar in each slot
      const trendPoint = {
        x: slotCenterX,
        y: Math.max(18, receivedY - 12),
        isCurrent: Boolean(item.isCurrent),
        item,
      };

      return {
        ...item,
        index,
        slotCenterX,
        receivedX,
        receivedY,
        receivedHeight,
        paidX,
        paidY,
        paidHeight,
        trendPoint,
      };
    });
  }, [items, slotWidth, usableHeight]);

  const trendPathD = useMemo(() => {
    const pts = computedBars.map((b) => b.trendPoint);
    if (pts.length === 0) return "";
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const midX = (p0.x + p1.x) / 2;
      d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [computedBars]);

  const hoveredBar =
    hoveredIndex !== null ? computedBars[hoveredIndex] || null : null;

  return (
    <section
      dir="rtl"
      className="relative lg:col-span-2 rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Row: Title + Subtitle (Right) & Controls (Left) */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-md text-right">
          <h2 className="text-[19px] font-black leading-snug text-[#0f172a]">
            {title}
          </h2>
          <p className="mt-1 text-[12px] font-semibold leading-relaxed text-[#64748b]">
            {subtitle}
          </p>
        </div>

        {/* Legends & Period Switcher */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 text-[11.5px] font-bold text-[#475569]">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#157396]" />
              <span>الفواتير المستلمة</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#475569]" />
              <span>المدفوعات المسددة</span>
            </div>
          </div>

          {/* Monthly / Quarterly Toggle */}
          <div className="flex items-center rounded-[12px] border border-[#e2e8f0] bg-[#f1f5f9] p-1">
            <button
              type="button"
              onClick={() => handleSwitchMode("monthly")}
              className={`rounded-[9px] px-3.5 py-1.5 text-[12px] font-extrabold transition ${
                periodMode === "monthly"
                  ? "bg-white text-[#157396] shadow-2xs"
                  : "text-[#64748b] hover:text-[#1e293b]"
              }`}
            >
              شهري
            </button>

            <button
              type="button"
              onClick={() => handleSwitchMode("quarterly")}
              className={`rounded-[9px] px-3.5 py-1.5 text-[12px] font-extrabold transition ${
                periodMode === "quarterly"
                  ? "bg-white text-[#157396] shadow-2xs"
                  : "text-[#64748b] hover:text-[#1e293b]"
              }`}
            >
              ربع سنوي
            </button>
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredBar && (
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-[11.5px]">
          <span className="font-black text-[#086382]">{hoveredBar.label}</span>
          <div className="flex flex-wrap items-center gap-4 tabular-nums">
            <span className="font-bold text-[#157396]">
              الفواتير المستلمة: {hoveredBar.receivedAmount}
            </span>
            <span className="font-bold text-[#475569]">
              المدفوعات المسددة: {hoveredBar.paidAmount}
            </span>
          </div>
        </div>
      )}

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="h-[225px] w-full min-w-[540px] select-none"
          role="img"
          aria-label={title}
        >
          {/* Dashed Horizontal Grid Lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => {
            const yPos = baselineY - ratio * usableHeight;
            return (
              <line
                key={ratio}
                x1="16"
                y1={yPos}
                x2={svgWidth - 16}
                y2={yPos}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            );
          })}

          {/* Baseline */}
          <line
            x1="16"
            y1={baselineY}
            x2={svgWidth - 16}
            y2={baselineY}
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />

          {/* Bars */}
          {computedBars.map((bar) => {
            const receivedFill = bar.isForecast
              ? "#c9dfea"
              : bar.isCurrent
              ? "#0d6b8e"
              : "#4a92b0";

            const paidFill = bar.isForecast
              ? "#e2e8f0"
              : bar.isCurrent
              ? "#475569"
              : "#94a3b8";

            return (
              <g
                key={bar.id}
                onMouseEnter={() => setHoveredIndex(bar.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-opacity"
              >
                {/* Received Invoice Bar */}
                <path
                  d={`M ${bar.receivedX} ${baselineY} L ${bar.receivedX} ${
                    bar.receivedY + 5
                  } Q ${bar.receivedX} ${bar.receivedY} ${
                    bar.receivedX + 5
                  } ${bar.receivedY} L ${bar.receivedX + barWidth - 5} ${
                    bar.receivedY
                  } Q ${bar.receivedX + barWidth} ${bar.receivedY} ${
                    bar.receivedX + barWidth
                  } ${bar.receivedY + 5} L ${
                    bar.receivedX + barWidth
                  } ${baselineY} Z`}
                  fill={receivedFill}
                />

                {/* Paid Bar */}
                <path
                  d={`M ${bar.paidX} ${baselineY} L ${bar.paidX} ${
                    bar.paidY + 5
                  } Q ${bar.paidX} ${bar.paidY} ${bar.paidX + 5} ${
                    bar.paidY
                  } L ${bar.paidX + barWidth - 5} ${bar.paidY} Q ${
                    bar.paidX + barWidth
                  } ${bar.paidY} ${bar.paidX + barWidth} ${
                    bar.paidY + 5
                  } L ${bar.paidX + barWidth} ${baselineY} Z`}
                  fill={paidFill}
                />
              </g>
            );
          })}

          {/* Gold Trend Line */}
          {trendPathD && (
            <path
              d={trendPathD}
              fill="none"
              stroke="#c98a2e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Highlight Marker on Current Period */}
          {computedBars
            .filter((b) => b.trendPoint.isCurrent)
            .map((b) => (
              <circle
                key={`marker-${b.id}`}
                cx={b.trendPoint.x}
                cy={b.trendPoint.y}
                r="4.5"
                fill="#4ade80"
                stroke="#157396"
                strokeWidth="2"
              />
            ))}
        </svg>
      </div>

      {/* Bottom X-Axis Labels (RTL Order: Right to Left) */}
      <div className="mt-1 grid min-w-[540px] grid-cols-7 items-center text-center">
        {[...items].reverse().map((item) => (
          <div key={item.id} className="flex flex-col items-center px-1">
            <span
              className={`text-[12px] ${
                item.isCurrent
                  ? "border-b-2 border-[#157396] pb-1 font-black text-[#157396]"
                  : item.isForecast
                  ? "font-bold text-[#64748b]"
                  : "font-bold text-[#475569]"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MonthlyTrendChart;