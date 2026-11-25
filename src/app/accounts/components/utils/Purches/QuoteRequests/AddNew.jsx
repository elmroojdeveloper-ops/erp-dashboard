"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import {
  FiSearch as Search,
  FiLink2 as Link2,
  FiAlertTriangle as TriangleAlert,
  FiClipboard as ClipboardList,
  FiSettings as Settings,
  FiPaperclip as Paperclip,
  FiMessageSquare as MessageSquareText,
  FiPlus as Plus,
  FiEdit2 as Pencil,
  FiTrash2 as Trash2,
  FiEye as Eye,
  FiCalendar as CalendarDays,
  FiClock as Clock,
  FiTag as Tag,
  FiBriefcase as Building2,
  FiUploadCloud as UploadCloud,
  FiCheck as Check,
  FiArrowRight as ArrowRight,
  FiFileText as FileText,
  FiSave as Save,
  FiSend as Send,
} from "react-icons/fi";

const listHref = "/accounts/Purches/quote-requests";

/* ---------- ثوابت ---------- */
const today = new Date().toISOString().slice(0, 10);

const initialValues = {
  prSearch: "",
  prId: "",
  exceptionReason: "urgent",
  exceptionJustification: "",
  items: [
    {
      name: "أجهزة حاسب آلي محمولة للموظفين الجدد",
      nameEn: "Business Laptops Core i7",
      specs: "معالج i7، ذاكرة 32GB، شاشة 15.6 بوصة مقاومة للوهج مع حقيبة وملحقاتها وضمان سنتين على الأقل.",
      qty: 15,
      unit: "جهاز",
    },
    {
      name: "شاشات عرض تفاعلية لقاعات الاجتماعات",
      nameEn: "Interactive Meeting Displays 75-inch",
      specs: "شاشة ذكية 75 بوصة 4K تعمل باللمس بنظام أندرويد مدمج وكاميرا مؤتمرات وحامل جداري فائق المتانة.",
      qty: 3,
      unit: "شاشة",
    },
  ],
  orderDate: today,
  dueDate: "2024-10-28",
  costCenter: "CC-001 — تكنولوجيا المعلومات والبنية التحتية",
  category: "خدمات رقمية وبرمجيات وأجهزة",
  title: "أجهزة مكتبية للفرع الجديد",
  budget: "",
  files: [
    { name: "كراسة_المواصفات_الفنية_والهندسية_2024.pdf", size: "2.4 MB", type: "PDF" },
    { name: "شروط_التوريد_والتركيب_والضمان.docx", size: "840 KB", type: "DOCX" },
  ],
  notes:
    "يجب أن تتضمن كافة العروض فترة ضمان لا تقل عن 3 سنوات للأعمال الإنشائية ومحركات الكراسي الهيدروليكية، مع الالتزام بتقديم عينة معتمدة قبل بدء التوريد الفعلي لكامل الكمية المطلوبة.",
};

const exceptionReasons = [
  { value: "urgent", label: "طلب عاجل أو طارئ" },
  { value: "single", label: "مورد وحيد" },
  { value: "framework", label: "اتفاقية إطارية قائمة" },
];

/* ---------- التحقق ---------- */
function validate(v) {
  const e = {};
  if (!v.title.trim()) e.title = "أدخلي عنوان الطلب";
  if (!v.costCenter) e.costCenter = "اختاري مركز التكلفة";
  if (!v.category) e.category = "اختاري تصنيف الشراء";
  if (!v.dueDate) e.dueDate = "حددي تاريخ الاستحقاق";
  else if (v.dueDate < v.orderDate) e.dueDate = "يجب أن يكون التاريخ بعد تاريخ الطلب";

  if (!v.prId.trim()) {
    if (!v.exceptionReason) e.exceptionReason = "اختاري سبب عدم الربط";
    if (!v.exceptionJustification.trim())
      e.exceptionJustification = "اكتبي مبرر الاستثناء والضرورة التشغيلية";
  }

  if (v.items.length === 0) e.items = "أضيفي بندًا واحدًا على الأقل";
  else {
    const itemErrors = v.items.map((it) => {
      const r = {};
      if (!it.name.trim()) r.name = "مطلوب";
      if (!it.specs.trim()) r.specs = "مطلوب";
      if (!it.qty || Number(it.qty) < 1) r.qty = "≥ 1";
      return r;
    });
    if (itemErrors.some((r) => Object.keys(r).length)) e.items = itemErrors;
  }
  return e;
}

/* ---------- مكونات صغيرة ---------- */
const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1b6a9c] focus:ring-2 focus:ring-[#1b6a9c]/20";
const inputOk = "border-slate-200";
const inputErr = "border-red-400";

function Section({ icon: Icon, title, hint, badge, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <header className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f1f7] text-[#1b6a9c]">
            <Icon size={20} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
          </div>
        </div>
        {badge}
      </header>
      {children}
    </section>
  );
}

function Label({ children, required, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-slate-800">
      {children}
      {required && <span className="me-1 text-red-500">*</span>}
    </label>
  );
}

function Err({ name }) {
  return (
    <ErrorMessage name={name}>
      {(msg) => <p className="mt-1.5 text-xs font-medium text-red-600">{msg}</p>}
    </ErrorMessage>
  );
}

/** حقل نصي بأيقونة اختيارية، مرتبط بـ Formik عبر Field */
function TextField({ name, icon: Icon, errors, touched, readOnly, ...rest }) {
  const hasErr = errors[name] && touched[name];
  return (
    <div className="relative">
      <Field
        id={name}
        name={name}
        readOnly={readOnly}
        className={`${inputBase} ${hasErr ? inputErr : inputOk} ${Icon ? "pe-11" : ""} ${
          readOnly ? "bg-slate-50 text-slate-600" : ""
        }`}
        {...rest}
      />
      {Icon && (
        <Icon size={18} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[#1b6a9c]" />
      )}
    </div>
  );
}

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const diff = Math.ceil((new Date(dateStr) - new Date(today)) / 86400000);
  return diff;
}

/* ---------- الصفحة ---------- */
export default function AddNew() {
  const router = useRouter();
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("SEND RFQ", values);
    setSubmitting(false);
    router.push(listHref);
  };

  return (
    <div dir="rtl" className="pb-4 text-slate-800">
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          const totalUnits = values.items.reduce((s, i) => s + (Number(i.qty) || 0), 0);
          const remaining = daysLeft(values.dueDate);
          const noPR = !values.prId.trim();

          return (
            <Form noValidate className="flex flex-col gap-5">
              <div className="flex justify-end">
                <Link
                  href={listHref}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <ArrowRight size={16} />
                  الرجوع إلى السجل
                </Link>
              </div>

              {/* رأس الصفحة: العنوان يمين · المرجع شمال */}
              <div className="flex flex-col items-stretch justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      إنشاء طلب عرض سعر جديد
                    </h1>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#e8f1f7] px-3 py-1 text-xs font-semibold text-[#1b6a9c]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1b6a9c]" />
                      RFQ - مسودة جديدة
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    حددي طلب الشراء المصدر (إن وجد) والموردين المدعوين لتقديم عروضهم الفنية والمالية بدقة وشفافية.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-[#f3f7fa] px-4 py-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#1b6a9c] text-white">
                    <FileText size={20} />
                  </span>
                  <div dir="ltr" className="text-left">
                    <p className="text-[10px] font-semibold tracking-wider text-slate-500">
                      RFQ REFERENCE
                    </p>
                    <p className="font-bold text-[#1b6a9c]">RFQ - 2024 - 0194</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">

                  {/* القسم 1 */}
                  <Section
                    icon={Link2}
                    title={
                      <span className="flex flex-wrap items-center gap-2">
                        القسم ١: ربط طلب الشراء المصدر (Purchase Requisition)
                        <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-normal text-slate-500">
                          اختياري
                        </span>
                      </span>
                    }
                    hint="استيراد المواصفات والأصناف المعتمدة مسبقا لتفادي تكرار البيانات (اختياري في المسار الاستثنائي)"
                    badge={
                      noPR && (
                        <span className="shrink-0 rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                          مسار استثنائي بدون PR
                        </span>
                      )
                    }
                  >
                    <Label htmlFor="prId">اختار طلب الشراء المعتمد (إن وجد)</Label>
                    <div className="relative">
                      <Field
                        id="prId"
                        name="prId"
                        placeholder="ابحثي برقم الطلب أو العنوان — اتركي هذا الحقل فارغا إذا لم يوجد طلب مرتبط..."
                        className={`${inputBase} ps-11 ${
                          errors.prId && touched.prId ? inputErr : inputOk
                        }`}
                      />
                      <Search
                        size={18}
                        className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#1b6a9c]"
                      />
                    </div>

                    {noPR && (
                      <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50/60 p-5">
                        <div className="mb-4 flex items-start gap-3">
                          <TriangleAlert size={20} className="mt-0.5 shrink-0 text-amber-500" />
                          <div>
                            <p className="text-sm font-bold text-amber-900">
                              لم تربطي هذا الطلب بطلب شراء معتمد. سيُصنف هذا الطلب كـ"استثناء رقابي" ويتطلب توثيق السبب والاعتماد.
                            </p>
                            <p className="mt-1 text-xs text-amber-700">
                              وفقا للائحة الحوكمة والرقابة المالية للمشتريات، يشترط بيان مبرر عدم الربط المسبق بطلب الشراء واختيار مركز التكلفة المناط بالصرف لضمان مسار الاعتماد الإداري السليم.
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <Label required htmlFor="exceptionReason">سبب عدم الربط بطلب شراء معتمد</Label>
                            <div className="relative">
                              <Field
                                as="select"
                                id="exceptionReason"
                                name="exceptionReason"
                                className={`${inputBase} appearance-none border-amber-300 pe-11`}
                              >
                                {exceptionReasons.map((r) => (
                                  <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                              </Field>
                              <TriangleAlert size={18} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-amber-500" />
                            </div>
                            <Err name="exceptionReason" />
                          </div>
                          <div>
                            <Label required htmlFor="exceptionJustification">مبرر الاستثناء والضرورة التشغيلية</Label>
                            <Field
                              id="exceptionJustification"
                              name="exceptionJustification"
                              placeholder="توريد مستلزمات طارئة لتغطية العجز قبل نهاية الدورة المالية الحالية."
                              className={`${inputBase} border-amber-300 ${
                                errors.exceptionJustification && touched.exceptionJustification ? inputErr : ""
                              }`}
                            />
                            <Err name="exceptionJustification" />
                          </div>
                        </div>
                      </div>
                    )}
                  </Section>

                  {/* القسم 2 */}
                  <Section
                    icon={ClipboardList}
                    title="القسم ٢: بنود ومواصفات الطلب (إدخال يدوي)"
                    hint="لم يتم سحب بنود تلقائيا (مسار استثنائي يدوي) — يمكنك إضافة البنود ومواصفاتها يدويا أدناه"
                    badge={
                      <span className="shrink-0 rounded-full border border-[#b9d3e4] bg-[#eaf3f9] px-3 py-1 text-xs font-medium text-[#1b6a9c]">
                        بندان يدويان مسجلان
                      </span>
                    }
                  >
                    <FieldArray name="items">
                      {({ push, remove }) => (
                        <>
                          <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full min-w-[760px] text-sm">
                              <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                  <th className="w-1/4 px-5 py-3 text-start font-semibold">الصنف / الخدمة</th>
                                  <th className="px-5 py-3 text-start font-semibold">المواصفات الفنية والشروط</th>
                                  <th className="w-24 px-3 py-3 text-center font-semibold">الكمية</th>
                                  <th className="w-28 px-3 py-3 text-center font-semibold">الوحدة</th>
                                  <th className="w-24 px-3 py-3 text-center font-semibold">الإجراء</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {values.items.map((item, i) => {
                                  const isEditing = editing === i;
                                  const rowErr = Array.isArray(errors.items) ? errors.items[i] : null;
                                  return (
                                    <tr key={i} className="align-top">
                                      <td className="px-5 py-4">
                                        {isEditing ? (
                                          <>
                                            <Field name={`items.${i}.name`} placeholder="اسم الصنف" className={`${inputBase} ${rowErr?.name ? inputErr : inputOk}`} />
                                            <Err name={`items.${i}.name`} />
                                          </>
                                        ) : (
                                          <>
                                            <p className="font-bold text-slate-900">{item.name}</p>
                                            <p dir="ltr" className="mt-1 text-start font-mono text-xs text-slate-500">{item.nameEn}</p>
                                          </>
                                        )}
                                      </td>
                                      <td className="px-5 py-4 text-slate-600">
                                        {isEditing ? (
                                          <>
                                            <Field as="textarea" rows={2} name={`items.${i}.specs`} placeholder="المواصفات" className={`${inputBase} ${rowErr?.specs ? inputErr : inputOk}`} />
                                            <Err name={`items.${i}.specs`} />
                                          </>
                                        ) : (
                                          item.specs
                                        )}
                                      </td>
                                      <td className="px-3 py-4 text-center">
                                        {isEditing ? (
                                          <Field type="number" min="1" name={`items.${i}.qty`} className={`${inputBase} px-2 text-center ${rowErr?.qty ? inputErr : inputOk}`} />
                                        ) : (
                                          <span className="font-bold text-[#1b6a9c]">{item.qty}</span>
                                        )}
                                      </td>
                                      <td className="px-3 py-4 text-center">
                                        {isEditing ? (
                                          <Field name={`items.${i}.unit`} className={`${inputBase} px-2 text-center ${inputOk}`} />
                                        ) : (
                                          <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600">{item.unit}</span>
                                        )}
                                      </td>
                                      <td className="px-3 py-4">
                                        <div className="flex items-center justify-center gap-3 text-slate-400">
                                          <button
                                            type="button"
                                            aria-label={isEditing ? "تم" : "تعديل"}
                                            onClick={() => setEditing(isEditing ? null : i)}
                                            className="hover:text-[#1b6a9c]"
                                          >
                                            {isEditing ? <Check size={18} /> : <Pencil size={18} />}
                                          </button>
                                          <button
                                            type="button"
                                            aria-label="حذف"
                                            onClick={() => { remove(i); setEditing(null); }}
                                            className="hover:text-red-500"
                                          >
                                            <Trash2 size={18} />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          {typeof errors.items === "string" && (
                            <p className="mt-2 text-xs font-medium text-red-600">{errors.items}</p>
                          )}

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                          
                            <p className="text-sm text-slate-600">
                              الإجمالي الفرعي: <b className="text-slate-900">{totalUnits} وحدة مطلوبة ({values.items.length} صنفان)</b>
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                push({ name: "", nameEn: "", specs: "", qty: 1, unit: "وحدة" });
                                setEditing(values.items.length);
                              }}
                              className="inline-flex items-center gap-2 rounded-lg border border-[#b9d3e4] bg-[#eaf3f9] px-4 py-2.5 text-sm font-semibold text-[#1b6a9c] hover:bg-[#dcebf5]"
                            >
                              <Plus size={16} />
                              إضافة بند جديد للطلب
                            </button>
                          </div>
                        </>
                      )}
                    </FieldArray>
                  </Section>

                  {/* القسم 3 */}
                  <Section
                    icon={Settings}
                    title="القسم ٣: تفاصيل ومحددات الطلب (Order Details)"
                    hint="تحديد المواعيد النهائية لاستقبال عروض الأسعار وموقع التوريد"
                  >
                    <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="orderDate">تاريخ الطلب (Order Date)</Label>
                        <TextField name="orderDate" type="date" icon={CalendarDays} errors={errors} touched={touched} readOnly />
                        <p className="mt-1.5 text-xs text-slate-500">يحدد تلقائيا وفق تاريخ فتح المسودة الحالية</p>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label htmlFor="dueDate" className="text-sm font-semibold text-slate-800">
                            تاريخ الاستحقاق (الموعد النهائي لتلقي العروض)<span className="me-1 text-red-500">*</span>
                          </label>
                          {remaining !== null && remaining >= 0 && (
                            <span className="rounded bg-[#e8f1f7] px-2 py-0.5 text-xs font-medium text-[#1b6a9c]">
                              المتبقي: {remaining} يوما
                            </span>
                          )}
                        </div>
                        <TextField name="dueDate" type="date" icon={Clock} errors={errors} touched={touched} min={values.orderDate} />
                        <Err name="dueDate" />
                        <p className="mt-1.5 text-xs text-slate-500">ينتهي التقديم تلقائيا الساعة 04:00 مساء</p>
                      </div>

                      <div>
                        <Label required htmlFor="costCenter">مركز التكلفة المعتمد</Label>
                        <TextField name="costCenter" icon={Building2} errors={errors} touched={touched} />
                        <Err name="costCenter" />
                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <Check size={14} />
                          الميزانية سارية — الرصيد المتاح: 680,000 ر.س
                        </p>
                      </div>

                      <div>
                        <Label required htmlFor="category">تصنيف الشراء والتعاقد</Label>
                        <TextField name="category" icon={Tag} errors={errors} touched={touched} />
                        <Err name="category" />
                        <p className="mt-1.5 text-xs text-slate-500">يحدد مسار التقييم الفني للمنافسة</p>
                      </div>

                      <div>
                        <Label required htmlFor="title">عنوان الطلب</Label>
                        <TextField name="title" errors={errors} touched={touched} />
                        <Err name="title" />
                      </div>

                      <div>
                        <Label htmlFor="budget">الميزانية التقديرية</Label>
                        <TextField name="budget" type="number" errors={errors} touched={touched} placeholder="--- ---" />
                      </div>
                    </div>
                  </Section>

                  {/* القسم 5 */}
                  <Section
                    icon={Paperclip}
                    title="القسم ٥: المستندات والمرفقات الداعمة (Attachments)"
                    hint="إرفاق كراسات الشروط والمخططات الهندسية وملاحق الاتفاقية للموردين"
                  >
                    <label
                      htmlFor="files"
                      className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[#b9d3e4] bg-[#f8fbfd] px-6 py-10 text-center hover:bg-[#f0f7fb]"
                    >
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#e3eff7] text-[#1b6a9c]">
                        <UploadCloud size={24} />
                      </span>
                      <p className="text-sm font-bold text-slate-800">
                        اسحبي الملفات هنا أو <span className="text-[#1b6a9c] underline">اختاري من الجهاز</span>
                      </p>
                      <p className="text-xs text-slate-500">PDF, DOCX, XLSX بحد أقصى 15MB لكل ملف</p>
                      <input
                        id="files"
                        type="file"
                        multiple
                        accept=".pdf,.docx,.xlsx"
                        className="sr-only"
                        onChange={(e) => {
                          const added = Array.from(e.target.files || [])
                            .filter((f) => f.size <= 15 * 1024 * 1024)
                            .map((f) => ({
                              name: f.name,
                              size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
                              type: f.name.split(".").pop().toUpperCase(),
                            }));
                          setFieldValue("files", [...values.files, ...added]);
                          e.target.value = "";
                        }}
                      />
                    </label>

                    <ul className="mt-5 space-y-3">
                      {values.files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg text-[10px] font-bold ${
                                f.type === "PDF" ? "bg-red-50 text-red-500" : "bg-[#e8f1f7] text-[#1b6a9c]"
                              }`}
                            >
                              {f.type}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-slate-900">{f.name}</p>
                              <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                <span>{f.size}</span>
                                <span className="flex items-center gap-1 text-emerald-600">
                                  <Check size={12} /> تم الفحص والرفع بنجاح
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-slate-400">
                            <button type="button" aria-label="معاينة" className="hover:text-[#1b6a9c]">
                              <Eye size={18} />
                            </button>
                            <button
                              type="button"
                              aria-label="حذف"
                              className="hover:text-red-500"
                              onClick={() => setFieldValue("files", values.files.filter((_, idx) => idx !== i))}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {/* القسم 6 */}
                  <Section icon={MessageSquareText} title="القسم ٦: ملاحظات داخلية وتعليمات التوريد">
                    <Label htmlFor="notes">تعليمات وشروط المنافسة الموجهة للجنة والموردين</Label>
                    <Field
                      as="textarea"
                      id="notes"
                      name="notes"
                      rows={5}
                      className={`${inputBase} ${inputOk} leading-7`}
                    />
                    <Err name="notes" />
                  </Section>
              </div>

              {/* شريط الإجراءات */}
              <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5">
                <Link
                  href={listHref}
                  className="text-sm font-medium text-slate-500 hover:text-slate-800"
                >
                  إلغاء
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => console.log("DRAFT", values)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Save size={16} />
                    حفظ كمسودة
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1b6a9c] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#165a85] disabled:opacity-60"
                  >
                    <Send size={16} className="-scale-x-100" />
                    {noPR
                      ? "إرسال طلب عرض السعر للموردين (مسار استثنائي)"
                      : "إرسال طلب عرض السعر للموردين"}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}