"use client";

const toneDot = {
  blue: "bg-[#1B6A9C]",
  green: "bg-[#2E7D32]",
  orange: "bg-[#D4A017]",
  red: "bg-[#D32F2F]",
};

const titleTone = {
  blue: "text-[#1A2332]",
  green: "text-[#2E7D32]",
  orange: "text-[#8A6A1E]",
  red: "text-[#D32F2F]",
};

const badgeTone = {
  yellow: "bg-[#FFF8E1] text-[#B47C00] border-[#E8C87A]",
  blue: "bg-[#E8F1F7] text-[#1B6A9C] border-[#B9D3E4]",
  green: "bg-[#E6F4EA] text-[#2E7D32] border-[#A7D7B5]",
};

const ActivityTimeline = ({ activities = [] }) => (
  <section className="rounded-[16px] border border-[#E5EDF2] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-6">
    <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF2F6] pb-4">
      <div className="flex items-center gap-2.5">
        <span className="h-5 w-1.5 shrink-0 rounded-full bg-[#C0824A]" />
        <h2 className="text-[16px] font-bold text-[#1A2332]">
          سجل النشاط ومسار التدقيق الزمني
        </h2>
      </div>
      <button
        type="button"
        className="text-[12px] font-bold text-[#1B6A9C] hover:underline"
      >
        تصدير السجل الكامل
      </button>
    </header>

    <ol className="relative">
      {activities.map((item, index) => {
        const isLast = index === activities.length - 1;
        const tone = item.tone || "blue";

        return (
          <li key={item.id} className="relative flex gap-3.5 pb-5 last:pb-0">
            {!isLast ? (
              <span className="absolute start-[9px] top-5 bottom-0 w-px bg-[#E2E8F0]" />
            ) : null}

            <span
              className={`relative z-[1] mt-2 size-2.5 shrink-0 rounded-full ring-[3px] ring-white ${
                toneDot[tone] || toneDot.blue
              }`}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={`text-[13px] font-bold leading-6 ${
                        titleTone[tone] || titleTone.blue
                      }`}
                    >
                      {item.title}
                    </p>
                    {item.badge ? (
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                          badgeTone[item.badgeTone] || badgeTone.yellow
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="mt-1 text-[12px] leading-6 text-[#64748B]">
                      {item.description}
                    </p>
                  ) : null}
                  {item.meta ? (
                    <p className="mt-1 text-[11px] text-[#94A3B8]">{item.meta}</p>
                  ) : null}
                </div>
                <time className="shrink-0 text-[11px] text-[#94A3B8]">
                  {item.at}
                </time>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);

export default ActivityTimeline;
