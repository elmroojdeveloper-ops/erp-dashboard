
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiArrowLeft,
  FiSend,
  FiDownload,
  FiInfo,
  FiMapPin,
  FiPaperclip,
  FiUploadCloud,
  FiFileText,
  FiCreditCard,
  FiCopy,
  FiClock,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

const Details = ({ id }) => {
  const [activeTab, setActiveTab] = useState("sales");
  const [activeFilter, setActiveFilter] = useState("all");
  const [copied, setCopied] = useState(false);

  const invoices = [
    {
      id: "#INV-2024-001",
      date: "15 مايو 2024",
      amount: "12,500 ر.س",
      due: "2024/05/20",
      status: "مستحقة",
      isDue: true,
    },
    {
      id: "#INV-2024-001",
      date: "02 أبريل 2024",
      amount: "4,250.00",
      due: "02 مايو 2024",
      status: "مدفوعة",
      isDue: false,
    },
    {
      id: "#INV-2024-001",
      date: "02 أبريل 2024",
      amount: "4,250.00",
      due: "02 مايو 2024",
      status: "مدفوعة",
      isDue: false,
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    if (activeFilter === "due") return invoice.isDue;
    if (activeFilter === "paid") return !invoice.isDue;
    return true;
  });

  const copyIBAN = async () => {
    try {
      await navigator.clipboard.writeText(
        "SA45 8000 0000 1234 5678 9012"
      );
      setCopied(true);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const InfoItem = ({ label, value, badge = false }) => (
    <div className="min-w-0 text-right">
      <p className="text-[12px] text-[#596273]">{label}</p>
      <p
        className={`mt-2 break-words text-[12px] text-[#657080] ${
          badge
            ? "inline-block rounded-full bg-[#E9EDF1] px-3 py-1 text-[10px]"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );

  const SectionTitle = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 text-[#505A6C]">
      <Icon className="shrink-0 text-[19px] text-[#2781A5]" />
      <h2 className="text-[15px] font-bold">{children}</h2>
    </div>
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full pb-2 text-[#505A6C]"
      style={{
        fontFamily: "Cairo, Arial, sans-serif",
      }}
    >
      {/* ================= PAGE HEADER ================= */}

      <div className="flex min-h-[67px] flex-wrap items-center justify-between gap-3 rounded-[12px] bg-white px-[17px] py-3 shadow-sm">
        {/* العنوان في اليمين */}

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-[17px] font-extrabold text-[#287FA4]">
            فاتورة رقم {id || "INV-2023-00045"}
          </h1>

          <span className="rounded-full bg-[#E6F5EC] px-3 py-1 text-[10px] font-bold text-[#22A765]">
            مدفوعة بالكامل
          </span>

          <span className="rounded-full bg-[#EDF5F8] px-3 py-1 text-[10px] font-bold text-[#287FA4]">
            ● مباشر
          </span>
        </div>

        {/* الأزرار في الشمال */}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex h-[35px] items-center gap-1.5 rounded-[9px] bg-[#287FA4] px-3 text-[11px] font-bold text-white transition hover:bg-[#216D8E]"
          >
            <FiSend size={14} />
            إرسال للعميل
          </button>

          <button
            type="button"
            className="flex h-[35px] items-center gap-1.5 rounded-[9px] bg-[#287FA4] px-3 text-[11px] font-bold text-white transition hover:bg-[#216D8E]"
          >
            <FiDownload size={14} />
            تحميل PDF
          </button>

          <Link
            href="/accounts/Invoice"
            className="flex items-center gap-1.5 text-[12px] font-bold text-[#287FA4]"
          >
            الرجوع
            <FiArrowLeft size={15} />
          </Link>
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}

      {/*
        مهم جداً:
        الاتجاه LTR للشبكة فقط.
        أول عنصر = العمود الشمال.
        ثاني عنصر = المحتوى الرئيسي يمين.
        كل محتوى داخلي RTL.
      */}

      <div
        dir="ltr"
        className="mt-[21px] grid grid-cols-[257px_minmax(0,1fr)] items-start gap-[16px] max-[950px]:grid-cols-1"
      >
        {/* ==========================================
            LEFT COLUMN - INTERNAL SIDEBAR
        ========================================== */}

        <aside
          dir="rtl"
          className="flex min-w-0 flex-col gap-[20px] max-[950px]:order-2"
        >
          {/* ===== ATTACHMENTS ===== */}

          <section className="rounded-[13px] bg-white p-[17px]">
            <SectionTitle icon={FiPaperclip}>
              المرفقات
            </SectionTitle>

            <div className="mt-4 flex min-h-[183px] flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-[#DCE4EA] px-3 text-center">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EDF5F8] text-[#287FA4]">
                <FiUploadCloud size={21} />
              </div>

              <p className="mt-3 text-[12px] font-bold text-[#287FA4]">
                اسحب الملفات هنا
              </p>

              <p className="mt-2 text-[10px] leading-5 text-[#8993A3]">
                عقود، مستندات ضريبية أو ملفات
                <br />
                تعريفية (Max 10MB)
              </p>

              <label className="mt-2 cursor-pointer rounded-full bg-[#EDF5F8] px-4 py-1.5 text-[11px] font-bold text-[#657080] transition hover:bg-[#DCEBF1]">
                تصفح الجهاز
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[10px] bg-[#EDF5F8] px-3 py-2.5">
              <div>
                <p className="text-[11px] font-bold text-[#505A6C]">
                  invoice_001.pdf
                </p>
                <p className="mt-1 text-[10px] text-[#8993A3]">
                  1.2 MB
                </p>
              </div>

              <div className="rounded-[8px] bg-[#FCE9E8] p-2 text-[#D52C2C]">
                <FiFileText size={17} />
              </div>
            </div>
          </section>

          {/* ===== SMART HINTS ===== */}

          <section className="relative overflow-hidden rounded-[13px] bg-[#287FA4] p-[20px] text-white shadow-[0_7px_13px_rgba(30,89,116,0.13)]">
            <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/[0.09]" />
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.09]" />

            <div className="relative flex items-center gap-2">
              <FiInfo size={17} />
              <h3 className="text-[14px] font-bold">
                تلميحات ذكية
              </h3>
            </div>

            <p className="relative mt-5 text-[12px] leading-[1.9]">
              هناك فاتورة مستحقة بقيمة 12,500 ر.س خلال 30 يوم.
              يُرجى مراجعة إدارة الحسابات لتجهيز الدفعة لتجنب التأخير.
            </p>
          </section>

          {/* ===== ACTIVITY LOG ===== */}

          <section className="rounded-[13px] bg-white p-[17px]">
            <SectionTitle icon={FiBarChart2}>
              سجل النشاط
            </SectionTitle>

            <div className="mr-[7px] mt-5 space-y-5 border-r border-[#DCE5EA] pr-4">
              {[
                [
                  "تم تسجيل فاتورة جديدة",
                  "اليوم 10:30 صباحاً",
                  true,
                ],
                [
                  "تم تعديل البيانات البنكية",
                  "25 مايو 2024",
                  false,
                ],
                [
                  "تم إضافة المورد للنظام",
                  "12 يناير 2024",
                  false,
                ],
              ].map(([title, date, active]) => (
                <div key={title} className="relative">
                  <span
                    className={`absolute -right-[21px] top-1 h-[10px] w-[10px] rounded-full border-2 border-white ${
                      active ? "bg-[#12B981]" : "bg-[#287FA4]"
                    }`}
                  />

                  <p className="text-[11px] font-bold text-[#596273]">
                    {title}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-[10px] text-[#8993A3]">
                    <FiClock size={10} />
                    {date}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== FINANCIAL SUMMARY ===== */}

          <section className="relative overflow-hidden rounded-[13px] bg-[#287FA4] p-[22px] text-white shadow-[0_7px_13px_rgba(30,89,116,0.13)]">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/[0.09]" />
            <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-white/[0.09]" />

            <h3 className="relative text-[16px] font-bold">
              ملخص مالي
            </h3>

            <div className="relative mt-7">
              <p className="text-[12px] text-white/80">
                الرصيد المستحق حالياً
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[28px] font-extrabold">
                  1,245,600
                </span>
                <span className="text-[12px]">ر.س</span>
              </div>

              <div className="my-7 border-t border-white/40" />

              <p className="text-[12px] text-white/80">
                إجمالي المشتريات (هذا العام)
              </p>

              <p className="mt-2 text-[20px] font-bold">
                44,750.00
                <span className="mr-1 text-[13px]">ر.س</span>
              </p>
            </div>

            <div className="relative mt-8 flex h-7 items-end gap-1 opacity-20">
              <div className="h-7 w-10 rounded-t-sm bg-white" />
              <div className="h-4 w-9 rounded-t-sm bg-white" />
              <div className="h-2 w-9 rounded-t-sm bg-white" />
              <div className="h-3 w-10 rounded-t-sm bg-white" />
              <div className="h-2 flex-1 rounded-t-sm bg-white" />
            </div>
          </section>
        </aside>

        {/* ==========================================
            RIGHT COLUMN - MAIN CONTENT
        ========================================== */}

        <main
          dir="rtl"
          className="flex min-w-0 flex-col gap-[16px] max-[950px]:order-1"
        >
          {/* ===== BASIC INFORMATION ===== */}

          <section className="rounded-[13px] bg-white p-[17px]">
            <SectionTitle icon={FiInfo}>
              معلومات أساسية
            </SectionTitle>

            <div className="mt-6 grid grid-cols-3 gap-x-5 gap-y-6 max-sm:grid-cols-2">
              <InfoItem
                label="اسم المورد"
                value="شركة التقنية المتقدمة"
              />

              <InfoItem
                label="رقم الهاتف"
                value="+966 11 234 5678"
              />

              <InfoItem
                label="الرقم الضريبي (VAT)"
                value="300123456700003"
              />

              <InfoItem
                label="البريد الإلكتروني"
                value="contact@advancedtech.sa"
              />

              <InfoItem
                label="الموقع الإلكتروني"
                value="www.advancedtech.sa"
              />

              <InfoItem
                label="عملة التعامل"
                value="ريال سعودي (SAR)"
              />

              <InfoItem
                label="التصنيف"
                value="تقنية معلومات"
                badge
              />

              <InfoItem
                label="الرقم المرجعي"
                value="AST-2024-001"
                badge
              />
            </div>
          </section>

          {/* ===== ADDRESS AND LOCATION ===== */}

          <section className="rounded-[13px] bg-white p-[17px]">
            <SectionTitle icon={FiMapPin}>
              العنوان والتواجد
            </SectionTitle>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_216px] items-center gap-4 max-sm:grid-cols-1">
              <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                <InfoItem
                  label="الشارع"
                  value="شارع العليا العام، حي العليا"
                />

                <InfoItem
                  label="رقم المبنى"
                  value="3452"
                />

                <InfoItem
                  label="المدينة"
                  value="الرياض"
                />

                <InfoItem
                  label="الدولة"
                  value="المملكة العربية السعودية"
                />
              </div>

              <div className="relative h-[116px] overflow-hidden rounded-[10px] bg-[#EDF5F8] max-sm:h-[180px]">
                <img
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Riyadh&zoom=12&size=500x300"
                  alt="موقع الفرع الرئيسي في الرياض"
                  className="h-full w-full object-cover"
                />

                <span className="absolute bottom-2 right-2 rounded-full bg-[#287FA4] px-3 py-1 text-[10px] text-white">
                  ● الفرع الرئيسي
                </span>
              </div>
            </div>
          </section>

          {/* ===== SALES TABS ===== */}

          <section className="rounded-[13px] bg-white p-[17px]">
            <div className="flex gap-1 rounded-[13px] bg-[#EDF5F8] p-1">
              {[
                {
                  id: "sales",
                  label: "المبيعات والمشتريات",
                },
                {
                  id: "accounting",
                  label: "الربط المحاسبي",
                },
                {
                  id: "notes",
                  label: "ملاحظات",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-[10px] px-2 py-2 text-[11px] font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-[#287FA4] shadow-sm"
                      : "text-[#818B9B]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "sales" && (
              <div className="mt-5 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-[12px] font-bold text-[#555]">
                      مندوب المبيعات (جهة المورد)
                    </p>

                    <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-[#EDF5F8] p-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#287FA4] text-[10px] font-bold text-white">
                        SA
                      </span>

                      <div>
                        <p className="text-[12px] font-bold">
                          سالم عبدالله
                        </p>

                        <p
                          className="text-[10px] text-[#8993A3]"
                          dir="ltr"
                        >
                          +966 50 123 4567
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-[12px] font-bold text-[#555]">
                      شروط الدفع
                    </p>

                    <span className="inline-flex items-center gap-1 rounded-[8px] border border-[#287FA4] px-3 py-1.5 text-[11px] font-bold text-[#287FA4]">
                      <FiCalendar size={13} />
                      صافي 30 يوم
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#EDF1F4] pt-5">
                  <p className="text-[12px] font-bold text-[#555]">
                    طريقة الدفع الافتراضية
                  </p>

                  <p className="mt-3 flex items-center gap-2 text-[12px] font-bold text-[#287FA4]">
                    <FiCreditCard />
                    تحويل بنكي
                  </p>
                </div>
              </div>
            )}

            {activeTab !== "sales" && (
              <div className="flex min-h-[100px] items-center justify-center text-[12px] text-[#8993A3]">
                لا توجد بيانات في هذا القسم
              </div>
            )}
          </section>

          {/* ===== BANK INFORMATION ===== */}

          <section className="rounded-[13px] bg-white p-[17px]">
            <SectionTitle icon={FiCreditCard}>
              البيانات البنكية
            </SectionTitle>

            <div className="mt-6 grid grid-cols-3 gap-x-5 gap-y-7 max-sm:grid-cols-2">
              <InfoItem
                label="اسم البنك"
                value="بنك الراجحي"
              />

              <InfoItem
                label="اسم الحساب"
                value="شركة التقنية المتقدمة لتقنية المعلومات"
              />

              <InfoItem
                label="العملة"
                value="ريال سعودي (SAR)"
              />

              <InfoItem
                label="البريد الإلكتروني"
                value="contact@advancedtech.sa"
              />

              <InfoItem
                label="الموقع الإلكتروني"
                value="www.advancedtech.sa"
              />

              <InfoItem
                label="عملة التعامل"
                value="ريال سعودي (SAR)"
              />
            </div>

            <div className="mt-7 border-t border-[#EDF1F4] pt-5">
              <p className="text-[12px] text-[#555]">
                IBAN
              </p>

              <div
                className="mt-3 flex items-center justify-between gap-3 rounded-full bg-[#E9EBEF] px-4 py-3"
                dir="ltr"
              >
                <button
                  type="button"
                  onClick={copyIBAN}
                  className="text-[#7C8798] transition hover:text-[#287FA4]"
                  title="نسخ رقم الحساب"
                >
                  {copied ? "Copied" : <FiCopy size={16} />}
                </button>

                <span className="text-[11px] text-[#596273]">
                  SA45 8000 0000 1234 5678 9012
                </span>
              </div>
            </div>

            <div className="mt-7 border-t border-[#EDF1F4] pt-5">
              <p className="text-[12px] text-[#555]">
                SWIFT Code
              </p>

              <p
                className="mt-3 text-[12px] text-[#596273]"
                dir="ltr"
              >
                RJHI SA RI
              </p>
            </div>
          </section>

          {/* ===== INVOICE HISTORY ===== */}

          <section className="overflow-hidden rounded-[17px] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 px-[17px] py-[17px]">
              <SectionTitle icon={FiFileText}>
                سجل الفواتير الأخيرة
              </SectionTitle>

              <div className="flex rounded-[9px] bg-[#EDF5F8] p-1">
                {[
                  ["all", "الكل"],
                  ["due", "مستحقة"],
                  ["paid", "مدفوعة"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(key)}
                    className={`rounded-[7px] px-3 py-1 text-[11px] font-bold transition ${
                      activeFilter === key
                        ? "bg-white text-[#287FA4] shadow-sm"
                        : "text-[#8993A3]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[570px] text-right text-[11px]">
                <thead>
                  <tr className="bg-[#EDF5F8] text-[#697486]">
                    <th className="px-4 py-3 font-bold">
                      رقم الفاتورة
                    </th>

                    <th className="px-4 py-3 font-bold">
                      التاريخ
                    </th>

                    <th className="px-4 py-3 font-bold">
                      المبلغ
                    </th>

                    <th className="px-4 py-3 font-bold">
                      تاريخ الاستحقاق
                    </th>

                    <th className="px-4 py-3 font-bold">
                      الحالة
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map((invoice, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#F1F3F5] last:border-0"
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-bold text-[#555]">
                        {invoice.id}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-[#596273]">
                        {invoice.date}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-[#596273]">
                        {invoice.amount}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-[#596273]">
                        {invoice.due}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold ${
                            invoice.isDue
                              ? "bg-[#FCE9E8] text-[#D52C2C]"
                              : "bg-[#E6F5EC] text-[#16A45C]"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Details;
