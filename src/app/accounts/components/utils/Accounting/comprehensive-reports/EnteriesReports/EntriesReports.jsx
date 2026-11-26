"use client";

import React, { useMemo, useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Cards from "./Cards";
import Chart from "./Chart";
import ThisMonth from "./ThisMonth";
import Distribute from "./Distribute";
import Table from "./Table";

const DATASET_BY_FILTER = {
  all: {
    periodBadge: "بيانات الربع الثالث 2024",
    stats: {
      recordedCount: "4,820",
      postedCount: "4,692",
      pendingCount: "128",
    },
    chartData: [
      { month: "أبريل", autoEntries: 640, manualEntries: 190, amountMillions: 23.4 },
      { month: "مايو", autoEntries: 710, manualEntries: 220, amountMillions: 25.1 },
      { month: "يونيو", autoEntries: 790, manualEntries: 215, amountMillions: 24.8 },
      { month: "يوليو", autoEntries: 830, manualEntries: 240, amountMillions: 26.2 },
      { month: "أغسطس", autoEntries: 890, manualEntries: 265, amountMillions: 27.6 },
      { month: "سبتمبر", autoEntries: 950, manualEntries: 280, amountMillions: 28.45 },
    ],
    thisMonth: {
      monthLabel: "سبتمبر",
      yearLabel: "2024",
      totalAmount: "28,450,900",
      currency: "ر.س",
      autoPercent: "81.3%",
      manualPercent: "18.7%",
      autoAmount: "23,120,400",
      autoShare: "81.3% من الإجمالي",
      autoCount: "3,918 قيد مرحّل آلي",
      manualAmount: "5,330,500",
      manualShare: "18.7% من الإجمالي",
      manualCount: "774 قيد يدوي",
      complianceNote: "متطابق مع ميزان المراجعة ولوائح التعيين لمنظومة ZATCA",
    },
    branches: [
      {
        id: "riyadh-hq",
        title: "الرياض - الفرع الرئيسي",
        shareLabel: "52.8%",
        entriesCount: "2,450",
        entriesUnit: "قيد مسجل",
        amountLabel: "16.20 مليون ر.س",
        iconType: "hq",
        progressPercent: 52.8,
      },
      {
        id: "jeddah-ops",
        title: "جدة - العمليات اللوجستية",
        shareLabel: "28.7%",
        entriesCount: "1,480",
        entriesUnit: "قيد مسجل",
        amountLabel: "8.10 مليون ر.س",
        iconType: "logistics",
        progressPercent: 28.7,
      },
      {
        id: "eastern-khobar",
        title: "المنطقة الشرقية - الخبر",
        shareLabel: "18.5%",
        entriesCount: "890",
        entriesUnit: "قيد مسجل",
        amountLabel: "4.15 مليون ر.س",
        iconType: "eastern",
        progressPercent: 18.5,
      },
    ],
  },
  riyadh_hq: {
    periodBadge: "الرياض - الفرع الرئيسي • Q3 2024",
    stats: {
      recordedCount: "2,450",
      postedCount: "2,395",
      pendingCount: "55",
    },
    chartData: [
      { month: "أبريل", autoEntries: 340, manualEntries: 95, amountMillions: 13.1 },
      { month: "مايو", autoEntries: 375, manualEntries: 110, amountMillions: 14.0 },
      { month: "يونيو", autoEntries: 410, manualEntries: 105, amountMillions: 13.8 },
      { month: "يوليو", autoEntries: 435, manualEntries: 120, amountMillions: 14.9 },
      { month: "أغسطس", autoEntries: 465, manualEntries: 130, amountMillions: 15.6 },
      { month: "سبتمبر", autoEntries: 500, manualEntries: 140, amountMillions: 16.2 },
    ],
    thisMonth: {
      monthLabel: "سبتمبر",
      yearLabel: "2024",
      totalAmount: "16,200,000",
      currency: "ر.س",
      autoPercent: "82.0%",
      manualPercent: "18.0%",
      autoAmount: "13,284,000",
      autoShare: "82.0% من الإجمالي",
      autoCount: "2,010 قيد مرحّل آلي",
      manualAmount: "2,916,000",
      manualShare: "18.0% من الإجمالي",
      manualCount: "385 قيد يدوي",
      complianceNote: "متطابق مع ميزان المراجعة ولوائح التعيين لمنظومة ZATCA",
    },
    branches: [
      {
        id: "riyadh-hq",
        title: "الرياض - الفرع الرئيسي",
        shareLabel: "100%",
        entriesCount: "2,450",
        entriesUnit: "قيد مسجل",
        amountLabel: "16.20 مليون ر.س",
        iconType: "hq",
        progressPercent: 100,
      },
    ],
  },
  jeddah_ops: {
    periodBadge: "جدة - العمليات اللوجستية • Q3 2024",
    stats: {
      recordedCount: "1,480",
      postedCount: "1,435",
      pendingCount: "45",
    },
    chartData: [
      { month: "أبريل", autoEntries: 190, manualEntries: 60, amountMillions: 6.5 },
      { month: "مايو", autoEntries: 210, manualEntries: 70, amountMillions: 7.0 },
      { month: "يونيو", autoEntries: 235, manualEntries: 68, amountMillions: 7.1 },
      { month: "يوليو", autoEntries: 245, manualEntries: 75, amountMillions: 7.4 },
      { month: "أغسطس", autoEntries: 265, manualEntries: 82, amountMillions: 7.8 },
      { month: "سبتمبر", autoEntries: 280, manualEntries: 88, amountMillions: 8.1 },
    ],
    thisMonth: {
      monthLabel: "سبتمبر",
      yearLabel: "2024",
      totalAmount: "8,100,000",
      currency: "ر.س",
      autoPercent: "79.5%",
      manualPercent: "20.5%",
      autoAmount: "6,439,500",
      autoShare: "79.5% من الإجمالي",
      autoCount: "1,140 قيد مرحّل آلي",
      manualAmount: "1,660,500",
      manualShare: "20.5% من الإجمالي",
      manualCount: "295 قيد يدوي",
      complianceNote: "متطابق مع ميزان المراجعة ولوائح التعيين لمنظومة ZATCA",
    },
    branches: [
      {
        id: "jeddah-ops",
        title: "جدة - العمليات اللوجستية",
        shareLabel: "100%",
        entriesCount: "1,480",
        entriesUnit: "قيد مسجل",
        amountLabel: "8.10 مليون ر.س",
        iconType: "logistics",
        progressPercent: 100,
      },
    ],
  },
  eastern_khobar: {
    periodBadge: "المنطقة الشرقية - الخبر • Q3 2024",
    stats: {
      recordedCount: "890",
      postedCount: "862",
      pendingCount: "28",
    },
    chartData: [
      { month: "أبريل", autoEntries: 110, manualEntries: 35, amountMillions: 3.8 },
      { month: "مايو", autoEntries: 125, manualEntries: 40, amountMillions: 4.1 },
      { month: "يونيو", autoEntries: 145, manualEntries: 42, amountMillions: 3.9 },
      { month: "يوليو", autoEntries: 150, manualEntries: 45, amountMillions: 3.9 },
      { month: "أغسطس", autoEntries: 160, manualEntries: 53, amountMillions: 4.2 },
      { month: "سبتمبر", autoEntries: 170, manualEntries: 52, amountMillions: 4.15 },
    ],
    thisMonth: {
      monthLabel: "سبتمبر",
      yearLabel: "2024",
      totalAmount: "4,150,900",
      currency: "ر.س",
      autoPercent: "82.4%",
      manualPercent: "17.6%",
      autoAmount: "3,420,340",
      autoShare: "82.4% من الإجمالي",
      autoCount: "768 قيد مرحّل آلي",
      manualAmount: "730,560",
      manualShare: "17.6% من الإجمالي",
      manualCount: "94 قيد يدوي",
      complianceNote: "متطابق مع ميزان المراجعة ولوائح التعيين لمنظومة ZATCA",
    },
    branches: [
      {
        id: "eastern-khobar",
        title: "المنطقة الشرقية - الخبر",
        shareLabel: "100%",
        entriesCount: "890",
        entriesUnit: "قيد مسجل",
        amountLabel: "4.15 مليون ر.س",
        iconType: "eastern",
        progressPercent: 100,
      },
    ],
  },
};

const INITIAL_ENTRIES = [
  {
    id: "jv-2024-0891",
    entryNo: "JV-2024-0891",
    date: "28/09/2024",
    time: "14:32",
    branch: "riyadh_hq",
    description: "ترحيل مبيعات المعارض ونقاط البيع اليومية",
    costCenter: "مركز تكلفة: المعارض POS",
    debitAccount: "110101 • البنك الأهلي التجاري",
    debitSub: "حساب النقدية والبنوك التحليلي",
    creditAccount: "410100 • إيرادات مبيعات التجزئة",
    creditSub: "حساب الإيرادات التشغيلية",
    amount: "485,200.00",
    currency: "ر.س",
    status: "posted",
    statusLabel: "مرحل ومعتمد",
    type: "auto",
    typeLabel: "آلي",
    user: "نظام POS الآلي",
    userSub: "ترحيل تلقائي",
    avatarBg: "bg-[#f0f9ff] text-[#0d658a]",
    avatarLabel: "POS",
  },
  {
    id: "jv-2024-0890",
    entryNo: "JV-2024-0890",
    date: "28/09/2024",
    time: "11:15",
    branch: "jeddah_ops",
    description: "إثبات سداد مستحقات موردي المواد الخام ومستلزمات الإنتاج",
    costCenter: "مركز تكلفة: المشتريات والإمداد",
    debitAccount: "210301 • شركة الصناعات المتطورة",
    debitSub: "حسابات الموردين التجاريين",
    creditAccount: "110102 • بنك الراجحي - الحساب الجاري",
    creditSub: "نقدية البنوك",
    amount: "1,240,000.00",
    currency: "ر.س",
    status: "posted",
    statusLabel: "مرحل ومعتمد",
    type: "manual",
    typeLabel: "يدوي",
    user: "فيصل الحربي",
    userSub: "محاسب أول",
    avatarBg: "bg-[#f1f5f9] text-[#334155]",
    avatarLabel: "ف ح",
  },
  {
    id: "jv-2024-0889",
    entryNo: "JV-2024-0889",
    date: "27/09/2024",
    time: "17:45",
    branch: "riyadh_hq",
    description: "تسوية صرف رواتب وأجور الموظفين والبدلات - شهر سبتمبر",
    costCenter: "مركز تكلفة: الموارد البشرية",
    debitAccount: "510101 • مصروفات الرواتب والأجور",
    debitSub: "المصاريف التشغيلية والإدارية",
    creditAccount: "220101 • مخصص مستحقات الرواتب",
    creditSub: "الالتزامات المتداولة",
    amount: "3,850,300.00",
    currency: "ر.س",
    status: "review",
    statusLabel: "قيد المراجعة",
    type: "manual",
    typeLabel: "يدوي",
    user: "سارة القحطاني",
    userSub: "مدير الحسابات",
    avatarBg: "bg-[#eff6ff] text-[#1d4ed8]",
    avatarLabel: "س ق",
  },
  {
    id: "jv-2024-0888",
    entryNo: "JV-2024-0888",
    date: "26/09/2024",
    time: "09:00",
    branch: "eastern_khobar",
    description: "إهلاك الأصول الثابتة والآلات ومعدات النقل لشهر سبتمبر",
    costCenter: "مركز تكلفة: الأصول والإهلاك",
    debitAccount: "520401 • مصروف إهلاك آلات ومعدات",
    debitSub: "مصروفات الإهلاك والاستهلاك",
    creditAccount: "120202 • مجمع إهلاك الآلات والمعدات",
    creditSub: "الأصول الثابتة المجمعة",
    amount: "142,850.00",
    currency: "ر.س",
    status: "posted",
    statusLabel: "مرحل ومعتمد",
    type: "auto",
    typeLabel: "آلي",
    user: "نظام الأصول الثابتة",
    userSub: "إقفال شهري",
    avatarBg: "bg-[#f0fdf4] text-[#15803d]",
    avatarLabel: "FA",
  },
  {
    id: "jv-2024-0887",
    entryNo: "JV-2024-0887",
    date: "25/09/2024",
    time: "16:10",
    branch: "jeddah_ops",
    description: "تسوية عهدة موظفي المشتريات الخارجية وفواتير السفر والانتقال",
    costCenter: "مركز تكلفة: المبيعات والتسويق",
    debitAccount: "510302 • مصاريف السفر والانتقال",
    debitSub: "مصروفات إدارية وعمومية",
    creditAccount: "110304 • عهد الموظفين المؤقتة",
    creditSub: "أرصدة مدينة أخرى",
    amount: "34,500.00",
    currency: "ر.س",
    status: "reversed",
    statusLabel: "مسودة",
    type: "manual",
    typeLabel: "يدوي",
    user: "محمد خليل",
    userSub: "محاسب مالي",
    avatarBg: "bg-[#fffbeb] text-[#b45309]",
    avatarLabel: "م خ",
  },
];

const EntriesReports = () => {
  const [period, setPeriod] = useState("fy24_q3");
  const [branch, setBranch] = useState("all");
  const [entryType, setEntryType] = useState("all");
  const [dateRange, setDateRange] = useState("01/07/2024 - 30/09/2024");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const activeDataset = useMemo(() => {
    return DATASET_BY_FILTER[branch] || DATASET_BY_FILTER.all;
  }, [branch]);

  const filteredEntries = useMemo(() => {
    return INITIAL_ENTRIES.filter((row) => {
      if (branch !== "all" && row.branch !== branch) return false;
      if (entryType !== "all" && row.type !== entryType) return false;
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      return true;
    });
  }, [branch, entryType, statusFilter]);

  const handleResetAll = () => {
    setPeriod("fy24_q3");
    setBranch("all");
    setEntryType("all");
    setDateRange("01/07/2024 - 30/09/2024");
    setStatusFilter("all");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f4f7f9] px-4 py-4 sm:px-6 space-y-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <Header
        periodBadge={activeDataset.periodBadge}
        onExport={() => alert("جاري تصدير تقرير القيود اليومية (PDF / Excel)...")}
        onCustomize={() => alert("فتح نافذة تخصيص أعمدة وعناصر التقرير")}
      />

      <Filter
        period={period}
        onPeriodChange={setPeriod}
        branch={branch}
        onBranchChange={setBranch}
        entryType={entryType}
        onEntryTypeChange={setEntryType}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onApply={() => {}}
        onReset={handleResetAll}
      />

      <Cards
        stats={activeDataset.stats}
        onReviewPending={() =>
          setStatusFilter((prev) => (prev === "review" ? "all" : "review"))
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        
        <div className="lg:col-span-4">
          <ThisMonth {...activeDataset.thisMonth} />
        </div>
        <div className="lg:col-span-8">
          <Chart data={activeDataset.chartData} />
        </div>
      </div>

      <Distribute
        branches={activeDataset.branches}
        onViewCostCenters={() => setBranch("all")}
      />

      <Table
        entries={filteredEntries}
        onSelectEntry={(entry) => setSelectedEntry(entry)}
        onPrintEntry={(entry) => alert(`طباعة القيد المحاسبي: ${entry.entryNo}`)}
      />

      {selectedEntry ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-lg text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
              <div>
                <h3 className="text-[14px] font-black text-[#0f172a]">
                  تفاصيل القيد {selectedEntry.entryNo}
                </h3>
                <p className="text-[10.5px] font-semibold text-[#64748b]">
                  {selectedEntry.date} • {selectedEntry.time}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="rounded-lg border border-[#e2e8f0] px-2.5 py-1 text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]"
              >
                إغلاق
              </button>
            </div>

            <div className="mt-3 space-y-2 text-[11.5px]">
              <p className="font-bold text-[#0f172a]">{selectedEntry.description}</p>
              <div className="rounded-lg bg-[#f8fafc] p-2.5 space-y-1 text-[11px]">
                <div>
                  <span className="font-bold text-[#64748b]">الحساب المدين: </span>
                  <strong className="font-extrabold text-[#0f172a]">
                    {selectedEntry.debitAccount}
                  </strong>
                </div>
                <div>
                  <span className="font-bold text-[#64748b]">الحساب الدائن: </span>
                  <strong className="font-extrabold text-[#0f172a]">
                    {selectedEntry.creditAccount}
                  </strong>
                </div>
                <div>
                  <span className="font-bold text-[#64748b]">المبلغ الإجمالي: </span>
                  <strong className="font-black text-[#0d658a]">
                    {selectedEntry.amount} {selectedEntry.currency}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EntriesReports;