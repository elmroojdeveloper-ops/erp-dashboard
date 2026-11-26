"use client";

import React, { useState } from "react";
import { FiCheckCircle, FiShield, FiXCircle } from "react-icons/fi";

const initialRolesMatrix = [
  {
    id: "super-admin",
    role: "مدير عام النظام (Super Admin)",
    dotClass: "bg-[#086382]",
    rowClass: "bg-white",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      approve: true,
    },
    exclusiveApprove: false,
  },
  {
    id: "cfo",
    role: "المدير المالي (CFO)",
    dotClass: "bg-[#475569]",
    rowClass: "bg-[#f8fbfd]",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      approve: true,
    },
    exclusiveApprove: true,
  },
  {
    id: "procurement-mgr",
    role: "مدير المشتريات (Procurement Mgr)",
    dotClass: "bg-[#cbd5e1]",
    rowClass: "bg-white",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
    },
    exclusiveApprove: false,
  },
  {
    id: "ap-accountant",
    role: "محاسب موردين (Payable Accountant)",
    dotClass: "bg-[#cbd5e1]",
    rowClass: "bg-white",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: false,
    },
    exclusiveApprove: false,
  },
  {
    id: "general-accountant",
    role: "محاسب عام (General Accountant)",
    dotClass: "bg-[#cbd5e1]",
    rowClass: "bg-white",
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
    },
    exclusiveApprove: false,
  },
  {
    id: "external-auditor",
    role: "مدقق خارجي (External Auditor - عرض فقط)",
    dotClass: "bg-[#cbd5e1]",
    rowClass: "bg-white",
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
    },
    exclusiveApprove: false,
  },
];

const PERMISSION_COLUMNS = [
  { key: "view", label: "عرض\nالسجلات" },
  { key: "create", label: "إضافة\nمورد" },
  { key: "edit", label: "تعديل\nالبيانات" },
  { key: "delete", label: "حذف /\nأرشفة" },
  { key: "approve", label: "اعتماد\nالموردين" },
];

const PermissionsMatrixSection = ({
  initialMatrix = initialRolesMatrix,
  editable = true,
  onMatrixChange,
}) => {
  const [matrix, setMatrix] = useState(initialMatrix);

  const togglePermission = (roleId, permKey) => {
    if (!editable) return;

    setMatrix((prev) => {
      const next = prev.map((item) => {
        if (item.id !== roleId) return item;
        const currentValue = Boolean(item.permissions[permKey]);
        return {
          ...item,
          exclusiveApprove:
            permKey === "approve" && currentValue ? false : item.exclusiveApprove,
          permissions: {
            ...item.permissions,
            [permKey]: !currentValue,
          },
        };
      });
      onMatrixChange?.(next);
      return next;
    });
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b] shadow-2xs"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* الرأس العلوي: العنوان على اليمين + شارة SoD على اليسار */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#e6f2f7] text-[#086382]">
            <FiShield className="size-5" />
          </div>

          <div className="text-right">
            <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
              مصفوفة الصلاحيات للموردين (Vendor Access Matrix)
            </h2>
            <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
              تخصيص صلاحيات الوصول والتعامل مع سجلات الموردين وفواتيرهم لكل دور
              وظيفي.
            </p>
          </div>
        </div>

        <span className="shrink-0 self-start rounded-[12px] border border-[#e2e8f0] bg-[#e7ecf3] px-4 py-2.5 text-right text-[11.5px] font-extrabold leading-snug text-[#64748b] sm:self-center">
          مطابقة لمعايير الفصل بين المهام (SoD)
        </span>
      </div>

      {/* جدول المصفوفة */}
      <div className="mt-6 overflow-x-auto rounded-[16px] border border-[#e6eef4]">
        <table className="w-full min-w-[680px] border-collapse text-center">
          <thead>
            <tr className="border-b border-[#e2ebf1] bg-[#f1f6f9] text-[12px] font-extrabold leading-snug text-[#64748b]">
              <th className="px-4 py-3.5 text-right font-extrabold">
                الدور الوظيفي (Role)
              </th>
              {PERMISSION_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-pre-line px-3 py-3.5 font-extrabold"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#edf2f7] text-[13px]">
            {matrix.map((row) => (
              <tr
                key={row.id}
                className={`${row.rowClass || "bg-white"} transition hover:bg-[#fafcfd]`}
              >
                {/* الدور الوظيفي */}
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`size-2.5 shrink-0 rounded-full ${row.dotClass}`}
                    />
                    <span className="font-extrabold text-[#0f172a]">
                      {row.role}
                    </span>
                  </div>
                </td>

                {/* أعمدة الصلاحيات */}
                {PERMISSION_COLUMNS.map((col) => {
                  const allowed = Boolean(row.permissions[col.key]);

                  if (col.key === "approve" && allowed && row.exclusiveApprove) {
                    return (
                      <td key={col.key} className="px-3 py-4">
                        <button
                          type="button"
                          disabled={!editable}
                          onClick={() => togglePermission(row.id, col.key)}
                          className="inline-flex items-center justify-center rounded-[10px] bg-[#bae6fd] px-3 py-1 text-[11.5px] font-black text-[#0369a1] transition hover:bg-[#7dd3fc] disabled:cursor-default"
                        >
                          حصري
                        </button>
                      </td>
                    );
                  }

                  return (
                    <td key={col.key} className="px-3 py-4">
                      <button
                        type="button"
                        disabled={!editable}
                        onClick={() => togglePermission(row.id, col.key)}
                        aria-label={`${col.label.replace("\n", " ")} - ${row.role}`}
                        className="inline-flex items-center justify-center rounded-full p-1 transition hover:scale-105 disabled:cursor-default"
                      >
                        {allowed ? (
                          <FiCheckCircle className="size-5 text-[#15803d]" />
                        ) : (
                          <FiXCircle className="size-5 text-[#cbd5e1]" />
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PermissionsMatrixSection;