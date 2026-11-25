import { FiAlertTriangle, FiTrendingUp } from "react-icons/fi";
import {
  HiOutlineArchiveBox,
  HiOutlineBanknotes,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

const cards = [
  {
    id: "active",
    title: "إجمالي العروض النشطة",
    value: "8",
    unit: "عروض فعالة",
    Icon: HiOutlineDocumentText,
    iconBox: "bg-primary/10",
    iconColor: "text-primary",
    divider: true,
    fit: true, // الخط الفاصل بعرض النص بس زي التصميم
    footer: (
      <div className="flex items-center gap-2 text-primary">
        <span className="size-2 shrink-0 rounded-full bg-primary" />
        جاهزة للمفاضلة والترسية
      </div>
    ),
  },
  {
    id: "value",
    title: "إجمالي قيمة العروض المسجلة",
    value: "452,000.00",
    unit: "ر.س",
    Icon: HiOutlineBanknotes,
    iconBox: "bg-primary/10",
    iconColor: "text-primary",
    divider: true,
    footer: (
      <div className="flex items-start justify-between gap-3">
        <span className="text-[#64748B]">شاملة الضريبة (15% VAT)</span>
        <span className="text-primary">موزعة على 3 مشاريع</span>
      </div>
    ),
  },
  {
    id: "total",
    title: "إجمالي العروض الكلي",
    value: "24",
    unit: "عرضا هذا الربع",
    Icon: HiOutlineArchiveBox,
    iconBox: "bg-primary/10",
    iconColor: "text-primary",
    divider: false,
    footer: (
      <div className="flex items-center gap-2 text-[#0F9967]">
        <FiTrendingUp className="size-4 shrink-0" />
        +18% مقارنة بالشهر السابق
      </div>
    ),
  },
  {
    id: "exception",
    title: "عروض استثنائية (بدون RFQ)",
    value: "5",
    unit: "عروض مباشرة",
    valueColor: "text-[#C8680A]",
    Icon: HiOutlineExclamationTriangle,
    iconBox: "bg-[#FEF6E3]",
    iconColor: "text-[#E58A00]",
    divider: true,
    footer: (
      <div className="flex items-center gap-2 text-[#475569]">
        <FiAlertTriangle className="size-3.5 shrink-0 text-[#E58A00]" />
        تتطلب توثيق مبرر الشراء المستقل والاعتماد
      </div>
    ),
  },
];

const Cards = () => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
    >
      {cards.map(
        ({
          id,
          title,
          value,
          unit,
          valueColor = "text-[#1E293B]",
          Icon,
          iconBox,
          iconColor,
          divider,
          fit,
          footer,
        }) => (
          <article
            key={id}
            className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-card"
          >
            {/* العنوان + الرقم (يمين) | الأيقونة (يسار) */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 pt-[3px]">
                <h3 className="text-sm font-medium leading-5 text-[#334155]">
                  {title}
                </h3>
                <div className="mt-3.5 flex items-baseline gap-2">
                  <span
                    className={`text-[28px] font-bold leading-9 tracking-tight ${valueColor}`}
                  >
                    {value}
                  </span>
                  <span className="text-sm font-medium leading-5 text-[#64748B]">
                    {unit}
                  </span>
                </div>
              </div>

              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBox}`}
              >
                <Icon className={`size-5 ${iconColor}`} />
              </div>
            </div>

            {/* الفوتر */}
            <div
              className={`mt-3 border-t pt-[18px] text-[13px] font-medium leading-[18px] ${
                divider ? "border-[#E5E9EF]" : "border-[#E5E9EF]"
              } ${fit ? "w-fit" : ""}`}
            >
              {footer}
            </div>
          </article>
        )
      )}
    </section>
  );
};

export default Cards;