"use client";

import { FiShield } from "react-icons/fi";

const CostCenter = ({ data }) => {
  if (!data) return null;

  const percent = Math.min(100, Math.max(0, Number(data.consumedPercent) || 0));
  const remainingPercent = Math.max(0, 100 - percent);

  return (
    <section className="rounded-[16px] border-2 border-[#E8C87A] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
      {/* رأس البطاقة */}
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#FFF4D6] text-[#C47A12]">
            <FiShield className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="text-[13px] font-bold text-[#1A2332]">
              مركز التكلفة المرتبط ضمن الميزانية
            </h2>
            <p className="mt-1 text-[11px] text-[#64748B]">
              {data.budgetSource || "من ميزانية تكنولوجيا المعلومات"}
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 rounded-full bg-[#E6F4EA] px-2.5 py-1 text-[10px] font-bold text-[#2E7D32]">
          {data.statusBadge || "ميزانية معتمدة"}
        </span>
      </header>

      {/* كود واسم المركز */}
      <div className="mb-4 rounded-[12px] border border-[#E8EEF2] bg-[#F8FAFB] px-3.5 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-[#64748B]">كود واسم مركز التكلفة</p>
            <p className="mt-1 text-[13px] font-bold leading-6 text-[#1B6A9C]">
              {data.code} — {data.name}
            </p>
          </div>
          {data.active !== false ? (
            <span className="inline-flex shrink-0 rounded-full bg-[#E8F1F7] px-2 py-0.5 text-[10px] font-bold text-[#1B6A9C]">
              نشط
            </span>
          ) : null}
        </div>
        {data.allowChange ? (
          <button
            type="button"
            className="mt-3 inline-flex h-8 items-center rounded-[8px] border border-[#1B6A9C] bg-white px-3 text-[11px] font-bold text-[#1B6A9C]"
          >
            تغيير
          </button>
        ) : null}
      </div>

      {/* أرقام الميزانية */}
      <div className="space-y-2.5 text-[12px]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#64748B]">الميزانية السنوية للمركز</span>
          <span className="font-bold text-[#1A2332]">
            {data.annualBudget} {data.currency}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[#64748B]">المصروف والالتزامات</span>
          <span className="font-semibold text-[#475569]">
            {data.consumed} {data.currency}{" "}
            <span className="text-[#94A3B8]">({percent}%)</span>
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-[#E8EEF2]">
          <div
            className="h-full rounded-full bg-[#1B6A9C]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[#F3FBF6] px-3 py-2.5">
          <span className="text-[#64748B]">الرصيد المتاح حالياً</span>
          <span className="inline-flex items-center rounded-full bg-[#E6F4EA] px-2.5 py-1 text-[12px] font-bold text-[#2E7D32]">
            {data.remaining} {data.currency} ({remainingPercent.toFixed(1)}%)
          </span>
        </div>
      </div>
    </section>
  );
};

export default CostCenter;
