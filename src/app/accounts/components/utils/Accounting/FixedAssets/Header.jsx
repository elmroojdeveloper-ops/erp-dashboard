import Link from "next/link";
import { FiPlus, FiUpload } from "react-icons/fi";
import { assetsTotalCount } from "./mock-data";

const Header = () => {
  return (
    <section className="rounded-xl bg-white p-4 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
            الأصول الثابتة
          </h1>
          <span className="inline-flex h-8 items-center rounded-full bg-surface px-3 text-sm font-semibold text-primary">
            {assetsTotalCount.toLocaleString("en-US")} أصل مسجل
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/accounts/FixedAsset/AddAsset"
            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-dark sm:text-base"
          >
            <FiPlus className="size-5" />
            إضافة أصل
          </Link>

          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-primary px-3 text-sm font-medium text-primary transition hover:bg-surface sm:text-base"
          >
            <FiUpload className="size-5" />
            استيراد
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
