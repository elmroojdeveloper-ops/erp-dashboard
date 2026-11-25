import { FiTruck } from "react-icons/fi";

const OrderSummary = ({ summary }) => {
  if (!summary) return null;

  const grandTotal = summary.grandTotal || summary.total;
  const vatTotal = summary.vatTotal || summary.vat;
  const paymentMethod = summary.paymentMethod || summary.paymentTerms;

  return (
    <article className="overflow-hidden rounded-xl border border-[#0a5f7d] bg-[#0d658a] text-white shadow-[0_4px_14px_rgba(13,101,138,0.25)]">
      <div className="border-b border-white/15 px-4 py-3">
        <div className="flex items-center justify-between text-[10px] font-semibold text-white/80">
          <span>{summary.title || "ملخص القيمة والالتزام"}</span>
          <span>العملة: {summary.currencyLabel || "SAR (ريال)"}</span>
        </div>
        <p className="mt-2 text-[11px] text-white/85">إجمالي القيمة المعتمدة (شامل الضريبة 15%):</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight tabular-nums">
            {grandTotal}
          </span>
          <span className="text-sm font-bold text-white/80">ر.س</span>
        </p>
      </div>

      <div className="space-y-2.5 px-4 py-4 text-[11px]">
        <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
          <span className="text-white/75">المجموع الفرعي الخاضع للضريبة:</span>
          <span className="shrink-0 font-bold tabular-nums">
            {summary.subtotal} ر.س
          </span>
        </div>
        <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
          <span className="text-white/75">ضريبة القيمة المضافة (15%):</span>
          <span className="shrink-0 font-bold tabular-nums">
            {vatTotal} ر.س
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-white/75">طريقة السداد المعتمدة:</span>
          <span className="max-w-[58%] text-left text-[10px] font-semibold leading-snug">
            {paymentMethod}
          </span>
        </div>
      </div>

      <section className="mx-3 mb-3 rounded-lg bg-[#e8f4f8] p-3 text-[#0d4a63]">
        <p className="mb-2 flex items-center gap-2 text-[11px] font-bold">
          <FiTruck className="h-4 w-4 shrink-0 text-[#0d658a]" />
          <span>تاريخ التسليم المتوقع: {summary.expectedDelivery}</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
          <span className="font-semibold">{summary.deliveryLocation}</span>
          {summary.daysRemaining != null && (
            <span className="font-bold text-[#0d658a]">
              متبقي {summary.daysRemaining} أيام على التوريد
            </span>
          )}
        </div>
      </section>
    </article>
  );
};

export default OrderSummary;