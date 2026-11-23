import { FiRefreshCw } from "react-icons/fi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { LuTrendingUp } from "react-icons/lu";
import { entriesCards } from "./mock-data";

const iconMap = {
  today: HiOutlineClipboardDocumentCheck,
  published: FiRefreshCw,
  pending: FiRefreshCw,
};

const Cards = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {entriesCards.map((card) => {
        const Icon = iconMap[card.id] || FiRefreshCw;

        return (
          <article
            key={card.id}
            className={`flex flex-col gap-2 rounded-[22px] p-4 shadow-card ${
              card.featured
                ? "bg-gradient-to-b from-primary to-primary-dark text-white"
                : "bg-white text-deep"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                  card.featured ? "bg-white/10" : "bg-surface"
                }`}
              >
                <Icon
                  className={`size-[22px] ${
                    card.featured ? "text-white" : "text-primary"
                  }`}
                />
              </div>
              <h3
                className={`text-sm font-bold sm:text-base ${
                  card.featured ? "text-white" : "text-muted"
                }`}
              >
                {card.title}
              </h3>
            </div>

            <div className="flex items-center justify-end gap-2">
              {card.showTrend && <LuTrendingUp className="size-[22px]" />}
              <span className="text-[32px] font-extrabold leading-none">
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
