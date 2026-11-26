"use client";

import React from "react";
import { FiShield, FiCheckCircle, FiCheck } from "react-icons/fi";
import { LuBadgeCheck, LuFileCheck2, LuGavel } from "react-icons/lu";

const Quality = ({
  headerTitle = "مؤشر الجودة والحوكمة",
  dualApprovalLabel = "نسبة الاعتماد المزدوج والرقابة",
  dualApprovalRate = "98.4%",
  protectionLevelText = "مستوى حماية تدقيقي: عالي جداً",
  gapsLabel = "فجوات مكتشفة ومعالجة",
  gapsValue = "248 فجوة مسوّاة",
  auditYearsLabel = "سنوات المراجعة والتدقيق",
  auditYearsValue = "3 سنوات (2022-2024)",
  complianceStatement = "متوافق بالكامل مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA) ومعايير التدقيق الدولية (ISA).",
}) => {
  return (
    <section
      dir="rtl"
      className="mt-4 rounded-[22px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Card Header: Title on Right + Verified Badge Icon on Left */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14.5px] font-black text-[#475569]">
          {headerTitle}
        </h2>
        <LuBadgeCheck className="h-[18px] w-[18px] shrink-0 text-[#086382]" />
      </div>

      {/* Main Highlight Box: Dual Approval & Control */}
      <div className="mt-4 rounded-[16px] border border-[#eef2f6] bg-[#f4f7fa] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Right Side: Label, Large Rate & Protection Status */}
          <div className="min-w-0 flex-1 text-right">
            <div className="text-[12px] font-bold text-[#475569]">
              {dualApprovalLabel}
            </div>

            <div
              className="mt-1.5 text-[34px] font-black leading-[1.05] tracking-tight text-[#086382] tabular-nums"
              dir="auto"
            >
              {dualApprovalRate}
            </div>

            <div className="mt-2.5 text-[12px] font-extrabold text-[#047857]">
              {protectionLevelText}
            </div>
          </div>

          {/* Left Side: Circular Gauge with Shield Icon */}
          <div className="relative flex h-[74px] w-[74px] shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 74 74">
              <circle
                cx="37"
                cy="37"
                r="30"
                fill="none"
                stroke="#dbe6ee"
                strokeWidth="7"
              />
              <circle
                cx="37"
                cy="37"
                r="30"
                fill="none"
                stroke="#086382"
                strokeWidth="7"
                strokeDasharray="188.5"
                strokeDashoffset="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#086382]">
              <FiShield className="h-5 w-5 fill-[#086382] text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Metrics Rows */}
      <div className="mt-4 divide-y divide-[#f1f5f9]">
        {/* Row 1: Discovered & Resolved Gaps */}
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="flex items-center gap-2.5 text-right">
            <span className="max-w-[130px] text-[13px] font-extrabold leading-[1.35] text-[#1e293b]">
              {gapsLabel}
            </span>
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.75px] border-[#059669] text-[#059669]">
              <FiCheck className="h-3.5 w-3.5 stroke-[2.5]" />
            </span>
          </div>

          <div
            className="max-w-[135px] text-left text-[14.5px] font-black leading-[1.3] text-[#0f172a] tabular-nums"
            dir="auto"
          >
            {gapsValue}
          </div>
        </div>

        {/* Row 2: Audit & Review Years */}
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="flex items-center gap-2.5 text-right">
            <span className="max-w-[130px] text-[13px] font-extrabold leading-[1.35] text-[#1e293b]">
              {auditYearsLabel}
            </span>
            <LuFileCheck2 className="h-[19px] w-[19px] shrink-0 text-[#475569]" />
          </div>

          <div
            className="max-w-[140px] text-left text-[14.5px] font-black leading-[1.3] text-[#0f172a] tabular-nums"
            dir="auto"
          >
            {auditYearsValue}
          </div>
        </div>
      </div>

      {/* Bottom Regulatory Compliance Banner */}
      <div className="mt-2 rounded-[14px] border border-[#eef2f6] bg-[#f4f7fa] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 flex-1 text-right text-[12px] font-extrabold leading-[1.55] text-[#1e293b]">
            {complianceStatement}
          </p>

          <LuGavel className="h-[19px] w-[19px] shrink-0 text-[#086382]" />
        </div>
      </div>
    </section>
  );
};

export default Quality;