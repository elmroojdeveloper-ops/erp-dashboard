"use client";

import { Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
  FiInfo,
  FiList,
  FiPlus,
  FiSave,
  FiSearch,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

const cardClass =
  "rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-[22px]";
const fieldClass =
  "h-11 w-full rounded-[11px] border border-[#CBD5DF] bg-white pr-8 pl-3 text-sm text-[#465465] outline-none transition placeholder:text-[#b9c5ce] focus:border-[#287FA4]";
const labelClass = "mb-2.5 block text-[12px] font-medium text-[#8992A3]";

const money = (n) =>
  `${Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ر.س`;

const lineTotal = (item) => {
  const base =
    Number(item.qty || 0) * Number(item.price || 0) - Number(item.discount || 0);
  return Math.max(0, base) * (1 + Number(item.tax || 0) / 100);
};

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2">
    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3F7] text-[#2580A5]">
      <Icon className="size-5" />
    </span>
    <h2 className="text-[17px] font-bold text-[#505A6C]">{children}</h2>
  </div>
);

function InvoiceSummary({ values }) {
  const subtotal = values.items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
    0
  );
  const discount = values.items.reduce(
    (sum, item) => sum + Number(item.discount || 0),
    0
  );
  const tax = values.items.reduce((sum, item) => {
    const base =
      Number(item.qty || 0) * Number(item.price || 0) -
      Number(item.discount || 0);
    return sum + Math.max(0, base) * (Number(item.tax || 0) / 100);
  }, 0);
  const total = subtotal - discount + tax;

  return (
    <div className="flex flex-col gap-5">
      <section className="relative overflow-hidden rounded-[14px] bg-[#287FA4] p-5 text-white shadow-card sm:p-[22px]">
        <div className="pointer-events-none absolute -right-10 -top-14 size-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 size-48 rounded-full bg-white/10" />

        <div className="relative">
          <h3 className="text-center text-[17px] font-bold">ملخص الفاتورة</h3>

          <div className="mt-7 space-y-0 text-[14px]">
            <div className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-white/85">المجموع الفرعي:</span>
              <span className="shrink-0 font-semibold">{money(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-white/85">إجمالي الضريبة (15%):</span>
              <span className="shrink-0 font-semibold">{money(tax)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-white/85">إجمالي الخصم:</span>
              <span className="shrink-0 font-semibold">{money(discount)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/30 pt-5 text-[16px] font-bold">
              <span>الإجمالي المستحق:</span>
              <span className="shrink-0">{money(total)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-[11px] bg-white/15 px-3.5 py-3 text-right">
              <p className="text-[11px] text-white/75">الرقم المرجعي</p>
              <p className="mt-1 text-sm font-bold">INV-2023-00045</p>
            </div>
            <div className="rounded-[11px] bg-white/15 px-3.5 py-3 text-right">
              <p className="text-[11px] text-white/75">العملة</p>
              <p className="mt-1 text-sm font-bold">ريال سعودي (SAR)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[14px] bg-white p-5 text-center shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
        <div className="flex items-center justify-center gap-2 text-[#2580A5]">
          <FiInfo className="size-[18px]" />
          <h3 className="text-[15px] font-bold">متطلبات هيئة الزكاة والضريبة</h3>
        </div>
        <p className="mt-3 text-[11px] leading-[1.8] text-[#687386]">
          سيتم توليد رمز الاستجابة السريعة (QR Code) تلقائياً عند حفظ الفاتورة
          للامتثال لمتطلبات الفوترة الإلكترونية.
        </p>
      </section>
    </div>
  );
}

export default function AddInvoice() {
  return (
    <div className="pb-2">
      <Formik
        initialValues={{
          customer: "",
          invoiceDate: "",
          dueDate: "",
          paymentStatus: "",
          items: [
            {
              description: "شركة الأفق للمقاولات",
              qty: 1,
              price: 0,
              tax: 15,
              discount: 0,
            },
          ],
        }}
        onSubmit={(values) => console.log("Invoice:", values)}
      >
        {({ values }) => (
          <Form className="w-full">
            {/* Header: عنوان يمين · أزرار شمال */}
            <section className="mb-5 flex min-h-[88px] flex-col gap-4 rounded-[14px] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <h1 className="text-[21px] font-bold text-[#247FA4]">
                إنشاء فاتورة مباشرة
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded-[11px] bg-[#287FA4] px-4 text-[13px] font-bold text-white transition hover:bg-[#206F90]"
                >
                  <FiSave className="size-4" />
                  حفظ وإصدار الفاتورة الضريبية
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center rounded-[11px] border border-[#287FA4] bg-white px-4 text-[13px] font-bold text-[#287FA4] transition hover:bg-[#EAF3F7]"
                >
                  حفظ كمسودة
                </button>

                <Link
                  href="/accounts/Invoice"
                  className="inline-flex h-11 items-center gap-1.5 px-2 text-[14px] font-bold text-[#287FA4]"
                >
                  <FiArrowLeft className="size-4" />
                  الرجوع
                </Link>
              </div>
            </section>

            {/* RTL: فورم يمين · ملخص شمال */}
            <div className="grid  items-start gap-5 grid-cols-1 md:grid-cols-3">
              <div className="flex min-w-0 flex-col col-span-2 gap-5">
                {/* بيانات العميل */}
                <section className={cardClass}>
                  <SectionTitle icon={FiUser}>بيانات العميل</SectionTitle>

                  <label className={`${labelClass} mt-5`}>اختر العميل</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                    <div className="relative min-w-0 flex-1">
                      <Field
                        name="customer"
                        placeholder="بحث"
                        className={`${fieldClass}  pe-10`}
                      />
                      <FiSearch className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#677386]" />
                    </div>

                    <button
                      type="button"
                      className="inline-flex shrink-0 items-center gap-2 text-[13px] font-bold text-[#287FA4]"
                    >
                      <span className="flex size-6 items-center justify-center rounded-full border border-[#287FA4]">
                        <FiPlus className="size-3.5" />
                      </span>
                      إضافة سطر جديد
                    </button>
                  </div>
                </section>

                {/* التواريخ */}
                <section className={cardClass}>
                  <SectionTitle icon={FiCalendar}>التواريخ</SectionTitle>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>تاريخ الفاتورة</label>
                      <div className="relative">
                        <Field
                          type="date"
                          name="invoiceDate"
                          className={`${fieldClass} pe-10`}
                        />
                        <FiCalendar className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8992A3]" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>تاريخ الاستحقاق</label>
                      <div className="relative">
                        <Field
                          type="date"
                          name="dueDate"
                          className={`${fieldClass} pe-10`}
                        />
                        <FiCalendar className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8992A3]" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* البنود والخدمات */}
                <section className="overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
                  <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-[22px]">
                    <SectionTitle icon={FiList}>البنود والخدمات</SectionTitle>

                    <FieldArray name="items">
                      {({ push }) => (
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              description: "",
                              qty: 1,
                              price: 0,
                              tax: 15,
                              discount: 0,
                            })
                          }
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-[11px] bg-[#EAF3F7] px-3 text-[13px] font-bold text-[#287FA4] transition hover:bg-[#dceef5]"
                        >
                          <FiPlus className="size-4" />
                          إضافة بند
                        </button>
                      )}
                    </FieldArray>
                  </div>

                  <div className="scrollbar-thin overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse text-right">
                      <thead>
                        <tr className="bg-[#EDF5F8] text-[13px] font-medium text-[#596476]">
                          <th className="px-4 py-3.5 font-medium">الوصف</th>
                          <th className="px-3 py-3.5 text-center font-medium">
                            الكمية
                          </th>
                          <th className="px-3 py-3.5 text-center font-medium">
                            سعر الوحدة
                          </th>
                          <th className="px-3 py-3.5 text-center font-medium">
                            الضريبة%
                          </th>
                          <th className="px-3 py-3.5 text-center font-medium">
                            الخصم
                          </th>
                          <th className="px-3 py-3.5 text-center font-medium">
                            المجموع
                          </th>
                          <th className="w-12 px-2 py-3.5" />
                        </tr>
                      </thead>
                      <tbody>
                        <FieldArray name="items">
                          {({ remove }) =>
                            values.items.map((item, i) => (
                              <tr
                                key={i}
                                className="border-b border-[#F1F3F5] text-[13px] last:border-0"
                              >
                                <td className="px-4 py-4">
                                  <Field
                                    name={`items.${i}.description`}
                                    className="w-full bg-transparent text-right text-[#465465] outline-none"
                                  />
                                </td>
                                <td className="px-3 py-4 text-center">
                                  <Field
                                    type="number"
                                    min="1"
                                    name={`items.${i}.qty`}
                                    className="w-14 bg-transparent text-center outline-none"
                                  />
                                </td>
                                <td className="px-3 py-4 text-center">
                                  <Field
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name={`items.${i}.price`}
                                    className="w-20 bg-transparent text-center outline-none"
                                  />
                                </td>
                                <td className="px-3 py-4 text-center">
                                  <div className="relative inline-flex">
                                    <Field
                                      as="select"
                                      name={`items.${i}.tax`}
                                      className="appearance-none bg-transparent pe-5 text-center outline-none"
                                    >
                                      <option value="15">15%</option>
                                      <option value="5">5%</option>
                                      <option value="0">0%</option>
                                    </Field>
                                    <IoChevronDown className="pointer-events-none absolute end-0 top-1/2 size-3.5 -translate-y-1/2 text-[#8992A3]" />
                                  </div>
                                </td>
                                <td className="px-3 py-4 text-center">
                                  <Field
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name={`items.${i}.discount`}
                                    className="w-20 bg-transparent text-center outline-none"
                                  />
                                </td>
                                <td className="px-3 py-4 text-center font-bold text-[#343434]">
                                  {money(lineTotal(item))}
                                </td>
                                <td className="px-2 py-4 text-center">
                                  <button
                                    type="button"
                                    onClick={() => remove(i)}
                                    className="inline-flex size-8 items-center justify-center rounded-lg text-danger transition hover:bg-red-50"
                                    aria-label="حذف البند"
                                  >
                                    <FiTrash2 className="size-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </FieldArray>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* حالة الدفع */}
                <section className={cardClass}>
                  <SectionTitle icon={FiCreditCard}>حالة الدفع</SectionTitle>

                  <div className="relative mt-5">
                    <Field
                      as="select"
                      name="paymentStatus"
                      className={`${fieldClass} appearance-none bg-[#EDF5F8] pe-10`}
                    >
                      <option value="">اختر حالة الدفع</option>
                      <option value="paid">مدفوعة</option>
                      <option value="partial">مدفوعة جزئياً</option>
                      <option value="unpaid">غير مدفوعة</option>
                    </Field>
                    <IoChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8992A3]" />
                  </div>
                </section>
              </div>

              {/* ملخص — شمال في RTL */}
              <InvoiceSummary values={values} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
