"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  FiCheck,
  FiInfo,
  FiLock,
  FiSettings,
  FiX,
} from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { BsLayers } from "react-icons/bs";

const COLORS = {
  primary: "#1E7A9B",
  primarySoft: "#EDF6F9",
  text: "#465466",
  muted: "#7D8997",
  border: "#C9D4DC",
  soft: "#F5F8FA",
  danger: "#D93A3A",
};

const fieldClass = `
  h-11
  w-full
  rounded-xl
  border
  border-[#C9D4DC]
  bg-white
  px-3
  text-right
  text-sm
  text-[#465466]
  outline-none
  transition
  placeholder:text-[#AAB6C0]
  focus:border-[#1E7A9B]
  focus:ring-1
  focus:ring-[#1E7A9B]/10
`;

const selectClass = `${fieldClass} appearance-none pe-9`;

const labelClass = `
  mb-2
  block
  text-right
  text-[13px]
  font-medium
  leading-5
  text-[#6F7C8B]
`;

const validationSchema = Yup.object({
  assetAccount: Yup.string().required("حساب الأصل مطلوب"),
  depreciationMethod: Yup.string().required(),
  usefulLife: Yup.number().min(1, "لازم سنة على الأقل"),
  depreciationRate: Yup.number(),
});

const AssetCategory = ({ setOpenCategory, openCategory }) => {
  if (!openCategory) return null;

  return (
    <div
      dir="rtl"
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/35
        p-4
        backdrop-blur-[3px]
      "
    >
      <div
        className="
          flex
          max-h-[calc(100vh-32px)]
          w-full
          max-w-[720px]
          flex-col
          overflow-hidden
          rounded-[19px]
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        "
      >
        {/* ================= HEADER ================= */}
        <div className="shrink-0 px-5 pt-4">
          <div className="flex items-start justify-between">
            {/* Close */}
        

            {/* Title */}
            <div className="flex items-start gap-3">
              

              <div
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-[10px]
                  bg-[#1E7A9B]
                  text-white
                "
              >
                <BsLayers className="size-[20px]" />
              </div>
              <div className="pt-0.5 text-right">
                <h2 className="text-[17px] font-bold leading-6 text-[#465466]">
                  إعداد تصنيف الأصل
                  <span className="font-medium">
                    {" "}
                    (Asset Category)
                  </span>
                </h2>

                <p className="mt-1 text-[13px] leading-5 text-[#7A8795]">
                  تكوين الخصائص المحاسبية وإهلاك الأصول
                </p>
              </div>
            </div>
            
              <button
              type="button"
              onClick={() => setOpenCategory(false)}
              aria-label="إغلاق"
              className="
                mt-2
                flex
                size-7
                items-center
                justify-center
                rounded-md
                text-[#5A6675]
                transition
                hover:bg-[#F4F7F9]
                hover:text-[#344252]
              "
            >
              <FiX className="size-[17px]" />
            </button>
          </div>

          <div className="mt-3 h-px bg-[#CBD5DC]" />
        </div>

        <Formik
          initialValues={{
            reference: "AST-CAT-2024-001",
            assetAccount: "1104 - أجهزة حاسب آلي (أصول ثابتة)",
            depreciable: true,
            depreciationMethod: "القسط الثابت (Straight Line)",
            usefulLife: 4,
            depreciationRate: 25,
            expenseAccount: "5201 - مصروف إهلاك حاسب آلي",
            accumulatedAccount: "2104 - مجمع إهلاك حاسب آلي",
            depreciationType: "auto",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            setOpenCategory(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex min-h-0 flex-1 flex-col">
              {/* ================= BODY ================= */}
              <div
                className="
                  grid
                  min-h-0
                  flex-1
                  grid-cols-1
                  md:grid-cols-2
                "
              >
                {/* ========================================
                    RIGHT COLUMN
                    معلومات أساسية
                ======================================== */}
                <div
                  className="
                    order-1
                    min-w-0
                    border-b
                    border-[#CBD5DC]
                    px-5
                    pb-4
                    pt-4
                    md:border-b-0
                    md:border-l
                  "
                >
                  {/* Section title */}
                  <div className="mb-5 flex items-center  gap-2">
                                        <FiInfo className="size-[22px] text-[#1E7A9B]" />

                    <h3 className="text-[16px] font-bold leading-6 text-[#465466]">
                      معلومات أساسية
                    </h3>

                  </div>

                  {/* Reference */}
                  <div>
                    <label className={labelClass}>
                      الرقم المرجعي
                    </label>

                    <div className="relative">
                      <Field
                        name="reference"
                        disabled
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-[#C9D4DC]
                          bg-[#F8FAFB]
                          px-9
                          text-sm
                          text-[#AEBBC5]
                          outline-none
                        "
                      />

                      <FiLock
                        className="
                          absolute
                          right-3
                          top-1/2
                          size-[14px]
                          -translate-y-1/2
                          text-[#B7C3CC]
                        "
                      />
                    </div>
                  </div>

                  {/* Asset Account */}
                  <div className="mt-4">
                    <label className={labelClass}>
                      حساب الأصل{" "}
                      <span className="text-[#D93A3A]">*</span>
                    </label>

                    <div className="relative">
                      <Field
                        as="select"
                        name="assetAccount"
                        className={selectClass}
                      >
                        <option>
                          1104 - أجهزة حاسب آلي (أصول ثابتة)
                        </option>
                        <option>1105 - مركبات</option>
                        <option>1106 - أثاث</option>
                      </Field>

                      <IoChevronDown
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          size-[16px]
                          -translate-y-1/2
                          text-[#687786]
                        "
                      />
                    </div>

                    <ErrorMessage
                      name="assetAccount"
                      component="span"
                      className="
                        mt-1
                        block
                        text-right
                        text-xs
                        text-red-500
                      "
                    />
                  </div>

                  {/* Depreciable */}
             <button
  type="button"
  onClick={() =>
    setFieldValue("depreciable", !values.depreciable)
  }
  className={`
    relative
    mt-5
    flex
    h-[44px]
    w-full
    items-center
    gap-2
    overflow-hidden
    rounded-xl
    border
    px-3
    text-sm
    transition
    cursor-pointer
    ${
      values.depreciable
        ? "border-[#BBD9E3] border-r-[4px] border-r-[#1E7A9B] bg-[#EDF6F9]"
        : "border-[#C9D4DC] bg-white"
    }
  `}
>
  {/* Checkbox */}
  <span
    className={`
      flex
      size-5
      shrink-0
      items-center
      justify-center
      rounded-[6px]
      border
      transition
      ${
        values.depreciable
          ? "border-[#1E7A9B] bg-[#1E7A9B] text-white"
          : "border-[#C9D4DC] bg-white text-transparent"
      }
    `}
  >
    {values.depreciable && (
      <FiCheck className="size-3.5" />
    )}
  </span>

  {/* النص */}
  <span className="font-medium text-[#465466]">
    قابل للإهلاك
  </span>

  {/* الأيقونة */}
  <span
    className={`
      mr-auto flex size-5 items-center justify-center
      ${
        values.depreciable
          ? "text-[#D5EAF1]"
          : "text-[#E5E9ED]"
      }
    `}
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-[18px]"
    >
      <path
        d="M4 17L8 13L11 15L17 8L20 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</button>
                </div>

                {/* ========================================
                    LEFT COLUMN
                    إعدادات الإهلاك
                ======================================== */}
                <div
                  className="
                    order-2
                    min-w-0
                    px-5
                    pb-4
                    pt-4
                  "
                >
                  {/* Section title */}
                  <div className="mb-5 flex items-center  gap-2">
                                        <FiSettings className="size-[17px] text-[#1E7A9B]" />

                    <h3 className="text-[16px] font-bold leading-6 text-[#465466]">
                      إعدادات الإهلاك
                    </h3>

                  </div>

                  {/* Depreciation Method */}
                  <div>
                    <label className={labelClass}>
                      طريقة الإهلاك
                    </label>

                    <div className="relative">
                      <Field
                        as="select"
                        name="depreciationMethod"
                        className={selectClass}
                      >
                        <option>
                          القسط الثابت (Straight Line)
                        </option>
                        <option>القسط المتناقص</option>
                        <option>وحدات الإنتاج</option>
                      </Field>

                      <IoChevronDown
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          size-[16px]
                          -translate-y-1/2
                          text-[#687786]
                        "
                      />
                    </div>
                  </div>

                  {/* Useful Life / Rate */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {/* Useful life */}
                    <div>
                      <label className={labelClass}>
                        العمر الإنتاجي
                      </label>

                      <div
                        className="
                          flex
                          h-11
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#C9D4DC]
                          bg-white
                          focus-within:border-[#1E7A9B]
                        "
                      >
                        <Field
                          name="usefulLife"
                          type="number"
                          className="
                            min-w-0
                            w-full
                            px-2
                            text-center
                            text-sm
                            text-[#465466]
                            outline-none
                          "
                        />

                        <span
                          className="
                            flex
                            shrink-0
                            items-center
                            bg-[#EDF6F9]
                            px-2.5
                            text-xs
                            font-medium
                            text-[#1E7A9B]
                          "
                        >
                          سنوات
                        </span>
                      </div>
                    </div>

                    {/* Depreciation rate */}
                    <div>
                      <label className={labelClass}>
                        نسبة الإهلاك السنوية
                      </label>

                      <div
                        className="
                          flex
                          h-11
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#C9D4DC]
                          bg-white
                          focus-within:border-[#1E7A9B]
                        "
                      >
                        <Field
                          name="depreciationRate"
                          type="number"
                          className="
                            min-w-0
                            w-full
                            px-2
                            text-center
                            text-sm
                            text-[#465466]
                            outline-none
                          "
                        />

                        <span
                          className="
                            flex
                            shrink-0
                            items-center
                            bg-[#EDF6F9]
                            px-3
                            text-sm
                            font-medium
                            text-[#1E7A9B]
                          "
                        >
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expense Account */}
                  <div className="mt-4">
                    <label className={labelClass}>
                      العمر الإنتاجي بالسنوات
                    </label>

                    <div className="relative">
                      <Field
                        as="select"
                        name="expenseAccount"
                        className={selectClass}
                      >
                        <option>
                          5201 - مصروف إهلاك حاسب آلي
                        </option>
                        <option>
                          5202 - مصروف إهلاك مركبات
                        </option>
                      </Field>

                      <IoChevronDown
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          size-[16px]
                          -translate-y-1/2
                          text-[#687786]
                        "
                      />
                    </div>
                  </div>

                  {/* Accumulated Account */}
                  <div className="mt-4">
                    <label className={labelClass}>
                      حساب مجمع الاستهلاك
                    </label>

                    <div className="relative">
                      <Field
                        as="select"
                        name="accumulatedAccount"
                        className={selectClass}
                      >
                        <option>
                          2104 - مجمع إهلاك حاسب آلي
                        </option>
                        <option>
                          2105 - مجمع إهلاك مركبات
                        </option>
                      </Field>

                      <IoChevronDown
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          size-[16px]
                          -translate-y-1/2
                          text-[#687786]
                        "
                      />
                    </div>
                  </div>

                  {/* Depreciation Type */}
                <div className="mt-4">
  <label className={labelClass}>
    نوع الإهلاك
  </label>

  <div className="grid grid-cols-2 gap-2">
    {/* Auto - RIGHT */}
    <label
      className={`
        cursor-pointer
        rounded-xl
        border
        p-3
        text-center
        transition
        ${
          values.depreciationType === "auto"
            ? "border-[#1E7A9B] bg-[#EDF6F9]"
            : "border-[#C9D4DC] bg-white"
        }
      `}
    >
      <Field
        type="radio"
        name="depreciationType"
        value="auto"
        className="hidden"
      />

      <span className="flex items-center justify-center gap-2">
        {/* 1 - الكلمة الأول */}
        <span className="text-sm font-medium text-[#465466]">
          آلي
          <span className="font-normal text-[#1E7A9B]"> (Automated)</span>
        </span>

        {/* 2 - زرار التشيك بعدها */}
        <span
          className={`
            flex
            size-[18px]
            items-center
            justify-center
            rounded-full
            border-2
            ${
              values.depreciationType === "auto"
                ? "border-[#1E7A9B]"
                : "border-[#73808E]"
            }
          `}
        >
          {values.depreciationType === "auto" && (
            <span className="size-2 rounded-full bg-[#1E7A9B]" />
          )}
        </span>
      </span>

      <span className="mt-1.5 block text-[11px] leading-4 text-[#758392]">
        يتم القيد تلقائياً بواسطة النظام
      </span>
    </label>

    {/* Manual - LEFT */}
    <label
      className={`
        cursor-pointer
        rounded-xl
        border
        p-3
        text-center
        transition
        ${
          values.depreciationType === "manual"
            ? "border-[#1E7A9B] bg-[#EDF6F9]"
            : "border-[#C9D4DC] bg-white"
        }
      `}
    >
      <Field
        type="radio"
        name="depreciationType"
        value="manual"
        className="hidden"
      />

      <span className="flex items-center justify-center gap-2">
        {/* 1 - الكلمة الأول */}
        <span className="text-sm font-medium text-[#465466]">
          يدوي
          <span className="font-normal text-[#1E7A9B]"> (Manual)</span>
        </span>

        {/* 2 - زرار التشيك بعدها */}
        <span
          className={`
            flex
            size-[18px]
            items-center
            justify-center
            rounded-full
            border-2
            ${
              values.depreciationType === "manual"
                ? "border-[#1E7A9B]"
                : "border-[#73808E]"
            }
          `}
        >
          {values.depreciationType === "manual" && (
            <span className="size-2 rounded-full bg-[#1E7A9B]" />
          )}
        </span>
      </span>

      <span className="mt-1.5 block text-[11px] leading-4 text-[#758392]">
        يتطلب إدخال قيد يدوي دوري
      </span>
    </label>
  </div>
</div>
                </div>
              </div>

              {/* ================= FOOTER ================= */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-start
                  gap-3
                  border-t
                  border-[#CBD5DC]
                  px-5
                  py-4
                "
              >
                   <button
                  type="submit"
                  className="
                    flex
                    h-11
                    min-w-[130px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#1E7A9B]
                    px-5
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-[#196D8B]
                    active:scale-[0.99]
                  "
                >
                       <span className="flex size-[19px] items-center justify-center rounded-full border border-white/80">
                    <FiCheck className="size-[12px] stroke-[3]" />
                  </span>
                  حفظ الحساب
               
                </button>
                {/* Cancel */}
                <button
                  type="button"
                  onClick={() => setOpenCategory(false)}
                  className="
                    h-11
                    min-w-[98px]
                    rounded-xl
                    border
                    border-[#1E7A9B]
                    bg-white
                    px-5
                    text-sm
                    font-medium
                    text-[#1E7A9B]
                    transition
                    hover:bg-[#EDF6F9]
                  "
                >
                  إلغاء
                </button>

                {/* Save */}
             
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AssetCategory;
