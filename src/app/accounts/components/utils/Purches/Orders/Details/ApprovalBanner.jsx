import { FiCheck, FiRotateCcw, FiShield } from "react-icons/fi";

const ApprovalBanner = ({ approval }) => {
  if (!approval) return null;

  return (
    <section className="rounded-xl border border-[#fde68a] bg-[#fffbeb] px-4 py-4 shadow-[0_1px_3px_rgba(180,83,9,0.06)] sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="flex min-w-0 flex-1 gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#fef3c7] text-[#b45309]">
            <FiShield className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start gap-2">
              <p className="text-[13px] font-extrabold leading-snug text-[#92400e]">
                {approval.title}
              </p>
              {approval.authorityBadge ? (
                <span className="rounded-md border border-[#fde68a] bg-[#fff8e6] px-1.5 py-2 text-[9px] font-extrabold leading-tight text-[#b45309] [writing-mode:vertical-rl]">
                  {approval.authorityBadge}
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 text-[11.5px] leading-6 text-[#78350f]">{approval.body}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[12px] font-bold text-[#475569] shadow-sm"
          >
            <FiRotateCcw className="size-3.5" />
            رفض / إعادة للتعديل
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#095c7a] px-5 text-[12px] font-extrabold text-white shadow-sm hover:bg-[#074961]"
          >
            <FiCheck className="size-3.5" />
            اعتماد أمر الشراء
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApprovalBanner;