/** بيانات صفحة تفاصيل فاتورة المورد — مطابقة لقطع فيجما */

const inv9041 = {
  id: "inv-9041",
  invoiceNumber: "INV-2024-9041",
  status: "approved",
  header: {
    uuid: "a82f-9041-ksa-zatca",
    badges: [
      { label: "معتمدة ومرحّلة نهائياً", tone: "green" },
      {
        label: "مشفّرة ومختومة (ZATCA e-Invoice Tier 2)",
        tone: "teal",
      },
    ],
    smartCheck: "محرك الفحص الذكي: متطابق 100%",
    registeredAt: "تاريخ التسجيل: 19 نوفمبر 2024",
    journalRef: "JE-2024-8842",
  },
  official: {
    tags: [
      { label: "للقراءة والتدقيق فقط", tone: "gray" },
      { label: "بيانات ضريبية 15%", tone: "amber" },
    ],
    total: "87,975.00",
    currency: "ر.س",
    totalNote: "شامل ضريبة القيمة المضافة 15%",
    taxable: "76,500.00",
    vat: "11,475.00",
    vatRate: "15%",
    paymentNote: "مجدول للدفع في 19 ديسمبر 2024",
    contractualNumber: "INV-2024-9041",
    issueDate: "19 نوفمبر 2024",
    dueDate: "19 ديسمبر 2024",
    vendorVat: "300584920100003",
    attachment: "فاتورة_المورد_المعتمدة_INV9041.pdf",
    attachmentNote: "تم التحقق من الختم الرقمي ZATCA",
  },
  linkedPo: {
    badge: "مطابق ومحجوز بالميزانية",
    poNumber: "PO-2024-231",
    approvedVendor: "شركة الخزائن المتقدمة للتجارة والتقنية",
    grnNumber: "GRN-2024-889",
    cr: "1010892341",
    vendorTier: "مورد بلاتيني معتمد",
    supplyVolume:
      "100 وحدة مجدولة (100% مستلمة فعلياً بالكامل والمطابقة)",
    costCenter: "اللوجستيات وتقنية المعلومات",
    budgetRemaining: "342,150.00",
    budgetCurrency: "ر.س",
    budgetNote: "من ميزانية CC-102 لعام 2024",
    footerOk: "معتمد ومفحوص الجودة",
    contractLink: "عرض العقد وملف أمر الشراء",
  },
  matchEngine: {
    version: "v2.4 Enterprise",
    score: 100,
    title: "محرك المطابقة الثلاثية الفورية",
    subtitle:
      "مطابقة تلقائية وفورية بين أمر الشراء المعتمد، وإذن الاستلام، وفاتورة المورد.",
    cards: [
      {
        n: 1,
        title: "أمر الشراء التعاقدي",
        status: "معتمد",
        statusTone: "blue",
        rows: [
          { label: "رقم الأمر", value: "PO-2024-231", accent: true },
          {
            label: "قيمة العقد المعتمدة",
            value: "87,975.00 ر.س",
          },
          { label: "إجمالي الكمية التعاقدية", value: "100 قطعة" },
          { label: "مركز التكلفة", value: "CC-102 لوجستيات" },
        ],
        footer: "محجوز بالميزانية بالكامل",
        footerOk: true,
      },
      {
        n: 2,
        title: "الاستلام الفعلي بالمستودع",
        status: "استلام مكتمل ومعتمد",
        statusTone: "green",
        rows: [
          { label: "رقم إذن الاستلام", value: "GRN-2024-889", accent: true },
          { label: "الكمية المستلمة الفعلية", value: "100 قطعة", success: true },
          { label: "تقسيم الدفعات", value: "60 أساسي + 40 إلحاقي" },
          { label: "المستودع المستلم", value: "الرئيسي — الرياض (البوابة 4)" },
        ],
        footer: "سليم ومطابق 100%",
        footerOk: true,
      },
      {
        n: 3,
        title: "مطالبة فاتورة المورد",
        status: "مطابق للتوريد",
        statusTone: "teal",
        rows: [
          { label: "رقم الفاتورة", value: "INV-2024-9041", accent: true },
          {
            label: "إجمالي المطالبة المالية",
            value: "87,975.00 ر.س",
          },
          { label: "كمية الفاتورة", value: "100 قطعة" },
          { label: "فارق السعر/الكمية", value: "0.00 ر.س", success: true },
        ],
        footer: "لا توجد انحرافات سعرية",
        footerOk: true,
      },
    ],
    closeBanner: {
      title:
        "مطابقة تامة — الفاتورة معتمدة ومرحّلة آلياً للأستاذ العام. النظام تحقق من تطابق الأسعار والكميات بين أمر الشراء PO-2024-231 ومستند الاستلام GRN-2024-889 دون تدخل بشري.",
      ifrs: "اجتياز تدقيق 100% وفق معيار IFRS المحاسبي",
    },
  },
  lineItems: {
    approvedCount: 2,
    items: [
      {
        id: "1",
        name: "خزان إيداع مدمج مصفّح — فئة أمان عالي",
        sku: "SAFE-VAULT-HD",
        specs: "أبعاد 180×90×60 سم · درجة حماية L4",
        imageTone: "bg-[#E2E8F0]",
        poQty: 20,
        grnQty: 20,
        grnNote: "توريد أساسي",
        invoiceQty: 20,
        poUnitPrice: "2,150.00",
        invoiceUnitPrice: "2,150.00",
        lineTotal: "43,000.00",
        statusLabel: "مطابق تام",
        match: true,
      },
      {
        id: "2",
        name: "أقفال إلكترونية بيومترية مدعومة بنظام تحقق مركزي",
        sku: "SMART-LOCK-V3",
        specs: "NFC · IP65 · بطارية 12 شهر",
        imageTone: "bg-[#E8F4FC]",
        poQty: 80,
        grnQty: 80,
        grnNote: "توريد إلحاقي",
        invoiceQty: 80,
        poUnitPrice: "418.75",
        invoiceUnitPrice: "418.75",
        lineTotal: "33,500.00",
        statusLabel: "استلام إلحاقي مطابق",
        match: true,
      },
    ],
    totals: {
      units: 100,
      variancePct: "0.0%",
      taxStatus: "مستوفية الشروط الضريبية",
      subtotal: "76,500.00",
      vat: "11,475.00",
      grand: "87,975.00",
      currency: "ر.س",
    },
  },
  accounting: {
    journalRef: "JE-2024-8842",
    intro:
      "تم إنشاء قيد يومية تلقائي للمورد شركة الخزائن المتقدمة مقابل حساب الاستلام غير المفوتر (GR/IR)، المرجع JE-2024-8842.",
    parties: [
      {
        id: "p1",
        party: "بضاعة مستلمة غير مفوترة (GR/IR)",
        code: "210401",
        debit: "76,500.00",
        credit: "—",
      },
      {
        id: "p2",
        party: "ضريبة القيمة المضافة — مدخلات",
        code: "120801",
        debit: "11,475.00",
        credit: "—",
      },
      {
        id: "p3",
        party: "دائنون تجاريون — شركة الخزائن المتقدمة",
        code: "210101-901",
        debit: "—",
        credit: "87,975.00",
      },
    ],
    footerNote: "تم إغلاق حساب GR/IR لهذا الأمر.",
    ledgerLink: "استعراض سند القيد المحاسبي كاملاً في دفتر اليومية العامة",
  },
  audit: {
    governanceBadge: "مستوفي الحوكمة",
    auditNote:
      "مطابقة إلكترونية مع إذن الاستلام GRN-2024-889. القيد مرحّل للأستاذ والدفع مؤكد بتاريخ 19 ديسمبر 2024 — بلا استثناءات.",
    approver: {
      name: "سلطان العتيبي",
      role: "مدير المشتريات والعقود",
      initials: "سع",
      digitalApproved: true,
    },
    checklist: [
      "رقم ضريبي نشط للمورد",
      "شهادات تأمين/زكاة سارية",
      "إيصال إلكتروني موقع من أمين المستودع",
    ],
    hash: "8f2a…c91e",
  },
  activities: [
    {
      id: "a1",
      tone: "green",
      icon: "check",
      title: "اعتماد القيد وترحيله آلياً للأستاذ العام",
      by: "النظام الآلي · إدارة الأستاذ العام (JE-2024-8842)",
      time: "اليوم، 11:30 ص",
    },
    {
      id: "a2",
      tone: "blue",
      icon: "cpu",
      title: "نجاح المطابقة الثلاثية بنسبة 100%",
      by: "محرك الفحص والمطابقة الذكي (Three-Way Match Engine)",
      time: "اليوم، 10:50 ص",
    },
    {
      id: "a3",
      tone: "sky",
      icon: "cloud",
      title: "تسجيل فاتورة المورد ورفع المستندات عبر ZATCA",
      by: "سلطان العتيبي (مدير المشتريات) عبر بوابة المورد الرقمية",
      time: "اليوم، 10:48 ص",
    },
    {
      id: "a4",
      tone: "gray",
      icon: "package",
      title: "ربط إذن الاستلام GRN-2024-889 بأمر الشراء PO-2024-231",
      by: "فهد الدوسري (أمين مستودع الرياض الرئيسي)",
      time: "18 نوفمبر 2024 — 03:15 م",
    },
  ],
  footer: {
    netLabel: "صافي القيمة المستحقة للسداد",
    total: "87,975.00",
    currency: "ر.س",
    vendorShort: "شركة الخزائن المتقدمة",
    statusLabel: "معتمد ومرحّل محاسبياً",
  },
};

const detailsById = {
  "inv-9041": inv9041,
};

export function getPurchaseInvoiceMatchDetail(id) {
  const key = String(id || "inv-9041");
  return detailsById[key] || { ...inv9041, id: key };
}