"use client";

import { useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";

const formatDate = (iso) => {
  const [y, m, d] = String(iso).split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

const DateField = ({ label, value, onChange, ariaLabel }) => (
  <label className="relative inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[#D8DFE8] bg-[#EEF2F6] px-3.5 text-sm">
    <span className="text-[#64748B]">{label}</span>
    <span className="text-[#1E293B]" dir="ltr">
      {formatDate(value)}
    </span>
    <FiCalendar className="size-4 shrink-0 text-[#64748B]" />
    <input
      type="date"
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker?.()}
      className="absolute inset-0 size-full cursor-pointer opacity-0"
    />
  </label>
);

const Filter = ({
  year = 2024,
  initialPeriod = "year",
  initialFrom = "2024-01-01",
  initialTo = "2024-09-30",
  typeOptions = [{ value: "all", label: "جميع الدفاتر والقوائم" }],
  onChange,
}) => {
  const [period, setPeriod] = useState(initialPeriod);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [type, setType] = useState(typeOptions[0]?.value ?? "all");

  const periods = [
    { value: "year", label: `هذا العام (${year})` },
    { value: "month", label: "هذا الشهر" },
    { value: "week", label: "هذا الأسبوع" },
  ];

  const emit = (patch) =>
    onChange?.({ period, from, to, type, ...patch });

  const currentType = typeOptions.find((o) => o.value === type);

  return (
    <section
      dir="rtl"
      className="rounded-xl border border-[#E2E8F0] bg-white px-2.5 py-5 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <DateField
            label="من"
            ariaLabel="من تاريخ"
            value={from}
            onChange={(v) => {
              setFrom(v);
              emit({ from: v });
            }}
          />
          <DateField
            label="إلى"
            ariaLabel="إلى تاريخ"
            value={to}
            onChange={(v) => {
              setTo(v);
              emit({ to: v });
            }}
          />
          <div className="relative inline-flex h-9 items-center gap-2 rounded-lg border border-[#D5DCE5] bg-white px-3.5 text-sm text-[#334155]">
            <span className="whitespace-nowrap">
              حسب النوع: {currentType?.label}
            </span>
            <FiChevronDown className="size-4 shrink-0 text-[#64748B]" />
            <select
              aria-label="حسب النوع"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                emit({ type: e.target.value });
              }}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            >
              {typeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {periods.map((p) => {
            const active = period === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => {
                  setPeriod(p.value);
                  emit({ period: p.value });
                }}
                className={`h-[34px] rounded-lg px-4 text-sm font-medium transition ${
                  active
                    ? "bg-primary text-white"
                    : "border border-[#D5DCE5] bg-white text-[#475569] hover:bg-[#F8FAFC]"
                }`}
              >
                {p.label}
              </button>
            );
          })}
          <span className="text-sm font-medium text-[#475569]">
            الفترة المالية
          </span>
        </div>
      </div>
    </section>
  );
};

export default Filter;