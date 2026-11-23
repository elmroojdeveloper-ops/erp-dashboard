export const assetsTotalCount = 1248;

export const statusStyles = {
  active: "bg-[#e8f7ef] text-[#0d7a45]",
  maintenance: "bg-[#fff4e5] text-[#c0824a]",
  disposed: "bg-[#fde8e8] text-[#ba1a1a]",
};

export const iconTones = {
  laptop: "bg-[#e8f1f7] text-primary",
  server: "bg-[#efe8f7] text-[#6b4ea2]",
  car: "bg-[#e8f7f4] text-[#0d7a6b]",
  furniture: "bg-[#fff4e5] text-[#c0824a]",
};

export const assetsRows = [
  {
    id: "AST-2024-001",
    name: "ماك بوك برو",
    category: "أجهزة حاسب آلي",
    status: "في الخدمة",
    statusKey: "active",
    value: "12,450.00",
    icon: "laptop",
  },
  {
    id: "AST-2023-085",
    name: "خادم HP ProLiant",
    category: "معدات تقنية",
    status: "تحت الصيانة",
    statusKey: "maintenance",
    value: "45,800.00",
    icon: "server",
  },
  {
    id: "AST-2022-014",
    name: "سيارة تويوتا كامري",
    category: "مركبات",
    status: "تم التصرف فيه",
    statusKey: "disposed",
    value: "0.00",
    icon: "car",
  },
  {
    id: "AST-2023-112",
    name: "طقم مكاتب إدارية",
    category: "أثاث ومكاتب",
    status: "في الخدمة",
    statusKey: "active",
    value: "22,150.00",
    icon: "furniture",
  },
];

export const statusDistribution = [
  { key: "active", label: "في الخدمة", percent: 68, color: "#08a879" },
  { key: "maintenance", label: "تحت الصيانة", percent: 22, color: "#c0824a" },
  { key: "disposed", label: "تم التصرف", percent: 10, color: "#ba1a1a" },
];

export const netBookValue = {
  title: "صافي القيمة الدفترية",
  value: "4,852,190.00",
  currency: "ر.س",
  trend: "+2.4%",
};

export const depreciationAlerts = [
  {
    id: 1,
    name: "طابعة HP LaserJet",
    detail: "ينتهي الإهلاك خلال 5 أيام",
    value: "3,200.00",
    tone: "danger",
  },
  {
    id: 2,
    name: "سيارة نقل بضائع",
    detail: "ينتهي الإهلاك خلال 12 يوم",
    value: "18,750.00",
    tone: "warning",
  },
];
