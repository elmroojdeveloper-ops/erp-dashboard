"use client";

import React, { useMemo, useState } from "react";
import { FiPieChart } from "react-icons/fi";

const defaultCategoriesData = [
  {
    id: "raw-materials",
    label: "مواد خام ومستلزمات إنتاج",
    amount: "6,237,000",
    unit: "ر.س",
    percentage: 42,
    color: "#157396",
  },
  {
    id: "packaging",
    label: "توريد أوعية وتغليف",
    amount: "3,564,000",
    unit: "ر.س",
    percentage: 24,
    color: "#065a78",
  },
  {
    id: "logistics",
    label: "نقل وإمداد ولوجستيات",
    amount: "2,376,000",
    unit: "ر.س",
    percentage: 16,
    color: "#c98a2e",
  },
  {
    id: "maintenance",
    label: "خدمات صيانة وتشغيل",
    amount: "1,633,500",
    unit: "ر.س",
    percentage: 11,
    color: "#4b5262",
  },
  {
    id: "consulting",
    label: "مقاولات وخدمات استشارية",
    amount: "1,039,730",
    unit: "ر.س",
    percentage: 7,
    color: "#6b7280",
  },
];

const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const createArcPath = (cx, cy, radius, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const CategoryDistributionChart = ({
  title = "توزيع المستحقات حسب التصنيف",
  subtitle = "الوزن النسبي لمستحقات الموردين لكل قطاع تشغيلي",
  centerValue = "14.8M",
  centerSubLabel = "ر.س إجمالي",
  categories = defaultCategoriesData,
  onSelectCategory,
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  const totalPercentage = useMemo(() => {
    const sum = categories.reduce(
      (acc, item) => acc + (Number(item.percentage) || 0),
      0
    );
    return sum > 0 ? sum : 100;
  }, [categories]);

  const segments = useMemo(() => {
    let currentAngle = 0;
    return categories.map((item) => {
      const pct = Number(item.percentage) || 0;
      const sweepAngle = (pct / totalPercentage) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sweepAngle;
      currentAngle = endAngle;

      return {
        ...item,
        startAngle,
        endAngle,
      };
    });
  }, [categories, totalPercentage]);

  const hoveredSegment = useMemo(() => {
    if (!hoveredId) return null;
    return segments.find((s) => s.id === hoveredId) || null;
  }, [hoveredId, segments]);

  const size = 236;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 84;
  const strokeWidth = 34;

  return (
    <section
      dir="rtl"
      className="rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Row */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="text-right">
          <h2 className="text-[20px] font-black leading-snug text-[#0f172a]">
            {title}
          </h2>
          <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
            {subtitle}
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[#475569]">
          <FiPieChart className="h-5 w-5" />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="my-4 flex items-center justify-center">
        <div className="relative flex h-[236px] w-[236px] items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={title}
          >
            {/* Background Track */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {segments.map((seg) => {
              const isHovered = hoveredId === seg.id;
              const d = createArcPath(cx, cy, radius, seg.startAngle, seg.endAngle);

              return (
                <path
                  key={seg.id}
                  d={d}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeLinecap="butt"
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectCategory?.(seg)}
                  className="cursor-pointer transition-all duration-200"
                />
              );
            })}
          </svg>

          {/* Center Summary */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[26px] font-black leading-none text-[#0f172a] tabular-nums">
              {hoveredSegment ? `${hoveredSegment.percentage}%` : centerValue}
            </span>
            <span className="mt-1.5 text-[12px] font-bold text-[#64748b]">
              {hoveredSegment ? hoveredSegment.label : centerSubLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown List */}
      <div className="mt-6 space-y-4">
        {categories.map((item) => {
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectCategory?.(item)}
              className={`flex items-center justify-between gap-3 rounded-[12px] px-2 py-1.5 transition ${
                isHovered ? "bg-[#f8fafc]" : ""
              } ${onSelectCategory ? "cursor-pointer" : ""}`}
            >
              {/* Right Side: Label + Color Dot */}
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2.5">
                <span className="text-right text-[13.5px] font-black leading-snug text-[#1e293b]">
                  {item.label}
                </span>
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              {/* Left Side: Amount, Unit & Percentage */}
              <div className="flex shrink-0 items-baseline gap-1.5 text-left tabular-nums">
                <span className="text-[12px] font-bold text-[#64748b]">
                  ({item.percentage}%)
                </span>
                <span className="text-[14.5px] font-black text-[#0f172a]">
                  {item.amount}
                </span>
                <span className="text-[11.5px] font-bold text-[#475569]">
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryDistributionChart;