"use client";

import AccountingJournal from "./Details/AccountingJournal";
import ActivityLog from "./Details/ActivityLog";
import AuditPanel from "./Details/AuditPanel";
import ItemsMatchTable from "./Details/ItemsMatchTable";
import MatchEngine from "./Details/MatchEngine";
import { getPurchaseInvoiceMatchDetail } from "./Details/mock-data";
import StickyFooter from "./Details/StickyFooter";
import SummaryCards from "./Details/SummaryCards";
import Toolbar from "./Details/Toolbar";

const Details = ({ id }) => {
  const data = getPurchaseInvoiceMatchDetail(id);

  return (
    <div dir="rtl" className="flex flex-col gap-4 pb-24 text-[#1A2332]">
      <Toolbar data={data} />
      <SummaryCards official={data.official} linkedPo={data.linkedPo} />
      <MatchEngine engine={data.matchEngine} />
      <ItemsMatchTable lineItems={data.lineItems} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr]">
        <AccountingJournal accounting={data.accounting} />
        <AuditPanel audit={data.audit} />
      </div>

      <ActivityLog activities={data.activities} />

      <StickyFooter footer={data.footer} />
    </div>
  );
};

export default Details;