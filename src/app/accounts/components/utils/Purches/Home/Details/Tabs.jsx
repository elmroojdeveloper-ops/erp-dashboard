"use client";

import { detailTabs } from "../mock-data";

const Tabs = ({ activeTab, onChange }) => {
  return (
    <section className="overflow-x-auto rounded-[14px] bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
      <div className="flex min-w-max items-center gap-1">
        {detailTabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white"
                  : "text-muted hover:text-deep"
              }`}
            >
              {active && (
                <span className="size-1.5 shrink-0 rounded-full bg-white" />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Tabs;
