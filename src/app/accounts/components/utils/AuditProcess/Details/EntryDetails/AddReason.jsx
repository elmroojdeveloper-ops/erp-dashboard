"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import * as Yup from "yup";

const REASON_OPTIONS = [
  {
    value: "unbalanced",
    title: "قيد غير متوازن",
    description: "إجمالي المبالغ المدينة لا يساوي إجمالي المبالغ الدائنة.",
  },
  {
    value: "missing_document",
    title: "قيد بدون مستند مؤيد",
    description: "القيد بدون فاتورة مرفقة أو مستند غير مطابق.",
  },
  {
    value: "wrong_classification",
    title: "خطأ في التصنيف المحاسبي",
    description: "خطأ في التصنيف المحاسبي أو استخدام حساب خاطئ.",
  },
  {
    value: "incomplete_data",
    title: "بيانات ناقصة",
    description: "الوصف غير واضح / توجد بيانات ناقصة.",
  },
];

const validationSchema = Yup.object({
  reason: Yup.string()
    .oneOf(
      REASON_OPTIONS.map((o) => o.value),
      "يرجى اختيار سبب صحيح"
    )
    .required("يرجى اختيار سبب الرفض"),
});

const AddReason = ({ openAddReason, setOpenAddReason, onSubmit }) => {
  if (!openAddReason) return null;

  const handleClose = () => {
    setOpenAddReason?.(false);
  };

  return (
    <div
      dir="rtl"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-reason-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] rounded-[22px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.14)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdecec] text-[#dc2626]">
              <FiAlertCircle size={20} />
            </div>
            <div className="text-right">
              <h2
                id="add-reason-title"
                className="text-[16px] font-extrabold text-[#1f2937]"
              >
                تحديد سبب الرفض وإجراء المعالجة
              </h2>
              <p className="mt-1.5 text-[12px] leading-5 text-[#6b7280]">
                يرجى اختيار سبب عدم المطابقة لتحديد الإجراء التصحيحي المناسب.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="إغلاق النافذة"
            onClick={handleClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#1f2937]"
          >
            <FiX size={18} />
          </button>
        </div>

        <Formik
          initialValues={{ reason: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const selected = REASON_OPTIONS.find(
              (o) => o.value === values.reason
            );
            onSubmit?.({
              reason: values.reason,
              reasonTitle: selected?.title || "",
              reasonDescription: selected?.description || "",
            });
            resetForm();
            setOpenAddReason?.(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="mt-5">
              <div
                role="radiogroup"
                aria-label="سبب الرفض"
                className="space-y-2.5"
              >
                {REASON_OPTIONS.map((option) => {
                  const selected = values.reason === option.value;

                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors ${
                        selected
                          ? "border-[#1b7398] bg-[#f3f9fb]"
                          : "border-[#e5e7eb] bg-white hover:border-[#cbd5e1]"
                      }`}
                    >
                      <Field
                        type="radio"
                        name="reason"
                        value={option.value}
                        checked={selected}
                        onChange={() => setFieldValue("reason", option.value)}
                        className="mt-1 size-4 shrink-0 accent-[#1b7398]"
                      />
                      <span className="min-w-0 text-right">
                        <span className="block text-[13px] font-bold text-[#1f2937]">
                          {option.title}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] leading-5 text-[#6b7280]">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <ErrorMessage name="reason">
                {(msg) => (
                  <span className="mt-2 block text-right text-xs text-red-500">
                    {msg}
                  </span>
                )}
              </ErrorMessage>

              <div className="mt-6 flex flex-wrap items-center justify-start gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-[42px] items-center justify-center rounded-xl bg-[#1b7398] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#165e7d] disabled:opacity-60"
                >
                  تأكيد وإرسال التنبيه
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex h-[42px] items-center justify-center rounded-xl border border-[#1b7398] bg-white px-5 text-[13px] font-bold text-[#1b7398] transition-colors hover:bg-[#f3f9fb]"
                >
                  إلغاء
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddReason;
