"use client";

import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineBuildingLibrary, HiOutlineCube } from "react-icons/hi2";
import { purchaseInvoiceDetail } from "../mock-data";

const cardClass =
  "rounded-[14px] border border-[#E8EEF2] bg-white p-5 sm:p-6";

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-3 border-b border-[#F1F5F9] py-2.5 last:border-0">
    <p className="shrink-0 text-[12px] font-medium text-[#94A3B8]">{label}</p>
    <p className="text-left text-sm font-semibold text-[#334155]">{value}</p>
  </div>
);

const InfoCard = ({ title, icon: Icon, data }) => (
  <section className={cardClass}>
    <div className="mb-3 flex items-center gap-2 border-b border-[#E8EEF2] pb-3">
      <span className="flex size-8 items-center justify-center rounded-lg bg-[#EAF3F7] text-primary">
        <Icon className="size-4" />
      </span>
      <h3 className="text-[15px] font-bold text-primary">{title}</h3>
    </div>
    <InfoRow label="الشركة" value={data.company} />
    <InfoRow label="الرقم الضريبي" value={data.taxId} />
    <InfoRow label="العنوان" value={data.address} />
    <InfoRow label="الهاتف" value={data.phone} />
  </section>
);

const InvoicesTap = () => {
  const invoice = purchaseInvoiceDetail;

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Summary */}
      <section className="overflow-hidden rounded-[14px] bg-primary text-white">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-stretch sm:justify-between sm:p-6">
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-white/70">
              المبلغ الإجمالي
            </p>
            <p className="mt-1 text-[28px] font-bold leading-none sm:text-[32px]">
              {invoice.total}{" "}
              <span className="text-base font-semibold">{invoice.currency}</span>
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-3 rounded-[12px] border border-white/20 bg-white/10 p-4 sm:max-w-[520px] sm:grid-cols-2">
            <div>
              <p className="text-[11px] text-white/65">رقم المرجع</p>
              <p className="mt-1 text-sm font-semibold">{invoice.reference}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/65">تاريخ الإصدار</p>
              <p className="mt-1 text-sm font-semibold">{invoice.issueDate}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/65">أمر الشراء المرتبط</p>
              <p className="mt-1 text-sm font-semibold">{invoice.linkedPo}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/65">تاريخ الاستحقاق</p>
              <p className="mt-1 text-sm font-semibold">{invoice.dueDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier + Billing */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <InfoCard
          title="بيانات المورد"
          icon={FiShoppingBag}
          data={invoice.supplier}
        />
        <InfoCard
          title="بيانات الفوترة"
          icon={HiOutlineBuildingLibrary}
          data={invoice.billing}
        />
      </div>

      {/* Payment method */}
      <section className="flex flex-col gap-2 rounded-[14px] border border-[#E8EEF2] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-[#64748B]">
          طريقة الدفع:{" "}
          <span className="font-bold text-[#334155]">
            {invoice.paymentMethod}
          </span>
        </p>
        <p className="text-sm text-[#64748B]">
          العملة:{" "}
          <span className="font-bold text-[#334155]">
            {invoice.currencyLabel}
          </span>
        </p>
      </section>

      {/* Items */}
      <section className="overflow-hidden rounded-[14px] border border-[#E8EEF2] bg-white">
        <div className="flex items-center gap-2 border-b border-[#E8EEF2] px-5 py-4">
          <h2 className="text-[15px] font-bold text-primary">البنود</h2>
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
            {invoice.items.length} بند
          </span>
        </div>

        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-right">
            <thead>
              <tr className="border-b border-cool-gray bg-[#eef3f6] text-[13px] font-semibold text-muted">
                <th className="px-4 py-3">الصنف</th>
                <th className="w-24 px-4 py-3">الكمية</th>
                <th className="w-32 px-4 py-3">سعر الوحدة</th>
                <th className="w-32 px-4 py-3">الضريبة (15%)</th>
                <th className="w-32 px-4 py-3">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-cool-gray last:border-0"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[#E8F4FC] text-primary">
                        <HiOutlineCube className="size-4" />
                      </span>
                      <p className="text-sm font-semibold text-deep">
                        {item.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-deep">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-deep">
                    {item.unitPrice}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-deep">{item.tax}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-deep">
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 bg-primary px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            المجموع الفرعي:{" "}
            <span className="font-bold">{invoice.subtotal} ر.س</span>
          </p>
          <p className="text-sm">
            ضريبة القيمة المضافة:{" "}
            <span className="font-bold">{invoice.vat} ر.س</span>
          </p>
          <p className="text-sm">
            الإجمالي النهائي:{" "}
            <span className="text-base font-bold">
              {invoice.grandTotal} ر.س
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default InvoicesTap;
