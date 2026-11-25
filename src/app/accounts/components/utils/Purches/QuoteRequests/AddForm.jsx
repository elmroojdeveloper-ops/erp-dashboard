"use client";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  FiArrowRight,
  FiDownload,
  FiInfo,
  FiPlusCircle,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { RiOrganizationChart, RiStickyNoteLine } from "react-icons/ri";

/* ---------- Styles ---------- */
const cardClass =
  "rounded-xl bg-white shadow-[0_1px_3px_rgba(35,70,90,0.05)]";
const labelClass = "mb-2.5 block text-sm text-[#4F5B67]";
const fieldClass =
  "h-11 w-full rounded-[10px] border border-[#D3DAE1] bg-white px-3.5 text-[13px] text-[#4F5B67] outline-none transition placeholder:text-[#9AA5B1] focus:border-primary";
const selectClass = `${fieldClass} cursor-pointer appearance-none pe-9`;
const errorClass = "mt-1 text-[11px] font-semibold text-danger";
const noteBoxClass =
  "flex items-center rounded-[10px] border-s-4 border-s-primary bg-[#EDF3F7]";

/* ---------- Options ---------- */
const PRODUCT_OPTIONS = [
  { value: "", label: "أدخل اسم المنتج أو الصنف" },
  { value: "hp-laser-printer", label: "طابعة ليزر ملونة - HP" },
  { value: "office-desk", label: "مكتب إداري خشبي" },
  { value: "ergonomic-chair", label: "كرسي مكتب طبي" },
];

const UNIT_OPTIONS = [
  { value: "piece", label: "وحدة (قطعة)" },
  { value: "box", label: "صندوق" },
  { value: "kg", label: "كجم" },
];

const CATEGORY_OPTIONS = ["رقمي", "مادي", "خدمي", "تشغيلي"];

/* ---------- Initial values (قيم تجريبية مطابقة للصورة، فضّيها بعد المراجعة) ---------- */
const initialValues = {
  code: "03333",
  requestDate: "2025-01-07",
  dueDate: "",
  title: "",
  estimatedBudget: "",
  purchaseCategory: "رقمي",
  department: "قسم التسويق / المكتب الرئيسي",
  items: [
    { productName: "hp-laser-printer", quantity: 15, unit: "piece" },
    { productName: "", quantity: 0, unit: "piece" },
  ],
  internalNotes: "",
  attachment: null,
};

/* ---------- Validation ---------- */
const validate = (values) => {
  const errors = {};

  if (!values.code?.trim()) errors.code = "الكود مطلوب";
  if (!values.requestDate) errors.requestDate = "تاريخ الطلب مطلوب";
  if (!values.dueDate) errors.dueDate = "تاريخ الاستحقاق مطلوب";
  else if (values.requestDate && values.dueDate < values.requestDate)
    errors.dueDate = "يجب أن يكون بعد تاريخ الطلب";
  if (!values.title?.trim()) errors.title = "عنوان الطلب مطلوب";
  if (!values.purchaseCategory) errors.purchaseCategory = "تصنيف الشراء مطلوب";

  if (!Array.isArray(values.items) || values.items.length === 0) {
    errors.items = "يجب إضافة بند واحد على الأقل";
  } else {
    const itemErrors = values.items.map((item) => {
      const rowErr = {};
      if (!item.productName) rowErr.productName = "اختر الصنف";
      if (
        item.quantity === "" ||
        item.quantity === null ||
        Number(item.quantity) <= 0
      )
        rowErr.quantity = "أكبر من 0";
      if (!item.unit) rowErr.unit = "اختر الوحدة";
      return rowErr;
    });
    if (itemErrors.some((e) => Object.keys(e).length > 0))
      errors.items = itemErrors;
  }

  return errors;
};

/* ---------- Small pieces ---------- */
const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2.5">
    {Icon ? <Icon className="size-5 shrink-0 text-primary" /> : null}
    <h2 className="text-[20px] font-semibold text-primary">{children}</h2>
  </div>
);

const SelectField = ({ name, options, className = selectClass }) => (
  <div className="relative">
    <Field as="select" name={name} className={className}>
      {options.map((opt) => (
        <option key={opt.value || "empty"} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Field>
    <IoChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B7682]" />
  </div>
);

const Err = ({ name }) => (
  <ErrorMessage name={name} component="div" className={errorClass} />
);

/* ---------- Component ---------- */
const AddForm = ({
  title = "إنشاء طلب عرض سعر",
  subtitle = "يرجى تعبئة كافة التفاصيل المطلوبة لـ إنشاء طلب عرض سعر",
}) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const listHref = "/accounts/Purches/quote-requests";

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        console.log("RFQ request:", values);
        setSubmitting(false);
        router.push(listHref);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="flex w-full flex-col gap-6">
          {/* ===== Title card ===== */}
          <section
            className={`${cardClass} flex min-h-[110px] items-center justify-between px-6 py-4`}
          >
            <div>
              <h1 className="text-[24px] font-bold text-primary">{title}</h1>
              <p className="mt-2 text-sm text-[#3F4B57]">{subtitle}</p>
            </div>

            <Link
              href={listHref}
              className="inline-flex items-center gap-2 text-[15px] font-medium text-primary transition hover:opacity-80"
            >
              <span>الرجوع</span>
              <FiArrowRight className="size-4" />
            </Link>
          </section>

          {/* ===== Basic info ===== */}
          <section className={`${cardClass} p-4`}>
            <SectionTitle icon={FiInfo}>معلومات أساسية</SectionTitle>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
              <div>
                <label htmlFor="code" className={labelClass}>
                  الكود
                </label>
                <Field
                  id="code"
                  name="code"
                  type="text"
                  className={fieldClass}
                />
                <Err name="code" />
              </div>

              <div>
                <label htmlFor="requestDate" className={labelClass}>
                  تاريخ الطلب
                </label>
                <Field
                  id="requestDate"
                  name="requestDate"
                  type="date"
                  className={fieldClass}
                />
                <Err name="requestDate" />
              </div>

              <div>
                <label htmlFor="dueDate" className={labelClass}>
                  تاريخ الاستحقاق
                </label>
                <Field
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  className={fieldClass}
                />
                <Err name="dueDate" />
              </div>

              <div>
                <label htmlFor="title" className={labelClass}>
                  عنوان الطلب
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="مثال: توريد أجهزة مكتبية للفرع الجديد"
                  className={fieldClass}
                />
                <Err name="title" />
              </div>

              <div>
                <label htmlFor="estimatedBudget" className={labelClass}>
                  الميزانية التقديرية
                </label>
                <Field
                  id="estimatedBudget"
                  name="estimatedBudget"
                  type="text"
                  inputMode="decimal"
                  placeholder="— — —"
                  className={`${fieldClass} text-left`}
                />
                <Err name="estimatedBudget" />
              </div>

              <div>
                <label htmlFor="purchaseCategory" className={labelClass}>
                  تصنيف الشراء
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    id="purchaseCategory"
                    name="purchaseCategory"
                    className={selectClass}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Field>
                  <IoChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B7682]" />
                </div>
                <Err name="purchaseCategory" />
              </div>
            </div>

            {/* القسم الطالب */}
            <div className={`${noteBoxClass} mt-3 min-h-16 justify-between px-4 py-2.5`}>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                  <RiOrganizationChart className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] leading-4 text-[#6B7682]">
                    القسم الطالب
                  </p>
                  <p className="text-base font-medium text-primary">
                    {values.department}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#E3E8ED] px-3 py-0.5 text-xs text-[#6B7682]">
                قراءة فقط
              </span>
            </div>
          </section>

          {/* ===== Items ===== */}
          <section className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center gap-3.5 px-6 pb-4 pe-6 pt-5">
              <h2 className="pe-4 text-[20px] font-semibold text-primary">
                بنود الطلب
              </h2>
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white">
                {values.items.length} طلب
              </span>
            </div>

            <FieldArray name="items">
              {({ push, remove }) => (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] table-fixed border-collapse text-start">
                      <colgroup>
                        <col className="w-16" />
                        <col />
                        <col className="w-[132px]" />
                        <col className="w-[164px]" />
                        <col className="w-1/4" />
                      </colgroup>
                      <thead>
                        <tr className="bg-[#F1F5F8] text-[15px] font-medium text-[#3F4B57]">
                          <th className="h-[50px] ps-6 text-start font-medium">
                            #
                          </th>
                          <th className="text-start font-medium">اسم الصنف</th>
                          <th className="text-start font-medium">الكمية</th>
                          <th className="text-start font-medium">الوحدة</th>
                          <th className="text-start font-medium">إجراء</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9EEF2]">
                        {values.items.map((_, index) => (
                          <tr key={index} className="align-middle">
                            <td className="ps-6 text-xl font-medium text-primary">
                              {index + 1}
                            </td>
                            <td className="py-6 pe-8">
                              <SelectField
                                name={`items.${index}.productName`}
                                options={PRODUCT_OPTIONS}
                              />
                              <Err name={`items.${index}.productName`} />
                            </td>
                            <td className="py-6 pe-8">
                              <Field
                                name={`items.${index}.quantity`}
                                type="number"
                                min="0"
                                className={`${fieldClass} text-center`}
                              />
                              <Err name={`items.${index}.quantity`} />
                            </td>
                            <td className="py-6 pe-8">
                              <SelectField
                                name={`items.${index}.unit`}
                                options={UNIT_OPTIONS}
                              />
                              <Err name={`items.${index}.unit`} />
                            </td>
                            <td className="py-6">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={values.items.length === 1}
                                className="inline-flex size-9 items-center justify-center rounded-lg text-danger transition hover:bg-[#FEE2E2] disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="حذف السطر"
                              >
                                <FiTrash2 className="size-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end px-6 pb-8 pt-7">
                    <button
                      type="button"
                      onClick={() =>
                        push({ productName: "", quantity: 0, unit: "piece" })
                      }
                      className="inline-flex items-center gap-2 text-[15px] font-medium text-primary transition hover:opacity-80"
                    >
                      <FiPlusCircle className="size-5" />
                      إضافة سطر جديد
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            <div className="px-6 pb-6">
              <div className={`${noteBoxClass} h-[50px] gap-2.5 px-4 text-[13px] text-primary`}>
                <FiInfo className="size-5 shrink-0" />
                <span>
                  يمكنك إضافة بنود إضافية عن طريق الضغط على زر
                  &quot;إضافة صنف جديد&quot; أعلاه.
                </span>
              </div>
            </div>
          </section>

          {/* ===== Internal notes ===== */}
          <section className={`${cardClass} p-6`}>
            <SectionTitle icon={FiUploadCloud}>ملاحظات داخليه</SectionTitle>

            <div className="relative mt-5">
              <Field
                as="textarea"
                name="internalNotes"
                rows={4}
                className="h-[110px] w-full resize-none rounded-[10px] border border-[#D3DAE1] bg-white p-3.5 text-sm text-[#4F5B67] outline-none focus:border-primary"
              />
              {!values.internalNotes && (
                <span className="pointer-events-none absolute inset-x-3.5 top-1/2 -translate-y-1/2 text-sm text-[#9AA5B1]">
                  أضف أي ملاحظات خاصة بالتعامل مع هذا المندوب.....
                </span>
              )}
            </div>
          </section>

          {/* ===== Attachments + actions ===== */}
          <section className={cardClass}>
            <div className="border-b border-[#E9EEF2] px-6 py-6">
              <SectionTitle icon={RiStickyNoteLine}>المرفقات</SectionTitle>
            </div>

            <div className="p-6">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) setFieldValue("attachment", file);
                }}
                className="flex h-80 flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#C9CED4] px-4 text-center"
              >
                <div className="flex size-24 items-center justify-center rounded-full bg-[#EAF1F5] text-primary">
                  <FiUploadCloud className="size-10" strokeWidth={2.2} />
                </div>

                <p className="mt-5 text-lg font-bold text-[#1F2933]">
                  اسحب الملف هنا أو اختر من الجهاز
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-[#3F4B57]">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <span>تحميل نموذج XLSX</span>
                    <FiDownload className="size-3.5" />
                  </button>
                  <span>(استخدم هذا النموذج لضمان توافق البيانات)</span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf"
                  className="hidden"
                  onChange={(e) =>
                    setFieldValue("attachment", e.currentTarget.files?.[0] || null)
                  }
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 h-10 rounded-full bg-[#EDF1F4] px-6 text-sm text-[#56626E] transition hover:bg-[#E3E9EE]"
                >
                  اختيار ملف
                </button>

                {values.attachment ? (
                  <p className="mt-2 text-xs font-semibold text-primary">
                    الملف المحدد: {values.attachment.name}
                  </p>
                ) : null}
              </div>

              <div className="mt-11 flex items-center justify-end gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-[122px] rounded-lg bg-primary text-sm font-medium text-white transition hover:bg-primary-dark disabled:opacity-60"
                >
                  إرسال
                </button>
                <button
                  type="button"
                  onClick={() => router.push(listHref)}
                  className="h-11 w-[122px] rounded-lg border border-primary bg-white text-sm font-medium text-primary transition hover:bg-[#F3F8FB]"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default AddForm;