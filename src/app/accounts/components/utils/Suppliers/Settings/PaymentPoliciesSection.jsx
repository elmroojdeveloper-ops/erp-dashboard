"use client";

import React, { useState } from "react";
import { FiBell, FiShield, FiUserCheck } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const PAYMENT_METHODS = [
  "تحويل بنكي سريع (SARIE)",
  "تحويل بنكي محلي (IBAN)",
  "شيك مصرفي",
  "اعتماد مستندي (L/C)",
];

const PAYMENT_TERMS = [
  "آجل 30 يوم من تاريخ الفاتورة",
  "آجل 45 يوم من تاريخ الفاتورة",
  "آجل 60 يوم من تاريخ الفاتورة",
  "نقدي / عند الاستلام",
];

const defaultPolicies = {
  paymentMethod: PAYMENT_METHODS[0],
  paymentTerms: PAYMENT_TERMS[0],
  maxOpeningBalance: "50000",
  twoPersonApproval: true,
  dueInvoiceReminder: true,
  zatcaComplianceBlock: true,
};

function formatNumberWithCommas(rawValue) {
  const digitsOnly = String(rawValue || "").replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return Number(digitsOnly).toLocaleString("en-US");
}

const PaymentPoliciesSection = ({
  initialPolicies = defaultPolicies,
  currencyLabel = "ر.س",
  onPoliciesChange,
}) => {
  const [policies, setPolicies] = useState({
    ...defaultPolicies,
    ...initialPolicies,
  });

  const updatePolicy = (patch) => {
    setPolicies((prev) => {
      const next = { ...prev, ...patch };
      onPoliciesChange?.(next);
      return next;
    });
  };

  const handleOpeningBalanceChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    updatePolicy({ maxOpeningBalance: digitsOnly });
  };

  const policySwitches = [
    {
      id: "twoPersonApproval",
      checked: policies.twoPersonApproval,
      Icon: FiUserCheck,
      iconBoxClass: "border-[#e2e8f0] bg-white text-[#475569]",
      title: "تفعيل اعتماد مزدوج لإضافة مورد جديد (Two-Person Approval)",
      badge: null,
      description:
        "يتطلب موافقة المدير المالي أو مدير المشتريات قبل تفعيل المورد في الدليل وإصدار أوامر الشراء النظامية له.",
      onToggle: () =>
        updatePolicy({ twoPersonApproval: !policies.twoPersonApproval }),
    },
    {
      id: "dueInvoiceReminder",
      checked: policies.dueInvoiceReminder,
      Icon: FiBell,
      iconBoxClass: "border-[#e2e8f0] bg-white text-[#475569]",
      title: "تفعيل تنبيه تلقائي عند اقتراب استحقاق فاتورة مورد",
      badge: null,
      description:
        "إرسال إشعار للمحاسب ومدير الخزينة والسيولة النقدية قبل تاريخ الاستحقاق بـ 5 أيام عمل لتفادي الغرامات.",
      onToggle: () =>
        updatePolicy({ dueInvoiceReminder: !policies.dueInvoiceReminder }),
    },
    {
      id: "zatcaComplianceBlock",
      checked: policies.zatcaComplianceBlock,
      Icon: LuShieldCheck,
      iconBoxClass: "border-[#86efac] bg-[#a7f3d0] text-[#047857]",
      title: "حظر إصدار فواتير شراء للموردين غير مكتملـي البيانات الضريبية (ZATCA)",
      badge: "إلزامي\nللمطابقة",
      description:
        "يمنع النظام تسجيل أي فاتورة أو سند قيد لمورد لا يحمل رقماً ضريبياً صالحاً (15 خانة) ورمز التحقق المسجل.",
      onToggle: () =>
        updatePolicy({ zatcaComplianceBlock: !policies.zatcaComplianceBlock }),
    },
  ];

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
          <FiShield className="size-5" />
        </div>

        <div className="text-right">
          <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
            سياسات الدفع والاعتماد (Payment &amp; Approval Policies)
          </h2>
          <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
            تحديد المعايير الافتراضية للمعاملات المالية، وسقوف الصرف، وضوابط
            الامتثال الضريبي.
          </p>
        </div>
      </div>

      {/* الحقول العلوية الثلاثة */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* طريقة الدفع الافتراضية */}
        <div>
          <label className="mb-2 block text-right text-[12px] font-bold text-[#64748b]">
            طريقة الدفع الافتراضية للموردين الجدد
          </label>
          <select
            value={policies.paymentMethod}
            onChange={(e) => updatePolicy({ paymentMethod: e.target.value })}
            className="h-12 w-full rounded-[13px] border border-[#e3ecf2] bg-[#f4f8fa] px-3.5 text-[13px] font-extrabold text-[#0f172a] transition focus:border-[#086382] focus:bg-white focus:outline-none"
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* شروط الدفع والائتمان الافتراضية */}
        <div>
          <label className="mb-2 block text-right text-[12px] font-bold text-[#64748b]">
            شروط الدفع والائتمان الافتراضية
          </label>
          <select
            value={policies.paymentTerms}
            onChange={(e) => updatePolicy({ paymentTerms: e.target.value })}
            className="h-12 w-full rounded-[13px] border border-[#e3ecf2] bg-[#f4f8fa] px-3.5 text-[13px] font-extrabold text-[#0f172a] transition focus:border-[#086382] focus:bg-white focus:outline-none"
          >
            {PAYMENT_TERMS.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        {/* حد أقصى للرصيد الافتتاحي بدون موافقة */}
        <div>
          <label className="mb-2 block text-right text-[12px] font-bold leading-snug text-[#64748b]">
            حد أقصى للرصيد الافتتاحي بدون موافقة
          </label>
          <div className="flex h-12 items-center justify-between gap-2 rounded-[13px] border border-[#e3ecf2] bg-[#f4f8fa] px-3.5 transition focus-within:border-[#086382] focus-within:bg-white">
            <span className="shrink-0 text-[12px] font-bold text-[#94a3b8]">
              {currencyLabel}
            </span>
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={formatNumberWithCommas(policies.maxOpeningBalance)}
              onChange={handleOpeningBalanceChange}
              placeholder="0"
              className="w-full bg-transparent text-left text-[14px] font-black text-[#0f172a] tabular-nums focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* مفاتيح التبديل الثلاثة للسياسات */}
      <div className="mt-5 flex flex-col gap-3.5">
        {policySwitches.map((item) => {
          const ItemIcon = item.Icon;

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-[18px] border border-[#e4edf2] bg-[#f4f8fa] px-5 py-4 sm:flex-row sm:items-center"
            >
              {/* الأيقونة + العنوان + الشارة + الوصف */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-[12px] border ${item.iconBoxClass}`}
                >
                  <ItemIcon className="size-[18px]" />
                </div>

                <div className="text-right">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-[13.5px] font-extrabold text-[#0f172a]">
                      {item.title}
                    </h3>

                    {item.badge && (
                      <span className="whitespace-pre-line rounded-[8px] bg-[#6ee7b7] px-2.5 py-1 text-center text-[10.5px] font-black leading-tight text-[#065f46]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 max-w-2xl text-[12px] font-semibold leading-relaxed text-[#64748b]">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* مفتاح التبديل */}
              <button
                type="button"
                role="switch"
                aria-checked={item.checked}
                aria-label={item.title}
                onClick={item.onToggle}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors ${
                  item.checked ? "bg-[#086382]" : "bg-[#cbd5e1]"
                }`}
              >
                <span
                  className={`size-5 rounded-full bg-white shadow-2xs transition-transform ${
                    item.checked ? "-translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentPoliciesSection;