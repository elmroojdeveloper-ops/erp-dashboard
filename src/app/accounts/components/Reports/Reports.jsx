"use client";

import React from "react";
import Header from "../utils/Reports/Header";
import Cards from "../utils/Reports/Cards";
import RevenueChart from "../utils/Reports/RevenueChart";
import ExpensePie from "../utils/Reports/ExpensePie";
import CashFlowChart from "../utils/Reports/CashFlowChart";
import ReportsList from "../utils/Reports/ReportsList";

const Reports = () => {
  return (
    <div className="flex flex-col gap-5 pb-2 sm:gap-6">
      <Header />
      <Cards />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.55fr_1fr]">
        <RevenueChart />
        <ExpensePie />
      </div>

      <CashFlowChart />
      <ReportsList />
    </div>
  );
};

export default Reports;
