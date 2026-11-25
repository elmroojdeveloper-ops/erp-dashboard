import { HiOutlineOfficeBuilding } from "react-icons/hi";

const SupplierCard = ({ supplier }) => {
  if (!supplier) return null;

  const tier = supplier.tierBadge || supplier.tier;

  return (
    <article className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
      <header className="mb-3 flex items-start justify-between gap-2 border-b border-[#eef2f6] pb-3">
        <div className="flex min-w-0 items-start gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#0d658a] text-white">
            <HiOutlineOfficeBuilding className="size-4" />
          </span>
          <div>
            <h2 className="text-[13px] font-extrabold text-[#0f172a]">بيانات المورد المعتمد</h2>
            {supplier.subtitle ? (
              <p className="mt-0.5 text-[10px] font-medium text-[#94a3b8]">{supplier.subtitle}</p>
            ) : null}
          </div>
        </div>
        {tier ? (
          <span className="shrink-0 rounded-md border border-[#bbf7d0] bg-[#ecfdf5] px-2 py-0.5 text-[9.5px] font-extrabold text-[#15803d]">
            {tier}
          </span>
        ) : null}
      </header>

      <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafc] p-2.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#e2e8f0] bg-white text-[#0d658a]">
          <HiOutlineOfficeBuilding className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-extrabold text-[#0f172a]">{supplier.name}</p>
          {supplier.cr ? (
            <p className="text-[10px] font-semibold text-[#64748b]">سجل تجاري: {supplier.cr}</p>
          ) : null}
        </div>
      </div>

      <dl className="space-y-2.5 text-[11px]">
        <DtRow label="الرقم الضريبي (VAT ID):" value={supplier.vat} />
        <DtRow label="العنوان المسجل:" value={supplier.address} multiline />
        <DtRow label="جهة الاتصال الرسمية:" value={supplier.contact} />
        <DtRow label="رقم الهاتف المعتمد:" value={supplier.phone} />
      </dl>

      {supplier.iban ? (
        <div className="mt-3 border-t border-[#eef2f6] pt-3">
          <p className="mb-1.5 text-[10px] font-bold text-[#94a3b8]">
            الحساب البنكي المعتمد للصرف (IBAN):
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafc] px-3 py-2.5">
            {supplier.bankName ? (
              <span className="text-[11px] font-bold text-[#64748b]">{supplier.bankName}</span>
            ) : null}
            <span className="font-mono text-[10px] font-extrabold text-[#0f172a]">{supplier.iban}</span>
          </div>
        </div>
      ) : null}
    </article>
  );
};

function DtRow({ label, value, multiline }) {
  if (!value) return null;
  return (
    <div className={`flex gap-3 ${multiline ? "flex-col gap-0.5" : "flex-row justify-between"}`}>
      <dt className="shrink-0 font-semibold text-[#94a3b8]">{label}</dt>
      <dd className={`font-bold text-[#334155] ${multiline ? "leading-relaxed" : "text-left"}`}>{value}</dd>
    </div>
  );
}

export default SupplierCard;