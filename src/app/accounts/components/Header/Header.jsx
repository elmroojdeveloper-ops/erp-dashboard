"use client";

import Image from "next/image";
import { useState } from "react";
import { FiBell, FiMail, FiMenu, FiSearch } from "react-icons/fi";

export function Topbar({ onMenuClick }) {
  const [query, setQuery] = useState("");

  return (
    <header className="flex items-center gap-2 sm:gap-4 lg:gap-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-11 shrink-0 items-center justify-center rounded-[16px] bg-white text-primary shadow-card transition hover:scale-[1.03] lg:hidden"
        aria-label="فتح القائمة"
      >
        <FiMenu className="size-5" />
      </button>

      <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-3 shadow-card sm:h-[54px] sm:gap-4">
        <FiSearch className="size-5 shrink-0 text-muted sm:size-[22px]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="بحث عن عملاء، صفقات، أو مهام..."
          className="w-full truncate bg-transparent text-sm text-deep outline-none placeholder:text-soft sm:text-base"
        />
      </label>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-[16px] bg-white text-primary shadow-card transition hover:scale-[1.03] sm:size-[50px] sm:rounded-[20px]"
          aria-label="الإشعارات"
        >
          <FiBell className="size-5 sm:size-[22px]" />
        </button>
        <button
          type="button"
          className="hidden size-[50px] items-center justify-center rounded-[20px] bg-white text-primary shadow-card transition hover:scale-[1.03] sm:flex"
          aria-label="الرسائل"
        >
          <FiMail className="size-[22px]" />
        </button>
        <button
          type="button"
          className="relative size-11 overflow-hidden rounded-[16px] bg-white shadow-card transition hover:scale-[1.03] sm:size-[50px] sm:rounded-[20px]"
          aria-label="الملف الشخصي"
        >
          <Image
            src="/accounts/assets/avatar.jpg"
            alt="المستخدم"
            fill
            className="object-cover"
            sizes="50px"
          />
        </button>
      </div>
    </header>
  );
}
