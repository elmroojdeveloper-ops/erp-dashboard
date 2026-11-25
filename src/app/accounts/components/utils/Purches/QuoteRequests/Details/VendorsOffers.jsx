"use client";

import Link from "next/link";
import { FiCheck, FiClock, FiEye, FiX } from "react-icons/fi";

const badgeToneClass = {
  gold: "bg-[#FFF4D6] text-[#A16207]",
  blue: "bg-[#E8F1F7] text-[#1B6A9C]",
  gray: "bg-[#F1F5F9] text-[#64748B]",
};

const DotStat = ({ count, label, color }) => (
  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold">
    <span className={`size-2 shrink-0 rounded-full ${color}`} />
    <span className="text-[#1A2332]">{count}</span>
    <span className="text-[#64748B]">{label}</span>
  </span>
);

const StatusBadge = ({ vendor }) => {
  if (vendor.status === "submitted") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F4EA] px-3 py-1.5 text-[11px] font-bold text-[#2E7D32]">
        <FiCheck className="size-3.5" />
        تم الاستلام | عرض رقم {vendor.offerNo}
      </span>
    );
  }

  if (vendor.status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E1] px-3 py-1.5 text-[11px] font-bold text-[#B47C00]">
        <FiClock className="size-3.5" />
        بانتظار الرد | ينتهي في {vendor.expiresInDays ?? vendor.pendingDays}{" "}
        أيام
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDECEA] px-3 py-1.5 text-[11px] font-bold text-[#D32F2F]">
      <FiX className="size-3.5" />
      {vendor.declineReason || "اعتذار / رفض"}
    </span>
  );
};

const VendorsOffers = ({ vendors = [], stats, rfqId = "1" }) => {
  const compareHref = `/accounts/Purches/quote-requests/${rfqId}/compare`;
  const summary = stats || {
    total: vendors.length,
    responded: vendors.filter((v) => v.status === "submitted").length,
    awaiting: vendors.filter((v) => v.status === "pending").length,
    declined: vendors.filter((v) => v.status === "declined").length,
  };

  return (
    <section className="rounded-[16px] border border-[#E5EDF2] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-6">
      {/* رأس السكشن زي الديزاين */}
      <header className="mb-4 flex flex-col gap-3 border-b border-[#EEF2F6] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1.5 shrink-0 rounded-full bg-[#C0824A]" />
          <h2 className="text-[16px] font-bold text-[#1A2332]">
            الموردون المدعوون وحالة العروض
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex rounded-[8px] bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-bold text-[#475569]">
            {summary.total} موردين مدعوين
          </span>
          <DotStat
            count={summary.responded}
            label="استجابة"
            color="bg-[#2E7D32]"
          />
          <DotStat
            count={summary.awaiting}
            label="بانتظار الرد"
            color="bg-[#D4A017]"
          />
          <DotStat
            count={summary.declined}
            label="اعتذار / رفض"
            color="bg-[#D32F2F]"
          />
        </div>
      </header>

      <ul className="divide-y divide-[#EEF2F6]">
        {vendors.map((vendor) => {
          const canView = vendor.status === "submitted";

          return (
            <li
              key={vendor.id}
              className="flex flex-col gap-3 py-4 first:pt-1 last:pb-0 lg:flex-row lg:items-center lg:justify-between lg:gap-4"
            >
              {/* يمين: بيانات المورد */}
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold text-white ${
                    vendor.avatarTone || "bg-[#1B6A9C]"
                  }`}
                >
                  {vendor.initials}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13px] font-bold text-[#1A2332]">
                      {vendor.name}
                    </p>
                    {vendor.badge ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          badgeToneClass[vendor.badgeTone] ||
                          badgeToneClass.gray
                        }`}
                      >
                        {vendor.badge}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-[11px] leading-5 text-[#64748B]">
                    {[
                      vendor.cr ? `س.ت ${vendor.cr}` : null,
                      vendor.city,
                      vendor.contactRole && vendor.contactName
                        ? `${vendor.contactRole}: ${vendor.contactName}`
                        : vendor.contactName,
                    ]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>

                  {(vendor.sentAt || vendor.receivedAt) && (
                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#94A3B8]">
                      {vendor.sentAt ? <span>أُرسل {vendor.sentAt}</span> : null}
                      {vendor.receivedAt ? (
                        <span>استُلم {vendor.receivedAt}</span>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>

              {/* وسط: الحالة */}
              <div className="flex shrink-0 items-center lg:justify-center">
                <StatusBadge vendor={vendor} />
              </div>

              {/* شمال: زر العرض */}
              <div className="flex shrink-0 items-center">
                {canView ? (
                  <Link
                    href={compareHref}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] border border-[#1B6A9C] bg-white px-3.5 text-[12px] font-bold text-[#1B6A9C]"
                  >
                    <FiEye className="size-3.5" />
                    عرض العرض
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-9 cursor-not-allowed items-center justify-center gap-1.5 rounded-[10px] border border-[#D5E0E7] bg-[#F8FAFC] px-3.5 text-[12px] font-bold text-[#94A3B8]"
                  >
                    <FiEye className="size-3.5" />
                    عرض العرض
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default VendorsOffers;
