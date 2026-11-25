"use client";

import { useRouter } from "next/navigation";
import {
  FiAlertTriangle,
  FiAward,
  FiCheck,
  FiChevronLeft,
  FiCreditCard,
  FiPackage,
  FiPlus,
  FiPrinter,
  FiShield,
  FiStar,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { HiCheckCircle, HiChartBar, HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { MdHistory } from "react-icons/md";

const ordersHref = "/accounts/Purches/orders";

/* ------------------------------- data ------------------------------- */

const defaultOffers = [
  {
    id: "o1",
    tone: "best",
    rank: "الأفضل قيمة وتوصية النظام",
    RankIcon: FiAward,
    code: "RFQ-9021",
    name: "شركة مدار الشبكات للاتصالات",
    rating: "4.8",
    reviews: "18 تقييم سابق",
    badge: { label: "مورد معتمد A", tone: "approved" },
    amount: "185,400.00",
    diff: { best: true, label: "الأقل سعراً بـ 7,450 ر.س" },
    delivery: { value: "14 يوم عمل", note: "(مستودع الرياض)" },
    payment: { value: "آجل 60 يوماً بعد الفحص" },
    warranty: { value: "3 سنوات شامل (SLA 24/7)" },
    shipping: { value: "مجاني بالكامل (DDP)", style: "chip" },
    cta: "اختيار هذا العرض وترحيله لأمر شراء",
    ctaNote: "ينشئ مسودة PO فوري بمصادقة التعميد",
    score: 94,
    scoreNote: "التكلفة التنافسية: ممتاز",
    scoreTag: "الموصى به",
  },
  {
    id: "o2",
    tone: "spec",
    rank: "الأقوى بمواصفات الضمان",
    RankIcon: FiShield,
    code: "RFQ-9022",
    name: "شركة النخبة للتوريدات الفنية",
    rating: "4.9",
    reviews: "24 تقييم سابق",
    badge: { label: "شريك ذهبي", tone: "neutral" },
    amount: "192,850.00",
    diff: { best: false, label: "فارق +7,450 ر.س عن الأقل" },
    delivery: { value: "21 يوم عمل" },
    payment: { value: "30% مقدم والباقي بعد 30 يوم" },
    warranty: { value: "سنتان استبدال فوري بموقع العميل" },
    shipping: { value: "1,200 ر.س (مضافة للفاتورة)" },
    cta: "اختيار هذا العرض",
    ctaNote: "يتطلب سداد دفعة أولى قبل التوريد",
    score: 88,
    scoreNote: "دعم فني وتغطية شاملة",
    scoreTag: "خيار بديل أول",
  },
  {
    id: "o3",
    tone: "fast",
    rank: "الأسرع في الجاهزية والتسليم",
    RankIcon: FiZap,
    code: "DIRECT-78",
    name: "مدار للحلول السريعة",
    rating: "4.6",
    reviews: "9 تقييمات سابقة",
    badge: { label: "توريد مباشر", tone: "neutral" },
    amount: "198,200.00",
    diff: { best: false, label: "فارق +12,800 ر.س عن الأقل" },
    delivery: { value: "فوري خلال 24 ساعة", style: "greenBg" },
    payment: { value: "آجل 30 يوماً" },
    warranty: { value: "24 شهراً صيانة تشغيلية دورية" },
    shipping: { value: "تسليم موقعي فوري مجاني", style: "greenText" },
    cta: "اختيار هذا العرض",
    ctaNote: "مناسب للحالات الطارئة ومشاريع الإطلاق",
    score: 82,
    scoreNote: "تسليم فوري (أولوية وقت)",
    scoreTag: "خيار للطوارئ",
  },
];

/* ------------------------------- styles ------------------------------- */

const TONES = {
  best: {
    card: "border-2 border-primary shadow-[0_8px_24px_rgba(31,120,168,0.14)]",
    header: "bg-primary text-white",
    priceBox: "border-[#BCD8E8] bg-[#EEF5FA]",
    diff: "bg-[#DCF5E5] text-[#0F8A4F]",
    cta: "bg-primary text-white hover:bg-primary-dark",
    bar: "bg-primary",
    dot: "bg-primary",
    legend: "text-primary",
    scoreCard: "border-[#A9CBE0] bg-[#F1F8FC]",
    scoreValue: "text-primary",
    tag: "font-bold text-primary",
  },
  spec: {
    card: "border border-[#E2E8F0] shadow-card",
    header: "border-b border-[#E2E8F0] bg-[#EEF1F5] text-[#334155]",
    priceBox: "border-[#E2E8F0] bg-white",
    diff: "bg-[#EEF1F5] text-[#64748B]",
    cta: "border border-primary bg-white text-primary hover:bg-surface",
    bar: "bg-[#5B6B84]",
    dot: "bg-[#5B6B84]",
    legend: "text-[#475569]",
    scoreCard: "border-[#E2E8F0] bg-[#F8FAFC]",
    scoreValue: "text-[#1E293B]",
    tag: "text-[#64748B]",
  },
  fast: {
    card: "border border-[#E2E8F0] shadow-card",
    header: "border-b border-[#F1E3B0] bg-[#FEF8E1] text-[#9A5B0C]",
    priceBox: "border-[#E2E8F0] bg-white",
    diff: "bg-[#EEF1F5] text-[#64748B]",
    cta: "border border-[#CBD5E1] bg-white text-[#1E293B] hover:bg-surface",
    bar: "bg-[#9AA5C0]",
    dot: "bg-[#AEB8CC]",
    legend: "text-[#475569]",
    scoreCard: "border-[#E2E8F0] bg-[#F8FAFC]",
    scoreValue: "text-[#1E293B]",
    tag: "text-[#64748B]",
  },
};

const BADGE = {
  approved: "border border-[#A7E3BF] bg-[#EAFBF1] text-[#0F7A43]",
  neutral: "bg-[#EEF1F5] text-[#475569]",
};

const VALUE_STYLE = {
  default: "text-[13.5px] font-bold leading-5 text-[#1E293B]",
  greenBg:
    "rounded-md bg-[#E3F7EA] px-2.5 py-1 text-[13.5px] font-bold leading-5 text-[#0E7A43]",
  greenText: "text-[13.5px] font-bold leading-5 text-[#0E8A4C]",
  chip: "rounded-md border border-[#BDEBD0] bg-[#EAFBF1] px-3 py-2 text-center text-[13.5px] font-bold leading-5 text-[#0E7A43]",
};

/* ------------------------------- parts ------------------------------- */

const DetailRow = ({ Icon, label, value, note, style = "default", last }) => (
  <li
    className={`flex items-center justify-between gap-3 py-3.5 ${
      last ? "" : "border-b border-[#E8ECF1]"
    }`}
  >
    <span className="flex shrink-0 items-center gap-2.5 text-[13px] text-[#64748B]">
      <Icon className="size-5 shrink-0 text-[#94A3B8]" />
      <span className="max-w-[84px] leading-5">{label}</span>
    </span>

    <div className={`min-w-0 ${note ? "text-end" : "text-start"}`}>
      <p className={VALUE_STYLE[style] ?? VALUE_STYLE.default}>{value}</p>
      {note ? (
        <p className="mt-0.5 text-[12px] leading-4 text-[#64748B]">{note}</p>
      ) : null}
    </div>
  </li>
);

const OfferCard = ({ offer, onSelect }) => {
  const t = TONES[offer.tone] ?? TONES.spec;
  const { RankIcon } = offer;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[20px] bg-white ${t.card}`}
    >
      {/* شريط الترتيب */}
      <div
        className={`flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-bold ${t.header}`}
      >
        <RankIcon className="size-4 shrink-0" />
        {offer.rank}
      </div>

      <div className="flex flex-1 flex-col p-7">
        {/* الكود */}
        <div className="flex">
          <span className="rounded-md bg-[#EEF1F5] px-2.5 py-1 font-mono text-[12px] font-medium tracking-wide text-[#64748B]">
            {offer.code}
          </span>
        </div>

        {/* الاسم */}
        <h3 className="mt-3 text-xl font-bold leading-8 text-[#1E293B]">
          {offer.name}
        </h3>

        {/* التقييم + البادج */}
        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#D97706]">
            <FiStar className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
            {offer.rating}
          </span>
          <span className="text-[12px] text-[#64748B]">({offer.reviews})</span>
          <span
            className={`rounded-md px-2.5 py-1 text-[12px] font-medium ${
              BADGE[offer.badge.tone]
            }`}
          >
            {offer.badge.label}
          </span>
        </div>

        {/* صندوق السعر */}
        <div
          className={`mt-6 flex flex-col items-center rounded-2xl border px-4 py-5 text-center ${t.priceBox}`}
        >
          <p className="text-[12.5px] text-[#64748B]">
            الإجمالي الشامل للضريبة (15%)
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-[34px] font-extrabold leading-[44px] tracking-tight text-[#1E293B]">
              {offer.amount}
            </span>
            <span className="text-[15px] font-semibold text-[#475569]">
              ر.س
            </span>
          </p>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold ${t.diff}`}
          >
            {offer.diff.best ? (
              <HiCheckCircle className="size-4 shrink-0" />
            ) : null}
            {offer.diff.label}
          </span>
        </div>

        {/* التفاصيل */}
        <ul className="mt-6">
          <DetailRow
            Icon={FiTruck}
            label="مدة التسليم"
            value={offer.delivery.value}
            note={offer.delivery.note}
            style={offer.delivery.style}
          />
          <DetailRow
            Icon={FiCreditCard}
            label="شروط الدفع"
            value={offer.payment.value}
          />
          <DetailRow
            Icon={FiShield}
            label="الضمان والصيانة"
            value={offer.warranty.value}
          />
          <DetailRow
            Icon={FiPackage}
            label="رسوم الشحن والتفريغ"
            value={offer.shipping.value}
            style={offer.shipping.style}
            last
          />
        </ul>

        {/* الزرار + الملاحظة */}
        <div className="mt-auto border-t border-[#E8ECF1] pt-5">
          <button
            type="button"
            onClick={() => onSelect(offer)}
            className={`flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-center text-[14.5px] font-bold leading-6 transition ${t.cta}`}
          >
            {offer.cta}
            {offer.tone === "best" ? (
              <FiCheck className="size-5 shrink-0" />
            ) : (
              <FiChevronLeft className="size-4 shrink-0" />
            )}
          </button>
          <p className="mt-3 text-center text-[12px] text-[#64748B]">
            {offer.ctaNote}
          </p>
        </div>
      </div>
    </article>
  );
};

/* ------------------------------- main ------------------------------- */

const CompareOffers = ({
  offers = defaultOffers,
  prNumber = "PR-2023-085",
  description = "توريد حواسيب محمولة وتجهيزات البنية التحتية",
  validityDays = "4 أيام عمل",
  onSelect,
  onPrint,
  onExport,
  onDetails,
  onHistory,
  onAddVendor,
}) => {
  const router = useRouter();

  const handleSelect = (offer) => {
    if (onSelect) return onSelect(offer);
    router.push(ordersHref);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-6 pb-4 text-[#1E293B]">
      {/* ============================ الهيدر ============================ */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1E293B] sm:text-[30px] sm:leading-[42px]">
              مقارنة عروض الأسعار
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#A7E9C4] bg-[#E3F8EC] px-3 py-1 text-[13px] font-semibold text-[#0F7A4A]">
              طلب نشط
              <span className="size-2 rounded-full bg-[#10B981]" />
            </span>
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-[#64748B]">
            <span>
              مقارنة{" "}
              <span className="font-bold text-[#1E293B]">
                {offers.length} عروض مؤهلة
              </span>{" "}
              لطلب الشراء
            </span>
            <span className="rounded-md border border-[#BBD9EA] bg-[#EAF3F8] px-2.5 py-0.5 font-mono text-sm font-bold tracking-wide text-primary">
              {prNumber}
            </span>
            <span>— {description}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#334155] shadow-card transition hover:bg-surface"
          >
            <FiPrinter className="size-[18px]" />
            طباعة المقارنة
          </button>
          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-card transition hover:bg-primary-dark"
          >
            <HiOutlineDocumentArrowDown className="size-[18px]" />
            تصدير PDF
          </button>
        </div>
      </section>

      {/* ============================ التنبيه ============================ */}
      <section className="flex items-center justify-between gap-4 rounded-2xl border border-[#F3DC9C] bg-[#FFFBEB] px-5 py-[18px]">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#FDEBB8] text-[#D97706]">
            <FiAlertTriangle className="size-[18px]" />
          </span>
          <p className="text-sm leading-6 text-[#92400E]">
            أحد هذه العروض (
            <span className="font-bold text-[#78350F]">مدار للحلول السريعة</span>
            ) تم استلامه كعرض استثنائي مباشر غير مقترن بطلب كراسة رسمي مسبق.
          </p>
        </div>

        <button
          type="button"
          onClick={onDetails}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary transition hover:text-primary-dark"
        >
          التفاصيل النظامية
          <FiChevronLeft className="size-4" />
        </button>
      </section>

      {/* ============================ الكروت ============================ */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onSelect={handleSelect} />
        ))}
      </section>

      {/* ============================ مؤشر الجدارة ============================ */}
      <section className="rounded-[20px] border border-[#E2E8F0] bg-white p-7 shadow-card">
        <header className="flex flex-col gap-4 border-b border-[#E8ECF1] pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-[#1E293B]">
              <HiChartBar className="size-6 text-primary" />
              مؤشر الجدارة التقييمية الموزونة
            </h2>
            <p className="mt-2 text-[13px] text-[#64748B]">
              حساب الدرجات بالاعتماد على: السعر (40%)، سرعة التسليم (30%)،
              الضمان وتوافق المعايير (30%)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-1 text-[13px]">
            {offers.map((offer) => {
              const t = TONES[offer.tone] ?? TONES.spec;
              return (
                <span
                  key={`legend-${offer.id}`}
                  className={`inline-flex items-center gap-2 font-medium ${t.legend}`}
                >
                  <span className={`size-3 rounded-full ${t.dot}`} />
                  {offer.name
                    .replace("شركة ", "")
                    .replace("للاتصالات", "")
                    .replace("للتوريدات الفنية", "")
                    .replace("السريعة", "")
                    .trim()}
                </span>
              );
            })}
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {offers.map((offer) => {
            const t = TONES[offer.tone] ?? TONES.spec;
            return (
              <div
                key={`score-${offer.id}`}
                className={`rounded-xl border px-5 py-4 ${t.scoreCard}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[15px] font-bold text-[#1E293B]">
                    {offer.name}
                  </p>
                  <p className="flex shrink-0 items-baseline gap-1.5">
                    <span className={`text-xl font-bold ${t.scoreValue}`}>
                      {offer.score}
                    </span>
                    <span className="text-[13px] text-[#64748B]">/ 100</span>
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#E5E9F0]">
                  <div
                    className={`h-full rounded-full ${t.bar}`}
                    style={{ width: `${offer.score}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
                  <span className="text-[#64748B]">{offer.scoreNote}</span>
                  <span className={t.tag}>{offer.scoreTag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================ الشريط السفلي ============================ */}
      <section className="flex flex-col gap-4 rounded-[20px] border border-[#E2E8F0] bg-white px-6 py-4 shadow-card md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#475569]">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            {offers.length} عروض قيد المقارنة النشطة
          </span>
          <span className="h-4 w-px bg-[#CBD5E1]" />
          <span>
            صلاحية العروض تنتهي بعد{" "}
            <span className="font-bold text-[#1E293B]">{validityDays}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onHistory}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#F1F5F9] px-5 text-sm font-medium text-[#475569] transition hover:bg-[#E8EDF3]"
          >
            <MdHistory className="size-5" />
            سجل المراجعات
          </button>
          <button
            type="button"
            onClick={onAddVendor}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            <FiPlus className="size-[18px]" />
            طلب عرض سعر إضافي من مورد آخر
          </button>
        </div>
      </section>
    </div>
  );
};

export default CompareOffers;