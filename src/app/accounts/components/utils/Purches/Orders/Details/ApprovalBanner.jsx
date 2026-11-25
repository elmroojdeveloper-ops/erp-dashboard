import { FiCheck, FiRotateCcw, FiShield } from "react-icons/fi";

const ApprovalBanner = ({ approval }) => {
  if (!approval) return null;

  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-[#e5ddd0] bg-[#f2efe6] px-4 py-4 shadow-[0_1px_2px_rgba(74,48,32,0.06)] sm:px-5 sm:py-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f5e6b8] text-[#6b4a2e]">
            <span className="relative">
              <FiShield className="size-6 stroke-[1.75]" />
              <FiCheck className="absolute -bottom-0.5 -start-0.5 size-3 rounded-full bg-[#f5e6b8] stroke-[3]" />
            </span>
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[13.5px] font-extrabold leading-snug text-[#4a3020] sm:text-[14px]">
                {approval.title}
              </h2>
              {approval.authorityBadge ? (
                <span className="inline-flex shrink-0 items-center rounded-md border border-[#e5c76b] bg-[#f5e082] px-2 py-0.5 text-[10px] font-extrabold text-[#5c3d1f]">
                  {approval.authorityBadge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-[11.5px] font-medium leading-[1.75] text-[#5c4030] sm:text-[12px]">
              {approval.body}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5 lg:gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#006d44] px-5 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-[#005a38]"
          >
            <span>اعتماد أمر الشراء</span>
            <span className="grid size-5 place-items-center rounded-full bg-white/20">
              <FiCheck className="size-3.5 stroke-[3]" />
            </span>
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d6d3c4] bg-white px-4 text-[12px] font-bold text-[#4a3020] shadow-sm transition hover:bg-[#faf9f7]"
          >
            <span>رفض / إعادة للتعديل</span>
            <FiRotateCcw className="size-4 shrink-0 text-[#7a6450]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApprovalBanner;