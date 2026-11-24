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
  completed: "bg-[#E6F4EA] text-[#2E7D32]",
  draft: "bg-[#F1F5F9] text-[#64748B]",
};

export const purchaseOrderStatusLabels = {
  pending: "بانتظار الاعتماد",
  completed: "مكتمل",
  draft: "مسودة",
};

/** صفوف تاب أوامر الشراء */
export const purchaseOrderRows = [
  {
    id: "1",
    number: "PO-2024-0231",
    reference: "REF-88421",
    vendor: "شركة مدار الشبكات للاتصالات",
    cr: "1010123456",
    location: "الرياض",
    status: "pending",
    issueDate: "12/08/2024",
    deliveryDate: "25/08/2024",
    amount: "15,420.00",
  },
  {
    id: "2",
    number: "PO-2024-0230",
    reference: "REF-88410",
    vendor: "مؤسسة النور للتوريد",
    cr: "4030987654",
    location: "جدة",
    status: "completed",
    issueDate: "10/08/2024",
    deliveryDate: "20/08/2024",
    amount: "28,750.00",
  },
  {
    id: "3",
    number: "PO-2024-0229",
    reference: "REF-88395",
    vendor: "شركة الأفق التجارية",
    cr: "2050678912",
    location: "الدمام",
    status: "draft",
    issueDate: "08/08/2024",
    deliveryDate: "18/08/2024",
    amount: "9,860.00",
  },
  {
    id: "4",
    number: "PO-2024-0228",
    reference: "REF-88380",
    vendor: "مجموعة الخليج للتوريد",
    cr: "1010456789",
    location: "الرياض",
    status: "pending",
    issueDate: "07/08/2024",
    deliveryDate: "17/08/2024",
    amount: "42,100.00",
  },
  {
    id: "5",
    number: "PO-2024-0227",
    reference: "REF-88370",
    vendor: "شركة التقنية الذكية",
    cr: "1010789123",
    location: "الخبر",
    status: "completed",
    issueDate: "05/08/2024",
    deliveryDate: "15/08/2024",
    amount: "33,200.00",
  },
  {
    id: "6",
    number: "PO-2024-0226",
    reference: "REF-88355",
    vendor: "مؤسسة البناء الحديث",
    cr: "4030112233",
    location: "مكة",
    status: "draft",
    issueDate: "03/08/2024",
    deliveryDate: "14/08/2024",
    amount: "12,540.00",
  },
  {
    id: "7",
    number: "PO-2024-0225",
    reference: "REF-88340",
    vendor: "شركة مدار الشبكات للاتصالات",
    cr: "1010123456",
    location: "الرياض",
    status: "completed",
    issueDate: "01/08/2024",
    deliveryDate: "12/08/2024",
    amount: "19,980.00",
  },
  {
    id: "8",
    number: "PO-2024-0224",
    reference: "REF-88325",
    vendor: "مؤسسة النور للتوريد",
    cr: "4030987654",
    location: "جدة",
    status: "pending",
    issueDate: "30/07/2024",
    deliveryDate: "10/08/2024",
    amount: "7,350.00",
  },
];

export const purchaseOrdersTotal = 24;

/** بيانات تاب فاتورة الشراء */
export const purchaseInvoiceDetail = {
  total: "42,850.00",
  currency: "ر.س",
  reference: "INV-2023-10-442",
  issueDate: "15/10/2023",
  linkedPo: "PO-2024-0231",
  dueDate: "30/10/2023",
  supplier: {
    company: "شركة المدى المتقدمة",
    taxId: "300123456700003",
    address: "الرياض، حي العليا، طريق الملك فهد",
    phone: "+966 11 234 5678",
  },
  billing: {
    company: "وكالة مروج للتسويق",
    taxId: "300987654300003",
    address: "الرياض، حي الملقا، شارع الأمير سلطان",
    phone: "+966 11 987 6543",
  },
  paymentMethod: "تحويل بنكي",
  currencyLabel: "الريال السعودي (SAR)",
  items: [
    {
      id: 1,
      name: "طابعة ليزر ملونة - HP",
      quantity: 15,
      unitPrice: "1,850.00",
      tax: "4,162.50",
      total: "31,912.50",
    },
    {
      id: 2,
      name: "لابتوب i7 Core - 1TB SSD - 32GB RAM",
      quantity: 3,
      unitPrice: "3,150.00",
      tax: "1,417.50",
      total: "10,867.50",
    },
  ],
  subtotal: "37,260.87",
  vat: "5,589.13",
  grandTotal: "42,850.00",
};
