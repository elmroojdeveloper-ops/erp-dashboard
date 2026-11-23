"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Header from "./Details/Header";
import Cards from "./Details/Cards";
import Table from "./Details/Table";
import NeedRevision from "./Details/NeedRevision";
import Notes from "./Details/Notes";
import { getAuditDetail } from "./Details/mock-data";

const Details = ({ id }) => {
  const router = useRouter();
  const detail = useMemo(() => getAuditDetail(id), [id]);
  const [isClosed, setIsClosed] = useState(detail.isClosed);

  useEffect(() => {
    setIsClosed(detail.isClosed);
  }, [detail]);

  const openEntry = (entryKey) => {
    if (!entryKey || !id) return;
    router.push(
      `/accounts/AuditProcess/${encodeURIComponent(id)}/${encodeURIComponent(entryKey)}`
    );
  };

  return (
    <div className="flex flex-col gap-0 pb-2">
      <Header
        title={detail.title}
        dateRange={detail.dateRange}
        progress={detail.progress}
        reviewedCount={detail.reviewedCount}
        totalCount={detail.totalCount}
        isClosed={isClosed}
        onCloseAudit={() => setIsClosed(true)}
        onBack={() => router.push("/accounts/AuditProcess")}
      />
      <Cards stats={detail.stats} />
      <Table
        rows={detail.entries}
        auditId={id}
        onViewClick={(row) => openEntry(row.entryNumber || row.id)}
      />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <NeedRevision
          items={detail.revisionItems}
          onSelectEntry={(item) => openEntry(item.entryNumber || item.id)}
        />
        <Notes notes={detail.notes} />
      </div>
    </div>
  );
};

export default Details;
