import {
  FiCalendar,
  FiCheckCircle,
  FiExternalLink,
  FiEye,
  FiFileText,
  FiLink,
} from "react-icons/fi";

const card =
  "overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.05)]";

const tagTone = {
  gray: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
  amber: "border-[#F5DFA8] bg-[#FFF8E6] text-[#92600A]",
};

const SummaryCards = ({ official, linkedPo }) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
    <OfficialCard official={official} />
    <LinkedPoCard linkedPo={linkedPo} />
  </div>
);

function OfficialCard({ official }) {
  return (
    <article className={card}>
      <header className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EEF2F6] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#ECF4F8] text-[#2578A2]">
            <FiFileText className="size-[18px]" />
          </span>
          <h2 className="text-[14px] font-bold text-[#2C3E50]">
            بيانات فاتورة المورد الرسمية
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {official.tags?.map((t) => (
            <span
              key={t.label}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${tagTone[t.tone] || tagTone.gray}`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </header>

      <div className="p-5">
        <div className="overflow-hidden rounded-[12px] border border-[#C8E4F4] bg-[#E8F4FC]">
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            <div>
              <p className="text-[11px] font-medium text-[#64748B]">
                صافي قيمة الفاتورة الإجمالية
              </p>
              <p className="mt-1 text-[28px] font-bold leading-none text-[#1B6A9C]">
                {official.total}{" "}
                <span className="text-[14px]">{official.currency}</span>
              </p>
              <p className="mt-2 text-[10px] text-[#64748B]">{official.totalNote}</p>
            </div>
            <span className="hidden w-px bg-[#B8D9EB] md:block" aria-hidden />
            <div className="space-y-2 text-[12px]">
              <KV label="المبلغ الخاضع للضريبة" value={`${official.taxable} ${official.currency}`} />
              <KV
                label={`ضريبة القيمة المضافة ${official.vatRate}`}
                value={`${official.vat} ${official.currency}`}
              />
              <p className="pt-1 text-[11px] font-semibold text-[#1B6A9C]">
                {official.paymentNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="رقم فاتورة المورد التعاقدي" value={official.contractualNumber} />
          <Field label="تاريخ إصدار الفاتورة" value={official.issueDate} calendar />
          <Field label="تاريخ الاستحقاق المحاسبي" value={official.dueDate} calendar />
          <Field label="الرقم الضريبي للمورد" value={official.vendorVat} />
        </div>

        <AttachBar official={official} />
      </div>
    </article>
  );
}

function KV({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[#64748B]">{label}</span>
      <span className="font-bold text-[#1E293B]">{value}</span>
    </div>
  );
}

function Field({ label, value, calendar }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-[#94A3B8]">{label}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[12px] font-bold text-[#334155]">
        {calendar ? <FiCalendar className="size-3.5 text-[#64748B]" /> : null}
        {value}
      </p>
    </div>
  );
}

function AttachBar({ official }) {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#DC2626] shadow-sm">
          <FiFileText className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold text-[#1E293B]">{official.attachment}</p>
          <p className="text-[10px] text-[#64748B]">{official.attachmentNote}</p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2578A2]"
      >
        <FiEye className="size-3.5" />
        معاينة المستند
      </button>
    </div>
  );
}

function LinkedPoCard({ linkedPo }) {
  return (
    <article className={card}>
      <header className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EEF2F6] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#ECF4F8] text-[#2578A2]">
            <FiLink className="size-[18px]" />
          </span>
          <h2 className="text-[14px] font-bold text-[#2C3E50]">
            أمر الشراء والعقد المرتبط
          </h2>
        </div>
        <span className="rounded-full border border-[#B7DFC3] bg-[#E6F4EA] px-2.5 py-0.5 text-[10px] font-bold text-[#2E7D32]">
          {linkedPo.badge}
        </span>
      </header>

      <div className="space-y-3 p-5">
        <div className="rounded-[10px] border border-[#B8D9EB] bg-white px-3 py-2.5">
          <p className="text-[10px] text-[#64748B]">أمر الشراء المرجعي</p>
          <p className="text-[13px] font-bold text-[#1B6A9C]">{linkedPo.poNumber}</p>
          <p className="mt-2 text-[11px] font-semibold text-[#334155]">{linkedPo.approvedVendor}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Field label="إذن استلام المستودع" value={linkedPo.grnNumber} />
          <div>
            <p className="text-[10px] font-medium text-[#94A3B8]">السجل التجاري</p>
            <p className="mt-1 text-[12px] font-bold text-[#334155]">{linkedPo.cr}</p>
            <p className="mt-1 text-[10px] font-semibold text-[#1B6A9C]">{linkedPo.vendorTier}</p>
          </div>
        </div>

        <div className="rounded-[10px] bg-[#E8F4FC] px-3 py-3 text-[11px] leading-6 text-[#334155]">
          <p>
            <span className="font-semibold text-[#64748B]">إجمالي حجم التوريد: </span>
            {linkedPo.supplyVolume}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-[#64748B]">مركز التكلفة: </span>
            {linkedPo.costCenter}
          </p>
          <p className="mt-2 font-bold text-[#1B6A9C]">
            المتبقي في الميزانية: {linkedPo.budgetRemaining} {linkedPo.budgetCurrency}
          </p>
          <p className="text-[10px] text-[#64748B]">{linkedPo.budgetNote}</p>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EEF2F6] pt-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32]">
            <FiCheckCircle className="size-3.5" />
            {linkedPo.footerOk}
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2578A2]"
          >
            {linkedPo.contractLink}
            <FiExternalLink className="size-3" />
          </a>
        </footer>
      </div>
    </article>
  );
}

export default SummaryCards;