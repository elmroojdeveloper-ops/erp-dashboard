import { FiClock, FiDownload } from "react-icons/fi";

const toneDot = {
  orange: "bg-[#ea580c]",
  green: "bg-[#16a34a]",
  amber: "bg-[#ca8a04]",
  yellow: "bg-[#ca8a04]",
  blue: "bg-[#0d658a]",
  gray: "bg-[#94a3b8]",
};

const ActivityTimeline = ({ activities = [] }) => (
  <section className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
    <header className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-[#eef2f6] pb-3">
      <div className="flex items-start gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-[#0d658a] text-white">
          <FiClock className="size-4" />
        </span>
        <hgroup>
          <h2 className="text-[14px] font-extrabold text-[#0f172a]">
            سجل الأحداث والتدقيق التاريخي (Audit Trail)
          </h2>
          <p className="mt-0.5 text-[10.5px] font-medium text-[#94a3b8]">
            توثيق ثابت غير قابل للتعديل لجميع العمليات المنجزة
          </p>
        </hgroup>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0d658a] hover:underline"
      >
        <FiDownload className="size-3.5" />
        تصدير سجل التدقيق
      </button>
    </header>

    <ol className="space-y-4">
      {activities.map((item) => (
        <li key={item.id} className="flex flex-col gap-2 border-b border-[#f1f5f9] pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
          <ActivityRowMain item={item} />
          <ActivityRowMeta item={item} />
        </li>
      ))}
    </ol>
  </section>
);

function ActivityRowMain({ item }) {
  const dot = toneDot[item.tone] || toneDot.blue;
  return (
    <section className="flex min-w-0 flex-1 gap-2.5">
      <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${dot}`} aria-hidden />
      <span>
        <p className="text-[12.5px] font-extrabold text-[#1e293b]">{item.title}</p>
        {item.description ? (
          <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748b]">{item.description}</p>
        ) : null}
      </span>
    </section>
  );
}

function ActivityRowMeta({ item }) {
  return (
    <div className="shrink-0 text-left text-[10px] font-medium text-[#94a3b8] sm:max-w-[42%]">
      <p className="font-bold text-[#64748b]">{item.time}</p>
      <p className="mt-0.5">بواسطة: {item.by}</p>
    </div>
  );
}

export default ActivityTimeline;