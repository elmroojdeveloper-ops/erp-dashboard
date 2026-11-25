"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  FiSearch,
  FiCheckCircle,
  FiCamera,
  FiMapPin,
  FiCalendar,
  FiTruck,
  FiMinus,
  FiPlus,
  FiAlertTriangle,
  FiPrinter,
  FiArrowRight,
  FiLayers,
  FiServer,
  FiShield,
} from "react-icons/fi";

const validationSchema = Yup.object().shape({
  poSearch: Yup.string().required("رقم أمر الشراء أو كود الباركود مطلوب"),
  items: Yup.array().of(
    Yup.object().shape({
      receivedQty: Yup.number()
        .typeError("يجب أن يكون رقماً")
        .min(0, "لا يمكن أن تكون الكمية أقل من 0")
        .required("مطلوب")
        .test(
          "max-qty",
          "تجاوز الكمية المطلوبة",
          function (value) {
            const { orderedQty } = this.parent;
            return value === undefined || value <= orderedQty;
          }
        ),
    })
  ),
});

const AddRecipt = () => {
  const [scanNotice, setScanNotice] = useState(false);

  const initialValues = {
    poSearch: "PO-2024-231",
    warehouseLocation: "مستودع السلي المركزي — بوابة الشحن 4",
    poNumber: "PO-2024-231",
    poStatus: "معتمد للصرف والاستلام",
    vendorName: "شركة الخزائن المتقدمة للتجارة والتقنية",
    contractDate: "18 نوفمبر 2024",
    waybill: "TRK-99214 (ناقل سريع)",
    totalOrderedQty: 103,
    contractedItemsCount: 3,
    destinationWarehouse: "مستودع السلي",
    destinationGate: "الرياض — البوابة 4",
    grnNumber: "GRN-2024-889",
    items: [
      {
        id: "01",
        sku: "SKU: CBL-OPT-50M",
        title: "كابلات ألياف ضوئية فائقة السرعة OM4 المجهزة بطول 50 متراً",
        orderedQty: 100,
        unitLabel: "100 بكرة / لفة",
        receivedQty: 60,
        iconType: "cable",
      },
      {
        id: "02",
        sku: "SKU: SRV-NVME-G4",
        title: "خوادم تخزين سحابية NVMe Gen4 متقدمة ومجهزة ببطاقات حماية مزدوجة",
        orderedQty: 2,
        unitLabel: "2 وحدة سيرفر",
        receivedQty: 2,
        iconType: "server",
      },
      {
        id: "03",
        sku: "SKU: LIC-SEC-ENT3Y",
        title: "تراخيص نظام الحماية المؤسسية Enterprise Security Suite (3 سنوات)",
        orderedQty: 1,
        unitLabel: "1 باقة ترخيص رقمية",
        receivedQty: 1,
        iconType: "license",
      },
    ],
  };

  const renderItemIcon = (type) => {
    switch (type) {
      case "cable":
        return <FiLayers className="h-5 w-5 text-[#64748b]" />;
      case "server":
        return <FiServer className="h-5 w-5 text-[#64748b]" />;
      default:
        return <FiShield className="h-5 w-5 text-[#64748b]" />;
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-0 text-[#1e293b] font-sans select-none"
      style={{ fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted GRN:", values);
          alert(`تم تأكيد وحفظ إذن الاستلام (${values.grnNumber}) وطباعة الملصقات!`);
        }}
      >
        {({ values, setFieldValue }) => {
          const totalReceived = values.items.reduce(
            (sum, item) => sum + Number(item.receivedQty || 0),
            0
          );
          const totalOrdered = values.items.reduce(
            (sum, item) => sum + Number(item.orderedQty || 0),
            0
          );
          const completionRate =
            totalOrdered > 0 ? ((totalReceived / totalOrdered) * 100).toFixed(1) : "0.0";

          return (
            <Form className="mx-auto  p-4 sm:p-5 space-y-4">
              {/* PAGE HEADER CARD */}
              <section className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-[20px] font-extrabold text-[#0d658a] leading-tight">
                        تسجيل استلام بضاعة (GRN)
                      </h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-2.5 py-0.5 text-[11px] font-bold text-[#0d658a]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                        <span>وضع الفحص الميداني</span>
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] font-medium text-[#64748b]">
                      امسح رقم أمر الشراء أو ابحث عنه لبدء فحص وتسجيل استلام الشحنة وتوليد السند المخزني
                    </p>
                  </div>

                  {/* Warehouse Location Badge */}
                  <div className="flex items-center gap-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 text-right">
                    <div className="text-[11px] leading-tight">
                      <span className="block font-semibold text-[#94a3b8]">موقع الاستلام الحالي</span>
                      <span className="font-extrabold text-[#1e293b]">
                        {values.warehouseLocation}
                      </span>
                    </div>
                    <FiMapPin className="h-4 w-4 text-[#0d658a] shrink-0" />
                  </div>
                </div>
              </section>

              {/* PO SEARCH & BARCODE SCAN CARD */}
              <section className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="poSearch"
                    className="text-[12px] font-extrabold text-[#1e293b]"
                  >
                    رقم أمر الشراء أو كود الباركود / RFID
                  </label>
                  {scanNotice && (
                    <span className="text-[11px] font-bold text-[#0d658a]">
                      جاهز لمسح الباركود عبر الكاميرا...
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Field
                      id="poSearch"
                      name="poSearch"
                      type="text"
                      placeholder="ابحث برقم أمر الشراء أو امسح الباركود..."
                      className="h-[42px] w-full rounded-lg border border-[#cbd5e1] bg-[#f8fafc] pr-4 pl-36 text-[13px] font-extrabold text-[#1e293b] focus:border-[#0d658a] focus:bg-white focus:outline-none"
                    />

                    {/* Found Badge inside input */}
                    {values.poSearch && (
                      <span className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-md border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5 text-[10.5px] font-bold text-[#16a34a]">
                        <FiCheckCircle className="h-3 w-3" />
                        <span>تم العثور على الأمر</span>
                      </span>
                    )}

                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setScanNotice((prev) => !prev)}
                    className="inline-flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0d658a] px-4 text-[12.5px] font-bold text-white transition hover:bg-[#094e6b]"
                  >
                    <FiCamera className="h-4 w-4" />
                    <span>مسح الباركود [كاميرا]</span>
                  </button>
                </div>

                <ErrorMessage
                  name="poSearch"
                  component="div"
                  className="mt-1.5 text-[11px] font-bold text-[#dc2626]"
                />
              </section>

              {/* PO SUMMARY DARK TEAL BANNER */}
              <section className="rounded-xl bg-[#0b5c7a] px-5 py-4 text-white shadow-2xs">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Right Side: PO Info */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-md bg-white/15 px-2.5 py-1 text-[13px] font-black tracking-wide text-white">
                        {values.poNumber}
                      </span>
                      <span className="rounded-full bg-[#10b981]/20 border border-[#34d399]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#a7f3d0]">
                        {values.poStatus}
                      </span>
                    </div>

                    <h2 className="mt-2 text-[16px] font-extrabold text-white">
                      {values.vendorName}
                    </h2>

                    <div className="mt-1.5 flex flex-wrap items-center gap-4 text-[11.5px] text-white/80 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <FiCalendar className="h-3.5 w-3.5 text-white/70" />
                        <span>تاريخ التعاقد: {values.contractDate}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiTruck className="h-3.5 w-3.5 text-white/70" />
                        <span>بوليصة شحن: {values.waybill}</span>
                      </span>
                    </div>
                  </div>

                  {/* Left Side: 3 Stat Boxes */}
                  <div className="grid grid-cols-3 gap-2.5 shrink-0">
                    <div className="min-w-[115px] rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-center">
                      <span className="block text-[10px] font-semibold text-white/75">
                        الكمية الإجمالية المطلوبة
                      </span>
                      <span className="mt-1 block text-[18px] font-black text-white leading-tight">
                        {totalOrdered}
                      </span>
                      <span className="block text-[10px] text-white/70">قطعة / وحدة</span>
                    </div>

                    <div className="min-w-[105px] rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-center">
                      <span className="block text-[10px] font-semibold text-white/75">
                        الأصناف التعاقدية
                      </span>
                      <span className="mt-1 block text-[18px] font-black text-white leading-tight">
                        {values.contractedItemsCount}
                      </span>
                      <span className="block text-[10px] text-white/70">بنود معتمدة</span>
                    </div>

                    <div className="min-w-[125px] rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-center">
                      <span className="block text-[10px] font-semibold text-white/75">
                        مستودع الوجهة
                      </span>
                      <span className="mt-1 block text-[13px] font-extrabold text-white leading-snug">
                        {values.destinationWarehouse}
                      </span>
                      <span className="block text-[10px] text-white/70">
                        {values.destinationGate}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ITEMS INSPECTION LIST HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <FiSearch className="h-4 w-4 text-[#0d658a]" />
                  <h3 className="text-[14px] font-extrabold text-[#1e293b]">
                    قائمة فحص الأصناف والشحنة الواردة
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-[#94a3b8]">
                  يتم الحفظ التلقائي لكل بند فور التعديل
                </span>
              </div>

              {/* ITEMS INSPECTION CARDS */}
              <FieldArray name="items">
                {() => (
                  <div className="space-y-3">
                    {values.items.map((item, index) => {
                      const currentQty = Number(item.receivedQty || 0);
                      const isPartial = currentQty < item.orderedQty;

                      return (
                        <div
                          key={item.id}
                          className="rounded-xl border border-[#e6ecf2] bg-white p-4 shadow-2xs transition hover:border-[#cbd5e1]"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Right Side: Item Details & Icon */}
                            <div className="flex items-start gap-3.5 min-w-0">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                                {renderItemIcon(item.iconType)}
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded bg-[#f1f5f9] px-2 py-0.5 text-[10.5px] font-bold text-[#64748b]">
                                    بند رقم #{item.id}
                                  </span>
                                  <span className="text-[10.5px] font-bold text-[#94a3b8]">
                                    {item.sku}
                                  </span>
                                </div>

                                <h4 className="mt-1 text-[13.5px] font-extrabold text-[#1e293b] leading-snug">
                                  {item.title}
                                </h4>

                                <p className="mt-1 text-[11px] font-medium text-[#64748b]">
                                  الكمية التعاقدية المطلوبة:{" "}
                                  <strong className="font-extrabold text-[#0d658a]">
                                    {item.unitLabel}
                                  </strong>
                                </p>
                              </div>
                            </div>

                            {/* Left Side: Quantity Counter & Quick Receive All */}
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-3 shrink-0">
                              {/* Counter Box */}
                              <div className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      `items[${index}].receivedQty`,
                                      Math.max(0, currentQty - 1)
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#475569] transition hover:bg-[#f1f5f9]"
                                  aria-label="إنقاص الكمية"
                                >
                                  <FiMinus className="h-3.5 w-3.5" />
                                </button>

                                <div className="min-w-[68px] text-center px-1">
                                  <Field
                                    name={`items[${index}].receivedQty`}
                                    type="number"
                                    min={0}
                                    max={item.orderedQty}
                                    className="w-full bg-transparent text-center text-[17px] font-black text-[#0d658a] leading-none focus:outline-none"
                                  />
                                  <span className="block text-[9.5px] font-semibold text-[#94a3b8] mt-0.5">
                                    مستلم فعلي
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      `items[${index}].receivedQty`,
                                      Math.min(item.orderedQty, currentQty + 1)
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#475569] transition hover:bg-[#f1f5f9]"
                                  aria-label="زيادة الكمية"
                                >
                                  <FiPlus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              {/* Receive All & Status Tag */}
                              <div className="text-right min-w-[138px]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(`items[${index}].receivedQty`, item.orderedQty)
                                  }
                                  className="inline-flex items-center rounded-md border border-[#bae6fd] bg-[#f0f9ff] px-2.5 py-1 text-[11px] font-bold text-[#0d658a] transition hover:bg-[#e0f2fe]"
                                >
                                  [ استلام الكل: {item.orderedQty} ]
                                </button>

                                {isPartial ? (
                                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-bold text-[#d97706]">
                                    <FiAlertTriangle className="h-3 w-3 shrink-0" />
                                    <span>
                                      استلام جزئي (المتبقي: {item.orderedQty - currentQty} قطعة)
                                    </span>
                                  </div>
                                ) : (
                                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-bold text-[#16a34a]">
                                    <FiCheckCircle className="h-3 w-3 shrink-0" />
                                    <span>
                                      استلام كامل ({currentQty} من {item.orderedQty})
                                    </span>
                                  </div>
                                )}

                                <ErrorMessage
                                  name={`items[${index}].receivedQty`}
                                  component="div"
                                  className="mt-0.5 text-[10px] font-bold text-[#dc2626]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>

              {/* BOTTOM SUMMARY & ACTION BAR */}
              <section className="rounded-xl border border-[#e6ecf2] bg-white px-5 py-4 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[12.5px] font-extrabold text-[#1e293b]">
                    <FiTruck className="h-4 w-4 text-[#0d658a]" />
                    <span>
                      تم فحص واستلام{" "}
                      <strong className="font-black text-[#0d658a]">{totalReceived}</strong> من أصل{" "}
                      <strong className="font-black text-[#1e293b]">{totalOrdered}</strong> وحدة
                      إجمالية{" "}
                      <span className="text-[11px] font-semibold text-[#64748b]">
                        (معدل الإنجاز: {completionRate}%)
                      </span>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 py-1 text-[10.5px] font-bold text-[#b45309]">
                    <FiAlertTriangle className="h-3 w-3" />
                    <span>
                      استلام جزئي موثق — سيتم إصدار إذن استلام {values.grnNumber}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#095c7a] px-5 text-[13px] font-extrabold text-white transition hover:bg-[#074961]"
                  >
                    <FiPrinter className="h-4 w-4" />
                    <span>تأكيد وحفظ إذن الاستلام (GRN) — طباعة الملصقات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg border border-[#cbd5e1] bg-white px-5 text-[12.5px] font-bold text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    <FiArrowRight className="h-4 w-4" />
                    <span>إلغاء والعودة</span>
                  </button>
                </div>
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddRecipt;