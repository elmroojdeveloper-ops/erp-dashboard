/** بيانات تفاصيل أمر الشراء — استبدلها باستدعاء API: GET /purchase-orders/:id */

const po231 = {
  id: "po-2024-231",
  poNumber: "PO-2024-231",
  status: "pending_financial",
  statusLabel: "بانتظار الاعتماد المالي / سقف الترسية",
  deliveryStatus: "partial",
  deliveryStatusLabel: "قيد التوريد المرحلي",
  issueDate: "18 نوفمبر 2024",
  sourceLabel: "مصدر الترسية: مقارنة عروض الأسعار",
  cmpRef: "CMP-2024-019",
  costCenter: "CC-001 - تقنية المعلومات والبنية التحتية",
  toolbar: { listHref: "/accounts/Purches/orders" },
  approval: {
    title: "يتطلب اعتماد إضافي فوري (حوكمة المشتريات والالتزام المالي)",
    body:
      "يتجاوز هذا الأمر حد الصلاحية المباشرة لمدير المشتريات (10,000 ر.س) بإجمالي قيمة 87,975.00 ر.س. المعاملة قيد المراجعة التنظيمية لدى المدير المالي التنفيذي لإطلاق التزامات التوريد والسداد النهائي.",
    authorityBadge: "سقف الصلاحية",
    requiredRole: "المدير المالي التنفيذي",
  },
  summary: {
    title: "ملخص القيمة والالتزام",
    currencyLabel: "SAR (ريال)",
    totalLabel: "إجمالي القيمة المعتمدة (شامل الضريبة 15%):",
    total: "87,975.00",
    subtotal: "76,500.00",
    vat: "11,475.00",
    vatRate: "15%",
    currency: "ر.س",
    paymentTerms: "تحويل بنكي آجل (30 يوماً)",
    expectedDelivery: "24 نوفمبر 2024",
    deliveryLocation: "مستودع السلي المركزي — الرياض",
    deliveryNote: "متبقي 4 أيام على التوريد",
    daysRemaining: 4,
  },
  supplier: {
    name: "شركة الخزائن المتقدمة للتجارة",
    subtitle: "الطرف المنفذ للعقد والشريك التقني",
    tierBadge: "فئة أ (موثق)",
    cr: "1010489201",
    vat: "300192847200003",
    address: "الرياض، طريق الملك فهد، حي الصحافة",
    contact: "م. طارق المنصور (مدير حسابات)",
    phone: "+966 50 123 4567",
    bankName: "مصرف الراجحي",
    iban: "SA44 8000 0213 6080 1011 2345",
  },
  items: [
    {
      id: "1",
      code: "01",
      sku: "SRV-NVME-G4",
      name: "خوادم تخزين سحابية NVMe Gen4 متقدمة",
      specs: "مزدوج Xeon · ذاكرة 512GB · تخزين NVMe 16TB",
      unit: "وحدة سيرفر",
      qty: 2,
      unitPrice: "26,000.00",
      vatRate: 15,
      vatAmount: "7,800.00",
      lineTotal: "59,800.00",
    },
    {
      id: "2",
      code: "02",
      sku: "SEC-ENT3Y",
      name: "تراخيص نظام الحماية وجدار الحماية Enterprise",
      specs: "ترخيص مؤسسي موحد لمدة 3 سنوات",
      unit: "باقة ترخيص",
      qty: 1,
      unitPrice: "19,500.00",
      vatRate: 15,
      vatAmount: "2,925.00",
      lineTotal: "22,425.00",
    },
    {
      id: "3",
      code: "03",
      sku: "FBR-OM4",
      name: "كابلات ألياف ضوئية فائقة السرعة OM4 المجهزة",
      specs: "OM4 · 50 متر · موصلات LC",
      unit: "قطعة",
      qty: 100,
      unitPrice: "50.00",
      vatRate: 15,
      vatAmount: "750.00",
      lineTotal: "5,750.00",
    },
  ],
  totals: {
    subtotal: "76,500.00",
    vat: "11,475.00",
    grand: "87,975.00",
    currency: "ر.س",
    complianceNote:
      "تأكيد المطابقة الفنية: متوافق 100% مع كراسة الشروط RFP-IT-2024",
    itemsCount: 3,
  },
  audit: {
    badge: "قيد المراجعة والتدقيق الرقابي",
    processTitle: "تدقيق التزامات المشتريات — Q4 2024",
    auditor: "د. عمر السليمان (مراقب معتمد)",
    auditDate: "20 نوفمبر 2024 • عينة عشوائية #88",
    note:
      "تم فحص تسلسل الترسية المالية والتأكد من استيفاء شهادة الوكالة الحصرية سارية المفعول، ومطابقة عروض الأسعار المسجلة معاملة مورد الأسعار CMP-2024-019 للأحكام المادة 42 من لائحة المشتريات. لا يوجد تعارض مصالح مسجل مع المورد. بانتظار اكتمال استلام كامل بنود GRN للإقفال النهائي.",
    checklist: [
      "مطابقة ميزانية مركز التكلفة CC-001",
      "توثيق مسار المقارنة CMP-2024-019",
      "تحقق من شهادات الزكاة والضريبة",
    ],
  },
  attachments: [
    {
      id: "a1",
      name: "شهادة الوكالة الحصرية",
      size: "2.4 ميجابايت",
      type: "PDF",
      verified: true,
    },
    {
      id: "a2",
      name: "العرض المالي المعتمد CMP019",
      size: "1.2 ميجابايت",
      type: "PDF",
      verified: true,
    },
    {
      id: "a3",
      name: "جدول المواصفات الفنية",
      size: "88 كيلوبايت",
      type: "PDF",
      verified: false,
    },
  ],
  activities: [
    {
      id: "e1",
      tone: "orange",
      title: "إنشاء مسودة أمر الشراء الآلية",
      description:
        "استيراد بنود الترسية الفائزة للمورد شركة الخزائن المتقدمة للتجارة",
      time: "18 نوفمبر 2024 — 09:30 ص",
      by: "سلطان العتيبي (مدير المشتريات)",
    },
    {
      id: "e2",
      tone: "green",
      title: "المطابقة الآلية لسقف الميزانية والموافقة النظامية",
      description:
        "حجز مبلغ 87,975.00 ر.س من مخصصات البند CC-001 بنجاح دون وجود عجز",
      time: "18 نوفمبر 2024 — 10:15 ص",
      by: "النظام: ROOJ Fiscal Core",
    },
    {
      id: "e3",
      tone: "amber",
      title: "تصعيد تلقائي لطلب الاعتماد المالي الإضافي",
      description:
        "إرسال إشعار عاجل للمدير المالي (تجاوز السقف المحدد 10,000 ر.س)",
      time: "18 نوفمبر 2024 — 11:00 ص",
      by: "محرك الحوكمة والصلاحيات",
    },
    {
      id: "e4",
      tone: "blue",
      title: "إدراج الأمر في عينة التدقيق الدوري الداخلي",
      description:
        "اختيار المعاملة ضمن تدقيق مشتريات الربع الرابع لتوثيق الالتزام",
      time: "19 نوفمبر 2024 — 02:40 م",
      by: "د. عمر السليمان (إدارة التدقيق الداخلي)",
    },
  ],
};

const byTableId = {
  "1": {
    ...po231,
    id: "1",
    poNumber: "PO-2024-049",
    statusLabel: "بانتظار الاعتماد",
    deliveryStatusLabel: "قيد التسليم",
  },
  "2": {
    ...po231,
    id: "2",
    poNumber: "PO-2024-042",
    statusLabel: "قيد التنفيذ والشحن",
    deliveryStatusLabel: "تسليم جزئي مؤكد",
    summary: {
      ...po231.summary,
      total: "425,000.00",
      subtotal: "369,565.22",
      vat: "55,434.78",
    },
    totals: {
      ...po231.totals,
      subtotal: "369,565.22",
      vat: "55,434.78",
      grand: "425,000.00",
    },
  },
};

const detailsByKey = {
  "po-2024-231": po231,
  "po-2024-0231": po231,
  po2024231: po231,
  "po-2024-049": byTableId["1"],
  "po-2024-042": byTableId["2"],
  ...byTableId,
};

function normalizeKey(id) {
  if (id == null || id === "") return "po-2024-231";
  const raw = String(id).trim();
  const slug = raw.toLowerCase().replace(/\s+/g, "-");
  if (detailsByKey[raw]) return raw;
  if (detailsByKey[slug]) return slug;
  return slug;
}

export async function fetchPurchaseOrderDetail(id, { signal } = {}) {
  void signal;
  return getPurchaseOrderDetail(id);
}

export function getPurchaseOrderDetail(id) {
  const key = normalizeKey(id);
  const hit = detailsByKey[key] ?? detailsByKey[id];
  if (hit) return { ...hit, id: hit.id || key };
  return {
    ...po231,
    id: key,
    poNumber: id && String(id).toUpperCase().startsWith("PO") ? String(id) : `PO-${key}`,
  };
}