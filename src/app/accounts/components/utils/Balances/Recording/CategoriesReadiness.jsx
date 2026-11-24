"use client";

import React from "react";
import { FiCheck, FiClock } from "react-icons/fi";
import {
  FaArchive,
  FaBuilding,
  FaLandmark,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineQrCode2 } from "react-icons/md";

const DEFAULT_CATEGORIES = [
  {
    id: "coa",
    label: "شجرة الحسابات العامة (Chart of Accounts)",
    statusText: "مكتمل 100%",
    variant: "complete",
    icon: FaLandmark,
  },
  {
    id: "customers",
    label: "أرصدة العملاء والذمم المدينة",
    statusText: "مكتمل 100%",
    variant: "complete",
    icon: FaUsers,
  },
  {
    id: "suppliers",
    label: "أرصدة الموردين والذمم الدائنة",
    statusText: "قيد المطابقة 50%",
    variant: "pending",
    icon: FaTruck,
  },
  {
    id: "inventory",
    label: "بضاعة أول المدة ومخزون المستودعات",
    statusText: "مسودة جارية 45%",
    variant: "draft",
    icon: FaArchive,
  },
  {
    id: "fixed-assets",
    label: "الأصول الثابتة ومجمعات الإهلاك",
    statusText: "مكتمل ومربوط",
    variant: "complete",
    icon: FaBuilding,
  },
];

const StatusBadge = ({ item }) => {
  if (item.variant === "complete") {
    return (
      <span className="inline-flex items-center gap-1 rounded-[5px] border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-0.5 text-[10.5px] font-bold text-[#047857]">
        <FiCheck className="size-2.5 stroke-[2.5]" />
        <span>{item.statusText}</span>
      </span>
    );
  }

  if (item.variant === "pending") {
    return (
      <span className="inline-flex items-center gap-1 rounded-[5px] border border-[#FDE68A] bg-[#FFFBEB] px-2 py-0.5 text-[10.5px] font-bold text-[#B45309]">
        <FiClock className="size-2.5" />
        <span>{item.statusText}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-[5px] border border-[#D6DEE6] bg-[#F4F7FA] px-2 py-0.5 text-[10.5px] font-semibold text-[#64748B]">
      <span>{item.statusText}</span>
    </span>
  );
};

const CategoriesReadiness = ({
  categories = DEFAULT_CATEGORIES,
  onLinkZatca,
}) => {
  return (
    <section
      dir="rtl"
      className="flex h-full flex-col justify-between rounded-[12px] border border-[#E6ECEF] bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-5 items-center justify-center rounded-[5px] bg-[#E3F3EA] text-[#0b6b45]">
              <FiCheck className="size-3 stroke-[2.5]" />
            </span>
            <h2 className="text-[14px] font-bold text-[#1E293B]">
              جاهزية الفئات الخمس والامتثال
            </h2>
          </div>

          <button
            type="button"
            onClick={onLinkZatca}
            className="inline-flex shrink-0 cursor-pointer items-center rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-[10px] font-bold text-[#047857] transition hover:bg-[#D1FAE5]"
          >
            ربط هيئة الزكاة (ZATCA Phase 2)
          </button>
        </div>

        <p className="mt-2 text-[11.5px] leading-[1.6] text-[#64748B]">
          حالة ربط وتوازن بنود الأرصدة الافتتاحية الأساسية تمهيداً لترحيلها إلى
          الإقرارات الضريبية والقوائم المالية.
        </p>

        <div className="mt-3.5 divide-y divide-[#F1F5F9]">
          {categories.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 text-[12px]"
              >
                <div className="flex min-w-0 items-center gap-2.5 font-semibold text-[#334155]">
                  <IconComp className="size-3.5 shrink-0 text-[#64748B]" />
                  <span className="truncate">{item.label}</span>
                </div>
                <StatusBadge item={item} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#F1F5F9] pt-2.5">
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#64748B]">
          <MdOutlineQrCode2 className="size-8 text-[#334155]" />
          <span>الختم الرقمي الزكوي التأكيدي</span>
        </div>
      </div>
    </section>
  );
};

export default CategoriesReadiness;
