"use client";

import { useRouter } from "next/navigation";
import { FiPlus, FiShield } from "react-icons/fi";

const Header = ({ onCreate, onExport, totalCount = 58 }) => {
    const router =useRouter()
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* العنوان + البادجات + محرك الفحص (يمين) */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-5">
          <h1 className="text-[26px] font-bold leading-9 tracking-tight text-[#1E293B]">
            سجل فواتير الشراء
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-6 items-center rounded-full bg-[#F1F5F9] px-3 text-xs font-medium text-[#475569]">
              {totalCount} فاتورة مسجلة
            </span>

            <span
              dir="ltr"
              className="inline-flex h-6 items-center gap-2 rounded-full border border-[#BBD9EA] bg-[#EAF3F8] px-3 text-xs font-bold text-primary"
            >
              <FiShield className="size-3.5 shrink-0" />
              ZATCA e-Invoice Tier 2
            </span>
          </div>
        </div>

        <p className="mt-1.5 flex items-center gap-2 text-xs text-[#64748B]">
          <span className="size-2 shrink-0 rounded-full bg-[#10B981]" />
          محرك الفحص الذكي: نشط
        </p>
      </div>

      {/* الأزرار (يسار) */}
      <div className="flex flex-wrap items-center gap-[11px]">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex min-h-9 w-[156px] items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-3 py-1 text-center text-xs font-medium leading-4 text-[#475569] transition hover:bg-surface"
        >
          تصدير السجل (Excel / CSV)
        </button>

        <button
          type="button"
          onClick={()=>{
            router.push("/accounts/Purches/invoices/AddPurchesInvoice")
          }}
          className="inline-flex min-h-9 w-[172px] items-center justify-between gap-2 rounded-lg bg-primary px-4 py-1 text-xs font-bold leading-4 text-white transition hover:bg-primary-dark"
        >
          <span className="flex-1 text-start">تسجيل فاتورة مورد جديدة</span>
          <FiPlus className="size-[18px] shrink-0" />
        </button>
      </div>
    </section>
  );
};

export default Header;