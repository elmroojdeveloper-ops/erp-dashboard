"use client";

import React from "react";
import { FiCalendar, FiFileText, FiLock } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";

const cx = (...c) => c.filter(Boolean).join(" ");

const CARD = "rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]";

const STEPS = [
  { id: 1, label: "تحديد الفترة" },
  { id: 2, label: "دليل الحسابات" },
  { id: 3, label: "إدخال الأرصدة" },
  { id: 4, label: "المطابقة والاعتماد" },
];

const DEFAULT_PILLS = [
  {
    id: "draft",
    grow: 319,
    tone: "grey",
    icon: FiFileText,
    label: "مسودة القيد:",
    value: "JV-2026-OPEN",
  },
  {
    id: "date",
    grow: 363,
    tone: "blue",
    icon: FiCalendar,
    label: "تاريخ القيد الافتتاحي:",
    value: "01/01/2026 م",
  },
  {
    id: "year",
    grow: 326,
    tone: "blue",
    icon: FiLock,
    label: "السنة المالية المستهدفة:",
    value: "2026 م",
  },
];

const InfoPill = ({ grow, tone, icon: Icon, label, value }) => (
  <div
    style={{ flex: `${grow} 1 0%` }}
    className={cx(
      "flex h-8 min-w-0 items-center gap-1.5 rounded-lg px-[14px]",
      tone === "grey"
        ? "bg-[#e8e8ec] text-[#4b4b4b]"
        : "bg-[#e6f0f7] text-primary"
    )}
  >
    <Icon className="size-[14px] shrink-0" />
    <span className="text-[11px]">{label}</span>
    <span
      className={cx(
        "text-[13px] font-bold",
        tone === "grey" && "text-[#3f3f46]"
      )}
    >
      {value}
    </span>
  </div>
);

const Stepper = ({ currentStep }) => (
  <div className="mt-8 flex items-start">
    {STEPS.map((step, index) => {
      const active = step.id === currentStep;
      const done = step.id < currentStep;
      return (
        <React.Fragment key={step.id}>
          <div className="flex w-[84px] shrink-0 flex-col items-center gap-[5px] text-center sm:w-[116px]">
            <div
              className={cx(
                "flex size-8 items-center justify-center rounded-full text-[12px] font-bold",
                active
                  ? "bg-primary text-white"
                  : done
                    ? "bg-primary/15 text-primary"
                    : "bg-[#e8eff4] text-[#5b6770]"
              )}
            >
              {step.id}
            </div>
            <span
              className={cx(
                "text-[11px] leading-[15px]",
                active && "font-bold text-primary",
                done && !active && "font-semibold text-[#2b2b2b]",
                !active && !done && "text-[#6b7280]"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div className="mt-[10px] flex flex-1 justify-center" aria-hidden>
              <div
                className={cx(
                  "h-[2px] w-[40%]",
                  done ? "bg-primary" : "bg-[#dde5ea]"
                )}
              />
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const TopHeader = ({
  currentStep = 4,
  pills = DEFAULT_PILLS,
  statusLabel = "جاهز للاعتماد النهائي",
  complianceLabel = "مطابق لمعايير ZATCA",
}) => {
  return (
    <div dir="rtl" className="w-full">
      {/* Status badges */}
      <div className="mb-4 mt-2 flex justify-end gap-2">
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-[#dcf2e5] px-[14px] text-[11px] font-medium text-[#0e6b40]">
          <span className="size-1.5 rounded-full bg-[#0e6b40]" />
          {statusLabel}
        </span>
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-[#d9dde1] bg-[#eceef0] px-[14px] text-[11px] font-medium text-[#4b4b4b]">
          <MdOutlineVerifiedUser className="size-3 shrink-0" />
          {complianceLabel}
        </span>
      </div>

      {/* Period summary + stepper */}
      <div className={cx(CARD, "p-6")}>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {pills.map((pill) => (
            <InfoPill key={pill.id} {...pill} />
          ))}
        </div>
        <Stepper currentStep={currentStep} />
      </div>
    </div>
  );
};

export default TopHeader;