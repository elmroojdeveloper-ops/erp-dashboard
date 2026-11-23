export const entriesCards = [
  {
    id: "today",
    title: "إجمالي القيود اليوم",
    value: "14",
    featured: true,
    showTrend: true,
  },
  {
    id: "published",
    title: "تم النشر هذا الأسبوع",
    value: "156",
    featured: false,
  },
  {
    id: "pending",
    title: "القيود المعلقة",
    value: "20",
    featured: false,
  },
];

export const entriesRows = [
  {
    id: "JV-2024-0891",
    date: "28/09/2024",
    time: "14:32",
    description: "ترحيل مبيعات المعارض ونقاط البيع اليومية",
    debit: {
      title: "110101 - البنك الأهلي التجاري",
      subtitle: "حسابات النقدية وما في حكمها",
    },
    credit: {
      title: "410100 - إيرادات مبيعات التجزئة",
      subtitle: "حساب الإيرادات التشغيلية",
    },
    amount: "485,200.00",
    type: "آلي",
    typeClass: "bg-surface text-deep",
    status: "مرحّل ومعتمد",
    statusKey: "posted",
    creator: { name: "نظام الـ API الآلي", initials: "POS", tone: "gray" },
    selected: false,
  },
  {
    id: "JV-2024-0890",
    date: "28/09/2024",
    time: "11:15",
    description: "إثبات سداد مستحقات موردي المواد الخام ومستلزمات الإنتاج",
    debit: {
      title: "210301 - شركة الصناعات المتطورة",
      subtitle: "حسابات الموردين التجاريين",
    },
    credit: {
      title: "110102 - بنك الراجحي - الحساب الجاري",
      subtitle: "نقدية بالبنوك",
    },
    amount: "1,240,000.00",
    type: "يدوي",
    typeClass: "bg-cool-gray text-muted",
    status: "مرحّل ومعتمد",
    statusKey: "posted",
    creator: { name: "فيصل الحربي", initials: "FA", tone: "primary" },
    selected: false,
  },
  {
    id: "JV-2024-0889",
    date: "27/09/2024",
    time: "17:45",
    description: "تسوية صرف رواتب وأجور الموظفين والبدلات - شهر سبتمبر",
    debit: {
      title: "510101 - مصروفات الرواتب والأجور",
      subtitle: "المصاريف التشغيلية والإدارية",
    },
    credit: {
      title: "220101 - مخصص مستحقات الرواتب",
      subtitle: "الالتزامات المتداولة",
    },
    amount: "3,850,300.00",
    amountClass: "text-danger",
    type: "يدوي",
    typeClass: "bg-cool-gray text-muted",
    status: "معلّق قيد المراجعة",
    statusKey: "pending",
    creator: { name: "سارة القحطاني", initials: "SA", tone: "primary" },
    selected: true,
    rowClass: "bg-[#ffdad60d]",
  },
  {
    id: "JV-2024-0888",
    date: "26/09/2024",
    time: "09:00",
    description: "إهلاك الأصول الثابتة والآلات ومعدات النقل لشهر سبتمبر",
    debit: {
      title: "520401 - مصروف إهلاك آلات ومعدات",
      subtitle: "مصروفات الإهلاك والاستهلاك",
    },
    credit: {
      title: "120202 - مجمع إهلاك الآلات والمعدات",
      subtitle: "الأصول الثابتة المجمعة",
    },
    amount: "142,850.00",
    type: "آلي",
    typeClass: "bg-surface text-deep",
    status: "مرحّل ومعتمد",
    statusKey: "posted",
    creator: { name: "نظام الأصول الثابتة", initials: "AST", tone: "gray" },
    selected: false,
  },
  {
    id: "JV-2024-0887",
    date: "25/09/2024",
    time: "16:10",
    description: "تسوية عهدة موظفي المشتريات الخارجية وفواتير السفر",
    debit: {
      title: "510302 - مصاريف السفر والانتقال",
      subtitle: "مصروفات إدارية وعمومية",
    },
    credit: {
      title: "110304 - عهد الموظفين المؤقتة",
      subtitle: "أرصدة مدينة أخرى",
    },
    amount: "34,500.00",
    type: "يدوي",
    typeClass: "bg-cool-gray text-muted",
    status: "مسودة",
    statusKey: "draft",
    creator: { name: "محمد كامل", initials: "MK", tone: "muted" },
    idClass: "text-muted",
    selected: true,
  },
];

export const statusStyles = {
  posted: "bg-[#daffe84d] text-[#006545]",
  pending: "bg-[#ffdad6] text-danger",
  draft: "bg-cool-gray text-gray",
};

export const creatorTones = {
  primary: "bg-surface text-primary",
  gray: "bg-cool-gray text-gray",
  muted: "bg-cool-gray text-muted",
};

export const journalBooks = [
  { value: "sales", label: "المبيعات" },
  { value: "purchases", label: "المشتريات" },
  { value: "general", label: "عام" },
  { value: "payroll", label: "الرواتب" },
];

export const currencies = [
  { value: "SAR", label: "ريال سعودي - SAR" },
  { value: "USD", label: "دولار أمريكي - USD" },
  { value: "EUR", label: "يورو - EUR" },
];

export const accountOptions = [
  { value: "110101", label: "نقدية بالخزينة", code: "110101" },
  { value: "110102", label: "بنك الراجحي - الحساب الجاري", code: "110102" },
  { value: "410100", label: "إيرادات مبيعات التجزئة", code: "410100" },
  { value: "210301", label: "شركة الصناعات المتطورة", code: "210301" },
  { value: "510101", label: "مصروفات الرواتب والأجور", code: "510101" },
];

export const taxOptions = [
  { value: "vat", label: "vat" },
  { value: "none", label: "بدون ضريبة" },
  { value: "zero", label: "صفرية" },
];

export const costCenterOptions = [
  { value: "main", label: "مركز التكلفة" },
  { value: "sales", label: "المبيعات" },
  { value: "admin", label: "الإدارة" },
  { value: "ops", label: "العمليات" },
];

export const emptyLineItem = () => ({
  account: "",
  description: "",
  tax: "vat",
  costCenter: "main",
  debit: "",
  credit: "",
});

/** بيانات شاشة التفاصيل مطابقة لـ Figma */
export const detailDesignData = {
  displayId: "MISC/2026/06/0001",
  title: "قيد توزيع تكاليف الإيجار الشهري على الأقسام",
  reference: "REF-2026-0441",
  journal: "عمليات متنوعة",
  accountingDate: "21 يونيو 2026",
  currency: "ريال سعودي — SAR",
  total: "8000.00",
  lines: [
    {
      account: "110101",
      accountName: "نقدية بالخزينة",
      description: "المكتب الرئيسي - دفعة يونيو",
      tax: "15% VAT",
      costCenter: "الإدارة العامة",
      debit: "5000.00",
      credit: "0.00",
      highlighted: false,
    },
    {
      account: "510201",
      accountName: "مصروف الإيجار",
      description: "قسم المبيعات - دفعة يونيو",
      tax: "15% VAT",
      costCenter: "قسم المبيعات",
      debit: "3000.00",
      credit: "0.00",
      highlighted: false,
    },
    {
      account: "110103",
      accountName: "البنك الأهلي",
      description: "الحساب الجاري - سداد إيجار",
      tax: "—",
      costCenter: "—",
      debit: "0.00",
      credit: "8000.00",
      highlighted: true,
    },
  ],
  notes: [
    {
      text: "يرجى التأكد من إرفاق صورة العقد الموحد للمرفقات قبل الترحيل النهائي.",
      author: "سارة محمود (المدير المالي)",
    },
  ],
};

export function getEntryDetail(id) {
  const decoded = decodeURIComponent(id || "");
  const row = entriesRows.find((item) => item.id === decoded);
  const index = entriesRows.findIndex((item) => item.id === decoded);

  if (!row) {
    return {
      ...detailDesignData,
      id: decoded || "غير معروف",
      status: "pending",
      prevId: null,
      nextId: null,
      notFound: true,
    };
  }

  const status = row.statusKey;
  const activity =
    status === "posted"
      ? [
          {
            type: "created",
            title: "إنشاء القيد",
            description: "تم إنشاء المسودة بواسطة أحمد العلي",
            date: "21 يونيو 2026 - 10:15 ص",
          },
          {
            type: "review",
            title: "إرسال للمراجعة",
            description: "تم تحويل الحالة للمراجعة المالية",
            date: "21 يونيو 2026 - 11:30 ص",
          },
          {
            type: "created",
            title: "الاعتماد النهائي",
            description: "تم اعتماد القيد وترحيله بنجاح",
            date: "21 يونيو 2026 - 12:00 م",
          },
        ]
      : status === "draft"
        ? [
            {
              type: "created",
              title: "إنشاء القيد",
              description: `تم إنشاء المسودة بواسطة ${row.creator.name}`,
              date: "21 يونيو 2026 - 10:15 ص",
            },
            {
              type: "pending",
              title: "بانتظار الإكمال",
              description: "المسودة لم تُرسل للمراجعة بعد",
              date: "",
            },
          ]
        : [
            {
              type: "created",
              title: "إنشاء القيد",
              description: "تم إنشاء المسودة بواسطة أحمد العلي",
              date: "21 يونيو 2026 - 10:15 ص",
            },
            {
              type: "review",
              title: "إرسال للمراجعة",
              description: "تم تحويل الحالة للمراجعة المالية",
              date: "21 يونيو 2026 - 11:30 ص",
            },
            {
              type: "pending",
              title: "الاعتماد النهائي",
              description: "بانتظار الإجراء...",
              date: "",
            },
          ];

  return {
    ...detailDesignData,
    id: detailDesignData.displayId,
    routeId: row.id,
    status,
    activity,
    notes: status === "draft" ? [] : detailDesignData.notes,
    prevId: index > 0 ? entriesRows[index - 1].id : null,
    nextId: index < entriesRows.length - 1 ? entriesRows[index + 1].id : null,
    notFound: false,
  };
}
