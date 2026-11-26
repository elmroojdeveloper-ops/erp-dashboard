"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  FiLock,
  FiClipboard,
  FiEdit3,
  FiXCircle,
  FiPieChart,
} from "react-icons/fi";
import { LuFileSpreadsheet, LuBrainCircuit } from "react-icons/lu";

const defaultCategories = [
  {
    id: "general_accounts",
    name: "الحسابات العامة (نقدية، بنوك، رأس...",
    amount: "49,225,000",
    currency: "ر.س",
    percentageText: "54.2% من القيمة الإجمالية",
    value: 54.2,
    color: "#045a78",
  },
  {
    id: "fixed_assets",
    name: "الأصول الثابتة ومجمعات الإهلاك",
    amount: "32,500,000",
    currency: "ر.س",
    percentageText: "22.8% من القيمة الإجمالية",
    value: 22.8,
    color: "#2b7a9b",
  },
  {
    id: "inventory_costs",
    name: "المنتجات والمخزون والتكاليف",
    amount: "13,534,650",
    currency: "ر.س",
    percentageText: "12.1% من القيمة الإجمالية",
    value: 12.1,
    color: "#5b6170",
  },
  {
    id: "customers_receivables",
    name: "العملاء والذمم المدينة التجارية",
    amount: "12,450,000",
    currency: "ر.س",
    percentageText: "8.4% من القيمة الإجمالية",
    value: 8.4,
    color: "#0b7a4b",
  },
  {
    id: "suppliers_payables",
    name: "الموردون والذمم الدائنة",
    amount: "6,420,800",
    currency: "ر.س",
    percentageText: "2.5% من القيمة الإجمالية",
    value: 2.5,
    color: "#767c8a",
  },
];

const defaultWorkflowStages = [
  {
    id: "approved_closed",
    label: "معتمدة ومقفولة نهائياً",
    countText: "38 دفعة (79.2%)",
    percent: 79.2,
    barColor: "#067647",
    textColor: "text-[#067647]",
    icon: "lock",
  },
  {
    id: "pending_manager",
    label: "بانتظار اعتماد المدير المالي",
    countText: "5 دفعات (10.4%)",
    percent: 10.4,
    barColor: "#045a78",
    textColor: "text-[#045a78]",
    icon: "clipboard",
  },
  {
    id: "draft_review",
    label: "مسودات قيد الإعداد والمراجعة",
    countText: "3 دفعات (6.2%)",
    percent: 6.2,
    barColor: "#525866",
    textColor: "text-[#525866]",
    icon: "edit",
  },
  {
    id: "rejected_returned",
    label: "مرفوضة / معادة للتصحيح",
    countText: "2 دفعتان (4.2%)",
    percent: 4.2,
    barColor: "#b42318",
    textColor: "text-[#b42318]",
    icon: "x",
  },
];

const renderStageIcon = (type, colorClass) => {
  switch (type) {
    case "lock":
      return <FiLock className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} />;
    case "clipboard":
      return <FiClipboard className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} />;
    case "edit":
      return <FiEdit3 className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} />;
    case "x":
      return <FiXCircle className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} />;
    default:
      return <FiLock className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} />;
  }
};

const DonutTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div
      dir="rtl"
      className="rounded-[10px] border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-[#1e293b]"
    >
      <div className="font-black text-[#0f172a]">{item.name}</div>
      <div className="mt-0.5 font-bold text-[#086382]" dir="auto">
        {item.amount} {item.currency} ({item.value}%)
      </div>
    </div>
  );
};

const DistributionAndWorkflow = ({
  categories = defaultCategories,
  fiscalYearLabel = "السنة المالية 2026 م",
  centerTopText = "إجمالي 2026",
  centerMainValue = "54.22 م",
  centerSubText = "100% مكتمل",
  stages = defaultWorkflowStages,
  roundsSummaryTitle = "متوسط جولات المراجعة لكل دفعة: 1.1 جولة",
  roundsSummaryNote = "مؤشر جودة إدخال مرتفع يقلل ارتداد القيود إلى الحد الأدنى المؤسسي.",
  onSelectCategory,
}) => {
  return (
    <section
      dir="rtl"
      className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.52fr_1fr] text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Right / Main Card: توزيع الأرصدة الافتتاحية حسب الفئة المحاسبية */}
      <article className="rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        {/* Card Header: Title on Right, Fiscal Year Badge on Left */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-right">
            <div className="flex items-center justify-start gap-2">
              <FiPieChart className="h-4 w-4 shrink-0 text-[#086382]" />
              <h2 className="text-[17px] font-black leading-[1.3] text-[#0f172a]">
                توزيع الأرصدة الافتتاحية حسب الفئة المحاسبية
              </h2>
            </div>
            <p className="mt-1 text-[11.5px] font-medium text-[#64748b]">
              التقسيم النسبي والمبالغ المقيدة لكل فئة من فئات الأرصدة الخمس
            </p>
          </div>

          <span className="rounded-[8px] bg-[#eaf4f9] px-3 py-1 text-[11px] font-extrabold text-[#086382]">
            {fiscalYearLabel}
          </span>
        </div>

        {/* Body: Donut Chart on Right + Category List on Left */}
        <div className="mt-4 grid grid-cols-1 items-center gap-5 lg:grid-cols-[0.95fr_1.35fr]">
          {/* Donut Chart (Right in RTL) */}
          <div className="relative flex h-[240px] w-full items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={64}
                  outerRadius={92}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {categories.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Donut Readout */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
              <span className="text-[10.5px] font-bold text-[#64748b]">
                {centerTopText}
              </span>
              <span
                className="mt-0.5 text-[18px] font-black text-[#0f172a] tabular-nums"
                dir="auto"
              >
                {centerMainValue}
              </span>
              <span className="mt-0.5 text-[10.5px] font-extrabold text-[#047857]">
                {centerSubText}
              </span>
            </div>
          </div>

          {/* Category Breakdown Rows (Left in RTL) */}
          <div className="space-y-2.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory?.(cat)}
                className="relative flex cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-[#eef2f6] bg-[#fafcfd] px-3.5 py-2.5 transition hover:border-[#cbd5e1]"
              >
                {/* Right: Indicator Dot + Title & Percentage */}
                <div className="flex min-w-0 flex-1 items-center gap-2.5 text-right">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12px] font-extrabold text-[#0f172a]">
                      {cat.name}
                    </div>
                    <div className="mt-0.5 text-[10.5px] font-semibold text-[#64748b]">
                      {cat.percentageText}
                    </div>
                  </div>
                </div>

                {/* Left: Amount + Currency */}
                <div className="shrink-0 text-left leading-tight">
                  <div
                    className="text-[13.5px] font-black text-[#0f172a] tabular-nums"
                    dir="auto"
                  >
                    {cat.amount}
                  </div>
                  <div className="text-[10.5px] font-bold text-[#64748b]">
                    {cat.currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Left / Secondary Card: تحليل دورة الاعتماد وتدفق الدفعات */}
      <article className="flex flex-col justify-between rounded-[22px] border border-[#e6ecf2] bg-white p-5">
        <div>
          <div className="text-right">
            <div className="flex items-center justify-start gap-2">
              <LuFileSpreadsheet className="h-4 w-4 shrink-0 text-[#086382]" />
              <h2 className="text-[17px] font-black leading-[1.3] text-[#0f172a]">
                تحليل دورة الاعتماد وتدفق الدفعات
              </h2>
            </div>
            <p className="mt-1 text-[11.5px] font-medium text-[#64748b]">
              توزيع الدفعات الـ 48 المسجلة حسب المسار وحالة التدقيق الرقابي
            </p>
          </div>

          <div className="mt-4 space-y-3.5">
            {stages.map((stage) => (
              <div key={stage.id}>
                <div className="flex items-center justify-between gap-2 text-[11.5px]">
                  <div className="flex items-center gap-1.5 font-extrabold">
                    {renderStageIcon(stage.icon, stage.textColor)}
                    <span className={stage.textColor}>{stage.label}</span>
                  </div>

                  <span
                    className="font-extrabold text-[#0f172a] tabular-nums"
                    dir="auto"
                  >
                    {stage.countText}
                  </span>
                </div>

                <div className="mt-1.5 h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${stage.percent}%`,
                      backgroundColor: stage.barColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Rounds Summary Box */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-[14px] border border-[#e6ecf2] bg-[#f4f8fb] px-3.5 py-3">
          <div className="min-w-0 flex-1 text-right">
            <div className="text-[11.5px] font-black text-[#0f172a]">
              {roundsSummaryTitle}
            </div>
            <p className="mt-0.5 text-[10.5px] font-medium leading-[1.45] text-[#64748b]">
              {roundsSummaryNote}
            </p>
          </div>

          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#e2eff6] text-[#086382]">
            <LuBrainCircuit className="h-4 w-4" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default DistributionAndWorkflow;