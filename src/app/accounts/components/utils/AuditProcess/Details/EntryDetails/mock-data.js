/* تفاصيل قيد داخل عملية تدقيق — حسب auditId + entryId */

const SHARED_LINES = [
  {
    account: "510101",
    accountName: "مصروفات إدارية عامة",
    description: "المكتب الرئيسي - دفعة يونيو",
    tax: "15% VAT",
    costCenter: "الإدارة العامة",
    debit: "5000.00",
    credit: "0.00",
    highlighted: false,
  },
  {
    account: "510301",
    accountName: "مصروف الصيانة",
    description: "قسم الصيانة - دفعة يونيو",
    tax: "15% VAT",
    costCenter: "قسم الصيانة",
    debit: "3000.00",
    credit: "0.00",
    highlighted: false,
  },
  {
    account: "110103",
    accountName: "البنك المحلي",
    description: "الحساب الجاري - سداد",
    tax: "—",
    costCenter: "—",
    debit: "0.00",
    credit: "8000.00",
    highlighted: true,
  },
];

const SHARED_ACTIVITY = [
  {
    type: "created",
    title: "إنشاء القيد",
    description: "تم إنشاء المسودة بواسطة أحمد العلي",
    date: "21 يونيو 2026 - 10:15 ص",
  },
  {
    type: "review",
    title: "إرسال للمراجعة",
    description: "تم تحويل الحالة للمراجعة ضمن عملية التدقيق",
    date: "21 يونيو 2026 - 11:30 ص",
  },
];

const SHARED_NOTES = [
  {
    text: "يرجى التأكد من إرفاق صورة العقد الموحد للمرفقات قبل الاعتماد النهائي.",
    author: "سارة محمود (المدير المالي)",
  },
];

const ENTRY_DETAILS_MAP = {
  "JE/2023/00124": {
    id: "JE/2023/00124",
    displayId: "MISC/2026/06/0001",
    title: "قيد توزيع تكاليف الإيجار الشهري على الأقسام",
    reference: "REF-2026-0441",
    journal: "عمليات متنوعة",
    accountingDate: "21 يونيو 2026",
    currency: "ريال سعودي — SAR",
    total: "8000.00",
    status: "published", // منشور → يظهر مطابق / غير مطابق
    statusLabel: "منشور",
    lines: SHARED_LINES,
    activity: SHARED_ACTIVITY,
    notes: SHARED_NOTES,
  },
  "JE/2023/00123": {
    id: "JE/2023/00123",
    displayId: "JE/2023/00123",
    title: "صرف رواتب شهر أكتوبر",
    reference: "REF-2023-1120",
    journal: "البنك",
    accountingDate: "23 أكتوبر 2023",
    currency: "ريال سعودي — SAR",
    total: "3252.00",
    status: "published",
    statusLabel: "منشور",
    lines: [
      {
        account: "510201",
        accountName: "الراتب الأساسي",
        description: "رواتب أكتوبر",
        tax: "—",
        costCenter: "الموارد البشرية",
        debit: "3252.00",
        credit: "0.00",
        highlighted: false,
      },
      {
        account: "110103",
        accountName: "البنك المحلي",
        description: "صرف رواتب",
        tax: "—",
        costCenter: "—",
        debit: "0.00",
        credit: "3252.00",
        highlighted: true,
      },
    ],
    activity: SHARED_ACTIVITY,
    notes: SHARED_NOTES,
  },
  "JE/2023/00122": {
    id: "JE/2023/00122",
    displayId: "JE/2023/00122",
    title: "تسوية مصروفات نثرية",
    reference: "REF-2023-1098",
    journal: "الصندوق",
    accountingDate: "22 أكتوبر 2023",
    currency: "ريال سعودي — SAR",
    total: "46436.00",
    status: "posted", // مرحّل
    statusLabel: "مرحّل",
    lines: SHARED_LINES.map((row, i) =>
      i === 0
        ? { ...row, debit: "46436.00", credit: "0.00" }
        : i === 2
          ? { ...row, debit: "0.00", credit: "46436.00" }
          : { ...row, debit: "0.00", credit: "0.00" }
    ),
    activity: [
      ...SHARED_ACTIVITY,
      {
        type: "created",
        title: "الترحيل",
        description: "تم ترحيل القيد إلى الأستاذ العام",
        date: "22 أكتوبر 2023 - 02:00 م",
      },
    ],
    notes: SHARED_NOTES,
  },
  "JE/2024/00123": {
    id: "JE/2024/00123",
    displayId: "JE/2024/00123",
    title: "قيد غير متوازن — يحتاج مراجعة",
    reference: "REF-2024-0088",
    journal: "الحسابات الختامية",
    accountingDate: "15 أبريل 2024",
    currency: "ريال سعودي — SAR",
    total: "1245600.00",
    status: "published",
    statusLabel: "منشور",
    lines: SHARED_LINES,
    activity: SHARED_ACTIVITY,
    notes: [
      {
        text: "القيد غير متوازن ويحتاج تدخل فوري من المحاسب.",
        author: "نظام التدقيق",
      },
    ],
  },
};

const DEFAULT_ENTRY = {
  id: "UNKNOWN",
  displayId: "MISC/2026/06/0001",
  title: "قيد داخل عملية تدقيق",
  reference: "REF-0000",
  journal: "عمليات متنوعة",
  accountingDate: "21 يونيو 2026",
  currency: "ريال سعودي — SAR",
  total: "8000.00",
  status: "published",
  statusLabel: "منشور",
  lines: SHARED_LINES,
  activity: SHARED_ACTIVITY,
  notes: SHARED_NOTES,
};

export function getAuditEntryDetail(auditId, entryId) {
  const decoded = decodeURIComponent(entryId || "");
  const base = ENTRY_DETAILS_MAP[decoded];

  if (!base) {
    return {
      ...DEFAULT_ENTRY,
      id: decoded || "غير معروف",
      auditId,
      notFound: !decoded,
      prevId: null,
      nextId: null,
    };
  }

  const keys = Object.keys(ENTRY_DETAILS_MAP);
  const index = keys.indexOf(decoded);

  return {
    ...base,
    auditId,
    prevId: index > 0 ? keys[index - 1] : null,
    nextId: index >= 0 && index < keys.length - 1 ? keys[index + 1] : null,
    notFound: false,
  };
}
