"use client";

import {
  FiCheck,
  FiCloud,
  FiCpu,
  FiPackage,
} from "react-icons/fi";

const iconByKey = {
  check: FiCheck,
  cpu: FiCpu,
  cloud: FiCloud,
  package: FiPackage,
};

const toneRing = {
  green: "bg-[#E6F4EA] text-[#2E7D32] border-[#B7DFC3]",
  blue: "bg-[#E8F4FC] text-[#1B6A9C] border-[#B8D9EB]",
  sky: "bg-[#ECFEFF] text-[#0E7490] border-[#A5F3FC]",
  gray: "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]",
};

const ActivityLog = ({ activities = [] }) => (
  <section className="rounded-[14px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
    <header className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#EEF2F6] pb-4">
      <div className="flex items-center gap-2">
        <span className="h-5 w-1 shrink-0 rounded-full bg-[#2578A2]" />
        <h2 className="text-[15px] font-bold text-[#2C5E7E]">
          سجل النشاط وتتبع الفاتورة والتدقيق الزمني (Audit Trail & Activity Log)
        </h2>
      </div>
      <span className="text-[11px] text-[#94A3B8]">سجل مؤتمت غير قابل للتعديل</span>
    </header>

    <ol className="space-y-3">
      {activities.map((item) => {
        const Icon = iconByKey[item.icon] || FiCheck;
        const ring = toneRing[item.tone] || toneRing.blue;
        return (
          <li
            key={item.id}
            className="grid grid-cols-1 gap-2 rounded-[12px] border border-[#EEF2F6] bg-[#FAFCFD] px-4 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-4"
          >
            <p className="order-2 text-[11px] font-medium text-[#94A3B8] sm:order-1 sm:min-w-[140px]">
              {item.time}
            </p>
            <div className="order-1 min-w-0 sm:order-2">
              <p className="text-[13px] font-bold text-[#1E293B]">{item.title}</p>
              <p className="mt-1 text-[11px] text-[#64748B]">بواسطة: {item.by}</p>
            </div>
            <span
              className={`order-3 grid size-9 place-items-center rounded-full border ${ring}`}
            >
              <Icon className="size-4" />
            </span>
          </li>
        );
      })}
    </ol>
  </section>
);

export default ActivityLog;