"use client";

import React, { useState } from "react";
import { FiArrowDown, FiArrowUp, FiCheck } from "react-icons/fi";
import { MdOutlineBalance, MdOutlineVerified } from "react-icons/md";

const cx = (...c) => c.filter(Boolean).join(" ");

const CARD = "rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]";

const MODES = [
  { id: "balanced", label: "متوازنة (الحالية)" },
  { id: "unbalanced", label: "غير متوازنة (تجربة)" },
];

const TotalCard = ({ label, icon: Icon, iconClass, value, note }) => (
  <div className="flex h-[140px] flex-col rounded-xl bg-[#edf3f9] px-4 pb-[17px] pt-4">
    <div className="flex items-center justify-between">
      <span className="text-[13px] font-medium text-[#2b2b2b]">{label}</span>
      <span
        className={cx(
          "flex size-7 items-center justify-center rounded-md",
          iconClass
        )}
      >
        <Icon className="size-4" />
      </span>
    </div>

    <div className="mt-5 flex items-baseline justify-between">
      <span className="pr-14 text-[20px] font-bold leading-7 text-[#2b2b2b]">
        {value}
      </span>
      <span className="text-[11px] text-[#6b7280]">ر.س</span>
    </div>

    <p className="mt-auto text-[11px] leading-4 text-[#6b7280]">{note}</p>
  </div>
);

const Cards = ({
  debitTotal = "54,225,000.00",
  creditTotal = "54,225,000.00",
  difference = "0.00",
  hash = "HASH: #8A4F-2026-VAL",
  onModeChange,
}) => {
  const [mode, setMode] = useState("balanced");

  const handleMode = (id) => {
    setMode(id);
    onModeChange?.(id);
  };

  return (
    <div dir="rtl" className={cx(CARD, "w-full px-6 pb-6 pt-7")}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#dff1e8] text-[#0b6b45]">
            <MdOutlineBalance className="size-[22px]" />
          </span>
          <div className="text-right">
            <h2 className="text-[20px] font-bold leading-[22px] text-[#2b2b2b]">
              فحص التوازن الحسابي العام
            </h2>
            <p className="mt-[3px] text-[11px] leading-4 text-[#4b4b4b]">
              المطابقة المزدوجة بين مجموع الأصول والخصوم وحقوق الملكية
            </p>
          </div>
        </div>

        <div className="flex h-[29px] items-center gap-[9px] rounded-lg bg-[#e8f0f6] pl-0.5 pr-3">
          <span className="text-[11px] text-[#4b4b4b]">محاكاة الفحص:</span>
          <div className="flex items-center gap-[3px]">
            {MODES.map((m) => {
              const active = m.id === mode;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleMode(m.id)}
                  className={cx(
                    "h-[23px] rounded-md px-[11px] text-[11px]",
                    active
                      ? "bg-white font-bold text-[#0b6b45]"
                      : "font-medium text-[#6b7280]"
                  )}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TotalCard
          label="إجمالي الأرصدة المدينة"
          icon={FiArrowDown}
          iconClass="bg-[#d9e4ee] text-[#3b6a91]"
          value={debitTotal}
          note="تشمل الصناديق، البنوك، العملاء والأصول"
        />
        <TotalCard
          label="إجمالي الأرصدة الدائنة"
          icon={FiArrowUp}
          iconClass="bg-[#dfe3e8] text-[#5b6770]"
          value={creditTotal}
          note="تشمل الموردين، مخصصات، رأس المال"
        />

        <div className="flex h-[140px] flex-col rounded-xl bg-[#dff0e6] px-4 pb-[15px] pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#0b6b45]">
              الفارق المحاسبي (التوازن)
            </span>
            <span className="flex size-7 items-center justify-center rounded-md bg-[#0b6b45] text-white">
              <FiCheck className="size-4" />
            </span>
          </div>

          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="pr-14 text-[20px] font-bold leading-7 text-[#0b6b45]">
              {difference}
            </span>
            <span className="text-[11px] text-[#4b6b5a]">ر.س</span>
          </div>

          <p className="mt-[5px] max-w-[250px] text-[11px] leading-[19px] text-[#0b6b45]">
            صفر فارق - المعادلة متحققة (الأصول = الخصوم + حقوق الملكية)
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="mt-6 flex h-[68px] items-center justify-between gap-4 rounded-lg bg-[#e8f0f6] px-4">
        <div className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0b6b45] text-white">
            <MdOutlineVerified className="size-[18px]" />
          </span>
          <div className="text-right">
            <p className="text-[13px] font-bold leading-5 text-[#2b2b2b]">
              الأرصدة متوازنة تماما وجاهزة لإنشاء القيد الافتتاحي
            </p>
            <p className="text-[11px] leading-4 text-[#4b4b4b]">
              تم فحص التوافق المحاسبي مع سجل القيود والمعايير الدولية المعتمدة
              من قبل هيئة الزكاة والضريبة والجمارك
            </p>
          </div>
        </div>

        <span
          dir="ltr"
          className="inline-flex h-6 shrink-0 items-center rounded-md bg-[#dfe3e8] px-2.5 font-mono text-[10px] text-[#4b5563]"
        >
          {hash}
        </span>
      </div>
    </div>
  );
};

export default Cards;