"use client";

import React from "react";
import { LuGitFork } from "react-icons/lu";

const defaultLevels = [
  {
    id: "l1",
    levelLabel: "المستوى الأول (L1)",
    countLabel: "5 حسابات",
    title: "الأصول والخصوم العامة",
    subtitle: "التصنيفات المحاسبية الكبرى",
    barColor: "#086382",
    barWidth: "100%",
    barAlign: "right",
  },
  {
    id: "l2",
    levelLabel: "المستوى الثاني (L2)",
    countLabel: "28 حسابًا",
    title: "الأصول المتداولة والثابتة",
    subtitle: "المجموعات الرئيسية الرقابية",
    barColor: "#086382",
    barWidth: "88%",
    barAlign: "left",
  },
  {
    id: "l3",
    levelLabel: "المستوى الثالث (L3)",
    countLabel: "151 حسابًا",
    title: "البنوك والعملاء والعهد",
    subtitle: "الحسابات الوسيطة التجميعية",
    barColor: "#086382",
    barWidth: "72%",
    barAlign: "left",
  },
  {
    id: "l4",
    levelLabel: "المستوى الرابع (L4)",
    countLabel: "1,236 حسابًا",
    title: "حسابات العمليات المباشرة",
    subtitle: "تقبل التسجيل والقيود اليومية",
    barColor: "#046847",
    barWidth: "86%",
    barAlign: "left",
  },
];

const Distribute = ({
  title = "توزيع أرصدة دليل الحسابات حسب المستوى الشجري",
  description = "4 مستويات تفصيلية معتمدة وفق المعايير المحاسبية",
  levels = defaultLevels,
  onSelectLevel,
}) => {
  return (
    <section
      dir="rtl"
      className="rounded-[24px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Row: Title & Icon on Right, Subtitle on Left */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <LuGitFork className="h-[18px] w-[18px] shrink-0 text-[#086382]" />
          <h2 className="text-[18px] font-black leading-[1.35] text-[#0f172a]">
            {title}
          </h2>
        </div>

        <p className="text-[12.5px] font-medium text-[#64748b]">
          {description}
        </p>
      </div>

      {/* 4 Level Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {levels.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectLevel?.(item)}
            className="flex flex-col justify-between overflow-hidden rounded-[16px] border border-[#e9eff5] bg-[#f7fafc] pt-3.5 px-4 pb-0 text-right transition hover:border-[#cbd5e1]"
          >
            <div>
              {/* Top Row: Level Label on Right, Count Badge on Left */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12.5px] font-extrabold text-[#086382]">
                  {item.levelLabel}
                </span>

                <span className="rounded-[8px] bg-[#e6ecf2] px-2.5 py-1 text-[11.5px] font-bold text-[#475569]">
                  {item.countLabel}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-2.5 text-[15.5px] font-black leading-[1.35] text-[#0f172a]">
                {item.title}
              </h3>

              <p className="mt-1 text-[12px] font-medium leading-[1.45] text-[#64748b]">
                {item.subtitle}
              </p>
            </div>

            {/* Bottom Progress Strip */}
            <div className="mt-4 flex h-[6px] w-full overflow-hidden rounded-t-full bg-[#e2e8f0]">
              {item.barAlign === "left" && (
                <div
                  className="h-full"
                  style={{ width: `${100 - parseFloat(item.barWidth)}%` }}
                />
              )}
              <div
                className="h-full rounded-full"
                style={{
                  width: item.barWidth,
                  backgroundColor: item.barColor,
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Distribute;
