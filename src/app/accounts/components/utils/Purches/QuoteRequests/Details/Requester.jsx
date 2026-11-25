"use client";

import { FiUser } from "react-icons/fi";

const DetailRow = ({ label, value, valueClass = "text-[#1A2332]" }) => (
  <div className="flex items-start justify-between gap-3 text-[12px]">
    <span className="shrink-0 text-[#64748B]">{label}</span>
    <span className={`text-end font-semibold ${valueClass}`}>{value}</span>
  </div>
);

const Requester = ({ data }) => {
  if (!data) return null;

  const initials = (data.initials || data.name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <section className="rounded-[16px] border border-[#E5EDF2] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-[#E8F1F7] text-[#1B6A9C]">
            <FiUser className="size-4" />
          </span>
          <h2 className="text-[13px] font-bold text-[#1A2332]">
            مقدم ومسؤول الطلب
          </h2>
        </div>
        {data.detailsHref ? (
          <a
            href={data.detailsHref}
            className="text-[12px] font-bold text-[#1B6A9C] hover:underline"
          >
            التفاصيل
          </a>
        ) : (
          <button
            type="button"
            className="text-[12px] font-bold text-[#1B6A9C] hover:underline"
          >
            التفاصيل
          </button>
        )}
      </header>

      <div className="flex items-start gap-3">
        <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1B6A9C] text-[14px] font-bold text-white">
          {data.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.avatar}
              alt={data.name}
              className="size-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-bold leading-6 text-[#1A2332]">
            {data.name}
          </p>
          <p className="mt-0.5 text-[11px] leading-5 text-[#64748B]">
            {data.role}
          </p>
          {data.authority ? (
            <span className="mt-2 inline-flex rounded-full bg-[#E8F1F7] px-2.5 py-1 text-[10px] font-bold text-[#1B6A9C]">
              {data.authority}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-2.5 rounded-[12px] border border-[#E8EEF2] bg-[#F8FAFB] px-3.5 py-3">
        <DetailRow label="القسم الطالب" value={data.department} />
        {data.office ? <DetailRow label="المكتب" value={data.office} /> : null}
        {data.email ? (
          <DetailRow
            label="البريد الإلكتروني"
            value={data.email}
            valueClass="text-[#1B6A9C]"
          />
        ) : null}
        {data.phone ? (
          <DetailRow label="الهاتف المباشر" value={data.phone} />
        ) : null}
      </div>
    </section>
  );
};

export default Requester;
