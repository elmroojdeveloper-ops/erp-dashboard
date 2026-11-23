export const KPI_STATS = {
  revenue: {
    value: "4,852,190.00",
    change: "+12.4% عن الربع السابق",
    note: "شامل ضريبة القيمة المضافة 15%",
  },
  receivables: {
    value: "1,940,320.00",
    percent: "40.0%",
    percentLabel: "من إجمالي المبيعات",
    clients: 284,
  },
  collectionDays: {
    value: 28,
    safeLabel: "ضمن النطاق الآمن (< 30 يوم)",
    note: "تحسّن بمقدار 4 أيام عن العام الماضي",
  },
  overdue: {
    value: "315,400.00",
    count: 91,
    linkLabel: "متابعة وعرض الفواتير المتأخرة",
  },
};

export const DATE_PRESETS = [
  { id: "month", label: "الشهر الحالي" },
  { id: "q1", label: "Q1 2026" },
  { id: "year", label: "السنة الحالية 2026" },
];

export const CLASSIFICATIONS = [
  { id: "all", label: "كل التصنيفات (348 عميل)" },
  { id: "contracting", label: "المقاولات والإنشاءات" },
  { id: "retail", label: "قطاع التجزئة" },
  { id: "trade", label: "التجارة العامة" },
];

export const SALES_BY_CLASS = [
  {
    name: "المقاولات والإنشاءات",
    value: 45,
    amount: "2,183,485",
    color: "#1b7398",
  },
  {
    name: "قطاع التجزئة",
    value: 27,
    amount: "1,310,090",
    color: "#15aedd",
  },
  {
    name: "التجارة العامة",
    value: 18,
    amount: "776,350",
    color: "#7ec8e3",
  },
  {
    name: "أخرى",
    value: 10,
    amount: "582,265",
    color: "#c6e7ff",
  },
];

export const MONTHLY_SALES = [
  { month: "أكتوبر 25", invoiced: 620, collected: 540 },
  { month: "نوفمبر 25", invoiced: 680, collected: 590 },
  { month: "ديسمبر 25", invoiced: 710, collected: 640 },
  { month: "يناير 26", invoiced: 780, collected: 700 },
  { month: "فبراير 26", invoiced: 820, collected: 750 },
  { month: "مارس 26", invoiced: 890, collected: 810 },
];
