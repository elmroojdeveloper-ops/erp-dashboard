"use client";

import ActivityTimeline from "./Details/ActivityTimeline";
import Attachments from "./Details/Attachments";
import CostCenter from "./Details/CostCenter";
import Header from "./Details/Header";
import ItemsTable from "./Details/ItemsTable";
import { getQuoteRequestDetail } from "./Details/mock-data";
import Requester from "./Details/Requester";
import VendorsOffers from "./Details/VendorsOffers";

const Details = ({ id }) => {
  const data = getQuoteRequestDetail(id);

  return (
    <div dir="rtl" className="flex flex-col gap-4 pb-4 text-[#1A2332]">
      <Header data={data} />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2 lg:gap-5">
          <ItemsTable
            items={data.items}
            linkedPr={data.linkedPr}
            itemsCount={data.itemsCount}
            footerNote={data.itemsFooterNote}
          />
          <VendorsOffers
            vendors={data.vendors}
            stats={data.vendorStats}
            rfqId={data.id}
          />
          <ActivityTimeline activities={data.activities} />
        </div>

        <aside className="flex flex-col gap-4 lg:gap-5">
          <CostCenter data={data.costCenter} />
          <Requester data={data.requester} />
          <Attachments files={data.attachments} />
        </aside>
      </div>
    </div>
  );
};

export default Details;
