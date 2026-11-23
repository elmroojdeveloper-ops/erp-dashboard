"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiPrinter,
  FiZoomIn,
  FiDownload,
  FiFileText,
  FiX,
  FiCheck,
  FiClock,
} from "react-icons/fi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

/* ============================================================
   بيانات تجريبية للمعاملة (استبدلها ببيانات الـ API حسب id)
============================================================ */
const MOCK_DETAILS_MAP = {
  "PMT-2023-4412": {
    id: "PMT-2023-4412",
    status: "pending",
    statusLabel: "بانتظار المراجعة",
    clientName: "مؤسسة الحلول المبتكرة",
    transactionDate: "2023/10/24",
    amount: "42,000.00 SAR",
    invoiceNumber: "INV-98234",
    paymentMethod: "تحويل بنكي",
    serviceName: "تطوير المنصة السحابية المتكاملة - المرحلة الثالثة",
    salesNote:
      "تم تحصيل الدفعة الثالثة من المشروع وفقاً لجدول الدفعات المتفق عليه.\nالعميل يطلب سرعة التأكيد لبدء المرحلة التالية",
    proofType: "image",
    proofUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    proofTitle: "قسيمة إيداع نقدي - بنك الراجحي",
    auditTrail: [
      {
        id: 1,
        dotColor: "#10b981",
        text: "تم تسجيل العملية بواسطة 'أحمد المحمدي' (المبيعات)",
        timestamp: "2023/10/24 - 09:00 AM",
      },
      {
        id: 2,
        dotColor: "#1b7398",
        text: "تمت المشاهدة بواسطة 'المدير النظام' (المحاسبة)",
        timestamp: "2023/10/24 - 10:30 AM",
      },
    ],
  },
  "PMT-2023-4413": {
    id: "PMT-2023-4413",
    status: "pending",
    statusLabel: "بانتظار المراجعة",
    clientName: "شركة الرؤية العالمية",
    transactionDate: "2023/10/24",
    amount: "15,500.00 SAR",
    invoiceNumber: "INV-2023-00125",
    paymentMethod: "بطاقة مدى",
    serviceName: "استشارات فنية - الربع الثالث",
    salesNote: "دفعة جزئية من عقد الاستشارات الفنية.",
    proofType: "image",
    proofUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    proofTitle: "إيصال بطاقة مدى",
    auditTrail: [
      {
        id: 1,
        dotColor: "#10b981",
        text: "تم تسجيل العملية بواسطة فريق المبيعات",
        timestamp: "2023/10/24 - 11:00 AM",
      },
    ],
  },
  "PMT-2023-4414": {
    id: "PMT-2023-4414",
    status: "pending",
    statusLabel: "بانتظار المراجعة",
    clientName: "متجر الفرسان",
    transactionDate: "2023/10/24",
    amount: "67,000.00 SAR",
    invoiceNumber: "INV-2023-00126",
    paymentMethod: "بطاقة مدى",
    serviceName: "توريد أجهزة حاسب آلي",
    salesNote: "هناك اختلاف في رقم المرجع — يرجى التحقق قبل الاعتماد.",
    proofType: "image",
    proofUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    proofTitle: "صورة التحويل",
    auditTrail: [
      {
        id: 1,
        dotColor: "#d97706",
        text: "تنبيه: عدم تطابق رقم المرجع",
        timestamp: "2023/10/24 - 02:15 PM",
      },
    ],
  },
};

const DEFAULT_DETAIL = {
  ...MOCK_DETAILS_MAP["PMT-2023-4412"],
};

function getPaymentDetail(id) {
  if (id && MOCK_DETAILS_MAP[id]) return { ...MOCK_DETAILS_MAP[id] };
  return {
    ...DEFAULT_DETAIL,
    id: id || DEFAULT_DETAIL.id,
    status: "pending",
    statusLabel: "بانتظار المراجعة",
  };
}

const cx = (...c) => c.filter(Boolean).join(" ");

const Details = ({
  id = "PMT-2023-4412",
  data,
  onBack,
  onApprove,
  onReject,
  onPrint,
}) => {
  const router = useRouter();

  const initialDetail = useMemo(() => {
    if (data) return data;
    return getPaymentDetail(id);
  }, [id, data]);

  const [detail, setDetail] = useState(initialDetail);
  const [accountantNote, setAccountantNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [formError, setFormError] = useState("");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setDetail(initialDetail);
    setAccountantNote("");
    setRejectionReason("");
    setFormError("");
  }, [initialDetail]);

  const isPending = detail.status === "pending";

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.push("/accounts/PaymentReview");
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint(detail);
      return;
    }
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleApprove = () => {
    setFormError("");
    const nowLabel = new Date().toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updated = {
      ...detail,
      status: "approved",
      statusLabel: "تم الاعتماد",
      auditTrail: [
        ...detail.auditTrail,
        {
          id: Date.now(),
          dotColor: "#10b981",
          text: `تم اعتماد الدفعة بواسطة المحاسب${
            accountantNote.trim() ? ` — ملاحظة: ${accountantNote.trim()}` : ""
          }`,
          timestamp: nowLabel,
        },
      ],
    };

    setDetail(updated);
    onApprove?.({
      id: detail.id,
      accountantNote: accountantNote.trim(),
      detail: updated,
    });
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      setFormError("يرجى ذكر سبب الرفض قبل تأكيد رفض الدفعة.");
      return;
    }

    setFormError("");
    const nowLabel = new Date().toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updated = {
      ...detail,
      status: "rejected",
      statusLabel: "مرفوضة",
      auditTrail: [
        ...detail.auditTrail,
        {
          id: Date.now(),
          dotColor: "#ef4444",
          text: `تم رفض الدفعة — السبب: ${rejectionReason.trim()}`,
          timestamp: nowLabel,
        },
      ],
    };

    setDetail(updated);
    onReject?.({
      id: detail.id,
      rejectionReason: rejectionReason.trim(),
      accountantNote: accountantNote.trim(),
      detail: updated,
    });
  };

  const statusBadgeStyle =
    detail.status === "approved"
      ? "bg-[#e6f7ef] text-[#0d8a55]"
      : detail.status === "rejected"
      ? "bg-[#fdeaea] text-[#c92a2a]"
      : "bg-[#fef6e7] text-[#d97706]";

  return (
    <div dir="rtl" className="space-y-4 text-[#1f2937]">
      {/* ============================================================
          1. الشريط العلوي: رقم المعاملة + الحالة + أزرار الرجوع والطباعة
      ============================================================ */}
      <div className="rounded-[22px] bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1
                dir="ltr"
                className="text-[20px] font-extrabold tracking-tight text-[#1b7398]"
              >
                {detail.id}
              </h1>
              <span
                className={cx(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                  statusBadgeStyle
                )}
              >
                <FiClock size={11} />
                <span>{detail.statusLabel}</span>
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#6b7280]">
              {detail.clientName}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex h-[38px] items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 text-[13px] font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb]"
            >
              <FiPrinter size={15} className="text-[#4b5563]" />
              <span>طباعة ملخص</span>
            </button>

            <Link
              href="/accounts/PaymentReview"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  handleBack();
                }
              }}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white px-4 text-[13px] font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb]"
            >
              <FiArrowLeft size={14} className="text-[#4b5563]" />
              <span>الرجوع</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          2. الشبكة الرئيسية: تفاصيل المعاملة والسجل (يمين) + إثبات الدفع (يسار)
      ============================================================ */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <section className="rounded-[22px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="mb-5 flex items-center justify-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f4ea] text-[#16a34a]">
                <FiCheck size={14} strokeWidth={2.5} />
              </span>
              <h2 className="text-[15px] font-bold text-[#1f2937]">
                تفاصيل المعاملة
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-5 sm:grid-cols-4">
              <div className="space-y-1">
                <p className="text-[11.5px] font-medium text-[#6b7280]">
                  تاريخ العملية
                </p>
                <p
                  dir="ltr"
                  className="text-right text-[13.5px] font-bold text-[#1f2937]"
                >
                  {detail.transactionDate}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11.5px] font-medium text-[#6b7280]">
                  قيمة الدفعة
                </p>
                <p
                  dir="ltr"
                  className="text-right text-[13.5px] font-extrabold text-[#1b7398]"
                >
                  {detail.amount}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11.5px] font-medium text-[#6b7280]">
                  رقم الفاتورة
                </p>
                <p
                  dir="ltr"
                  className="text-right text-[13.5px] font-bold text-[#1b7398] underline decoration-[#1b7398]/40 underline-offset-4"
                >
                  {detail.invoiceNumber}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11.5px] font-medium text-[#6b7280]">
                  طريقة الدفع
                </p>
                <div className="flex items-center justify-start gap-1.5 text-[13.5px] font-bold text-[#1f2937]">
                  <HiOutlineBuildingLibrary
                    size={16}
                    className="shrink-0 text-[#4b5563]"
                  />
                  <span>{detail.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="mt-1 space-y-1 pb-5">
              <p className="text-[11.5px] font-medium text-[#6b7280]">
                المشروع / الخدمة
              </p>
              <p className="text-[13.5px] font-bold text-[#1f2937]">
                {detail.serviceName}
              </p>
            </div>

            {/* ملاحظة المبيعات — بدون بوردر يمين ومع توزيع مرن للسطور */}
            <div className="flex flex-col gap-2">
              <p className="text-[11.5px] font-semibold text-[#6b7280]">
                ملاحظة المبيعات
              </p>
              <div className="flex w-full rounded-xl border-r-4 border-[#2578A2] bg-[#f3f5f7] px-4 py-3.5">
                <p className="min-w-0 flex-1 whitespace-pre-line break-words text-[13px] font-medium leading-[23px] text-[#374151]">
                  &ldquo;
                  {detail.salesNote || "لا توجد ملاحظات مسجلة من المبيعات."}
                  &rdquo;
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[22px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="mb-4 flex items-center justify-start gap-2">
              <FiFileText size={16} className="text-[#1b7398]" />
              <h2
                dir="ltr"
                className="text-[14.5px] font-bold text-[#1f2937]"
              >
                سجل النشاط (Audit Trail)
              </h2>
            </div>

            <div className="space-y-3.5">
              {detail.auditTrail.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: item.dotColor || "#1b7398" }}
                    />
                    <div className="space-y-0.5">
                      <p className="text-[13px] font-semibold text-[#1f2937]">
                        {item.text}
                      </p>
                      <p
                        dir="ltr"
                        className="text-right text-[11px] text-[#9ca3af]"
                      >
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <section className="flex h-full flex-col rounded-[22px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FiFileText size={16} className="text-[#1b7398]" />
                <h2 className="text-[14.5px] font-bold text-[#1f2937]">
                  إثبات الدفع (قسيمة الإيداع)
                </h2>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="تكبير المرفق"
                  onClick={() => setZoomed(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#f3f4f6]"
                >
                  <FiZoomIn size={16} />
                </button>

                <a
                  href={detail.proofUrl}
                  download
                  aria-label="تحميل المرفق"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4b5563] transition-colors hover:bg-[#f3f4f6]"
                >
                  <FiDownload size={16} />
                </a>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#eef1f4] p-4">
              {detail.proofType === "file" ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <FiFileText size={44} className="text-[#1b7398]" />
                  <p className="text-[13.5px] font-bold text-[#1f2937]">
                    {detail.proofTitle || "مستند إثبات الدفع"}
                  </p>
                  <a
                    href={detail.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 rounded-lg bg-[#1b7398] px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-[#165e7d]"
                  >
                    فتح الملف
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setZoomed(true)}
                  className="group relative w-full overflow-hidden rounded-xl focus:outline-none"
                >
                  <img
                    src={detail.proofUrl}
                    alt={detail.proofTitle || "إثبات الدفع"}
                    className="max-h-[380px] w-full rounded-xl object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                  />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ============================================================
          3. الشريط السفلي: ملاحظة المحاسب + سبب الرفض + أزرار القرار
      ============================================================ */}
      {isPending ? (
        <section className="rounded-[22px] bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
            <div className="space-y-1.5 lg:col-span-5">
              <label
                htmlFor="accountant-note"
                className="block text-[12px] font-semibold text-[#374151]"
              >
                ملاحظة المحاسب الداخلية
              </label>
              <input
                id="accountant-note"
                type="text"
                value={accountantNote}
                onChange={(e) => setAccountantNote(e.target.value)}
                placeholder="أضف أي ملاحظات إدارية هنا..."
                className="h-[40px] w-full rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[13px] text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#1b7398] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 lg:col-span-4">
              <label
                htmlFor="rejection-reason"
                className="block text-[12px] font-semibold text-[#374151]"
              >
                سبب الرفض (إلزامي في حال الرفض)
              </label>
              <input
                id="rejection-reason"
                type="text"
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  if (formError) setFormError("");
                }}
                placeholder="اذكر سبب الرفض بالتفصيل للرجوع إليه..."
                className={cx(
                  "h-[40px] w-full rounded-xl border bg-white px-3.5 text-[13px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none",
                  formError
                    ? "border-[#dc2626] focus:border-[#dc2626]"
                    : "border-[#e5e7eb] focus:border-[#1b7398]"
                )}
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 lg:col-span-3">
              <button
                type="button"
                onClick={handleReject}
                className="inline-flex h-[40px] items-center justify-center gap-1.5 rounded-xl border border-[#fecaca] bg-[#fff5f5] px-4 text-[13px] font-bold text-[#dc2626] transition-colors hover:bg-[#fee2e2]"
              >
                <FiX size={15} strokeWidth={2.5} />
                <span>رفض مع السبب</span>
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="inline-flex h-[40px] items-center justify-center gap-1.5 rounded-xl bg-[#1b7398] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#165e7d]"
              >
                <FiCheck size={15} strokeWidth={2.5} />
                <span>اعتماد الدفعة</span>
              </button>
            </div>
          </div>

          {formError && (
            <p className="mt-2.5 text-[12px] font-semibold text-[#dc2626]">
              {formError}
            </p>
          )}
        </section>
      ) : (
        <section className="rounded-[22px] bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <p className="text-[13px] font-medium text-[#6b7280]">
            {detail.status === "approved"
              ? "تم اعتماد هذه الدفعة — العرض للقراءة فقط."
              : "تم رفض هذه الدفعة — العرض للقراءة فقط."}
          </p>
        </section>
      )}

      {/* ============================================================
          4. نافذة مكبرة لإثبات الدفع عند الضغط على التكبير
      ============================================================ */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-2xl bg-white p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-[14px] font-bold text-[#1f2937]">
                {detail.proofTitle || "إثبات الدفع"}
              </span>
              <button
                type="button"
                aria-label="إغلاق"
                onClick={() => setZoomed(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <FiX size={18} />
              </button>
            </div>
            <img
              src={detail.proofUrl}
              alt={detail.proofTitle || "إثبات الدفع"}
              className="max-h-[75vh] w-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;