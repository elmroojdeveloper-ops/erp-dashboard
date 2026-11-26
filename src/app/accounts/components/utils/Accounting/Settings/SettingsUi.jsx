"use client";

import { useState } from "react";
import { FiGrid, FiTrash2, FiType } from "react-icons/fi";
import { fieldTypeOptions } from "./settingsConstants";
export const Chip = ({ children, tone = "default" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold ${
      tone === "accent"
        ? "border-[#FCD34D] bg-[#FFFBEB] text-[#B45309]"
        : "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]"
    }`}
  >
    {children}
  </span>
);

export const Toggle = ({ checked, onChange, ariaLabel, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? "bg-primary" : "bg-[#CBD5E1]"
    }`}
  >
    <span
      className={`inline-block size-5 rounded-full bg-white shadow transition-[margin] ${
        checked ? "ms-auto" : ""
      }`}
    />
  </button>
);

export const RowNote = ({ title, desc }) => (
  <div className="min-w-0 text-start">
    <p className="text-sm font-bold text-[#1E293B]">{title}</p>
    {desc ? (
      <p className="mt-1 text-[12px] leading-5 text-[#64748B]">{desc}</p>
    ) : null}
  </div>
);

export const CardShell = ({
  chip,
  chipTone,
  icon: Icon,
  iconBg,
  title,
  desc,
  children,
}) => (
  <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card sm:p-6">
    <div className="mb-5 flex items-start justify-between gap-3">
      {chip ? <Chip tone={chipTone}>{chip}</Chip> : <span />}
      <div className="flex flex-1 items-start justify-end gap-3 text-end">
        <div>
          <h2 className="text-[17px] font-bold text-[#0F172A]">{title}</h2>
          {desc ? (
            <p className="mt-1 max-w-xl text-[12px] leading-6 text-[#64748B]">
              {desc}
            </p>
          ) : null}
        </div>
        {Icon ? (
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className="size-5" />
          </span>
        ) : null}
      </div>
    </div>
    {children}
  </section>
);

const fieldTypeLabel = (type) =>
  fieldTypeOptions.find((o) => o.value === type)?.label ?? "نص";

export const CustomFieldsCard = ({
  desc,
  fields,
  setFields,
  onDirty,
  chip = "توسعة بدون تطوير",
}) => {
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("text");

  const resetForm = () => {
    setNewName("");
    setNewType("text");
  };

  return (
    <CardShell
      chip={chip}
      icon={FiGrid}
      iconBg="bg-[#FFFBEB] text-[#D97706]"
      title="الحقول المخصصة"
      desc={desc}
    >
      <ul className="space-y-2">
        {fields.map((field) => (
          <li
            key={field.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3"
          >
            <button
              type="button"
              onClick={() => {
                setFields((prev) => prev.filter((f) => f.id !== field.id));
                onDirty();
              }}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-white hover:text-[#DC2626]"
              aria-label={`حذف ${field.label}`}
            >
              <FiTrash2 className="size-4" />
            </button>
            <span className="inline-flex shrink-0 rounded-full border border-[#BBD9EA] bg-[#E8F3FA] px-2.5 py-0.5 text-[10px] font-bold text-primary">
              {fieldTypeLabel(field.type)}
            </span>
            <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
              <p className="truncate text-sm font-bold text-[#1E293B]">
                {field.label}
              </p>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
                <FiType className="size-4" />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-xl border border-[#E2E8F0] bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-start">
            <span className="text-xs font-semibold text-[#64748B]">
              اسم الحقل
            </span>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="اسم الحقل، مثل: رمز الموسم"
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
            />
          </label>
          <label className="flex w-full flex-col gap-1.5 text-start sm:w-40">
            <span className="text-xs font-semibold text-[#64748B]">
              نوع البيانات
            </span>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
            >
              {fieldTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              disabled={!newName.trim()}
              onClick={() => {
                setFields((prev) => [
                  ...prev,
                  {
                    id: `field-${Date.now()}`,
                    label: newName.trim(),
                    type: newType,
                  },
                ]);
                resetForm();
                onDirty();
              }}
              className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-[13px] font-bold text-white disabled:opacity-50"
            >
              إضافة
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex h-11 items-center rounded-xl px-3 text-[13px] font-semibold text-[#64748B] hover:text-[#334155]"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </CardShell>
  );
};
export const ModuleHeading = ({ title }) => (
  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
    <h2 className="text-[15px] font-bold text-[#0F172A]">{title}</h2>
  </div>
);

