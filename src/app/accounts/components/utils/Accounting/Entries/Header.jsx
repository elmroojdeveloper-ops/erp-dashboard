import Link from "next/link";
import { FiPlus, FiUpload } from "react-icons/fi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const Header = () => {
  return (
    <section className="rounded-xl bg-white p-4 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
          القيود اليومية
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/accounts/Entries/AddEntries"
            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-dark sm:text-base"
          >
            <FiPlus className="size-5" />
            إنشاء قيد جديد
          </Link>

          <Link
            href="/accounts/Entries/Export"
            className="flex h-11 items-center gap-2 rounded-xl border border-primary px-3 text-sm font-medium text-primary transition hover:bg-surface sm:text-base"
          >
            <FiUpload className="size-5" />
            إستيراد القيود
          </Link>

          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-gray px-3 text-sm font-medium text-gray transition hover:bg-surface sm:text-base"
          >
            <HiOutlineClipboardDocumentCheck className="size-5" />
            إنشاء تدقيق
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
