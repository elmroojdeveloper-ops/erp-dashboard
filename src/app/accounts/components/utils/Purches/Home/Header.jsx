"use client";

import { FiFileText, FiPlus } from "react-icons/fi";

const Header = ({ hasData = false, onCreate }) => {
  return (
    <section className="rounded-xl bg-white p-4 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
          طلبات الشراء
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCreate}
            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-dark sm:text-base"
          >
            <FiPlus className="size-5" />
            إنشاء طلب شراء جديد
          </button>

          {hasData && (
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-xl border border-primary px-3 text-sm font-medium text-primary transition hover:bg-surface sm:text-base"
            >
              <FiFileText className="size-5" />
              تحميل PDF
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
