"use client";

import ActivityTimeline from "./Details/ActivityTimeline";
import ApprovalBanner from "./Details/ApprovalBanner";
import Attachments from "./Details/Attachments";
import AuditPanel from "./Details/AuditPanel";
import ItemsTable from "./Details/ItemsTable";
import OrderSummary from "./Details/OrderSummary";
import SupplierCard from "./Details/SupplierCard";
import Toolbar from "./Details/Toolbar";
import { usePurchaseOrderDetail } from "./Details/usePurchaseOrderDetail";

const Details = ({ id }) => {
  const { data, loading, error } = usePurchaseOrderDetail(id, { useMock: true });

  if (loading) {
    return (
      <div dir="rtl" className="py-12 text-center text-sm text-[#64748b]">
        جاري تحميل أمر الشراء…
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="py-12 text-center text-sm text-[#c62828]">
        تعذر تحميل البيانات. حاول مرة أخرى.
      </div>
    );
  }

  if (!data) return null;

  return (
    <div dir="rtl" className="flex flex-col gap-4 pb-6 text-[#1a2332]">
      <Toolbar data={data} />
      <ApprovalBanner approval={data.approval} />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2 lg:gap-5">
          <ItemsTable items={data.items} totals={data.totals} />
          <AuditPanel audit={data.audit} />
          <ActivityTimeline activities={data.activities} />
        </div>

        <aside className="flex flex-col gap-4 lg:gap-5">
          <OrderSummary summary={data.summary} />
          <SupplierCard supplier={data.supplier} />
          <Attachments files={data.attachments} />
        </aside>
      </div>
    </div>
  );
};

export default Details;