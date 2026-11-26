"use client";

import React, { useMemo, useState } from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { LuLaptop, LuServer, LuCar, LuArmchair } from "react-icons/lu";

const defaultAssets = [
  {
    id: "AST-2024-001",
    name: "ماك بوك برو",
    code: "AST-2024-001",
    icon: "laptop",
    iconBoxClass: "bg-[#e3f1f8] text-[#086382]",
    category: "أجهزة حاسب آلي",
    status: "في الخدمة",
    statusType: "in_service",
    currentValue: "12,450.00",
  },
  {
    id: "AST-2023-085",
    name: "خادم HP ProLiant",
    code: "AST-2023-085",
    icon: "server",
    iconBoxClass: "bg-[#fef3c7] text-[#b45309]",
    category: "معدات تقنية",
    status: "تحت الصيانة",
    statusType: "maintenance",
    currentValue: "45,800.00",
  },
  {
    id: "AST-2022-014",
    name: "سيارة تويوتا كامري",
    code: "AST-2022-014",
    icon: "car",
    iconBoxClass: "bg-[#fde8e8] text-[#c0262d]",
    category: "مركبات",
    status: "تم التصرف فيه",
    statusType: "disposed",
    currentValue: "0.00",
  },
  {
    id: "AST-2023-112",
    name: "طقم مكاتب إدارية",
    code: "AST-2023-112",
    icon: "furniture",
    iconBoxClass: "bg-[#e3f1f8] text-[#086382]",
    category: "أثاث ومكاتب",
    status: "في الخدمة",
    statusType: "in_service",
    currentValue: "22,150.00",
  },
];

const renderAssetIcon = (type) => {
  switch (type) {
    case "laptop":
      return <LuLaptop className="h-[15px] w-[15px]" />;
    case "server":
      return <LuServer className="h-[15px] w-[15px]" />;
    case "car":
      return <LuCar className="h-[15px] w-[15px]" />;
    case "furniture":
      return <LuArmchair className="h-[15px] w-[15px]" />;
    default:
      return <LuLaptop className="h-[15px] w-[15px]" />;
  }
};

const renderStatusDotColor = (statusType) => {
  switch (statusType) {
    case "in_service":
      return "text-[#086382]";
    case "maintenance":
      return "text-[#d97706]";
    case "disposed":
      return "text-[#c0262d]";
    default:
      return "text-[#086382]";
  }
};

const Table = ({
  assets = defaultAssets,
  totalRecords = 24,
  onView,
  onEdit,
  onDelete,
  onSelectRow,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(assets.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const visibleAssets = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return assets.slice(start, start + pageSize);
  }, [assets, safePage]);

  const allVisibleSelected =
    visibleAssets.length > 0 &&
    visibleAssets.every((item) => selectedIds.includes(item.id));

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !visibleAssets.some((item) => item.id === id))
      );
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...visibleAssets.map((item) => item.id)]))
      );
    }
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const startIndex = visibleAssets.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, assets.length);

  return (
    <section
      dir="rtl"
      className="w-full mt-6 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[760px] space-y-2.5">
          {/* Header Bar */}
          <div className="grid grid-cols-[1.1fr_1.4fr_1.1fr_1.1fr_1.9fr_36px] items-center gap-3 rounded-[10px] bg-[#1e769a] px-4 py-2.5 text-[11.5px] font-bold text-white">
            <div className="text-right">الإجراءات</div>
            <div className="text-right">القيمة الحالية (SAR)</div>
            <div className="text-center">الحالة</div>
            <div className="text-center">الفئة</div>
            <div className="text-right">اسم الأصل والكود</div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={toggleAll}
                aria-label="تحديد الكل"
                className="h-[13px] w-[13px] cursor-pointer rounded-[3px] border-white/70 accent-white"
              />
            </div>
          </div>

          {/* Rows */}
          {visibleAssets.map((row) => {
            const isChecked = selectedIds.includes(row.id);

            return (
              <div
                key={row.id}
                onClick={() => onSelectRow?.(row)}
                className="grid cursor-pointer grid-cols-[1.1fr_1.4fr_1.1fr_1.1fr_1.9fr_36px] items-center gap-3 rounded-[12px] border border-[#e6ecf2] bg-white px-4 py-3 transition hover:border-[#cbd5e1]"
              >
                {/* الإجراءات */}
                <div
                  className="flex items-center justify-start gap-2.5 text-[#64748b]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onDelete?.(row)}
                    aria-label={`حذف ${row.name}`}
                    className="rounded p-1 transition hover:bg-[#fdeceb] hover:text-[#c0262d]"
                  >
                    <FiTrash2 className="h-[14px] w-[14px]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit?.(row)}
                    aria-label={`تعديل ${row.name}`}
                    className="rounded p-1 transition hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                  >
                    <FiEdit2 className="h-[14px] w-[14px]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onView?.(row)}
                    aria-label={`عرض ${row.name}`}
                    className="rounded p-1 transition hover:bg-[#e6f3fa] hover:text-[#086382]"
                  >
                    <FiEye className="h-[14px] w-[14px]" />
                  </button>
                </div>

                {/* القيمة الحالية (SAR) */}
                <div className="text-right text-[12px] font-extrabold text-[#0f172a] tabular-nums">
                  {row.currentValue}
                </div>

                {/* الحالة */}
                <div className="text-center text-[11.5px] font-bold text-[#334155]">
                  <span
                    className={`ml-1 inline-block text-[10px] ${renderStatusDotColor(
                      row.statusType
                    )}`}
                  >
                    ●
                  </span>
                  <span>{row.status}</span>
                </div>

                {/* الفئة */}
                <div className="text-center text-[11.5px] font-bold text-[#475569]">
                  {row.category}
                </div>

                {/* اسم الأصل والكود */}
                <div className="flex items-center justify-end gap-2.5 text-right">
                  <div>
                    <div className="text-[12px] font-black leading-[1.35] text-[#0f172a]">
                      {row.name}
                    </div>
                    <div className="mt-0.5 text-[10.5px] font-semibold text-[#64748b]">
                      {row.code}
                    </div>
                  </div>

                  <div
                    className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] ${row.iconBoxClass}`}
                  >
                    {renderAssetIcon(row.icon)}
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className="flex justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`تحديد ${row.name}`}
                    className="h-[13px] w-[13px] cursor-pointer rounded-[3px] border-[#cbd5e1] accent-[#1e769a]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer: Pagination & Audit Summary */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#e6ecf2] bg-white px-4 py-2.5 text-[11px]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="الصفحة التالية"
            className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronRight className="h-3 w-3" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`h-[26px] w-[26px] rounded-full text-[11px] font-extrabold transition ${
              safePage === 1
                ? "bg-[#1e769a] text-white"
                : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
            }`}
          >
            1
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`h-[26px] w-[26px] rounded-full text-[11px] font-extrabold transition ${
              safePage === 2
                ? "bg-[#1e769a] text-white"
                : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
            }`}
          >
            2
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`h-[26px] w-[26px] rounded-full text-[11px] font-extrabold transition ${
              safePage === 3
                ? "bg-[#1e769a] text-white"
                : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
            }`}
          >
            3
          </button>

          <span className="px-1 font-bold text-[#94a3b8]">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            className={`h-[26px] w-[26px] rounded-full text-[11px] font-extrabold transition ${
              safePage === totalPages
                ? "bg-[#1e769a] text-white"
                : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
            }`}
          >
            30
          </button>

          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="الصفحة السابقة"
            className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft className="h-3 w-3" />
          </button>
        </div>

        <div className="font-semibold text-[#64748b]">
          عرض{" "}
          <strong className="font-black text-[#0f172a]">
            {startIndex}-{endIndex}
          </strong>{" "}
          من{" "}
          <strong className="font-black text-[#0f172a]">{totalRecords}</strong>{" "}
          عملية تدقيق
        </div>
      </div>
    </section>
  );
};

export default Table;
