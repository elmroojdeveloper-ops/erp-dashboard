"use client";

import { useRouter } from "next/navigation";
import Cards from "./Cards";
import Header from "./Header";
import Table from "./Table";

const Orders = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Header
        onCreate={() => router.push("/accounts/Purches/orders/CreateOrder")}
      />
      <Cards />
      <Table onView={(rowId) => router.push(`/accounts/Purches/orders/${rowId}`)} />
    </div>
  );
};

export default Orders;
