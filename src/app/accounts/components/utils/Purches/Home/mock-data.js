export const statusStyles = {
  approved: "bg-[#E6F4EA] text-[#2E7D32]",
  pending: "bg-[#FFF3E0] text-[#E65100]",
  rejected: "bg-[#FDECEC] text-[#C62828]",
};

export const statusLabels = {
  approved: "تمت الموافقة",
  pending: "بانتظار الاعتماد",
  rejected: "مرفوض",
};

export const detailTabs = [
  { id: "details", label: "التفاصيل" },
  { id: "quotes", label: "طلبات عروض الأسعار" },
  { id: "offers", label: "عروض أسعار الموردين" },
  { id: "orders", label: "أوامر الشراء" },
  { id: "invoice", label: "فاتورة الشراء" },
  { id: "activity", label: "سجل النشاطات" },
];

export const quoteStatusStyles = {
  selected: "bg-[#E6F4EA] text-[#2E7D32]",
  expired: "bg-[#F1F5F9] text-[#64748B]",
  rejected: "bg-[#FDECEC] text-[#C62828]",
  awaiting: "bg-[#E8F4FC] text-[#1B7398]",
};

export const quoteStatusLabels = {
  selected: "مختار",
  expired: "منتهي الصلاحية",
  rejected: "مرفوض",
  awaiting: "بالانتظار الرد",
};

export const quoteFilterStatuses = [
  { value: "all", label: "جميع الحالات" },
  { value: "selected", label: "مختار" },
  { value: "awaiting", label: "بالانتظار الرد" },
  { value: "expired", label: "منتهي الصلاحية" },
  { value: "rejected", label: "مرفوض" },
];

export const quoteRequestsCards = [
  {
    id: "requested",
    title: "تم الطلب",
    value: "24",
    featured: true,
  },
  {
    id: "received",
    title: "تم الاستلام",
    value: "223",
    featured: false,
  },
  {
    id: "expiring",
    title: "أوشكت على الانتهاء",
    value: "5",
    featured: false,
  },
  {
    id: "rejected",
    title: "مرفوضة ومغلقة",
    value: "15",
    featured: false,
    danger: true,
  },
];

export const quoteRequestsTotal = 48;

/** صفوف تاب طلبات عروض الأسعار */
export const quoteRequestRows = [
  {
    id: "1",
    date: "15/08/2024",
    number: "RFQ-2024-015",
    vendor: "شركة المدى المتقدمة",
    vendorLocation: "الرياض، السعودية",
    source: "قسم التسويق",
    dueDate: "20/08/2024",
    category: "مادي",
    status: "selected",
  },
  {
    id: "2",
    date: "14/08/2024",
    number: "RFQ-2024-014",
    vendor: "مؤسسة النور للتوريد",
    vendorLocation: "جدة، السعودية",
    source: "قسم العمليات",
    dueDate: "18/08/2024",
    category: "رقمي",
    status: "awaiting",
  },
  {
    id: "3",
    date: "13/08/2024",
    number: "RFQ-2024-013",
    vendor: "شركة الأفق التجارية",
    vendorLocation: "الدمام، السعودية",
    source: "تكنولوجيا المعلومات",
    dueDate: "17/08/2024",
    category: "مادي",
    status: "expired",
  },
  {
    id: "4",
    date: "12/08/2024",
    number: "RFQ-2024-012",
    vendor: "مجموعة الخليج للتوريد",
    vendorLocation: "الرياض، السعودية",
    source: "قسم التسويق",
    dueDate: "16/08/2024",
    category: "خدمي",
    status: "rejected",
  },
  {
    id: "5",
    date: "11/08/2024",
    number: "RFQ-2024-011",
    vendor: "شركة المدى المتقدمة",
    vendorLocation: "الرياض، السعودية",
    source: "الموارد البشرية",
    dueDate: "15/08/2024",
    category: "رقمي",
    status: "awaiting",
  },
  {
    id: "6",
    date: "10/08/2024",
    number: "RFQ-2024-010",
    vendor: "مؤسسة البناء الحديث",
    vendorLocation: "مكة، السعودية",
    source: "قسم المالية",
    dueDate: "14/08/2024",
    category: "مادي",
    status: "selected",
  },
  {
    id: "7",
    date: "09/08/2024",
    number: "RFQ-2024-009",
    vendor: "شركة التقنية الذكية",
    vendorLocation: "الخبر، السعودية",
    source: "تكنولوجيا المعلومات",
    dueDate: "13/08/2024",
    category: "رقمي",
    status: "expired",
  },
  {
    id: "8",
    date: "08/08/2024",
    number: "RFQ-2024-008",
    vendor: "مؤسسة النور للتوريد",
    vendorLocation: "جدة، السعودية",
    source: "قسم التسويق",
    dueDate: "12/08/2024",
    category: "مادي",
    status: "awaiting",
  },
  {
    id: "9",
    date: "07/08/2024",
    number: "RFQ-2024-007",
    vendor: "شركة الأفق التجارية",
    vendorLocation: "الدمام، السعودية",
    source: "قسم العمليات",
    dueDate: "11/08/2024",
    category: "خدمي",
    status: "rejected",
  },
  {
    id: "10",
    date: "06/08/2024",
    number: "RFQ-2024-006",
    vendor: "مجموعة الخليج للتوريد",
    vendorLocation: "الرياض، السعودية",
    source: "قسم التسويق",
    dueDate: "10/08/2024",
    category: "مادي",
    status: "selected",
  },
];

/** تفاصيل كاملة لصفحة [id] — بتكمل بيانات الصف لو لقيته */
export function getPurchaseRequestDetail(id) {
  const row = purchaseRequestRows.find((item) => item.id === String(id));

  const base = {
    id: String(id),
    number: row?.number || "PR-2024-082",
    title: row?.description || "طلب شراء لتجهيزات المكتب المفتوح الجديد",
    status: row?.status || "approved",
    createdAt: "12/08/2024",
    createdBy: "عمليات متنوعة",
    requestDate: row?.date ? formatDisplayDate(row.date) : "15/08/2024",
    dueDate: "15/08/2024",
    category: row?.category || "مادي",
    department: row?.source || "قسم التسويق",
    budget: "25,000.00",
    currency: "SAR",
    notes:
      "تحديث أثاث المكتب المفتوح ليتناسب مع الهوية البصرية الجديدة وتعزيز راحة الموظفين في ساعات العمل الطويلة",
    items: [
      {
        id: 1,
        name: "طابعة ليزر ملونة - HP",
        quantity: 15,
        unit: "قطعة",
      },
      {
        id: 2,
        name: "لابتوب i7 Core - 1TB SSD - 32GB RAM",
        quantity: 3,
        unit: "جهاز",
      },
      {
        id: 3,
        name: "لابتوب i7 Core - 1TB SSD - 32GB RAM",
        quantity: 12,
        unit: "قطعة",
      },
    ],
    attachments: [
      {
        id: 1,
        name: "Technical_Specifications_Furniture.pdf",
        label: "مواصفات_الأثاث_الفنية.",
        size: "1.2 MB",
      },
      {
        id: 2,
        name: "Office_Distribution_Plan.jpg",
        label: "مخطط_توزيع_المكاتب.",
        size: "1.2 MB",
      },
    ],
  };

  return base;
}

function formatDisplayDate(iso) {
  const [y, m, d] = String(iso).split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export const departments = [
  "كل الأقسام",
  "تكنولوجيا المعلومات",
  "الموارد البشرية",
  "التسويق",
  "المالية",
  "العمليات",
];

export const categories = ["الكل", "رقمي", "مادي", "خدمي"];

export const statuses = [
  { value: "all", label: "جميع الحالات" },
  { value: "pending", label: "بانتظار الاعتماد" },
  { value: "approved", label: "تم الموافقة" },
  { value: "rejected", label: "مرفوض" },
];

export const purchaseRequestRows = [
  {
    id: "1",
    date: "2023-10-24",
    number: "JE/2023/00124",
    description: "تجديد تراخيص البرمجيات السنوية للأنظمة الداخلية",
    source: "تكنولوجيا المعلومات",
    requester: "خالد عبدالله",
    category: "رقمي",
    status: "pending",
  },
  {
    id: "2",
    date: "2023-10-22",
    number: "JE/2023/00118",
    description: "شراء أجهزة لابتوب للموظفين الجدد",
    source: "الموارد البشرية",
    requester: "محمد ناصر",
    category: "مادي",
    status: "approved",
  },
  {
    id: "3",
    date: "2023-10-20",
    number: "JE/2023/00112",
    description: "توريد مواد دعائية للحملة التسويقية",
    source: "التسويق",
    requester: "سارة إبراهيم",
    category: "مادي",
    status: "rejected",
  },
  {
    id: "4",
    date: "2023-10-18",
    number: "JE/2023/00105",
    description: "اشتراك سنوي في منصة التحليلات السحابية",
    source: "تكنولوجيا المعلومات",
    requester: "أحمد المنصور",
    category: "رقمي",
    status: "approved",
  },
  {
    id: "5",
    date: "2023-10-15",
    number: "JE/2023/00098",
    description: "صيانة دورية لمعدات المكتب والطباعة",
    source: "العمليات",
    requester: "نورة العتيبي",
    category: "خدمي",
    status: "pending",
  },
  {
    id: "6",
    date: "2023-10-12",
    number: "JE/2023/00091",
    description: "شراء أثاث مكتبي للفرع الجديد",
    source: "المالية",
    requester: "فهد الشمري",
    category: "مادي",
    status: "approved",
  },
];



/** صفوف تاب عروض أسعار الموردين (مطابقة للديزاين) */
const vendorQuoteBaseRows = [
  {
    id: "qt-00124",
    number: "QT-2024-00124",
    validity: { text: "صالح حتى 18 نوفمبر 2024", tone: "muted" },
    vendor: "شركة مدار الشبكات للاتصالات",
    vendorMeta: "س.ت: 1010398421",
    vendorDot: true,
    source: {
      type: "rfq",
      label: "RFQ-2024-0156",
      note: "مرتبط بمناقصة رسمية",
    },
    date: "18 أكتوبر 2024",
    time: "10:45 ص",
    costCenter: "تكنولوجيا المعلومات",
    costCenterCode: "CC-001",
    status: "compare",
    amount: "185,400.00",
    amountNote: "ر.س • ضريبة 15% مشمولة",
    amountTone: "primary",
  },
  {
    id: "qt-00892",
    number: "QT-2024-00892",
    validity: { text: "صالح حتى 25 نوفمبر 2024", tone: "muted" },
    vendor: "شركة النخبة للتوريدات الفنية",
    vendorMeta: "س.ت: 1010884920",
    vendorDot: false,
    source: {
      type: "rfq",
      label: "RFQ-2024-0156",
      note: "مرتبط بمناقصة رسمية",
    },
    date: "19 أكتوبر 2024",
    time: "02:15 م",
    costCenter: "تكنولوجيا المعلومات",
    costCenterCode: "CC-001",
    status: "compare",
    amount: "192,850.00",
    amountNote: "ر.س • ضريبة 15% مشمولة",
    amountTone: "primary",
  },
  {
    id: "pq-0891-a",
    number: "PQ-2024-0891",
    validity: { text: "صالح حتى 05 نوفمبر 2024", tone: "muted" },
    vendor: "شركة مدار الشبكات للاتصالات",
    vendorMeta: "شراء قطع غيار فورية",
    vendorDot: true,
    source: {
      type: "exception",
      label: "استثنائي (RFQ خارج)",
      note: "طلب عاجل لتفادي توقف الشبكة",
    },
    date: "20 أكتوبر 2024",
    time: "09:10 ص",
    costCenter: "تكنولوجيا المعلومات",
    costCenterCode: "CC-001",
    status: "received",
    amount: "11,672.50",
    amountNote: "ر.س • تسليم فوري (مستودع الرياض)",
    amountTone: "default",
  },
  {
    id: "pq-0891-b",
    number: "PQ-2024-0891",
    validity: { text: "صالح حتى 05 نوفمبر 2024", tone: "muted" },
    vendor: "مؤسسة حلول الإمداد والتقنية",
    vendorMeta: "س.ت: 1010665412",
    vendorDot: false,
    source: {
      type: "rfq",
      label: "RFQ-2024-0142",
      note: "PO-901 أمر شراء",
    },
    date: "14 أكتوبر 2024",
    time: "11:30 ص",
    costCenter: "إدارة العمليات",
    costCenterCode: "CC-004",
    status: "winner",
    amount: "64,200.00",
    amountNote: "ر.س • أفضل تكلفة فنية",
    amountTone: "success",
  },
  {
    id: "pq-0710",
    number: "PQ-2024-0710",
    validity: { text: "مستبعد", tone: "danger" },
    vendor: "شركة التميز للتجهيزات المتطورة",
    vendorMeta: "توريد شاشات عرض تفاعلية",
    vendorDot: false,
    source: {
      type: "market",
      label: "استثنائي",
      note: "استكشاف أسعار السوق",
    },
    date: "10 أكتوبر 2024",
    time: "04:40 م",
    costCenter: "التسويق والفعاليات",
    costCenterCode: "CC-003",
    status: "rejected",
    statusLabel: "تم الرفض (تجاوز الميزانية)",
    amount: "88,000.00",
    amountNote: "ر.س • أعلى من الميزانية المحددة",
    amountTone: "danger",
  },
];

export const vendorQuotesTotal = 24;

// أول 5 صفوف مطابقة للديزاين بالظبط، والباقي تكرار عشان الترقيم (24 عرض) يشتغل
export const vendorQuoteRows = Array.from(
  { length: vendorQuotesTotal },
  (_, i) => {
    const base = vendorQuoteBaseRows[i % vendorQuoteBaseRows.length];
    return i < vendorQuoteBaseRows.length
      ? base
      : { ...base, id: `${base.id}-${i + 1}` };
  }
);

/** صفوف تاب عروض أسعار الموردين */



export const purchaseOrderStatusStyles = {
  pending: "bg-[#FFF3E0] text-[#E65100]",
  in_progress: "bg-[#E8F4FC] text-[#1B7398]",
  completed: "bg-[#E6F4EA] text-[#2E7D32]",
};

export const purchaseOrderStatusLabels = {
  pending: "بانتظار الاعتماد",
  in_progress: "قيد التنفيذ",
  completed: "مكتمل",
};

/** صفوف تاب أوامر الشراء */
export const purchaseOrderRows = [
  {
    id: "1",
    number: "PO-2024-0231",
    referenceLabel: "طلب شراء أصلي PR-2024-082",
    vendor: "شركة مدار الشبكات للاتصالات",
    cr: "1010182390",
    location: "الرياض",
    status: "pending",
    statusNote: "يتجاوز الحد المسموح",
    issueDate: "24-10-2024",
    deliveryDate: "02-11-2024",
    urgency: "warn",
    urgencyLabel: "باقي 8 أيام",
    amount: "15,420.00",
  },
  {
    id: "2",
    number: "PO-2024-0230",
    referenceLabel: "طلب شراء أصلي PR-2024-082",
    vendor: "شركة التقنية المتقدمة",
    cr: "1010492831",
    location: "الرياض",
    status: "in_progress",
    statusNote: "بانتظار الشحن من المورد",
    issueDate: "24-10-2024",
    deliveryDate: "02-11-2024",
    urgency: "late",
    urgencyLabel: "متأخر يومين",
    amount: "15,420.00",
  },
  {
    id: "3",
    number: "PO-2024-0229",
    referenceLabel: "طلب شراء أصلي PR-2024-082",
    vendor: "مؤسسة الحلول الرقمية الذكية",
    cr: "1010329482",
    location: "الدمام",
    status: "completed",
    statusNote: "تم استلام البضاعة والفاتورة",
    issueDate: "24-10-2024",
    deliveryDate: "02-11-2024",
    urgency: "ok",
    urgencyLabel: "في الموعد",
    amount: "15,420.00",
  },
  {
    id: "4",
    number: "PO-2024-0228",
    referenceLabel: "طلب شراء أصلي PR-2024-082",
    vendor: "مجموعة الخليج للتوريد",
    cr: "1010456789",
    location: "الرياض",
    status: "pending",
    statusNote: "يتجاوز الحد المسموح",
    issueDate: "20-10-2024",
    deliveryDate: "28-10-2024",
    urgency: "warn",
    urgencyLabel: "باقي 4 أيام",
    amount: "15,420.00",
  },
  {
    id: "5",
    number: "PO-2024-0227",
    referenceLabel: "طلب شراء أصلي PR-2024-082",
    vendor: "شركة التقنية الذكية",
    cr: "1010789123",
    location: "الخبر",
    status: "in_progress",
    statusNote: "بانتظار الشحن من المورد",
    issueDate: "18-10-2024",
    deliveryDate: "26-10-2024",
    urgency: "late",
    urgencyLabel: "متأخر يومين",
    amount: "15,420.00",
  },
  {
    id: "6",
    number: "PO-2024-0226",
    referenceLabel: "طلب شراء أصلي PR-2024-082",
    vendor: "مؤسسة البناء الحديث",
    cr: "4030112233",
    location: "مكة",
    status: "completed",
    statusNote: "تم استلام البضاعة والفاتورة",
    issueDate: "15-10-2024",
    deliveryDate: "22-10-2024",
    urgency: "ok",
    urgencyLabel: "في الموعد",
    amount: "15,420.00",
  },
];

export const purchaseOrdersTotal = 30;

export const receiptStatusStyles = {
  matched: "bg-[#E6F4EA] text-[#2E7D32]",
  partial: "bg-[#FFF3E0] text-[#E65100]",
  pending: "bg-[#E8F4FC] text-[#1B7398]",
  mismatch: "bg-[#FDECEC] text-[#C62828]",
};

export const receiptStatusLabels = {
  matched: "مطابق بالكامل",
  partial: "استلام جزئي",
  pending: "بانتظار الفحص",
  mismatch: "فروقات",
};

/** صفوف أذون الاستلام */
export const goodsReceiptRows = [
  {
    id: "1",
    number: "GRN-2024-0188",
    poNumber: "PO-2024-0231",
    vendor: "شركة مدار الشبكات للاتصالات",
    warehouse: "مستودع السلي المركزي",
    receivedAt: "02-11-2024",
    status: "matched",
    itemsCount: 4,
    matchedCount: 4,
    amount: "15,420.00",
  },
  {
    id: "2",
    number: "GRN-2024-0187",
    poNumber: "PO-2024-0230",
    vendor: "شركة التقنية المتقدمة",
    warehouse: "مستودع جدة",
    receivedAt: "01-11-2024",
    status: "partial",
    itemsCount: 6,
    matchedCount: 4,
    amount: "12,100.00",
  },
  {
    id: "3",
    number: "GRN-2024-0186",
    poNumber: "PO-2024-0229",
    vendor: "مؤسسة الحلول الرقمية الذكية",
    warehouse: "مستودع السلي المركزي",
    receivedAt: "30-10-2024",
    status: "pending",
    itemsCount: 3,
    matchedCount: 0,
    amount: "8,750.00",
  },
  {
    id: "4",
    number: "GRN-2024-0185",
    poNumber: "PO-2024-0228",
    vendor: "مجموعة الخليج للتوريد",
    warehouse: "مستودع الدمام",
    receivedAt: "28-10-2024",
    status: "mismatch",
    itemsCount: 5,
    matchedCount: 3,
    amount: "9,980.00",
  },
  {
    id: "5",
    number: "GRN-2024-0184",
    poNumber: "PO-2024-0227",
    vendor: "شركة التقنية الذكية",
    warehouse: "مستودع السلي المركزي",
    receivedAt: "26-10-2024",
    status: "matched",
    itemsCount: 2,
    matchedCount: 2,
    amount: "6,400.00",
  },
  {
    id: "6",
    number: "GRN-2024-0183",
    poNumber: "PO-2024-0226",
    vendor: "مؤسسة البناء الحديث",
    warehouse: "مستودع مكة",
    receivedAt: "22-10-2024",
    status: "matched",
    itemsCount: 8,
    matchedCount: 8,
    amount: "21,300.00",
  },
];

export const goodsReceiptsTotal = 24;

export function getGoodsReceiptDetail(id) {
  const row =
    goodsReceiptRows.find((item) => item.id === String(id)) ||
    goodsReceiptRows[0];

  return {
    ...row,
    id: String(id || row.id),
    note: "تتم مطابقة الكميات المستلمة مع بنود أمر الشراء قبل إصدار فاتورة الشراء.",
    items: [
      {
        id: "i1",
        name: "خادم بيانات مركزي",
        orderedQty: 2,
        receivedQty: 2,
        unit: "وحدة",
        status: "matched",
      },
      {
        id: "i2",
        name: "محول شبكة 48 منفذ",
        orderedQty: 4,
        receivedQty: row.status === "partial" ? 2 : 4,
        unit: "وحدة",
        status: row.status === "partial" ? "partial" : "matched",
      },
      {
        id: "i3",
        name: "كابلات ألياف بصرية",
        orderedQty: 20,
        receivedQty:
          row.status === "mismatch" ? 18 : row.status === "pending" ? 0 : 20,
        unit: "متر",
        status:
          row.status === "mismatch"
            ? "mismatch"
            : row.status === "pending"
              ? "pending"
              : "matched",
      },
    ],
  };
}

/** بيانات تاب فاتورة الشراء */
export const purchaseInvoiceDetail = {
  total: "42,850.00",
  currency: "ر.س",
  paymentStatus: "تم الدفع بالكامل",
  reference: "INV-2023-10-442",
  issueDate: "15/10/2023",
  linkedPo: "PO-2024-031",
  dueDate: "14/11/2023",
  supplier: {
    company: "التقنية المتقدمة",
    taxId: "300XXXXXXXXXXXX",
    address: "جدة، التحلية",
    phone: "+966 11 234 5678",
  },
  billing: {
    company: "روح للتطوير",
    taxId: "310XXXXXXXXXXXX",
    address: "جدة، التحلية",
    email: "billing@rooj.com",
  },
  paymentMethod: "حوالة بنكية",
  transactionId: "TRX-88219A",
  currencyLabel: "ريال سعودي (SAR)",
  items: [
    {
      id: 1,
      name: "Dell PowerEdge R750",
      description: "2x Intel Xeon Gold 6330,",
      quantity: 2,
      unitPrice: "8,000.00",
      taxLabel: "15% VAT",
      total: "34,500.00",
      icon: "server",
    },
    {
      id: 2,
      name: "VMware vSphere Enterprise",
      description: "ترخيص لمدة 3 سنوات، يشمل الدعم",
      quantity: 1,
      unitPrice: "7,260.87",
      taxLabel: "15% VAT",
      total: "8,350.00",
      icon: "key",
    },
  ],
  subtotal: "37,260.87",
  vat: "5,589.13",
  grandTotal: "42,850.00",
};

/** صفوف تاب سجل النشاطات */
export const activityLogRows = [
  {
    id: "1",
    type: "attachment",
    time: "اليوم، 10:45 ص",
    actionLabel: "إضافة مرفق",
    actor: "ليلى منصور",
    role: "قسم العمليات • فرع الرياض",
    avatarColor: "#7C9CBF",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    attachment: {
      name: "عرض_سعر_توريد.pdf",
      size: "2.4 MB",
    },
  },
  {
    id: "2",
    type: "approval",
    time: "أمس، 02:15 م",
    actionLabel: "اعتماد الطلب",
    actor: "د. محمد القحطاني",
    role: "المدير المالي • الإدارة العامة",
    avatarColor: "#5B7C99",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    comment:
      "تمت المراجعة والاعتماد بناءً على الميزانية المعتمدة للربع الثالث. يرجى المتابعة مع المورد",
  },
  {
    id: "3",
    type: "status",
    time: "14 أغسطس، 09:00 ص",
    actionLabel: null,
    actor: "النظام (تلقائي)",
    role: null,
    isSystem: true,
    statusChange: {
      from: "مسودة",
      to: "قيد المراجعة",
    },
  },
  {
    id: "4",
    type: "create",
    time: "14 أغسطس، 08:30 ص",
    actionLabel: "إنشاء طلب",
    actor: "سلطان العتيبي",
    role: "منسق مشتريات • قسم تكنولوجيا المعلومات",
    avatarColor: "#2578A2",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    message:
      "قام بإنشاء طلب شراء جديد لأجهزة حاسب آلي محمولة (عدد 5) للموظفين الجدد.",
  },
];
