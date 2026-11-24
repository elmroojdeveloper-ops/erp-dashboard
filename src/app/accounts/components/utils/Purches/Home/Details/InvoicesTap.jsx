"use client";

import {
  FiCheck,
  FiCreditCard,
  FiExternalLink,
  FiKey,
  FiMail,
  FiMapPin,
  FiPhone,
  FiServer,
  FiShoppingBag,
} from "react-icons/fi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { purchaseInvoiceDetail } from "../mock-data";

const softIconBox =
  "flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#ECF4F8] text-[#2578A2]";

const solidIconBox =
  "flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#2578A2] text-white shadow-[0_2px_6px_rgba(37,120,162,0.35)]";

const infoCardClass =
  "rounded-[16px] border border-[#94A3B8] border-r-[8px] border-r-[#2578A2] bg-white p-6 shadow-[0_2px_8px_rgba(35,70,90,0.06)]";

const InfoRow = ({ label, value, valueIcon: ValueIcon }) => (
  <div className="flex items-center justify-between gap-4 py-2.5">
    <p className="shrink-0 text-[13px] font-medium text-[#7F8C8D]">{label}</p>
    <div className="flex max-w-[70%] items-center gap-1.5">
      {ValueIcon ? (
        <ValueIcon className="size-3.5 shrink-0 text-[#2578A2]" />
      ) : null}
      <p className="text-[13px] font-bold leading-5 text-[#2C3E50]">{value}</p>
    </div>
  </div>
);

const MetaItem = ({ label, children }) => (
  <div className="min-w-0">
    <p className="text-[11px] font-medium text-white/70">{label}</p>
    <div className="mt-1 text-[13px] font-semibold text-white">{children}</div>
  </div>
);

const InvoicesTap = () => {
  const invoice = purchaseInvoiceDetail;

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Blue summary card */}
      <section className="relative overflow-hidden rounded-[14px] bg-[#2578A2] text-white">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-white/10"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 -right-20 size-40 rounded-full bg-white/5"
        />

        <div className="relative z-[1] flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          {/* Amount — RTL right */}
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-white/80">
              المبلغ الإجمالي (شامل الضريبة)
            </p>
            <p className="mt-2 text-[30px] font-bold leading-none tracking-tight sm:text-[34px]">
              {invoice.total}{" "}
              <span className="text-[16px] font-semibold">
                {invoice.currency}
              </span>
            </p>
            <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#2578A2]">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#2578A2] text-white">
                <FiCheck className="size-2.5 stroke-[3]" />
              </span>
              {invoice.paymentStatus}
            </span>
          </div>

          {/* Meta panel — RTL left, 2×2 */}
          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-4 rounded-[12px] border border-white/20 bg-white/10 p-4 sm:max-w-[420px]">
            <MetaItem label="المرجع">{invoice.reference}</MetaItem>
            <MetaItem label="تاريخ الإصدار">{invoice.issueDate}</MetaItem>
            <MetaItem label="تاريخ الاستحقاق">{invoice.dueDate}</MetaItem>
            <MetaItem label="أمر الشراء المرتبط">
              <span className="inline-flex items-center gap-1.5">
                {invoice.linkedPo}
                <FiExternalLink className="size-3.5 opacity-90" />
              </span>
            </MetaItem>
          </div>
        </div>
      </section>

      {/* Supplier + Billing */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={infoCardClass}>
          <div className="mb-4 flex items-center gap-2.5">
            <span className={solidIconBox}>
              <FiShoppingBag className="size-[18px] text-white" />
            </span>
            <h3 className="text-[15px] font-bold text-[#34495E]">
              بيانات المورد
            </h3>
          </div>
          <InfoRow label="الشركة" value={invoice.supplier.company} />
          <InfoRow label="الرقم الضريبي" value={invoice.supplier.taxId} />
          <InfoRow
            label="العنوان"
            value={invoice.supplier.address}
            valueIcon={FiMapPin}
          />
          <InfoRow
            label="الهاتف"
            value={invoice.supplier.phone}
            valueIcon={FiPhone}
          />
        </section>

        <section className={infoCardClass}>
          <div className="mb-4 flex items-center gap-2.5">
            <span className={solidIconBox}>
              <HiOutlineBuildingLibrary className="size-[18px] text-white" />
            </span>
            <h3 className="text-[15px] font-bold text-[#34495E]">
              بيانات الفوترة
            </h3>
          </div>
          <InfoRow label="الشركة" value={invoice.billing.company} />
          <InfoRow label="الرقم الضريبي" value={invoice.billing.taxId} />
          <InfoRow
            label="العنوان"
            value={invoice.billing.address}
            valueIcon={FiMapPin}
          />
          <InfoRow
            label="الهاتف"
            value={invoice.billing.email}
            valueIcon={FiMail}
          />
        </section>
      </div>

      {/* Payment method */}
      <section className="flex flex-col gap-4 rounded-[10px] bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(35,70,90,0.06)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className={solidIconBox}>
            <FiCreditCard className="size-[18px] text-white" />
          </span>
          <div>
            <p className="text-[12px] font-medium text-[#64748B]">
              طريقة الدفع
            </p>
            <p className="mt-0.5 text-[13px] font-bold text-[#2578A2]">
              {invoice.paymentMethod}
            </p>
          </div>
          <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[12px] font-semibold text-[#64748B]">
            {invoice.transactionId}
          </span>
        </div>

        <div className="hidden h-10 w-px bg-[#E8EEF2] sm:block" />

        <div className="sm:text-left">
          <p className="text-[12px] font-medium text-[#64748B]">العملة</p>
          <p className="mt-0.5 text-[13px] font-bold text-[#1E293B]">
            {invoice.currencyLabel}
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white">
        <div className="flex items-center gap-2 px-5 py-4">
          <h2 className="text-[15px] font-bold text-[#2C5E7E]">البنود</h2>
          <span className="rounded-full bg-[#2C5E7E] px-2.5 py-0.5 text-[11px] font-bold text-white">
            {invoice.items.length} بنود
          </span>
        </div>

        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-right">
            <thead>
              <tr className="border-y border-[#E8EEF2] bg-[#F4F7F9] text-[13px] font-semibold text-[#64748B]">
                <th className="px-4 py-3.5 text-right">البند</th>
                <th className="w-24 px-4 py-3.5 text-center">الكمية</th>
                <th className="w-36 px-4 py-3.5 text-center">سعر الوحدة</th>
                <th className="w-28 px-4 py-3.5 text-center">الضريبة</th>
                <th className="w-40 px-4 py-3.5 text-center">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => {
                const ItemIcon = item.icon === "key" ? FiKey : FiServer;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-[#E8EEF2] last:border-0"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className={softIconBox}>
                          <ItemIcon className="size-[18px]" color="#2578A2" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-[#334155]">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-[12px] text-[#94A3B8]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-[13px] text-[#334155]">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-center text-[13px] text-[#334155]">
                      {item.unitPrice}{" "}
                      <span className="text-[11px] font-medium text-[#94A3B8]">
                        ر.س
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-[13px] text-[#334155]">
                      {item.taxLabel}
                    </td>
                    <td className="px-4 py-4 text-center text-[13px] font-bold text-[#334155]">
                      {item.total}{" "}
                      <span className="text-[11px] font-medium text-[#94A3B8]">
                        ر.س
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/25 bg-[#307DA2] text-white sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-white/25">
          <div className="px-5 py-4 text-center sm:text-right">
            <p className="text-[12px] font-medium text-white/80">
              المجموع الفرعي
            </p>
            <p className="mt-1 text-[15px] font-bold">
              {invoice.subtotal}{" "}
              <span className="text-[12px] font-semibold">ر.س</span>
            </p>
          </div>
          <div className="px-5 py-4 text-center sm:text-right">
            <p className="text-[12px] font-medium text-white/80">
              ضريبة القيمة المضافة (15%)
            </p>
            <p className="mt-1 text-[15px] font-bold">
              {invoice.vat}{" "}
              <span className="text-[12px] font-semibold">ر.س</span>
            </p>
          </div>
          <div className="px-5 py-4 text-center sm:text-right">
            <p className="text-[12px] font-medium text-white/80">
              الإجمالي النهائي
            </p>
            <p className="mt-1 text-[16px] font-bold">
              {invoice.grandTotal}{" "}
              <span className="text-[12px] font-semibold">ر.س</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoicesTap;
