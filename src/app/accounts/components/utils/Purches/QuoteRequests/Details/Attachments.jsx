"use client";

import { BsFiletypeDocx, BsFiletypePdf } from "react-icons/bs";
import {
  FiDownload,
  FiEye,
  FiFileText,
  FiPaperclip,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";

const typeVisual = {
  PDF: {
    bg: "bg-[#FDECEA]",
    text: "text-[#D32F2F]",
    Icon: BsFiletypePdf,
  },
  DOCX: {
    bg: "bg-[#E8F1F7]",
    text: "text-[#1B6A9C]",
    Icon: BsFiletypeDocx,
  },
  DOC: {
    bg: "bg-[#E8F1F7]",
    text: "text-[#1B6A9C]",
    Icon: BsFiletypeDocx,
  },
  XLSX: {
    bg: "bg-[#E6F4EA]",
    text: "text-[#2E7D32]",
    Icon: FiFileText,
  },
};

const Attachments = ({ files = [] }) => (
  <section className="rounded-[16px] border border-[#E5EDF2] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)]">
    <header className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-full bg-[#E8F1F7] text-[#1B6A9C]">
          <FiPaperclip className="size-4" />
        </span>
        <h2 className="text-[13px] font-bold text-[#1A2332]">المرفقات</h2>
      </div>
      <span className="inline-flex rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-bold text-[#64748B]">
        {files.length} ملفات
      </span>
    </header>

    <ul className="space-y-2.5">
      {files.map((file) => {
        const visual = typeVisual[file.type] || {
          bg: "bg-[#E8F1F7]",
          text: "text-[#1B6A9C]",
          Icon: FiFileText,
        };
        const Icon = visual.Icon;

        return (
          <li
            key={file.id}
            className="flex items-center gap-3 rounded-[12px] bg-[#EEF3F6] px-3.5 py-3"
          >
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-[9px] ${visual.bg} ${visual.text}`}
            >
              <Icon className="size-5" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-[#1A2332]">
                {file.name}
              </p>
              <p className="mt-0.5 text-[10px] text-[#94A3B8]">
                {file.size}
                {file.uploadedAt ? ` • ${file.uploadedAt}` : null}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-[#94A3B8]">
              <button
                type="button"
                aria-label="تحميل"
                className="hover:text-[#1B6A9C]"
              >
                <FiDownload className="size-4" />
              </button>
              <button
                type="button"
                aria-label="معاينة"
                className="hover:text-[#1B6A9C]"
              >
                <FiEye className="size-4" />
              </button>
              <button
                type="button"
                aria-label="حذف"
                className="hover:text-[#D32F2F]"
              >
                <FiTrash2 className="size-4" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>

    <button
      type="button"
      className="mt-3 flex w-full flex-col items-center justify-center gap-1 rounded-[12px] border border-dashed border-[#B9D3E4] bg-[#F8FBFD] px-3 py-3.5"
    >
      <span className="inline-flex items-center gap-2 text-[12px] font-bold text-[#1B6A9C]">
        <FiUploadCloud className="size-4" />
        إرفاق ملحق إضافي أو مستند
      </span>
      <span className="text-[10px] font-medium text-[#94A3B8]">
        بحد أقصى 10MB ، PDF, DOCX, XLSX
      </span>
    </button>
  </section>
);

export default Attachments;
