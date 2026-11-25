import { FiCheck, FiShield } from "react-icons/fi";

const AuditPanel = ({ audit }) => {
  if (!audit) return null;

  const approver = audit.approver ?? {};

  return (
    <section className="rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EEF2F6] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 shrink-0 rounded-full bg-[#C0824A]" />
          <h2 className="text-[14px] font-bold text-[#2C5E7E]">
            التوجيه المحاسبي والرقابة الداخلية
          </h2>
        </div>
        <span className="rounded-md border border-[#B7DFC3] bg-[#E6F4EA] px-2 py-1 text-[10px] font-bold text-[#2E7D32]">
          {audit.governanceBadge}
        </span>
      </header>

      <div className="space-y-4 px-4 py-4">
        <div className="rounded-[10px] border border-[#E8EEF2] bg-[#F8FAFB] px-3 py-3">
          <p className="mb-1 flex items-center gap-1 text-[11px] font-bold text-[#334155]">
            <FiCheck className="size-3.5 text-[#2E7D32]" />
            مذكرة التدقيق المالي الآلي
          </p>
          <p className="text-[12px] leading-6 text-[#475569]">{audit.auditNote}</p>
        </div>

        <div className="rounded-[10px] border border-[#E2E8F0] px-3 py-3">
          <p className="text-[10px] font-semibold text-[#94A3B8]">
            المسؤول عن التوجيه والاعتماد النهائي
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div>
              <p className="text-[13px] font-bold text-[#1E293B]">{approver.name}</p>
              <p className="text-[11px] text-[#64748B]">{approver.role}</p>
              {approver.digitalApproved ? (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-bold text-[#2E7D32]">
                  <FiShield className="size-3" />
                  معتمد رقمياً
                </span>
              ) : null}
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-[#E8F4FC] text-[12px] font-bold text-[#1B6A9C]">
              {approver.initials}
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {(audit.checklist ?? []).map((item) => (
            <li key={item} className="flex items-start gap-2 text-[11px] text-[#475569]">
              <FiCheck className="mt-0.5 size-3.5 shrink-0 text-[#2E7D32]" />
              {item}
            </li>
          ))}
        </ul>

        <p className="break-all font-mono text-[10px] text-[#94A3B8]">{audit.hash}</p>
      </div>
    </section>
  );
};

export default AuditPanel;