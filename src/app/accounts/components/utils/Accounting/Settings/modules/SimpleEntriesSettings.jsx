"use client";

import { FiSliders, FiZap } from "react-icons/fi";
import { quickOperations } from "../settingsConstants";
import {
  CardShell,
  CustomFieldsCard,
  ModuleHeading,
  RowNote,
  Toggle,
} from "../SettingsUi";

export default function SimpleEntriesSettings({
  simpleUi,
  setSimpleUi,
  autoSuggestAccounts,
  setAutoSuggestAccounts,
  attachInvoiceImage,
  setAttachInvoiceImage,
  activeQuickOps,
  toggleQuickOp,
  simpleCustomFields,
  setSimpleCustomFields,
  markDirty,
}) {
  return (
    <div className="flex flex-col gap-5">
      <ModuleHeading title="إعدادات: القيود اليومية السهلة" />

      <CardShell
        chip="01"
        icon={FiSliders}
        iconBg="bg-[#E8F3FA] text-primary"
        title="نمط الإدخال المبسط"
        desc="واجهة مبسّطة لتسجيل الحركات دون الحاجة لمعرفة المدين والدائن."
      >
        <ul className="space-y-3">
          {[
            {
              title: "تفعيل واجهة القيود السهلة",
              desc: "استبدال جدول القيد الكامل بنموذج خطوة بخطوة.",
              checked: simpleUi,
              set: setSimpleUi,
            },
            {
              title: "اقتراح الحسابات تلقائياً حسب نوع العملية",
              desc: "اقتراح الحسابات عند اختيار قالب مثل صرف نقدي أو قبض نقدي.",
              checked: autoSuggestAccounts,
              set: setAutoSuggestAccounts,
            },
            {
              title: "السماح بإرفاق صورة الفاتورة مع القيد",
              desc: "رفع صورة أو PDF كإثبات مع القيد.",
              checked: attachInvoiceImage,
              set: setAttachInvoiceImage,
            },
          ].map((row) => (
            <li
              key={row.title}
              className="flex items-start justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3"
            >
              <RowNote title={row.title} desc={row.desc} />
              <Toggle
                checked={row.checked}
                onChange={(v) => {
                  row.set(v);
                  markDirty();
                }}
                ariaLabel={row.title}
              />
            </li>
          ))}
        </ul>
      </CardShell>

      <CardShell
        chip="02"
        icon={FiZap}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="العمليات السريعة"
        desc="قوالب جاهزة للحركات المتكررة — اختر ما يظهر للمستخدم."
      >
        <div className="flex flex-wrap gap-2">
          {quickOperations.map((op) => {
            const on = activeQuickOps[op.id];
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => toggleQuickOp(op.id)}
                className={`inline-flex h-9 items-center rounded-full border px-4 text-[12px] font-bold transition ${
                  on
                    ? "border-primary bg-[#E8F3FA] text-primary"
                    : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]"
                }`}
              >
                {op.label}
              </button>
            );
          })}
        </div>
      </CardShell>

      <CustomFieldsCard
        chip="03"
        desc="أضف حقولاً خاصة بنشاطك على القيود السهلة دون برمجة."
        fields={simpleCustomFields}
        setFields={setSimpleCustomFields}
        onDirty={markDirty}
      />
    </div>
  );
}