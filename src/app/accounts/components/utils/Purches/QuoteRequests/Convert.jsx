"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiFileText,
  FiFilter,
  FiPackage,
  FiPlus,
  FiSearch,
  FiSend,
  FiStar,
  FiX,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LuArrowLeftRight, LuCircleDollarSign } from "react-icons/lu";
import { getPurchaseRequestDetail } from "../Home/mock-data";

const listHref = "/accounts/Purches/quote-requests";
const ISSUE_DATE = "2024-10-15";

const vendorPool = [
  {
    id: "v1",
    name: "شركة المدى المتقدمة للتقنية",
    initials: "مدى",
    avatar: "bg-[#1B6A9C] text-white",
    rating: 4.9,
    badge: "معتمد وموثق",
    cr: "1010892341",
    city: "الرياض (توريد خلال 48 ساعة)",
    tag: "أجهزة وشبكات",
  },
  {
    id: "v2",
    name: "مؤسسة الحلول الرقمية الذكية",
    initials: "حلول",
    avatar: "bg-[#2E2A8C] text-white",
    rating: 4.8,
    badge: "عقد ساري",
    cr: "1010492831",
    city: "جدة والمنطقة الوسطى",
    tag: "خوادم وبنية تحتية",
  },
  {
    id: "v3",
    name: "يونيفرسال للتوريدات والمعدات التقنية",
    initials: "يون",
    avatar: "bg-[#E8EEF3] text-[#334155]",
    rating: 4.6,
    badge: null,
    cr: "1010992384",
    city: "الدمام",
    tag: "معدات مكتبية",
  },
];

const initialValues = {
  vendors: ["v1", "v2"],
  closingDate: "2024-10-28",
  category: "أجهزة وبنية رقمية / برمجيات (مطابق لبنود طلب الشراء)",
  instructions: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.vendors || values.vendors.length === 0) {
    errors.vendors = "يجب اختيار مورد واحد على الأقل";
  }

  if (!values.closingDate) {
    errors.closingDate = "تاريخ إغلاق العروض مطلوب";
  } else if (values.closingDate <= ISSUE_DATE) {
    errors.closingDate = "يجب أن يكون تاريخ الإغلاق بعد تاريخ الطرح";
  }

  if (!values.category) {
    errors.category = "تصنيف الشراء مطلوب";
  }

  if (values.instructions && values.instructions.length > 1000) {
    errors.instructions = "الحد الأقصى 1000 حرف";
  }

  return errors;
};

const getRemainingDays = (closingDate) => {
  if (!closingDate) return null;
  const diff =
    (new Date(closingDate).getTime() - new Date(ISSUE_DATE).getTime()) /
    (1000 * 60 * 60 * 24);
  return Number.isFinite(diff) && diff > 0 ? Math.round(diff) : null;
};

const ErrorText = ({ name }) => (
  <ErrorMessage
    name={name}
    component="p"
    className="mt-1.5 text-[11px] font-medium text-[#EF4444]"
  />
);

const Convert = ({ open = false, onClose, prId = "1", data: dataProp }) => {
  const router = useRouter();

  const resolvedPrId = String(prId || dataProp?.id || "1");
  const pr = useMemo(
    () => dataProp || getPurchaseRequestDetail(resolvedPrId),
    [dataProp, resolvedPrId],
  );

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const filteredVendors = vendorPool.filter((v) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      v.name.toLowerCase().includes(q) ||
      v.cr.includes(q) ||
      v.city.toLowerCase().includes(q) ||
      v.tag.toLowerCase().includes(q)
    );
  });

  const itemsLabel = useMemo(() => {
    const items = pr.items || [];
    const names = items
      .slice(0, 2)
      .map((item) => item.name)
      .join(" + ");
    return `${items.length} بنود${names ? ` (${names})` : ""}`;
  }, [pr.items]);

  const handleSubmit = (values, { setSubmitting }) => {
    // values: { vendors, closingDate, category, instructions }
    setSubmitting(false);
    onClose?.();
    router.push(listHref);
  };

  if (!open || typeof document === "undefined") return null;

  const inputBase =
    "w-full rounded-[10px] border text-[12px] outline-none focus:border-[#1B6A9C]";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]/55 p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="presentation"
    >
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => {
          const selectedCount = values.vendors.length;
          const remainingDays = getRemainingDays(values.closingDate);
          const hasError = (name) => !!(errors[name] && touched[name]);

          return (
            <Form
              dir="rtl"
              noValidate
              onMouseDown={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="convert-rfq-title"
              className="flex max-h-[min(920px,92vh)] w-full max-w-[1072px] flex-col overflow-hidden rounded-[20px] border border-[#E5EDF2] bg-white text-[#1A2332] shadow-[0_20px_60px_rgba(15,23,42,0.25)]"
            >
              {/* هيدر */}
              <header className="relative shrink-0 border-b border-[#EEF2F6] px-6 py-[18px]">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="إغلاق"
                  className="absolute start-[26px] top-[26px] grid size-6 place-items-center text-[#64748B] hover:text-[#1A2332]"
                >
                  <FiX className="size-[18px]" />
                </button>

                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#16698F] text-white shadow-[0_0_0_2px_#fff,0_2px_6px_rgba(15,23,42,0.12)]">
                    <LuArrowLeftRight className="size-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1
                        id="convert-rfq-title"
                        className="text-[18px] font-bold leading-6 text-[#1B6A9C]"
                      >
                        تحويل طلب الشراء إلى طلب عرض سعر (RFQ)
                      </h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F3D98B] bg-[#FFF8E1] px-2.5 py-[2px] text-[11px] font-bold text-[#B45309]">
                        <span className="size-1.5 rounded-full bg-[#F59E0B]" />
                        إجراء خطوة منافسة
                      </span>
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] leading-5 text-[#64748B]">
                      <span>
                        سيتم إنشاء وإرسال كراسة عروض الأسعار آليا استنادا إلى
                        بيانات طلب الشراء
                      </span>
                      <span
                        dir="ltr"
                        className="rounded bg-[#EEF3F8] px-2 py-[1px] font-mono text-[12px] font-bold text-[#1B6A9C]"
                      >
                        {pr.number}
                      </span>
                    </p>
                  </div>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto">
                {/* شريط الملخص */}
                <div className="mx-6 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-[12px] border border-[#E5EDF2] bg-[#F6F9FC] px-[18px] py-[14px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                  <div className="flex min-w-0 items-center gap-2 text-[12px]">
                    <FiFileText className="size-4 shrink-0 text-[#64748B]" />
                    <span className="text-[#64748B]">الطلب المرجعي:</span>
                    <span
                      dir="ltr"
                      className="rounded border border-[#E2EAF0] bg-white px-2 py-[1px] font-mono text-[12px] font-bold text-[#1B6A9C]"
                    >
                      {pr.number}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2 text-[12px]">
                    <FiPackage className="size-4 shrink-0 text-[#64748B]" />
                    <span className="text-[#64748B]">الأصناف:</span>
                    <span className="truncate font-bold text-[#1B6A9C]">
                      {itemsLabel}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2 text-[12px]">
                    <LuCircleDollarSign className="size-4 shrink-0 text-[#64748B]" />
                    <span className="text-[#64748B]">الميزانية التقديرية:</span>
                    <span className="font-mono font-bold text-[#1B6A9C]">
                      {pr.budget || "112,000.00"} ر.س
                    </span>
                  </div>
                  <div className="flex min-w-0 basis-full items-center gap-2 text-[12px]">
                    <HiOutlineOfficeBuilding className="size-4 shrink-0 text-[#64748B]" />
                    <span className="text-[#64748B]">القسم:</span>
                    <span className="font-semibold text-[#1A2332]">
                      {pr.department || "تكنولوجيا المعلومات"} / المقر الرئيسي
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-5">
                  {/* اختيار الموردين */}
                  <div className="mt-5 border-t border-[#EEF2F6] pt-5">
                    <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-bold text-[#1A2332]">
                          اختيار الموردين المؤهلين لتقديم العروض
                          <span className="ms-1.5 text-[#EF4444]">*</span>
                        </h2>
                        <span className="inline-flex rounded-md border border-[#B9DDEE] bg-[#EAF6FC] px-2 py-[3px] text-[11px] font-bold text-[#1B6A9C]">
                          {selectedCount} موردين محددين
                        </span>
                      </div>
                      <span className="text-[12px] text-[#64748B]">
                        الحد الأدنى الموصى به: 3 عروض للمقارنة التنافسية
                      </span>
                    </div>

                    <label className="relative mb-3 flex h-[30px] w-full items-center rounded-[10px] border border-[#E5EDF2] bg-[#F8FAFB] px-2.5">
                      <FiSearch className="pointer-events-none size-4 shrink-0 text-[#94A3B8]" />
                      <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ابحث عن مورد بالاسم، السجل التجاري، أو التصنيف التقني..."
                        className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[12px] text-[#1A2332] outline-none placeholder:text-[#94A3B8]"
                      />
                      <button
                        type="button"
                        className="inline-flex h-5 shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#E2EAF0] bg-white px-2.5 text-[11px] font-semibold text-[#475569]"
                      >
                        <FiFilter className="size-3" />
                        تصفية
                      </button>
                    </label>

                    <ul className="space-y-2">
                      {filteredVendors.map((vendor) => {
                        const isOn = values.vendors.includes(vendor.id);
                        return (
                          <li key={vendor.id}>
                            <label
                              className={`flex w-full cursor-pointer items-center gap-3 rounded-[12px] border px-3.5 py-[11px] text-start transition focus-within:ring-2 focus-within:ring-[#8FD3EE] ${
                                isOn
                                  ? "border-[#8FD3EE] bg-[#F0FAFE]"
                                  : "border-[#E5EDF2] bg-white hover:bg-[#F8FAFB]"
                              }`}
                            >
                              <Field
                                type="checkbox"
                                name="vendors"
                                value={vendor.id}
                                className="sr-only"
                              />

                              <span
                                className={`grid size-[14px] shrink-0 place-items-center rounded-[3px] border ${
                                  isOn
                                    ? "border-[#1B6A9C] bg-[#1B6A9C] text-white"
                                    : "border-[#CBD5E1] bg-white text-transparent"
                                }`}
                              >
                                <FiCheck className="size-2.5" strokeWidth={4} />
                              </span>

                              <span
                                className={`grid size-[29px] shrink-0 place-items-center rounded-[8px] text-[11px] font-bold ${vendor.avatar}`}
                              >
                                {vendor.initials}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-2">
                                  <span className="text-[13px] font-bold text-[#1A2332]">
                                    {vendor.name}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F59E0B]">
                                    <FiStar className="size-3 fill-current" />
                                    {vendor.rating}
                                  </span>
                                  {vendor.badge ? (
                                    <span className="rounded-[4px] bg-[#DCF5E7] px-1.5 py-[1px] text-[10px] font-semibold text-[#16A34A]">
                                      {vendor.badge}
                                    </span>
                                  ) : null}
                                </span>
                                <span className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-[#64748B]">
                                  <span>
                                    س.ت: <span dir="ltr">{vendor.cr}</span>
                                  </span>
                                  <span className="size-[3px] rounded-full bg-[#94A3B8]" />
                                  <span>{vendor.city}</span>
                                </span>
                              </span>

                              <span
                                className={`inline-flex shrink-0 items-center rounded-md px-3 py-1.5 text-[11px] font-semibold text-[#334155] ${
                                  vendor.id === "v3"
                                    ? "bg-[#F1F5F9]"
                                    : "border border-[#E2EAF0] bg-white"
                                }`}
                              >
                                {vendor.tag}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>

                    <ErrorText name="vendors" />

                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1B6A9C] hover:underline"
                      >
                        <FiPlus className="size-4" />
                        إضافة مورد جديد غير مدرج بالقائمة
                      </button>
                      <span className="text-[12px] text-[#94A3B8]">
                        سيتم حفظ الموردين في دليل مشتريات ROOJ
                      </span>
                    </div>
                  </div>

                  {/* مواعيد التقديم */}
                  <div className="mt-5 border-t border-[#EEF2F6] pt-5">
                    <h2 className="mb-4 text-[14px] font-bold text-[#1A2332]">
                      مواعيد التقديم وتصنيف المنافسة
                    </h2>

                    <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[12px] font-semibold text-[#334155]">
                          تاريخ الطرح والإصدار
                        </label>
                        <div className="relative flex h-[33px] items-center rounded-[10px] border border-[#E5EDF2] bg-[#F4F7FA] px-3 text-[12px] font-medium text-[#1A2332]">
                          15 أكتوبر 2024 (اليوم)
                          <FiCalendar className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <label
                            htmlFor="closingDate"
                            className="text-[12px] font-semibold text-[#334155]"
                          >
                            تاريخ إغلاق العروض (الاستحقاق)
                            <span className="ms-1 text-[#EF4444]">*</span>
                          </label>
                          {remainingDays ? (
                            <span className="inline-flex rounded-[4px] border border-[#F3D98B] bg-[#FFF8E1] px-2 py-[1px] text-[10px] font-bold text-[#B45309]">
                              متبقي {remainingDays} يوم
                            </span>
                          ) : null}
                        </div>
                        <Field
                          id="closingDate"
                          type="date"
                          name="closingDate"
                          dir="ltr"
                          className={`${inputBase} h-[32px] bg-white px-3 text-start font-mono text-[#1B6A9C] ${
                            hasError("closingDate")
                              ? "border-[#EF4444]"
                              : "border-[#D5E0E7]"
                          }`}
                        />
                        <ErrorText name="closingDate" />
                        <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                          الموعد النهائي للشركات لرفع عروضها المالية والفنية
                          بالنظام
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="category"
                        className="mb-1.5 block text-[12px] font-semibold text-[#334155]"
                      >
                        تصنيف الشراء والمنافسة
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          id="category"
                          name="category"
                          className={`${inputBase} h-[33px] appearance-none bg-[#F8FAFB] px-3 font-medium text-[#1B6A9C] ${
                            hasError("category")
                              ? "border-[#EF4444]"
                              : "border-[#E5EDF2]"
                          }`}
                        >
                          <option value="أجهزة وبنية رقمية / برمجيات (مطابق لبنود طلب الشراء)">
                            أجهزة وبنية رقمية / برمجيات (مطابق لبنود طلب الشراء)
                          </option>
                          <option value="تجهيزات مكتبية ومعدات">
                            تجهيزات مكتبية ومعدات
                          </option>
                          <option value="خدمات وصيانة">خدمات وصيانة</option>
                        </Field>
                        <FiChevronDown className="pointer-events-none absolute start-[10px] top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
                      </div>
                      <ErrorText name="category" />
                    </div>

                    <div className="mt-5 border-t border-[#EEF2F6] pt-5">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <label
                          htmlFor="instructions"
                          className="text-[12px] font-bold text-[#1B6A9C]"
                        >
                          تعليمات وشروط خاصة ترفق مع الدعوة{" "}
                          <span className="font-normal text-[#64748B]">
                            (اختياري)
                          </span>
                        </label>
                        <span className="text-[11px] text-[#94A3B8]">
                          ستظهر بوضوح في وثيقة الدعوة الرسمية للمورد
                        </span>
                      </div>
                      <Field
                        as="textarea"
                        id="instructions"
                        name="instructions"
                        rows={3}
                        placeholder="أضف أي شروط أو ملاحظات تظهر في وثيقة الدعوة..."
                        className={`${inputBase} resize-none bg-[#F8FAFB] px-3 py-2.5 leading-6 text-[#1A2332] placeholder:text-[#94A3B8] ${
                          hasError("instructions")
                            ? "border-[#EF4444]"
                            : "border-[#E5EDF2]"
                        }`}
                      />
                      <ErrorText name="instructions" />
                    </div>
                  </div>
                </div>
              </div>

              <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#EEF2F6] bg-[#F8FAFB] px-6 py-4">
                <p className="text-[12px] text-[#64748B]">
                  سيتم إرسال الدعوة إلى{" "}
                  <span className="font-bold text-[#1B6A9C]">
                    {selectedCount} موردين
                  </span>{" "}
                  استناداً إلى طلب الشراء{" "}
                  <span className="font-bold text-[#1A2332]">{pr.number}</span>
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 items-center justify-center rounded-[10px] border border-[#D5E0E7] bg-white px-5 text-[13px] font-bold text-[#475569]"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#1B6A9C] px-5 text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiSend className="size-4" />
                    إنشاء وإرسال طلب عرض السعر
                  </button>
                </div>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </div>,
    document.body,
  );
};

export default Convert;