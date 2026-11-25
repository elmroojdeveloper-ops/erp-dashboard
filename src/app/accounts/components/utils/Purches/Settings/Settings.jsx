"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiBell,
  FiCheck,
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
} from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LuClipboardList, LuScale } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";

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
    footIcon: FiAlertTriangle,
    footTone: "text-[#D97706]",
  },
  {
    id: "exceptional",
    num: "02",
    title: "يتطلب اعتماد استثنائي",
    body: "إيقاف الإصدار وتحويله مباشرة لاعتماد استثنائي من المدير المالي مع مذكرة مبرر إدارية.",
    foot: "توازن مثالي بين المرونة والرقابة",
    footIcon: FiCheck,
    footTone: "text-[#B45309]",
    recommended: true,
  },
  {
    id: "block",
    num: "03",
    title: "المنع التلقائي",
    body: "رفض حفظ أو اعتماد أمر الشراء حتى تعزيز الميزانية رسمياً بتحويل اعتمادات معتمدة.",
    foot: "انضباط مالي صارم وبدون مرونة",
    footIcon: FiLock,
    footTone: "text-[#DC2626]",
  },
];

const approvalCards = [
  {
    step: 1,
    title: "منشئ الأمر",
    role: "مسؤول المشتريات المكلف",
    sla: "فوري",
    slaTone: "bg-[#E0F2FE] text-[#0369A1]",
    phase: "إعداد ومطابقة العروض",
    statusIcon: FiCheck,
    statusTone: "text-[#16A34A]",
    ring: "border-[#BBD9EA] bg-[#F8FCFF]",
  },
  {
    step: 2,
    title: "مدير إدارة المشتريات",
    role: "اعتماد مالي للجدوى والبنود",
    sla: "24 ساعة",
    slaTone: "bg-[#FEF3C7] text-[#B45309]",
    phase: "تدقيق المواصفات والأسعار",
    statusIcon: FiClock,
    statusTone: "text-[#EA580C]",
    ring: "border-[#E2E8F0] bg-white",
  },
  {
    step: 3,
    title: "المدير المالي / رئيس القطاع",
    role: "اعتماد مالي إلزامي فوق 10,000 ر.س",
    sla: "48 ساعة",
    slaTone: "bg-[#FCE7F3] text-[#BE185D]",
    phase: "التحقق من الرصيد والسيولة",
    statusIcon: FiLock,
    statusTone: "text-primary",
    ring: "border-2 border-[#FCD34D] bg-[#FFFBEB]",
    highlight: true,
  },
];

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-bold text-[#64748B]">
    {children}
  </span>
);

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
    <p className="text-sm font-bold text-[#1E293B]">{title}</p>
    <p className="mt-1 text-[12px] leading-5 text-[#64748B]">{desc}</p>
  </div>
);

const CardShell = ({ chip, icon: Icon, iconBg, title, desc, children }) => (
  <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card sm:p-6">
    <div className="mb-5 flex items-start justify-between gap-3">
      <Chip>{chip}</Chip>
      <div className="flex flex-1 items-start justify-end gap-3 text-end">
        <div>
          <h2 className="text-[17px] font-bold text-[#0F172A]">{title}</h2>
          <p className="mt-1 max-w-xl text-[12px] leading-6 text-[#64748B]">
            {desc}
          </p>
        </div>
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </div>
    {children}
  </section>
);

const Settings = () => {
  const [prefixFmt, setPrefixFmt] = useState("{الرقم التسلسلي} - 2026");
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

  const handleSave = () => setSavedAt(true);
  const handleResetDefaults = () => {
    setPrefixFmt("{الرقم التسلسلي} - 2026");
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

  return (
    <div dir="rtl" className="flex flex-col gap-5 pb-28">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-wrap items-start gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold text-primary sm:text-[28px]">
                إدارة نظام المشتريات
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A7E9C4] bg-[#ECFDF3] px-2.5 py-1 text-[11px] font-bold text-[#15803D]">
                <span className="size-1.5 rounded-full bg-[#16A34A]" />
                ساري المفعول
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#64748B]">
              تخصيص دورة المشتريات، سياسات الاعتماد، وقواعد المطابقة التلقائية
              لشركتك
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {savedAt ? (
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2 text-[12px] font-semibold text-[#15803D]">
              <FiCheck className="size-4" />
              تم الحفظ تلقائياً قبل دقيقتين
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1B4D66] px-5 text-sm font-bold text-white shadow-card hover:bg-[#153a4f]"
          >
            <FiSave className="size-[18px]" />
            حفظ جميع الإعدادات
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <aside className="shrink-0 xl:w-[268px]">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-card">
            <p className="mb-3 px-1 text-[12px] font-bold text-[#64748B]">
              وحدات دورة المشتريات
            </p>
            <ul className="space-y-1">
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
                        className={`text-[13px] font-bold ${
                          active ? "text-primary" : "text-[#334155]"
                        }`}
                      >
                        {item.label}
                      </p>
                      {item.note ? (
                        <p className="mt-0.5 text-[11px] font-medium text-[#94A3B8]">
                          {item.note}
                        </p>
                      ) : null}
                    </div>
                    {!active ? (
                      <FiChevronLeft className="size-4 shrink-0 text-[#CBD5E1]" />
                    ) : (
                      <span className="size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </>
                );
                return (
                  <li key={item.id}>
                    {active ? (
                      <div className="flex items-center gap-2.5 rounded-xl border border-[#BBD9EA] bg-[#E8F3FA] px-3 py-2.5">
                        {inner}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition hover:bg-[#F8FAFC]"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 border-t border-[#EEF2F6] pt-4">
              <div className="flex items-start gap-2 px-1">
                <FiCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-[12px] font-bold text-[#1E293B]">
                    حوكمة مسجلة
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#64748B]">
                    أي تعديل يتم تدوينه تلقائياً في سجل الرقابة المالي السيادي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <CardShell
            chip="التهيئة الأساسية"
            icon={FiList}
            iconBg="bg-[#E8F3FA] text-primary"
            title="الترقيم التلقائي وسلاسل الأوامر"
            desc="تخصيص البادئة، تسلسل أرقام الأوامر ودوريات إعادة التصفير النظامية"
          >
            <p className="mb-2 text-[11px] font-semibold text-primary">
              يدعم المتغيرات الذكية
            </p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#64748B]">
                  صيغة وبادئة الترقيم (Prefix)
                </span>
                <div className="relative">
                  <input
                    value={prefixFmt}
                    onChange={(e) => setPrefixFmt(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pe-16 ps-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none"
                  />
                  <span className="absolute end-2 top-1/2 -translate-y-1/2 rounded-md bg-[#E0F2FE] px-2 py-0.5 text-[10px] font-bold text-primary">
                    ثابت
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#64748B]">
                  دورية إعادة تصفير الترقيم
                </span>
                <select
                  value={resetCycle}
                  onChange={(e) => setResetCycle(e.target.value)}
                  className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                >
                  <option value="annual">
                    سنوياً (مع بداية كل سنة مالية جديدة)
                  </option>
                  <option value="never">بدون تصفير</option>
                </select>
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-[#CBD5E1] bg-[#FAFCFE] px-4 py-3">
              <p className="text-[11px] font-semibold text-[#64748B]">
                معاينة الترقيم الحي:
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-lg bg-[#E0F2FE] px-3 py-1.5 font-mono text-sm font-bold text-primary">
                  {previewId}
                </span>
                <span className="text-[12px] text-[#64748B]">
                  يبدأ السجل القادم عند 1 يناير 2027
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#D97706]">
                  <FiHash className="size-4" />
                </span>
                <RowNote
                  title="استخدام تسلسل منفصل للأوامر اليدوية (الاستثنائية)"
                  desc="توليد كود مميز (MPO-2026-XXXX) للأوامر التي لا تستند إلى طلبات عروض أسعار لتسهيل التدقيق والامتثال المالي."
                />
              </div>
              <Toggle
                checked={manualSeq}
                onChange={setManualSeq}
                ariaLabel="تسلسل منفصل للأوامر اليدوية"
              />
            </div>
          </CardShell>

          <CardShell
            chip="مستوى الرقابة: صارم"
            icon={FiShield}
            iconBg="bg-[#FFFBEB] text-[#D97706]"
            title="سقف الاعتماد المالي وسلسلة الموافقات"
            desc="تحديد قواعد الحوكمة المالية وأدوار الصلاحيات المتعددة"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#64748B]">
                  سقف الاعتماد المالي للاعتماد الفردي
                </span>
                <input
                  type="number"
                  value={approvalLimit}
                  onChange={(e) => setApprovalLimit(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm font-bold focus:border-primary focus:bg-white focus:outline-none"
                />
                <p className="text-[11px] text-[#94A3B8]">
                  الحد الأقصى المسموح لمسؤول المشتريات باعتماده دون مصادقة ثانية
                </p>
              </label>
              <div className="flex flex-col gap-1.5 lg:pt-5">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EEF2F6] px-4 py-3">
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
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] px-4 py-3">
              <FiInfo className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-[12px] leading-6 text-[#0369A1]">
                أوامر الشراء التي تتجاوز هذا المبلغ (
                <strong>{approvalLimit} ر.س</strong>) تتطلب اعتماداً إضافياً
                من الإدارة المالية قبل الإصدار النهائي والإرسال للمورد الخارجي
              </p>
            </div>

            <p className="mb-3 mt-6 text-[12px] font-bold text-[#64748B]">
              سلسلة الموافقات
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {approvalCards.map((card) => {
                const Status = card.statusIcon;
                return (
                  <div
                    key={card.step}
                    className={`rounded-2xl border px-4 py-4 ${card.ring}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {card.step}
                      </span>
                      <Status className={`size-4 ${card.statusTone}`} />
                    </div>
                    <p className="mt-3 text-sm font-bold text-[#0F172A]">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[11px] text-[#64748B]">{card.role}</p>
                    <span
                      className={`mt-2 inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${card.slaTone}`}
                    >
                      {card.sla}
                    </span>
                    <p className="mt-2 text-[11px] text-[#94A3B8]">
                      المرحلة: {card.phase}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardShell>

          <CardShell
            chip="الرقابة على الميزانية"
            icon={FiPieChart}
            iconBg="bg-[#FCE7F3] text-[#BE185D]"
            title="سياسة تجاوز ميزانية مركز التكلفة"
            desc="التحكم في الارتباط المالي عند نفاد المخصص السنوي للمركز"
          >
            <p className="mb-4 text-[12px] leading-6 text-[#64748B]">
              حدد السلوك النظامي عند قيام مسؤول المشتريات بإصدار أمر شراء يتخطى
              الرصيد المتاح في ميزانية مركز التكلفة المرتبط:
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {budgetOptions.map((opt) => {
                const FootIcon = opt.footIcon;
                const selected = budgetPolicy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBudgetPolicy(opt.id)}
                    className={`relative rounded-2xl border p-4 text-start transition ${
                      selected
                        ? "border-[#F59E0B] bg-[#FFFBEB] shadow-[0_0_0_1px_#F59E0B]"
                        : "border-[#E2E8F0] bg-[#FAFCFE] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {opt.recommended ? (
                      <span className="absolute -top-2.5 start-4 rounded-full bg-[#F59E0B] px-2 py-0.5 text-[9px] font-bold text-white">
                        الخيار الموصى به للمطابقة والحوكمة
                      </span>
                    ) : null}
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#94A3B8]">
                        {opt.num}
                      </span>
                      <span
                        className={`size-4 rounded-full border-2 ${
                          selected
                            ? "border-[#F59E0B] bg-[#F59E0B]"
                            : "border-[#CBD5E1]"
                        }`}
                      />
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#0F172A]">
                      {opt.title}
                    </p>
                    <p className="mt-2 text-[11px] leading-5 text-[#64748B]">
                      {opt.body}
                    </p>
                    <p
                      className={`mt-3 inline-flex items-center gap-1 text-[10px] font-bold ${opt.footTone}`}
                    >
                      <FootIcon className="size-3" />
                      {opt.foot}
                    </p>
                  </button>
                );
              })}
            </div>
          </CardShell>

          <CardShell
            chip="النماذج القياسية"
            icon={FiFileText}
            iconBg="bg-[#E8F3FA] text-primary"
            title="الشروط والأحكام الافتراضية"
            desc="البنود النظامية وجداول السداد المطبوعة على نماذج أوامر الشراء"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#64748B]">
                  مهلة التوريد والتسليم الافتراضية
                </span>
                <input
                  value={deliveryTerms}
                  onChange={(e) => setDeliveryTerms(e.target.value)}
                  className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#64748B]">
                  شروط الدفع والائتمان الافتراضية
                </span>
                <input
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="h-11 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                />
              </label>
            </div>
            <p className="mt-2 text-[11px] text-[#94A3B8]">
              تطبق كقيمة أولية في كل أمر شراء جديد ويمكن تعديلها يدوياً حسب
              استحقاقات المدفوعات النقدية للإدارة المالية.
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#64748B]">
                ملاحظات وشروط تعاقدية افتراضية تظهر أسفل كل أمر شراء
              </span>
              <button
                type="button"
                onClick={() => setTermsText(standardTerms)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary"
              >
                <FiRefreshCw className="size-3.5" />
                استعادة النص القياسي
              </button>
            </div>
            <textarea
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-[#E2E8F0] bg-[#F0F9FF] px-3 py-2.5 text-[12px] leading-7 text-[#334155] focus:border-primary focus:outline-none"
            />
            <p className="mt-2 text-[11px] text-[#94A3B8]">
              هذا النص سيظهر في تذييل ملف PDF الرسمي المرسل إلى الموردين
              والشركاء.
            </p>
          </CardShell>

          <CardShell
            chip="أتمتة النظام"
            icon={FiBell}
            iconBg="bg-[#E8F3FA] text-primary"
            title="الإشعارات والتنبيهات التلقائية"
            desc="قنوات الإشعار للموردين وفريق المشتريات ولجان المراجعة"
          >
            <ul className="space-y-3">
              {[
                {
                  icon: FiSend,
                  box: "bg-[#E0F2FE] text-[#0369A1]",
                  title:
                    "إرسال أمر الشراء للمورد تلقائياً عبر البريد الإلكتروني بعد الاعتماد المالي النهائي",
                  desc: "يتم توليد وإرفاق نسخة PDF المعتمدة مشفرة بخاتم المنشأة الإلكتروني ورمز التحقق QR.",
                  checked: n1,
                  set: setN1,
                },
                {
                  icon: FiClock,
                  box: "bg-[#FEF3C7] text-[#B45309]",
                  title:
                    "إشعار مدير المشتريات عند تأخر التوريد عن الموعد المحدد",
                  desc: "إرسال تنبيه في لوحة التحكم والبريد الإلكتروني قبل 48 ساعة من تاريخ الاستحقاق التعاقدي.",
                  checked: n2,
                  set: setN2,
                },
                {
                  icon: LuClipboardList,
                  box: "bg-[#E0F2FE] text-[#0369A1]",
                  title: "إشعار بطلبات الاعتماد المعلقة",
                  desc: "تذكير دوري صباحي للمعتمدين بقائمة الأوامر المعلقة غير المصادق عليها عند الساعة 9:00 صباحاً.",
                  checked: n3,
                  set: setN3,
                },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <li
                    key={row.title}
                    className="flex items-start justify-between gap-4 rounded-xl border border-[#EEF2F6] px-4 py-3"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${row.box}`}
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
      </div>

      <div className="sticky bottom-0 z-10 -mx-1 mt-2 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-card sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[12px] text-[#64748B]">
            <FiClock className="size-4" />
            آخر تعديل على الوحدة بواسطة:{" "}
            <strong className="text-[#334155]">سلطان العتيبي</strong> (اليوم
            الساعة 10:45 ص)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-[13px] font-semibold text-[#475569]"
            >
              <FiRotateCcw className="size-4" />
              استعادة الإعدادات الافتراضية
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1B4D66] px-5 text-[13px] font-bold text-white"
            >
              <FiSave className="size-4" />
              حفظ جميع الإعدادات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;