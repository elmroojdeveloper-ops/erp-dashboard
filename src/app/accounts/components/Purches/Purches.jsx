"use client";

import { useRouter } from "next/navigation";
import Header from "../utils/Purches/Home/Header";
import Table from "../utils/Purches/Home/Table";
import { purchaseRequestRows } from "../utils/Purches/Home/mock-data";

const Purches = () => {
  const router = useRouter();
  const rows = purchaseRequestRows;
  const hasData = rows.length > 0;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Header
        hasData={hasData}
        onCreate={() => router.push("/accounts/Purches/Add")}
      />
      <Table
        rows={rows}
        onCreate={() => router.push("/accounts/Purches/Add")}
        onView={(id) => router.push(`/accounts/Purches/${id}`)}
      />
    </div>
  );
};

export default Purches;
