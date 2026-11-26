import { FiLayers } from "react-icons/fi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import {
  MdOutlineAccountBalance,
  MdOutlineAssessment,
  MdOutlineFactCheck,
} from "react-icons/md";
import { LuRocket } from "react-icons/lu";
export const activityTemplates = [
  { value: "", label: "...اختاري نوع نشاطك" },
  { value: "retail", label: "تجارة تجزئة وبيع مباشر" },
  { value: "services", label: "خدمات مهنية واستشارات" },
  { value: "manufacturing", label: "تصنيع وإنتاج" },
  { value: "nonprofit", label: "منظمات غير ربحية" },
];

export const quickOperations = [
  { id: "cash-out", label: "صرف نقدي" },
  { id: "credit-sales", label: "مبيعات آجلة" },
  { id: "opex", label: "مصاريف تشغيل" },
  { id: "cash-in", label: "قبض نقدي" },
];

export const initialSimpleFields = [
  {
    id: "project-code",
    label: "رمز المشروع",
    type: "text",
  },
];

export const initialCoaFields = [
  {
    id: "coa-project-no",
    label: "رقم المشروع",
    type: "text",
  },
];

export const auditChangeLogToggles = [
  {
    key: "auditLogEntries",
    title: "تسجيل كل تعديل على القيود المعتمدة",
  },
  {
    key: "auditLogAuth",
    title: "تسجيل عمليات تسجيل الدخول والخروج",
  },
];

export const fixedDepreciationCycleToggles = [
  {
    key: "monthlyDepreciationAuto",
    title: "احتساب الإهلاك الشهري تلقائياً نهاية كل شهر",
  },
  {
    key: "depreciationEntryAuto",
    title: "إنشاء قيد الإهلاك تلقائياً",
  },
];

export const openingControlToggles = [
  {
    key: "openingBalanceEnforced",
    title: "إلزام توازن الأرصدة (مدين = دائن) قبل الاعتماد",
    desc: "رفض الاعتماد ما لم تتساوَ مجموع المدين والدائن.",
  },
  {
    key: "openingLockAfterApproval",
    title: "قفل الأرصدة الافتتاحية بعد الاعتماد",
    desc: "منع تعديل الدفعة بعد الاعتماد إلا بصلاحية إعادة فتح.",
  },
];

export const coaStructureToggles = [
  {
    key: "unlimitedSubLevels",
    title: "السماح بإنشاء مستويات فرعية غير محدودة",
    desc: "إضافة مستويات فرعية تحت أي حساب دون حد أقصى للعمق.",
  },
  {
    key: "unifiedNumbering",
    title: "فرض ترقيم الحسابات وفق نمط موحّد",
    desc: "تطبيق ترقيم تلقائي متسق عند إنشاء حساب جديد.",
  },
  {
    key: "preventDeleteWithBalance",
    title: "منع حذف حساب عليه حركة",
    desc: "حماية الدفاتر من حذف حسابات مستخدمة في قيود أو أرصدة.",
  },
];

export const coaTemplates = [
  { value: "general-commercial", label: "دليل حسابات تجاري عام" },
  { value: "services", label: "دليل حسابات خدمات مهنية" },
  { value: "retail", label: "دليل حسابات تجزئة" },
  { value: "manufacturing", label: "دليل حسابات صناعي" },
];

export const fieldTypeOptions = [
  { value: "text", label: "نص" },
  { value: "number", label: "رقم" },
  { value: "date", label: "تاريخ" },
  { value: "list", label: "قائمة" },
];

export const defaultModuleEnabled = {
  entries: true,
  "simple-entries": true,
  coa: true,
  "opening-balances": true,
  "fixed-assets": false,
  audit: true,
};

export const defaultAssetCategories = [
  "مباني",
  "سيارات",
  "أجهزة حاسب",
  "آلات ومعدات",
];

export const getDefaultSettingsState = () => ({
  activityTemplate: "",
  selectedModule: "entries",
  moduleEnabled: { ...defaultModuleEnabled },
  simpleUi: true,
  autoSuggestAccounts: true,
  attachInvoiceImage: false,
  activeQuickOps: quickOperations.reduce(
    (acc, op) => ({ ...acc, [op.id]: true }),
    {},
  ),
  simpleCustomFields: initialSimpleFields,
  coaFeatureOn: true,
  coaTemplate: "general-commercial",
  unlimitedSubLevels: true,
  unifiedNumbering: true,
  preventDeleteWithBalance: true,
  coaCustomFields: initialCoaFields,
  openingFyStart: "2024-01-01",
  openingBalanceEnforced: true,
  openingLockAfterApproval: true,
  openingCustomFields: initialCoaFields,
  depreciationMethod: "units",
  monthlyDepreciationAuto: true,
  depreciationEntryAuto: true,
  assetCategories: [...defaultAssetCategories],
  fixedCustomFields: initialCoaFields,
  auditThreshold: "100000",
  auditRetention: "5",
  auditLogEntries: true,
  auditLogAuth: true,
  auditCustomFields: initialCoaFields,
  entriesFeatureOn: true,
  entriesPrefix: "JE-2024-",
  entriesResetCycle: "annual",
  entriesStartSeq: "1",
  entriesApprovalLevels: [
    { id: "lv1", role: "accountant", mandatory: true },
    { id: "lv2", role: "finance_manager", mandatory: true },
  ],
  entriesDualApprovalLimit: "50000",
  entriesPnlAccount: "3101",
  entriesRoundingAccount: "5209",
  entriesNotifyApproval: true,
  entriesNotifyRejection: true,
  entriesNotifyDailyPending: false,
  entriesCustomFields: initialSimpleFields,
});

export const approvalRoleOptions = [
  { value: "accountant", label: "محاسب" },
  { value: "finance_manager", label: "مدير مالي" },
  { value: "general_manager", label: "مدير عام" },
  { value: "internal_auditor", label: "مراجع داخلي" },
];

export const defaultAccountOptions = [
  { value: "3101", label: "3101 - الأرباح والخسائر" },
  { value: "5200", label: "5200 - فروقات التقريب" },
  { value: "5209", label: "5209 - فروقات التقريب" },
  { value: "1100", label: "1100 - الصندوق" },
  { value: "2100", label: "2100 - الموردون" },
];

export const entriesResetOptions = [
  { value: "annual", label: "سنوياً" },
  { value: "monthly", label: "شهرياً" },
  { value: "never", label: "بدون تصفير" },
];

export const moduleItems = [
  {
    id: "entries",
    label: "القيود اليومية",
    href: "/accounts/Entries",
    Icon: HiOutlineClipboardDocumentCheck,
    coreLock: true,
    toggleable: false,
    configurable: true,
  },
  {
    id: "simple-entries",
    label: "القيود اليومية السهلة",
    Icon: FiLayers,
    toggleable: true,
    configurable: true,
  },
  {
    id: "coa",
    label: "دليل الحسابات",
    Icon: MdOutlineAccountBalance,
    toggleable: false,
    configurable: true,
    coreLock: true,
  },
  {
    id: "opening-balances",
    label: "الأرصدة الافتتاحية",
    href: "/accounts/opening-balances",
    Icon: LuRocket,
    toggleable: true,
    configurable: true,
  },
  {
    id: "fixed-assets",
    label: "الأصول الثابتة",
    href: "/accounts/FixedAsset",
    Icon: MdOutlineAssessment,
    toggleable: true,
    configurable: true,
  },
  {
    id: "audit",
    label: "عمليات التدقيق",
    href: "/accounts/AuditProcess",
    Icon: MdOutlineFactCheck,
    toggleable: true,
    configurable: true,
  },
];

export const depreciationMethods = [
  { value: "straight-line", label: "القسط الثابت" },
  { value: "units", label: "حسب وحدات الإنتاج" },
  { value: "declining", label: "القسط المتناقص" },
];

export const retentionOptions = [
  { value: "3", label: "3 سنوات" },
  { value: "5", label: "5 سنوات" },
  { value: "7", label: "7 سنوات" },
  { value: "10", label: "10 سنوات" },
];
