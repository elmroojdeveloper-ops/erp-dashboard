"use client";

import { useRouter } from "next/navigation";
import Header from "../utils/Purches/Invoices/Header";
import Cards from "../utils/Purches/Invoices/Cards";
import Table from "../utils/Purches/Invoices/Table";

const PurchesInvoices = () => {
  const router = useRouter();

  return (
  <>
    <Header />
    <Cards />
    <Table
      onAction={(action, row) => {
        if (action === "view") {
          router.push(`/accounts/Purches/invoices/${row.id}`);
        }
      }}
    />
  </>
  );
};

export default PurchesInvoices;