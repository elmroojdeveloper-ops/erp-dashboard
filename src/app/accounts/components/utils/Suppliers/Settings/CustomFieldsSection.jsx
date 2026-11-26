"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiEdit2,
  FiHash,
  FiInfo,
  FiLink2,
  FiList,
  FiPaperclip,
  FiPlusSquare,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const FIELD_TYPES = [
  "نص قصير",
  "تاريخ (Date)",
  "ملف مرفق (PDF/Image)",
  "رقم / عملة",
  "قائمة منسدلة (A, B, C, D)",
];

const TARGET_TABS = [
  "البيانات الأساسية",
  "البيانات البنكية",
  "سياسات الدفع",
];

const initialCustomFields = [
  {
    id: "field-cr",
    name: "رقم السجل التجاري الفرعي",
    type: "نص قصير",
    required: true,
    targetTab: "البيانات الأساسية",
    Icon: FiHash,
  },
  {
    id: "field-license-expiry",
    name: "تاريخ انتهاء رخصة العمل",
    type: "تاريخ (Date)",
    required: false,
    targetTab: "البيانات الأساسية",
    Icon: FiCalendar,
  },
  {
    id: "field-iban-cert",
    name: "شهادة الآيبان المعتمدة",
    type: "ملف مرفق (PDF/Image)",
    required: true,
    targetTab: "البيانات البنكية",
    Icon: FiPaperclip,
  },
  {
    id: "field-credit-limit",
    name: "الحد الائتماني الممنوح",
    type: "رقم / عملة",
    required: false,
    targetTab: "سياسات الدفع",
    Icon: FiHash,
  },
  {
    id: "field-quality-rating",
    name: "تقييم جودة المورد",
    type: "قائمة منسدلة (A, B, C, D)",
    required: false,
    targetTab: "البيانات الأساسية",
    Icon: FiStar,
  },
];

function getIconByType(type) {
  switch (type) {
    case "تاريخ (Date)":
      return FiCalendar;
    case "ملف مرفق (PDF/Image)":
      return FiPaperclip;
    case "رقم / عملة":
      return FiHash;
    case "قائمة منسدلة (A, B, C, D)":
      return FiList;
    default:
      return FiHash;
  }
}

const CustomFieldsSection = ({
  initialFields = initialCustomFields,
  onFieldsChange,
}) => {
  const [fields, setFields] = useState(initialFields);

  // حالة نموذج إضافة حقل جديد
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState(FIELD_TYPES[0]);
  const [targetTab, setTargetTab] = useState(TARGET_TABS[0]);
  const [isRequired, setIsRequired] = useState(false);

  // حالة التعديل المباشر
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingType, setEditingType] = useState(FIELD_TYPES[0]);
  const [editingTargetTab, setEditingTargetTab] = useState(TARGET_TABS[0]);
  const [editingRequired, setEditingRequired] = useState(false);

  const syncFields = (next) => {
    setFields(next);
    onFieldsChange?.(next);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const trimmed = fieldName.trim();
    if (!trimmed) return;

    const newField = {
      id: `field-${Date.now()}`,
      name: trimmed,
      type: fieldType,
      required: isRequired,
      targetTab,
      Icon: getIconByType(fieldType),
    };

    syncFields([...fields, newField]);
    setFieldName("");
    setFieldType(FIELD_TYPES[0]);
    setTargetTab(TARGET_TABS[0]);
    setIsRequired(false);
  };

  const startEdit = (field) => {
    setEditingId(field.id);
    setEditingName(field.name);
    setEditingType(field.type);
    setEditingTargetTab(field.targetTab);
    setEditingRequired(Boolean(field.required));
  };

  const handleSaveEdit = (id) => {
    const trimmed = editingName.trim();
    if (!trimmed) return;

    syncFields(
      fields.map((item) =>
        item.id === id
          ? {
              ...item,
              name: trimmed,
              type: editingType,
              targetTab: editingTargetTab,
              required: editingRequired,
              Icon: getIconByType(editingType),
            }
          : item
      )
    );
    setEditingId(null);
  };

  const handleDeleteField = (id) => {
    syncFields(fields.filter((item) => item.id !== id));
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-[22px] border border-[#e6ecf2] bg-white p-6 text-[#1e293b] shadow-2xs"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* الرأس العلوي */}
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#e6f2f7] text-[#086382]">
          <FiLink2 className="size-5" />
        </div>

        <div className="text-right">
          <h2 className="text-[18px] font-black leading-snug text-[#0f172a]">
            الحقول المخصصة (Custom Fields)
          </h2>
          <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-[#64748b]">
            إضافة حقول إضافية لنموذج المورد تتناسب مع قطاع أعمالك ومتطلبات
            التدقيق الداخلي.
          </p>
        </div>
      </div>

      {/* جدول الحقول المخصصة */}
      <div className="mt-6 overflow-x-auto rounded-[16px] border border-[#e6eef4]">
        <table className="w-full min-w-[680px] border-collapse text-right">
          <thead>
            <tr className="border-b border-[#e2ebf1] bg-[#f1f6f9] text-[12px] font-extrabold text-[#64748b]">
              <th className="px-4 py-3.5 font-extrabold">اسم الحقل</th>
              <th className="px-4 py-3.5 font-extrabold">نوع الحقل</th>
              <th className="px-4 py-3.5 font-extrabold">إلزامي؟</th>
              <th className="px-4 py-3.5 font-extrabold">مكان الظهور</th>
              <th className="px-4 py-3.5 font-extrabold">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#edf2f7] text-[13px]">
            {fields.map((field) => {
              const Icon = field.Icon || getIconByType(field.type);
              const isEditing = editingId === field.id;

              return (
                <tr
                  key={field.id}
                  className="bg-white transition hover:bg-[#fafcfd]"
                >
                  {/* اسم الحقل */}
                  <td className="px-4 py-3.5">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="h-9 w-full rounded-[9px] border border-[#086382] bg-white px-2.5 text-[12.5px] font-bold text-[#0f172a] focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 shrink-0 text-[#086382]" />
                        <span className="font-extrabold text-[#0f172a]">
                          {field.name}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* نوع الحقل */}
                  <td className="px-4 py-3.5">
                    {isEditing ? (
                      <select
                        value={editingType}
                        onChange={(e) => setEditingType(e.target.value)}
                        className="h-9 rounded-[9px] border border-[#cbd5e1] bg-white px-2.5 text-[12px] font-bold text-[#1e293b] focus:border-[#086382] focus:outline-none"
                      >
                        {FIELD_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-block rounded-[8px] border border-[#e2e8f0] bg-[#f4f7fa] px-2.5 py-1 text-[11.5px] font-bold text-[#334155]">
                        {field.type}
                      </span>
                    )}
                  </td>

                  {/* إلزامي؟ */}
                  <td className="px-4 py-3.5">
                    {isEditing ? (
                      <label className="inline-flex cursor-pointer items-center gap-1.5 text-[12px] font-bold text-[#334155]">
                        <input
                          type="checkbox"
                          checked={editingRequired}
                          onChange={(e) => setEditingRequired(e.target.checked)}
                          className="size-4 accent-[#086382]"
                        />
                        <span>إلزامي</span>
                      </label>
                    ) : field.required ? (
                      <span className="inline-flex flex-col items-center justify-center rounded-full bg-[#fde2e4] px-3 py-1 text-[11px] font-extrabold leading-tight text-[#b91c1c]">
                        <span>نعم</span>
                        <span>(مطلوب)</span>
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-[#eef2f6] px-3 py-1 text-[11.5px] font-bold text-[#64748b]">
                        اختياري
                      </span>
                    )}
                  </td>

                  {/* مكان الظهور */}
                  <td className="px-4 py-3.5">
                    {isEditing ? (
                      <select
                        value={editingTargetTab}
                        onChange={(e) => setEditingTargetTab(e.target.value)}
                        className="h-9 rounded-[9px] border border-[#cbd5e1] bg-white px-2.5 text-[12px] font-bold text-[#1e293b] focus:border-[#086382] focus:outline-none"
                      >
                        {TARGET_TABS.map((tab) => (
                          <option key={tab} value={tab}>
                            {tab}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="block max-w-[110px] text-[12.5px] font-bold leading-snug text-[#475569]">
                        {field.targetTab}
                      </span>
                    )}
                  </td>

                  {/* الإجراءات */}
                  <td className="px-4 py-3.5">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(field.id)}
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
                      <div className="flex items-center gap-2.5 text-[#64748b]">
                        <button
                          type="button"
                          onClick={() => startEdit(field)}
                          aria-label={`تعديل ${field.name}`}
                          className="transition hover:text-[#086382]"
                        >
                          <FiEdit2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteField(field.id)}
                          aria-label={`حذف ${field.name}`}
                          className="transition hover:text-[#dc2626]"
                        >
                          <FiTrash2 className="size-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* نموذج إضافة حقل مخصص جديد */}
      <form
        onSubmit={handleAddField}
        className="mt-5 rounded-[18px] border border-[#e1ecf2] bg-[#f2f7fa] p-5"
      >
        <div className="mb-4 flex items-center gap-2 text-[#086382]">
          <FiPlusSquare className="size-4" />
          <h3 className="text-[14px] font-black">
            إضافة حقل مخصص جديد لنماذج الموردين
          </h3>
        </div>

        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-12">
          {/* اسم الحقل */}
          <div className="md:col-span-4">
            <label className="mb-1.5 block text-[12px] font-bold text-[#64748b]">
              اسم الحقل
            </label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="مثال: رقم رخصة الدفاع المدني"
              className="h-11 w-full rounded-[12px] border border-[#dce6ee] bg-white px-3.5 text-[13px] font-bold text-[#0f172a] placeholder-[#94a3b8] focus:border-[#086382] focus:outline-none"
            />
          </div>

          {/* نوع الحقل */}
          <div className="md:col-span-3">
            <label className="mb-1.5 block text-[12px] font-bold text-[#64748b]">
              نوع الحقل
            </label>
            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="h-11 w-full rounded-[12px] border border-[#dce6ee] bg-white px-3 text-[12.5px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
            >
              {FIELD_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* التبويب المستهدف */}
          <div className="md:col-span-3">
            <label className="mb-1.5 block text-[12px] font-bold text-[#64748b]">
              التبويب المستهدف
            </label>
            <select
              value={targetTab}
              onChange={(e) => setTargetTab(e.target.value)}
              className="h-11 w-full rounded-[12px] border border-[#dce6ee] bg-white px-3 text-[12.5px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
            >
              {TARGET_TABS.map((tab) => (
                <option key={tab} value={tab}>
                  {tab}
                </option>
              ))}
            </select>
          </div>

          {/* إلزامي؟ + زر إضافة */}
          <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
            <label className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[12.5px] font-extrabold text-[#334155]">
              <input
                type="checkbox"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
                className="size-4 rounded-[4px] border-[#cbd5e1] accent-[#086382]"
              />
              <span>إلزامي؟</span>
            </label>

            <button
              type="submit"
              className="h-11 shrink-0 rounded-[12px] bg-[#086382] px-5 text-[13px] font-extrabold text-white transition hover:bg-[#06516b]"
            >
              إضافة
            </button>
          </div>
        </div>
      </form>

      {/* شريط الملاحظة السفلي */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-[14px] border border-[#e3edf2] bg-[#f4f8fa] px-4 py-3 text-[12px] font-bold text-[#086382]">
        <p className="text-right leading-relaxed">
          💡 هذه الحقول ستظهر تلقائياً في شاشة (إضافة مورد جديد) لجميع مستخدمي
          مؤسستك وتخزن ضمن سجل المورد بصيغة مشفرة متوافقة مع متطلبات الحوكمة.
        </p>
        <FiInfo className="size-4 shrink-0 text-[#64748b]" />
      </div>
    </section>
  );
};

export default CustomFieldsSection;