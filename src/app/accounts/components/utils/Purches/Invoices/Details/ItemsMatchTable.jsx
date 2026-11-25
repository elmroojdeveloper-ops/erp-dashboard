import { FiPackage } from "react-icons/fi";

const statusPill = (match, label) =>
  match
    ? "border-[#B7DFC3] bg-[#E6F4EA] text-[#2E7D32]"
    : "border-[#F5C6C6] bg-[#FDECEC] text-[#C62828]";

const ItemsMatchTable = ({ lineItems }) => {
  const items = lineItems?.items ?? [];
  const totals = lineItems?.totals;

  return (
    <section className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
      <header className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EEF2F6] px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-1 shrink-0 rounded-full bg-[#2578A2]" />
            <h2 className="text-[15px] font-bold text-[#2C5E7E]">
              تفاصيل بنود الفاتورة والمطابقة التفصيلية
            </h2>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">
            مقارنة البنود المسجّلة والمسعّرة تعاقدياً مع الكميات المستلمة فعلياً
          </p>
        </div>
        <p className="text-[11px] font-semibold text-[#64748B]">
          عدد البنود المعتمدة: {lineItems?.approvedCount ?? items.length} بنود رئيسية
        </p>
      </header>

      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-right">
          <thead>
            <tr className="border-b border-[#E8EEF2] bg-[#F4F7F9] text-[11px] font-semibold text-[#64748B]">
              <th className="w-10 px-2 py-3">#</th>
              <th className="w-14 px-2 py-3 text-center">صورة</th>
              <th className="min-w-[200px] px-3 py-3">البند والمواصفات الفنية</th>
              <th className="px-3 py-3 text-center">كمية أمر الشراء</th>
              <th className="px-3 py-3 text-center">المستلم الفعلي</th>
              <th className="px-3 py-3 text-center">كمية الفاتورة</th>
              <th className="px-3 py-3 text-center">السعر التعاقدي</th>
              <th className="px-3 py-3 text-center">سعر الفاتورة</th>
              <th className="px-3 py-3 text-center">الإجمالي الفرعي</th>
              <th className="w-28 px-3 py-3 text-center">حالة المطابقة</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr
                key={row.id}
                className="border-b border-[#EEF2F6] last:border-0 hover:bg-[#FAFCFD]"
              >
                <td className="px-2 py-4 text-center text-[12px] font-bold text-[#94A3B8]">
                  {index + 1}
                </td>
                <td className="px-2 py-4">
                  <span
                    className={`mx-auto grid size-11 place-items-center rounded-[10px] ${row.imageTone || "bg-[#E8EEF2]"} text-[#64748B]`}
                  >
                    <FiPackage className="size-5" />
                  </span>
                </td>
                <td className="px-3 py-4">
                  <p className="text-[13px] font-bold text-[#1E293B]">
                    {row.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#2578A2]">
                    {row.sku}
                  </p>
                  <p className="mt-1 text-[11px] text-[#64748B]">{row.specs}</p>
                </td>
                <td className="px-3 py-4 text-center text-[13px] font-bold">
                  {row.poQty}
                </td>
                <td className="px-3 py-4 text-center">
                  <p className="text-[13px] font-bold text-[#2E7D32]">{row.grnQty}</p>
                  {row.grnNote ? (
                    <p className="text-[10px] text-[#64748B]">{row.grnNote}</p>
                  ) : null}
                </td>
                <td className="px-3 py-4 text-center text-[13px] font-bold">
                  {row.invoiceQty}
                </td>
                <td className="px-3 py-4 text-center text-[13px] font-semibold text-[#475569]">
                  {row.poUnitPrice}
                </td>
                <td
                  className={`px-3 py-4 text-center text-[13px] font-bold ${
                    row.match ? "text-[#1B6A9C]" : "text-[#DC2626]"
                  }`}
                >
                  {row.invoiceUnitPrice}
                </td>
                <td className="px-3 py-4 text-center text-[13px] font-bold text-[#1E293B]">
                  {row.lineTotal}
                </td>
                <td className="px-3 py-4 text-center">
                  <span
                    className={`inline-flex min-h-[26px] items-center justify-center rounded-[20px] border px-2 text-[10px] font-bold ${statusPill(row.match, row.statusLabel)}`}
                  >
                    {row.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totals ? (
        <footer className="flex flex-col gap-4 border-t border-[#EEF2F6] bg-[#F8FAFB] px-5 py-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid grid-cols-1 gap-2 text-[11px] sm:grid-cols-3">
            <Foot label="إجمالي عدد الوحدات المفوترة" value={`${totals.units} وحدة`} />
            <Foot label="نسبة التفاوت المقبولة" value={totals.variancePct} />
            <div>
              <p className="text-[#64748B]">حالة الفحص الضريبي</p>
              <p className="mt-0.5 font-bold text-[#2E7D32]">{totals.taxStatus}</p>
            </div>
          </div>
          <div className="space-y-1 text-[12px]">
            <Foot
              label="المجموع الفرعي (قبل الضريبة)"
              value={`${totals.subtotal} ${totals.currency}`}
            />
            <Foot
              label="ضريبة القيمة المضافة (15%)"
              value={`${totals.vat} ${totals.currency}`}
            />
          </div>
          <div className="rounded-[12px] border border-[#C8E4F4] bg-white px-4 py-3 text-center lg:min-w-[200px]">
            <p className="text-[10px] font-semibold text-[#64748B]">
              إجمالي الفاتورة النهائي المستحق
            </p>
            <p className="mt-1 text-[22px] font-bold text-[#1B6A9C]">
              {totals.grand}{" "}
              <span className="text-[13px]">{totals.currency}</span>
            </p>
          </div>
        </footer>
      ) : null}
    </section>
  );
};

const Foot = ({ label, value, accent }) => (
  <div>
    <p className="text-[11px] text-[#64748B]">{label}</p>
    <p
      className={`mt-0.5 font-bold ${accent ? "text-[15px] text-[#2578A2]" : "text-[#1E293B]"}`}
    >
      {value}
    </p>
  </div>
);

export default ItemsMatchTable;