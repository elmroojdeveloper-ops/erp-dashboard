"use client";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck, FiPlus, FiUpload } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import * as Yup from "yup";

import {
  accountOptions,
  costCenterOptions,
  currencies,
  emptyLineItem,
  journalBooks,
  taxOptions,
} from "./mock-data";

const inputClass =
  "h-11 w-full rounded-xl border border-[#e2edf2] bg-[#eef6fa] px-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-[#147ba5] focus:bg-white";

const selectClass =
  `${inputClass} appearance-none pe-9 cursor-pointer`;

const lineSchema = Yup.object({
  account: Yup.string().required("الحساب مطلوب"),
  description: Yup.string().required("الوصف مطلوب"),
  tax: Yup.string().required("الضريبة مطلوبة"),
  costCenter: Yup.string().required("مركز التكلفة مطلوب"),
  debit: Yup.number()
    .transform((value, original) => (original === "" ? 0 : value))
    .min(0, "قيمة غير صالحة")
    .typeError("أدخل رقمًا صحيحًا"),
  credit: Yup.number()
    .transform((value, original) => (original === "" ? 0 : value))
    .min(0, "قيمة غير صالحة")
    .typeError("أدخل رقمًا صحيحًا"),
});

const validationSchema = Yup.object({
  journalBook: Yup.string().required("دفتر اليومية مطلوب"),
  accountingDate: Yup.string().required("تاريخ المحاسبة مطلوب"),
  reference: Yup.string().required("الرقم المرجعي مطلوب"),
  entryNumber: Yup.string().required("رقم القيد مطلوب"),
  currency: Yup.string().required("العملة مطلوبة"),
  description: Yup.string().required("وصف القيد مطلوب"),
  lines: Yup.array()
    .of(lineSchema)
    .min(2, "يجب إضافة سطرين على الأقل")
    .test("balanced", "القيد غير متوازن", (lines) => {
      if (!lines?.length) return false;

      const debit = lines.reduce(
        (sum, row) => sum + (Number(row.debit) || 0),
        0
      );

      const credit = lines.reduce(
        (sum, row) => sum + (Number(row.credit) || 0),
        0
      );

      return Math.abs(debit - credit) < 0.01;
    }),
});

const initialValues = {
  journalBook: "sales",
  accountingDate: "2026-05-01",
  reference: "REF-9902",
  entryNumber: "JRN/2026/06/0001",
  currency: "SAR",
  description: "",
  lines: [
    {
      account: "110101",
      description: "",
      tax: "vat",
      costCenter: "main",
      debit: "1500.00",
      credit: "0.00",
    },
    {
      account: "110102",
      description: "",
      tax: "vat",
      costCenter: "main",
      debit: "0.00",
      credit: "1500.00",
    },
  ],
};

const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const FieldError = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <span className="mt-1 block text-xs font-medium text-red-500">
        {msg}
      </span>
    )}
  </ErrorMessage>
);

const Label = ({ children }) => (
  <span className="mb-2 block text-sm font-medium text-[#687383]">
    {children}
  </span>
);

const SelectField = ({ name, children }) => (
  <div className="relative">
    <Field
      as="select"
      name={name}
      className={selectClass}
    >
      {children}
    </Field>

    <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#687383]" />
  </div>
);

const AccountSelect = ({ name }) => (
  <Field name={name}>
    {({ field }) => {
      const selected = accountOptions.find(
        (option) => option.value === field.value
      );

      return (
        <div className="relative flex h-11  items-center gap-2 rounded-xl border border-[#e2edf2] bg-[#eef6fa] px-2">
          {selected ? (
            <span className="shrink-0 rounded-md bg-[#08749d] px-2 py-1 text-[11px] font-bold text-white">
              {selected.code}
            </span>
          ) : null}

          <select
            {...field}
            className="h-full min-w-0 flex-1 appearance-none bg-transparent pe-6 text-sm text-[#465465] outline-none"
          >
            <option value="">اختر الحساب</option>

            {accountOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <IoChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#687383]" />
        </div>
      );
    }}
  </Field>
);

const TotalsBar = ({ debitTotal, creditTotal }) => {
  const balanced =
    Math.abs(debitTotal - creditTotal) < 0.01 && debitTotal > 0;

  return (
    <div className="flex min-h-[91px] gap-3 lg:gap-0 lg:items-center justify-between flex-col lg:flex-row items-start  rounded-b-[14px] bg-[#277fa6] px-5 py-4 text-white">
        <div
        className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium ${
          balanced
            ? "bg-[#32a98c]/50 text-[#74e0c2]"
            : "bg-red-400/20 text-red-100"
        }`}
      >
        {balanced && <FiCheck className="size-4" />}

        {balanced ? "القيد متوازن" : "القيد غير متوازن"}
      </div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/70">
            إجمالي المدين
          </span>

          <span className="text-base font-medium">
            {formatAmount(debitTotal)} ر.س
          </span>
        </div>

        <div className="h-10 w-px bg-white/50" />

        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/70">
            إجمالي الدائن
          </span>

          <span className="text-base font-medium">
            {formatAmount(creditTotal)} ر.س
          </span>
        </div>
      </div>

    
    </div>
  );
};

const AddEntries = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("entry", values);
    setSubmitting(false);
  };

  if (!ready) {
    return (
      <div className="min-h-[640px] animate-pulse rounded-[22px] bg-white" />
    );
  }

  return (
    <div className="pb-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          submitForm,
          setFieldValue,
        }) => {
          const debitTotal = values.lines.reduce(
            (sum, row) => sum + (Number(row.debit) || 0),
            0
          );

          const creditTotal = values.lines.reduce(
            (sum, row) => sum + (Number(row.credit) || 0),
            0
          );

          return (
            <Form className="w-full pb-8">
              {/* Page Header */}
              <section className="mb-5 flex min-h-[114px] items-center justify-between rounded-[14px] bg-white px-6 py-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
                <div className="text-right">
                  <h1 className="text-[22px] font-bold leading-8 text-[#11739b]">
                    إنشاء قيد يومي جديد
                  </h1>

                  <p className="mt-1 text-sm font-medium text-[#687383]">
                    أضف قيد يومي جديد
                  </p>
                </div>

                <Link
                  href="/accounts/Entries/Export"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] border border-[#1980ac] bg-white px-4 text-sm font-medium text-[#1980ac] transition hover:bg-[#eef7fa]"
                >
                  <FiUpload className="size-4" />
                  إستيراد القيود
                </Link>
              </section>

              {/* Entry Information */}
              <section className="mb-5 rounded-[14px] bg-white px-4 py-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:px-5">
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-5">
                  {/* Journal */}
                  <div>
                    <Label>دفتر اليومية</Label>

                    <SelectField name="journalBook">
                      {journalBooks.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </SelectField>

                    <FieldError name="journalBook" />
                  </div>

                  {/* Date */}
                  <div>
                    <Label>تاريخ المحاسبة</Label>

                    <div className="relative">
                      <Field
                        type="date"
                        name="accountingDate"
                        className={`${inputClass} ps-10`}
                      />

                      <HiOutlineCalendar className="pointer-events-none absolute start-3 top-1/2 size-[18px] -translate-y-1/2 text-[#687383]" />
                    </div>

                    <FieldError name="accountingDate" />
                  </div>

                  {/* Reference */}
                  <div>
                    <Label>الرقم المرجعي</Label>

                    <Field
                      name="reference"
                      placeholder="مثال: REF-9902"
                      className={inputClass}
                    />

                    <FieldError name="reference" />
                  </div>

                  {/* Entry number */}
                  <div>
                    <Label>رقم القيد</Label>

                    <Field
                      name="entryNumber"
                      disabled
                      className={`${inputClass} cursor-not-allowed text-[#b9c5ce]`}
                    />

                    <FieldError name="entryNumber" />
                  </div>

                  {/* Currency */}
                  <div>
                    <Label>العملة</Label>

                    <SelectField name="currency">
                      {currencies.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </SelectField>

                    <FieldError name="currency" />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                  <Label>الوصف</Label>

                  <Field
                    as="textarea"
                    name="description"
                    rows={3}
                    placeholder="أدخل تفاصيل القيد هنا..."
                    className="min-h-[78px] w-full resize-none rounded-xl border border-[#e2edf2] bg-[#eef6fa] px-3 py-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-[#147ba5] focus:bg-white"
                  />

                  <FieldError name="description" />
                </div>
              </section>

              {/* Entry Lines */}
              <section className="overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
                {/* Section title */}
                <div className="flex h-[68px] items-center justify-start gap-3 border-b border-[#eef1f3] px-5">
                  <h2 className="text-lg font-bold text-[#116f97]">
                    عناصر القيد
                  </h2>

                  <span className="rounded-full bg-[#277fa6] px-3 py-1 text-xs font-medium text-white">
                    {values.lines.length} بنود
                  </span>
                </div>

                <FieldArray name="lines">
                  {({ push }) => (
                    <>
                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] border-collapse text-right">
                          <thead>
                            <tr className="h-[48px] bg-[#edf6fa] text-[13px] font-medium text-[#657180]">
                              <th className="px-4 text-right">
                                الحساب
                              </th>

                              <th className="px-4 text-right">
                                الوصف
                              </th>

                              <th className="px-4 text-right">
                                الضريبة
                              </th>

                              <th className="px-4 text-right">
                                مركز التكلفة
                              </th>

                              <th className="px-4 text-right">
                                المدين
                              </th>

                              <th className="px-4 text-right">
                                الدائن
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {values.lines.map((_, index) => (
                              <tr
                                key={index}
                                className="h-[68px] border-b border-[#e9eff2] align-middle"
                              >
                                {/* Account */}
                                <td className="px-3">
                                  <AccountSelect
                                    name={`lines.${index}.account`}
                                  />

                                  <FieldError
                                    name={`lines.${index}.account`}
                                  />
                                </td>

                                {/* Description */}
                                <td className="px-3">
                                  <Field
                                    name={`lines.${index}.description`}
                                    placeholder="ادخل الوصف..."
                                    className="h-11 w-full rounded-xl border border-transparent bg-transparent px-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-[#e2edf2] focus:bg-[#eef6fa]"
                                  />

                                  <FieldError
                                    name={`lines.${index}.description`}
                                  />
                                </td>

                                {/* Tax */}
                                <td className="px-3">
                                  <SelectField
                                    name={`lines.${index}.tax`}
                                  >
                                    {taxOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </SelectField>

                                  <FieldError
                                    name={`lines.${index}.tax`}
                                  />
                                </td>

                                {/* Cost center */}
                                <td className="px-3">
                                  <SelectField
                                    name={`lines.${index}.costCenter`}
                                  >
                                    {costCenterOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </SelectField>

                                  <FieldError
                                    name={`lines.${index}.costCenter`}
                                  />
                                </td>

                                {/* Debit */}
                                <td className="px-3">
                                  <Field
                                    name={`lines.${index}.debit`}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="h-11 w-full rounded-xl border border-transparent bg-transparent px-3 text-sm text-[#465465] outline-none transition focus:border-[#e2edf2] focus:bg-[#eef6fa]"
                                  />

                                  <FieldError
                                    name={`lines.${index}.debit`}
                                  />
                                </td>

                                {/* Credit */}
                                <td className="px-3">
                                  <Field
                                    name={`lines.${index}.credit`}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="h-11 w-full rounded-xl border border-transparent bg-transparent px-3 text-sm text-[#465465] outline-none transition focus:border-[#e2edf2] focus:bg-[#eef6fa]"
                                  />

                                  <FieldError
                                    name={`lines.${index}.credit`}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Add line */}
                      <div className="flex min-h-[74px] items-center justify-start px-9">
                        <button
                          type="button"
                          onClick={() => push(emptyLineItem())}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#167ca5] transition hover:text-[#0e6386]"
                        >
                          <FiPlus className="size-[18px]" />
                          إضافة سطر جديد
                        </button>

                        <ErrorMessage name="lines">
                          {(msg) =>
                            typeof msg === "string" ? (
                              <span className="mr-5 text-sm font-medium text-red-500">
                                {msg}
                              </span>
                            ) : null
                          }
                        </ErrorMessage>
                      </div>

                      {/* Totals */}
                      <TotalsBar
                        debitTotal={debitTotal}
                        creditTotal={creditTotal}
                      />
                    </>
                  )}
                </FieldArray>
              </section>

              {/* Bottom Actions */}
              <section className="mt-5 flex min-h-[74px] items-center justify-between rounded-[14px] bg-white px-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
              <div className="flex items-center gap-4">
             

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 min-w-[119px] rounded-xl bg-[#247fa6] px-7 text-sm font-semibold text-white transition hover:bg-[#1d6e91] disabled:opacity-60"
                  >
                    نشر
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setFieldValue("_intent", "draft");
                      submitForm();
                    }}
                    className="h-11 rounded-xl bg-[#eef4f7] px-5 text-sm font-medium text-[#8b98a4] transition hover:bg-[#e3edf1] disabled:opacity-60"
                  >
                    حفظ كمسودة
                  </button>
                </div>
                <Link
                  href="/accounts/Entries"
                  className="text-sm font-medium text-[#e33131] transition hover:opacity-75"
                >
                  إلغاء
                </Link>

                
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEntries;