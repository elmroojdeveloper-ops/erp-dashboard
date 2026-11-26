"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiBell,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiClock,
  FiFileText,
  FiHash,
  FiInfo,
  FiList,
  FiLock,
  FiPieChart,
  FiRefreshCw,
  FiRotateCcw,
  FiSave,
  FiSend,
  FiShield,
  FiShoppingBag,
  FiSlash,
} from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LuCheckCheck, LuClipboardList, LuScale } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";

/* ------------------------------- data ------------------------------- */

const standardTerms = `1. يجب ذكر رقم أمر الشراء في كافة الفواتير وبوالص الشحن وسندات التسليم.
2. لا يعتبر أمر الشراء ملزماً للشركة مالياً إلا بعد توقيعه إلكترونياً واعتماده رسمياً عبر النظام السيادي.
3. تحتفظ الشركة بحق رفض أية توريدات مخالفة للمواصفات الفنية المعتمدة وإعادتها على نفقة المورد.`;

const cycleUnits = [
  {
    id: "pr",
    label: "طلبات الشراء",
    note: "",
    href: "/accounts/Purches",
    Icon: FiFileText,
  },
  {
    id: "quotes",
    label: "عروض الأسعار",
    note: "الحد الأدنى للمقارنة",
    href: "/accounts/Purches/vendor-quotes",
    Icon: LuScale,
  },
  {
    id: "po",
    label: "أوامر الشراء",
    note: "الترقيم، الصلاحيات والاعتماد",
    href: "/accounts/Purches/settings",
    active: true,
    Icon: FiShoppingBag,
  },
  {
    id: "match",
    label: "المطابقة وفواتير الشراء",
    note: "إلزامية المطابقة الثلاثية",
    href: "/accounts/Purches/invoices",
    Icon: MdOutlineReceiptLong,
  },
  {
    id: "vendors",
    label: "الموردين وبوابة الشركاء",
    note: "",
    href: "#",
    Icon: HiOutlineBuildingStorefront,
  },
];

const budgetOptions = [
  {
    id: "warn",
    num: "01",
    title: "السماح مع تنبيه",
    body: "إصدار الأمر ومعالجته مع تسجيل تنبيه مراقبة أصفر في سجل مراجعة المحاسب.",
    foot: "مخاطرة تجاوز مالي منخفضة",
    FootIcon: FiAlertTriangle,
    footTone: "text-[#D97706]",
  },
  {
    id: "exceptional",
    num: "02",
    title: "يتطلب اعتماد استثنائي",
    body: "إيقاف الإصدار وتحويله مباشرة لاعتماد استثنائي من المدير المالي مع مذكرة مبرر إدارية.",
    foot: "توازن مثالي بين المرونة والرقابة",
    FootIcon: FiCheckCircle,
    footTone: "text-[#B45309]",
    recommended: true,
  },
  {
    id: "block",
    num: "03",
    title: "المنع التلقائي",
    body: "رفض حفظ أو اعتماد أمر الشراء حتى تعزيز الميزانية رسمياً بتحويل اعتمادات معتمدة.",
    foot: "انضباط مالي صارم وبدون مرونة",
    FootIcon: FiSlash,
    footTone: "text-[#DC2626]",
  },
];

const approvalCards = [
  {
    step: 1,
    title: "منشئ الأمر",
    role: "مسؤول المشتريات المكلف",
    roleTone: "text-[#64748B]",
    sla: "فوري",
    slaTone: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
    phase: "إعداد ومطابقة العروض",
    StatusIcon: FiCheckCircle,
    statusTone: "text-[#16A34A]",
    card: "border border-[#E2E8F0]",
    circle: "bg-primary",
  },
  {
    step: 2,
    title: "مدير إدارة المشتريات",
    role: "اعتماد مالي للجدوى والبنود",
    roleTone: "text-[#64748B]",
    sla: "24 ساعة",
    slaTone: "border-[#F3D98B] bg-[#FEF8E1] text-[#B45309]",
    phase: "تدقيق المواصفات والأسعار",
    StatusIcon: FiClock,
    statusTone: "text-[#EA580C]",
    card: "border border-[#E2E8F0]",
    circle: "bg-primary",
  },
  {
    step: 3,
    title: "المدير المالي / رئيس القطاع",
    role: "اعتماد مالي إلزامي فوق 10,000 ر.س",
    roleTone: "text-[#D97706]",
    sla: "48 ساعة",
    slaTone: "border-[#F5C2CB] bg-[#FDECEF] text-[#E11D48]",
    phase: "التحقق من الرصيد والسيولة",
    StatusIcon: FiLock,
    statusTone: "text-primary",
    card: "border-2 border-[#F59E0B]",
    circle: "bg-[#D97706]",
  },
];

/* ------------------------------- parts ------------------------------- */

const Toggle = ({ checked, onChange, ariaLabel }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
      checked ? "bg-primary" : "bg-[#CBD5E1]"
    }`}
  >
    <span
      className={`inline-block size-5 rounded-full bg-white shadow transition-[margin] ${
        checked ? "ms-auto" : ""
      }`}
    />
  </button>
);

const RowNote = ({ title, desc }) => (
  <div className="min-w-0">
    <p className="text-[12.5px] font-bold leading-5 text-[#0F172A]">{title}</p>
    <p className="mt-0.5 text-[11px] leading-5 text-[#64748B]">{desc}</p>
  </div>
);

const FieldLabel = ({ children }) => (
  <span className="text-[12.5px] font-bold leading-5 text-[#1E293B]">
    {children}
  </span>
);

const inputCls =
  "h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm text-[#1E293B] outline-none focus:border-primary focus:bg-white";

const CardShell = ({
  chip,
  chipTone = "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
  icon: Icon,
  iconBg,
  title,
  desc,
  children,
}) => (
  <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card sm:p-6">
    <div className="flex items-start justify-between gap-3 border-b border-[#EDF1F5] pb-[18px]">
      <div className="flex min-w-0 items-center gap-3.5">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold leading-6 text-[#0F172A]">
            {title}
          </h2>
          <p className="mt-0.5 text-[11.5px] leading-5 text-[#64748B]">
            {desc}
          </p>
        </div>
      </div>
      <span
        className={`inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-[11px] font-medium ${chipTone}`}
      >
        {chip}
      </span>
    </div>
    <div className="pt-6">{children}</div>
  </section>
);

/* ------------------------------- main ------------------------------- */

const Settings = () => {
  const [prefixFmt, setPrefixFmt] = useState("{ الرقم التسلسلي } - 2026");
  const [resetCycle, setResetCycle] = useState("annual");
  const [manualSeq, setManualSeq] = useState(true);
  const [approvalLimit, setApprovalLimit] = useState("10000");
  const [dualApproval, setDualApproval] = useState(true);
  const [budgetPolicy, setBudgetPolicy] = useState("exceptional");
  const [deliveryTerms, setDeliveryTerms] = useState(
    "7 أيام عمل من تاريخ استلام الأمر",
  );
  const [paymentTerms, setPaymentTerms] = useState(
    "30 يوم صافي (Net 30) بعد الفحص والاستلام",
  );
  const [termsText, setTermsText] = useState(standardTerms);
  const [n1, setN1] = useState(true);
  const [n2, setN2] = useState(true);
  const [n3, setN3] = useState(true);
  const [savedAt, setSavedAt] = useState(true);

  const previewId = useMemo(() => "PO-2026-00241", []);
  const limitFormatted = Number(approvalLimit || 0).toLocaleString("en-US");

  const handleSave = () => setSavedAt(true);
  const handleResetDefaults = () => {
    setPrefixFmt("{ الرقم التسلسلي } - 2026");
    setResetCycle("annual");
    setManualSeq(true);
    setApprovalLimit("10000");
    setDualApproval(true);
    setBudgetPolicy("exceptional");
    setDeliveryTerms("7 أيام عمل من تاريخ استلام الأمر");
    setPaymentTerms("30 يوم صافي (Net 30) بعد الفحص والاستلام");
    setTermsText(standardTerms);
    setN1(true);
    setN2(true);
    setN3(true);
  };

  const notifications = [
    {
      Icon: FiSend,
      box: "bg-[#E8F3FA] text-primary",
      title:
        "إرسال أمر الشراء للمورد تلقائياً عبر البريد الإلكتروني بعد الاعتماد المالي النهائي",
      desc: "يتم توليد وإرفاق نسخة PDF المعتمدة مشفرة بخاتم المنشأة الإلكتروني ورمز التحقق QR.",
      checked: n1,
      set: setN1,
    },
    {
      Icon: FiClock,
      box: "bg-[#FFFBEB] text-[#D97706]",
      title: "إشعار مدير المشتريات عند تأخر التوريد عن الموعد المحدد",
      desc: "إرسال تنبيه في لوحة التحكم والبريد الإلكتروني قبل 48 ساعة من تاريخ الاستحقاق التعاقدي.",
      checked: n2,
      set: setN2,
    },
    {
      Icon: LuClipboardList,
      box: "bg-[#E8F3FA] text-primary",
      title: "إشعار بطلبات الاعتماد المعلقة",
      desc: "تذكير دوري صباحي للمعتمدين بقائمة الأوامر المعلقة غير المصادق عليها عند الساعة 9:00 صباحاً.",
      checked: n3,
      set: setN3,
    },
  ];

  return (
    <div dir="rtl" className="flex flex-col gap-7 pb-4">
      {/* ============================ الهيدر ============================ */}
      <header className="flex flex-col gap-4 pb-2 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="text-2xl font-bold text-primary sm:text-[28px]">
              إدارة نظام المشتريات
            </h1>
            <span className="inline-flex h-7 items-center gap-2 rounded-full border border-[#86EFAC] bg-[#F0FDF4] px-3 text-[11.5px] font-bold text-[#15803D]">
              <span className="size-1.5 rounded-full bg-[#16A34A]" />
              ساري المفعول
            </span>
          </div>
          <p className="mt-1 text-[13.5px] leading-6 text-[#64748B]">
            تخصيص دورة المشتريات، سياسات الاعتماد، وقواعد المطابقة التلقائية
            لشركتك
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {savedAt ? (
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2 text-[12px] font-semibold text-[#15803D]">
              <FiCheckCircle className="size-4" />
              تم الحفظ تلقائياً قبل دقيقتين
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1B4D66] px-5 text-sm font-bold text-white shadow-card transition hover:bg-[#153a4f]"
          >
            <FiSave className="size-[18px]" />
            حفظ جميع الإعدادات
          </button>
        </div>
      </header>

      {/* ============================ المحتوى ============================ */}
      <div className="flex flex-col gap-[30px] xl:flex-row xl:items-start">
        {/* ---------------------------- الكروت ---------------------------- */}
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          {/* 1) الترقيم */}
          <CardShell
            chip="التهيئة الأساسية"
            icon={FiList}
            iconBg="bg-[#E8F3FA] text-primary"
            title="الترقيم التلقائي وسلاسل الأوامر"
            desc="تخصيص البادئة، تسلسل أرقام الأوامر ودوريات إعادة التصفير النظامية"
          >
            <div className="grid grid-cols-1 gap-[19px] lg:grid-cols-2">
              <label className="flex flex-col gap-2 text-start">
                <span className="flex items-center justify-between gap-2">
                  <FieldLabel>صيغة وبادئة الترقيم (Prefix)</FieldLabel>
                  <span className="text-[10px] font-medium text-primary">
                    يدعم المتغيرات الذكية
                  </span>
                </span>
                <div className="relative">
                  <input
                    value={prefixFmt}
                    onChange={(e) => {
                      setPrefixFmt(e.target.value);
                      setSavedAt(false);
                    }}
                    className={`${inputCls} pe-16 font-mono text-[12px]`}
                  />
                  <span className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-[10.5px] font-bold text-[#64748B]">
                    ثابت
                  </span>
                </div>
              </label>

              <label className="flex flex-col gap-2 text-start">
                <FieldLabel>دورية إعادة تصفير الترقيم</FieldLabel>
                <div className="relative">
                  <select
                    value={resetCycle}
                    onChange={(e) => {
                      setResetCycle(e.target.value);
                      setSavedAt(false);
                    }}
                    className={`${inputCls} appearance-none pe-9`}
                  >
                    <option value="annual">
                      سنوياً (مع بداية كل سنة مالية جديدة)
                    </option>
                    <option value="never">بدون تصفير</option>
                  </select>
                  <FiChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
                </div>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[#BBD9EA] bg-[#F8FCFF] px-4 py-3.5">
              <span className="text-[12.5px] font-medium text-[#475569]">
                معاينة الترقيم الحي:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11.5px] text-[#94A3B8]">
                  يبدأ السجل القادم عند 1 يناير 2027
                </span>
                <span className="rounded-md border border-[#BBD9EA] bg-[#E8F3FA] px-3.5 py-1.5 font-mono text-[12px] font-bold text-primary">
                  {previewId}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#D97706]">
                  <FiHash className="size-4" />
                </span>
                <RowNote
                  title="استخدام تسلسل منفصل للأوامر اليدوية (الاستثنائية)"
                  desc="توليد كود مميز (MPO-2026-XXXX) للأوامر الشراء التي لا تستند إلى طلبات عروض أسعار لتسهيل التدقيق والامتثال المالي."
                />
              </div>
              <Toggle
                checked={manualSeq}
                onChange={(v) => {
                  setManualSeq(v);
                  setSavedAt(false);
                }}
                ariaLabel="تسلسل منفصل للأوامر اليدوية"
              />
            </div>
          </CardShell>

          {/* 2) سقف الاعتماد */}
          <CardShell
            chip="مستوى الرقابة: صارم"
            chipTone="border-[#F3D98B] bg-[#FFFBEB] text-[#B45309]"
            icon={FiShield}
            iconBg="bg-[#FFFBEB] text-[#D97706]"
            title="سقف الاعتماد المالي وسلسلة الموافقات"
            desc="تحديد قواعد الحوكمة المالية وأدوار الصلاحيات المتعددة"
          >
            <div className="grid grid-cols-1 items-start gap-[19px] lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <FieldLabel>سقف الاعتماد المالي للاعتماد الفردي</FieldLabel>
                <div className="flex h-11 items-center justify-end gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 focus-within:border-primary focus-within:bg-white">
                  <input
                    type="text"
                    inputMode="numeric"
                    dir="ltr"
                    value={limitFormatted}
                    onChange={(e) =>
                      setApprovalLimit(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-24 bg-transparent text-start text-[13px] font-bold text-[#0F172A] outline-none"
                  />
                  <span className="rounded-md border border-[#E2E8F0] bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-medium text-[#64748B]">
                    ر.س
                  </span>
                </div>
                <p className="text-[10.5px] leading-4 text-[#94A3B8]">
                  الحد الأقصى المسموح لمسؤول المشتريات باعتماده دون مصادقة ثانية
                </p>
              </div>

              <div className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[#EEF2F6] bg-[#F8FAFC] px-4 py-3">
                <RowNote
                  title="تفعيل الاعتماد المزدوج للأوامر"
                  desc="إلزام توقيعين للمبالغ المرتفعة"
                />
                <Toggle
                  checked={dualApproval}
                  onChange={setDualApproval}
                  ariaLabel="الاعتماد المزدوج"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-[10px] border border-[#BAE6FD] bg-[#F0F9FF] px-[18px] py-3.5">
              <FiInfo className="size-4 shrink-0 text-primary" />
              <p className="text-[12px] leading-6 text-[#0369A1]">
                أوامر الشراء التي تتجاوز هذا المبلغ (
                <strong>{limitFormatted} ر.س</strong>) تتطلب اعتماداً إضافياً
                من الإدارة المالية قبل الإصدار النهائي والإرسال للمورد الخارجي
              </p>
            </div>

            <p className="mb-3.5 mt-6 text-[12px] font-bold text-[#1E293B]">
              سلسلة الاعتماد والموافقات النظامية (Approval Chain)
            </p>
            <div className="grid grid-cols-1 gap-[15px] md:grid-cols-3">
              {approvalCards.map((c) => {
                const Status = c.StatusIcon;
                return (
                  <div
                    key={c.step}
                    className={`rounded-xl bg-white p-4 ${c.card}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`flex size-7 items-center justify-center rounded-full text-[13px] font-bold text-white ${c.circle}`}
                      >
                        {c.step}
                      </span>
                      <span
                        className={`rounded-md border px-2.5 py-1 font-mono text-[10.5px] ${c.slaTone}`}
                      >
                        SLA: {c.sla}
                      </span>
                    </div>

                    <p className="mt-3 text-[13.5px] font-bold leading-5 text-[#0F172A]">
                      {c.title}
                    </p>
                    <p className={`mt-1 text-[11px] leading-4 ${c.roleTone}`}>
                      {c.role}
                    </p>

                    <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-[#EEF2F6] pt-3.5">
                      <span className="text-[10.5px] leading-4 text-[#64748B]">
                        المرحلة: {c.phase}
                      </span>
                      <Status className={`size-3.5 shrink-0 ${c.statusTone}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardShell>

          {/* 3) سياسة الميزانية */}
          <CardShell
            chip="الرقابة على الميزانية"
            icon={FiPieChart}
            iconBg="bg-[#FDECEF] text-[#E11D48]"
            title="سياسة تجاوز ميزانية مركز التكلفة"
            desc="التحكم في الارتباط المالي عند نفاد المخصص السنوي للمركز"
          >
            <p className="mb-5 text-[12.5px] leading-6 text-[#334155]">
              حدد السلوك النظامي عند قيام مسؤول المشتريات بإصدار أمر شراء يتخطى
              الرصيد المتاح في ميزانية مركز التكلفة المرتبط:
            </p>
            <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-3">
              {budgetOptions.map((opt) => {
                const FootIcon = opt.FootIcon;
                const selected = budgetPolicy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBudgetPolicy(opt.id)}
                    className={`relative flex flex-col rounded-xl bg-white p-5 text-start transition ${
                      selected
                        ? "border border-[#F59E0B] shadow-[0_0_0_1px_#F59E0B]"
                        : "border border-[#E2E8F0] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {opt.recommended ? (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#D97706] px-3 py-[3px] text-[10px] font-bold leading-[14px] text-white">
                        الخيار الموصى به للمطابقة والحوكمة
                      </span>
                    ) : null}

                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`flex size-[18px] items-center justify-center rounded-full ${
                          selected
                            ? "border-2 border-[#D97706] bg-white"
                            : "border-[1.5px] border-[#CBD5E1] bg-white"
                        }`}
                      >
                        {selected ? (
                          <span className="size-2 rounded-full bg-[#D97706]" />
                        ) : null}
                      </span>
                      <span className="font-mono text-[11px] text-[#94A3B8]">
                        {opt.num}
                      </span>
                    </div>

                    <p className="mt-2.5 text-[13.5px] font-bold leading-5 text-[#0F172A]">
                      {opt.title}
                    </p>
                    <p className="mb-4 mt-2 text-[11px] leading-[19px] text-[#64748B]">
                      {opt.body}
                    </p>

                    <div
                      className={`mt-auto flex items-center gap-1.5 border-t border-[#EEF2F6] pt-3.5 text-[10.5px] font-bold ${opt.footTone}`}
                    >
                      <FootIcon className="size-3.5 shrink-0" />
                      {opt.foot}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardShell>

          {/* 4) الشروط والأحكام */}
          <CardShell
            chip="النماذج القياسية"
            icon={FiFileText}
            iconBg="bg-[#E8F3FA] text-primary"
            title="الشروط والأحكام الافتراضية"
            desc="البنود النظامية وجداول السداد المطبوعة على نماذج أوامر الشراء"
          >
            <div className="grid grid-cols-1 gap-[19px] sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <FieldLabel>مهلة التوريد والتسليم الافتراضية</FieldLabel>
                <div className="relative">
                  <input
                    value={deliveryTerms}
                    onChange={(e) => setDeliveryTerms(e.target.value)}
                    className={`${inputCls} pe-9`}
                  />
                  <FiChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <FieldLabel>شروط الدفع والائتمان الافتراضية</FieldLabel>
                <div className="relative">
                  <input
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className={`${inputCls} pe-9`}
                  />
                  <FiChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
                </div>
              </label>
            </div>
            <p className="mt-2.5 text-[10.5px] leading-4 text-[#94A3B8]">
              تطبق كقيمة أولية في كل أمر شراء جديد ويمكن تعديلها يدوياً حسب
              استحقاقات المدفوعات النقدية للإدارة المالية.
            </p>

            <div className="mt-5 flex items-center justify-between gap-2">
              <FieldLabel>
                ملاحظات وشروط تعاقدية افتراضية تظهر أسفل كل أمر شراء
              </FieldLabel>
              <button
                type="button"
                onClick={() => setTermsText(standardTerms)}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary"
              >
                <FiRefreshCw className="size-3.5" />
                استعادة النص القياسي
              </button>
            </div>
            <textarea
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              className="mt-3 h-[119px] w-full resize-y rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[11.5px] leading-[22px] text-[#475569] outline-none focus:border-primary"
            />
            <p className="mt-3 text-[10.5px] leading-4 text-[#94A3B8]">
              هذا النص سيظهر في تذييل ملف PDF الرسمي المرسل إلى الموردين
              والشركاء.
            </p>
          </CardShell>

          {/* 5) الإشعارات */}
          <CardShell
            chip="أتمتة النظام"
            icon={FiBell}
            iconBg="bg-[#E8F3FA] text-primary"
            title="الإشعارات والتنبيهات التلقائية"
            desc="قنوات الإشعار للموردين وفريق المشتريات ولجان المراجعة"
          >
            <ul className="flex flex-col gap-[15px]">
              {notifications.map((row) => {
                const Icon = row.Icon;
                return (
                  <li
                    key={row.title}
                    className="flex items-center justify-between gap-4 rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3.5"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span
                        className={`flex size-[38px] shrink-0 items-center justify-center rounded-lg ${row.box}`}
                      >
                        <Icon className="size-[18px]" />
                      </span>
                      <RowNote title={row.title} desc={row.desc} />
                    </div>
                    <Toggle
                      checked={row.checked}
                      onChange={row.set}
                      ariaLabel={row.title}
                    />
                  </li>
                );
              })}
            </ul>
          </CardShell>
        </div>

        {/* ---------------------------- السايدبار ---------------------------- */}
        <aside className="shrink-0 xl:w-[248px]">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-card">
            <p className="mb-3 px-1 text-[12px] font-bold text-[#64748B]">
              وحدات دورة المشتريات
            </p>

            <ul className="space-y-1.5">
              {cycleUnits.map((item) => {
                const Icon = item.Icon;
                const active = item.active;
                const inner = (
                  <>
                    <Icon
                      className={`size-[18px] shrink-0 ${
                        active ? "text-primary" : "text-[#94A3B8]"
                      }`}
                    />
                    <div className="min-w-0 flex-1 text-start">
                      <p
                        className={`text-[13px] font-bold leading-5 ${
                          active ? "text-primary" : "text-[#1E293B]"
                        }`}
                      >
                        {item.label}
                      </p>
                      {item.note ? (
                        <p className="text-[10px] leading-4 text-[#94A3B8]">
                          {item.note}
                        </p>
                      ) : null}
                    </div>
                    {active ? (
                      <span className="size-2 shrink-0 rounded-full bg-primary" />
                    ) : (
                      <FiChevronLeft className="size-4 shrink-0 text-[#CBD5E1]" />
                    )}
                  </>
                );
                return (
                  <li key={item.id}>
                    {active ? (
                      <div className="flex items-center gap-3 rounded-[10px] border border-[#BBD9EA] bg-[#E8F3FA] px-3.5 py-2.5">
                        {inner}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 transition hover:bg-[#F8FAFC]"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-[18px] border-t border-[#EEF2F6] pt-[18px]">
              <div className="flex items-center gap-2.5 px-1.5">
                <LuCheckCheck className="size-[18px] shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-[12px] font-bold leading-5 text-[#1E293B]">
                    حوكمة مسجلة
                  </p>
                  <p className="mt-0.5 text-[10.5px] leading-5 text-[#94A3B8]">
                    أي تعديل يتم تدوينه تلقائياً في سجل الرقابة المالي السيادي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ============================ الفوتر ============================ */}
      <div className="sticky bottom-0 z-10 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-[19px] shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1B4D66] px-5 text-[13px] font-bold text-white hover:bg-[#153a4f]"
            >
              <FiSave className="size-4" />
              حفظ جميع الإعدادات
            </button>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-[13px] font-semibold text-[#475569] hover:bg-[#F8FAFC]"
            >
              <FiRotateCcw className="size-4" />
              استعادة الإعدادات الافتراضية
            </button>
          </div>

          <p className="flex items-center gap-2 text-[11.5px] text-[#64748B]">
            <FiClock className="size-4 shrink-0" />
            <span>
              آخر تعديل على الوحدة بواسطة:{" "}
              <strong className="font-bold text-[#1E293B]">سلطان العتيبي</strong>{" "}
              (اليوم الساعة 10:45 ص)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;