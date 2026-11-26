"use client";

import React from "react";
import { FiLock, FiChevronLeft, FiFileText } from "react-icons/fi";
import { LuBadgeCheck } from "react-icons/lu";

const AuditFooter = ({
  complianceText = "مطابق لمعايير هيئة الزكاة والضريبة والجمارك (ZATCA)",
  archivedSummaryText = "إجمالي السجلات المؤرشفة: 1,248 حساباً و48 دفعة محاسبية",
  encryptionText = "سجلات مؤرخة ومحمية بنظام التشفير SHA-256",
  lastSyncText = "آخر تحديث لحظي: اليوم 11:30 ص",
  ctaLabel = "إنشاء تقرير تحليلي مخصص",
  onGenerateCustomReport,
  statusText = "حالة النظام: تشغيل متكامل",
  taxIntegrationText = "الربط الضريبي والفوترة الإلكترونية نشط",
  systemVersionText = "نظام ERP ROOJ المحاسبي © 2026 - الإصدار v4.8",
}) => {
  return (
    <footer
      dir="rtl"
      className="mt-4 space-y-3 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Bar: ZATCA Compliance, Encryption & Live Sync, Custom Report CTA */}
      <div className="rounded-[20px] border border-[#e6ecf2] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.02)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Right Cluster: ZATCA Pill + Archived Summary */}
          <div className="flex flex-col items-start gap-2 text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ccebd9] bg-[#eaf7f0] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#047857]">
              <LuBadgeCheck className="h-4 w-4 shrink-0 text-[#059669]" />
              <span dir="auto">{complianceText}</span>
            </span>

            <p
              className="text-[11.5px] font-bold text-[#64748b] tabular-nums"
              dir="auto"
            >
              {archivedSummaryText}
            </p>
          </div>

          {/* Center Cluster: SHA-256 Pill + Live Sync Timestamp */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f4f7fa] px-3.5 py-1.5 text-[11px] font-bold text-[#475569]">
              <FiLock className="h-3.5 w-3.5 shrink-0 text-[#475569]" />
              <span dir="auto">{encryptionText}</span>
            </span>

            <span
              className="text-[11.5px] font-bold leading-[1.35] text-[#475569] tabular-nums"
              dir="auto"
            >
              {lastSyncText}
            </span>
          </div>

          {/* Left Cluster: Primary CTA Button */}
          <button
            type="button"
            onClick={() => onGenerateCustomReport?.()}
            className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-[12px] bg-[#086382] px-4 py-2 text-center text-[12px] font-extrabold leading-[1.25] text-white transition hover:bg-[#064f68] active:scale-[0.99]"
          >
            <FiChevronLeft className="h-4 w-4 shrink-0 opacity-90" />
            <span>
              <span className="block">
                {ctaLabel.split(" ").slice(0, 2).join(" ")}
              </span>
              {ctaLabel.split(" ").length > 2 && (
                <span className="block">
                  {ctaLabel.split(" ").slice(2).join(" ")}
                </span>
              )}
            </span>
            <FiFileText className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Bottom Bar: System Status, Tax Integration & System Version */}
      <div className="rounded-[14px] border border-[#e6ecf2] bg-white px-5 py-3.5 text-[12px] font-bold text-[#475569]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Right: Green Dot + Status + Divider + Tax & E-Invoicing */}
       

          {/* Left: System Copyright & Version */}
          <div
            dir="auto"
            className="text-left font-bold text-[#334155] tabular-nums"
          >
            {systemVersionText}
          </div>
             <div className="flex flex-wrap items-center gap-3 text-right">
            <span className="inline-flex items-center gap-2 text-[#334155]">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#048a5e]"
              />
              <span>{statusText}</span>
            </span>

            <span aria-hidden="true" className="text-[#cbd5e1]">
              |
            </span>

            <span className="text-[#475569]">{taxIntegrationText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuditFooter;