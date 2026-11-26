"use client";

import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiInfo,
  FiMapPin,
  FiCreditCard,
  FiPaperclip,
  FiUploadCloud,
  FiFileText,
  FiHelpCircle,
  FiActivity,
  FiArrowRight,
  FiChevronDown,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

const supplierValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("اسم المورد مطلوب"),
  referenceCode: Yup.string().trim(),
  phone: Yup.string().trim(),
  email: Yup.string().trim().email("يرجى إدخال بريد إلكتروني صحيح"),
  website: Yup.string().trim(),
  vatNumber: Yup.string()
    .trim()
    .matches(/^\d{10,15}$/, {
      message: "الرقم الضريبي يجب أن يكون أرقاماً (من 10 إلى 15 رقماً)",
      excludeEmptyString: true,
    }),
  status: Yup.string().required("الحالة مطلوبة"),
  currency: Yup.string(),
  category: Yup.string(),

  street: Yup.string().trim(),
  buildingNumber: Yup.string().trim(),
  city: Yup.string().trim(),
  country: Yup.string(),

  salesRep: Yup.string().trim(),
  paymentTerms: Yup.string(),
  defaultPaymentMethod: Yup.string(),

  receivableAccount: Yup.string(),
  payableAccount: Yup.string(),
  autoInvoiceProcessing: Yup.boolean(),

  internalNotes: Yup.string(),

  bankName: Yup.string().trim(),
  accountHolderName: Yup.string().trim(),
  bankCurrency: Yup.string(),
  iban: Yup.string().trim(),
  swiftCode: Yup.string().trim(),
});

const initialValues = {
  // معلومات أساسية
  name: "",
  referenceCode: "VEN-2024-001",
  phone: "",
  email: "",
  website: "",
  vatNumber: "",
  status: "نشط",
  currency: "",
  category: "اجهزة",

  // العنوان والتواجد
  street: "",
  buildingNumber: "",
  city: "",
  country: "المملكة العربية السعودية",

  // المبيعات والمشتريات
  salesRep: "",
  paymentTerms: "مقدم",
  defaultPaymentMethod: "تحويل بنكي",

  // الربط المحاسبي
  receivableAccount: "العملاء",
  payableAccount: "الموردين",
  autoInvoiceProcessing: true,

  // ملاحظات
  internalNotes: "",

  // البيانات البنكية
  bankName: "",
  accountHolderName: "",
  bankCurrency: "ريال سعودي (SAR)",
  iban: "",
  swiftCode: "",
};

const AddSupplierPage = ({
  onDownloadPdf,
  onSubmitSupplier,
  onCancel,
}) => {
  const fileInputRef = useRef(null);
const router =useRouter()
  const [activeTab, setActiveTab] = useState("sales"); // "sales" | "accounting" | "notes"
  const [isDragging, setIsDragging] = useState(false);

  const [attachments, setAttachments] = useState([
    {
      id: "att-1",
      name: "invoice_001.pdf",
      sizeLabel: "1.2 MB",
    },
  ]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFilesSelected = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const validFiles = Array.from(fileList).filter(
      (file) => file.size <= 10 * 1024 * 1024
    );
    const mapped = validFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
    }));
    setAttachments((prev) => [...prev, ...mapped]);
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const inputClass =
    "h-[40px] w-full rounded-[10px] border border-[#e2e8f0] bg-white px-3.5 text-right text-[12.5px] font-semibold text-[#334155] placeholder-[#94a3b8] outline-none transition focus:border-[#086382]";

  const selectClass =
    "h-[40px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3.5 pl-9 text-right text-[12.5px] font-bold text-[#334155] outline-none transition focus:border-[#086382]";

  const labelClass =
    "mb-1.5 block text-right text-[12px] font-bold text-[#475569]";

  const renderError = (name) => (
    <ErrorMessage name={name}>
      {(msg) => (
        <p className="mt-1 text-right text-[11px] font-bold text-[#dc2626]">
          {msg}
        </p>
      )}
    </ErrorMessage>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={supplierValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmitSupplier?.({ ...values, attachments });
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form
          dir="rtl"
          className="space-y-4 text-[#1e293b]"
          style={{
            fontFamily:
              "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Top Page Header Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#e6ecf2] bg-white px-6 py-4">
            <div className="text-right">
              <h1 className="text-[22px] font-black leading-tight text-[#086382]">
                إضافة مورد جديد
              </h1>
              <p className="mt-1 text-[12px] font-semibold text-[#64748b]">
                قم بإدخال بيانات المورد بعناية لضمان دقة العمليات المحاسبية.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onDownloadPdf}
                className="inline-flex h-[38px] items-center gap-2 rounded-[10px] bg-[#0d6d8e] px-4 text-[12.5px] font-extrabold text-white transition hover:bg-[#085570]"
              >
                <FiDownload className="h-3.5 w-3.5" />
                <span>تحميل PDF</span>
              </button>

              <button
                type="button"
                onClick={()=>{
                    router.back()
                }}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#086382] transition hover:underline"
              >
                <span>الرجوع</span>
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Two-Column Grid */}
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
            {/* Right Column (Main Form Sections - 8 cols) */}
            <div className="space-y-5 lg:col-span-2">
              {/* 1. معلومات أساسية */}
              <section className="rounded-[20px] border border-[#e6ecf2] bg-white p-6">
                <div className="mb-5 flex items-center justify-start gap-2">
                  <FiInfo className="h-4 w-4 text-[#086382]" />
                  <h2 className="text-[15px] font-black text-[#086382]">
                    معلومات أساسية
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                  {/* اسم المورد* */}
                  <div className="md:col-span-1">
                    <label htmlFor="name" className={labelClass}>
                      اسم المورد<span className="text-[#dc2626]">*</span>
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثلاً: شركة التوريدات العالمية"
                      className={inputClass}
                    />
                    {renderError("name")}
                  </div>

                  {/* الرقم المرجعي */}
                  <div className="md:col-span-1">
                    <label htmlFor="referenceCode" className={labelClass}>
                      الرقم المرجعي
                    </label>
                    <Field
                      id="referenceCode"
                      name="referenceCode"
                      type="text"
                      placeholder="VEN-2024-001"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("referenceCode")}
                  </div>

                  {/* الهاتف */}
                  <div className="md:col-span-1">
                    <label htmlFor="phone" className={labelClass}>
                      الهاتف
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+966 50 000 0000"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("phone")}
                  </div>

                  {/* البريد الإلكتروني */}
                  <div className="md:col-span-1">
                    <label htmlFor="email" className={labelClass}>
                      البريد الإلكتروني
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="info@vendor.com"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("email")}
                  </div>

                  {/* الموقع الإلكتروني */}
                  <div className="md:col-span-1">
                    <label htmlFor="website" className={labelClass}>
                      الموقع الإلكتروني
                    </label>
                    <Field
                      id="website"
                      name="website"
                      type="text"
                      placeholder="www.vendor.com"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("website")}
                  </div>

                  {/* الرقم الضريبي (VAT) */}
                  <div className="md:col-span-1">
                    <label htmlFor="vatNumber" className={labelClass}>
                      الرقم الضريبي (VAT)
                    </label>
                    <Field
                      id="vatNumber"
                      name="vatNumber"
                      type="text"
                      placeholder="300000000000003"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("vatNumber")}
                  </div>

                  {/* الحالة */}
                  <div className="md:col-span-1">
                    <label htmlFor="status" className={labelClass}>
                      الحالة
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        id="status"
                        name="status"
                        className={selectClass}
                      >
                        <option value="نشط">نشط</option>
                        <option value="غير نشط">غير نشط</option>
                      </Field>
                      <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                    {renderError("status")}
                  </div>

                  {/* العملة */}
                  <div className="md:col-span-1">
                    <label htmlFor="currency" className={labelClass}>
                      العملة
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        id="currency"
                        name="currency"
                        className={`${selectClass} text-[#7c8794]`}
                      >
                        <option value="">اختر العمله</option>
                        <option value="SAR">ريال سعودي (SAR)</option>
                        <option value="EGP">جنيه مصري (EGP)</option>
                        <option value="AED">درهم إماراتي (AED)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                      </Field>
                      <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                    {renderError("currency")}
                  </div>

                  {/* التصنيف - نصف العرض على اليمين */}
                  <div className="md:col-span-1">
                    <label htmlFor="category" className={labelClass}>
                      التصنيف
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className={selectClass}
                      >
                        <option value="اجهزة">اجهزة</option>
                        <option value="خدمات صيانة">خدمات صيانة</option>
                        <option value="نقل وإمداد">نقل وإمداد</option>
                        <option value="مواد خام">مواد خام</option>
                      </Field>
                      <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                    {renderError("category")}
                  </div>
                </div>
              </section>

              {/* 2. العنوان والتواجد */}
              <section className="rounded-[20px] border border-[#e6ecf2] bg-white p-6">
                <div className="mb-5 flex items-center justify-start gap-2">
                  <FiMapPin className="h-4 w-4 text-[#086382]" />
                  <h2 className="text-[15px] font-black text-[#086382]">
                    العنوان والتواجد
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label htmlFor="street" className={labelClass}>
                      الشارع
                    </label>
                    <Field
                      id="street"
                      name="street"
                      type="text"
                      placeholder="شارع العليا العام"
                      className={inputClass}
                    />
                    {renderError("street")}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="buildingNumber" className={labelClass}>
                      رقم المبنى
                    </label>
                    <Field
                      id="buildingNumber"
                      name="buildingNumber"
                      type="text"
                      placeholder="1234"
                      className={`${inputClass} bg-[#fafbfd] text-[#7c8794]`}
                    />
                    {renderError("buildingNumber")}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="city" className={labelClass}>
                      المدينة
                    </label>
                    <Field
                      id="city"
                      name="city"
                      type="text"
                      placeholder="الرياض"
                      className={inputClass}
                    />
                    {renderError("city")}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="country" className={labelClass}>
                      الدولة
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        id="country"
                        name="country"
                        className={selectClass}
                      >
                        <option value="المملكة العربية السعودية">
                          المملكة العربية السعودية
                        </option>
                        <option value="مصر">مصر</option>
                        <option value="الإمارات العربية المتحدة">
                          الإمارات العربية المتحدة
                        </option>
                      </Field>
                      <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                    {renderError("country")}
                  </div>
                </div>
              </section>

              {/* 3. التبويبات الثلاثة: المبيعات والمشتريات / الربط المحاسبي / ملاحظات */}
              <section className="rounded-[20px] border border-[#e6ecf2] bg-white p-6">
                <div className="mb-5 flex items-center justify-start gap-2 rounded-full bg-[#eef4f8] p-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab("sales")}
                    className={`rounded-full px-4 py-2 text-[12px] font-extrabold transition ${
                      activeTab === "sales"
                        ? "border-b-2 border-[#086382] bg-white text-[#086382]"
                        : "text-[#475569] hover:text-[#086382]"
                    }`}
                  >
                    المبيعات والمشتريات
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("accounting")}
                    className={`rounded-full px-4 py-2 text-[12px] font-extrabold transition ${
                      activeTab === "accounting"
                        ? "border-b-2 border-[#086382] bg-white text-[#086382]"
                        : "text-[#475569] hover:text-[#086382]"
                    }`}
                  >
                    الربط المحاسبي
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("notes")}
                    className={`rounded-full px-4 py-2 text-[12px] font-extrabold transition ${
                      activeTab === "notes"
                        ? "border-b-2 border-[#086382] bg-white text-[#086382]"
                        : "text-[#475569] hover:text-[#086382]"
                    }`}
                  >
                    ملاحظات
                  </button>
                </div>

                {activeTab === "sales" && (
                  <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                    <div className="md:col-span-1">
                      <label htmlFor="salesRep" className={labelClass}>
                        مندوب المبيعات
                      </label>
                      <Field
                        id="salesRep"
                        name="salesRep"
                        type="text"
                        placeholder="اسم المندوب لدي المورد"
                        className={inputClass}
                      />
                      {renderError("salesRep")}
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="paymentTerms" className={labelClass}>
                        شروط الدفع
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          id="paymentTerms"
                          name="paymentTerms"
                          className={selectClass}
                        >
                          <option value="مقدم">مقدم</option>
                          <option value="15 يوم">15 يوم</option>
                          <option value="30 يوم">30 يوم</option>
                          <option value="نقدي">نقدي</option>
                        </Field>
                        <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                      </div>
                      {renderError("paymentTerms")}
                    </div>

                    {/* طريقة الدفع الافتراضية - نصف العرض على اليمين */}
                    <div className="md:col-span-1">
                      <label
                        htmlFor="defaultPaymentMethod"
                        className={labelClass}
                      >
                        طريقة الدفع الافتراضية
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          id="defaultPaymentMethod"
                          name="defaultPaymentMethod"
                          className={selectClass}
                        >
                          <option value="تحويل بنكي">تحويل بنكي</option>
                          <option value="نقدي">نقدي</option>
                          <option value="شيك">شيك</option>
                        </Field>
                        <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                      </div>
                      {renderError("defaultPaymentMethod")}
                    </div>
                  </div>
                )}

                {activeTab === "accounting" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="payableAccount" className={labelClass}>
                          حساب دائن (A/P)
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            id="payableAccount"
                            name="payableAccount"
                            className={selectClass}
                          >
                            <option value="الموردين">الموردين</option>
                            <option value="ذمم دائنة">ذمم دائنة</option>
                          </Field>
                          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                        </div>
                        {renderError("payableAccount")}
                      </div>

                      <div className="md:col-span-1">
                        <label
                          htmlFor="receivableAccount"
                          className={labelClass}
                        >
                          حساب مدين (R/A)
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            id="receivableAccount"
                            name="receivableAccount"
                            className={selectClass}
                          >
                            <option value="العملاء">العملاء</option>
                            <option value="سلف الموردين">سلف الموردين</option>
                          </Field>
                          <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                        </div>
                        {renderError("receivableAccount")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-[14px] border-r-4 border-[#086382] bg-[#eef5f9] px-4 py-3.5">
                      <div className="text-right">
                        <div className="text-[13px] font-black text-[#086382]">
                          المعالجة التلقائية للفواتير
                        </div>
                        <div className="mt-0.5 text-[11.5px] font-semibold text-[#475569]">
                          تفعيل استخراج البيانات التلقائي للفواتير المرفقه من
                          هذا المورد
                        </div>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={values.autoInvoiceProcessing}
                        onClick={() =>
                          setFieldValue(
                            "autoInvoiceProcessing",
                            !values.autoInvoiceProcessing
                          )
                        }
                        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full transition ${
                          values.autoInvoiceProcessing
                            ? "bg-[#1a7394]"
                            : "bg-[#cbd5e1]"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition ${
                            values.autoInvoiceProcessing
                              ? "-translate-x-7"
                              : "-translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div>
                    <label htmlFor="internalNotes" className={labelClass}>
                      ملاحظات داخلية
                    </label>
                    <Field
                      as="textarea"
                      id="internalNotes"
                      name="internalNotes"
                      rows={4}
                      placeholder="أضف أي ملاحظات خاصة بالتعامل مع هذا المندوب....."
                      className="w-full rounded-[12px] border border-[#e2e8f0] bg-white p-3.5 text-right text-[12.5px] font-semibold text-[#0f172a] placeholder-[#94a3b8] outline-none transition focus:border-[#086382]"
                    />
                    {renderError("internalNotes")}
                  </div>
                )}
              </section>

              {/* 4. البيانات البنكية */}
              <section className="rounded-[20px] border border-[#e6ecf2] bg-white p-6">
                <div className="mb-5 flex items-center justify-start gap-2">
                  <FiCreditCard className="h-4 w-4 text-[#086382]" />
                  <h2 className="text-[15px] font-black text-[#086382]">
                    البيانات البنكية
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label htmlFor="bankName" className={labelClass}>
                      اسم البنك
                    </label>
                    <Field
                      id="bankName"
                      name="bankName"
                      type="text"
                      placeholder="مثلاً: بنك الراجحي"
                      className={inputClass}
                    />
                    {renderError("bankName")}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="accountHolderName" className={labelClass}>
                      اسم الحساب
                    </label>
                    <Field
                      id="accountHolderName"
                      name="accountHolderName"
                      type="text"
                      placeholder="اسم المستفيد الكامل"
                      className={inputClass}
                    />
                    {renderError("accountHolderName")}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="bankCurrency" className={labelClass}>
                      العملة
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        id="bankCurrency"
                        name="bankCurrency"
                        className={selectClass}
                      >
                        <option value="ريال سعودي (SAR)">
                          ريال سعودي (SAR)
                        </option>
                        <option value="جنيه مصري (EGP)">جنيه مصري (EGP)</option>
                        <option value="درهم إماراتي (AED)">
                          درهم إماراتي (AED)
                        </option>
                        <option value="دولار أمريكي (USD)">
                          دولار أمريكي (USD)
                        </option>
                      </Field>
                      <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                    {renderError("bankCurrency")}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="iban" className={labelClass}>
                      IBAN
                    </label>
                    <Field
                      id="iban"
                      name="iban"
                      type="text"
                      placeholder="SA 00 0000 0000 0000 0000 0000"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("iban")}
                  </div>

                  {/* SWIFT Code - نصف العرض على اليمين */}
                  <div className="md:col-span-1">
                    <label htmlFor="swiftCode" className={labelClass}>
                      SWIFT Code
                    </label>
                    <Field
                      id="swiftCode"
                      name="swiftCode"
                      type="text"
                      placeholder="RJHI SA RI"
                      className={`${inputClass} text-[#7c8794]`}
                    />
                    {renderError("swiftCode")}
                  </div>
                </div>
              </section>
            </div>

            {/* Left Column (Attachments, Smart Tips & Activity Log - 4 cols) */}
            <div className="space-y-5 ">
              {/* المرفقات */}
              <section className="rounded-[20px] border border-[#e6ecf2] bg-white p-5">
                <div className="mb-4 flex items-center justify-start gap-2">
                  <FiPaperclip className="h-4 w-4 text-[#086382]" />
                  <h2 className="text-[15px] font-black text-[#086382]">
                    المرفقات
                  </h2>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFilesSelected(e.dataTransfer.files);
                  }}
                  className={`flex flex-col items-center justify-center rounded-[14px] border border-dashed px-4 py-6 text-center transition ${
                    isDragging
                      ? "border-[#086382] bg-[#f0f8fc]"
                      : "border-[#cbd5e1] bg-[#fafcfd]"
                  }`}
                >
                  <FiUploadCloud className="h-7 w-7 text-[#94a3b8]" />
                  <div className="mt-2.5 text-[12.5px] font-extrabold text-[#086382]">
                    اسحب الملفات هنا
                  </div>
                  <p className="mt-1 text-[11px] font-semibold leading-relaxed text-[#64748b]">
                    عقود، مستندات ضريبية، أو ملفات تعريفية (Max 10MB)
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3.5 rounded-[8px] border border-[#cbd5e1] bg-white px-4 py-1.5 text-[11.5px] font-bold text-[#334155] transition hover:border-[#086382] hover:text-[#086382]"
                  >
                    تصفح الجهاز
                  </button>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-3.5 space-y-2">
                    {attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-2 rounded-[12px] bg-[#f1f6f9] px-3.5 py-2.5"
                      >
                        <div className="flex min-w-0 flex-1 items-center justify-start gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#fee2e2] text-[#dc2626]">
                            <FiFileText className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 text-right">
                            <div className="truncate text-[12px] font-extrabold text-[#1e293b]">
                              {file.name}
                            </div>
                            <div className="text-[10.5px] font-bold text-[#64748b]">
                              {file.sizeLabel}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(file.id)}
                          aria-label={`حذف ${file.name}`}
                          className="text-[#94a3b8] transition hover:text-[#dc2626]"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* تلميحات ذكية */}
              <section
                className="relative overflow-hidden rounded-[20px] p-5 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #167ca1 0%, #0d6686 60%, #094f68 100%)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/[0.08]"
                />

                <div className="relative z-10 mb-2.5 flex items-center justify-start gap-2">
                  <FiHelpCircle className="h-4 w-4 text-white/90" />
                  <h2 className="text-[14px] font-black text-white">
                    تلميحات ذكية
                  </h2>
                </div>

                <p className="relative z-10 text-right text-[12px] font-semibold leading-relaxed text-white/95">
                  تأكد من إدخال الرقم الضريبي الصحيح ليتمكن النظام من احتساب
                  ضريبة القيمة المضافة تلقائياً في فواتير المشتريات القادمة.
                </p>
              </section>

              {/* سجل النشاط */}
              <section className="rounded-[20px] border border-[#e6ecf2] bg-white p-5">
                <div className="mb-3 flex items-center justify-start gap-2">
                  <FiActivity className="h-4 w-4 text-[#086382]" />
                  <h2 className="text-[14.5px] font-black text-[#086382]">
                    سجل النشاط
                  </h2>
                </div>

                <p className="text-right text-[12px] font-semibold text-[#64748b]">
                  لا يوجد نشاط مسجل لهذا المورد بعد.
                </p>
              </section>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center  gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="h-[40px] rounded-[10px] border border-[#cbd5e1] bg-white px-6 text-[13px] font-extrabold text-[#334155] transition hover:bg-[#f8fafc]"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[40px] rounded-[10px] bg-[#167293] px-7 text-[13px] font-extrabold text-white transition hover:bg-[#085570] disabled:opacity-50"
            >
              استمرار
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSupplierPage;