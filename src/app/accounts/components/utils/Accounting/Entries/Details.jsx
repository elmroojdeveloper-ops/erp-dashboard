"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiDownload,
  FiEdit3,
  FiInfo,
  FiLink,
  FiList,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";
import {
  HiOutlineCalendar,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { LuCalculator, LuShieldCheck } from "react-icons/lu";
import { getEntryDetail } from "./mock-data";

const statusMap = {
  pending: {
    label: "بانتظار الاعتماد",
    className: "bg-[#ffe0e0] text-[#d51f2d]",
    dot: "bg-[#df3948]",
  },
  waiting_approval: {
    label: "بانتظار الاعتماد",
    className: "bg-[#ffe0e0] text-[#d51f2d]",
    dot: "bg-[#df3948]",
  },
  posted: {
    label: "مرحل",
    className: "bg-[#d8fae7] text-[#11a36f]",
    dot: "bg-[#13b57c]",
  },
  draft: {
    label: "مسودة",
    className: "bg-[#fff0d7] text-[#c87a00]",
    dot: "bg-[#d89016]",
  },
};

const formatNumber = (value) =>
  Number(String(value || 0).replace(/,/g, "") || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2">
    {Icon ? <Icon className="size-[18px] shrink-0 text-primary" /> : null}
    <h2 className="text-[17px] font-medium text-primary">{children}</h2>
  </div>
);

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#7d8792]">
      {Icon ? <Icon className="size-3.5 shrink-0" /> : null}
      <span>{label}</span>
    </div>
    <div className="text-[15px] font-bold text-[#46515e]">{value}</div>
  </div>
);

const AccountBadge = ({ code, highlighted }) => (
  <span
    className={`inline-flex min-w-[54px] items-center justify-center rounded-[4px] px-2 py-1 text-[10px] font-medium text-white ${
      highlighted ? "bg-[#d58600]" : "bg-[#2781a8]"
    }`}
  >
    {code}
  </span>
);

const ActivityItem = ({ item, isLast }) => {
  const color =
    item.type === "created"
      ? "#13b57c"
      : item.type === "review"
        ? "#2781a8"
        : "#c5d1da";

  return (
    <div className="relative flex min-h-[58px] gap-3">
      {!isLast && (
        <span className="absolute right-[6px] top-[16px] h-[calc(100%-8px)] w-px bg-[#dbe6eb]" />
      )}
      <div
        className="relative z-10 mt-1 size-[13px] shrink-0 rounded-full border-2"
        style={{
          borderColor: color,
          backgroundColor: item.type === "pending" ? "#fff" : color,
        }}
      />
      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-bold text-[#3e4854]">{item.title}</p>
          <p className="mt-1 text-[11px] leading-5 text-[#596574]">{item.description}</p>
        </div>
        {item.date ? (
          <span className="shrink-0 text-[9px] text-[#697684]">{item.date}</span>
        ) : null}
      </div>
    </div>
  );
};

const ApprovalCard = ({ onApprove, onReject }) => {
  const [note, setNote] = useState("");
  const [notify, setNotify] = useState(true);

  return (
    <section className="h-full overflow-hidden rounded-[12px] bg-white shadow-[0_2px_5px_rgba(40,70,90,0.08)]">
      <div className="h-[3px] bg-primary" />
      <div className="p-5">
        <SectionTitle icon={LuShieldCheck}>إجراء الاعتماد</SectionTitle>

        <div className="mt-4 rounded-[7px] bg-surface px-4 py-3">
          <div className="flex items-start gap-3">
            <FiInfo className="mt-0.5 size-[17px] shrink-0 text-primary" />
            <p className="text-[11px] leading-5 text-[#566370]">
              بصفتك مراجع مالي، يرجى مراجعة تفاصيل القيد والحسابات المتأثرة قبل
              الترحيل إلى الأستاذ العام.
            </p>
          </div>
        </div>

        <label className="mt-4 block text-[11px] text-[#6f7985]">
          ملاحظة المراجع (اختياري)
        </label>
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-2 w-full resize-none rounded-[7px] border-0 bg-surface px-3 py-2 text-sm text-[#46515e] outline-none focus:ring-1 focus:ring-primary"
        />

        <label className="mt-3 flex cursor-pointer items-center gap-2 text-[11px] text-[#4e5965]">
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="size-4 rounded border-[#bbc8d0] accent-primary"
          />
          <span>إشعار المحاسب المسؤول بالنتيجة</span>
        </label>

        <div className="my-3 h-px bg-[#e6edf0]" />

        <button
          type="button"
          onClick={() => onApprove?.({ note, notify })}
          className="flex h-[47px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#08a879] text-[13px] font-bold text-white transition hover:bg-[#07986e]"
        >
          <LuShieldCheck className="size-[18px]" />
          اعتماد القيد وترحيله
        </button>

        <button
          type="button"
          onClick={() => onReject?.({ note, notify })}
          className="mt-2.5 flex h-[40px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#ce161b] text-[13px] font-bold text-white transition hover:bg-[#b81217]"
        >
          <FiX className="size-[17px]" />
          رفض القيد وإعادته
        </button>
      </div>
    </section>
  );
};

const ActivityCard = ({ activity }) => (
  <section className="h-full rounded-[12px] bg-white p-5 shadow-[0_2px_5px_rgba(40,70,90,0.05)]">
    <SectionTitle icon={HiOutlineClipboardDocumentList}>سجل النشاط</SectionTitle>
    <div className="mt-5 flex flex-col gap-1">
      {activity.map((item, index) => (
        <ActivityItem
          key={`${item.title}-${index}`}
          item={item}
          isLast={index === activity.length - 1}
        />
      ))}
    </div>
  </section>
);

const NotesCard = ({ notes }) => (
  <section className="h-full rounded-[12px] bg-white p-5 shadow-[0_2px_5px_rgba(40,70,90,0.05)]">
    <SectionTitle icon={FiList}>الملاحظات</SectionTitle>

    {notes.length > 0 && (
      <div className="mt-5 rounded-[7px] border-r-[3px] border-primary bg-surface px-4 py-3">
        {notes.map((note, index) => (
          <div key={index}>
            <p className="text-[11px] leading-6 text-[#48535f]">{note.text}</p>
            <button type="button" className="mt-1 text-[10px] font-medium text-primary">
              {note.author}
            </button>
          </div>
        ))}
      </div>
    )}

    <div className="mt-3 rounded-[7px] bg-surface p-3">
      <textarea
        rows={2}
        placeholder="أضف ملاحظة جديدة..."
        className="min-h-[48px] w-full resize-none bg-transparent text-[11px] text-[#4c5864] outline-none placeholder:text-[#9aa8b2]"
      />
      <div className="mt-2 flex justify-start">
        <button
          type="button"
          className="inline-flex h-[27px] items-center rounded-[4px] bg-primary px-3 text-[10px] font-medium text-white"
        >
          إرسال
        </button>
      </div>
    </div>
  </section>
);

const Details = ({ id }) => {
  const base = useMemo(() => getEntryDetail(id), [id]);
  const [status, setStatus] = useState(base.status);

  useEffect(() => {
    setStatus(base.status);
  }, [base.status, id]);

  const data = useMemo(() => ({ ...base, status }), [base, status]);
  const currentStatus = statusMap[data.status] || statusMap.pending;
  const isPosted = data.status === "posted";
  const isPending = data.status === "pending" || data.status === "waiting_approval";
  const isDraft = data.status === "draft";

  const debitTotal = data.lines.reduce((sum, row) => sum + Number(row.debit || 0), 0);
  const creditTotal = data.lines.reduce((sum, row) => sum + Number(row.credit || 0), 0);

  if (data.notFound) {
    return (
      <div className="rounded-[22px] bg-white p-8 text-center shadow-card">
        <h1 className="text-xl font-bold text-primary">القيد غير موجود</h1>
        <p className="mt-2 text-muted">لا يوجد قيد بالمعرّف: {data.id}</p>
        <Link
          href="/accounts/Entries"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-white"
        >
          الرجوع للقيود اليومية
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-2">
      {/* Header */}
      <section className="flex flex-col gap-4 rounded-[11px] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(35,70,90,0.04)] lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[20px] font-bold text-primary">{data.id}</h1>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-medium ${currentStatus.className}`}
            >
              <span className={`size-1.5 rounded-full ${currentStatus.dot}`} />
              {currentStatus.label}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#5d6875]">{data.title}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isPosted && (
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d98912] bg-white px-4 text-[12px] font-medium text-[#c97900] transition hover:bg-[#fff8ec]"
            >
              <FiRefreshCw className="size-4" />
              قيد عكسي
            </button>
          )}

          

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-[12px] font-medium text-white transition hover:bg-primary-dark"
          >
            <FiDownload className="size-4" />
            تحميل PDF
          </button>

          {data.nextId && (
            <Link
              href={`/accounts/Entries/${data.nextId}`}
              className="inline-flex h-10 min-w-[72px] items-center justify-center rounded-lg bg-primary px-4 text-[12px] font-medium text-white transition hover:bg-primary-dark"
            >
              التالي
            </Link>
          )}

          <Link
            href="/accounts/Entries"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-primary bg-white px-4 text-[12px] font-medium text-primary transition hover:bg-surface"
          >
            الرجوع
            <FiArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Summary: details right, total left (RTL) */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-[11px] bg-white px-6 py-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:px-7">
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            <DetailItem
              icon={HiOutlineClipboardDocumentList}
              label="دفتر اليومية"
              value={data.journal}
            />
            <DetailItem
              icon={HiOutlineCalendar}
              label="تاريخ المحاسبة"
              value={data.accountingDate}
            />
            <DetailItem icon={FiLink} label="الرقم المرجعي" value={data.reference} />
            <DetailItem icon={LuCalculator} label="العملة" value={data.currency} />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[11px] bg-[#2981a8] px-5 py-5 text-white shadow-[0_5px_10px_rgba(40,120,155,0.15)]">
          <div className="absolute -left-10 -top-12 size-[140px] rounded-full bg-white/5" />
          <div className="relative z-10 flex h-full flex-col">
            <p className="text-[11px] text-white/80">إجمالي القيد</p>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-[25px] font-bold leading-none">
                {formatNumber(data.total)}
              </span>
              <span className="pb-0.5 text-[10px]">ر.س</span>
            </div>
            <div className="mt-auto pt-5">
              <span className="inline-flex items-center gap-1 rounded-[5px] bg-white/10 px-2.5 py-1.5 text-[10px]">
                <FiCheckCircle className="size-3" />
                متوازن بالكامل
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lines */}
      <section className="overflow-hidden rounded-[11px] bg-white shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
        <div className="flex h-[56px] items-center gap-2 px-5">
          <h2 className="text-[17px] font-medium text-primary">عناصر القيد</h2>
          <span className="rounded-full bg-primary px-2.5 py-1 text-[9px] font-medium text-white">
            {data.lines.length} بنود
          </span>
        </div>

        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-right">
            <thead>
              <tr className="h-[41px] bg-surface text-[12px] font-medium text-[#65717d]">
                <th className="px-4">الحساب</th>
                <th className="px-4">الوصف</th>
                <th className="px-4">الضريبة</th>
                <th className="px-4">مركز التكلفة</th>
                <th className="px-4">المدين</th>
                <th className="px-4">الدائن</th>
              </tr>
            </thead>
            <tbody>
              {data.lines.map((row, index) => (
                <tr
                  key={index}
                  className="h-[64px] border-b border-[#e7eef1] text-[12px] text-[#46515e]"
                >
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <AccountBadge code={row.account} highlighted={row.highlighted} />
                      <span>{row.accountName}</span>
                    </div>
                  </td>
                  <td className="px-4">{row.description}</td>
                  <td className="px-4">{row.tax}</td>
                  <td className="px-4">
                    {row.costCenter !== "—" ? (
                      <span className="inline-flex rounded-full bg-surface px-3 py-1 text-[10px] font-medium text-primary">
                        {row.costCenter}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td
                    className={`px-4 font-semibold ${
                      Number(row.debit) > 0 ? "text-[#252d35]" : "text-[#c4cdd4]"
                    }`}
                  >
                    {formatNumber(row.debit)}
                  </td>
                  <td
                    className={`px-4 font-semibold ${
                      Number(row.credit) > 0 ? "text-[#252d35]" : "text-[#c4cdd4]"
                    }`}
                  >
                    {formatNumber(row.credit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex min-h-[72px] flex-col gap-3 bg-[#287fa6] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-[6px] bg-[#26aa8a]/55 px-3 py-2 text-[10px] text-[#d8fff4]">
            <FiCheckCircle className="size-3.5" />
            القيد متوازن
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-white/70">إجمالي المدين</span>
              <span className="text-[13px] font-semibold">
                {formatNumber(debitTotal)} ر.س
              </span>
            </div>
            <div className="hidden h-8 w-px bg-white/40 sm:block" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-white/70">إجمالي الدائن</span>
              <span className="text-[13px] font-semibold">
                {formatNumber(creditTotal)} ر.س
              </span>
            </div>
          </div>
        </div>
      </section>

      {/*
        انتظار: سجل النشاط → تحته الملاحظات | قصادهم إجراء الاعتماد
        مرحّل: سجل النشاط → تحته الملاحظات (نفس العمود، من غير اعتماد)
      */}
      {isPending ? (
        <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex flex-col gap-5">
            <ActivityCard activity={data.activity} />
            <NotesCard notes={data.notes} />
          </div>
          <ApprovalCard
            onApprove={() => setStatus("posted")}
            onReject={() => setStatus("draft")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-5 lg:col-start-1">
            <ActivityCard activity={data.activity} />
            <NotesCard notes={data.notes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
