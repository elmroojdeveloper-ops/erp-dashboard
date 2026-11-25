import { FiArrowLeft, FiInfo } from "react-icons/fi";

const AccountingJournal = ({ accounting }) => {
  if (!accounting?.parties?.length) {
    return (
      <section className="rounded-[14px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
        <SectionTitle />
        <p className="text-[12px] text-[#64748B]">
          لا يوجد قيد مرحّل — مطلوب اعتماد الفاتورة أولاً.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
      <header className="border-b border-[#EEF2F6] px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <SectionTitle />
          <span className="rounded-md bg-[#F1F5F9] px-2 py-1 text-[10px] font-bold text-[#475569]">
            JE — {accounting.journalRef?.replace("JE-", "")}
          </span>
        </div>
        <p className="mt-3 text-[12px] leading-6 text-[#64748B]">{accounting.intro}</p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-right text-[12px]">
          <thead>
            <tr className="border-b border-[#EEF2F6] bg-[#F8FAFB] text-[11px] font-semibold text-[#64748B]">
              <th className="px-4 py-3">الطرف المحاسبي</th>
              <th className="px-4 py-3 text-center">مدين</th>
              <th className="px-4 py-3 text-center">دائن</th>
            </tr>
          </thead>
          <tbody>
            {accounting.parties.map((row) => (
              <tr key={row.id} className="border-b border-[#EEF2F6] last:border-0">
                <td className="px-4 py-3">
                  <p className="font-bold text-[#1E293B]">{row.party}</p>
                  <p className="text-[10px] text-[#94A3B8]">{row.code}</p>
                </td>
                <td className="px-4 py-3 text-center font-bold text-[#2E7D32]">
                  {row.debit}
                </td>
                <td className="px-4 py-3 text-center font-bold text-[#C62828]">
                  {row.credit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="space-y-2 border-t border-[#EEF2F6] px-5 py-4">
        <p className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
          <FiInfo className="size-3.5 shrink-0" />
          {accounting.footerNote}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2578A2]"
        >
          <FiArrowLeft className="size-3.5" />
          {accounting.ledgerLink}
        </button>
      </footer>
    </section>
  );
};

function SectionTitle() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-5 w-1 shrink-0 rounded-full bg-[#2578A2]" />
      <h2 className="text-[14px] font-bold text-[#2C5E7E]">
        سجل المطابقة والأثر المحاسبي
      </h2>
    </div>
  );
}

export default AccountingJournal;