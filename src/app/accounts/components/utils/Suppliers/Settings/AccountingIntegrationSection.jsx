"use client";

import React, { useState } from "react";
import { FiGitMerge } from "react-icons/fi";

const AP_ACCOUNTS = [
  "201001 - مجمع ذمم الموردين والشركاء التجاريين",
  "201002 - ذمم موردي المواد الخام والتشغيل",
  "201003 - ذمم المقاولين والخدمات الاستشارية",
];

const COST_CENTERS = [
  "CC-101 - مركز التكلفة العام - الإدارة العامة",
  "CC-102 - مركز تكلفة المشتريات والتموين",
  "CC-103 - مركز تكلفة العمليات والإنتاج",
];

const VAT_INPUT_ACCOUNTS = [
  "202001 - ضريبة القيمة المضافة المستردة على المشتريات",
  "202002 - ضريبة القيمة المضافة على الأصول الرأسمالية",
];

const defaultAccountingSettings = {
  apAccount: AP_ACCOUNTS[0],
  costCenter: COST_CENTERS[0],
  vatInputAccount: VAT_INPUT_ACCOUNTS[0],
  autoPosting: true,
};

const AccountingIntegrationSection = ({
  initialSettings = defaultAccountingSettings,
  onAccountingChange,
}) => {
  const [settings, setSettings] = useState({
    ...defaultAccountingSettings,
    ...initialSettings,
  });

  const updateSettings = (patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      onAccountingChange?.(next);
      return next;
    });
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b] shadow-2xs"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* الرأس العلوي */}
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#e6f2f7] text-[#086382]">
          <FiGitMerge className="size-5" />
        </div>

        <div className="text-right">
          <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
            التكامل المحاسبي والقيود الآلية (Accounting Integration)
          </h2>
          <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
            ربط حركات المشتريات بشجرة الحسابات الرئيسية ومراكز التكلفة المحاسبية
            التلقائية.
          </p>
        </div>
      </div>

      {/* شبكة الحقول والبطاقة التلقائية */}
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        {/* حساب دائن افتراضي للموردين */}
        <div>
          <label className="mb-2 block text-right text-[12px] font-bold text-[#64748b]">
            حساب دائن افتراضي للموردين (Accounts Payable)
          </label>
          <select
            value={settings.apAccount}
            onChange={(e) => updateSettings({ apAccount: e.target.value })}
            className="h-12 w-full rounded-[13px] border border-[#e3ecf2] bg-[#f4f8fa] px-3.5 text-[13px] font-extrabold text-[#0f172a] transition focus:border-[#086382] focus:bg-white focus:outline-none"
          >
            {AP_ACCOUNTS.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-right text-[11.5px] font-semibold text-[#64748b]">
            الحساب الأب الذي تفتح تحته الحسابات الفرعية للموردين الجدد.
          </p>
        </div>

        {/* مركز التكلفة الافتراضي للمشتريات */}
        <div>
          <label className="mb-2 block text-right text-[12px] font-bold text-[#64748b]">
            مركز التكلفة الافتراضي للمشتريات
          </label>
          <select
            value={settings.costCenter}
            onChange={(e) => updateSettings({ costCenter: e.target.value })}
            className="h-12 w-full rounded-[13px] border border-[#e3ecf2] bg-[#f4f8fa] px-3.5 text-[13px] font-extrabold text-[#0f172a] transition focus:border-[#086382] focus:bg-white focus:outline-none"
          >
            {COST_CENTERS.map((cc) => (
              <option key={cc} value={cc}>
                {cc}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-right text-[11.5px] font-semibold leading-relaxed text-[#64748b]">
            المركز المحاسبي الافتراضي عند عدم تعيين مركز تكلفة مخصص للفاتورة.
          </p>
        </div>

        {/* حساب ضريبة القيمة المضافة الافتراضي */}
        <div>
          <label className="mb-2 block text-right text-[12px] font-bold text-[#64748b]">
            حساب ضريبة القيمة المضافة الافتراضي (VAT Input)
          </label>
          <select
            value={settings.vatInputAccount}
            onChange={(e) => updateSettings({ vatInputAccount: e.target.value })}
            className="h-12 w-full rounded-[13px] border border-[#e3ecf2] bg-[#f4f8fa] px-3.5 text-[13px] font-extrabold text-[#0f172a] transition focus:border-[#086382] focus:bg-white focus:outline-none"
          >
            {VAT_INPUT_ACCOUNTS.map((vat) => (
              <option key={vat} value={vat}>
                {vat}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-right text-[11.5px] font-semibold leading-relaxed text-[#64748b]">
            يستخدم لتوليد قيد الضريبة آلياً بموجب إقرارات هيئة الزكاة والضريبة.
          </p>
        </div>

        {/* بطاقة المعالجة التلقائية للفواتير (Auto-Posting) */}
        <div className="flex items-start justify-between gap-4 rounded-[18px] border border-[#e4edf2] bg-[#f4f8fa] p-4 sm:p-5">
          <div className="text-right">
            <h3 className="text-[14px] font-black leading-snug text-[#0f172a]">
              المعالجة التلقائية للفواتير (Auto-Posting)
            </h3>
            <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-[#64748b]">
              ترحيل الفواتير المعتمدة مباشرة إلى دفتر الأستاذ العام وتوليد
              قيود الاستحقاق آلياً دون الحاجة لترحيل يدوي.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.autoPosting}
            aria-label="المعالجة التلقائية للفواتير (Auto-Posting)"
            onClick={() => updateSettings({ autoPosting: !settings.autoPosting })}
            className={`relative mt-0.5 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors ${
              settings.autoPosting ? "bg-[#086382]" : "bg-[#cbd5e1]"
            }`}
          >
            <span
              className={`size-5 rounded-full bg-white shadow-2xs transition-transform ${
                settings.autoPosting ? "-translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountingIntegrationSection;