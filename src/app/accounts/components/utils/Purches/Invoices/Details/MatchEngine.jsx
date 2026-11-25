import { FiCheck, FiCheckCircle, FiShield } from "react-icons/fi";
import { HiOutlineScale } from "react-icons/hi2";

function badgeStyle(tone) {
  if (tone === "green") {
    return { borderColor: "#B7DFC3", background: "#E6F4EA", color: "#2E7D32" };
  }
  if (tone === "teal") {
    return { borderColor: "#A5F3FC", background: "#ECFEFF", color: "#0E7490" };
  }
  return { borderColor: "#B8D4F0", background: "#E8F4FC", color: "#1B6A9C" };
}

const MatchEngine = ({ engine }) => {
  if (!engine) return null;

  return (
    <section className="overflow-hidden rounded-[14px] border border-[#1a5f82] bg-[#1B4D6E] text-white shadow-[0_4px_20px_rgba(27,77,110,0.25)]">
      <header className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <HiOutlineScale className="size-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[17px] font-bold">{engine.title}</h2>
              <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold">
                ({engine.version})
              </span>
            </div>
            <p className="mt-1 text-[12px] text-white/75">{engine.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-center rounded-xl border border-white/20 bg-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="size-4 text-[#86EFAC]" />
            <span className="text-[20px] font-bold leading-none">{engine.score}.0 %</span>
          </div>
          <p className="mt-1 text-[10px] font-semibold text-white/80">نسبة التطابق الإجمالية</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 bg-[#F0F4F8] p-4 sm:grid-cols-3">
        {engine.cards.map((card) => (
          <MatchCard key={card.n} card={card} />
        ))}
      </div>

      {engine.closeBanner ? (
        <footer className="border-t border-white/10 bg-[#E8F4FC] px-5 py-4 text-[#1E3A5F]">
          <div className="flex gap-3">
            <FiCheckCircle className="mt-0.5 size-5 shrink-0 text-[#2E7D32]" />
            <p className="text-[12px] leading-6">{engine.closeBanner.title}</p>
          </div>
          <p className="mt-2 flex items-center justify-end gap-1 text-[10px] font-bold text-[#1B6A9C]">
            <FiShield className="size-3" />
            {engine.closeBanner.ifrs}
          </p>
        </footer>
      ) : null}
    </section>
  );
};

function MatchCard({ card }) {
  return (
    <article className="relative overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white text-[#1E293B] shadow-sm">
      <span className="absolute end-3 top-3 grid size-7 place-items-center rounded-full bg-[#2578A2] text-[12px] font-bold text-white">
        {card.n}
      </span>
      <header className="border-b border-[#EEF2F6] px-4 pb-3 pt-4">
        <p className="pe-10 text-[13px] font-bold text-[#2C5E7E]">{card.title}</p>
        <span
          className="mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold"
          style={badgeStyle(card.statusTone)}
        >
          {card.status}
        </span>
      </header>
      <ul className="divide-y divide-[#EEF2F6] px-4 py-1">
        {card.rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-2 py-2.5 text-[11px]">
            <span className="text-[#64748B]">{row.label}</span>
            <span
              className={`max-w-[55%] text-end font-bold ${
                row.success
                  ? "text-[#2E7D32]"
                  : row.accent
                    ? "text-[#1B6A9C]"
                    : "text-[#1E293B]"
              }`}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>
      {card.footer ? (
        <p className="flex items-center gap-1 border-t border-[#EEF2F6] px-4 py-2.5 text-[10px] font-bold text-[#2E7D32]">
          {card.footerOk ? <FiCheck className="size-3" /> : null}
          {card.footer}
        </p>
      ) : null}
    </article>
  );
}

export default MatchEngine;