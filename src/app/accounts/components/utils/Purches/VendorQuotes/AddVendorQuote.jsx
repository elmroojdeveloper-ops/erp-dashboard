"use client";

import React, { useRef, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import {
  FiAlertTriangle,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiEye,
  FiFileText,
  FiInfo,
  FiLink2,
  FiLock,
  FiPlus,
  FiSave,
  FiSearch,
  FiShield,
  FiTrash2,
  FiTruck,
  FiUploadCloud,
} from "react-icons/fi";

const listHref = "/accounts/Purches/vendor-quotes";

const initialValues = {
  quoteNumber: "PQ-2024-0891",
  docTag: "DOC-REV#01",
  rfqQuery: "",
  isExceptionMode: true,
  urgentReason: "طلب عاجل أو طارئ",
  exceptionJustification:
    "شراء وتوريد مستلزمات وتجهيزات طارئة لتفادي توقف العمليات التشغيلية بانتظار استكمال دورة",
  vendor: "شركة مدار الشبكات للاتصالات • س.ت: 101082390",
  currency: "SAR ريال سعودي",
  issueDate: "10/20/2024",
  validUntil: "11/20/2024",
  validityDays: "صلاحية 30 يوماً",
  costCenter: "CC-001 • تكنولوجيا المعلومات والبنية التحتية (قسم الشبكات السحابية)",
  remainingBudget: "560,000.00",
  invoiceDiscount: "0.00",
  shippingCost: "0.00",
  shippingNote: "شامل التوصيل لمستودع الرياض السلي المركزي",
  paymentAndDeliveryTerms: "دفع آجل خلال 30 يوم من الاستلام والفحص",
  items: [
    {
      id: "1",
      name: "كابلات ألياف بصرية ومرفقات التوصيل",
      sku: "SKU: FIB-OM4-300M",
      specs: "لفة مدرجة 300 متر OM4 مع 12 محول طفي Duplex LC صرح عالي الكفاءة",
      qty: 4,
      unitPrice: 850.0,
      discount: 0.0,
    },
    {
      id: "2",
      name: "وحدات تزويد طاقة متواصلة UPS 3000VA",
      sku: "SKU: PWR-UPS-3KVA",
      specs: "خادم Rackmount مزود ببطاريات إضافية داخلية شاشة رقمية وحالات اتصال",
      qty: 2,
      unitPrice: 2650.0,
      discount: 100.0,
    },
    {
      id: "3",
      name: "محول شبكة سيسكو 24 منفذ Gigabit",
      sku: "SKU: CS-SW-24G-POE",
      specs: "مع رخصة إدارة وتحكم شبكي ومراقبة سحابية لشطة السنة واحدة Enterprise License",
      qty: 1,
      unitPrice: 1850.0,
      discount: 100.0,
    },
  ],
  notesAndTerms:
    "الأسعار شاملة التوصيل والتركيب المبدئي بمستودع السلي المركزي بالرياض. الضمان لمدة 24 شهراً من تاريخ الاستلام والتوقيع على محضر الفحص الفني. الالتزام بتوفير قطع الغيار الأصلية لمدة لا تقل عن 3 سنوات.",
};

function validate(values) {
  const errors = {};

  if (!values.vendor?.trim()) {
    errors.vendor = "المورد المعتمد مطلوب";
  }
  if (!values.issueDate?.trim()) {
    errors.issueDate = "تاريخ الإصدار مطلوب";
  }
  if (!values.validUntil?.trim()) {
    errors.validUntil = "صلاحية العرض مطلوبة";
  }
  if (!values.costCenter?.trim()) {
    errors.costCenter = "مركز التكلفة مطلوب";
  }
  if (values.isExceptionMode && !values.exceptionJustification?.trim()) {
    errors.exceptionJustification = "مبرر الاستثناء والضرورة التشغيلية مطلوب";
  }
  if (!values.paymentAndDeliveryTerms?.trim()) {
    errors.paymentAndDeliveryTerms = "شروط الدفع والتسليم مطلوبة";
  }

  if (!Array.isArray(values.items) || values.items.length === 0) {
    errors.items = "يجب إضافة بند واحد على الأقل";
  } else {
    const rowErrors = values.items.map((row) => {
      const err = {};
      if (!row.name?.trim()) err.name = "اسم الصنف مطلوب";
      if (Number(row.qty) <= 0) err.qty = "الكمية مطلوبة";
      if (Number(row.unitPrice) < 0) err.unitPrice = "السعر غير صحيح";
      return err;
    });
    if (rowErrors.some((e) => Object.keys(e).length > 0)) {
      errors.items = rowErrors;
    }
  }

  return errors;
}

const formatMoney = (val) =>
  Number(val || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const AddVendorQuote = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [attachments, setAttachments] = useState([
    {
      id: "1",
      name: "عرض_سعر_شركة_مدار.pdf",
      meta: "1.8 ميجابايت • مفحوص ومتحقق",
    },
  ]);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList || []);
    if (!arr.length) return;
    const added = arr.map((f, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: f.name,
      meta: `${Math.max(1, Math.round(f.size / 1024))} كيلوبايت • مرفق جديد`,
    }));
    setAttachments((prev) => [...prev, ...added]);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen  text-[#1e293b] font-sans select-none"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          console.log("Saved & Approved Quote:", values);
          alert("تم حفظ واعتماد عرض السعر بنجاح!");
          router.push(listHref);
        }}
      >
        {({ values, setFieldValue, errors, touched }) => {
          const itemsSubtotal = values.items.reduce(
            (sum, row) =>
              sum + Math.max(0, Number(row.qty || 0) * Number(row.unitPrice || 0) - Number(row.discount || 0)),
            0
          );

          const invoiceDiscount = Number(values.invoiceDiscount || 0);
          const taxableAmount = Math.max(0, itemsSubtotal - invoiceDiscount);
          const vatAmount = taxableAmount * 0.15;
          const shippingCost = Number(values.shippingCost || 0);
          const grandTotal = taxableAmount + vatAmount + shippingCost;
          const totalUnits = values.items.reduce(
            (sum, row) => sum + Number(row.qty || 0),
            0
          );

          return (
            <Form noValidate className="mx-auto  px-4 py-4 sm:px-6 space-y-4 pb-10">
              {/* TOP PAGE HEADER */}
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-[20px] font-black text-[#0f172a] leading-tight">
                    عرض سعر شراء جديد
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-0.5 text-[10.5px] font-bold text-[#b45309]">
                    <FiAlertTriangle className="h-3 w-3 text-[#d97706]" />
                    <span>عرض سعر استثنائي (خارج الدورة النظامية)</span>
                  </span>
                  <span className="rounded-md border border-[#e2e8f0] bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-[#64748b]">
                    {values.docTag}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => router.push(listHref)}
                    className="inline-flex h-[34px] items-center rounded-lg border border-[#e2e8f0] bg-white px-3.5 text-[11.5px] font-bold text-[#475569] transition hover:bg-[#f8fafc]"
                  >
                    إلغاء
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("تم حفظ عرض السعر كمسودة")}
                    className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[11.5px] font-bold text-[#1e293b] transition hover:bg-[#f8fafc]"
                  >
                    <FiSave className="h-3.5 w-3.5 text-[#64748b]" />
                    <span>حفظ كمسودة</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-[34px] items-center gap-1.5 rounded-lg bg-[#095c7a] px-4 text-[11.5px] font-extrabold text-white transition hover:bg-[#074961]"
                  >
                    <FiCheck className="h-3.5 w-3.5" />
                    <span>حفظ واعتماد</span>
                  </button>
                </div>
              </header>

              {/* MAIN 2-COLUMN GRID: Right (8 cols) Main Form / Left (4 cols) Summary & Shipping & Docs */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-start">
                {/* RIGHT / MAIN COLUMN (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  {/* 1. ربط اختياري بطلب عرض سعر (RFQ) والمسار الاستثنائي */}
                  <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f5f9] pb-2.5">
                      <div className="flex items-center gap-2">
                        <FiLink2 className="h-4 w-4 text-[#0d658a]" />
                        <div>
                          <h2 className="text-[13px] font-black text-[#0f172a]">
                            ربط اختياري بطلب عرض سعر (RFQ) والمسار الاستثنائي
                          </h2>
                          <p className="text-[10.5px] font-medium text-[#94a3b8]">
                            التحقق من وجود دورة استدراج أسعار سابقة أو توثيق الاستثناء الرقابي
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-1 text-[10.5px] font-bold text-[#b45309]">
                        <FiShield className="h-3 w-3 text-[#d97706]" />
                        <span>مراقبة الامتثال المالي</span>
                      </span>
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                        اربط هذا العرض بطلب عرض سعر قائم (اختياري)
                      </label>
                      <div className="relative">
                        <Field
                          name="rfqQuery"
                          type="text"
                          placeholder="ابحث برقم طلب عرض السعر (2024-RFQ-...) أو اتركه فارغاً لإنشاء طلب حر..."
                          className="h-[36px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-8 pl-3 text-[11.5px] font-medium text-[#1e293b] placeholder-[#94a3b8] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                        />
                        <FiSearch className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                      </div>
                    </div>

                    {/* Amber Warning Box */}
                    <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb]/80 p-3 text-[11px]">
                      <div className="flex items-start gap-2">
                        <FiAlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d97706]" />
                        <div>
                          <div className="font-extrabold text-[#92400e]">
                            هذا العرض غير مرتبط بطلب عرض سعر رسمي (RFQ). سيُصنف كاستثناء رقابي
                            ويتطلب توثيق مبرر الصرف التشغيلي.
                          </div>
                          <p className="mt-0.5 text-[10px] font-medium text-[#b45309]">
                            وفقاً للائحة المشتريات الموحدة، يتم رفع التكليف مباشرة لمدير الإدارة
                            المالية ومسؤول الإمداد للتحقق من صحة الشراء المباشر.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Exception Fields */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                      <div className="sm:col-span-5">
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          سبب الإنشاء المستعجل <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="urgentReason"
                            className="h-[36px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          >
                            <option value="طلب عاجل أو طارئ">طلب عاجل أو طارئ</option>
                            <option value="مورد حصري معتمد">مورد حصري معتمد</option>
                            <option value="توقف خط إنتاج / خدمة">توقف خط إنتاج / خدمة</option>
                          </Field>
                          <FiChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                        </div>
                      </div>

                      <div className="sm:col-span-7">
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          مبرر الاستثناء والضرورة التشغيلية{" "}
                          <span className="text-[#dc2626]">*</span>
                        </label>
                        <Field
                          name="exceptionJustification"
                          type="text"
                          className="h-[36px] w-full rounded-lg border border-[#cbd5e1] bg-white px-3 text-[11.5px] font-medium text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                        />
                        <ErrorMessage
                          name="exceptionJustification"
                          component="div"
                          className="mt-1 text-[10px] font-bold text-[#dc2626]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#64748b]">
                      <FiInfo className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
                      <span>
                        سيتم توجيه هذا العرض لموافقة مدير المشتريات والمدير المالي تلقائياً فور
                        الحفظ.
                      </span>
                    </div>
                  </section>

                  {/* 2. معلومات العرض الأساسية */}
                  <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3.5">
                    <div className="flex items-center gap-2 border-b border-[#f1f5f9] pb-2.5">
                      <FiFileText className="h-4 w-4 text-[#0d658a]" />
                      <div>
                        <h2 className="text-[13px] font-black text-[#0f172a]">
                          معلومات العرض الأساسية
                        </h2>
                        <p className="text-[10.5px] font-medium text-[#94a3b8]">
                          البيانات التعاقدية والتجارية ومركز التكلفة المحاسبية
                        </p>
                      </div>
                    </div>

                    {/* Row 1: رقم عرض السعر المنظومي & المورد المعتمد */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-end">
                      <div className="sm:col-span-5">
                        <div className="mb-1 flex items-center justify-between">
                          <label className="text-[11px] font-bold text-[#334155]">
                            رقم عرض السعر المنظومي
                          </label>
                          <span className="text-[10px] font-bold text-[#94a3b8]">
                            توليد تلقائي
                          </span>
                        </div>
                        <div className="relative">
                          <Field
                            name="quoteNumber"
                            readOnly
                            className="h-[36px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-8 text-[12px] font-black text-[#0f172a] focus:outline-none"
                          />
                          <FiLock className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                        </div>
                      </div>

                      <div className="sm:col-span-7 flex items-end gap-2">
                        <div className="flex-1 min-w-0">
                          <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                            المورد المعتمد <span className="text-[#dc2626]">*</span>
                          </label>
                          <Field
                            name="vendor"
                            type="text"
                            className="h-[36px] w-full rounded-lg border border-[#cbd5e1] bg-white px-3 text-[11.5px] font-extrabold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          />
                          <ErrorMessage
                            name="vendor"
                            component="div"
                            className="mt-1 text-[10px] font-bold text-[#dc2626]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "vendor",
                              "شركة الخزائن المتقدمة للتجارة • س.ت: 1010489201"
                            )
                          }
                          className="h-[36px] shrink-0 rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[11px] font-bold text-[#475569] transition hover:bg-[#f8fafc]"
                        >
                          تغيير
                        </button>
                      </div>
                    </div>

                    {/* Row 2: تاريخ الإصدار & صالح حتى & العملة الرسمية */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          تاريخ الإصدار <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            name="issueDate"
                            type="text"
                            className="h-[36px] w-full rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          />
                          <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                        </div>
                        <ErrorMessage
                          name="issueDate"
                          component="div"
                          className="mt-1 text-[10px] font-bold text-[#dc2626]"
                        />
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <label className="text-[11px] font-bold text-[#334155]">
                            صالح حتى <span className="text-[#dc2626]">*</span>
                          </label>
                          <span className="rounded bg-[#f0f9ff] px-1.5 py-0.5 text-[9.5px] font-bold text-[#0d658a]">
                            {values.validityDays}
                          </span>
                        </div>
                        <div className="relative">
                          <Field
                            name="validUntil"
                            type="text"
                            className="h-[36px] w-full rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          />
                          <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                        </div>
                        <ErrorMessage
                          name="validUntil"
                          component="div"
                          className="mt-1 text-[10px] font-bold text-[#dc2626]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          العملة الرسمية
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="currency"
                            className="h-[36px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          >
                            <option value="SAR ريال سعودي">SAR ريال سعودي</option>
                            <option value="USD دولار أمريكي">USD دولار أمريكي</option>
                          </Field>
                          <FiChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: مركز التكلفة والمشروع المحاسبي */}
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#334155]">
                          مركز التكلفة والمشروع المحاسبي{" "}
                          <span className="text-[#dc2626]">*</span>
                        </label>
                        <span className="text-[10.5px] font-bold text-[#0d658a]">
                          الرصيد المتبقي بالميزانية: {values.remainingBudget} ر.س
                        </span>
                      </div>
                      <div className="relative">
                        <Field
                          as="select"
                          name="costCenter"
                          className="h-[36px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                        >
                          <option value="CC-001 • تكنولوجيا المعلومات والبنية التحتية (قسم الشبكات السحابية)">
                            CC-001 • تكنولوجيا المعلومات والبنية التحتية (قسم الشبكات السحابية)
                          </option>
                          <option value="CC-002 • إدارة العمليات والخدمات اللوجستية">
                            CC-002 • إدارة العمليات والخدمات اللوجستية
                          </option>
                        </Field>
                        <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                      </div>
                      <ErrorMessage
                        name="costCenter"
                        component="div"
                        className="mt-1 text-[10px] font-bold text-[#dc2626]"
                      />
                    </div>
                  </section>

                  {/* 3. بنود العرض والأسعار التفصيلية */}
                  <section className="overflow-hidden rounded-xl border border-[#e6ecf2] bg-white shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
                      <div className="flex items-center gap-2">
                        <FiFileText className="h-4 w-4 text-[#0d658a]" />
                        <div>
                          <h2 className="text-[13px] font-black text-[#0f172a]">
                            بنود العرض والأسعار التفصيلية
                          </h2>
                          <p className="text-[10.5px] font-medium text-[#94a3b8]">
                            جدول الأصناف والكميات ومواصفات التوريد المعتمدة
                          </p>
                        </div>
                      </div>

                      <FieldArray name="items">
                        {({ push }) => (
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                id: String(Date.now()),
                                name: "",
                                sku: "SKU: NEW-ITEM",
                                specs: "",
                                qty: 1,
                                unitPrice: 0,
                                discount: 0,
                              })
                            }
                            className="inline-flex h-[30px] items-center gap-1 rounded-lg bg-[#0d658a] px-3 text-[11px] font-bold text-white transition hover:bg-[#094e6b]"
                          >
                            <FiPlus className="h-3.5 w-3.5" />
                            <span>إضافة سطر بند جديد</span>
                          </button>
                        )}
                      </FieldArray>
                    </div>

                    <FieldArray name="items">
                      {({ remove }) => (
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[740px] border-collapse text-right text-[11.5px]">
                            <thead>
                              <tr className="border-y border-[#e6ecf2] bg-[#f8fafc] text-[10.5px] font-extrabold text-[#64748b]">
                                <th className="w-9 px-2 py-2.5 text-center">#</th>
                                <th className="px-3 py-2.5">الصنف والاسم التجاري</th>
                                <th className="min-w-[190px] px-3 py-2.5">
                                  الوصف الفني والمواصفات القياسية
                                </th>
                                <th className="w-16 px-2 py-2.5 text-center">الكمية</th>
                                <th className="w-24 px-2 py-2.5 text-center">سعر الوحدة</th>
                                <th className="w-20 px-2 py-2.5 text-center">الخصم</th>
                                <th className="w-28 px-3 py-2.5 text-left">الإجمالي الفرعي</th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-[#f1f5f9]">
                              {values.items.map((row, idx) => {
                                const gross =
                                  Number(row.qty || 0) * Number(row.unitPrice || 0);
                                const rowNet = Math.max(
                                  0,
                                  gross - Number(row.discount || 0)
                                );
                                const rowErr = Array.isArray(errors.items)
                                  ? errors.items[idx]
                                  : null;
                                const rowTouch = Array.isArray(touched.items)
                                  ? touched.items[idx]
                                  : null;

                                return (
                                  <tr
                                    key={row.id || idx}
                                    className="hover:bg-[#fafcfd] align-middle"
                                  >
                                    <td className="px-2 py-3 text-center text-[11px] font-bold text-[#94a3b8]">
                                      {idx + 1}
                                    </td>

                                    <td className="px-3 py-3">
                                      <Field
                                        name={`items[${idx}].name`}
                                        type="text"
                                        className="w-full rounded border border-transparent bg-transparent px-1 py-0.5 text-[12px] font-extrabold text-[#0f172a] hover:border-[#e2e8f0] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                      />
                                      <div className="mt-0.5 px-1 font-mono text-[9.5px] font-bold text-[#94a3b8]">
                                        {row.sku}
                                      </div>
                                      {rowErr?.name && rowTouch?.name ? (
                                        <div className="text-[10px] font-bold text-[#dc2626]">
                                          {rowErr.name}
                                        </div>
                                      ) : null}
                                    </td>

                                    <td className="px-3 py-3">
                                      <Field
                                        name={`items[${idx}].specs`}
                                        type="text"
                                        className="w-full rounded border border-transparent bg-transparent px-1 py-0.5 text-[10.5px] font-medium leading-snug text-[#64748b] hover:border-[#e2e8f0] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                      />
                                    </td>

                                    <td className="px-2 py-3 text-center">
                                      <Field
                                        name={`items[${idx}].qty`}
                                        type="number"
                                        min={1}
                                        className="h-[30px] w-14 rounded-md border border-[#e2e8f0] bg-[#f8fafc] text-center text-[12px] font-extrabold text-[#0f172a] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                      />
                                    </td>

                                    <td className="px-2 py-3 text-center">
                                      <Field
                                        name={`items[${idx}].unitPrice`}
                                        type="number"
                                        step="0.01"
                                        className="h-[30px] w-20 rounded-md border border-[#e2e8f0] bg-[#f8fafc] text-center text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                      />
                                    </td>

                                    <td className="px-2 py-3 text-center">
                                      <Field
                                        name={`items[${idx}].discount`}
                                        type="number"
                                        step="0.01"
                                        className="h-[30px] w-16 rounded-md border border-[#e2e8f0] bg-[#f8fafc] text-center text-[11.5px] font-bold text-[#475569] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                      />
                                    </td>

                                    <td className="px-3 py-3 text-left">
                                      <div className="flex items-center justify-end gap-2">
                                        <div className="text-left">
                                          <div className="text-[12px] font-black text-[#0f172a]">
                                            {formatMoney(rowNet)}
                                          </div>
                                          <div className="text-[9.5px] font-semibold text-[#94a3b8]">
                                            ر.س
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          disabled={values.items.length <= 1}
                                          onClick={() => remove(idx)}
                                          className="rounded p-1 text-[#cbd5e1] transition hover:text-[#dc2626] disabled:opacity-30"
                                          aria-label="حذف البند"
                                        >
                                          <FiTrash2 className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </FieldArray>
                  </section>

                  {/* 4. الملاحظات والأحكام الخاصة بالعرض */}
                  <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center gap-2">
                      <FiFileText className="h-4 w-4 text-[#0d658a]" />
                      <div>
                        <h2 className="text-[13px] font-black text-[#0f172a]">
                          الملاحظات والأحكام الخاصة بالعرض
                        </h2>
                        <p className="text-[10.5px] font-medium text-[#94a3b8]">
                          الشروط الفنية، الضمان، وفترات التوريد المتفق عليها مع المورد
                        </p>
                      </div>
                    </div>

                    <Field
                      as="textarea"
                      name="notesAndTerms"
                      rows={3}
                      className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3 text-[11px] font-medium leading-relaxed text-[#475569] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                    />
                  </section>
                </div>

                {/* LEFT SIDEBAR COLUMN (4 cols): الملخص المالي والضريبي + الشحن وشروط الدفع + وثائق ومرفقات العرض الأصلية */}
                <aside className="lg:col-span-4 space-y-4">
                  {/* الملخص المالي والضريبي */}
                  <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
                      <div className="flex items-center gap-2">
                        <FiFileText className="h-4 w-4 text-[#0d658a]" />
                        <h2 className="text-[13px] font-black text-[#0f172a]">
                          الملخص المالي والضريبي
                        </h2>
                      </div>
                      <span className="rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold text-[#64748b]">
                        ضريبة 15%
                      </span>
                    </div>

                    <div className="space-y-2 text-[11.5px]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#64748b]">
                          إجمالي البنود الفرعي
                        </span>
                        <strong className="font-extrabold text-[#0f172a]">
                          {formatMoney(itemsSubtotal)} ر.س
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#64748b]">
                          الخصومات الممنوحة
                        </span>
                        <strong className="font-extrabold text-[#dc2626]">
                          -{formatMoney(invoiceDiscount)} ر.س
                        </strong>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#f1f5f9] pt-2">
                        <span className="font-semibold text-[#64748b]">
                          المبلغ الخاضع للضريبة
                        </span>
                        <strong className="font-extrabold text-[#1e293b]">
                          {formatMoney(taxableAmount)} ر.س
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#64748b]">
                          ضريبة القيمة المضافة (15%)
                        </span>
                        <strong className="font-extrabold text-[#1e293b]">
                          {formatMoney(vatAmount)} ر.س
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#64748b]">
                          رسوم الشحن والمناولة
                        </span>
                        <strong className="font-bold text-[#16a34a]">
                          {shippingCost > 0
                            ? `${formatMoney(shippingCost)} ر.س`
                            : "0.00 ر.س (مجاني)"}
                        </strong>
                      </div>
                    </div>

                    {/* Grand Total Highlight Box */}
                    <div className="rounded-xl border border-[#bae6fd] bg-[#f0f9ff] p-3.5 text-right">
                      <span className="block text-[10px] font-bold text-[#0369a1]">
                        الإجمالي الكلي النهائي المستحق:
                      </span>
                      <div className="mt-1 text-[20px] font-black text-[#095c7a] leading-tight">
                        {formatMoney(grandTotal)}{" "}
                        <span className="text-[12px] font-extrabold">ريال سعودي</span>
                      </div>
                      <span className="mt-0.5 block text-[9.5px] font-semibold text-[#64748b]">
                        شامل كافة الضرائب ورسوم التوصيل
                      </span>
                    </div>
                  </section>

                  {/* الشحن وشروط الدفع */}
                  <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#f1f5f9] pb-2">
                      <FiTruck className="h-4 w-4 text-[#0d658a]" />
                      <h2 className="text-[13px] font-black text-[#0f172a]">
                        الشحن وشروط الدفع
                      </h2>
                    </div>

                    <div>
                      <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
                        الخصم الإجمالي الإضافي على الفاتورة
                      </label>
                      <div className="relative">
                        <Field
                          name="invoiceDiscount"
                          type="number"
                          step="0.01"
                          className="h-[34px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-9 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                        />
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#94a3b8]">
                          ر.س
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
                        تكلفة الشحن والتوصيل المقدرة
                      </label>
                      <div className="relative">
                        <Field
                          name="shippingCost"
                          type="number"
                          step="0.01"
                          className="h-[34px] w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] pr-3 pl-9 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                        />
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#94a3b8]">
                          ر.س
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] font-medium text-[#94a3b8]">
                        {values.shippingNote}
                      </p>
                    </div>

                    <div>
                      <label className="mb-1 block text-[10.5px] font-bold text-[#64748b]">
                        شروط الدفع والتسليم <span className="text-[#dc2626]">*</span>
                      </label>
                      <Field
                        name="paymentAndDeliveryTerms"
                        type="text"
                        className="h-[34px] w-full rounded-lg border border-[#e2e8f0] bg-white px-3 text-[11px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                      />
                      <ErrorMessage
                        name="paymentAndDeliveryTerms"
                        component="div"
                        className="mt-1 text-[10px] font-bold text-[#dc2626]"
                      />
                    </div>
                  </section>

                  {/* وثائق ومرفقات العرض الأصلية */}
                  <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
                      <div className="flex items-center gap-2">
                        <FiFileText className="h-4 w-4 text-[#0d658a]" />
                        <h2 className="text-[13px] font-black text-[#0f172a]">
                          وثائق ومرفقات العرض الأصلية
                        </h2>
                      </div>
                      <span className="rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold text-[#64748b]">
                        {attachments.length} ملف مرفق
                      </span>
                    </div>

                    {/* Dropzone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFiles(e.dataTransfer.files);
                      }}
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd5e1] bg-[#fafcfd] px-3 py-4 text-center transition hover:border-[#0d658a]"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xlsx,.png,.jpg"
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                      />
                      <FiUploadCloud className="h-5 w-5 text-[#94a3b8]" />
                      <p className="mt-1.5 text-[11px] font-bold text-[#475569]">
                        اسحب الملفات هنا أو اضغط للاختيار
                      </p>
                      <p className="mt-0.5 text-[9.5px] font-medium text-[#94a3b8]">
                        صيغ PDF, DOCX, XLSX أو الصور حتى 25 MB
                      </p>
                    </div>

                    {/* Attached Files */}
                    <div className="space-y-2">
                      {attachments.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between gap-2 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#fee2e2] text-[10px] font-black text-[#dc2626]">
                              PDF
                            </span>
                            <div className="min-w-0">
                              <div className="truncate text-[11px] font-extrabold text-[#1e293b]">
                                {file.name}
                              </div>
                              <div className="truncate text-[9.5px] font-bold text-[#16a34a] flex items-center gap-1">
                                <FiCheckCircle className="h-2.5 w-2.5" />
                                <span>{file.meta}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 text-[#94a3b8]">
                            <button
                              type="button"
                              onClick={() => alert(`معاينة: ${file.name}`)}
                              className="rounded p-1 hover:bg-white hover:text-[#0d658a]"
                              aria-label="معاينة"
                            >
                              <FiEye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setAttachments((prev) =>
                                  prev.filter((f) => f.id !== file.id)
                                )
                              }
                              className="rounded p-1 hover:bg-white hover:text-[#dc2626]"
                              aria-label="حذف"
                            >
                              <FiTrash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>

              {/* BOTTOM SUMMARY BAR */}
              <footer className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e6ecf2] bg-white px-4 py-3 shadow-2xs text-[11.5px]">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-bold text-[#1e293b]">
                    البنود:{" "}
                    <strong className="font-black text-[#0f172a]">
                      {values.items.length} أصناف ({totalUnits} وحدات)
                    </strong>
                  </span>
                  <span className="text-[#cbd5e1]">|</span>
                  <span className="font-bold text-[#1e293b]">
                    الإجمالي شامل الضريبة:{" "}
                    <strong className="font-black text-[#095c7a]">
                      {formatMoney(grandTotal)} ر.س
                    </strong>
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-1 text-[10.5px] font-bold text-[#b45309]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                  <span>المسار الرقابي: استثنائي مباشر</span>
                </span>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddVendorQuote;