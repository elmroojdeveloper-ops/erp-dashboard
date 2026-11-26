"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  FiInfo,
  FiMapPin,
  FiCreditCard,
  FiPaperclip,
  FiUploadCloud,
  FiFileText,
  FiHelpCircle,
  FiActivity,
  FiArrowRight,
  FiEdit2,
  FiDownload,
  FiSlash,
  FiCopy,
  FiCheck,
  FiTrash2,
  FiUser,
  FiPhone,
  FiFile,
  FiDollarSign,
  FiChevronDown,
} from "react-icons/fi";
import { BsBarChartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

const defaultSuppliersMap = {
  "sup-1": {
    id: "sup-1",
    name: "شركة التقنية المتقدمة",
    status: "active",
    statusLabel: "نشط",
    basicInfo: {
      name: "شركة التقنية المتقدمة",
      phone: "+966 11 234 5678",
      vatNumber: "300123456700003",
      email: "contact@advancedtech.sa",
      website: "www.advancedtech.sa",
      currency: "ريال سعودي (SAR)",
      category: "تقنية معلومات",
      referenceCode: "AST-2024-001",
    },
    address: {
      street: "شارع العليا العام، حي العليا",
      buildingNumber: "3452",
      city: "الرياض",
      country: "المملكة العربية السعودية",
      branchBadge: "الفرع الرئيسي",
    },
    sales: {
      salesRepName: "سالم عبد الله",
      salesRepPhone: "+966 50 123 4567",
      paymentTerms: "صافي 30 يوم",
      defaultPaymentMethod: "تحويل بنكي",
    },
    accounting: {
      receivableAccount: "العملاء",
      receivableOptions: ["العملاء", "سلف الموردين", "ذمم مدينة أخرى"],
      payableAccount: "الموردين",
      payableOptions: ["الموردين", "الموردين - ذمم دائنة", "مستحقات توريد"],
      autoInvoiceProcessing: true,
    },
    notes: "",
    bankInfo: {
      bankName: "بنك الراجحي",
      accountName: "شركة التقنية المتقدمة لتقنية المعلومات",
      currency: "ريال سعودي (SAR)",
      email: "contact@advancedtech.sa",
      website: "www.advancedtech.sa",
      dealCurrency: "ريال سعودي (SAR)",
      iban: "SA45 8000 0000 1234 5678 9012",
      swiftCode: "RJHI SA RI",
    },
    financialSummary: {
      currentDue: "1,245,600",
      yearlyPurchases: "44,750.00",
      currency: "ر.س",
    },
    smartTip:
      "هناك فاتورة مستحقة بقيمة 12,500 ر.س خلال 30 يوم. يرجى مراجعة إدارة الحسابات لتجهيز الدفعة لتجنب التأخير.",
    activities: [
      {
        id: "act-1",
        title: "تم تسجيل فاتورة جديدة",
        time: "اليوم 10:30 صباحاً",
        tone: "primary",
      },
      {
        id: "act-2",
        title: "تم تعديل البيانات البنكية",
        time: "25 مايو 2024",
        tone: "muted",
      },
      {
        id: "act-3",
        title: "تم إضافة المورد للنظام",
        time: "12 يناير 2024",
        tone: "muted",
      },
    ],
    invoices: [
      {
        id: "inv-101",
        invoiceNumber: "#INV-2024-001",
        date: "15 مايو 2024",
        amount: "12,500",
        currency: "ر.س",
        dueDate: "2024/05/20",
        status: "due",
        statusLabel: "مستحقة",
      },
      {
        id: "inv-102",
        invoiceNumber: "#INV-2024-001",
        date: "02 أبريل 2024",
        amount: "4,250.00",
        currency: "",
        dueDate: "02 مايو 2024",
        status: "paid",
        statusLabel: "مدفوعة",
      },
      {
        id: "inv-103",
        invoiceNumber: "#INV-2024-001",
        date: "02 أبريل 2024",
        amount: "4,250.00",
        currency: "",
        dueDate: "02 مايو 2024",
        status: "paid",
        statusLabel: "مدفوعة",
      },
    ],
  },
};

const fallbackSupplier = {
  ...defaultSuppliersMap["sup-1"],
};

const Details = ({
  id,
  supplier: externalSupplier,
  onEdit,
  onDownloadPdf,
  onToggleStatus,
  onFilesDrop,
}) => {
    const router =useRouter()
  const fileInputRef = useRef(null);

  const initialSupplier = useMemo(() => {
    if (externalSupplier) return externalSupplier;
    if (id && defaultSuppliersMap[id]) return defaultSuppliersMap[id];
    return {
      ...fallbackSupplier,
      id: id || fallbackSupplier.id,
    };
  }, [id, externalSupplier]);

  const [supplier, setSupplier] = useState(initialSupplier);
  const [activeTab, setActiveTab] = useState("sales"); // "sales" | "accounting" | "notes"
  const [receivableAccount, setReceivableAccount] = useState(
    initialSupplier.accounting?.receivableAccount || "العملاء"
  );
  const [payableAccount, setPayableAccount] = useState(
    initialSupplier.accounting?.payableAccount || "الموردين"
  );
  const [autoInvoiceProcessing, setAutoInvoiceProcessing] = useState(
    Boolean(initialSupplier.accounting?.autoInvoiceProcessing ?? true)
  );
  const [notesValue, setNotesValue] = useState(initialSupplier.notes || "");
  const [invoiceFilter, setInvoiceFilter] = useState("all"); // "all" | "due" | "paid"
  const [copiedIban, setCopiedIban] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [attachments, setAttachments] = useState([
    {
      id: "att-1",
      name: "invoice_001.pdf",
      sizeLabel: "1.2 MB",
    },
  ]);

  const isActive = supplier.status === "active";

  const receivableOptions = useMemo(() => {
    const base = supplier.accounting?.receivableOptions || [
      "العملاء",
      "سلف الموردين",
      "ذمم مدينة أخرى",
    ];
    return base.includes(receivableAccount)
      ? base
      : [receivableAccount, ...base];
  }, [supplier.accounting?.receivableOptions, receivableAccount]);

  const payableOptions = useMemo(() => {
    const base = supplier.accounting?.payableOptions || [
      "الموردين",
      "الموردين - ذمم دائنة",
      "مستحقات توريد",
    ];
    return base.includes(payableAccount)
      ? base
      : [payableAccount, ...base];
  }, [supplier.accounting?.payableOptions, payableAccount]);

  const filteredInvoices = useMemo(() => {
    if (invoiceFilter === "all") return supplier.invoices || [];
    return (supplier.invoices || []).filter(
      (inv) => inv.status === invoiceFilter
    );
  }, [supplier.invoices, invoiceFilter]);

  const handleCopyIban = async () => {
    const ibanValue = supplier.bankInfo?.iban || "";
    if (!ibanValue) return;
    try {
      await navigator.clipboard.writeText(ibanValue);
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 1800);
    } catch {
      setCopiedIban(false);
    }
  };

  const handleToggleActive = () => {
    const nextStatus = isActive ? "inactive" : "active";
    const nextLabel = nextStatus === "active" ? "نشط" : "غير نشط";
    setSupplier((prev) => ({
      ...prev,
      status: nextStatus,
      statusLabel: nextLabel,
    }));
    onToggleStatus?.({ ...supplier, status: nextStatus, statusLabel: nextLabel });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFilesSelected = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const validFiles = Array.from(fileList).filter(
      (file) => file.size <= 10 * 1024 * 1024
    );
    if (validFiles.length === 0) return;

    const mapped = validFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
    }));
    setAttachments((prev) => [...prev, ...mapped]);
    onFilesDrop?.(validFiles);
  };

  const handleRemoveAttachment = (fileId) => {
    setAttachments((prev) => prev.filter((item) => item.id !== fileId));
  };

  const sectionCardClass =
    "rounded-[22px] border border-[#e6ecf2] bg-white p-6";

  const sectionTitleRowClass = "mb-5 flex items-center justify-start gap-2";

  const fieldLabelClass = "text-right text-[12px] font-bold text-[#64748b]";

  const fieldValueClass =
    "mt-1.5 text-right text-[13px] font-bold text-[#475569]";

  const tabItems = [
    { id: "sales", label: "المبيعات والمشتريات" },
    { id: "accounting", label: "الربط المحاسبي" },
    { id: "notes", label: "ملاحظات" },
  ];

  return (
    <div
      dir="rtl"
      className="space-y-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#e6ecf2] bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-extrabold ${
              isActive
                ? "bg-[#eef6f9] text-[#086382]"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-[#086382]" : "bg-[#94a3b8]"
              }`}
            />
            <span>{supplier.statusLabel}</span>
          </span>

          <h1 className="text-[22px] font-black leading-tight text-[#086382]">
            {supplier.name}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onEdit?.(supplier)}
            className="inline-flex h-[36px] items-center gap-1.5 rounded-[10px] bg-[#086382] px-4 text-[12px] font-extrabold text-white transition hover:bg-[#064e66]"
          >
            <FiEdit2 className="h-3.5 w-3.5" />
            <span>تعديل</span>
          </button>

          <button
            type="button"
            onClick={() => onDownloadPdf?.(supplier)}
            className="inline-flex h-[36px] items-center gap-1.5 rounded-[10px] border border-[#cbd5e1] bg-white px-3.5 text-[12px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
          >
            <FiDownload className="h-3.5 w-3.5 text-[#086382]" />
            <span>تحميل PDF</span>
          </button>

          <button
            type="button"
            onClick={handleToggleActive}
            className="inline-flex h-[36px] items-center gap-1.5 rounded-[10px] border border-[#fecaca] bg-[#fff5f5] px-3.5 text-[12px] font-extrabold text-[#dc2626] transition hover:bg-[#fee2e2]"
          >
            <FiSlash className="h-3.5 w-3.5" />
            <span>{isActive ? "إلغاء التفعيل" : "تفعيل المورد"}</span>
          </button>

          <button
            type="button"
      onClick={()=>{
                router.back()
            }}        
                className="mr-1 inline-flex items-center gap-1 text-[12px] font-extrabold text-[#086382] transition hover:underline"
          >
            <span>الرجوع</span>
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        {/* Right Column (8 cols) */}
        <div className="space-y-5 lg:col-span-8">
          {/* 1. معلومات أساسية */}
          <section className={sectionCardClass}>
            <div className={sectionTitleRowClass}>
              <FiInfo className="h-[18px] w-[18px] text-[#086382]" />
              <h2 className="text-[16px] font-black text-[#4D5461]">
                معلومات أساسية
              </h2>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-[#eef2f6] pb-5 sm:grid-cols-3">
              <div>
                <div className={fieldLabelClass}>اسم المورد</div>
                <div
                  className={`${fieldValueClass} font-extrabold text-[#334155]`}
                >
                  {supplier.basicInfo?.name}
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>رقم الهاتف</div>
                <div className={`${fieldValueClass} tabular-nums`}>
                  {supplier.basicInfo?.phone}
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>الرقم الضريبي (VAT)</div>
                <div className={`${fieldValueClass} tabular-nums`}>
                  {supplier.basicInfo?.vatNumber}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-[#eef2f6] py-5 sm:grid-cols-3">
              <div>
                <div className={fieldLabelClass}>البريد الإلكتروني</div>
                <div className={fieldValueClass}>{supplier.basicInfo?.email}</div>
              </div>

              <div>
                <div className={fieldLabelClass}>الموقع الإلكتروني</div>
                <div className={fieldValueClass}>
                  {supplier.basicInfo?.website}
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>عملة التعامل</div>
                <div
                  className={`${fieldValueClass} font-extrabold text-[#334155]`}
                >
                  {supplier.basicInfo?.currency}
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 pt-5 sm:grid-cols-3">
              <div>
                <div className={fieldLabelClass}>التصنيف</div>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-[#eef2f6] px-3.5 py-1 text-[11.5px] font-extrabold text-[#475569]">
                    {supplier.basicInfo?.category}
                  </span>
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>الرقم المرجعي</div>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-[#eef2f6] px-3.5 py-1 text-[11.5px] font-extrabold text-[#475569] tabular-nums">
                    {supplier.basicInfo?.referenceCode}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block" />
            </div>
          </section>

          {/* 2. العنوان والتواجد */}
          <section className={sectionCardClass}>
            <div className={sectionTitleRowClass}>
              <FiMapPin className="h-[18px] w-[18px] text-[#086382]" />
              <h2 className="text-[16px] font-black text-[#4D5461]">
                العنوان والتواجد
              </h2>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-[#eef2f6] pb-4">
                  <div>
                    <div className={fieldLabelClass}>الشارع</div>
                    <div
                      className={`${fieldValueClass} font-extrabold text-[#334155]`}
                    >
                      {supplier.address?.street}
                    </div>
                  </div>

                  <div>
                    <div className={fieldLabelClass}>رقم المبنى</div>
                    <div className={`${fieldValueClass} tabular-nums`}>
                      {supplier.address?.buildingNumber}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4">
                  <div>
                    <div className={fieldLabelClass}>المدينة</div>
                    <div
                      className={`${fieldValueClass} font-extrabold text-[#334155]`}
                    >
                      {supplier.address?.city}
                    </div>
                  </div>

                  <div>
                    <div className={fieldLabelClass}>الدولة</div>
                    <div
                      className={`${fieldValueClass} font-extrabold text-[#334155]`}
                    >
                      {supplier.address?.country}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5">
                <div
                  className="relative flex h-[142px] w-full flex-col justify-between overflow-hidden rounded-[16px] border border-[#dbe3ea] p-3"
                  style={{
                    background:
                      "linear-gradient(145deg, #e2e8f0 0%, #f1f5f9 48%, #cbd5e1 100%)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    <div
                      className="h-full w-full opacity-55"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #ffffff 2px, transparent 2px), linear-gradient(to bottom, #ffffff 2px, transparent 2px)",
                        backgroundSize: "34px 28px",
                      }}
                    />
                    <span className="absolute right-3 top-2.5 rounded bg-white/80 px-1.5 py-0.5 text-[9px] font-bold text-[#64748b]">
                      حي الملك سلمان
                    </span>
                    <span className="absolute left-3 top-3 rounded bg-[#dbeafe]/90 px-1.5 py-0.5 text-[9px] font-extrabold text-[#1d4ed8]">
                      WEMART HYPERMARKET
                    </span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-tight">
                      <span className="block text-[12px] font-black text-[#1e293b]">
                        Riyadh
                      </span>
                      <span className="block text-[10px] font-bold text-[#475569]">
                        الرياض
                      </span>
                    </span>
                  </div>

                  <div />

                  <div className="relative z-10 flex items-center justify-end">
                    <span
                      className="inline-flex items-center gap-2 rounded-[10px] px-3.5 py-1.5 text-[11.5px] font-extrabold text-white shadow-sm"
                      style={{
                        background:
                          "linear-gradient(90deg, #0b5c78 0%, #137a9e 100%)",
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                      <span>
                        {supplier.address?.branchBadge || "الفرع الرئيسي"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. التبويبات الثلاثة */}
          <section className={sectionCardClass}>
            {/* Tab Bar */}
            <div className="mb-6 flex items-center justify-start gap-2 rounded-[16px] bg-[#eaf2f6] px-4 pt-2">
              {tabItems.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 pb-3 pt-1.5 text-[13px] transition ${
                      isSelected
                        ? "border-b-[3px] border-[#197799] font-black text-[#197799]"
                        : "border-b-[3px] border-transparent font-bold text-[#475569] hover:text-[#197799]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: المبيعات والمشتريات */}
            {activeTab === "sales" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-[#eef2f6] pb-4 sm:grid-cols-2">
                  <div>
                    <div className={fieldLabelClass}>
                      مندوب المبيعات (جهة المورد)
                    </div>
                    <div className="mt-2 flex items-center justify-start gap-3 rounded-[12px] bg-[#f8fafc] px-3.5 py-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#086382] text-white">
                        <FiUser className="h-4 w-4" />
                      </div>
                      <div className="text-right">
                        <div className="text-[12.5px] font-black text-[#0f172a]">
                          {supplier.sales?.salesRepName}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-[#64748b] tabular-nums">
                          <FiPhone className="h-3 w-3" />
                          <span>{supplier.sales?.salesRepPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={fieldLabelClass}>شروط الدفع</div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#cbd5e1] bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#1e293b]">
                        <FiFile className="h-3.5 w-3.5 text-[#086382]" />
                        <span>{supplier.sales?.paymentTerms}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <div className={fieldLabelClass}>طريقة الدفع الافتراضية</div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[13px] font-extrabold text-[#334155]">
                    <FiDollarSign className="h-4 w-4 text-[#086382]" />
                    <span>{supplier.sales?.defaultPaymentMethod}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: الربط المحاسبي */}
            {activeTab === "accounting" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  {/* حساب مدين (R/A) */}
                  <div>
                    <label
                      htmlFor="receivable-account-select"
                      className="block text-right text-[12.5px] font-bold text-[#475569]"
                    >
                      حساب مدين (R/A)
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="receivable-account-select"
                        value={receivableAccount}
                        onChange={(e) => setReceivableAccount(e.target.value)}
                        className="h-[42px] w-full appearance-none rounded-[12px] border border-[#cbd5e1] bg-white pr-4 pl-10 text-right text-[13px] font-bold text-[#64748b] outline-none transition focus:border-[#197799]"
                      >
                        {receivableOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                  </div>

                  {/* حساب دائن (A/P) */}
                  <div>
                    <label
                      htmlFor="payable-account-select"
                      className="block text-right text-[12.5px] font-bold text-[#475569]"
                    >
                      حساب دائن (A/P)
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="payable-account-select"
                        value={payableAccount}
                        onChange={(e) => setPayableAccount(e.target.value)}
                        className="h-[42px] w-full appearance-none rounded-[12px] border border-[#cbd5e1] bg-white pr-4 pl-10 text-right text-[13px] font-bold text-[#64748b] outline-none transition focus:border-[#197799]"
                      >
                        {payableOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    </div>
                  </div>
                </div>

                {/* المعالجة التلقائية للفواتير */}
                <div className="flex items-center justify-between gap-4 rounded-[12px] border-r-[4px] border-[#197799] bg-[#eaf2f6] px-5 py-4">
                  <div className="text-right">
                    <div className="text-[14px] font-black text-[#197799]">
                      المعالجة التلقائية للفواتير
                    </div>
                    <p className="mt-1 text-[12px] font-bold text-[#475569]">
                      تفعيل استخراج البيانات التبقائي للفواتير المرفقه من هذا
                      المورد
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoInvoiceProcessing}
                    aria-label="المعالجة التلقائية للفواتير"
                    onClick={() => setAutoInvoiceProcessing((prev) => !prev)}
                    className={`relative inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                      autoInvoiceProcessing ? "bg-[#197799]" : "bg-[#cbd5e1]"
                    }`}
                  >
                    <span
                      className={`inline-block h-[22px] w-[22px] rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        autoInvoiceProcessing
                          ? "-translate-x-[25px]"
                          : "-translate-x-[3px]"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: ملاحظات */}
            {activeTab === "notes" && (
              <div>
                <label
                  htmlFor="internal-notes-textarea"
                  className="block text-right text-[12.5px] font-bold text-[#475569]"
                >
                  ملاحظات داخليه
                </label>
                <textarea
                  id="internal-notes-textarea"
                  rows={4}
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  placeholder="أضف أي ملاحظات خاصة بالتعامل مع هذا المندوب....."
                  className="mt-2.5 min-h-[118px] w-full resize-y rounded-[14px] border border-[#cbd5e1] bg-white p-4 text-right text-[13px] font-semibold text-[#334155] placeholder-[#94a3b8] outline-none transition focus:border-[#197799]"
                />
              </div>
            )}
          </section>

          {/* 4. البيانات البنكية */}
          <section className={sectionCardClass}>
            <div className={sectionTitleRowClass}>
              <FiCreditCard className="h-[18px] w-[18px] text-[#086382]" />
              <h2 className="text-[16px] font-black text-[#086382]">
                البيانات البنكية
              </h2>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-[#eef2f6] pb-5 sm:grid-cols-3">
              <div>
                <div className={fieldLabelClass}>اسم البنك</div>
                <div
                  className={`${fieldValueClass} font-extrabold text-[#334155]`}
                >
                  {supplier.bankInfo?.bankName}
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>اسم الحساب</div>
                <div
                  className={`${fieldValueClass} font-extrabold text-[#334155]`}
                >
                  {supplier.bankInfo?.accountName}
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>العملة</div>
                <div className={fieldValueClass}>{supplier.bankInfo?.currency}</div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-[#eef2f6] py-5 sm:grid-cols-3">
              <div>
                <div className={fieldLabelClass}>البريد الإلكتروني</div>
                <div className={fieldValueClass}>{supplier.bankInfo?.email}</div>
              </div>

              <div>
                <div className={fieldLabelClass}>الموقع الإلكتروني</div>
                <div className={fieldValueClass}>{supplier.bankInfo?.website}</div>
              </div>

              <div>
                <div className={fieldLabelClass}>عملة التعامل</div>
                <div
                  className={`${fieldValueClass} font-extrabold text-[#334155]`}
                >
                  {supplier.bankInfo?.dealCurrency}
                </div>
              </div>
            </div>

            {/* Row 3: IBAN & SWIFT */}
            <div className="space-y-4 pt-5">
              <div>
                <div className={fieldLabelClass}>IBAN</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyIban}
                    aria-label="نسخ رقم IBAN"
                    title="نسخ IBAN"
                    className="inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-white text-[#64748b] transition hover:border-[#086382] hover:text-[#086382]"
                  >
                    {copiedIban ? (
                      <FiCheck className="h-4 w-4 text-[#047857]" />
                    ) : (
                      <FiCopy className="h-4 w-4" />
                    )}
                  </button>

                  <div className="flex h-[36px] flex-1 items-center justify-end rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-3.5 text-[12.5px] font-bold text-[#475569] tabular-nums">
                    {supplier.bankInfo?.iban}
                  </div>
                </div>
              </div>

              <div>
                <div className={fieldLabelClass}>SWIFT Code</div>
                <div className={`${fieldValueClass} tabular-nums`}>
                  {supplier.bankInfo?.swiftCode}
                </div>
              </div>
            </div>
          </section>

          {/* 5. سجل الفواتير الأخيرة */}
          <section className={sectionCardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BsBarChartFill className="h-4 w-4 text-[#086382]" />
                <h2 className="text-[16px] font-black text-[#086382]">
                  سجل الفواتير الأخيرة
                </h2>
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-[#f1f5f9] p-1 text-[11.5px] font-bold">
                <button
                  type="button"
                  onClick={() => setInvoiceFilter("all")}
                  className={`rounded-full px-3 py-1 transition ${
                    invoiceFilter === "all"
                      ? "bg-[#086382] text-white"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  الكل
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceFilter("due")}
                  className={`rounded-full px-3 py-1 transition ${
                    invoiceFilter === "due"
                      ? "bg-[#086382] text-white"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  مستحقة
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceFilter("paid")}
                  className={`rounded-full px-3 py-1 transition ${
                    invoiceFilter === "paid"
                      ? "bg-[#086382] text-white"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  مدفوعة
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-right">
                <thead>
                  <tr className="border-b border-[#eef2f6] text-[12px] font-bold text-[#64748b]">
                    <th className="py-2.5 pr-2 font-bold">رقم الفاتورة</th>
                    <th className="px-3 py-2.5 font-bold">التاريخ</th>
                    <th className="px-3 py-2.5 font-bold">المبلغ</th>
                    <th className="px-3 py-2.5 font-bold">تاريخ الاستحقاق</th>
                    <th className="py-2.5 pl-2 text-center font-bold">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9] text-[12.5px]">
                  {filteredInvoices.map((inv) => {
                    const isDue = inv.status === "due";
                    return (
                      <tr key={inv.id} className="transition hover:bg-[#fafcfd]">
                        <td className="py-3 pr-2 font-extrabold text-[#334155] tabular-nums">
                          {inv.invoiceNumber}
                        </td>
                        <td className="px-3 py-3 font-semibold text-[#64748b]">
                          {inv.date}
                        </td>
                        <td className="px-3 py-3 font-black text-[#0f172a] tabular-nums">
                          {inv.amount}{" "}
                          {inv.currency && (
                            <span className="text-[11px] font-bold text-[#64748b]">
                              {inv.currency}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 font-semibold text-[#64748b] tabular-nums">
                          {inv.dueDate}
                        </td>
                        <td className="py-3 pl-2 text-center">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-extrabold ${
                              isDue
                                ? "bg-[#fee2e2] text-[#dc2626]"
                                : "bg-[#dcfce7] text-[#15803d]"
                            }`}
                          >
                            {inv.statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Left Column (4 cols) */}
        <div className="space-y-5 lg:col-span-4">
          {/* المرفقات */}
          <section className="rounded-[22px] border border-[#e6ecf2] bg-white p-5">
            <div className="mb-4 flex items-center justify-start gap-2">
              <FiPaperclip className="h-[18px] w-[18px] text-[#086382]" />
              <h2 className="text-[16px] font-black text-[#475569]">
                المرفقات
              </h2>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesSelected(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center rounded-[16px] border border-dashed px-4 py-6 text-center transition ${
                isDragging
                  ? "border-[#086382] bg-[#f0f8fc]"
                  : "border-[#cbd5e1] bg-[#fafcfd]"
              }`}
            >
              <FiUploadCloud className="h-7 w-7 text-[#94a3b8]" />
              <div className="mt-2.5 text-[12.5px] font-extrabold text-[#086382]">
                اسحب الملفات هنا
              </div>
              <p className="mt-1 text-[11px] font-semibold leading-relaxed text-[#64748b]">
                عقود، مستندات ضريبية، أو ملفات تعريفية (Max 10MB)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => handleFilesSelected(e.target.files)}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3.5 rounded-[10px] border border-[#cbd5e1] bg-white px-4 py-1.5 text-[11.5px] font-bold text-[#334155] transition hover:border-[#086382] hover:text-[#086382]"
              >
                تصفح الجهاز
              </button>
            </div>

            {attachments.length > 0 && (
              <div className="mt-3.5 space-y-2">
                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between gap-2 rounded-[14px] bg-[#f1f6f9] px-3.5 py-2.5"
                  >
                    <div className="flex min-w-0 flex-1 items-center justify-start gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#fee2e2] text-[#dc2626]">
                        <FiFileText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 text-right">
                        <div className="truncate text-[12px] font-extrabold text-[#1e293b]">
                          {file.name}
                        </div>
                        <div className="text-[10.5px] font-bold text-[#64748b]">
                          {file.sizeLabel}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(file.id)}
                      aria-label={`حذف ${file.name}`}
                      className="text-[#94a3b8] transition hover:text-[#dc2626]"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* تلميحات ذكية */}
          <section
            className="relative overflow-hidden rounded-[22px] p-5 text-white shadow-[0_10px_24px_-6px_rgba(8,99,130,0.32)]"
            style={{
              background:
                "linear-gradient(135deg, #1b80a6 0%, #106c8e 55%, #0a526d 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/[0.11]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/[0.08]"
            />

            <div className="relative z-10 mb-3 flex items-center justify-start gap-2">
              <FiHelpCircle className="h-[18px] w-[18px] text-white/95" />
              <h2 className="text-[15px] font-black text-white">
                تلميحات ذكية
              </h2>
            </div>

            <p className="relative z-10 text-right text-[12.5px] font-bold leading-[1.7] text-white/95">
              {supplier.smartTip}
            </p>
          </section>

          {/* سجل النشاط */}
          <section className="rounded-[22px] border border-[#e6ecf2] bg-white p-5">
            <div className="mb-4 flex items-center justify-start gap-2">
              <FiActivity className="h-4 w-4 text-[#086382]" />
              <h2 className="text-[15px] font-black text-[#086382]">
                سجل النشاط
              </h2>
            </div>

            <div className="space-y-3.5">
              {(supplier.activities || []).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      act.tone === "primary" ? "bg-[#086382]" : "bg-[#cbd5e1]"
                    }`}
                  />
                  <div className="text-right">
                    <div
                      className={`text-[12px] font-extrabold ${
                        act.tone === "primary"
                          ? "text-[#086382]"
                          : "text-[#334155]"
                      }`}
                    >
                      {act.title}
                    </div>
                    <div className="mt-0.5 text-[10.5px] font-semibold text-[#64748b]">
                      {act.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ملخص مالي */}
          <section
            className="relative overflow-hidden rounded-[22px] p-5 text-white"
            style={{
              background:
                "linear-gradient(135deg, #167ca1 0%, #0d6686 60%, #094f68 100%)",
            }}
          >
            <div className="relative z-10 mb-4 text-right text-[15px] font-black text-white">
              ملخص مالي
            </div>

            <div className="relative z-10 mb-4">
              <div className="text-[11px] font-bold text-white/85">
                الرصيد المستحق حالياً
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 tabular-nums">
                <span className="text-[26px] font-black leading-none text-[#fb7185]">
                  {supplier.financialSummary?.currentDue}
                </span>
                <span className="text-[11.5px] font-bold text-white/90">
                  {supplier.financialSummary?.currency}
                </span>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/15 pt-3.5">
              <div className="text-[11px] font-bold text-white/85">
                إجمالي المشتريات لهذا العام
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 tabular-nums">
                <span className="text-[18px] font-black text-white">
                  {supplier.financialSummary?.yearlyPurchases}
                </span>
                <span className="text-[11px] font-bold text-white/85">
                  {supplier.financialSummary?.currency}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-1.5">
                <div className="h-7 rounded-[4px] bg-white/35" />
                <div className="h-4.5 self-end rounded-[4px] bg-white/20" />
                <div className="h-2.5 self-end rounded-[4px] bg-white/15" />
                <div className="h-3.5 self-end rounded-[4px] bg-white/15" />
                <div className="h-2 self-end rounded-[4px] bg-white/15" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Details;