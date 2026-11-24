"use client";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  FiArrowLeft,
  FiCloud,
  FiDownload,
  FiFileText,
  FiInfo,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";

const cardClass =
  "rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-[22px]";
const fieldClass =
  "h-11 w-full rounded-[11px] border border-[#CBD5DF] bg-white px-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-primary";
const fieldMutedClass =
  "h-11 w-full rounded-[11px] border border-[#E2E8F0] bg-[#F1F5F9] px-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-primary focus:bg-white";
const labelClass = "mb-2 block text-[12px] font-medium text-[#8992A3]";

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
  { value: "SAR 00", label: "SAR 00" },
];

const initialValues = {
  code: "03333",
  requestDate: "2025-07-01",
  dueDate: "",
  title: "",
  estimatedBudget: "",
  purchaseCategory: "رقمي",
  department: "قسم التسويق / المكتب الرئيسي",
  items: [
    { productName: "hp-laser-printer", quantity: 15, unit: "piece" },
    { productName: "", quantity: 0, unit: "SAR 00" },
  ],
  description: "",
  internalNotes: "",
  attachment: null,
};

const validate = (values) => {
  const errors = {};

  if (!values.code?.trim()) errors.code = "الكود مطلوب";
  if (!values.requestDate) errors.requestDate = "تاريخ الطلب مطلوب";
  if (!values.dueDate) errors.dueDate = "تاريخ الاستحقاق مطلوب";
  if (!values.title?.trim()) errors.title = "عنوان الطلب مطلوب";
  if (!values.purchaseCategory) errors.purchaseCategory = "تصنيف الشراء مطلوب";

  if (!Array.isArray(values.items) || values.items.length === 0) {
    errors.items = "يجب إضافة بند واحد على الأقل";
  } else {
    const itemErrors = values.items.map((item) => {
      const rowErr = {};
      if (!item.productName) rowErr.productName = "اختر الصنف";
      if (item.quantity === "" || item.quantity === null || Number(item.quantity) <= 0) {
        rowErr.quantity = "الكمية يجب أن تكون أكبر من 0";
      }
      if (!item.unit) rowErr.unit = "اختر الوحدة";
      return rowErr;
    });
    if (itemErrors.some((e) => Object.keys(e).length > 0)) {
      errors.items = itemErrors;
    }
  }

  return errors;
};

const SectionTitle = ({ icon: Icon, children, badge }) => (
  <div className="mb-4 flex items-center gap-2">
    {Icon && (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF3F7] text-primary">
        <Icon className="size-4" />
      </span>
    )}
    <h2 className="text-[15px] font-bold text-primary sm:text-[16px]">{children}</h2>
    {badge != null && (
      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
        {badge} طلب
      </span>
    )}
  </div>
);

const AddPurch = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const goBack = () => router.push("/accounts/Purches");

  return (
    <div className="pb-2">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Purchase request:", values);
          setSubmitting(false);
          router.push("/accounts/Purches");
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex w-full flex-col gap-4 lg:gap-5">
            {/* Header */}
            <section className="flex min-h-[88px] flex-col gap-3 rounded-[14px] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h1 className="text-[20px] font-bold text-primary sm:text-[21px]">
                  إنشاء طلب شراء جديد
                </h1>
                <p className="mt-1 text-[13px] text-muted">
                  قيد توزيع تكاليف الإيجار الشهري على الأقسام
                </p>
              </div>

              <Link
                href="/accounts/Purches"
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary transition hover:opacity-80"
              >
                <span>الرجوع</span>
                <FiArrowLeft className="size-4" />
              </Link>
            </section>

            {/* Basic Info */}
            <section className={cardClass}>
              <SectionTitle icon={FiInfo}>معلومات أساسية</SectionTitle>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="code" className={labelClass}>
                    الكود
                  </label>
                  <Field
                    id="code"
                    name="code"
                    type="text"
                    readOnly
                    className={`${fieldClass} cursor-default bg-[#F8FAFB]`}
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="mt-1 text-[11px] font-semibold text-danger"
                  />
                </div>

                <div>
                  <label htmlFor="requestDate" className={labelClass}>
                    تاريخ الطلب
                  </label>
                  <Field
                    id="requestDate"
                    name="requestDate"
                    type="date"
                    className={fieldMutedClass}
                  />
                  <ErrorMessage
                    name="requestDate"
                    component="div"
                    className="mt-1 text-[11px] font-semibold text-danger"
                  />
                </div>

                <div>
                  <label htmlFor="dueDate" className={labelClass}>
                    تاريخ الاستحقاق
                  </label>
                  <Field
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className={fieldMutedClass}
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="mt-1 text-[11px] font-semibold text-danger"
                  />
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
                    className={fieldMutedClass}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="mt-1 text-[11px] font-semibold text-danger"
                  />
                </div>

                <div>
                  <label htmlFor="estimatedBudget" className={labelClass}>
                    الميزانية التقديرية
                  </label>
                  <Field
                    id="estimatedBudget"
                    name="estimatedBudget"
                    type="text"
                    placeholder="---"
                    className={`${fieldMutedClass} text-center`}
                  />
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
                      className={`${fieldMutedClass} cursor-pointer appearance-none pe-9`}
                    >
                      <option value="رقمي">رقمي</option>
                      <option value="مادي">مادي</option>
                      <option value="خدمي">خدمي</option>
                      <option value="تشغيلي">تشغيلي</option>
                    </Field>
                    <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  </div>
                  <ErrorMessage
                    name="purchaseCategory"
                    component="div"
                    className="mt-1 text-[11px] font-semibold text-danger"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[11px] border border-[#E2E8F0] bg-[#F1F5F9]/80 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#EAF3F7] text-primary">
                    <HiOutlineBuildingOffice2 className="size-5" />
                  </span>
                  <div>
                    <p className="text-[11px] text-muted">القسم الطالب</p>
                    <p className="text-sm font-bold text-primary">
                      {values.department}
                    </p>
                  </div>
                </div>
                <span className="rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-[11px] font-medium text-muted">
                  قراءة فقط
                </span>
              </div>
            </section>

            {/* Items */}
            <section className={cardClass}>
              <SectionTitle badge={values.items.length}>بنود الطلب</SectionTitle>

              <FieldArray name="items">
                {({ push, remove }) => (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[720px] border-collapse text-right">
                        <thead>
                          <tr className="border-b border-cool-gray text-[12px] font-bold text-muted">
                            <th className="w-10 py-3">#</th>
                            <th className="py-3">اسم الصنف</th>
                            <th className="w-36 py-3">الكمية</th>
                            <th className="w-40 py-3">الوحدة</th>
                            <th className="w-16 py-3 text-center">إجراء</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EEF2F6]">
                          {values.items.map((_, index) => (
                            <tr key={index} className="align-top">
                              <td className="pt-4 text-sm font-bold text-primary">
                                {index + 1}
                              </td>
                              <td className="py-3 pe-3">
                                <div className="relative">
                                  <Field
                                    as="select"
                                    name={`items.${index}.productName`}
                                    className={`${fieldClass} cursor-pointer appearance-none pe-9`}
                                  >
                                    {PRODUCT_OPTIONS.map((opt) => (
                                      <option key={opt.value || "empty"} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </Field>
                                  <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                                </div>
                                <ErrorMessage
                                  name={`items.${index}.productName`}
                                  component="div"
                                  className="mt-1 text-[11px] font-semibold text-danger"
                                />
                              </td>
                              <td className="py-3 pe-3">
                                <Field
                                  name={`items.${index}.quantity`}
                                  type="number"
                                  className={`${fieldClass} text-center font-semibold`}
                                />
                                <ErrorMessage
                                  name={`items.${index}.quantity`}
                                  component="div"
                                  className="mt-1 text-[11px] font-semibold text-danger"
                                />
                              </td>
                              <td className="py-3 pe-3">
                                <div className="relative">
                                  <Field
                                    as="select"
                                    name={`items.${index}.unit`}
                                    className={`${fieldClass} cursor-pointer appearance-none pe-9`}
                                  >
                                    {UNIT_OPTIONS.map((u) => (
                                      <option key={u.value} value={u.value}>
                                        {u.label}
                                      </option>
                                    ))}
                                  </Field>
                                  <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                                </div>
                                <ErrorMessage
                                  name={`items.${index}.unit`}
                                  component="div"
                                  className="mt-1 text-[11px] font-semibold text-danger"
                                />
                              </td>
                              <td className="py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  disabled={values.items.length === 1}
                                  className="mt-1 inline-flex size-9 items-center justify-center rounded-lg text-danger transition hover:bg-[#FEE2E2] disabled:cursor-not-allowed disabled:opacity-40"
                                  aria-label="حذف السطر"
                                >
                                  <FiTrash2 className="size-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3 flex w-full justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          push({ productName: "", quantity: 0, unit: "piece" })
                        }
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition hover:opacity-80"
                      >
                        <FiPlus className="size-4" />
                        إضافة سطر جديد
                      </button>
                    </div>

                    <div className="mt-3 flex items-start gap-2 rounded-[10px] bg-[#E8F1F5] px-4 py-3 text-[12px] font-medium text-primary">
                      <FiInfo className="mt-0.5 size-4 shrink-0" />
                      <span>
                        يمكنك إضافة بنود إضافية عن طريق الضغط على زر &quot;إضافة
                        سطر جديد&quot; أعلاه.
                      </span>
                    </div>
                  </div>
                )}
              </FieldArray>
            </section>

            {/* Description */}
            <section className={cardClass}>
              <SectionTitle icon={FiFileText}>الوصف / البيان</SectionTitle>
              <Field
                as="textarea"
                name="description"
                rows={3}
                placeholder="اكتب تفاصيل التحويل هنا..."
                className="w-full resize-none rounded-[11px] border border-[#CBD5DF] bg-white p-3.5 text-sm text-[#465465] outline-none placeholder:text-[#b9c5ce] focus:border-primary"
              />
            </section>

            {/* Internal notes */}
            <section className={cardClass}>
              <SectionTitle icon={FiCloud}>ملاحظات داخليه</SectionTitle>
              <Field
                as="textarea"
                name="internalNotes"
                rows={3}
                placeholder="أضف أي ملاحظات خاصة بالتعامل مع هذا المندوب....."
                className="w-full resize-none rounded-[11px] border border-[#CBD5DF] bg-white p-3.5 text-sm text-[#465465] outline-none placeholder:text-[#b9c5ce] focus:border-primary"
              />
            </section>

            {/* Attachments */}
            <section className={cardClass}>
              <SectionTitle icon={FiCloud}>المرفقات</SectionTitle>

              <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFB] px-4 py-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#EAF3F7] text-primary">
                  <FiCloud className="size-7" />
                </div>

                <p className="mt-3 text-sm font-bold text-deep">
                  اسحب الملف هنا أو اختر من الجهاز
                </p>

                <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1 text-[12px] text-muted">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    <FiDownload className="size-3.5" />
                    تحميل نموذج XLSX
                  </button>
                  <span>(استخدم هذا النموذج لضمان توافق البيانات)</span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0] || null;
                    setFieldValue("attachment", file);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-5 h-10 rounded-[9px] border border-[#CBD5E1] bg-white px-5 text-sm font-semibold text-deep transition hover:bg-surface"
                >
                  اختيار ملف
                </button>

                {values.attachment && (
                  <p className="mt-2 text-[12px] font-semibold text-primary">
                    الملف المحدد: {values.attachment.name}
                  </p>
                )}
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-[11px] bg-primary px-7 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
              >
                استمرار
              </button>
              <button
                type="button"
                onClick={goBack}
                className="h-11 rounded-[11px] border border-[#CBD5E1] bg-white px-7 text-sm font-bold text-deep transition hover:bg-surface"
              >
                إلغاء
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPurch;
