"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCalendar,
  FiUser,
  FiFileText,
  FiMapPin,
  FiClock,
  FiList,
  FiAlertTriangle,
  FiCheckCircle,
  FiClipboard,
  FiChevronUp,
  FiChevronDown,
  FiLayers,
  FiServer,
  FiShield,
  FiInfo,
  FiBell,
  FiPlusSquare,
} from "react-icons/fi";
import {
  getGoodsReceiptDetail,
  receiptStatusLabels,
} from "../Home/mock-data";

const fallbackDetail = {
  id: "1",
  number: "GRN-2024-889",
  poNumber: "PO-2024-231",
  vendor: "شركة الخزائن المتقدمة للتجارة والتقنية",
  warehouse: "مستودع السلي المركزي",
  receivedAt: "19 نوفمبر 2024",
  receivedBy: "سلطان العتيبي",
  status: "partial",
  matchedCount: 63,
  itemsCount: 103,
  inspectionReportNumber: "402",
  note: "يمكنك الاطلاع على سجل التدقيق الزمني الكامل وجدول الفروقات التفصيلي عبر تبويب «التفاصيل الكاملة»",
  items: [
    {
      id: "1",
      name: "كابلات ألياف ضوئية فائقة السرعة",
      status: "partial",
      statusBadge: "استلام جزئي (مقبول 60 بكرة)",
      description:
        "المتبقي قيد التوريد في دفعة قادمة مجدولة مع الناقل اللوجستي المعتمد.",
      orderedQty: 100,
      receivedQty: 60,
      remainingQty: 40,
      unit: "بكرة",
      progressPercent: 60,
      pendingLabel: "40% معلقة",
      iconType: "cable",
    },
    {
      id: "2",
      name: "خوادم تخزين سحابية متقدمة",
      subLabel: "وحدة معالجة مدمجة",
      status: "matched",
      statusBadge: "مكتمل ومطابق 100%",
      orderedQty: 2,
      receivedQty: 2,
      remainingQty: 0,
      unit: "2 من أصل 2",
      iconType: "server",
    },
    {
      id: "3",
      name: "تراخيص نظام الحماية المؤسسية",
      subLabel: "اشتراك سنوي موحد",
      status: "matched",
      statusBadge: "مكتمل ومفعل",
      orderedQty: 1,
      receivedQty: 1,
      remainingQty: 0,
      unit: "1 من أصل 1",
      iconType: "license",
    },
  ],
};

const Details = ({ id }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("executive"); // "executive" | "audit"
  const [expandedAll, setExpandedAll] = useState(true);
  const [notifiedVendor, setNotifiedVendor] = useState(false);

  const rawData = getGoodsReceiptDetail ? getGoodsReceiptDetail(id) : null;
  const data = rawData
    ? {
        ...fallbackDetail,
        ...rawData,
        items:
          rawData.items && rawData.items.length > 0
            ? rawData.items
            : fallbackDetail.items,
      }
    : fallbackDetail;

  const totalOrdered = data.items.reduce(
    (sum, item) => sum + Number(item.orderedQty || 0),
    0
  ) || data.itemsCount || 103;

  const totalReceived = data.items.reduce(
    (sum, item) => sum + Number(item.receivedQty || 0),
    0
  ) || data.matchedCount || 63;

  const totalRemaining = Math.max(0, totalOrdered - totalReceived);
  const completionPercent =
    totalOrdered > 0 ? Math.round((totalReceived / totalOrdered) * 100) : 61;

  const firstPartialItem =
    data.items.find(
      (item) =>
        item.status === "partial" ||
        Number(item.receivedQty || 0) < Number(item.orderedQty || 0)
    ) || data.items[0];

  const otherItems = data.items.filter((item) => item.id !== firstPartialItem?.id);

  const renderItemIcon = (type) => {
    switch (type) {
      case "cable":
        return <FiLayers className="h-4 w-4 text-[#0d658a]" />;
      case "server":
        return <FiServer className="h-4 w-4 text-[#64748b]" />;
      default:
        return <FiShield className="h-4 w-4 text-[#64748b]" />;
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-0 text-[#1e293b] font-sans"
      style={{ fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif" }}
    >
      <div className="mx-auto   py-4 sm:px-6 space-y-4">
        {/* TOP BACK LINK */}
        <div className="flex w-full items-center justify-end">
          <Link
            href="/accounts/Purches/receipts"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#1e293b] hover:text-[#0d658a] transition"
          >
            <FiArrowRight className="h-3.5 w-3.5" />
            <span>الرجوع إلى السجل</span>
          </Link>
        </div>

        {/* MAIN HEADER & SUB-TABS CARD */}
        <section className="rounded-xl border border-[#e6ecf2] bg-white shadow-2xs overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <h1 className="text-[22px] sm:text-[25px] font-black text-[#0f172a] leading-tight">
              إذن استلام رقم {data.number}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] font-semibold text-[#64748b]">
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar className="h-3.5 w-3.5 text-[#94a3b8]" />
                <span>تاريخ الاستلام:</span>
                <strong className="font-bold text-[#334155]">
                  {data.receivedAt || "19 نوفمبر 2024"}
                </strong>
              </span>

              <span className="text-[#cbd5e1]">•</span>

              <span className="inline-flex items-center gap-1.5">
                <FiUser className="h-3.5 w-3.5 text-[#94a3b8]" />
                <span>بواسطة:</span>
                <strong className="font-bold text-[#334155]">
                  {data.receivedBy || "سلطان العتيبي"}
                </strong>
              </span>

              <span className="text-[#cbd5e1]">•</span>

              <span className="inline-flex items-center gap-1.5">
                <FiFileText className="h-3.5 w-3.5 text-[#94a3b8]" />
                <span>أمر الشراء المرتبط:</span>
                <strong className="font-extrabold text-[#1e293b]">
                  أمر شراء {data.poNumber || "231-2024"}
                </strong>
              </span>

              <span className="text-[#cbd5e1]">•</span>

              <span className="inline-flex items-center gap-1.5">
                <FiMapPin className="h-3.5 w-3.5 text-[#94a3b8]" />
                <span>المستودع:</span>
                <strong className="font-bold text-[#334155]">
                  {data.warehouse || "مستودع السلي المركزي"}
                </strong>
              </span>
            </div>
          </div>

          {/* TABS BAR */}
          <div className="border-t border-[#eef2f6] bg-[#fafcfd] px-5 py-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("executive")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-[12px] font-bold transition ${
                activeTab === "executive"
                  ? "bg-white text-[#0f172a] border border-[#e2e8f0] shadow-2xs"
                  : "text-[#64748b] hover:text-[#1e293b]"
              }`}
            >
              <FiClock className="h-3.5 w-3.5 text-[#0d658a]" />
              <span>الملخص التنفيذي</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("audit")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-[12px] font-bold transition ${
                activeTab === "audit"
                  ? "bg-white text-[#0f172a] border border-[#e2e8f0] shadow-2xs"
                  : "text-[#64748b] hover:text-[#1e293b]"
              }`}
            >
              <FiList className="h-3.5 w-3.5 text-[#64748b]" />
              <span>التفاصيل الكاملة والتدقيق</span>
            </button>
          </div>
        </section>

        {activeTab === "executive" ? (
          <>
            {/* PARTIAL RECEIPT ALERT BANNER */}
            <section className="rounded-xl border border-[#fde68a] bg-[#fffbeb]/70 px-5 py-3.5 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#fcd34d] bg-[#fef3c7] text-[#d97706]">
                    <FiAlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-black text-[#1e293b] leading-snug">
                      استلام جزئي — {totalReceived} من {totalOrdered} قطعة ({completionPercent}%)
                    </h2>
                    <p className="text-[11.5px] font-medium text-[#64748b]">
                      بعض الأصناف لسه ناقصة، التفاصيل موضحة ومفصلة أدناه.
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#fde68a] bg-white px-2.5 py-1 text-[11px] font-bold text-[#b45309]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                  <span>
                    {receiptStatusLabels[data.status]
                      ? "بانتظار استكمال التوريد"
                      : "بانتظار استكمال التوريد"}
                  </span>
                </span>
              </div>
            </section>

            {/* 3 STAT CARDS */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* المطلوب */}
              <div className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs">
                <div className="flex items-center justify-between text-[12px] font-bold text-[#64748b]">
                  <span>المطلوب</span>
                  <FiFileText className="h-4 w-4 text-[#94a3b8]" />
                </div>
                <div className="mt-2.5 text-[24px] font-black text-[#0f172a] leading-none">
                  {totalOrdered}
                </div>
                <div className="mt-1.5 text-[11px] font-medium text-[#94a3b8]">
                  قطعة تعاقدية معتمدة
                </div>
              </div>

              {/* المستلم الفعلي */}
              <div className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs">
                <div className="flex items-center justify-between text-[12px] font-bold text-[#64748b]">
                  <span>المستلم الفعلي</span>
                  <FiClipboard className="h-4 w-4 text-[#94a3b8]" />
                </div>
                <div className="mt-2.5 text-[24px] font-black text-[#0f172a] leading-none">
                  {totalReceived}
                </div>
                <div className="mt-1.5 text-[11px] font-medium text-[#94a3b8]">
                  قطعة مقبولة ومفحوصة فنياً
                </div>
              </div>

              {/* الناقص */}
              <div className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs">
                <div className="flex items-center justify-between text-[12px] font-bold text-[#64748b]">
                  <span>الناقص</span>
                  <FiClipboard className="h-4 w-4 text-[#0d658a]" />
                </div>
                <div className="mt-2.5 text-[24px] font-black text-[#0d658a] leading-none">
                  {totalRemaining}
                </div>
                <div className="mt-1.5 text-[11px] font-medium text-[#94a3b8]">
                  قطعة متبقية قيد المتابعة
                </div>
              </div>
            </section>

            {/* RECEIVED ITEMS SECTION */}
            <section className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-extrabold text-[#1e293b]">
                    الأصناف المستلمة ({data.items.length} أصناف)
                  </h3>
                  <span className="rounded-md bg-[#f1f5f9] px-2.5 py-0.5 text-[10.5px] font-bold text-[#64748b]">
                    محضر فحص رقم {data.inspectionReportNumber || "402"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedAll((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#64748b] hover:text-[#1e293b]"
                >
                  <span>{expandedAll ? "طي الكل" : "توسيع الكل"}</span>
                  {expandedAll ? (
                    <FiChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <FiChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Featured Partial Item Card */}
              {firstPartialItem && (
                <div className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Right Info */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#bae6fd] bg-[#f0f9ff]">
                        {renderItemIcon(firstPartialItem.iconType || "cable")}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-[13.5px] font-extrabold text-[#0f172a]">
                            {firstPartialItem.name}
                          </h4>
                          <span className="inline-flex items-center rounded-md border border-[#fde68a] bg-[#fffbeb] px-2 py-0.5 text-[10.5px] font-bold text-[#b45309]">
                            {firstPartialItem.statusBadge ||
                              `استلام جزئي (مقبول ${firstPartialItem.receivedQty} ${
                                firstPartialItem.unit || "بكرة"
                              })`}
                          </span>
                        </div>
                        <p className="mt-1 text-[11.5px] font-medium text-[#64748b]">
                          {firstPartialItem.description ||
                            "المتبقي قيد التوريد في دفعة قادمة مجدولة مع الناقل اللوجستي المعتمد."}
                        </p>
                      </div>
                    </div>

                    {/* Left Quantities Split Box */}
                    <div className="flex items-center divide-x divide-x-reverse divide-[#e2e8f0] rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 shrink-0">
                      <div className="pl-4 text-right">
                        <span className="block text-[10px] font-semibold text-[#94a3b8]">
                          الكمية المسجلة
                        </span>
                        <span className="mt-0.5 block text-[13px] font-extrabold text-[#1e293b]">
                          {firstPartialItem.orderedQty} {firstPartialItem.unit || "بكرة"} مطلوبة
                        </span>
                      </div>

                      <div className="pr-4 text-right">
                        <span className="block text-[10px] font-bold text-[#0d658a]">
                          الناقص المؤجل
                        </span>
                        <span className="mt-0.5 block text-[13.5px] font-black text-[#0d658a]">
                          {firstPartialItem.remainingQty ??
                            Math.max(
                              0,
                              Number(firstPartialItem.orderedQty || 0) -
                                Number(firstPartialItem.receivedQty || 0)
                            )}{" "}
                          {firstPartialItem.unit || "بكرة"} متبقية
                        </span>
                      </div>
                    </div>
                  </div>

                  {expandedAll && (
                    <div className="mt-3.5 pt-2">
                      <div className="flex items-center justify-between text-[10.5px] font-semibold text-[#64748b] mb-1.5">
                        <span>
                          نسبة الاستيفاء الفعلي:{" "}
                          <strong className="font-extrabold text-[#1e293b]">
                            {firstPartialItem.progressPercent ??
                              Math.round(
                                (Number(firstPartialItem.receivedQty || 0) /
                                  (Number(firstPartialItem.orderedQty) || 1)) *
                                  100
                              )}
                            %
                          </strong>
                        </span>
                        <span>
                          {firstPartialItem.pendingLabel ||
                            `${
                              100 -
                              (firstPartialItem.progressPercent ??
                                Math.round(
                                  (Number(firstPartialItem.receivedQty || 0) /
                                    (Number(firstPartialItem.orderedQty) || 1)) *
                                    100
                                ))
                            }% معلقة`}
                        </span>
                      </div>

                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0] flex justify-end">
                        <div
                          className="h-full rounded-full bg-[#0d658a]"
                          style={{
                            width: `${
                              firstPartialItem.progressPercent ??
                              Math.round(
                                (Number(firstPartialItem.receivedQty || 0) /
                                  (Number(firstPartialItem.orderedQty) || 1)) *
                                  100
                              )
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Other Matched Item Cards */}
              {expandedAll &&
                otherItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-[#e6ecf2] bg-white px-4 py-3.5 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">
                          {renderItemIcon(item.iconType || "server")}
                        </div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="text-[13px] font-extrabold text-[#0f172a]">
                            {item.name}
                          </h4>
                          {item.subLabel && (
                            <span className="text-[11px] font-medium text-[#94a3b8]">
                              • {item.subLabel}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-[#334155]">
                          {item.unit || `${item.receivedQty} من أصل ${item.orderedQty}`}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[10.5px] font-bold text-[#334155]">
                          <FiCheckCircle className="h-3 w-3 text-[#64748b]" />
                          <span>{item.statusBadge || "مكتمل ومطابق 100%"}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </section>

            {/* INFO NOTE BAR */}
            <section className="rounded-xl border border-[#e6ecf2] bg-[#f8fafc] px-4 py-3 text-[11.5px] font-medium text-[#64748b] flex items-center gap-2">
              <FiInfo className="h-4 w-4 text-[#94a3b8] shrink-0" />
              <span>
                يمكنك الاطلاع على سجل التدقيق الزمني الكامل وجدول الفروقات التفصيلي عبر تبويب{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("audit")}
                  className="font-bold text-[#334155] underline hover:text-[#0d658a]"
                >
                  «التفاصيل الكاملة»
                </button>
              </span>
            </section>
          </>
        ) : (
          /* AUDIT / FULL DETAILS TAB */
          <section className="rounded-xl border border-[#e6ecf2] bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h2 className="text-[15px] font-extrabold text-[#0f172a]">
                جدول الفروقات التفصيلي وسجل التدقيق
              </h2>
              <span className="text-[11.5px] font-semibold text-[#64748b]">
                المورد: {data.vendor}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-right text-[12.5px]">
                <thead>
                  <tr className="border-b border-[#e6ecf2] bg-[#f8fafc] text-[11.5px] font-bold text-[#64748b]">
                    <th className="px-4 py-3">الصنف</th>
                    <th className="px-4 py-3">الكمية في أمر الشراء</th>
                    <th className="px-4 py-3">الكمية المستلمة</th>
                    <th className="px-4 py-3">الناقص</th>
                    <th className="px-4 py-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {data.items.map((item) => {
                    const rem =
                      item.remainingQty ??
                      Math.max(0, Number(item.orderedQty || 0) - Number(item.receivedQty || 0));
                    return (
                      <tr key={item.id}>
                        <td className="px-4 py-3 font-bold text-[#1e293b]">{item.name}</td>
                        <td className="px-4 py-3 text-[#475569]">{item.orderedQty}</td>
                        <td className="px-4 py-3 font-bold text-[#0f172a]">{item.receivedQty}</td>
                        <td className="px-4 py-3 font-bold text-[#0d658a]">{rem}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-0.5 text-[11px] font-bold text-[#334155]">
                            {item.statusBadge || (rem > 0 ? "استلام جزئي" : "مكتمل")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* BOTTOM ACTION FOOTER BAR */}
        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e6ecf2] bg-white px-5 py-3.5 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setNotifiedVendor(true)}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3.5 text-[12px] font-bold text-[#1e293b] transition hover:bg-[#f8fafc]"
            >
              <FiBell className="h-3.5 w-3.5 text-[#2578A2]" />
              <span>{notifiedVendor ? "تم تنبيه المورد" : "تنبيه المورد بالنقص"}</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/accounts/Purches/invoices/inv-9041")}
              className="inline-flex h-[38px] items-center gap-2 rounded-lg bg-[#4D5461] px-4 text-[12px] font-bold text-white transition hover:bg-[#094e6b]"
            >
              <FiPlusSquare className="h-3.5 w-3.5" />
              <span>تسجيل فاتورة المورد الآن</span>
              <FiArrowLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          <Link
            href="/accounts/Purches/receipts"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#334155] hover:text-[#0d658a] transition"
          >
            <FiArrowRight className="h-3.5 w-3.5" />
            <span>الرجوع لقائمة أذونات الاستلام</span>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Details;