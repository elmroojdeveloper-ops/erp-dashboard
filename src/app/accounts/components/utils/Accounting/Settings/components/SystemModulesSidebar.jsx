"use client";

import { FiCheck, FiLock } from "react-icons/fi";
import { moduleItems } from "../settingsConstants";
import { Toggle } from "../SettingsUi";

export default function SystemModulesSidebar({
  selectedModule,
  setSelectedModule,
  moduleEnabled,
  onToggleModule,
}) {
  return (
    <aside className="order-first shrink-0 xl:w-[248px]">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-card">
        <p className="mb-3 px-1 text-[12px] font-bold text-[#64748B]">
          أقسام النظام
        </p>
        <ul className="space-y-1.5">
          {moduleItems.map((item) => {
            const Icon = item.Icon;
            const active = selectedModule === item.id;
            const selectable = item.configurable ?? item.toggleable;
            const faded =
              item.toggleable && !Boolean(moduleEnabled[item.id]);
            const rowClass = `flex w-full items-center gap-2 rounded-xl px-2 py-2.5 transition ${
              active
                ? "bg-[#1B4D66] text-white shadow-sm"
                : "border border-transparent hover:bg-[#F8FAFC]"
            }`;

            return (
              <li key={item.id}>
                <div className={rowClass}>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-[#E8F3FA] text-primary"
                    }`}
                  >
                    <Icon className="size-[17px]" />
                  </span>
                  <button
                    type="button"
                    onClick={() => selectable && setSelectedModule(item.id)}
                    disabled={!selectable}
                    className="min-w-0 flex-1 truncate py-0.5 text-start text-[12.5px] font-bold disabled:cursor-default"
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
                    <FiLock
                      className={`size-3.5 shrink-0 ${
                        active ? "text-white/90" : "text-[#CBD5E1]"
                      }`}
                      title="وحدة أساسية"
                    />
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

        <div className="mt-4 border-t border-[#EEF2F6] pt-4">
          <div className="flex items-start gap-2 px-1">
            <FiCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="text-[12px] font-bold text-[#1E293B]">
                حوكمة مسجلة
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#64748B]">
                أي تعديل يُسجل في سجل الرقابة المالي لدعم التدقيق الداخلي
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}