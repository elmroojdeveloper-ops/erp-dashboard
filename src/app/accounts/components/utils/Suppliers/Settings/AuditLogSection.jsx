"use client";

import React, { useState } from "react";
import { LuCirclePlus, LuHistory, LuShieldCheck } from "react-icons/lu";

const initialAuditLogs = [
  {
    id: "log-1",
    type: "policy",
    actor: "أحمد المحاسب",
    actionText:
      "بتفعيل سياسة (حظر إصدار فواتير شراء للموردين غير مكتملـي البيانات الضريبية)",
    timestamp: "اليوم، 10:14 ص",
  },
  {
    id: "log-2",
    type: "field",
    actor: "سارة إبراهيم (مدير المشتريات)",
    actionText: "بإضافة الحقل المخصص (شهادة الآيبان المعتمدة)",
    timestamp: "أمس، 03:45 م",
  },
];

const extraSampleLogs = [
  {
    id: "log-3",
    type: "policy",
    actor: "المدير المالي (CFO)",
    actionText:
      "بتحديث حد أقصى للرصيد الافتتاحي بدون موافقة إلى 50,000 ر.س",
    timestamp: "أمس، 11:20 ص",
  },
  {
    id: "log-4",
    type: "field",
    actor: "أحمد المحاسب",
    actionText: "بتعديل الحقل المخصص (رقم السجل التجاري الفرعي)",
    timestamp: "24 نوفمبر، 02:10 م",
  },
];

const AuditLogSection = ({
  logs = initialAuditLogs,
  totalCount = 38,
  onViewAll,
}) => {
  const [expanded, setExpanded] = useState(false);

  const displayedLogs = expanded ? [...logs, ...extraSampleLogs] : logs;

  const handleToggleFullLog = () => {
    setExpanded((prev) => !prev);
    onViewAll?.(!expanded);
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b] shadow-2xs"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* الرأس العلوي: العنوان والوصف على اليمين + رابط عرض السجل الكامل على اليسار */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#edf2f7] text-[#475569]">
            <LuHistory className="size-5" />
          </div>

          <div className="text-right">
            <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
              سجل التدقيق وتعديلات الإعدادات (Audit Log)
            </h2>
            <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
              آخر التغييرات التي تمت على سياسات الموردين وحقول المنشأة.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleFullLog}
          className="shrink-0 self-start text-[12.5px] font-extrabold text-[#086382] transition hover:underline sm:self-center"
        >
          {expanded
            ? "عرض الملخص فقط"
            : `عرض السجل الكامل (${totalCount})`}
        </button>
      </div>

      {/* قائمة أحداث التدقيق */}
      <div className="mt-5 flex flex-col gap-3">
        {displayedLogs.map((entry) => {
          const isPolicy = entry.type === "policy";
          const StatusIcon = isPolicy ? LuShieldCheck : LuCirclePlus;

          return (
            <div
              key={entry.id}
              className="flex flex-col justify-between gap-2 rounded-[14px] border border-[#e6eef4] bg-[#f4f8fa] px-4 py-3.5 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3 text-right">
                <StatusIcon
                  className={`size-[18px] shrink-0 ${
                    isPolicy ? "text-[#086382]" : "text-[#64748b]"
                  }`}
                />
                <p className="text-[13px] font-semibold leading-relaxed text-[#1e293b]">
                  <span>قام </span>
                  <strong className="font-black text-[#0f172a]">
                    {entry.actor}
                  </strong>{" "}
                  <span>{entry.actionText}</span>
                </p>
              </div>

              <span className="shrink-0 self-end text-[11.5px] font-bold text-[#64748b] tabular-nums sm:self-center">
                {entry.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AuditLogSection;