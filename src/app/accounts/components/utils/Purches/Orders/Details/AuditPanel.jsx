"use client";

import React from "react";
import { FiCheckCircle, FiShield } from "react-icons/fi";

const AuditPanel = ({ audit }) => {
  if (!audit) return null;

  const processTitle =
    audit.processTitle || "تدقيق التزامات المشتريات - Q4 2024";
  const auditor = audit.auditor || "د. عمر السليمان (مراقب معتمد)";
  const auditDate = audit.auditDate || "20 نوفمبر 2024 • عينة عشوائية #88";
  const note =
    audit.note ||
    "تم فحص تسلسل الترسية المالية والتأكد من استيفاء شهادة الوكالة الحصرية سارية المفعول، ومطابقة عروض الأسعار المسجلة، معاملة مورد الأسعار CMP-2024-019 للأحكام المادة 42 من لائحة المشتريات. لا يوجد تعارض مصالح مسجل مع المورد. بانتظار اكتمال استلام كامل بنود GRN للإقفال النهائي.";

  return (
    <section
      dir="rtl"
      className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* HEADER */}
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#eef2f6] pb-3">
        <div className="flex items-center gap-2">
          <FiShield className="h-4 w-4 text-[#0d658a]" />
          <h2 className="text-[13.5px] font-black text-[#0f172a]">
            حالة التدقيق والرقابة الداخلية المؤسسية
          </h2>
          <span className="text-[10.5px] font-medium text-[#94a3b8]">
            سجل فحص الامتثال المالي والحوكمة ومكافحة تعارض المصالح
          </span>
        </div>

        <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-0.5 text-[10.5px] font-bold text-[#b45309]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
          <span>{audit.badge || "قيد المراجعة والتدقيق الرقابي"}</span>
        </span>
      </header>

      {/* METADATA ROW */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#f1f5f9] pb-3 text-[11px] sm:grid-cols-3">
        <div>
          <span className="block text-[10px] font-semibold text-[#94a3b8]">
            عملية التدقيق المجدولة:
          </span>
          <strong className="mt-0.5 block font-extrabold text-[#0f172a]">
            {processTitle}
          </strong>
        </div>

        <div>
          <span className="block text-[10px] font-semibold text-[#94a3b8]">
            المراقب الداخلي المسؤول:
          </span>
          <strong className="mt-0.5 block font-bold text-[#1e293b]">
            {auditor}
          </strong>
        </div>

        <div>
          <span className="block text-[10px] font-semibold text-[#94a3b8]">
            تاريخ الإدراج في العينة:
          </span>
          <strong className="mt-0.5 block font-bold text-[#1e293b]">
            {auditDate}
          </strong>
        </div>
      </div>

      {/* AUDIT NOTES BOX */}
      <div className="mt-3 rounded-lg border border-[#e6ecf2] bg-[#f8fafc] p-3">
        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold text-[#0f172a]">
          <FiShield className="h-3.5 w-3.5 text-[#0d658a]" />
          <span>ملاحظات التدقيق والتحقق الرقابي:</span>
        </div>
        <p className="text-[11px] font-medium leading-relaxed text-[#475569]">
          {note}
        </p>
      </div>

      {/* OPTIONAL CHECKLIST ITEMS IF PASSED */}
      {audit.checklist && audit.checklist.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {audit.checklist.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[11px] font-medium text-[#475569]"
            >
              <FiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0d658a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default AuditPanel;