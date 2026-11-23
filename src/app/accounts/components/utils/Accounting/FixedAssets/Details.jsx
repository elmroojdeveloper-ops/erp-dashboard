"use client"
import { useRouter } from "next/navigation";
import React from "react";
import {
  FiArrowRight,
  FiDownload,
  FiEdit2,
  FiFileText,
  FiInfo,
  FiShoppingBag,
  FiSlash,
  FiTrendingDown,
  FiUpload,
} from "react-icons/fi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const Details = ({id}) => {
    const router=useRouter()
  return (
    <div  className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-card">
        <div className="text-end">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <h1 className="text-xl font-bold text-primary md:text-2xl">
              ماك بوك برو M3 {id}
            </h1>
            <span className="rounded-full bg-[#EDF6F9] px-3 py-1 text-xs font-medium text-[#2D3748] ltr">
              AST-2024-001
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#ECF4F8] px-3 py-1 text-xs font-medium text-[#2578A2]">
              <span className="size-1.5 rounded-full bg-[#2578A2]" />
              في الخدمة
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">أجهزة حاسب آلي ومعدات مكتبية</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl bg-[#FDECEC] px-4 py-2.5 text-sm font-medium text-[#B20008]">
            <FiSlash className="size-4" />
            إيقاف / تصرف
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white">
            <FiDownload className="size-4" />
            تحميل PDF
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white">
            <FiEdit2 className="size-4" />
            تعديل
          </button>
          <button onClick={()=>{
            router.back()
          }} className="flex items-center gap-1.5 text-sm font-medium text-primary">
            الرجوع
            <FiArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* العمود اليمين - الرئيسي */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {/* معلومات أساسية */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">معلومات أساسية</h2>
              <FiInfo className="size-5 text-primary" />
            </div>

            <div className="grid grid-cols-3 gap-6 text-end">
              <div>
                <p className="text-sm font-medium text-deep">اسم الأصل</p>
                <p className="mt-1.5 text-sm text-muted">ماك بوك برو 16 - M3 بوصة</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">تصنيف الأصل</p>
                <p className="mt-1.5 text-sm text-primary">أجهزة حاسب آلي ومعدات مكتبية</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">الموقع الافتراضي</p>
                <p className="mt-1.5 text-sm text-muted">المكتب الرئيسي - الرياض</p>
              </div>
            </div>

            <div className="my-5 h-px bg-soft/60" />

            <div className="grid grid-cols-3 gap-6 text-end">
              <div>
                <p className="text-sm font-medium text-deep">الباركود</p>
                {/* باركود */}
                <div dir="ltr" className="mt-2 flex h-12 items-stretch justify-center gap-[2px] rounded-lg bg-[#F2F4F7] px-3 py-1.5">
                  {[3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1].map((w,i)=>(
                    <span key={i} style={{width: w}} className="bg-[#1A1A1A]" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">الكمية</p>
                <span className="mt-2 inline-block rounded-full bg-[#F2F4F7] px-3 py-1 text-xs text-muted">1 حبة</span>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">وحدة القياس</p>
                <span className="mt-2 inline-block rounded-full bg-[#F2F4F7] px-3 py-1 text-xs text-muted">أصل مفرد</span>
              </div>
            </div>

            <div className="my-5 h-px bg-soft/60" />

            <div className="grid grid-cols-2 gap-6 text-end">
              <div>
                <p className="text-sm font-medium text-deep">تاريخ بداية الخدمة</p>
                <p className="mt-1.5 text-sm text-muted">01/01/2024</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">الرقم التسلسلي</p>
                <p className="mt-1.5 text-sm text-muted">S/N-9920-X</p>
              </div>
            </div>
          </div>

          {/* تفاصيل الشراء */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">تفاصيل الشراء</h2>
              <FiShoppingBag className="size-5 text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-6 text-end">
              <div>
                <p className="text-sm font-medium text-deep">تاريخ الشراء</p>
                <p className="mt-1.5 text-sm text-muted">15/12/2023</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">سعر الشراء (غير شامل الضريبة)</p>
                <p className="mt-1.5 text-sm text-muted">10,869.57 SAR</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">ضريبة القيمة المضافة (15%)</p>
                <p className="mt-1.5 text-sm text-muted">1,630.43 SAR</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-6 text-end">
              <div>
                <p className="text-sm font-medium text-deep">حساب الدفع</p>
                <p className="mt-1.5 text-sm text-primary">البنك الراجحي - الجاري (1201)</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">المورد</p>
                <p className="mt-1.5 text-sm text-muted">شركة مكتبة جرير للتسويق</p>
              </div>
              <div>
                <p className="text-sm font-medium text-deep">التكلفة الإجمالية للأصل</p>
                <p className="mt-1.5 rounded-lg bg-[#EDF6F9] px-3 py-1.5 text-sm font-bold text-primary">12,500.00 SAR</p>
              </div>
            </div>
          </div>

          {/* تفاصيل الإهلاك */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">تفاصيل الإهلاك</h2>
              <FiTrendingDown className="size-5 text-primary" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F2F4F7] px-4 py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-deep">تقدم الإهلاك:</span>
                <span className="font-bold text-deep">25%</span>
              </div>
              <span className="text-xs text-muted">المدة المتبقية 36 شهر</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-soft/60" dir="ltr">
              <div className="h-full w-[25%] rounded-full bg-primary" />
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[520px] text-end">
                <thead>
                  <tr className="border-b border-soft/60 text-sm text-muted">
                    <th className="py-3 font-medium">السنة المالية</th>
                    <th className="py-3 font-medium">قيمة الإهلاك السنوي</th>
                    <th className="py-3 font-medium">الإهلاك المتراكم</th>
                    <th className="py-3 font-medium">صافي القيمة بنهاية العام</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-deep">
                  <tr className="border-b border-soft/40">
                    <td className="py-3.5">2025</td><td>3,125.00</td><td>6,250.00</td><td>4324343</td>
                  </tr>
                  <tr className="border-b border-soft/40">
                    <td className="py-3.5">2026</td><td>32434</td><td>132131</td><td>324`32532</td>
                  </tr>
                  <tr>
                    <td className="py-3.5">2026</td><td>32434</td><td>132131</td><td>324`32532</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* سجل النشاط */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">سجل النشاط</h2>
              <HiOutlineClipboardDocumentList className="size-5 text-primary" />
            </div>
            <div className="relative flex flex-col gap-7 pr-6">
              <div className="absolute right-[5px] top-1 bottom-1 w-px bg-soft" />
              {[
                { title: "اعتماد قيد", desc: "تم اعتماد قيد الإهلاك أحمد العلي", date: "21 يونيو 2026 - 10:15 ص", color: "bg-[#1AA386]" },
                { title: "تعديل بيانات", desc: "تم تعديل بيانات الشراء ساره علي", date: "21 يونيو 2026 - 11:30 ص", color: "bg-primary" },
                { title: "إنشاء اصل", desc: "تم إنشاء الأصل ساره علي", date: "21 يونيو 2026 - 1:30 ص", color: "bg-primary" },
              ].map((item, i) => (
                <div key={i} className="relative flex items-start justify-between gap-4">
                  <span className={`absolute -right-6 top-1.5 size-2.5 rounded-full ${item.color} ring-4 ring-white`} />
                  <div className="text-end">
                    <p className="text-sm font-bold text-deep">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* العمود الشمال */}
        <div className="flex flex-col gap-5">
          {/* صورة الأصل */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="mb-4 text-end text-lg font-bold text-primary">صورة الأصل</h2>
            <img
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80"
              alt="MacBook Pro"
              className="h-[190px] w-full rounded-xl object-cover"
            />
          </div>

          {/* المرفقات */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">المرفقات</h2>
              <span className="rounded-full bg-[#F2F4F7] px-2.5 py-1 text-xs text-muted">1 ملف</span>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-soft py-7 text-center">
              <FiUpload className="size-5 text-deep" />
              <p className="text-sm font-bold text-deep">اسحب وأفلت الفواتير هنا</p>
              <p className="text-xs text-primary">أو استعرض الملفات</p>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#EDF6F9] px-4 py-3">
              <div className="text-end">
                <p className="text-sm font-bold text-deep">invoice_001.pdf</p>
                <p className="mt-0.5 text-xs text-muted">1.2 MB</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#F8B4B4] text-white">
                <FiFileText />
              </span>
            </div>
          </div>

          {/* ملخص القيمة */}
          <div className="relative overflow-hidden rounded-2xl bg-[#1E7A9B] p-5 text-white shadow-card">
            <div className="pointer-events-none absolute -right-10 -top-14 size-36 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-12 -left-10 size-40 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="text-end text-lg font-bold">ملخص القيمة</h2>
              <div className="mt-6 flex items-center justify-between border-b border-white/25 pb-5">
                <span className="text-sm font-bold">12,500.00 SAR</span>
                <span className="text-sm">قيمة الشراء</span>
              </div>
              <div className="mt-5 flex items-center justify-between border-b border-white/25 pb-5">
                <span className="text-sm font-bold">12,500.00 SAR</span>
                <span className="text-sm">إجمالي الإهلاك حتى الآن</span>
              </div>
              <div className="mt-6 text-end">
                <p className="text-sm">صافي القيمة الدفترية الحالية</p>
                <p className="mt-2 text-[32px] font-extrabold leading-none">
                  9,375.00 <span className="text-base font-medium">ر.س</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs">
                  ↓ مستهلك بنسبة 25%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;