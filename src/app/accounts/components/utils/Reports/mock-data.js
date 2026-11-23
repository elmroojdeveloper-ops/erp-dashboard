export const KPI_STATS = {
  revenue: { value: "2,845,600", change: "+12.5% عن الشهر الماضي", up: true },
  expenses: { value: "1,624,300", change: "+4.2% عن الشهر الماضي", up: true },
  netProfit: { value: "1,221,300", change: "+18.1% عن الشهر الماضي", up: true },
  cashBalance: { value: "956,400", change: "الرصيد الحالي", up: false },
};

export const REVENUE_TREND = [
  { month: "يناير", revenue: 420, expenses: 280 },
  { month: "فبراير", revenue: 460, expenses: 310 },
  { month: "مارس", revenue: 390, expenses: 295 },
  { month: "أبريل", revenue: 510, expenses: 330 },
  { month: "مايو", revenue: 545, expenses: 360 },
  { month: "يونيو", revenue: 620, expenses: 380 },
];

export const EXPENSE_DISTRIBUTION = [
  { name: "رواتب", value: 35, color: "#1b7398" },
  { name: "مشتريات", value: 28, color: "#15aedd" },
  { name: "إيجارات", value: 18, color: "#7ec8e3" },
  { name: "تشغيلية", value: 12, color: "#c6e7ff" },
  { name: "أخرى", value: 7, color: "#e8eff3" },
];

export const CASH_FLOW = [
  { month: "يناير", inflow: 480, outflow: 320 },
  { month: "فبراير", inflow: 520, outflow: 360 },
  { month: "مارس", inflow: 450, outflow: 340 },
  { month: "أبريل", inflow: 590, outflow: 390 },
  { month: "مايو", inflow: 610, outflow: 410 },
  { month: "يونيو", inflow: 680, outflow: 430 },
];

export const REPORTS_LIST = [
  {
    id: "REP-01",
    title: "ميزان المراجعة",
    description: "ملخص أرصدة الحسابات حتى نهاية الفترة",
    period: "يونيو 2026",
    type: "محاسبي",
    updatedAt: "2026-06-30",
  },
  {
    id: "REP-02",
    title: "قائمة الدخل",
    description: "الإيرادات والمصروفات وصافي الربح",
    period: "Q2 2026",
    type: "مالي",
    updatedAt: "2026-06-30",
  },
  {
    id: "REP-03",
    title: "الميزانية العمومية",
    description: "الأصول والخصوم وحقوق الملكية",
    period: "يونيو 2026",
    type: "مالي",
    updatedAt: "2026-06-28",
  },
  {
    id: "REP-04",
    title: "التدفقات النقدية",
    description: "حركة النقد الداخل والخارج",
    period: "آخر 6 أشهر",
    type: "تشغيلي",
    updatedAt: "2026-06-25",
  },
  {
    id: "REP-05",
    title: "تقرير ضريبة القيمة المضافة",
    description: "تحليل ضريبة المخرجات والمدخلات",
    period: "Q2 2026",
    type: "ضريبي",
    updatedAt: "2026-06-20",
  },
  {
    id: "REP-06",
    title: "أعمار الذمم المدينة",
    description: "تصنيف المستحقات حسب فترة التأخير",
    period: "يونيو 2026",
    type: "تحليلي",
    updatedAt: "2026-06-18",
  },
];
