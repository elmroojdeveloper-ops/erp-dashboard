"use client";

import {
  FiBookOpen,
  FiCheckCircle,
  FiCpu,
  FiDownload,
  FiFileText,
  FiMoreVertical,
  FiPrinter,
  FiShield,
} from "react-icons/fi";

const badgeClass = {
  green: "border-[#B7DFC3] bg-[#E6F4EA] text-[#2E7D32]",
  teal: "border-[#B8D9EB] bg-[#E8F4FC] text-[#1B6A9C]",
};

const Toolbar = ({ data }) => {
  const h = data.header;

  return (
    <section className="rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-[#1B4D6E] text-white">
            <FiFileText className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <code className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#64748B]">
              UUID: {h.uuid}
            </code>
            <h1 className="mt-2 text-[20px] font-bold text-[#0F172A] sm:text-[22px]">
              فاتورة مورد رقم {data.invoiceNumber}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {h.badges.map((b) => (
                <span
                  key={b.label}
                  className={`inline-flex items-center gap-1.5 rounded-[20px] border px-2.5 py-1 text-[10px] font-bold ${badgeClass[b.tone]}`}
                >
                  {b.tone === "green" ? (
                    <FiCheckCircle className="size-3" />
                  ) : (
                    <FiShield className="size-3" />
                  )}
                  {b.label}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#64748B]">
              <span className="inline-flex items-center gap-1 font-semibold text-[#2E7D32]">
                <FiCpu className="size-3.5" />
                {h.smartCheck}
              </span>
              <span className="hidden h-3 w-px bg-[#CBD5E1] sm:inline" />
              <span>{h.registeredAt}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-14 min-w-[140px] flex-col items-center justify-center gap-0.5 rounded-xl bg-[#1B4D6E] px-4 text-white"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-bold">
              <FiBookOpen className="size-3.5" />
              عرض قيد اليومية
            </span>
            <span className="text-[10px] text-white/75">{h.journalRef}</span>
          </button>
          <button
            type="button"
            className="inline-flex h-14 min-w-[76px] flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-3 text-[#475569]"
          >
            <FiDownload className="size-4" />
            <span className="text-[10px] font-semibold">تحميل</span>
            <span className="text-[9px] text-[#94A3B8]">PDF</span>
          </button>
          <button
            type="button"
            className="inline-flex h-14 min-w-[76px] flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-3 text-[#475569]"
          >
            <FiPrinter className="size-4" />
            <span className="text-[10px] font-semibold">طباعة</span>
            <span className="text-[9px] text-[#94A3B8]">السند</span>
          </button>
          <button
            type="button"
            className="inline-flex size-14 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B]"
            aria-label="المزيد"
          >
            <FiMoreVertical className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Toolbar;