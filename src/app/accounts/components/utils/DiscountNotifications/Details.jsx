"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiSave,
  FiPrinter,
  FiCheckCircle,
  FiInfo,
  FiChevronDown,
  FiExternalLink,
  FiFileText,
  FiDownload,
} from "react-icons/fi";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";

/* ============================================================
   بيانات تجريبية: استبدلها بالـ API (SWR / React Query ...)
============================================================ */
const MOCK_NOTE = {
  number: "CN-2023-0892",
  status: "approved", // approved | draft
  date: "12 أكتوبر 2023",
  vatNumber: "300123456700003",
  issueDate: "12 أكتوبر 2023",
  salesRep: "فهد السيد",
  account: {
    code: "4100-01",
    name: "مردودات مبيعات الأثاث",
    href: "/accounting/accounts/4100-01",
  },
  reason: "مرتجعات",
  items: [
    {
      id: 1,
      name: "أثاث مكتب",
      description: "مكاتب خشبية فاخرة...",
      unitPrice: 1500,
      quantity: 2,
      discount: 0,
      tax: 360,
      total: 2760,
    },
  ],
  summary: { beforeTax: 2400, discount: 0, vat: 0, total: 9375 },
  additionalDiscount: 0,
  rounding: 0,
  detailedReason:
    "مرتجع بسبب وجود خدوش في الهيكل المعدني لثلاث قطع بناءً على تقرير الفحص المرفق.",
  attachments: [], // [{ name: "تقرير الفحص.pdf", size: "240 KB", url: "#" }]
  notes: "",
  createdBy: {
    name: "فهد السيف",
    role: "مندوب مبيعات",
    avatar: null, // "/images/users/fahd.jpg"
    date: "12 أكتوبر 2023",
  },
  approvedBy: {
    name: "أحمد الشريف",
    role: "مراجع مالي",
    avatar: null, // "/images/users/ahmed.jpg"
    date: "13 أكتوبر 2023",
  },
};

const useDebitNote = (id) => {
  // TODO: const { data } = useSWR(`/debit-notes/${id}`)
  return { ...MOCK_NOTE, id };
};

/* ============================================================
   Helpers
============================================================ */
const cx = (...c) => c.filter(Boolean).join(" ");

const money = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const STATUS = {
  approved: {
    label: "معتمد",
    cls: "bg-[#ececec] text-gray-600",
    Icon: FiCheckCircle,
  },
  draft: {
    label: "مسودة",
    cls: "bg-[#fdf0e1] text-[#d9822b]",
    Icon: FiFileText,
  },
};

const REASON_STYLES = {
  "مرتجعات": "bg-[#fdf0e1] text-[#d9822b]",
  "خطأ في السعر": "bg-[#fde8e8] text-[#c62828]",
  "خصم إضافي": "bg-[#e3eef6] text-[#1d6a8a]",
};

const Card = ({ className, children }) => (
  <section className={cx("rounded-2xl bg-white shadow-sm", className)}>
    {children}
  </section>
);

const InfoBlock = ({ label, children }) => (
  <div>
    <p className="text-[16px] font-medium leading-6 text-gray-900">{label}</p>
    <div className="mt-2.5 text-[15px] leading-6 text-gray-600">{children}</div>
  </div>
);

/* ============================================================
   الهيدر
============================================================ */
const Header = ({ note }) => {
  const router = useRouter();
  const status = STATUS[note.status] || STATUS.draft;
  const StatusIcon = status.Icon;

  return (
    <Card className="flex h-[96px] items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-[24px] font-bold leading-none text-[#1d6a8a]">
          إشعار خصم رقم {note.number}
        </h1>
        <span
          className={cx(
            "flex h-[26px] items-center gap-1.5 rounded-full px-3 text-[11px] font-medium",
            status.cls
          )}
        >
          <StatusIcon size={14} />
          {status.label}
        </span>
      </div>

      <div dir="ltr" className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-3 text-[14px] font-medium text-[#1d6a8a] hover:opacity-80"
        >
          <span>الرجوع</span>
          <FiArrowRight size={16} />
        </button>

        <button
          type="button"
          onClick={() => {
            /* TODO: تحميل الـ PDF */
          }}
          className="flex h-12 items-center gap-2 rounded-xl bg-[#2273a0] px-4 text-[14px] text-white transition-colors hover:bg-[#1b5f86]"
        >
          <span>تحميل PDF</span>
          <FiSave size={18} />
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex h-12 items-center gap-2 rounded-xl bg-[#2273a0] px-4 text-[14px] text-white transition-colors hover:bg-[#1b5f86]"
        >
          <span>طباعة</span>
          <FiPrinter size={18} />
        </button>
      </div>
    </Card>
  );
};

/* ============================================================
   معلومات أساسية
============================================================ */
const BasicInfo = ({ note }) => (
  <Card className="p-6">
    <div className="flex items-center gap-2">
      <FiInfo size={22} className="text-[#2273a0]" />
      <h2 className="text-[20px] leading-7 text-gray-700">معلومات أساسية</h2>
    </div>

    {/* الصف 1 */}
    <div className="flex flex-wrap gap-x-[42px] gap-y-5 border-b border-[#ECF4F8] pb-6 pt-8">
      <InfoBlock label="رقم شعار الخصم">{note.number}</InfoBlock>
      <InfoBlock label="التاريخ">{note.date}</InfoBlock>
      <InfoBlock label="الرقم الضريبي (VAT)">{note.vatNumber}</InfoBlock>
    </div>

    {/* الصف 2 */}
    <div className="flex flex-wrap gap-x-[42px] gap-y-5 border-b border-[#ECF4F8] py-7">
      <InfoBlock label="تاريخ الإصدار">{note.issueDate}</InfoBlock>
      <InfoBlock label="المندوب">{note.salesRep}</InfoBlock>
      <InfoBlock label="حساب مردودات المبيعات">
        <Link
          href={note.account.href}
          className="flex items-center gap-1.5 text-[#1d6a8a] hover:underline"
        >
          <FiExternalLink size={18} />
          <span>
            {note.account.code} {note.account.name}
          </span>
        </Link>
      </InfoBlock>
    </div>

    {/* الصف 3 */}
    <div className="pt-7">
      <InfoBlock label="سبب الخصم">
        <span
          className={cx(
            "inline-block rounded-full px-3 py-1 text-[11px] font-medium",
            REASON_STYLES[note.reason] || "bg-gray-100 text-gray-600"
          )}
        >
          {note.reason}
        </span>
      </InfoBlock>
    </div>
  </Card>
);

/* ============================================================
   تفاصيل البنود (جدول بسكرول أفقي)
============================================================ */
const COLS =
  "grid grid-cols-[40px_1.2fr_1.8fr_1fr_0.8fr_1fr_1fr_1.1fr] items-center gap-x-3 px-6";

const HEAD = [
  "البند/الخدمة",
  "الوصف",
  "سعر الوحدة",
  "الكمية",
  "الخصم",
  "الضريبة",
  "المجموع",
];

const ItemsTable = ({ items }) => (
  <Card className="overflow-hidden pb-6">
    <div className="flex h-[70px] items-center gap-2 pr-12">
      <TbListDetails size={22} className="text-[#2273a0]" />
      <h2 className="text-[20px] leading-7 text-gray-700">تفاصيل البنود</h2>
    </div>

    <div
      className={cx(
        "mr-6 overflow-x-auto pb-6",
        "[scrollbar-color:#c3ccd2_#e8edf0]",
        "[&::-webkit-scrollbar]:h-2.5",
        "[&::-webkit-scrollbar-track]:ml-6 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#e8edf0]",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c3ccd2]"
      )}
    >
      <div className="min-w-[900px]">
        {/* Header */}
        <div className={cx(COLS, "h-[50px] bg-[#eef3f6] text-[14px] text-gray-700")}>
          <span className="text-[17px] font-medium text-gray-700">#</span>
          {HEAD.map((h, i) => (
            <span key={h} className={i >= 2 ? "text-center" : ""}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {items.map((it, index) => (
          <div
            key={it.id}
            className={cx(COLS, "h-[70px] border-b border-[#ECF4F8] text-[14px] text-gray-800")}
          >
            <span className="font-medium">{index + 1}</span>

            <span className="flex items-center justify-between gap-2">
              {it.name}
              <FiChevronDown size={16} className="shrink-0 text-gray-500" />
            </span>

            <span className="truncate">{it.description}</span>
            <span className="text-center">{money(it.unitPrice)}</span>
            <span className="text-center">{it.quantity}</span>
            <span className="text-center">{money(it.discount)}</span>
            <span className="text-center">{money(it.tax)}</span>
            <span className="text-center font-bold">{money(it.total)}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

/* ============================================================
   التابات
============================================================ */
const TABS = [
  { key: "discount", label: "الخصم والتسويات" },
  { key: "attachments", label: "المرفقات" },
  { key: "notes", label: "ملاحظات إضافية" },
];

const StatBox = ({ label, value }) => (
  <div className="rounded-xl bg-[#e9eef1] px-4 py-[11px]">
    <p className="text-[13px] leading-5 text-gray-600">{label}</p>
    <p className="text-[17px] font-medium leading-6 text-gray-800">
      {money(value)} ر.س
    </p>
  </div>
);

const OptionsPanel = ({ note }) => {
  const [tab, setTab] = useState("discount");

  return (
    <Card className="p-6">
      <div
        role="tablist"
        className="flex h-[50px] items-stretch gap-6 rounded-full bg-[#eef3f6] px-6"
      >
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={cx(
                "relative px-3 text-[15px] transition-colors",
                active ? "font-medium text-[#1d6a8a]" : "text-gray-700 hover:text-[#1d6a8a]"
              )}
            >
              {t.label}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#1d6a8a]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tab === "discount" && (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <StatBox label="قيمة الخصم الإضافي" value={note.additionalDiscount} />
              <StatBox label="تسوية التقريب" value={note.rounding} />
            </div>

            <div className="mt-6 rounded-xl border-r-[3px] border-[#1d6a8a] bg-[#eef3f6] px-4 py-3.5">
              <p className="text-[14px] font-medium leading-5 text-[#1d6a8a]">
                السبب التفصيلي
              </p>
              <p className="mt-1.5 text-[13px] leading-5 text-gray-800">
                {note.detailedReason || "—"}
              </p>
            </div>
          </>
        )}

        {tab === "attachments" &&
          (note.attachments.length ? (
            <ul className="space-y-2">
              {note.attachments.map((f) => (
                <li
                  key={f.name}
                  className="flex items-center justify-between rounded-xl bg-[#eef3f6] px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-[14px] text-gray-800">
                    <FiFileText className="text-[#1d6a8a]" size={18} />
                    {f.name}
                    <span className="text-[12px] text-gray-500">{f.size}</span>
                  </span>
                  <a href={f.url} download aria-label="تحميل" className="text-[#1d6a8a]">
                    <FiDownload size={18} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl bg-[#eef3f6] px-4 py-6 text-center text-[14px] text-gray-500">
              لا توجد مرفقات على هذا الإشعار
            </p>
          ))}

        {tab === "notes" && (
          <p className="rounded-xl bg-[#eef3f6] px-4 py-4 text-[14px] leading-6 text-gray-800">
            {note.notes || "لا توجد ملاحظات إضافية"}
          </p>
        )}
      </div>
    </Card>
  );
};

/* ============================================================
   العمود الأيسر: الملخص + الاعتماد
============================================================ */
const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="max-w-[170px] text-[17px] leading-snug">{label}</span>
    <span className="whitespace-nowrap text-[17px]">{money(value)} ر.س</span>
  </div>
);

const Summary = ({ summary }) => (
  <aside className="relative overflow-hidden rounded-2xl bg-[#2678a0] p-6 text-white shadow-[0_10px_24px_rgba(29,106,138,0.28)]">
    <span
      aria-hidden
      className="pointer-events-none absolute -top-[45px] right-0 h-[150px] w-[150px] rounded-full bg-white/10"
    />

    <h3 className="relative mb-6 text-[20px] font-medium">ملخص شعار الخصم</h3>

    <div className="relative space-y-5">
      <SummaryRow label="إجمالي المبلغ قبل الضريبة" value={summary.beforeTax} />
      <SummaryRow label="إجمالي الخصم" value={summary.discount} />
      <SummaryRow label="ضريبة القيمة المضافة (%15)" value={summary.vat} />
    </div>

    <hr className="relative mx-2 my-6 border-white/40" />

    <div className="relative flex items-center justify-between gap-4">
      <span className="text-[18px] font-medium">المجموع النهائي</span>
      <span className="flex items-baseline gap-2">
        <span className="text-[32px] font-bold leading-none">
          {Number(summary.total).toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </span>
        <span className="text-[16px]">ر.س</span>
      </span>
    </div>

    <p className="relative mt-6 text-center text-[16px]">
      جميع المبالغ بالريال السعودي (SAR)
    </p>
  </aside>
);

const Avatar = ({ person }) =>
  person.avatar ? (
    <img
      src={person.avatar}
      alt={person.name}
      className="h-9 w-9 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7e6ee] text-[15px] font-bold text-[#1d6a8a]">
      {person.name.charAt(0)}
    </span>
  );

const Person = ({ title, dateLabel, person }) => (
  <div className="flex items-center justify-between rounded-xl bg-[#eef3f6] px-3 py-3">
    <div className="flex items-center gap-2">
      <Avatar person={person} />
      <div>
        <p className="text-[13px] leading-5 text-gray-600">{title}</p>
        <p className="text-[18px] font-bold leading-6 text-[#1d6a8a]">{person.name}</p>
        <p className="text-[13px] leading-5 text-[#1fa3c9]">{person.role}</p>
      </div>
    </div>

    <div>
      <p className="text-[12px] leading-5 text-[#1fa3c9]">{dateLabel}</p>
      <p className="text-[12px] leading-5 text-gray-700">{person.date}</p>
    </div>
  </div>
);

const ApprovalInfo = ({ createdBy, approvedBy }) => (
  <Card className="p-6">
    <div className="mb-4 flex items-center gap-2">
      <HiOutlineCheckBadge size={20} className="text-[#2273a0]" />
      <h3 className="text-[18px] font-medium text-[#1d6a8a]">معلومات الاعتماد</h3>
    </div>

    <Person title="أنشئ بواسطة" dateLabel="تاريخ الإنشاء" person={createdBy} />

    {approvedBy && (
      <>
        <div className="mx-auto my-3 h-11 w-px bg-gray-200" />
        <Person title="اعتمد بواسطة" dateLabel="تاريخ الاعتماد" person={approvedBy} />
      </>
    )}
  </Card>
);

/* ============================================================
   الصفحة
============================================================ */
const Details = ({ id }) => {
  const note = useDebitNote(id);

  return (
    <div  className="space-y-8">
      <Header note={note} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_373px]">
        {/* العمود الأيمن */}
        <div className="min-w-0 space-y-6">
          <BasicInfo note={note} />
          <ItemsTable items={note.items} />
          <OptionsPanel note={note} />
        </div>

        {/* العمود الأيسر */}
        <div className="space-y-6">
          <Summary summary={note.summary} />
          <ApprovalInfo createdBy={note.createdBy} approvedBy={note.approvedBy} />
        </div>
      </div>
    </div>
  );
};

export default Details;