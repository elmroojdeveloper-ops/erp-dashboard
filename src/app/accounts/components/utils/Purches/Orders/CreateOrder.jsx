"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  FiAlertTriangle,
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiMapPin,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiFileText,
  FiEye,
  FiSave,
  FiArrowRight,
  FiInfo,
  FiShield,
} from "react-icons/fi";

const validationSchema = Yup.object().shape({
  bypassReason: Yup.string().required("السبب النظامي للتجاوز مطلوب"),
  justificationDetails: Yup.string().required("النص التفصيلي ومستندات التدقيق مطلوب"),
  vendor: Yup.string().required("المورد المعتمد مطلوب"),
  costCenter: Yup.string().required("مركز التكلفة المعتمد مطلوب"),
  issueDate: Yup.string().required("تاريخ الإصدار مطلوب"),
  expectedDeliveryDate: Yup.string().required("تاريخ التسليم المتوقع مطلوب"),
  paymentTerms: Yup.string().required("طريقة الدفع وشروط السداد مطلوبة"),
  deliveryLocation: Yup.string().required("شروط ومقر التسليم مطلوب"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        itemName: Yup.string().required("اسم الصنف مطلوب"),
        specs: Yup.string().required("الوصف الفني مطلوب"),
        qty: Yup.number()
          .typeError("يجب أن يكون رقماً")
          .min(1, "الكمية يجب أن تكون 1 على الأقل")
          .required("الكمية مطلوبة"),
        unit: Yup.string().required("الوحدة مطلوبة"),
        unitPrice: Yup.number()
          .typeError("يجب أن يكون رقماً")
          .min(0, "السعر غير صحيح")
          .required("سعر الوحدة مطلوب"),
        vatRate: Yup.number().min(0).required("الضريبة مطلوبة"),
      })
    )
    .min(1, "يجب إضافة بند واحد على الأقل"),
});

const CreateOrder = () => {
  const router = useRouter();
  const [attachments, setAttachments] = useState([
    {
      id: "1",
      name: "شهادة_الوكالة_الحصرية_2024.pdf",
      meta: "1.4 ميجابايت • تم التوقيع رقمياً بواسطة الطرف الثاني",
      badge: "PDF",
    },
    {
      id: "2",
      name: "عرض_السعر_المباشر_المعتمد.pdf",
      meta: "840 كيلوبايت • معتمد فني",
      badge: "PDF",
    },
  ]);

  const [previewOpen, setPreviewOpen] = useState(false);

  const initialValues = {
    draftNumber: "PO-DRAFT-2024-048",
    bypassReason: "مورد حصري (Sole Source) معتمد رسمياً",
    justificationDetails:
      "تم الاعتماد بموجب شهادة الوكالة الحصرية رقم SA-EX-992 الموثقة لدى وزارة التجارة مع استيفاء شهادة عدم وجود بديل محلي مطابق للمواصفات.",
    licenseMeta: "شهادة موافقة SA-202-0942 منتهية الترخيص ساري حتى 2025/12/31",
    vendor: "شركة الخزائن المتقدمة للتجارة والتقنية (CR: 1010489201)",
    vendorBadge: "تصنيف: مورد فئة أ • رقم الهوية: 300168812000003",
    costCenter: "CC-001 — إدارة تقنية المعلومات والبنية التحتية",
    costCenterOwner: "مد: تقنية المعلومات 2024",
    budgetUsed: 185000,
    budgetRemaining: 335000,
    issueDate: "11/18/2024",
    expectedDeliveryDate: "11/20/2024",
    paymentTerms: "تحويل بنكي، أجل انتقال 30 يوم من الاستلام والفحص",
    deliveryLocation: "تسليم المستودع المركزي - شامل الشحن والتفريغ، (RPH)",
    discountAmount: 0,
    items: [
      {
        id: "01",
        itemName: "خوادم تخزين سحابية NVMe Gen4",
        specs: "وحدة تخزين مدمجة عالية الكفاءة 64TB مع معالجات ثنائية",
        qty: 7,
        unit: "وحدة",
        unitPrice: 10500.0,
        vatRate: 15,
      },
      {
        id: "02",
        itemName: "تراخيص نظام الحماية الشبكية",
        specs: "اشتراك سنوي للمنظومة الأمنية المؤسسية Enterprise يعمل 24/7",
        qty: 1,
        unit: "ترخيص",
        unitPrice: 25000.0,
        vatRate: 15,
      },
      {
        id: "03",
        itemName: "كابلات ألياف ضوئية عالية السرعة OM4",
        specs: "بطول 50 متر مع موصلات LC/LC مصنعة عالية المتانة",
        qty: 10,
        unit: "بكرة",
        unitPrice: 450.0,
        vatRate: 15,
      },
    ],
  };

  const formatNumber = (num) => {
    return Number(num || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const mapped = files.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      meta: `${(file.size / 1024).toFixed(0)} كيلوبايت • تم الإرفاق`,
      badge: file.name.split(".").pop()?.toUpperCase() || "FILE",
    }));
    setAttachments((prev) => [...prev, ...mapped]);
  };

  return (
    <div
      dir="rtl"
      className="min-h-0 text-[#1e293b] font-sans"
      style={{ fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Manual PO Submitted:", values);
          alert("تم حفظ ومعاينة أمر الشراء اليدوي بنجاح!");
        }}
      >
        {({ values, setFieldValue }) => {
          const subtotal = values.items.reduce(
            (sum, item) => sum + Number(item.qty || 0) * Number(item.unitPrice || 0),
            0
          );
          const vatTotal = values.items.reduce(
            (sum, item) =>
              sum +
              Number(item.qty || 0) *
                Number(item.unitPrice || 0) *
                (Number(item.vatRate || 0) / 100),
            0
          );
          const discount = Number(values.discountAmount || 0);
          const grandTotal = Math.max(0, subtotal + vatTotal - discount);
          const budgetPercent = Math.min(
            100,
            Math.round((values.budgetUsed / (values.budgetUsed + values.budgetRemaining || 1)) * 100)
          );

          return (
            <Form className="mx-auto  space-y-4  py-4 pb-3 ">
              {/* PAGE HEADER */}
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-[20px] font-black text-[#0f172a] leading-tight">
                      إنشاء أمر شراء يدوي
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2 py-0.5 text-[10.5px] font-bold text-[#b45309]">
                      <FiAlertTriangle className="h-3 w-3 text-[#d97706]" />
                      <span>استثنائي</span>
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] font-medium text-[#64748b]">
                    يُستخدم هذا النموذج للحالات الاستثنائية فقط عند طلب عاجل، مورد حصري، أو
                    دمج تسعير رقابي ومطابقة ملزمة مع اللوائح الداخلية المالية.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[11px] font-bold text-[#475569] shadow-2xs">
                  <FiFileText className="h-3.5 w-3.5 text-[#0d658a]" />
                  <span>رقم مسودة الأمر:</span>
                  <strong className="font-black text-[#0f172a]">{values.draftNumber}</strong>
                </div>
              </header>

              {/* SECTION 1: سبب عدم المرور بمسار المقارنة */}
              <section className="rounded-xl border border-[#fde68a] bg-white p-4 shadow-2xs space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#fef3c7] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]">
                      <FiAlertTriangle className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h2 className="text-[13.5px] font-black text-[#0f172a]">
                        سبب عدم المرور بمسار المقارنة (إلزامي للرقابة الداخلية)
                      </h2>
                      <p className="text-[10.5px] font-medium text-[#64748b]">
                        يتم توثيق هذا القرار بموجب المادة 94 من لائحة تنظيم المشتريات الحكومية
                        والمؤسسية
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-0.5 text-[10.5px] font-bold text-[#b45309]">
                    <FiShield className="h-3 w-3" />
                    <span>تجاوز إجرائي موثق</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-12">
                  {/* السبب النظامي للتجاوز */}
                  <div className="md:col-span-5">
                    <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                      السبب النظامي للتجاوز <span className="text-[#dc2626]">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        name="bypassReason"
                        className="h-[38px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                      >
                        <option value="مورد حصري (Sole Source) معتمد رسمياً">
                          مورد حصري (Sole Source) معتمد رسمياً
                        </option>
                        <option value="طلب شراء عاجل / طارئ">
                          طلب شراء عاجل / طارئ
                        </option>
                        <option value="توحيد مواصفات فنية وتوافقية">
                          توحيد مواصفات فنية وتوافقية
                        </option>
                      </Field>
                      <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                    <ErrorMessage
                      name="bypassReason"
                      component="div"
                      className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                    />

                    <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-[10.5px] font-semibold text-[#475569]">
                      <FiInfo className="h-3.5 w-3.5 shrink-0 text-[#0d658a]" />
                      <span className="truncate">{values.licenseMeta}</span>
                    </div>
                  </div>

                  {/* النص التفصيلي ومستندات التدقيق */}
                  <div className="md:col-span-7">
                    <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                      النص التفصيلي ومستندات التدقيق <span className="text-[#dc2626]">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="justificationDetails"
                      rows={3}
                      className="w-full rounded-lg border border-[#cbd5e1] bg-white p-2.5 text-[11.5px] font-medium leading-relaxed text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                    />
                    <ErrorMessage
                      name="justificationDetails"
                      component="div"
                      className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                    />
                  </div>
                </div>

                {/* Governance Notice Bar */}
                <div className="flex items-center gap-2 rounded-lg border border-[#fde68a]/80 bg-[#fffbeb]/80 px-3 py-2 text-[11px] font-bold text-[#92400e]">
                  <FiShield className="h-3.5 w-3.5 shrink-0 text-[#d97706]" />
                  <span>
                    تنبيه حوكمة: سيتم توثيق هذا السبب ورقم الموظف المسؤول (سلطان العتيبي - #4821)
                    في سجل التدقيق الإداري والرقابة الداخلية تلقائياً ولن يقبل التعديل بعد
                    الاعتماد المالي.
                  </span>
                </div>
              </section>

              {/* SECTION 2: المعلومات الأساسية والتعاقدية */}
              <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
                  <div className="flex items-center gap-2">
                    <FiFileText className="h-4 w-4 text-[#0d658a]" />
                    <h2 className="text-[13.5px] font-black text-[#0f172a]">
                      المعلومات الأساسية والتعاقدية
                    </h2>
                  </div>
                  <span className="text-[10.5px] font-semibold text-[#94a3b8]">
                    إدخال البيانات التعاقدية والمالية
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  {/* Right Column (6 cols) */}
                  <div className="md:col-span-6 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#334155]">
                          المورد المعتمد <span className="text-[#dc2626]">*</span>
                        </label>
                        <button
                          type="button"
                          className="text-[10.5px] font-bold text-[#0d658a] hover:underline"
                        >
                          + إضافة مورد
                        </button>
                      </div>
                      <div className="relative">
                        <Field
                          name="vendor"
                          type="text"
                          className="h-[38px] w-full rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                        />
                        <FiSearch className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                      </div>
                      <ErrorMessage
                        name="vendor"
                        component="div"
                        className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                      />
                      <div className="mt-1.5 flex items-center justify-between text-[10.5px] font-semibold text-[#64748b]">
                        <span>{values.vendorBadge}</span>
                        <span className="font-bold text-[#16a34a]">مورد نشط ومعتمد</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          تاريخ الإصدار <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            name="issueDate"
                            type="text"
                            className="h-[36px] w-full rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          />
                          <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                        </div>
                        <ErrorMessage
                          name="issueDate"
                          component="div"
                          className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          تاريخ التسليم المتوقع <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            name="expectedDeliveryDate"
                            type="text"
                            className="h-[36px] w-full rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          />
                          <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                        </div>
                        <ErrorMessage
                          name="expectedDeliveryDate"
                          component="div"
                          className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Left Column (6 cols) */}
                  <div className="md:col-span-6 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#334155]">
                          مركز التكلفة المعتمد <span className="text-[#dc2626]">*</span>
                        </label>
                        <span className="text-[10.5px] font-bold text-[#0d658a]">
                          {values.costCenterOwner}
                        </span>
                      </div>
                      <div className="relative">
                        <Field
                          as="select"
                          name="costCenter"
                          className="h-[38px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-8 text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                        >
                          <option value="CC-001 — إدارة تقنية المعلومات والبنية التحتية">
                            CC-001 — إدارة تقنية المعلومات والبنية التحتية
                          </option>
                          <option value="CC-102 — اللوجستيات والمستودعات">
                            CC-102 — اللوجستيات والمستودعات
                          </option>
                        </Field>
                        <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                      </div>
                      <ErrorMessage
                        name="costCenter"
                        component="div"
                        className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                      />

                      {/* Budget Bar Box */}
                      <div className="mt-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-[#64748b]">رصيد الميزانية الحالية</span>
                          <span className="text-[#0d658a]">
                            الميزانية المتاحة تغطي ({budgetPercent}%) بكفاءة عالية
                          </span>
                        </div>
                        <div className="my-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div
                            className="h-full rounded-full bg-[#0d658a]"
                            style={{ width: `${budgetPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-[#64748b]">
                          <span>
                            المستهلك: <strong className="text-[#1e293b]">{values.budgetUsed.toLocaleString()} ر.س</strong>
                          </span>
                          <span>
                            المتبقي: <strong className="text-[#0d658a]">{values.budgetRemaining.toLocaleString()} ر.س</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          طريقة الدفع وشروط السداد <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="paymentTerms"
                            className="h-[36px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-3 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          >
                            <option value="تحويل بنكي، أجل انتقال 30 يوم من الاستلام والفحص">
                              تحويل بنكي، أجل انتقال 30 يوم من الاستلام والفحص
                            </option>
                            <option value="دفع آجل 60 يوماً بعد المطابقة الثلاثية">
                              دفع آجل 60 يوماً بعد المطابقة الثلاثية
                            </option>
                          </Field>
                          <FiChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                        </div>
                        <ErrorMessage
                          name="paymentTerms"
                          component="div"
                          className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-bold text-[#334155]">
                          شروط ومقر التسليم <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="deliveryLocation"
                            className="h-[36px] w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pr-8 pl-7 text-[11.5px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                          >
                            <option value="تسليم المستودع المركزي - شامل الشحن والتفريغ، (RPH)">
                              تسليم المستودع المركزي - شامل الشحن والتفريغ، (RPH)
                            </option>
                            <option value="مستودع السلي المركزي - الرياض">
                              مستودع السلي المركزي - الرياض
                            </option>
                          </Field>
                          <FiMapPin className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94a3b8]" />
                          <FiChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                        </div>
                        <ErrorMessage
                          name="deliveryLocation"
                          component="div"
                          className="mt-1 text-[10.5px] font-bold text-[#dc2626]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: بنود ومواصفات الأمر */}
              <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f5f9] pb-2.5">
                  <div className="flex items-center gap-2">
                    <FiFileText className="h-4 w-4 text-[#0d658a]" />
                    <h2 className="text-[13.5px] font-black text-[#0f172a]">
                      بنود ومواصفات الأمر ({values.items.length} أصناف مسجلة)
                    </h2>
                    <span className="text-[10.5px] font-medium text-[#94a3b8]">
                      الأسعار خاضعة لسياسة الفواتير الضريبية المعتمدة
                    </span>
                  </div>

                  <FieldArray name="items">
                    {({ push }) => (
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            id: String(values.items.length + 1).padStart(2, "0"),
                            itemName: "",
                            specs: "",
                            qty: 1,
                            unit: "وحدة",
                            unitPrice: 0,
                            vatRate: 15,
                          })
                        }
                        className="inline-flex h-[32px] items-center gap-1.5 rounded-lg bg-[#0d658a] px-3 text-[11.5px] font-bold text-white transition hover:bg-[#094e6b]"
                      >
                        <FiPlus className="h-3.5 w-3.5" />
                        <span>إضافة سطر جديد</span>
                      </button>
                    )}
                  </FieldArray>
                </div>

                <FieldArray name="items">
                  {({ remove }) => (
                    <div className="overflow-x-auto rounded-lg border border-[#e6ecf2]">
                      <table className="w-full min-w-[820px] border-collapse text-right">
                        <thead>
                          <tr className="border-b border-[#e6ecf2] bg-[#f8fafc] text-[11px] font-extrabold text-[#64748b]">
                            <th className="px-3 py-2.5 text-center">إجراء</th>
                            <th className="px-3 py-2.5 text-left">المجموع (ر.س)</th>
                            <th className="px-3 py-2.5 text-center">الضريبة</th>
                            <th className="px-3 py-2.5 text-center">سعر الوحدة (ر.س)</th>
                            <th className="px-3 py-2.5 text-center">الوحدة</th>
                            <th className="px-3 py-2.5 text-center">الكمية</th>
                            <th className="px-3 py-2.5">الوصف الفني التفصيلي</th>
                            <th className="px-3 py-2.5">الصنف / الخدمة</th>
                            <th className="w-10 px-2.5 py-2.5 text-center">#</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-[#f1f5f9] text-[12px]">
                          {values.items.map((item, idx) => {
                            const lineTotal =
                              Number(item.qty || 0) * Number(item.unitPrice || 0);

                            return (
                              <tr key={idx} className="hover:bg-[#fafcfd] align-middle">
                                {/* إجراء */}
                                <td className="px-3 py-3 text-center">
                                  <button
                                    type="button"
                                    disabled={values.items.length <= 1}
                                    onClick={() => remove(idx)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#94a3b8] transition hover:bg-[#fff1f2] hover:text-[#e11d48] disabled:opacity-30"
                                    aria-label="حذف البند"
                                  >
                                    <FiTrash2 className="h-3.5 w-3.5" />
                                  </button>
                                </td>

                                {/* المجموع */}
                                <td className="px-3 py-3 text-left font-black text-[#0f172a]">
                                  {formatNumber(lineTotal)}
                                </td>

                                {/* الضريبة */}
                                <td className="px-3 py-3 text-center font-bold text-[#0d658a]">
                                  {item.vatRate}%
                                </td>

                                {/* سعر الوحدة */}
                                <td className="px-3 py-3 text-center">
                                  <Field
                                    name={`items[${idx}].unitPrice`}
                                    type="number"
                                    step="0.01"
                                    className="h-[32px] w-24 rounded-md border border-[#cbd5e1] bg-white px-2 text-center text-[12px] font-bold text-[#1e293b] focus:border-[#0d658a] focus:outline-none"
                                  />
                                  <ErrorMessage
                                    name={`items[${idx}].unitPrice`}
                                    component="div"
                                    className="mt-0.5 text-[10px] font-bold text-[#dc2626]"
                                  />
                                </td>

                                {/* الوحدة */}
                                <td className="px-3 py-3 text-center">
                                  <Field
                                    name={`items[${idx}].unit`}
                                    type="text"
                                    className="h-[32px] w-20 rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-2 text-center text-[11.5px] font-bold text-[#475569] focus:border-[#0d658a] focus:outline-none"
                                  />
                                </td>

                                {/* الكمية */}
                                <td className="px-3 py-3 text-center">
                                  <Field
                                    name={`items[${idx}].qty`}
                                    type="number"
                                    min={1}
                                    className="h-[32px] w-16 rounded-md border border-[#cbd5e1] bg-white px-2 text-center text-[12px] font-extrabold text-[#0f172a] focus:border-[#0d658a] focus:outline-none"
                                  />
                                  <ErrorMessage
                                    name={`items[${idx}].qty`}
                                    component="div"
                                    className="mt-0.5 text-[10px] font-bold text-[#dc2626]"
                                  />
                                </td>

                                {/* الوصف الفني التفصيلي */}
                                <td className="px-3 py-3 max-w-[210px]">
                                  <Field
                                    name={`items[${idx}].specs`}
                                    type="text"
                                    placeholder="الوصف الفني..."
                                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-[11px] font-medium text-[#64748b] hover:border-[#e2e8f0] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                  />
                                  <ErrorMessage
                                    name={`items[${idx}].specs`}
                                    component="div"
                                    className="text-[10px] font-bold text-[#dc2626]"
                                  />
                                </td>

                                {/* الصنف / الخدمة */}
                                <td className="px-3 py-3 max-w-[180px]">
                                  <Field
                                    name={`items[${idx}].itemName`}
                                    type="text"
                                    placeholder="اسم الصنف..."
                                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-[12px] font-extrabold text-[#0f172a] hover:border-[#e2e8f0] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                                  />
                                  <ErrorMessage
                                    name={`items[${idx}].itemName`}
                                    component="div"
                                    className="text-[10px] font-bold text-[#dc2626]"
                                  />
                                </td>

                                {/* # */}
                                <td className="px-2.5 py-3 text-center text-[11px] font-bold text-[#94a3b8]">
                                  {String(idx + 1).padStart(2, "0")}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </FieldArray>

                {/* Add From Warehouse Button */}
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("items", [
                      ...values.items,
                      {
                        id: String(values.items.length + 1).padStart(2, "0"),
                        itemName: "صنف مخزني إضافي",
                        specs: "مطابق لمواصفات المستودع المركزي",
                        qty: 1,
                        unit: "وحدة",
                        unitPrice: 1200.0,
                        vatRate: 15,
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#94a3b8] bg-[#f8fafc] px-3.5 py-2 text-[11.5px] font-bold text-[#334155] transition hover:border-[#0d658a] hover:text-[#0d658a]"
                >
                  <FiPlus className="h-3.5 w-3.5" />
                  <span>إضافة صنف جديد من المستودع</span>
                </button>

                {/* SUMMARY FOOTER ROW */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-t border-[#f1f5f9] pt-3.5">
                  {/* Right Tax Note */}
                  <div className="flex items-start gap-2 text-[10.5px] font-medium text-[#64748b] max-w-[440px]">
                    <FiInfo className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
                    <span>
                      المرجعية الفنية لضريبة القيمة المضافة (15%) مبنية على شهادة هيئة الزكاة
                      والضريبة والجمارك.
                    </span>
                  </div>

                  {/* Left Financial Breakdown & Grand Total Box */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                    <div className="min-w-[230px] space-y-1 text-[11.5px]">
                      <div className="flex items-center justify-between text-[#64748b]">
                        <span>المجموع الفرعي (غير شامل الضريبة):</span>
                        <strong className="font-extrabold text-[#1e293b]">
                          {formatNumber(subtotal)} ر.س
                        </strong>
                      </div>
                      <div className="flex items-center justify-between text-[#64748b]">
                        <span>ضريبة القيمة المضافة 15%:</span>
                        <strong className="font-extrabold text-[#1e293b]">
                          {formatNumber(vatTotal)} ر.س
                        </strong>
                      </div>
                      <div className="flex items-center justify-between text-[#64748b]">
                        <span>خصم استثنائي إن وجد:</span>
                        <strong className="font-extrabold text-[#1e293b]">
                          {formatNumber(discount)} ر.س
                        </strong>
                      </div>
                    </div>

                    <div className="min-w-[165px] rounded-xl bg-[#095c7a] px-4 py-3 text-white text-left shadow-2xs">
                      <span className="block text-[10px] font-semibold text-white/80">
                        إجمالي المبلغ المستحق
                      </span>
                      <div className="mt-1 text-[18px] font-black leading-none tracking-tight">
                        {formatNumber(grandTotal)}{" "}
                        <span className="text-[11px] font-bold text-white/85">ر.س</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: المرفقات والوثائق الداعمة */}
              <section className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiFileText className="h-4 w-4 text-[#0d658a]" />
                    <h2 className="text-[13.5px] font-black text-[#0f172a]">
                      المرفقات والوثائق الداعمة
                    </h2>
                    <span className="text-[10.5px] font-medium text-[#94a3b8]">
                      خطاب المورد الحصري، عروض الأسعار، الموافقة الاستثنائية الرقابية
                    </span>
                  </div>

                  <span className="rounded-md bg-[#f1f5f9] px-2.5 py-0.5 text-[10.5px] font-bold text-[#64748b]">
                    {attachments.length} ملفات مرفقة
                  </span>
                </div>

                {/* Dropzone */}
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd5e1] bg-[#fafcfd] px-4 py-5 text-center transition hover:border-[#0d658a]">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0d658a]">
                    <FiUploadCloud className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-[12px] font-extrabold text-[#1e293b]">
                    اسحب وأفلت الملفات هنا أو تصفح من جهازك
                  </p>
                  <p className="mt-0.5 text-[10.5px] font-medium text-[#94a3b8]">
                    الصيغ المدعومة: PDF, PNG, JPG, XLSX (الحد الأقصى للملف 25 ميجابايت)
                  </p>
                  <span className="mt-2.5 inline-flex h-[30px] items-center rounded-lg border border-[#cbd5e1] bg-white px-3 text-[11px] font-bold text-[#334155]">
                    استعراض الملفات
                  </span>
                </label>

                {/* Attached Files Row */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#fee2e2] text-[9px] font-black text-[#dc2626]">
                          {file.badge}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-[11.5px] font-extrabold text-[#1e293b]">
                            {file.name}
                          </div>
                          <div className="truncate text-[10px] font-medium text-[#64748b]">
                            {file.meta}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 text-[#94a3b8]">
                        <button
                          type="button"
                          onClick={() => setPreviewOpen(true)}
                          className="rounded p-1 hover:bg-white hover:text-[#0d658a]"
                          aria-label="معاينة الملف"
                        >
                          <FiEye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setAttachments((prev) => prev.filter((f) => f.id !== file.id))
                          }
                          className="rounded p-1 hover:bg-white hover:text-[#dc2626]"
                          aria-label="حذف الملف"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {previewOpen && (
                  <div className="rounded-lg border border-[#bae6fd] bg-[#f0f9ff] px-3.5 py-2 text-[11px] font-bold text-[#0369a1] flex items-center justify-between">
                    <span>تم فتح معاينة المستندات الداعمة بنجاح.</span>
                    <button
                      type="button"
                      onClick={() => setPreviewOpen(false)}
                      className="underline"
                    >
                      إغلاق
                    </button>
                  </div>
                )}
              </section>

              <footer className="sticky bottom-0 z-20 -mx-4 mt-2 border-t border-[#e6ecf2] bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] backdrop-blur sm:-mx-2 sm:px-2">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap items-center justify-start gap-2.5 lg:order-1">
                    <button
                      type="submit"
                      className="inline-flex h-[38px] items-center gap-1.5 rounded-lg bg-[#095c7a] px-4 text-[12px] font-extrabold text-white transition hover:bg-[#074961]"
                    >
                      <FiEye className="h-3.5 w-3.5" />
                      <span>معاينة أمر الشراء</span>
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => alert("تم حفظ أمر الشراء كمسودة")}
                      className="inline-flex h-[38px] items-center gap-1.5 rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[12px] font-bold text-[#1e293b] transition hover:bg-[#f8fafc]"
                    >
                      <FiSave className="h-3.5 w-3.5 text-[#64748b]" />
                      <span>حفظ كمسودة</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/accounts/Purches/orders")}
                      className="inline-flex h-[38px] items-center rounded-lg border border-[#cbd5e1] bg-[#f8fafc] px-3.5 text-[12px] font-bold text-[#334155] transition hover:bg-[#f1f5f9]"
                    >
                      إلغاء الأمر والرجوع
                    </button>
                  </div>

                  <p className="text-center text-[11px] font-semibold leading-relaxed text-[#64748b] lg:order-2 lg:text-start">
                    <span>تم حفظ المسودة تلقائياً 11:42 ص</span>
                    <span className="mx-2 hidden text-[#cbd5e1] sm:inline">|</span>
                    <span className="block sm:inline">الإصدار قابل للتعديل قبل الاعتماد</span>
                  </p>
                </div>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateOrder;