export const TABS = [
  { id: "general", label: "1. الحسابات العامة", count: 6, icon: "doc" },
  { id: "customers", label: "2. العملاء والذمم المدينة", count: 5, icon: "users" },
  { id: "suppliers", label: "3. الموردون والذمم الدائنة", count: 5, icon: "building" },
  { id: "inventory", label: "4. المنتجات والمخزون", count: 5, icon: "box" },
  {
    id: "assets",
    label: "5. الأصول الثابتة ومجمعات الإهلاك",
    count: 5,
    icon: "layers",
  },
];

export const TYPE_STYLES = {
  current_asset: {
    label: "أصول متداولة • بنوك ونقدية",
    className: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
  },
  bank: {
    label: "أصول متداولة • حسابات بنكية",
    className: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
  },
  noncurrent_asset: {
    label: "أصول غير متداولة • عقارات",
    className: "border-[#E9D5FF] bg-[#FAF5FF] text-[#7E22CE]",
  },
  liability: {
    label: "خصوم متداولة • موردين",
    className: "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]",
  },
  equity: {
    label: "حقوق الملكية • رأس المال",
    className: "border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1]",
  },
  receivable: {
    label: "أصول متداولة • ذمم مدينة",
    className: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
  },
  inventory: {
    label: "أصول متداولة • مخزون",
    className: "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]",
  },
  depreciation: {
    label: "مجمع إهلاك • أصول ثابتة",
    className: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
  },
};

export const ROWS_BY_TAB = {
  general: [
    {
      code: "101001",
      name: "صندوق المركز الرئيسي (النقدية)",
      desc: "الخزينة المركزية - مقر الشركة العام",
      type: "current_asset",
      debit: "1,450,000.00",
      credit: "0.00",
    },
    {
      code: "102001",
      name: "مصرف الراجحي - الحساب الجاري الموحد",
      desc: "SA0380000000000102008701234",
      type: "bank",
      debit: "15,275,000.00",
      credit: "0.00",
    },
    {
      code: "105001",
      name: "الأراضي والعقارات الاستثمارية",
      desc: "مجمع مستودعات السلي اللوجستي - الرياض",
      type: "noncurrent_asset",
      debit: "32,500,000.00",
      credit: "0.00",
    },
    {
      code: "201001",
      name: "ذمم الموردين التجاريين المجمعة",
      desc: "التزامات قصيرة الأجل للموردين الرئيسيين",
      type: "liability",
      debit: "0.00",
      credit: "4,225,000.00",
    },
    {
      code: "301001",
      name: "رأس مال صاحب المنشأة",
      desc: "حقوق الملكية الافتتاحية المعتمدة",
      type: "equity",
      debit: "0.00",
      credit: "40,000,000.00",
    },
    {
      code: "201015",
      name: "مورد الأجهزة المكتبية",
      desc: "فواتير مشتريات غير مسددة",
      type: "liability",
      debit: "0.00",
      credit: "5,000,000.00",
    },
  ],
  customers: [
    {
      code: "110201",
      name: "شركة الحلول التقنية المحدودة",
      desc: "ذمم مدينة قائمة - فواتير آجلة",
      type: "receivable",
      debit: "2,340,000.00",
      credit: "0.00",
    },
    {
      code: "110205",
      name: "مؤسسة النور للتجارة",
      desc: "رصيد افتتاحي للعملاء",
      type: "receivable",
      debit: "875,500.00",
      credit: "0.00",
    },
  ],
  suppliers: [
    {
      code: "201001",
      name: "ذمم الموردين التجاريين المجمعة",
      desc: "التزامات قصيرة الأجل للموردين",
      type: "liability",
      debit: "0.00",
      credit: "4,225,000.00",
    },
    {
      code: "201015",
      name: "مورد الأجهزة المكتبية",
      desc: "فواتير شراء غير مسددة",
      type: "liability",
      debit: "0.00",
      credit: "640,000.00",
    },
  ],
  inventory: [
    {
      code: "120101",
      name: "مخزون الفرع الرئيسي",
      desc: "بضاعة أول المدة - المستودع الرئيسي",
      type: "inventory",
      debit: "6,120,000.00",
      credit: "0.00",
    },
    {
      code: "120110",
      name: "مخزون مستودع السلي",
      desc: "بضاعة أول المدة - مستودع السلي",
      type: "inventory",
      debit: "3,480,000.00",
      credit: "0.00",
    },
  ],
  assets: [
    {
      code: "105001",
      name: "الأراضي والعقارات الاستثمارية",
      desc: "مجمع مستودعات السلي اللوجستي - الرياض",
      type: "noncurrent_asset",
      debit: "32,500,000.00",
      credit: "0.00",
    },
    {
      code: "105901",
      name: "مجمع إهلاك المباني والمعدات",
      desc: "مجمع الإهلاك المتراكم حتى تاريخ الافتتاح",
      type: "depreciation",
      debit: "0.00",
      credit: "9,150,500.00",
    },
  ],
};

export const SECTION_TOTALS = {
  general: { debit: "49,225,000.00", credit: "49,225,000.00" },
  customers: { debit: "3,215,500.00", credit: "0.00" },
  suppliers: { debit: "0.00", credit: "4,865,000.00" },
  inventory: { debit: "9,600,000.00", credit: "0.00" },
  assets: { debit: "32,500,000.00", credit: "9,150,500.00" },
};
