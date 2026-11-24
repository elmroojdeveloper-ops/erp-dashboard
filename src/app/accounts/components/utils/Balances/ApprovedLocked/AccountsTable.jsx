"use client";

import React, { useMemo, useState } from "react";
import {
  FiBox,
  FiChevronDown,
  FiFileText,
  FiFilter,
  FiLayers,
  FiMessageSquare,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineAccountBalance } from "react-icons/md";
import {
  ROWS_BY_TAB,
  SECTION_TOTALS,
  TABS,
  TYPE_STYLES,
} from "./mock-data";

const TAB_ICONS = {
  doc: FiFileText,
  users: FiUsers,
  building: HiOutlineBuildingOffice2,
  box: FiBox,
  layers: FiLayers,
};

const AccountsTable = ({ activeTab = "general", onTabChange }) => {
  const [tab, setTab] = useState(activeTab);
  const [query, setQuery] = useState("");
  const [classification, setClassification] = useState("all");

  const handleTab = (id) => {
    setTab(id);
    onTabChange?.(id);
  };

  const rows = useMemo(() => {
    const list = ROWS_BY_TAB[tab] || [];
    const q = query.trim().toLowerCase();
    return list.filter((row) => {
      const matchesQuery =
        !q ||
        row.code.includes(q) ||
        row.name.toLowerCase().includes(q) ||
        row.desc.toLowerCase().includes(q);
      const matchesClass =
        classification === "all" ||
        (classification === "asset" &&
          (row.type.includes("asset") ||
            row.type === "bank" ||
            row.type === "receivable" ||
            row.type === "inventory")) ||
        (classification === "liability" && row.type === "liability") ||
        (classification === "equity" && row.type === "equity");
      return matchesQuery && matchesClass;
    });
  }, [tab, query, classification]);

  const totals = SECTION_TOTALS[tab] || { debit: "0.00", credit: "0.00" };
  const tabLabel =
    TABS.find((t) => t.id === tab)?.label?.replace(/^\d+\.\s*/, "") ||
    "القسم الحالي";

  return (
    <div dir="rtl" className="space-y-3">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {TABS.map((item) => {
          const active = item.id === tab;
          const Icon = TAB_ICONS[item.icon] || FiFileText;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTab(item.id)}
              className={`inline-flex h-[38px] shrink-0 cursor-pointer items-center gap-2 rounded-[8px] border px-3 text-[12px] font-bold transition ${
                active
                  ? "border-[#1F6F8F] bg-[#1F6F8F] text-white shadow-[0_2px_8px_rgba(31,111,143,0.28)]"
                  : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
              }`}
            >
              <Icon className={`size-3.5 ${active ? "text-white" : "text-[#94A3B8]"}`} />
              <span>{item.label}</span>
              <span
                className={`inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 flex-1">
          <FiSearch className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="عرض فئة الحسابات العامة (أصول وخصوم مركزية)"
            className="h-[38px] w-full rounded-[8px] border border-[#E2E8F0] bg-white pr-9 pl-3 text-[12px] text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#237B9F]"
          />
        </div>

        <div className="relative shrink-0">
          <FiFilter className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-[#64748B]" />
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className="h-[38px] appearance-none rounded-[8px] border border-[#E2E8F0] bg-white py-0 pr-9 pl-8 text-[12px] font-semibold text-[#334155] outline-none"
          >
            <option value="all">
              التصنيف: جميع الحسابات (أصول، خصوم، ملكية)
            </option>
            <option value="asset">أصول</option>
            <option value="liability">خصوم</option>
            <option value="equity">ملكية</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-[#94A3B8]" />
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B]">
          <span className="size-1.5 rounded-full bg-[#237B9F]" />
          الوضع مخصص للقراءة والمطابقة الدفترية فقط
        </div>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-[12px] border border-[#E6ECEF] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="min-w-[960px] w-full border-collapse text-right">
            <thead>
              <tr className="bg-[#EAF3F8] text-[11px] font-bold text-[#5B7385]">
                <th className="whitespace-nowrap px-4 py-3 font-bold">
                  كود الحساب
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-bold">
                  اسم الحساب المحاسبي والوصف المالي
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-bold">
                  نوع الحساب والتصنيف
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  الرصيد المدين (ر.س)
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  الرصيد الدائن (ر.س)
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center font-bold">
                  ملاحظات الترحيل
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const type = TYPE_STYLES[row.type] || TYPE_STYLES.current_asset;
                return (
                  <tr
                    key={`${tab}-${row.code}`}
                    className="border-t border-[#F1F5F9] text-[12px] hover:bg-[#FAFCFE]"
                  >
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        className="cursor-pointer font-bold text-[#1F6F8F] hover:underline"
                      >
                        {row.code}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#0F172A]">{row.name}</div>
                      <div
                        className="mt-0.5 text-[11px] text-[#94A3B8]"
                        dir={/^[A-Z0-9]/.test(row.desc) ? "ltr" : "rtl"}
                      >
                        {row.desc}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-bold ${type.className}`}
                      >
                        <MdOutlineAccountBalance className="size-3 shrink-0 opacity-80" />
                        {type.label}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3.5 text-left font-bold text-[#0F172A]"
                      dir="ltr"
                    >
                      {row.debit}
                    </td>
                    <td
                      className="px-4 py-3.5 text-left font-bold text-[#0F172A]"
                      dir="ltr"
                    >
                      {row.credit}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          title="ملاحظات الترحيل"
                          className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#1F6F8F]"
                        >
                          <FiMessageSquare className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section totals */}
        <div className="flex flex-col gap-2 border-t border-[#D6E8F2] bg-[#EAF4F9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#1F6F8F]">
              <span className="text-[14px] leading-none">Σ</span>
              إجمالي القسم الحالي ({tabLabel}):
            </span>
            <span className="font-semibold text-[#475569]">
              مجموع المدين:{" "}
              <span className="font-bold text-[#1F6F8F]" dir="ltr">
                {totals.debit} ر.س
              </span>
            </span>
            <span className="text-[#CBD5E1]">|</span>
            <span className="font-semibold text-[#475569]">
              مجموع الدائن:{" "}
              <span className="font-bold text-[#1F6F8F]" dir="ltr">
                {totals.credit} ر.س
              </span>
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#0B6B45]">
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#D1FAE5] text-[10px]">
              ✓
            </span>
            متطابق وموزون محاسبياً (الفارق: 0.00 ر.س)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsTable;
