"use client";

import { useState } from "react";
import {
  FiBell,
  FiCheck,
  FiClipboard,
  FiLayers,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const sections = [
  {
    id: "approvals",
    title: "مسارات الاعتماد",
    desc: "حدود المبالغ وصلاحيات تحويل طلب الشراء إلى RFQ وأمر شراء.",
    Icon: FiShield,
    fields: [
      {
        key: "prApproveLimit",
        label: "حد اعتماد طلب الشراء بدون مدير (ر.س)",
        value: "25000",
      },
      {
        key: "poApproveLimit",
        label: "حد اعتماد أمر الشراء (ر.س)",
        value: "100000",
      },
    ],
  },
  {
    id: "rfq",
    title: "قواعد طلبات عروض الأسعار",
    desc: "الحد الأدنى لعدد الموردين المدعوين ومدة صلاحية العرض.",
    Icon: FiClipboard,
    fields: [
      {
        key: "minVendors",
        label: "الحد الأدنى للموردين في المنافسة",
        value: "3",
      },
      {
        key: "offerDays",
        label: "مدة صلاحية العرض (أيام)",
        value: "14",
      },
    ],
  },
  {
    id: "receipts",
    title: "قواعد الاستلام والمطابقة",
    desc: "السماح بالاستلام الجزئي وإصدار الفاتورة بعد المطابقة فقط.",
    Icon: FiTruck,
    fields: [
      {
        key: "allowPartial",
        label: "السماح بالاستلام الجزئي",
        value: "نعم",
        type: "select",
        options: ["نعم", "لا"],
      },
      {
        key: "invoiceAfterMatch",
        label: "إصدار الفاتورة بعد المطابقة الكاملة فقط",
        value: "نعم",
        type: "select",
        options: ["نعم", "لا"],
      },
    ],
  },
  {
    id: "categories",
    title: "تصنيفات الشراء الافتراضية",
    desc: "التصنيفات الظاهرة في طلبات الشراء وطلبات عروض الأسعار.",
    Icon: FiLayers,
    fields: [
      {
        key: "defaultCategory",
        label: "التصنيف الافتراضي",
        value: "رقمي",
        type: "select",
        options: ["رقمي", "مادي", "خدمي"],
      },
    ],
  },
  {
    id: "alerts",
    title: "التنبيهات",
    desc: "إشعارات قرب الاستحقاق وفروقات الاستلام.",
    Icon: FiBell,
    fields: [
      {
        key: "dueSoonDays",
        label: "تنبيه قبل الاستحقاق (أيام)",
        value: "3",
      },
    ],
  },
];

const Settings = () => {
  const [values, setValues] = useState(() => {
    const initial = {};
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        initial[field.key] = field.value;
      });
    });
    return initial;
  });
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div dir="rtl" className="flex flex-col gap-4 lg:gap-6">
      <section className="rounded-xl bg-white p-4 shadow-card sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
              إعدادات المشتريات
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
              ضبط قواعد الاعتماد، المنافسة، الاستلام، والتصنيفات لدورة المشتريات.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSaved(true)}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            <FiCheck className="size-4" />
            حفظ الإعدادات
          </button>
        </div>
        {saved ? (
          <p className="mt-3 text-[13px] font-semibold text-[#2E7D32]">
            تم حفظ الإعدادات محلياً (واجهة ثابتة).
          </p>
        ) : null}
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.Icon;
          return (
            <section
              key={section.id}
              className="rounded-[16px] border border-[#E5EDF2] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[#E8F4FC] text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-[16px] font-bold text-[#1A2332]">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-[12px] leading-6 text-[#64748B]">
                    {section.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {section.fields.map((field) => (
                  <label key={field.key} className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-semibold text-[#64748B]">
                      {field.label}
                    </span>
                    {field.type === "select" ? (
                      <select
                        value={values[field.key]}
                        onChange={(e) => update(field.key, e.target.value)}
                        className="h-11 rounded-[10px] border border-[#D5E0E7] bg-white px-3 text-sm font-medium text-[#1A2332] outline-none focus:border-primary"
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={values[field.key]}
                        onChange={(e) => update(field.key, e.target.value)}
                        className="h-11 rounded-[10px] border border-[#D5E0E7] bg-white px-3 text-sm font-medium text-[#1A2332] outline-none focus:border-primary"
                      />
                    )}
                  </label>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
