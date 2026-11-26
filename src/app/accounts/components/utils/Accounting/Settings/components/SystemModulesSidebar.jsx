"use client";

import { FiLock } from "react-icons/fi";
import { moduleItems } from "../settingsConstants";
import { Toggle } from "../SettingsUi";

export default function SystemModulesSidebar({
  selectedModule,
  setSelectedModule,
  moduleEnabled,
  onToggleModule,
}) {
  return (
    <aside className="order-first shrink-0 xl:w-[252px]">
      <div className="rounded-2xl border border-[#E8EDF2] bg-white px-3 pb-3 pt-5 shadow-card">
        <p className="mb-3 px-2 text-[11px] font-medium text-[#94A3B8]">
          أقسام النظام
        </p>

        <ul className="space-y-2">
          {moduleItems.map((item) => {
            const Icon = item.Icon;
            const active = selectedModule === item.id;
            const selectable = item.configurable ?? item.toggleable;
            const faded = item.toggleable && !Boolean(moduleEnabled[item.id]);

            return (
              <li key={item.id}>
                <div
                  className={`flex h-[47px] items-center gap-2.5 rounded-xl px-2.5 transition ${
                    active ? "bg-primary" : "hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-[#E8F1F8] text-primary"
                    }`}
                  >
                    <Icon className="size-[17px]" />
                  </span>

                  <button
                    type="button"
                    onClick={() => selectable && setSelectedModule(item.id)}
                    disabled={!selectable}
                    className="min-w-0 flex-1 truncate text-start text-[13px] font-medium disabled:cursor-default"
                  >
                    <span
                      className={
                        active
                          ? "text-white"
                          : faded
                            ? "text-[#94A3B8]"
                            : "text-[#334155]"
                      }
                    >
                      {item.label}
                    </span>
                  </button>

                  {item.coreLock && !item.toggleable ? (
                    <span
                      title="وحدة أساسية"
                      className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-[#EEF3F8] text-[#A9B6C6]"
                      }`}
                    >
                      <FiLock className="size-3.5" />
                    </span>
                  ) : null}

                  {item.toggleable ? (
                    <Toggle
                      checked={Boolean(moduleEnabled[item.id])}
                      onChange={() => onToggleModule(item.id)}
                      ariaLabel={`تفعيل ${item.label}`}
                    />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}