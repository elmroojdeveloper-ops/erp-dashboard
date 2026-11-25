"use client";

import { useRouter } from "next/navigation";
import Cards from "./Cards";
import Header from "./Header";
import Table from "./Table";

const Receipts = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Header
        onCreate={() => router.push("/accounts/Purches/receipts/AddRecipt")}
      />
      <Cards />
      <Table
        onView={(id) => router.push(`/accounts/Purches/receipts/${id}`)}
      />
    </div>
  );
};

export default Receipts;
