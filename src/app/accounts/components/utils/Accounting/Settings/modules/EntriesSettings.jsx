"use client";

import {
  FiBell,
  FiHash,
  FiPlus,
  FiShield,
  FiSliders,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { MdOutlineAccountBalance } from "react-icons/md";
import {
  approvalRoleOptions,
  defaultAccountOptions,
  entriesResetOptions,
} from "../settingsConstants";
import { formatAmountDisplay, sanitizeAmountDigits } from "../settingsFormat";
import {
  CardShell,
  Chip,
  CustomFieldsCard,
  ModuleHeading,
  Toggle,
} from "../SettingsUi";

export default function EntriesSettings({
  entriesFeatureOn,
  entriesPrefix,
  setEntriesPrefix,
  entriesResetCycle,
  setEntriesResetCycle,
  entriesStartSeq,
  setEntriesStartSeq,
  entriesPreviewId,
  entriesApprovalLevels,
  setEntriesApprovalLevels,
  entriesDualApprovalLimit,
  setEntriesDualApprovalLimit,
  entriesPnlAccount,
  setEntriesPnlAccount,
  entriesRoundingAccount,
  setEntriesRoundingAccount,
  entriesNotifyApproval,
  setEntriesNotifyApproval,
  entriesNotifyRejection,
  setEntriesNotifyRejection,
  entriesNotifyDailyPending,
  setEntriesNotifyDailyPending,
  entriesCustomFields,
  setEntriesCustomFields,
  markDirty,
}) {
  return (
    <div className="flex flex-col gap-5">
      <ModuleHeading title="إعدادات: القيود اليومية" />

      <CardShell
        chip="01"
        icon={HiOutlineClipboardDocumentCheck}
        iconBg="bg-[#E8F3FA] text-primary"
        title="تفعيل الميزة"
        desc="القيود اليومية أساس نظام المحاسبة ولا يمكن إيقافها نهائياً."
      >
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3">
          <Chip tone="accent">أساسي</Chip>
          <Toggle
            checked={entriesFeatureOn}
            disabled
            onChange={() => {}}
            ariaLabel="تفعيل القيود اليومية"
          />
        </div>
      </CardShell>

      <CardShell
        chip="02"
        icon={FiHash}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="الترقيم التلقائي"
        desc="بادئة القيد، دورية التصفير، ومعاينة الرقم التالي."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-start">
            <span className="text-xs font-semibold text-[#64748B]">
              صيغة الترقيم
            </span>
            <input
              value={entriesPrefix}
              onChange={(e) => {
                setEntriesPrefix(e.target.value);
                markDirty();
              }}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-start">
            <span className="text-xs font-semibold text-[#64748B]">
              تكرار إعادة التصفير
            </span>
            <select
              value={entriesResetCycle}
              onChange={(e) => {
                setEntriesResetCycle(e.target.value);
                markDirty();
              }}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
            >
              {entriesResetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-start">
            <span className="text-xs font-semibold text-[#64748B]">يبدأ من</span>
            <input
              type="number"
              min={1}
              value={entriesStartSeq}
              onChange={(e) => {
                setEntriesStartSeq(e.target.value);
                markDirty();
              }}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-bold focus:border-primary focus:bg-white focus:outline-none"
            />
          </label>
        </div>
        <p className="mt-4 text-[12px] font-semibold text-[#64748B]">
          معاينة:{" "}
          <span className="font-mono text-primary">{entriesPreviewId}</span>
          <span className="text-[#94A3B8]"> ← {"{الرقم}"}</span>
        </p>
      </CardShell>

      <CardShell
        chip="03"
        icon={FiShield}
        iconBg="bg-[#F0FDF4] text-[#15803D]"
        title="مستويات الاعتماد"
        desc="حدّدي تسلسل الاعتمادات قبل ترحيل القيد — أضيفي أو احذفي وفق حجم فريقك."
      >
        <ul className="space-y-3">
          {entriesApprovalLevels.map((level, index) => (
            <li
              key={level.id}
              className="flex flex-col gap-3 rounded-xl border border-[#EEF2F6] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-[11px] font-bold text-[#94A3B8]">
                  المستوى {index + 1}
                </span>
                <select
                  value={level.role}
                  onChange={(e) => {
                    setEntriesApprovalLevels((prev) =>
                      prev.map((row) =>
                        row.id === level.id
                          ? { ...row, role: e.target.value }
                          : row,
                      ),
                    );
                    markDirty();
                  }}
                  className="h-10 min-w-[160px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:outline-none"
                >
                  {approvalRoleOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-[12px] font-semibold text-[#64748B]">
                  إجباري
                </span>
                <Toggle
                  checked={level.mandatory}
                  onChange={(v) => {
                    setEntriesApprovalLevels((prev) =>
                      prev.map((row) =>
                        row.id === level.id ? { ...row, mandatory: v } : row,
                      ),
                    );
                    markDirty();
                  }}
                  ariaLabel={`إجباري للمستوى ${index + 1}`}
                />
                {entriesApprovalLevels.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEntriesApprovalLevels((prev) =>
                        prev.filter((row) => row.id !== level.id),
                      );
                      markDirty();
                    }}
                    className="text-[#94A3B8] hover:text-[#DC2626]"
                    aria-label="حذف المستوى"
                  >
                    <FiTrash2 className="size-4" />
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setEntriesApprovalLevels((prev) => [
              ...prev,
              {
                id: `lv-${Date.now()}`,
                role: "internal_auditor",
                mandatory: false,
              },
            ]);
            markDirty();
          }}
          className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-primary"
        >
          <FiPlus className="size-4" />
          إضافة مستوى اعتماد
        </button>
      </CardShell>

      <CardShell
        chip="04"
        icon={FiSliders}
        iconBg="bg-[#E8F3FA] text-primary"
        title="سقف المبلغ للاعتماد المزدوج"
        desc="القيود التي تتجاوز هذا المبلغ تتطلب اعتمادين من أشخاص مختلفين."
      >
        <label className="flex max-w-lg flex-col gap-1.5 text-start">
          <span className="text-xs font-semibold text-[#64748B]">المبلغ</span>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={formatAmountDisplay(entriesDualApprovalLimit)}
              onChange={(e) => {
                setEntriesDualApprovalLimit(
                  sanitizeAmountDigits(e.target.value),
                );
                markDirty();
              }}
              className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pe-14 ps-3 text-sm font-bold focus:border-primary focus:bg-white focus:outline-none"
            />
            <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#64748B]">
              ر.س
            </span>
          </div>
        </label>
        <p className="mt-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-[11px] leading-5 text-[#92400E]">
          أي قيد يتجاوز هذا المبلغ يحتاج اعتماد شخصين مختلفين قبل الترحيل. اتركي
          الحقل فارغاً لتعطيل الاعتماد المزدوج بالكامل.
        </p>
      </CardShell>

      <CardShell
        chip="05"
        icon={MdOutlineAccountBalance}
        iconBg="bg-[#FFFBEB] text-[#D97706]"
        title="الحسابات الافتراضية"
        desc="تُستخدم تلقائياً في القيود وعمليات التقريب."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-start">
            <span className="text-xs font-semibold text-[#64748B]">
              حساب الأرباح والخسائر
            </span>
            <select
              value={entriesPnlAccount}
              onChange={(e) => {
                setEntriesPnlAccount(e.target.value);
                markDirty();
              }}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
            >
              {defaultAccountOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-start">
            <span className="text-xs font-semibold text-[#64748B]">
              حساب فروقات التقريب
            </span>
            <select
              value={entriesRoundingAccount}
              onChange={(e) => {
                setEntriesRoundingAccount(e.target.value);
                markDirty();
              }}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
            >
              {defaultAccountOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </CardShell>

      <CardShell
        chip="06"
        icon={FiBell}
        iconBg="bg-[#E8F3FA] text-primary"
        title="الإشعارات"
        desc="تنبيهات المعتمدين وفريق المحاسبة."
      >
        <ul className="space-y-3">
          {[
            {
              title: "إشعار عند طلب اعتماد قيد",
              checked: entriesNotifyApproval,
              set: setEntriesNotifyApproval,
            },
            {
              title: "إشعار عند رفض قيد",
              checked: entriesNotifyRejection,
              set: setEntriesNotifyRejection,
            },
            {
              title: "ملخص يومي بالقيود المعلقة",
              checked: entriesNotifyDailyPending,
              set: setEntriesNotifyDailyPending,
            },
          ].map((row) => (
            <li
              key={row.title}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3"
            >
              <p className="text-sm font-bold text-[#1E293B]">{row.title}</p>
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

      <CustomFieldsCard
        chip="07"
        desc="أضيفي حقولاً خاصة بنشاطك لقسم «القيود اليومية» دون الحاجة إلى تطوير — مثل رقم المشروع أو رمز الموسم."
        fields={entriesCustomFields}
        setFields={setEntriesCustomFields}
        onDirty={markDirty}
      />
    </div>
  );
}