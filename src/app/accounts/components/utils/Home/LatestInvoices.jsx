const invoices = [
  {
    id: "#INV-2024-001",
    client: "شركة الحلول المتقدمة",
    amount: "12,500 ر.س",
    status: "مباشر",
    statusClass: "bg-surface text-primary",
    date: "2024/05/20",
  },
  {
    id: "#INV-2024-002",
    client: "مؤسسة الأمل للتجارة",
    amount: "8,200 ر.س",
    status: "جزئي",
    statusClass: "bg-[#FFDDA4] text-gray",
    date: "2024/05/19",
  },
  {
    id: "#INV-2024-003",
    client: "شركة الرؤية الحديثة",
    amount: "15,750 ر.س",
    status: "نهائي",
    statusClass: "bg-[#D5FFE5] text-primary",
    date: "2024/05/19",
  },
  {
    id: "#INV-2024-004",
    client: "مصنع نجد للبلاستيك",
    amount: "22,000 ر.س",
    status: "مباشر",
    statusClass: "bg-surface text-primary",
    date: "2024/05/17",
  },
];

const LatestInvoices = () => {
  return (
    <section className="rounded-[18px] bg-white p-3 shadow-card sm:rounded-[22px] sm:p-4">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <h3 className="text-sm font-semibold text-deep sm:text-base">آخر الفواتير</h3>
        <button type="button" className="text-xs font-medium text-primary">
          عرض الكل
        </button>
      </div>

      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-right text-xs">
          <thead>
            <tr className="bg-surface text-gray">
              <th className="rounded-e-xl px-3 py-2.5 font-medium">رقم الفاتورة</th>
              <th className="px-3 py-2.5 font-medium">العميل</th>
              <th className="px-3 py-2.5 font-medium">المبلغ</th>
              <th className="px-3 py-2.5 font-medium">الحالة</th>
              <th className="rounded-s-xl px-3 py-2.5 font-medium">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((row) => (
              <tr key={row.id} className="border-b border-surface text-deep last:border-0">
                <td className="px-3 py-3.5 font-medium">{row.id}</td>
                <td className="px-3 py-3.5 font-medium">{row.client}</td>
                <td className="px-3 py-3.5 font-medium">{row.amount}</td>
                <td className="px-3 py-3.5">
                  <span
                    className={`inline-flex min-w-[50px] items-center justify-center rounded-[22px] px-2 py-1.5 text-xs font-bold ${row.statusClass}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-3.5 font-medium">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LatestInvoices;
