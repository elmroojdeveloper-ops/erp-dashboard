import { FiRefreshCw } from "react-icons/fi";
import {
  HiExclamationCircle,
  HiOutlineChartBar,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

const cards = [
  {
    id: "requested",
    title: "تم الطلب",
    value: "24",
    featured: true,
    Icon: HiOutlineChartBar,
  },
  {
    id: "received",
    title: "تم الاستلام",
    value: "223",
    featured: false,
    Icon: FiRefreshCw,
  },
  {
    id: "expiring",
    title: "أوشكت على الانتهاء",
    value: "5",
    featured: false,
    Icon: HiOutlineCheckBadge,
  },
  {
    id: "rejected",
    title: "مرفوضة ومغلقة",
    value: "15",
    featured: false,
    danger: true,
    Icon: HiExclamationCircle,
  },
];

const Cards = () => {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
    >
      {cards.map((card) => {
        const Icon = card.Icon;

        return (
          <article
            key={card.id}
            className={`flex min-h-[120px] flex-col justify-between gap-2 rounded-[22px] p-4 shadow-card ${
              card.featured
                ? "bg-gradient-to-b from-primary to-primary-dark text-white"
                : "bg-white text-deep"
            }`}
          >
            {/* عنوان يمين | أيقونة شمال */}
            <div className="flex items-center justify-between gap-3">
              <h3
                className={`text-sm font-bold sm:text-base ${
                  card.featured ? "text-white" : "text-deep"
                }`}
              >
                {card.title}
              </h3>
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                  card.featured
                    ? "bg-white/10"
                    : card.danger
                      ? "bg-[#FDECEC]"
                      : "bg-surface"
                }`}
              >
                <Icon
                  className={`size-[22px] ${
                    card.featured
                      ? "text-white"
                      : card.danger
                        ? "text-[#C62828]"
                        : "text-primary"
                  }`}
                />
              </div>
            </div>

            {/* الرقم يمين */}
            <div className="flex items-center justify-start">
              <span
                className={`text-[32px] font-extrabold leading-none ${
                  card.danger && !card.featured ? "text-[#C62828]" : ""
                }`}
              >
                {card.value}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Cards;
