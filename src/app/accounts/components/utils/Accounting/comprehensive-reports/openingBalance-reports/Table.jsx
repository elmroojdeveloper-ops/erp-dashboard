"use client";

import React from "react";
import {
  FiShield,
  FiCalendar,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { LuLandmark } from "react-icons/lu";

const defaultAuditRows = [
  {
    id: "q3-2024",
    type: "internal",
    typeLabel: "داخلي",
    title: "تدقيق الربع الثالث 2024",
    period: "01/07/2024 - 30/09/2024",
    auditorName: "سارة العتيبي",
    auditorAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    completedCount: 850,
    totalCount: 1240,
    percentage: 68,
    status: "active",
    statusLabel: "نشط",
  },
  {
    id: "fs-2023-1",
    type: "external",
    typeLabel: "خارجي",
    title: "مراجعة القوائم المالية 2023",
    period: "01/01/2024 - 15/03/2024",
    auditorName: "شركة KPMG",
    auditorAvatar: null,
    completedCount: 1240,
    totalCount: 1240,
    percentage: 100,
    status: "completed",
    statusLabel: "مكتملة",
  },
  {
    id: "zatca-q2",
    type: "internal",
    typeLabel: "داخلي",
    title: "تدقيق الزكاة والضريبة Q2",
    period: "01/04/2024 - 30/06/2024",
    auditorName: "ياسر جلال",
    auditorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    completedCount: 120,
    totalCount: 500,
    percentage: 24,
    status: "active",
    statusLabel: "نشط",
  },
  {
    id: "fs-2023-2",
    type: "external",
    typeLabel: "خارجي",
    title: "مراجعة القوائم المالية 2023",
    period: "01/01/2024 - 15/03/2024",
    auditorName: "شركة KPMG",
    auditorAvatar: null,
    completedCount: 1240,
    totalCount: 1240,
    percentage: 100,
    status: "completed",
    statusLabel: "مكتملة",
  },
];

const KpmgMark = () => (
  <svg
    viewBox="0 0 40 40"
    className="h-9 w-9 shrink-0 rounded-full border border-[#e2e8f0] bg-[#e6efed]"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="14" fill="none" stroke="#3d7a74" strokeWidth="1.2" />
    <circle cx="20" cy="20" r="8" fill="none" stroke="#3d7a74" strokeWidth="1" />
    <path
      d="M12 14L28 26M28 14L12 26M20 6V34M6 20H34"
      stroke="#3d7a74"
      strokeWidth="1"
    />
    <circle cx="20" cy="20" r="3" fill="#2c5e59" />
  </svg>
);

const AuditTable = ({
  rows = defaultAuditRows,
  page = 1,
  totalPages = 30,
  totalItems = 24,
  pageSize = 4,
  onPageChange,
  onRowAction,
}) => {
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  const visiblePages = [3, 2, 1];

  return (
    <section
      dir="rtl"
      className="mt-6 rounded-[22px] border border-[#e6ecf2] bg-white text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-right">
          <tbody className="divide-y divide-[#eef2f6]">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="transition hover:bg-[#fafcfd]"
              >
                {/* 1. Type Badge + Audit Title & Period */}
                <td className="py-4 pr-5 pl-3 align-middle">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-[28px] shrink-0 items-center gap-1.5 rounded-[7px] bg-[#086382] px-2.5 text-[11.5px] font-extrabold text-white"
                    >
                      {row.type === "external" ? (
                        <LuLandmark className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <FiShield className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span>{row.typeLabel}</span>
                    </span>

                    <div className="min-w-0 text-right">
                      <div className="truncate text-[14px] font-black text-[#0f172a]">
                        {row.title}
                      </div>
                      <div
                        className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#64748b] tabular-nums"
                        dir="auto"
                      >
                        <FiCalendar className="h-3 w-3 shrink-0 text-[#94a3b8]" />
                        <span>{row.period}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Auditor / Entity */}
                <td className="px-3 py-4 align-middle">
                  <div className="flex items-center justify-end gap-2.5">
                    <span
                      className="text-[13px] font-extrabold text-[#1e293b]"
                      dir="auto"
                    >
                      {row.auditorName}
                    </span>

                    {row.auditorAvatar ? (
                      <img
                        src={row.auditorAvatar}
                        alt={row.auditorName}
                        className="h-9 w-9 shrink-0 rounded-full border border-[#e2e8f0] object-cover"
                      />
                    ) : (
                      <KpmgMark />
                    )}
                  </div>
                </td>

                {/* 3. Progress Bar & Counts */}
                <td className="px-4 py-4 align-middle">
                  <div className="w-[155px]">
                    <div className="mb-1.5 flex items-center justify-between text-[12px] font-extrabold tabular-nums">
                      <span className="text-[#475569]" dir="auto">
                        {row.percentage}%
                      </span>
                      <span className="text-[#0f172a]" dir="auto">
                        {row.completedCount} / {row.totalCount}
                      </span>
                    </div>

                    <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                      <div
                        className="h-full rounded-full bg-[#086382] transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, row.percentage))}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* 4. Status Pill */}
                <td className="px-3 py-4 text-center align-middle">
                  {row.status === "active" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f7ed] px-3 py-1 text-[11.5px] font-extrabold text-[#047857]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                      <span>{row.statusLabel}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-3 py-1 text-[11.5px] font-extrabold text-[#475569]">
                      {row.statusLabel}
                    </span>
                  )}
                </td>

                {/* 5. Row Actions Menu */}
                <td className="py-4 pl-4 pr-2 text-left align-middle">
                  <button
                    type="button"
                    onClick={() => onRowAction?.(row)}
                    aria-label={`إجراءات ${row.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                  >
                    <FiMoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2f6] px-5 py-3.5 text-[12px]">
        <div
          className="font-bold text-[#086382] tabular-nums"
          dir="auto"
        >
          عرض {startItem}-{endItem} من {totalItems} عملية تدقيق
        </div>

        <div className="flex items-center gap-1.5" dir="ltr">
          <button
            type="button"
            onClick={() => onPageChange?.(Math.max(1, page - 1))}
            disabled={page <= 1}
            aria-label="الصفحة السابقة"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] disabled:opacity-40"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onPageChange?.(totalPages)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-bold tabular-nums transition ${
              page === totalPages
                ? "border-[#086382] bg-[#086382] text-white"
                : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
            }`}
          >
            {totalPages}
          </button>

          <span className="px-1 text-xs font-bold text-[#94a3b8]">...</span>

          {visiblePages.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onPageChange?.(num)}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-bold tabular-nums transition ${
                page === num
                  ? "border-[#086382] bg-[#086382] text-white"
                  : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            aria-label="الصفحة التالية"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] disabled:opacity-40"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AuditTable;