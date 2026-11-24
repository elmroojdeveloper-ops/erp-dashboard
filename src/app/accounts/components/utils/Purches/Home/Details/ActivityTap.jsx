"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiFilter,
  FiPaperclip,
  FiPlusSquare,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { BsArrowLeftRight, BsFiletypePdf, BsRobot } from "react-icons/bs";
import { activityLogRows } from "../mock-data";

const actionOptions = [
  "كل الإجراءات",
  "إضافة مرفق",
  "اعتماد الطلب",
  "تغيير حالة",
  "إنشاء طلب",
];

const actorOptions = [
  "كل الفاعلين",
  "ليلى منصور",
  "د. محمد القحطاني",
  "النظام (تلقائي)",
  "سلطان العتيبي",
];

const actionByType = {
  attachment: "إضافة مرفق",
  approval: "اعتماد الطلب",
  status: "تغيير حالة",
  create: "إنشاء طلب",
};

const typeIcons = {
  attachment: FiPaperclip,
  approval: FiCheck,
  status: BsArrowLeftRight,
  create: FiPlusSquare,
};

const badgeClassByType = {
  attachment:
    "rounded-full bg-[#EEF2F5] px-2.5 py-1 text-[10px] font-bold text-[#2578A2]",
  approval:
    "rounded-full bg-[#EAF3F8] px-2.5 py-1 text-[10px] font-bold text-[#2578A2]",
  create:
    "rounded-full bg-[#2578A2] px-2.5 py-1 text-[10px] font-bold text-white",
};

const fieldClass =
  "h-11 w-full appearance-none rounded-[10px] border border-[#D5E0E7] bg-white px-3 text-[12px] font-medium text-[#64748B] outline-none transition-colors focus:border-[#2578A2]";

function Avatar({ name, color, src }) {
  const initials = (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EAF2F6] text-[12px] font-bold text-white">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name || ""} className="size-full object-cover" />
      ) : (
        <span
          className="flex size-full items-center justify-center"
          style={{ backgroundColor: color || "#7C9CBF" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

export default function ActivityTap() {
  const [action, setAction] = useState("كل الإجراءات");
  const [actor, setActor] = useState("كل الفاعلين");
  const [period, setPeriod] = useState("");

  const filteredRows = useMemo(
    () =>
      activityLogRows.filter((row) => {
        const matchesAction =
          action === "كل الإجراءات" || actionByType[row.type] === action;
        const matchesActor = actor === "كل الفاعلين" || row.actor === actor;
        const matchesPeriod = !period || row.date === period;
        return matchesAction && matchesActor && matchesPeriod;
      }),
    [action, actor, period],
  );

  return (
    <div dir="rtl" className="flex w-full flex-col gap-5">
      <section className="w-full rounded-[12px] border border-[#E5EDF2] bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <FiFilter className="size-[18px] shrink-0 text-[#2578A2]" />
          <h2 className="text-[16px] font-bold text-[#2578A2]">
            الفلترة المتقدمة
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#64748B]">
              الإجراءات
            </span>
            <div className="relative">
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className={`${fieldClass} pe-3 ps-10`}
              >
                {actionOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7893A4]" />
            </div>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#64748B]">
              الفاعلين
            </span>
            <div className="relative">
              <select
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                className={`${fieldClass} pe-3 ps-10`}
              >
                {actorOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <IoChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7893A4]" />
            </div>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#64748B]">
              الفترة الزمنية
            </span>
            <div className="relative">
              <input
                type="date"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={`${fieldClass} pe-3 ps-10`}
              />
              <HiOutlineCalendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7893A4]" />
            </div>
          </label>
        </div>
      </section>

      <section className="flex flex-col" aria-live="polite">
        {filteredRows.map((row, index) => {
          const TypeIcon = typeIcons[row.type] || FiPaperclip;
          const isLast = index === filteredRows.length - 1;
          const badgeClass = badgeClassByType[row.type];

          return (
            <div
              key={row.id}
              className="flex w-full items-stretch gap-3 sm:gap-4"
            >
              {/* timeline outside right */}
              <div className="relative flex w-9 shrink-0 flex-col items-center self-center">
                <span className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#1682B5] bg-white text-[#1682B5]">
                  <TypeIcon className="size-[16px]" />
                </span>
                {!isLast ? (
                  <span className="absolute top-[calc(50%+18px)] h-[calc(100%+20px)] w-px bg-[#D5E2EA]" />
                ) : null}
              </div>

              {/* white card: avatar+content RIGHT, time+badge LEFT inside */}
              <div className="mb-5 min-w-0 flex-1 rounded-[14px] border border-[#E5EDF2] bg-white p-4 shadow-[0_2px_8px_rgba(31,78,105,0.07)] sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    {row.isSystem ? (
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]">
                        <BsRobot className="size-[18px]" />
                      </span>
                    ) : (
                      <Avatar
                        name={row.actor}
                        color={row.avatarColor}
                        src={row.avatarUrl}
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-bold leading-5 text-[#2C3E50]">
                        {row.actor}
                      </p>

                      {row.role ? (
                        <p className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
                          {row.role}
                        </p>
                      ) : null}

                      {row.message ? (
                        <p className="mt-2 text-[12px] leading-[1.8] text-[#526879]">
                          {row.message}
                        </p>
                      ) : null}

                      {row.comment ? (
                        <div className="mt-2.5 rounded-[6px] border-r-2 border-r-[#1682B5] bg-[#EDF5F8] px-3 py-2.5 text-[12px] leading-[1.8] text-[#374151]">
                          {row.comment}
                        </div>
                      ) : null}

                      {row.attachment ? (
                        <div className="mt-2.5 flex w-fit max-w-full items-center gap-2 rounded-full border border-[#D5E0E7] bg-[#EEF2F5] px-3 py-1.5">
                          <BsFiletypePdf className="size-3.5 shrink-0 text-[#1682B5]" />
                          <p className="max-w-[180px] truncate text-[11px] font-medium text-[#2C3E50]">
                            {row.attachment.name}
                          </p>
                          <span className="shrink-0 text-[10px] text-[#64748B]">
                            {row.attachment.size}
                          </span>
                        </div>
                      ) : null}

                      {row.statusChange ? (
                        <p className="mt-2 text-[12px] leading-[1.8] text-[#526879]">
                          تغير حالة الطلب من{" "}
                          <span className="font-bold text-[#DC6B6B]">
                            {row.statusChange.from}
                          </span>{" "}
                          إلى{" "}
                          <span className="font-bold text-[#2578A2]">
                            {row.statusChange.to}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* time + status badge INSIDE the card */}
                  <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                    <p className="whitespace-nowrap text-[11px] font-semibold text-[#64748B]">
                      {row.time}
                    </p>
                    {row.actionLabel && badgeClass ? (
                      <span className={badgeClass}>{row.actionLabel}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#CDDFE8] bg-white px-5 py-12 text-center text-sm text-[#64748B]">
            لا توجد نشاطات مطابقة للفلاتر المحددة
          </div>
        ) : null}
      </section>
    </div>
  );
}
