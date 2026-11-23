"use client";

import React from "react";
import Header from "../utils/Reports/Header";
import Cards from "../utils/Reports/Cards";
import SalesbarChart from "../utils/Reports/SalesbarChart";
import SalesDotChart from "../utils/Reports/SalesDotChart";
import AgingTable from "../utils/Reports/AgingTable";
import UpperClients from "../utils/Reports/UpperClients";
import CreditNotesSummary from "../utils/Reports/CreditNotesSummary";
import UpcomingAndComplianceFooter from "../utils/Reports/UpcomingAndComplianceFooter";

const Reports = () => {
  return (
    <div className="flex flex-col gap-5 pb-2 sm:gap-6">
      <Header />
      <Cards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
        <div className="lg:col-span-2">
          <SalesDotChart/>
         
      
        </div>
         <SalesbarChart />
      </div>
      <AgingTable/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<UpperClients/>
<CreditNotesSummary/>
      </div>
      <UpcomingAndComplianceFooter/>
    </div>
  );
};

export default Reports;
