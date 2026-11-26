import {
  FiBarChart2,
  FiFile,
  FiFileText,
  FiSettings,
  FiShoppingCart,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineTruck,
} from "react-icons/hi2";
import { IoCalculatorOutline } from "react-icons/io5";
import {
  LuClipboardList,
  LuLayoutDashboard,
  LuPackageCheck,
  LuRocket,
} from "react-icons/lu";
import {
  MdOutlineAssessment,
  MdOutlineDiscount,
  MdOutlinePendingActions,
  MdOutlineRequestQuote,
} from "react-icons/md";

export const navItems = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    href: "/accounts",
    Icon: LuLayoutDashboard,
  },
  {
    id: "accounting",
    label: "المحاسبة",
    href: "/accounts/Entries",
    Icon: IoCalculatorOutline,
    children: [
      {
        id: "entries",
        label: "القيود اليومية",
        href: "/accounts/Entries",
        Icon: HiOutlineClipboardDocumentCheck,
      },
      {
        id: "fixed-assets",
        label: "الأصول الثابتة",
        href: "/accounts/FixedAsset",
        Icon: HiOutlineBuildingOffice2,
      },
      {
        id: "invoices",
        label: "الفواتير",
        href: "/accounts/Invoice",
        Icon: FiFile,
      },
      {
        id: "discount-vouchers",
        label: "شعارات الخصم",
        href: "/accounts/DiscountNotifications",
        Icon: MdOutlineDiscount,
      },
      {
        id: "pending-payments",
        label: "المدفوعات المعلقة",
        href: "/accounts/PaymentReview",
        Icon: MdOutlinePendingActions,
      },
      {
        id: "financial-reports",
        label: "التقارير المالية",
        href: "/accounts/Reports",
        Icon: MdOutlineAssessment,
      },
      {
        id: "comprehensive-reports",
        label: "التقارير الشاملة",
        href: "/accounts/comprehensive-reports",
        Icon: FiFileText,
      },
      {
        id: "audits",
        label: "عمليات التدقيق",
        href: "/accounts/AuditProcess",
        Icon: HiOutlineDocumentMagnifyingGlass,
      },
      {
        id: "opening-balances",
        label: "الأرصدة الافتتاحية",
        href: "/accounts/opening-balances",
        Icon: LuRocket,
      },
      {
        id: "accounting-settings",
        label: "الإعدادات",
        href: "/accounts/accounting-settings",
        Icon: FiSettings,
      },
    ],
  },
  {
    id: "purchases",
    label: "المشتريات",
    href: "/accounts/Purches",
    Icon: FiShoppingCart,
    children: [
      {
        id: "purchase-requests",
        label: "طلب شراء",
        href: "/accounts/Purches",
        Icon: LuClipboardList,
      },
      {
        id: "quote-requests",
        label: "طلب عرض سعر",
        href: "/accounts/Purches/quote-requests",
        Icon: MdOutlineRequestQuote,
      },
      {
        id: "vendor-quotes",
        label: "عروض أسعار الموردين",
        href: "/accounts/Purches/vendor-quotes",
        Icon: HiOutlineDocumentMagnifyingGlass,
      },
      {
        id: "purchase-orders",
        label: "أوامر الشراء",
        href: "/accounts/Purches/orders",
        Icon: FiShoppingCart,
      },
      {
        id: "goods-receipts",
        label: "اذن الاستلام",
        href: "/accounts/Purches/receipts",
        Icon: LuPackageCheck,
      },
      {
        id: "purchase-invoices",
        label: "فاتورة الشراء",
        href: "/accounts/Purches/invoices",
        Icon: FiFileText,
      },
      {
        id: "purchases-settings",
        label: "الإعدادات",
        href: "/accounts/Purches/settings",
        Icon: FiSettings,
      },
    ],
  },
  {
    id: "customers",
    label: "العملاء",
    href: "#",
    Icon: FiUsers,
    children: [],
  },
  {
    id: "suppliers",
    label: "الموردين",
    href: "#",
    Icon: HiOutlineTruck,
    children: [
      {
        id: "suppliers-list",
        label: "قائمة الموردين",
        href: "/accounts/Supliers",
        Icon: FiUsers,
      },
      {
        id: "add-supplier",
        label: "إضافة مورد جديد",
        href: "/accounts/Supliers/AddSupplierPage",
        Icon: FiUserPlus,
      },
      {
        id: "suppliers-reports",
        label: "التقارير",
        href: "/accounts/Supliers/SuppliersReports",
        Icon: FiBarChart2,
      },
      {
        id: "suppliers-settings",
        label: "الإعدادات",
        href: "/accounts/Supliers/Settings",
        Icon: FiSettings,
      },
    ],
  },
  {
    id: "reports",
    label: "التقارير",
    href: "#",
    Icon: MdOutlineAssessment,
    children: [],
  },
  {
    id: "settings",
    label: "الإعدادات",
    href: "#",
    Icon: FiSettings,
    children: [],
  },
];

function normalizePath(path = "") {
  if (!path || path === "#") return "";
  return path.split("?")[0].replace(/\/+$/, "").toLowerCase();
}

export function isRouteActive(pathname, href) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (!current || !target) return false;
  return current === target;
}

export function isGroupActive(pathname, item) {
  if (!item.children?.length) return isRouteActive(pathname, item.href);
  return item.children.some((child) => isRouteActive(pathname, child.href));
}