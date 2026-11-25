"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Cards from "../utils/Purches/QuoteRequests/Cards";
import Filters from "../utils/Purches/QuoteRequests/Filters";
import Header from "../utils/Purches/QuoteRequests/Header";
import Table, { EmptyState } from "../utils/Purches/QuoteRequests/Table";
import {
  quoteRequestRows,
  quoteRequestsTotal,
} from "../utils/Purches/Home/mock-data";

const QuoteRequests = () => {
  const router = useRouter();
  const rows = quoteRequestRows;
  const hasData = rows.length > 0;

  const [filters, setFilters] = useState({
    department: "كل الأقسام",
    requester: "",
    requestDate: "",
    status: "all",
    category: "الكل",
    dueDate: "",
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (
        filters.department !== "كل الأقسام" &&
        row.source !== filters.department
      ) {
        return false;
      }
      if (
        filters.requester &&
        !`${row.vendor} ${row.source}`.includes(filters.requester.trim())
      ) {
        return false;
      }
      if (filters.status !== "all" && row.status !== filters.status) {
        return false;
      }
      if (filters.category !== "الكل" && row.category !== filters.category) {
        return false;
      }
      if (filters.requestDate && row.date !== filters.requestDate) {
        return false;
      }
      if (filters.dueDate && row.dueDate !== filters.dueDate) {
        return false;
      }
      return true;
    });
  }, [filters, rows]);

  const onCreate = () => router.push("/accounts/Purches/quote-requests/Add");
  const onCreateNew = () =>
    router.push("/accounts/Purches/quote-requests/AddNew");

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Header onCreate={onCreateNew} />

      {hasData ? <Cards /> : null}

      <Filters filters={filters} setFilters={setFilters} />

      {!hasData ? (
        <EmptyState onCreate={onCreate} />
      ) : (
        <Table
          rows={filteredRows}
          total={quoteRequestsTotal}
          onView={(id) =>
            router.push(`/accounts/Purches/quote-requests/${id}`)
          }
        />
      )}
    </div>
  );
};

export default QuoteRequests;
