"use client";

import Cards from "../utils/PaymentReview/Cards";
import TopHeader from "../utils/PaymentReview/Header";
import Table from "../utils/PaymentReview/Table";

const PaymentReview = () => {
  return (
    <div className="flex flex-col gap-4 pb-2 sm:gap-5 lg:gap-6">
      <TopHeader />
      <Cards />
      <Table />
    </div>
  );
};

export default PaymentReview;
