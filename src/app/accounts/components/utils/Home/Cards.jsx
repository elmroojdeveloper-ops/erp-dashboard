import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";

const cards = [
  {
    id: "uncollected",
    title: "الفواتير غير المحصلة",
    value: "122,400",
    unit: "ر.س",
    note: "8 فواتير تجاوزت موعد الاستحقاق",
    noteClass: "text-danger",
    icon: MdOutlineReceiptLong,
  },
  {
    id: "stock",
    title: "قيمة المخزون",
    value: "4,852,190",
    unit: "ر.س",
    note: "42 صنف تحت الحد الأدنى!",
    noteClass: "text-warning",
    icon: LuBoxes,
  },
  {
    id: "pending",
    title: "المدفوعات المعلقة",
    value: "45,250",
    unit: "ر.س",
    note: "18 دفعة بانتظار التأكيد",
    noteClass: "text-rich",
    icon: IoWalletOutline,
  },
  {
    id: "orders",
    title: "أوامر الشراء النشطة",
    value: "24",
    unit: "أمر",
    note: "8 في انتظار الاستلام",
    noteClass: "text-primary",
    icon: FiShoppingCart,
  },
];

const Cards = () => {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.id}
            className="flex flex-col gap-2 rounded-[18px] bg-white p-3 shadow-card sm:rounded-[22px] sm:p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface sm:size-10">
                <Icon className="size-5 text-primary sm:size-[22px]" />
              </div>
              <h3 className="text-sm font-bold text-muted sm:text-base">
                {card.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-1 text-deep">
              <span className="text-sm sm:text-base">{card.unit}</span>
              <span className="text-2xl font-extrabold leading-none sm:text-[32px]">
                {card.value}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <HiOutlineArrowLeft className="size-5 shrink-0 text-primary" />
              <p className={`text-[11px] font-bold sm:text-xs ${card.noteClass}`}>
                {card.note}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Cards;
