"use client";

import React, { useMemo, useState } from "react";
import { FiDownload, FiCheckCircle } from "react-icons/fi";
import {
  LuPiggyBank,
  LuBuilding2,
  LuLandmark,
  LuBanknote,
  LuIdCard,
  LuScrollText,
  LuUsers,
  LuStore,
} from "react-icons/lu";

const defaultDatasets = {
  top_accounts: [
    {
      id: "301001",
      code: "301001",
      name: "رأس المال المدفوع",
      subtitle: "حساب رئيسي - شركاء مؤسسون",
      icon: "piggy",
      classification: "حقوق الملكية",
      balanceAmount: "50,000,000.00",
      balanceSide: "دائن",
      currency: "(ر.س)",
      sharePercent: "27.08%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "102001",
      code: "102001",
      name: "الأراضي والمباني والعقارات",
      subtitle: "أصول ثابتة - المركز التشغيلي",
      icon: "building",
      classification: "أصول غير متداولة",
      balanceAmount: "24,800,000.00",
      balanceSide: "مدين",
      currency: "(ر.س)",
      sharePercent: "13.43%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "101002",
      code: "101002",
      name: "مصرف الراجحي - الحساب الاستثماري الجاري",
      subtitle: "الحساب البنكي الرئيسي #SA448000",
      icon: "bank",
      classification: "أصول متداولة (نقد ومافي حكمه)",
      balanceAmount: "18,340,500.00",
      balanceSide: "مدين",
      currency: "(ر.س)",
      sharePercent: "9.93%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "101001",
      code: "101001",
      name: "صندوق الخزينة الرئيسي (الرياض)",
      subtitle: "النقدية بالصندوق المركزي",
      icon: "cash",
      classification: "أصول متداولة",
      balanceAmount: "4,850,000.00",
      balanceSide: "مدين",
      currency: "(ر.س)",
      sharePercent: "2.63%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "202005",
      code: "202005",
      name: "مخصص مكافأة نهاية الخدمة للعاملين",
      subtitle: "التزام طويل الأجل معتمد اكتوارياً",
      icon: "hr",
      classification: "خصوم غير متداولة",
      balanceAmount: "3,980,240.00",
      balanceSide: "دائن",
      currency: "(ر.س)",
      sharePercent: "2.16%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "201001",
      code: "201001",
      name: "مجمع ذمم الموردين والشركاء التجاريين",
      subtitle: "حساب رقابي جامع - فواتير مشتريات",
      icon: "ledger",
      classification: "خصوم متداولة",
      balanceAmount: "3,240,800.00",
      balanceSide: "دائن",
      currency: "(ر.س)",
      sharePercent: "1.75%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
  ],
  top_customers: [
    {
      id: "120101",
      code: "120101",
      name: "شركة الأفق للتجارة والمقاولات",
      subtitle: "ذمم عملاء تجاريون - فرع الرياض",
      icon: "customers",
      classification: "أصول متداولة",
      balanceAmount: "6,450,000.00",
      balanceSide: "مدين",
      currency: "(ر.س)",
      sharePercent: "3.49%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "120102",
      code: "120102",
      name: "مؤسسة البنيان الحديث للخدمات",
      subtitle: "ذمم عملاء تجاريون - فرع جدة",
      icon: "customers",
      classification: "أصول متداولة",
      balanceAmount: "3,820,000.00",
      balanceSide: "مدين",
      currency: "(ر.س)",
      sharePercent: "2.07%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "120103",
      code: "120103",
      name: "مجموعة النخبة اللوجستية",
      subtitle: "ذمم عملاء تجاريون - المنطقة الشرقية",
      icon: "customers",
      classification: "أصول متداولة",
      balanceAmount: "2,180,000.00",
      balanceSide: "مدين",
      currency: "(ر.س)",
      sharePercent: "1.18%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
  ],
  top_suppliers: [
    {
      id: "210101",
      code: "210101",
      name: "شركة الإمداد الصناعي المتقدمة",
      subtitle: "ذمم موردين رئيسيين - عقود توريد",
      icon: "suppliers",
      classification: "خصوم متداولة",
      balanceAmount: "3,120,500.00",
      balanceSide: "دائن",
      currency: "(ر.س)",
      sharePercent: "1.69%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "210102",
      code: "210102",
      name: "شركة التقنية والأنظمة المتكاملة",
      subtitle: "ذمم موردين - تراخيص وصيانة",
      icon: "suppliers",
      classification: "خصوم متداولة",
      balanceAmount: "1,890,300.00",
      balanceSide: "دائن",
      currency: "(ر.س)",
      sharePercent: "1.02%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
    {
      id: "210103",
      code: "210103",
      name: "مؤسسة الموارد اللوجستية للنقل",
      subtitle: "ذمم موردين - خدمات شحن",
      icon: "suppliers",
      classification: "خصوم متداولة",
      balanceAmount: "1,410,000.00",
      balanceSide: "دائن",
      currency: "(ر.س)",
      sharePercent: "0.76%",
      fiscalYear: "2026 م",
      auditStatus: "معتمد ومقفل",
    },
  ],
};

const renderRowIcon = (type) => {
  switch (type) {
    case "piggy":
      return <LuPiggyBank className="h-4 w-4 text-[#086382]" />;
    case "building":
      return <LuBuilding2 className="h-4 w-4 text-[#086382]" />;
    case "bank":
      return <LuLandmark className="h-4 w-4 text-[#086382]" />;
    case "cash":
      return <LuBanknote className="h-4 w-4 text-[#086382]" />;
    case "hr":
      return <LuIdCard className="h-4 w-4 text-[#64748b]" />;
    case "ledger":
      return <LuScrollText className="h-4 w-4 text-[#64748b]" />;
    case "customers":
      return <LuUsers className="h-4 w-4 text-[#086382]" />;
    case "suppliers":
      return <LuStore className="h-4 w-4 text-[#64748b]" />;
    default:
      return <LuPiggyBank className="h-4 w-4 text-[#086382]" />;
  }
};

const renderTabIcon = (id) => {
  switch (id) {
    case "top_accounts":
      return <LuScrollText className="h-3.5 w-3.5 shrink-0" />;
    case "top_customers":
      return <LuUsers className="h-3.5 w-3.5 shrink-0" />;
    case "top_suppliers":
      return <LuStore className="h-3.5 w-3.5 shrink-0" />;
    default:
      return null;
  }
};

const Table = ({
  datasets = defaultDatasets,
  fiscalYearLabel = "2026 م",
  onExportTable,
  onSelectRow,
}) => {
  const [activeTab, setActiveTab] = useState("top_accounts");

  const tabs = [
    { id: "top_accounts", label: "أعلى 10 حسابات برصيد افتتاحي" },
    { id: "top_customers", label: "أعلى 10 عملاء وذمم مدينة" },
    { id: "top_suppliers", label: "أعلى 10 موردين وذمم دائنة" },
  ];

  const rows = useMemo(() => {
    return datasets?.[activeTab] ?? defaultDatasets.top_accounts;
  }, [datasets, activeTab]);

  return (
    <section
      dir="rtl"
      className="mt-4 rounded-[22px] border border-[#e6ecf2] bg-white p-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Bar: Tabs on Right + Year Pill & Export on Left */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Tabs Container */}
        <div className="inline-flex flex-wrap items-center gap-1 rounded-[12px] border border-[#e6ecf2] bg-[#f4f7fa] p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-2 text-[11.5px] transition ${
                  isActive
                    ? "bg-white font-black text-[#086382] shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                    : "bg-transparent font-bold text-[#475569] hover:text-[#0f172a]"
                }`}
              >
                {renderTabIcon(tab.id)}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Left Controls: Accounting Year Badge + Export Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex h-[34px] items-center gap-1 rounded-[9px] border border-[#e2e8f0] bg-[#f8fafc] px-3 text-[11px] font-bold text-[#64748b]">
            <span>السنة المحاسبية:</span>
            <span className="font-black text-[#086382]">{fiscalYearLabel}</span>
          </div>

          <button
            type="button"
            onClick={() => onExportTable?.(activeTab, rows)}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
          >
            <FiDownload className="h-3.5 w-3.5 text-[#475569]" />
            <span>تصدير الجدول</span>
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[820px]">
          {/* Header Row */}
          <div className="grid grid-cols-[1.15fr_0.9fr_1.05fr_1.45fr_1.55fr_2.4fr_0.95fr] items-center gap-3 rounded-[10px] bg-[#edf2f6] px-4 py-2.5 text-[11px] font-extrabold text-[#475569]">
            <div className="text-center">الحالة الرقابية</div>
            <div className="text-center">السنة المالية</div>
            <div className="text-center">النسبة من المركز المالي</div>
            <div className="text-right">الرصيد الافتتاحي (مدين / دائن)</div>
            <div className="text-center">التصنيف المحاسبي الرئيسي</div>
            <div className="text-right">اسم الحساب / البند المالي</div>
            <div className="text-right">الرمز المحاسبي</div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-[#eef2f6]">
            {rows.map((row) => (
              <div
                key={row.id}
                onClick={() => onSelectRow?.(row)}
                className="grid cursor-pointer grid-cols-[1.15fr_0.9fr_1.05fr_1.45fr_1.55fr_2.4fr_0.95fr] items-center gap-3 bg-white px-4 py-3.5 transition hover:bg-[#fafcfd]"
              >
                {/* الحالة الرقابية */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-[12px] border border-[#ccebd9] bg-[#eaf7f0] px-2.5 py-1 text-[10.5px] font-extrabold leading-[1.2] text-[#047857]">
                    <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#059669]" />
                    <span>
                      <span className="block">معتمد</span>
                      <span className="block">ومقفل</span>
                    </span>
                  </span>
                </div>

                {/* السنة المالية */}
                <div className="text-center text-[11.5px] font-bold text-[#334155]">
                  {row.fiscalYear}
                </div>

                {/* النسبة من المركز المالي */}
                <div className="text-center text-[12px] font-black text-[#086382] tabular-nums">
                  {row.sharePercent}
                </div>

                {/* الرصيد الافتتاحي (مدين / دائن) */}
                <div className="text-right leading-tight">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-[11px] font-bold text-[#64748b]">
                      {row.balanceSide}
                    </span>
                    <span className="text-[12.5px] font-black text-[#0f172a] tabular-nums">
                      {row.balanceAmount}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[10.5px] font-semibold text-[#64748b]">
                    {row.currency}
                  </div>
                </div>

                {/* التصنيف المحاسبي الرئيسي */}
                <div className="flex justify-center">
                  <span className="inline-block rounded-[8px] border border-[#e2e8f0] bg-[#f4f7fa] px-2.5 py-1 text-center text-[10.5px] font-bold text-[#334155]">
                    {row.classification}
                  </span>
                </div>

                {/* اسم الحساب / البند المالي */}
                <div className="flex items-center justify-end gap-2.5 text-right">
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-black leading-[1.3] text-[#0f172a]">
                      {row.name}
                    </div>
                    <div className="mt-0.5 text-[10.5px] font-medium text-[#64748b]">
                      {row.subtitle}
                    </div>
                  </div>

                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-[#f4f7fa]">
                    {renderRowIcon(row.icon)}
                  </div>
                </div>

                {/* الرمز المحاسبي */}
                <div className="text-right text-[12px] font-black text-[#086382] tabular-nums">
                  {row.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;

