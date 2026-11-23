"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  useFormikContext,
  getIn,
} from "formik";
import * as Yup from "yup";
import {
  FiChevronDown,
  FiSearch,
  FiArrowRight,
  FiPlusCircle,
  FiTrash2,
  FiHash,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";

/* ============================================================
   ثوابت وبيانات تجريبية (استبدلها ببيانات الـ API)
============================================================ */
const VAT_RATE = 0.15;
const NEXT_NOTE_NUMBER = "CN-2023-0892"; // يجي من السيرفر

const REASONS = [
  { value: "return", label: "مرتجعات (Return)" },
  { value: "price_error", label: "خطأ في السعر" },
  { value: "extra_discount", label: "خصم إضافي" },
];

const SALES_REPS = [
  { value: "1", label: "خالد العتيبي" },
  { value: "2", label: "أحمد علي" },
  { value: "3", label: "محمد سعيد" },
];

const ACCOUNTS = [
  { value: "402001", label: "402001 - حساب مردودات المبيعات المحلية" },
  { value: "402002", label: "402002 - حساب مردودات المبيعات الخارجية" },
];

const CATALOG = [
  { id: "furniture", name: "أثاث مكتب", price: 1500, description: "مكاتب خشبية فاخرة" },
  { id: "it", name: "معدات تقنية", price: 3200, description: "أجهزة حاسب محمولة" },
  { id: "service", name: "خدمات صيانة", price: 450, description: "زيارة صيانة دورية" },
];

const EMPTY_ITEM = {
  itemId: "",
  description: "",
  unitPrice: "",
  quantity: "",
  discount: "",
};

const todayStr = () => {
  const d = new Date();
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

const initialValues = {
  noteNumber: NEXT_NOTE_NUMBER,
  date: todayStr(),
  salesRep: "1",
  issueDate: todayStr(),
  reason: "return",
  returnsAccount: "402001",
  originalInvoice: "",
  items: [{ ...EMPTY_ITEM }],
  additionalDiscount: "",
  roundingAdjustment: "",
  detailedReason: "",
  notes: "",
  attachments: [],
};

/* ============================================================
   Yup validation
============================================================ */
const REQUIRED = "هذا الحقل مطلوب";
const DATE_REGEX = /^\d{1,2}-\d{1,2}-\d{4}$/;
const emptyToZero = (value, original) => (original === "" ? 0 : value);

const itemSchema = Yup.object({
  itemId: Yup.string().required("اختر البند"),
  description: Yup.string().max(200, "الوصف طويل (200 حرف كحد أقصى)"),
  unitPrice: Yup.number()
    .transform((v, o) => (o === "" ? undefined : v))
    .typeError("رقم غير صحيح")
    .required("مطلوب")
    .min(0, "لا يقل عن 0"),
  quantity: Yup.number()
    .transform((v, o) => (o === "" ? undefined : v))
    .typeError("رقم غير صحيح")
    .required("مطلوب")
    .integer("عدد صحيح")
    .min(1, "1 على الأقل"),
  discount: Yup.number()
    .transform(emptyToZero)
    .typeError("رقم غير صحيح")
    .min(0, "لا يقل عن 0")
    .test("max-discount", "أكبر من الإجمالي", function (value) {
      const { quantity, unitPrice } = this.parent;
      return (value || 0) <= (Number(quantity) || 0) * (Number(unitPrice) || 0);
    }),
});

const validationSchema = Yup.object({
  noteNumber: Yup.string().required(REQUIRED),
  date: Yup.string()
    .required(REQUIRED)
    .matches(DATE_REGEX, "الصيغة المطلوبة: 1-5-2026"),
  salesRep: Yup.string().required("اختر المندوب"),
  issueDate: Yup.string()
    .required(REQUIRED)
    .matches(DATE_REGEX, "الصيغة المطلوبة: 1-5-2026"),
  reason: Yup.string().required("اختر سبب الخصم"),
  returnsAccount: Yup.string().required("اختر حساب مردودات المبيعات"),
  originalInvoice: Yup.string().trim().required("أدخل رقم الفاتورة الأصلية"),
  items: Yup.array().of(itemSchema).min(1, "أضف بندًا واحدًا على الأقل"),
  additionalDiscount: Yup.number()
    .transform(emptyToZero)
    .typeError("رقم غير صحيح")
    .min(0, "لا تقل عن 0%")
    .max(100, "لا تزيد عن 100%"),
  roundingAdjustment: Yup.number()
    .transform(emptyToZero)
    .typeError("رقم غير صحيح"),
  detailedReason: Yup.string().max(500, "500 حرف كحد أقصى"),
  notes: Yup.string().max(1000, "1000 حرف كحد أقصى"),
});

/* ============================================================
   الحسابات
============================================================ */
const toNum = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const money = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const lineBase = (it) =>
  Math.max(toNum(it.quantity) * toNum(it.unitPrice) - toNum(it.discount), 0);
const lineTax = (it) => lineBase(it) * VAT_RATE;
const lineTotal = (it) => lineBase(it) + lineTax(it);

const calcSummary = (values) => {
  const gross = values.items.reduce(
    (s, it) => s + toNum(it.quantity) * toNum(it.unitPrice),
    0
  );
  const lineDiscounts = values.items.reduce((s, it) => s + toNum(it.discount), 0);
  const extra =
    (Math.max(gross - lineDiscounts, 0) * toNum(values.additionalDiscount)) / 100;
  const totalDiscount = lineDiscounts + extra;
  const beforeTax = Math.max(gross - totalDiscount, 0);
  const vat = beforeTax * VAT_RATE;
  const total = beforeTax + vat + toNum(values.roundingAdjustment);
  return { beforeTax, totalDiscount, vat, total };
};

const handleSave = async (values, status) => {
  const payload = {
    ...values,
    status, // "issued" | "draft"
    items: values.items.map((it) => ({
      ...it,
      unitPrice: toNum(it.unitPrice),
      quantity: toNum(it.quantity),
      discount: toNum(it.discount),
      tax: lineTax(it),
      total: lineTotal(it),
    })),
    summary: calcSummary(values),
  };
  // TODO: await api.post("/debit-notes", payload)
  console.log("debit note payload:", payload);
};

/* ============================================================
   Styles + Reusable form pieces
============================================================ */
const cx = (...c) => c.filter(Boolean).join(" ");

const VARIANTS = {
  // خلفية رمادية فاتحة بدون حدود (الكارت الأول)
  filled:
    "h-11 w-full rounded-xl border border-transparent bg-[#eef3f6] px-4 text-[14px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#1d6a8a]",
  // أبيض بحدود (تبويب الخصم والتسويات)
  outlined:
    "h-11 w-full rounded-xl border border-[#BFC7CF] bg-white px-4 text-[14px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#1d6a8a]",
  // خلايا الجدول (حدود متقطعة)
  cell:
    "h-10 w-full rounded-lg border border-dashed bg-transparent px-3 text-[14px] text-gray-800 outline-none transition-colors placeholder:text-[13px] placeholder:text-gray-400 focus:border-[#1d6a8a] focus:bg-white",
};

const Input = ({ name, variant = "filled", className, ...props }) => {
  const { errors, touched } = useFormikContext();
  const invalid = Boolean(getIn(touched, name) && getIn(errors, name));
  return (
    <Field
      id={name}
      name={name}
      aria-invalid={invalid}
      className={cx(VARIANTS[variant], invalid && "!border-[#c62828]", className)}
      {...props}
    />
  );
};

const Select = ({ name, variant = "filled", className, children, ...props }) => {
  const { values } = useFormikContext();
  const isEmpty = !getIn(values, name);
  return (
    <div className="relative">
      <Input
        as="select"
        name={name}
        variant={variant}
        className={cx("appearance-none pl-9", isEmpty && "text-gray-400", className)}
        {...props}
      >
        {children}
      </Input>
      <FiChevronDown
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
};

const FormField = ({ name, label, className, children }) => (
  <div className={className}>
    <label htmlFor={name} className="mb-2 block text-[13px] text-gray-500">
      {label}
    </label>
    {children}
    <ErrorMessage
      name={name}
      component="p"
      className="mt-1.5 text-[11px] font-medium text-[#c62828]"
    />
  </div>
);

const CellError = ({ name }) => (
  <ErrorMessage
    name={name}
    component="p"
    className="mt-1 text-center text-[10px] font-medium text-[#c62828]"
  />
);

const Card = ({ className, children }) => (
  <section className={cx("rounded-2xl bg-white shadow-sm", className)}>
    {children}
  </section>
);

/* ============================================================
   جدول البنود
============================================================ */
const COLS =
  "grid grid-cols-[40px_1.25fr_1.7fr_1fr_0.8fr_1fr_1fr_1.1fr_36px] items-center gap-x-3";

const HEAD_CELLS = [
  "البند/الخدمة",
  "الوصف",
  "سعر الوحدة",
  "الكمية",
  "الخصم",
  "الضريبة",
  "المجموع",
];

const ItemsTable = () => {
  const { values, errors, setFieldValue } = useFormikContext();

  return (
    <Card className="overflow-hidden">
      <div className="flex h-[70px] items-center gap-2 px-7">
        <TbListDetails size={22} className="text-[#1d6a8a]" />
        <h2 className="text-[20px] font-medium text-[#1d6a8a]">تفاصيل البنود</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[960px]">
          {/* Header */}
          <div className={cx(COLS, "h-[50px] bg-[#eef3f6] px-6 text-[14px] text-gray-700")}>
            <FiHash size={16} className="text-gray-600" />
            {HEAD_CELLS.map((h, i) => (
              <span key={h} className={i >= 2 ? "text-center" : ""}>
                {h}
              </span>
            ))}
            <span />
          </div>

          <FieldArray name="items">
            {({ push, remove }) => (
              <>
                {values.items.map((item, index) => {
                  const filled = Boolean(item.itemId);
                  const tone = filled
                    ? "border-transparent hover:border-[#BFC7CF]"
                    : "border-[#BFC7CF]";
                  const p = (field) => `items.${index}.${field}`;

                  return (
                    <div key={index} className="group border-b border-[#BFC7CF] px-6 py-3">
                      <div className={cx(COLS, "min-h-[46px] items-start")}>
                        <span className="pt-2.5 text-[14px] text-gray-800">{index + 1}</span>

                        {/* البند */}
                        <div className="min-w-0">
                          <Select
                            variant="cell"
                            name={p("itemId")}
                            className={tone }
                            onChange={(e) => {
                              const id = e.target.value;
                              const product = CATALOG.find((c) => c.id === id);
                              setFieldValue(p("itemId"), id);
                              if (product) {
                                setFieldValue(p("unitPrice"), product.price);
                                if (!item.quantity) setFieldValue(p("quantity"), 1);
                                if (!item.description)
                                  setFieldValue(p("description"), product.description);
                              }
                            }}
                          >
                            <option value="" disabled hidden>
                              اختر البند...
                            </option>
                            {CATALOG.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </Select>
                          <CellError name={p("itemId")} />
                        </div>

                        {/* الوصف */}
                        <div className="min-w-0">
                          <Input
                            variant="cell"
                            name={p("description")}
                            placeholder="ادخل الوصف..."
                            className={tone}
                          />
                          <CellError name={p("description")} />
                        </div>

                        {/* سعر الوحدة */}
                        <div className="min-w-0">
                          <Input
                            variant="cell"
                            name={p("unitPrice")}
                            type="number"
                            step="0.01"
                            min="0"
                            dir="ltr"
                            placeholder="0.00"
                            className={cx("text-center", tone)}
                          />
                          <CellError name={p("unitPrice")} />
                        </div>

                        {/* الكمية */}
                        <div className="min-w-0">
                          <Input
                            variant="cell"
                            name={p("quantity")}
                            type="number"
                            step="1"
                            min="0"
                            dir="ltr"
                            placeholder="0"
                            className={cx("text-center", tone)}
                          />
                          <CellError name={p("quantity")} />
                        </div>

                        {/* الخصم */}
                        <div className="min-w-0">
                          <Input
                            variant="cell"
                            name={p("discount")}
                            type="number"
                            step="0.01"
                            min="0"
                            dir="ltr"
                            placeholder="0.00"
                            className={cx("text-center", tone)}
                          />
                          <CellError name={p("discount")} />
                        </div>

                        {/* الضريبة */}
                        <span className="pt-2.5 text-center text-[14px] text-gray-700">
                          {money(lineTax(item))}
                        </span>

                        {/* المجموع */}
                        <span
                          className={cx(
                            "pt-2.5 text-center text-[14px] text-gray-800",
                            filled && "font-bold"
                          )}
                        >
                          {money(lineTotal(item))}
                        </span>

                        {/* حذف السطر (يظهر عند المرور بالماوس) */}
                        {values.items.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            aria-label="حذف السطر"
                            className="mt-2 flex h-7 w-7 items-center justify-center rounded-lg text-[#c62828] opacity-0 transition-opacity hover:bg-[#fdecea] focus-visible:opacity-100 group-hover:opacity-100"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        ) : (
                          <span />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* إضافة سطر */}
                <div className="flex h-[92px] flex-col items-start justify-center px-9">
                  <button
                    type="button"
                    onClick={() => push({ ...EMPTY_ITEM })}
                    className="flex items-center gap-2 self-end text-[14px] text-[#1d6a8a] hover:opacity-80"
                  >
                    <FiPlusCircle size={20} />
                    <span>إضافة سطر جديد</span>
                  </button>
                  {typeof errors.items === "string" && (
                    <p className="mt-2 self-end text-[11px] font-medium text-[#c62828]">
                      {errors.items}
                    </p>
                  )}
                </div>
              </>
            )}
          </FieldArray>
        </div>
      </div>
    </Card>
  );
};

/* ============================================================
   ملخص شعار الخصم
============================================================ */
const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="max-w-[170px] text-[17px] leading-snug">{label}</span>
    <span className="whitespace-nowrap text-[17px]">{money(value)} ر.س</span>
  </div>
);

const Summary = () => {
  const { values } = useFormikContext();
  const s = calcSummary(values);

  return (
    <aside className="relative self-start overflow-hidden rounded-2xl bg-[#2678a0] p-6 text-white shadow-[0_10px_24px_rgba(29,106,138,0.28)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[45px] right-0 h-[150px] w-[150px] rounded-full bg-white/10"
      />

      <h3 className="relative mb-6 text-[20px] font-medium">ملخص شعار الخصم</h3>

      <div className="relative space-y-5">
        <SummaryRow label="إجمالي المبلغ قبل الضريبة" value={s.beforeTax} />
        <SummaryRow label="إجمالي الخصم" value={s.totalDiscount} />
        <SummaryRow label="ضريبة القيمة المضافة (%15)" value={s.vat} />
      </div>

      <hr className="relative mx-2 my-6 border-white/40" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="text-[18px] font-medium">المجموع النهائي</span>
        <span className="flex items-baseline gap-2">
          <span className="text-[32px] font-bold leading-none">
            {s.total.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </span>
          <span className="text-[16px]">ر.س</span>
        </span>
      </div>

      <p className="relative mt-6 text-center text-[16px]">
        جميع المبالغ بالريال السعودي (SAR)
      </p>
    </aside>
  );
};

/* ============================================================
   التابات (الخصم والتسويات / المرفقات / ملاحظات إضافية)
============================================================ */
const TABS = [
  { key: "discount", label: "الخصم والتسويات" },
  { key: "attachments", label: "المرفقات" },
  { key: "notes", label: "ملاحظات إضافية" },
];

const TextAreaWithCenteredPlaceholder = ({ name, placeholder, height = "h-[110px]" }) => {
  const { values, errors, touched } = useFormikContext();
  const invalid = Boolean(getIn(touched, name) && getIn(errors, name));
  return (
    <div className="relative">
      <Field
        as="textarea"
        id={name}
        name={name}
        className={cx(
          height,
          "w-full resize-none rounded-xl border border-[#BFC7CF] bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition-colors focus:border-[#1d6a8a]",
          invalid && "!border-[#c62828]"
        )}
      />
      {!getIn(values, name) && (
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[13px] text-gray-500">
          {placeholder}
        </span>
      )}
    </div>
  );
};

const OptionsPanel = () => {
  const [tab, setTab] = useState("discount");
  const { values, setFieldValue } = useFormikContext();

  return (
    <Card className="min-h-[390px] p-6">
      {/* Tabs */}
      <div
        role="tablist"
        className="flex h-[50px] items-stretch gap-6 rounded-full bg-[#eef3f6] px-6"
      >
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={cx(
                "relative px-3 text-[15px] transition-colors",
                active ? "font-medium text-[#1d6a8a]" : "text-gray-700 hover:text-[#1d6a8a]"
              )}
            >
              {t.label}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#1d6a8a]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tab === "discount" && (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField name="additionalDiscount" label="قيمة الخصم الإضافي">
                <div className="flex h-11 overflow-hidden rounded-xl border-1 border-[#BFC7CF] ">
                  <Field
                    id="additionalDiscount"
                    name="additionalDiscount"
                    type="number"
                    step="0.01"
                    min="0"
                    dir="ltr"
                    placeholder="0.00"
                    className="h-full min-w-0 flex-1 border border-[#BFC7CF] bg-white px-4 text-right text-[14px] text-gray-800 outline-none placeholder:text-gray-500"
                  />
                  <span className="flex w-11 items-center justify-center border-r-1 border-[#BFC7CF] bg-[#e6f0f5] text-[15px] font-medium text-[#1d6a8a]">
                    %
                  </span>
                </div>
              </FormField>

              <FormField name="roundingAdjustment" label="تسوية التقريب">
                <Input
                  variant="outlined"
                  name="roundingAdjustment"
                  type="number"
                  step="0.01"
                  dir="ltr"
                  placeholder="0.00"
                  className="text-right placeholder:text-gray-500"
                />
              </FormField>
            </div>

            <FormField name="detailedReason" label="السبب التفصيلي" className="mt-6">
              <TextAreaWithCenteredPlaceholder
                name="detailedReason"
                placeholder="اكتب ملاحظاتك هنا..."
              />
            </FormField>
          </>
        )}

        {tab === "attachments" && (
          <div>
            <label className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 text-[14px] text-gray-500 transition-colors hover:border-[#1d6a8a]">
              <FiUploadCloud size={26} className="text-[#1d6a8a]" />
              اضغط لاختيار الملفات
              <input
                type="file"
                multiple
                hidden
                onChange={(e) =>
                  setFieldValue("attachments", [
                    ...values.attachments,
                    ...Array.from(e.target.files),
                  ])
                }
              />
            </label>

            {values.attachments.length > 0 && (
              <ul className="mt-4 space-y-2">
                {values.attachments.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between rounded-xl bg-[#eef3f6] px-4 py-2 text-[13px] text-gray-700"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      aria-label="إزالة الملف"
                      onClick={() =>
                        setFieldValue(
                          "attachments",
                          values.attachments.filter((_, idx) => idx !== i)
                        )
                      }
                      className="text-[#c62828]"
                    >
                      <FiX size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "notes" && (
          <FormField name="notes" label="ملاحظات إضافية">
            <TextAreaWithCenteredPlaceholder
              name="notes"
              placeholder="اكتب ملاحظاتك هنا..."
              height="h-[200px]"
            />
          </FormField>
        )}
      </div>
    </Card>
  );
};

/* ============================================================
   الصفحة
============================================================ */
const Add = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSave(values, "issued")}
    >
      {({ values, isSubmitting }) => (
        <Form dir="rtl" noValidate className="space-y-6">
          {/* ================= Header ================= */}
          <Card className="flex h-[92px] items-center justify-between px-6">
            <h1 className="text-[24px] font-bold leading-none text-[#1d6a8a]">
              إنشاء شعار مدين جديد
            </h1>

            <div dir="ltr" className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-3 text-[14px] font-medium text-[#1d6a8a] hover:opacity-80"
              >
                <span>الرجوع</span>
                <FiArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => handleSave(values, "draft")}
                className="h-11 rounded-xl border border-[#1d6a8a] px-4 text-[14px] text-[#1d6a8a] transition-colors hover:bg-[#1d6a8a]/5"
              >
                حفظ كمسودة
              </button>
            </div>
          </Card>

          {/* ================= البيانات الأساسية ================= */}
          <Card className="space-y-6 p-4">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
              <FormField name="noteNumber" label="رقم شعار الخصم">
                <Input
                  name="noteNumber"
                  readOnly
                  dir="ltr"
                  className="cursor-default text-right text-[13px] text-[#1d6a8a]"
                />
              </FormField>

              <FormField name="date" label="التاريخ">
                <Input name="date" dir="ltr" placeholder="1-5-2026" className="text-right" />
              </FormField>

              <FormField name="salesRep" label="المندوب">
                <Select name="salesRep">
                  <option value="" disabled hidden>
                    اختر المندوب...
                  </option>
                  {SALES_REPS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField name="issueDate" label="تاريخ الإصدار">
                <Input name="issueDate" dir="ltr" placeholder="1-5-2026" className="text-right" />
              </FormField>

              <FormField name="reason" label="سبب الخصم">
                <Select name="reason">
                  <option value="" disabled hidden>
                    اختر السبب...
                  </option>
                  {REASONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <FormField name="returnsAccount" label="حساب مردودات المبيعات">
                <Select name="returnsAccount">
                  <option value="" disabled hidden>
                    اختر الحساب...
                  </option>
                  {ACCOUNTS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField name="originalInvoice" label="مرجع الفاتورة الأصلية">
                <div className="relative">
                  <FiSearch
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <Input
                    name="originalInvoice"
                    placeholder="بحث برقم الفاتورة..."
                    className="pr-11"
                  />
                </div>
              </FormField>
            </div>
          </Card>

          {/* ================= تفاصيل البنود ================= */}
          <ItemsTable />

          {/* ================= الخيارات + الملخص ================= */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_373px]">
            <OptionsPanel />
            <Summary />
          </div>

          {/* ================= شريط الإجراءات ================= */}
          <Card className="flex h-[76px] items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-[122px] rounded-xl bg-[#1d6a8a] text-[15px] font-medium text-white transition-colors hover:bg-[#15516b] disabled:opacity-60"
              >
                حفظ
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSave(values, "draft")}
                className="h-11 w-[122px] rounded-xl bg-[#eef3f6] text-[15px] text-gray-600 transition-colors hover:bg-[#e3eaef] disabled:opacity-60"
              >
                حفظ كمسودة
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              className="px-2 text-[15px] font-medium text-[#c62828] hover:opacity-80"
            >
              إلغاء
            </button>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Add;