"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiFileText,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTrendingDown,
  FiUploadCloud,
} from "react-icons/fi";
import { IoBarcodeOutline, IoChevronDown } from "react-icons/io5";
import { MdOutlineDirectionsCar } from "react-icons/md";
import * as Yup from "yup";
import AssetCategory from "./AssetCategory";

const fieldClass =
  "h-11 w-full rounded-xl border border-[#e2edf2] bg-[#eef6fa] px-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-primary focus:bg-white";
const selectClass = `${fieldClass} appearance-none pe-9`;
const labelClass = "mb-2 block text-sm font-medium text-[#687383]";
const errorClass = "mt-1 block text-xs text-danger";
const cardClass =
  "rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]";

const validationSchema = Yup.object({
  name: Yup.string().required("اسم الأصل مطلوب"),
  code: Yup.string().required("كود المرجع مطلوب"),
  category: Yup.string().required("اختر التصنيف"),
  location: Yup.string().required("اختر الموقع"),
  serviceDate: Yup.string().required("تاريخ بداية الخدمة مطلوب"),
  serial: Yup.string(),
  quantity: Yup.number().min(1, "الكمية لازم تكون 1 على الأقل"),
  unit: Yup.string(),
  barcode: Yup.string(),
  purchaseDate: Yup.string().required("تاريخ الشراء مطلوب"),
  purchasePrice: Yup.number()
    .transform((value, original) => (original === "" ? 0 : value))
    .min(0, "السعر غير صحيح")
    .required("السعر مطلوب"),
  tax: Yup.string(),
  account: Yup.string(),
  depreciationMethod: Yup.string(),
  usefulLife: Yup.number().min(1, "العمر الإنتاجي مطلوب"),
  salvageValue: Yup.number()
    .transform((value, original) => (original === "" ? 0 : value))
    .min(0, "القيمة غير صحيحة"),
  depreciationExpenseAccount: Yup.string(),
  accumulatedDepreciationAccount: Yup.string(),
  description: Yup.string(),
});

const money = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="mb-5 flex items-center gap-2">
    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#eef6fa] text-primary">
      <Icon className="size-[18px]" />
    </span>
    <h2 className="text-lg font-bold text-primary">{children}</h2>
  </div>
);

const SelectWrap = ({ children, className = "" }) => (
  <div className={`relative min-w-0 flex-1 ${className}`}>
    {children}
    <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa8b2]" />
  </div>
);

const AddAsset = () => {
  const [openCategory,setOpenCategory]=useState(false)
  const initialValues = {
    name: "",
    code: "AST-0001",
    category: "",
    location: "",
    serviceDate: "2026-05-01",
    serial: "",
    quantity: 1,
    unit: "حبة",
    barcode: "",
    purchaseDate: "2026-05-01",
    purchasePrice: "",
    tax: "15%",
    account: "",
    depreciationMethod: "straight",
    usefulLife: 5,
    salvageValue: "",
    depreciationExpenseAccount: "مصروف إهلاك مركبات",
    accumulatedDepreciationAccount: "مجمع إهلاك مركبات",
    description: "",
  };

  return (
    <div className="pb-2">
      {/* Header: عنوان يمين | رجوع شمال */}
      <section className="mb-5 flex min-h-[96px] flex-col gap-4 rounded-[14px] bg-white px-5 py-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h1 className="text-[22px] font-bold leading-8 text-[#11739b]">
            إضافة أصل جديد
          </h1>
          <p className="mt-1 text-sm font-medium text-[#687383]">
            أدخل تفاصيل الأصل الجديد لإضافته إلى سجل الأصول الثابتة.
          </p>
        </div>

        <Link
          href="/accounts/FixedAsset"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] border border-[#1980ac] bg-white px-4 text-sm font-medium text-[#1980ac] transition hover:bg-[#eef7fa]"
        >
          <FiArrowLeft className="size-4" />
          الرجوع
        </Link>
      </section>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values }) => {
          const price = Number(values.purchasePrice) || 0;
          const salvage = Number(values.salvageValue) || 0;
          const life = Number(values.usefulLife) || 1;
          const bookValue = Math.max(price - salvage, 0);
          const firstYear = life ? bookValue / life : 0;
          const investment = price;

          return <>
          {
            openCategory && <AssetCategory setOpenCategory={setOpenCategory} openCategory={openCategory}/>
          }
            <Form className="w-full">
              {/* RTL: العمود الأول يمين (فورم) · الثاني شمال (جانب) */}
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
                {/* يمين: الفورم الرئيسي */}
                <div className="flex flex-col gap-5">
                  {/* معلومات أساسية */}
                  <section className={cardClass}>
                    <SectionTitle icon={FiShield}>معلومات أساسية</SectionTitle>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>اسم الأصل *</label>
                        <Field
                          name="name"
                          placeholder="مثال: سيارة تويوتا كامري 2024"
                          className={fieldClass}
                        />
                        <ErrorMessage
                          name="name"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <label className="text-sm font-medium text-[#687383]">
                            كود المرجع *
                          </label>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:text-primary-dark"
                          >
                            <FiRefreshCw className="size-3" />
                            توليد تلقائي
                          </button>
                        </div>
                        <Field name="code" className={`${fieldClass} text-center`} />
                        <ErrorMessage
                          name="code"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>تصنيف الأصل *</label>
                        <div className="flex gap-2">
                          <SelectWrap>
                            <Field
                              as="select"
                              name="category"
                              className={selectClass}
                            >
                              <option value="">اختر التصنيف</option>
                              <option value="vehicles">مركبات</option>
                              <option value="devices">أجهزة</option>
                              <option value="furniture">أثاث</option>
                              <option value="buildings">مباني</option>
                            </Field>
                          </SelectWrap>
                          <button
                          onClick={()=>{
                            setOpenCategory(true)
                          }}
                            type="button"
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef6fa] text-primary transition hover:bg-[#e0eef5]"
                            aria-label="إضافة تصنيف"
                          >
                            <FiPlus className="size-5" />
                          </button>
                        </div>
                        <ErrorMessage
                          name="category"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>الموقع *</label>
                        <div className="flex gap-2">
                          <SelectWrap>
                            <Field
                              as="select"
                              name="location"
                              className={selectClass}
                            >
                              <option value="">اختر الموقع</option>
                              <option value="riyadh">الرياض</option>
                              <option value="jeddah">جدة</option>
                              <option value="dammam">الدمام</option>
                            </Field>
                          </SelectWrap>
                          <button
                            type="button"
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef6fa] text-primary transition hover:bg-[#e0eef5]"
                            aria-label="إضافة موقع"
                          >
                            <FiPlus className="size-5" />
                          </button>
                        </div>
                        <ErrorMessage
                          name="location"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>الرقم التسلسلي</label>
                        <Field
                          name="serial"
                          placeholder="S/N: XXX-XXX-XXXX"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>تاريخ بداية الخدمة *</label>
                        <div className="relative">
                          <Field
                            type="date"
                            name="serviceDate"
                            className={`${fieldClass} pe-10`}
                          />
                          <FiCalendar className="pointer-events-none absolute end-3 top-1/2 size-[18px] -translate-y-1/2 text-[#687383]" />
                        </div>
                        <ErrorMessage
                          name="serviceDate"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>الكمية</label>
                        <Field
                          name="quantity"
                          type="number"
                          min="1"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>وحدة القياس</label>
                        <SelectWrap>
                          <Field as="select" name="unit" className={selectClass}>
                            <option>حبة</option>
                            <option>قطعة</option>
                            <option>متر</option>
                          </Field>
                        </SelectWrap>
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClass}>باركود</label>
                        <div className="relative">
                          <Field
                            name="barcode"
                            placeholder="امسح الباركود أو أدخله يدوياً"
                            className={`${fieldClass} pe-11`}
                          />
                          <IoBarcodeOutline className="pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 text-[#465465]" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* تفاصيل الشراء */}
                  <section className={cardClass}>
                    <SectionTitle icon={FiShoppingBag}>تفاصيل الشراء</SectionTitle>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>تاريخ الشراء *</label>
                        <div className="relative">
                          <Field
                            type="date"
                            name="purchaseDate"
                            className={`${fieldClass} pe-10`}
                          />
                          <FiCalendar className="pointer-events-none absolute end-3 top-1/2 size-[18px] -translate-y-1/2 text-[#687383]" />
                        </div>
                        <ErrorMessage
                          name="purchaseDate"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          سعر الشراء (قبل الضريبة) *
                        </label>
                        <Field
                          name="purchasePrice"
                          type="number"
                          placeholder="0.00 ر.س"
                          className={fieldClass}
                        />
                        <ErrorMessage
                          name="purchasePrice"
                          component="span"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>الضريبة %</label>
                        <SelectWrap>
                          <Field as="select" name="tax" className={selectClass}>
                            <option value="15%">15% (الضريبة الأساسية)</option>
                            <option value="5%">5%</option>
                            <option value="0%">0%</option>
                          </Field>
                        </SelectWrap>
                      </div>

                      <div>
                        <label className={labelClass}>حساب الصندوق / البنك</label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="account"
                            className={`${selectClass} ps-9`}
                          >
                            <option value="">ابحث عن حساب...</option>
                            <option value="rajhi">بنك الراجحي</option>
                            <option value="cash">الخزينة</option>
                          </Field>
                          <FiSearch className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa8b2]" />
                          <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa8b2]" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* تفاصيل الإهلاك */}
                  <section className={cardClass}>
                    <SectionTitle icon={FiTrendingDown}>
                      تفاصيل الإهلاك
                    </SectionTitle>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>طريقة الإهلاك</label>
                        <SelectWrap>
                          <Field
                            as="select"
                            name="depreciationMethod"
                            className={selectClass}
                          >
                            <option value="straight">
                              القسط الثابت (Straight Line)
                            </option>
                            <option value="declining">القسط المتناقص</option>
                            <option value="units">وحدات الإنتاج</option>
                          </Field>
                        </SelectWrap>
                      </div>

                      <div>
                        <label className={labelClass}>
                          العمر الإنتاجي (بالسنوات)
                        </label>
                        <Field
                          name="usefulLife"
                          type="number"
                          min="1"
                          placeholder="5 سنوات"
                          className={fieldClass}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClass}>
                          قيمة الخردة (Salvage Value)
                        </label>
                        <Field
                          name="salvageValue"
                          type="number"
                          placeholder="0.00 ر.س"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>حساب مصروف الإهلاك</label>
                        <SelectWrap>
                          <Field
                            as="select"
                            name="depreciationExpenseAccount"
                            className={selectClass}
                          >
                            <option>مصروف إهلاك مركبات</option>
                            <option>مصروف إهلاك أجهزة</option>
                            <option>مصروف إهلاك أثاث</option>
                          </Field>
                        </SelectWrap>
                      </div>

                      <div>
                        <label className={labelClass}>حساب مجمع الإهلاك</label>
                        <SelectWrap>
                          <Field
                            as="select"
                            name="accumulatedDepreciationAccount"
                            className={selectClass}
                          >
                            <option>مجمع إهلاك مركبات</option>
                            <option>مجمع إهلاك أجهزة</option>
                            <option>مجمع إهلاك أثاث</option>
                          </Field>
                        </SelectWrap>
                      </div>
                    </div>
                  </section>
                </div>

                {/* شمال: صورة / وصف / مرفقات / ملخص */}
                <div className="flex flex-col gap-5">
                  <section className={cardClass}>
                    <h2 className="mb-4 text-lg font-bold text-primary">
                      صورة الأصل
                    </h2>
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#c5d5de] bg-[#f7fbfd] px-4 py-10 text-center transition hover:border-primary hover:bg-[#eef6fa]">
                      <span className="flex size-14 items-center justify-center rounded-full bg-[#eef6fa] text-primary">
                        <MdOutlineDirectionsCar className="size-7" />
                      </span>
                      <span className="max-w-[220px] text-sm font-bold leading-6 text-[#2b2b2b]">
                        أضف صورة للأصل للحصول على مظهر احترافي
                      </span>
                      <span className="text-xs text-[#8a98a5]">
                        (JPG, PNG أو GIF - الحد الأقصى 2MB)
                      </span>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </section>

                  <section className={cardClass}>
                    <h2 className="mb-4 text-lg font-bold text-primary">الوصف</h2>
                    <Field
                      as="textarea"
                      name="description"
                      rows={5}
                      placeholder="أضف وصفاً تفصيلياً للأصل، المواصفات الفنية، أو أي ملاحظات أخرى..."
                      className="min-h-[120px] w-full resize-none rounded-xl border border-[#e2edf2] bg-[#eef6fa] p-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-primary focus:bg-white"
                    />
                  </section>

                  <section className={cardClass}>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-lg font-bold text-primary">المرفقات</h2>
                      <span className="rounded-full bg-[#eef6fa] px-2.5 py-1 text-xs font-semibold text-primary">
                        1 ملف
                      </span>
                    </div>

                    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-[#c5d5de] bg-[#f7fbfd] py-8 text-center transition hover:border-primary hover:bg-[#eef6fa]">
                      <FiUploadCloud className="size-6 text-[#465465]" />
                      <span className="text-sm font-bold text-[#2b2b2b]">
                        اسحب وأفلت الفواتير هنا
                      </span>
                      <span className="text-xs font-medium text-primary">
                        أو استعرض الملفات
                      </span>
                      <input type="file" className="hidden" />
                    </label>

                    {/* ملف: أيقونة يمين · بيانات شمال */}
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#eef6fa] px-3 py-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f8d7da] text-danger">
                        <FiFileText className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#2b2b2b]">
                          invoice_001.pdf
                        </p>
                        <p className="mt-0.5 text-xs text-[#8a98a5]">1.2 MB</p>
                      </div>
                      <button
                        type="button"
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#8a98a5] transition hover:bg-white hover:text-danger"
                        aria-label="حذف المرفق"
                      >
                        <FiTrash2 className="size-4" />
                      </button>
                    </div>
                  </section>

                  {/* ملخص القيود — زي Figma: أزرق ثابت · دواير فوق يمين/تحت شمال · تسمية يمين قيمة شمال */}
                  <section className="relative overflow-hidden rounded-2xl bg-[#1E7A9B] p-5 text-white shadow-card">
                    <div className="pointer-events-none absolute -right-10 -top-16 size-40 rounded-full bg-white/10" />
                    <div className="pointer-events-none absolute -bottom-20 -left-12 size-52 rounded-full bg-white/10" />
                    <div className="pointer-events-none absolute -left-6 top-1/3 size-24 rounded-full bg-white/5" />

                    <div className="relative">
                      <h2 className="text-end text-[17px] font-bold leading-7">
                        ملخص القيود
                      </h2>

                      <div className="mt-8 space-y-0">
                        <div className="flex items-center justify-between gap-4 border-b border-white/25 py-3.5">
                          <span className="text-sm font-medium text-white/90">
                            قيمة الأصل الدفترية
                          </span>
                          <span className="shrink-0 text-base font-bold tracking-tight">
                            {money(bookValue)}{" "}
                            <span className="text-sm font-medium">ر.س</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-b border-white/25 py-3.5">
                          <span className="text-sm font-medium text-white/90">
                            إهلاك السنة الأولى (تقديري)
                          </span>
                          <span className="shrink-0 text-base font-bold tracking-tight">
                            {money(firstYear)}{" "}
                            <span className="text-sm font-medium">ر.س</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4 py-3.5">
                          <span className="text-sm font-medium text-white/90">
                            إجمالي الاستثمار
                          </span>
                          <span className="shrink-0 text-base font-bold tracking-tight">
                            {money(investment)}{" "}
                            <span className="text-sm font-medium">ر.س</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* أزرار: يمين في RTL */}
              <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-primary px-8 text-sm font-bold text-white transition hover:bg-primary-dark"
                >
                  استمرار
                </button>
                <Link
                  href="/accounts/FixedAsset"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-primary bg-white px-8 text-sm font-medium text-primary transition hover:bg-[#eef7fa]"
                >
                  إلغاء
                </Link>
              </div>
            </Form>
          </>
        }}
      </Formik>
    </div>
  );
};

export default AddAsset;
