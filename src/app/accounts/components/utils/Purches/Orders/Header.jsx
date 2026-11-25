"use client";

import Link from "next/link";
import React from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const Header = ({ onCreate, onAudit, countLabel = "86 أمر شراء موثق" }) => {
  return (
    <header
      dir="rtl"
      className="flex flex-wrap items-center justify-between gap-4 py-1.5"
    >
      <div className="flex items-center gap-3">
        <h1 className="text-[28px] font-extrabold tracking-tight text-[#0f172a] leading-[1.2]">
          سجل أوامر الشراء
        </h1>
        <span className="inline-flex items-center rounded-md border border-[#e2e8f0] bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-bold text-[#64748b] leading-none">
          {countLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Link
          href="/accounts/Purches/orders/CreateOrder"
          onClick={(e) => {
            if (onCreate) {
              e.preventDefault();
              onCreate();
            }
          }}
          className="inline-flex h-[40px] items-center gap-2 rounded-lg bg-[#fffaf0] px-4 text-[12.5px] font-bold text-[#2578A2] transition hover:bg-[#ecf4f8]"
        >
          <FiAlertTriangle className="h-4 w-4 shrink-0 text-[#2578A2]" />
          <span>إنشاء أمر شراء يدوي (استثنائي)</span>
        </Link>

        <button
          type="button"
          onClick={onAudit}
          className="inline-flex h-[40px] items-center gap-2 rounded-lg bg-[#095c7a] px-4 text-[12.5px] font-bold text-white transition hover:bg-[#074961]"
        >
          <FiCheckCircle className="h-4 w-4 shrink-0 text-white" />
          <span>إنشاء تدقيق</span>
        </button>
      </div>
    </header>
  );
};

export default Header;