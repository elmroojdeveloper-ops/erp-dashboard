"use client";

import { FiDownload } from "react-icons/fi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { MdOutlineNoteAdd } from "react-icons/md";

const Header = ({
  committee = "لجنة المراجعة",
  year = "2026",
  onExport,
  onCustomize,
  onCreate,
}) => {
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* العنوان + البادج + الوصف (يمين) */}
      <div className="w-full ">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold leading-tight text-[#1E293B]">
            التقارير المحاسبية الشاملة
          </h1>

          <span className="inline-flex h-[42px] shrink-0 items-center gap-1.5 rounded-full bg-[#E8EEF4] px-3">
            <span className="size-2 shrink-0 rounded-full bg-primary" />
            <span className="text-xs font-medium flex gap-1  text-[#1E293B]">
              {committee}
            
              <span>{year}</span>
            </span>
          </span>
        </div>

        <p className="mt-1 text-sm leading-[22px] text-[#64748B]">
          التحكم المركزي واستعراض كافة التقارير والتدقيقات المالية للشركات
          والمجموعات التابعة
        </p>
      </div>

      {/* الأزرار (يسار) */}
      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#1E293B] transition hover:bg-surface"
        >
          <FiDownload className="size-4" />
          تصدير شامل
        </button>

        <button
          type="button"
          onClick={onCustomize}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#1E293B] transition hover:bg-surface"
        >
          <LuSlidersHorizontal className="size-4" />
          تخصيص لوحة التقارير
        </button>

        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          <MdOutlineNoteAdd className="size-4" />
          تقرير مالي مخصص
        </button>
      </div>
    </section>
  );
};

export default Header;