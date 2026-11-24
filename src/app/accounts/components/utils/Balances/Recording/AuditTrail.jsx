"use client";

import React from "react";
import { FiDownload, FiLock } from "react-icons/fi";

const DEFAULT_LOGS = [
  {
    id: "1",
    timeLabel: "اليوم 14:32",
    title: "إرسال دفعة 2026 للاعتماد النهائي",
    description:
      "أرسلت سارة العتيبي (محاسب عام) الدفعة رقم JV-2026-OPEN بمبلغ إجمالي 4,850,230.00 ر.س للاعتماد.",
    dotColor: "bg-[#F59E0B]",
    titleClass: "text-[#1E293B]",
  },
  {
    id: "2",
    timeLabel: "أمس 16:20",
    title: "رفض دفعة تسوية الفروع",
    description:
      "رفض أحمد المحاسب (مدير مالي) الدفعة REJ-2026-ERR لوجود فارق غير متوازن 350,000.00 ر.س.",
    dotColor: "bg-[#DC2626]",
    titleClass: "text-[#DC2626]",
  },
  {
    id: "3",
    timeLabel: "02 فبراير 2026 - 09:40",
    title: "تصدير ميزان المراجعة الافتتاحي",
    description:
      "تم تصدير نسخة مطابقة لمسودة ميزان المراجعة الافتتاحي إلى الإدارات المعنية.",
    dotColor: "bg-[#059669]",
    titleClass: "text-[#1E293B]",
  },
];

const AuditTrail = ({
  logs = DEFAULT_LOGS,
  hashLabel = "HASH: SHA-256 f4210a2",
  onExportAudit,
}) => {
  return (
    <section
      dir="rtl"
      className="flex h-full flex-col justify-between rounded-[12px] border border-[#E6ECEF] bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-5 items-center justify-center rounded-[5px] bg-[#EBF5FA] text-[11px] font-bold text-[#237B9F]">
              ↺
            </span>
            <h2 className="text-[14px] font-bold text-[#1E293B]">
              آخر الحركات الإجرائية وسجل التدقيق (Audit Trail)
            </h2>
          </div>

          <button
            type="button"
            onClick={onExportAudit}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-[10.5px] font-semibold text-[#237B9F] transition hover:underline"
          >
            <FiDownload className="size-3" />
            <span>تحميل سجل التدقيق الكامل (PDF)</span>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {logs.map((log, index) => (
            <div key={log.id} className="flex items-start gap-3">
              <div className="w-[105px] shrink-0 pt-0.5 text-[10.5px] font-medium text-[#94A3B8]">
                {log.timeLabel}
              </div>

              <div className="relative flex flex-col items-center pt-1.5">
                <span className={`size-2.5 rounded-full ${log.dotColor}`} />
                {index < logs.length - 1 && (
                  <span className="mt-1 h-10 w-px bg-[#E2E8F0]" />
                )}
              </div>

              <div className="flex-1 pb-1">
                <h3
                  className={`text-[12px] font-bold ${log.titleClass || "text-[#1E293B]"}`}
                >
                  {log.title}
                </h3>
                <p className="mt-0.5 text-[11px] leading-[1.55] text-[#64748B]">
                  {log.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#F1F5F9] pt-2.5 text-[10.5px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <FiLock className="size-3 text-[#94A3B8]" />
          <span>سجل محمي غير قابل للتعديل أو الحذف (مقيد بميزة WORM)</span>
        </div>
        <span className="font-mono text-[10px] text-[#94A3B8]" dir="ltr">
          {hashLabel}
        </span>
      </div>
    </section>
  );
};

export default AuditTrail;
