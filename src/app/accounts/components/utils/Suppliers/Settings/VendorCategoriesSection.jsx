"use client";

import React, { useState } from "react";
import {
  FiCheck,
  FiEdit2,
  FiFilePlus,
  FiPlusCircle,
  FiTrash2,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { GiRobotAntennas } from "react-icons/gi";
import { LuBox, LuFlaskConical, LuShapes, LuWrench } from "react-icons/lu";
import { MdOutlineEngineering } from "react-icons/md";

const initialCategories = [
  {
    id: "packaging",
    name: "توريد أوعية وتغليف",
    vendorsCount: 14,
    Icon: LuBox,
  },
  {
    id: "maintenance",
    name: "خدمات صيانة وتشغيل",
    vendorsCount: 8,
    Icon: LuWrench,
  },
  {
    id: "logistics",
    name: "نقل وإمداد ولوجستيات",
    vendorsCount: 22,
    Icon: FiTruck,
  },
  {
    id: "raw-materials",
    name: "مواد خام ومستلزمات إنتاج",
    vendorsCount: 31,
    Icon: LuFlaskConical,
  },
  {
    id: "contracting",
    name: "مقاولات وخدمات استشارية",
    vendorsCount: 6,
    Icon: MdOutlineEngineering,
  },
  {
    id: "equipment",
    name: "توريد أجهزة ومعدات",
    vendorsCount: 11,
    Icon: GiRobotAntennas,
  },
];

function formatVendorsLabel(count) {
  if (count === 1) return "مورد واحد";
  if (count === 2) return "موردان";
  if (count >= 3 && count <= 10) return `${count} موردين`;
  return `${count} مورد`;
}

const VendorCategoriesSection = ({
  initialItems = initialCategories,
  allowInlineCreationDefault = true,
  onCategoriesChange,
  onAllowInlineCreationChange,
}) => {
  const [categories, setCategories] = useState(initialItems);
  const [allowInlineCreation, setAllowInlineCreation] = useState(
    allowInlineCreationDefault
  );

  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const syncCategories = (next) => {
    setCategories(next);
    onCategoriesChange?.(next);
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    const created = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      vendorsCount: 0,
      Icon: LuShapes,
    };

    syncCategories([created, ...categories]);
    setNewCategoryName("");
    setIsAdding(false);
  };

  const startEditing = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleSaveEdit = (id) => {
    const trimmed = editingName.trim();
    if (!trimmed) return;

    syncCategories(
      categories.map((item) =>
        item.id === id ? { ...item, name: trimmed } : item
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (id) => {
    syncCategories(categories.filter((item) => item.id !== id));
  };

  const handleToggleInlineCreation = () => {
    const next = !allowInlineCreation;
    setAllowInlineCreation(next);
    onAllowInlineCreationChange?.(next);
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b] shadow-2xs"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* الرأس العلوي: العنوان والوصف على اليمين + زر الإضافة على اليسار */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#e6f2f7] text-[#086382]">
            <LuShapes className="size-5" />
          </div>

          <div className="text-right">
            <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
              تصنيفات الموردين (Vendor Categories)
            </h2>
            <p className="mt-1 max-w-xl text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
              إدارة وتحديد تصنيفات الموردين لتسهيل الفرز المالي، الموازنات
              التقديرية، والتقارير الرقابية.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding((prev) => !prev)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-[14px] border border-[#d6e7ef] bg-[#eff7fa] px-4 py-3 text-[13px] font-extrabold text-[#086382] transition hover:bg-[#e1f1f7]"
        >
          <span>+ إضافة تصنيف جديد</span>
          <FiPlusCircle className="size-4" />
        </button>
      </div>

      {/* نموذج إضافة تصنيف جديد */}
      {isAdding && (
        <form
          onSubmit={handleCreateCategory}
          className="mt-5 flex flex-col gap-2.5 rounded-[16px] border border-[#d8e6ed] bg-[#f8fbfd] p-4 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="اكتب اسم التصنيف الجديد..."
            autoFocus
            className="h-10 flex-1 rounded-[11px] border border-[#cbd5e1] bg-white px-3.5 text-[13px] font-bold text-[#0f172a] placeholder-[#94a3b8] focus:border-[#086382] focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="h-10 rounded-[11px] bg-[#086382] px-4 text-[12.5px] font-extrabold text-white transition hover:bg-[#06516b]"
            >
              حفظ التصنيف
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName("");
              }}
              className="h-10 rounded-[11px] border border-[#e2e8f0] bg-white px-3.5 text-[12.5px] font-bold text-[#64748b] transition hover:bg-[#f1f5f9]"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      {/* شبكة بطاقات التصنيفات */}
      <div className="mt-6 flex flex-wrap gap-3.5">
        {categories.map((cat) => {
          const Icon = cat.Icon || LuShapes;
          const isEditing = editingId === cat.id;

          return (
            <div
              key={cat.id}
              className="flex items-center gap-3 rounded-[15px] border border-[#e4edf2] bg-[#f4f8fa] px-4 py-3 transition hover:border-[#c8dce6]"
            >
              <Icon className="size-[18px] shrink-0 text-[#086382]" />

              {isEditing ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSaveEdit(cat.id);
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                      }
                    }}
                    autoFocus
                    className="h-7 w-40 rounded-[8px] border border-[#086382] bg-white px-2 text-[12.5px] font-bold text-[#0f172a] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(cat.id)}
                    aria-label="حفظ التعديل"
                    className="flex size-7 items-center justify-center rounded-[7px] bg-[#086382] text-white"
                  >
                    <FiCheck className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    aria-label="إلغاء التعديل"
                    className="flex size-7 items-center justify-center rounded-[7px] bg-[#e2e8f0] text-[#475569]"
                  >
                    <FiX className="size-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-[13.5px] font-extrabold text-[#0f172a]">
                    {cat.name}
                  </span>

                  <span className="rounded-[8px] border border-[#e2e8f0] bg-white px-2 py-0.5 text-[11px] font-bold text-[#64748b] tabular-nums">
                    {formatVendorsLabel(cat.vendorsCount)}
                  </span>

                  <div className="ms-1 flex items-center gap-2 text-[#64748b]">
                    <button
                      type="button"
                      onClick={() => startEditing(cat)}
                      aria-label={`تعديل ${cat.name}`}
                      className="transition hover:text-[#086382]"
                    >
                      <FiEdit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.id)}
                      aria-label={`حذف ${cat.name}`}
                      className="transition hover:text-[#dc2626]"
                    >
                      <FiTrash2 className="size-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* صندوق السماح بإضافة تصنيفات أثناء إدخال المورد */}
      <div className="mt-6 flex flex-col justify-between gap-4 rounded-[18px] border border-[#e4edf2] bg-[#f4f8fa] px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-[#e2e8f0] bg-white text-[#475569]">
            <FiFilePlus className="size-[18px]" />
          </div>

          <div className="text-right">
            <h3 className="text-[13.5px] font-extrabold text-[#0f172a]">
              السماح للمستخدمين بإضافة تصنيفات جديدة أثناء إدخال المورد
            </h3>
            <p className="mt-1 max-w-2xl text-[12px] font-semibold leading-relaxed text-[#64748b]">
              عند التفعيل، يمكن لمسؤول المشتريات كتابة تصنيف جديد مباشرة من
              شاشة إضافة المورد دون الرجوع لهذه الصفحة.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={allowInlineCreation}
          aria-label="السماح للمستخدمين بإضافة تصنيفات جديدة أثناء إدخال المورد"
          onClick={handleToggleInlineCreation}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors ${
            allowInlineCreation ? "bg-[#086382]" : "bg-[#cbd5e1]"
          }`}
        >
          <span
            className={`size-5 rounded-full bg-white shadow-2xs transition-transform ${
              allowInlineCreation ? "-translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </section>
  );
};

export default VendorCategoriesSection;