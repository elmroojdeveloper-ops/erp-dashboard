"use client";

import { useMemo, useState } from "react";
import { getPurchaseRequestDetail } from "./mock-data";
import Header from "./Details/Header";
import Tabs from "./Details/Tabs";
import DetailsTap from "./Details/DetailsTap";
import PurchesOfferTap from "./Details/PurchesOfferTap";
import VendorsTap from "./Details/VendorsTap";
import PurchesCommandTap from "./Details/PurchesCommandTap";
import InvoicesTap from "./Details/InvoicesTap";
import ActivityTap from "./Details/ActivityTap";

const Details = ({ id }) => {
  const data = useMemo(() => getPurchaseRequestDetail(id), [id]);
  const [activeTab, setActiveTab] = useState("details");

  const renderTab = () => {
    switch (activeTab) {
      case "details":
        return <DetailsTap data={data} />;
      case "quotes":
        return <PurchesOfferTap />;
      case "offers":
        return <VendorsTap />;
      case "orders":
        return <PurchesCommandTap />;
      case "invoice":
        return <InvoicesTap />;
      case "activity":
        return <ActivityTap />;
      default:
        return <DetailsTap data={data} />;
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 pb-2 lg:gap-5">
      <Header data={data} />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      {renderTab()}
    </div>
  );
};

export default Details;
