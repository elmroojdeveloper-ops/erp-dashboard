import { FiFile, FiSettings, FiShoppingCart, FiUsers } from "react-icons/fi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineTruck,
} from "react-icons/hi2";
import { IoCalculatorOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuRocket } from "react-icons/lu";
import {
  MdOutlineAssessment,
  MdOutlineDiscount,
  MdOutlinePendingActions,
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
    href: "#",
    Icon: FiShoppingCart,
    children: [],
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
    children: [],
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

export function isRouteActive(pathname, href) {
  if (!href || href === "#") return false;
  if (href === "/accounts") return pathname === "/accounts";
  if (href === "/accounts/Entries") {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      pathname.startsWith("/accounts/AddEntries")
    );
  }
  if (href === "/accounts/FixedAsset") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (href === "/accounts/Invoice") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (href === "/accounts/PaymentReview") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (href === "/accounts/DiscountNotifications") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isGroupActive(pathname, item) {
  if (!item.children?.length) return isRouteActive(pathname, item.href);
  return item.children.some((child) => isRouteActive(pathname, child.href));
}
