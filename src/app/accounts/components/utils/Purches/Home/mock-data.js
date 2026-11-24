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

export const quoteRequestsTotal = 48;

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

export const vendorQuoteStatusStyles = {
  comparison: "bg-[#E8F4FC] text-[#1B7398]",
  pending: "bg-[#F1F5F9] text-[#475569]",
  rejected: "bg-[#FDECEC] text-[#C62828]",
};

export const vendorQuoteStatusLabels = {
  comparison: "مختار للمقارنة",
  pending: "بانتظار الاعتماد",
  rejected: "مرفوض",
};

/** صفوف تاب عروض أسعار الموردين */
export const vendorQuoteRows = [
  {
    id: "1",
    number: "QT-2024-00124",
    vendor: "شركة المدى المتقدمة",
    rfq: "RFQ-2024-0156",
    submittedAt: "18 أكتوبر 2024",
    costCenter: "تكنولوجيا المعلومات",
    costCenterCode: "CC-001",
    status: "comparison",
    amount: "185,400.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "2",
    number: "QT-2024-00123",
    vendor: "مؤسسة النور للتوريد",
    rfq: "RFQ-2024-0155",
    submittedAt: "17 أكتوبر 2024",
    costCenter: "قسم التسويق",
    costCenterCode: "CC-014",
    status: "pending",
    amount: "142,750.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "3",
    number: "QT-2024-00122",
    vendor: "شركة الأفق التجارية",
    rfq: "RFQ-2024-0154",
    submittedAt: "16 أكتوبر 2024",
    costCenter: "قسم العمليات",
    costCenterCode: "CC-008",
    status: "rejected",
    amount: "98,200.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "4",
    number: "QT-2024-00121",
    vendor: "مجموعة الخليج للتوريد",
    rfq: "RFQ-2024-0153",
    submittedAt: "15 أكتوبر 2024",
    costCenter: "الموارد البشرية",
    costCenterCode: "CC-003",
    status: "comparison",
    amount: "210,000.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "5",
    number: "QT-2024-00120",
    vendor: "شركة التقنية الذكية",
    rfq: "RFQ-2024-0152",
    submittedAt: "14 أكتوبر 2024",
    costCenter: "تكنولوجيا المعلومات",
    costCenterCode: "CC-001",
    status: "pending",
    amount: "76,500.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "6",
    number: "QT-2024-00119",
    vendor: "مؤسسة البناء الحديث",
    rfq: "RFQ-2024-0151",
    submittedAt: "13 أكتوبر 2024",
    costCenter: "قسم المالية",
    costCenterCode: "CC-005",
    status: "rejected",
    amount: "55,800.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "7",
    number: "QT-2024-00118",
    vendor: "شركة المدى المتقدمة",
    rfq: "RFQ-2024-0150",
    submittedAt: "12 أكتوبر 2024",
    costCenter: "قسم التسويق",
    costCenterCode: "CC-014",
    status: "comparison",
    amount: "163,900.00",
    taxNote: "شامل الضريبة",
  },
  {
    id: "8",
    number: "QT-2024-00117",
    vendor: "مؤسسة النور للتوريد",
    rfq: "RFQ-2024-0149",
    submittedAt: "11 أكتوبر 2024",
    costCenter: "تكنولوجيا المعلومات",
    costCenterCode: "CC-001",
    status: "pending",
    amount: "120,300.00",
    taxNote: "شامل الضريبة",
  },
];

export const vendorQuotesTotal = 30;

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
