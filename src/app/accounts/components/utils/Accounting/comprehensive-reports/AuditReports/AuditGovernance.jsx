"use client";

import React from "react";
import { LuShieldCheck, LuShield } from "react-icons/lu";

const defaultGovernanceCards = [
  {
    id: "partially_unlocked",
    count: "2",
    badgeBg: "bg-[#dff2e8]",
    badgeText: "text-[#047857]",
    title: "طلبات معتمدة بفك إقفال جزئي",
    percent: "50.0%",
    percentColor: "text-[#046847]",
    subtitle: "تمت المعالجة وإعادة القفل",
  },
  {
    id: "under_audit_review",
    count: "1",
    badgeBg: "bg-[#e3eff6]",
    badgeText: "text-[#086382]",
    title: "طلب قيد المراجعة الرقابية",
    percent: "25.0%",
    percentColor: "text-[#086382]",
    subtitle: "رقم المرجع: REQ-2026-08",
  },
  {
    id: "rejected_incomplete",
    count: "1",
    badgeBg: "bg-[#f9e5e6]",
    badgeText: "text-[#b42318]",
    title: "طلب مرفوض لعدم استيفاء المبرر",
    percent: "25.0%",
    percentColor: "text-[#b42318]",
    subtitle: "حماية للقيود المقفلة",
  },
];

const AuditGovernance = ({
  cards = defaultGovernanceCards,
  totalRequestsCount = "4 طلبات",
  totalBatchesText = "(من أصل 48 دفعة)",
  governanceNote = "نسبة طلبات إعادة الفتح تمثل 8.3% فقط من إجمالي الدفعات، مما يعكس دقة واكتمال الإدخال الأولي وجودة الرقابة الداخلية للمؤسسة.",
}) => {
  return (
    <section
      dir="rtl"
      className="mt-4 rounded-[22px] border border-[#e6ecf2] bg-white p-5 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Right Title + Subtitle + Shield Icon */}
        <div className="text-right">
          <div className="flex items-center justify-start gap-2">
            <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] bg-[#eaf3f8] text-[#086382]">
              <LuShieldCheck className="h-4 w-4" />
            </div>
            <h2 className="text-[17px] font-black leading-[1.3] text-[#0f172a]">
              تحليل طلبات إعادة الفتح وتعديل الأرصدة (Audit &amp; Governance
              Indicator)
            </h2>
          </div>
          <p className="mt-1 text-[11.5px] font-medium text-[#64748b]">
            مؤشر رقابي يقيس مدى استقرار الأرصدة المعتمدة وطلبات فك الإقفال
            الاستثنائية لضمان سلامة التدقيق
          </p>
        </div>

        {/* Left Pill: مجموع الطلبات التاريخية */}
        <div className="inline-flex items-center gap-1 rounded-[10px] border border-[#e2e8f0] bg-[#f4f7fa] px-3 py-1.5 text-[11.5px] font-bold text-[#475569]">
          <span>مجموع الطلبات التاريخية:</span>
          <span className="font-black text-[#086382]">{totalRequestsCount}</span>
          <span className="text-[11px] font-semibold text-[#64748b]">
            {totalBatchesText}
          </span>
        </div>
      </div>

      {/* 3 Status Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col justify-between rounded-[16px] border border-[#e8eef3] bg-[#f7fafc] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[12.5px] font-extrabold text-[#0f172a]">
                {card.title}
              </h3>

              <span
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11.5px] font-black ${card.badgeBg} ${card.badgeText}`}
              >
                {card.count}
              </span>
            </div>

            <div className="mt-3.5 flex items-baseline justify-between gap-2">
              <span
                className={`text-[21px] font-black leading-none tracking-tight tabular-nums ${card.percentColor}`}
                dir="auto"
              >
                {card.percent}
              </span>

              <span className="text-[11px] font-semibold text-[#64748b]">
                {card.subtitle}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Governance & Compliance Note */}
      <div className="mt-3.5 flex items-center justify-start gap-2 rounded-[12px] border border-[#e6ecf2] bg-[#f4f8fb] px-4 py-2.5 text-right text-[11px]">
        <LuShield className="h-4 w-4 shrink-0 text-[#047857]" />
        <div className="leading-[1.5] text-[#475569]">
          <strong className="font-black text-[#0f172a]">
            ملاحظة الحوكمة والامتثال:
          </strong>{" "}
          <span>{governanceNote}</span>
        </div>
      </div>
    </section>
  );
};

export default AuditGovernance;