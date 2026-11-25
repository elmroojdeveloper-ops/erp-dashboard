import { FiDownload, FiEye, FiPaperclip, FiPlus, FiUploadCloud } from "react-icons/fi";

const Attachments = ({ files = [] }) => (
  <article className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(35,70,90,0.05)]">
    <header className="mb-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-[#0d658a] text-white">
          <FiPaperclip className="size-4" />
        </span>
        <div>
          <h2 className="text-[13px] font-extrabold text-[#0f172a]">المرفقات والوثائق الثبوتية</h2>
          <p className="text-[10px] font-medium text-[#94a3b8]">{files.length} وثائق مسجلة بالنظام</p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] hover:bg-white"
        aria-label="إرفاق ملف"
      >
        <FiPlus className="size-4" />
      </button>
    </header>

    <ul className="mb-3 space-y-2">
      {files.map((file) => (
        <li
          key={file.id}
          className="flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafc] px-2.5 py-2"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#ffe4e6] text-[#e11d48]">
            <span className="text-[9px] font-extrabold">PDF</span>
          </span>
          <FileInfo file={file} />
          <span className="ms-auto flex shrink-0 gap-0.5">
            <button type="button" className="rounded p-1.5 text-[#64748b] hover:bg-white hover:text-[#0d658a]" aria-label="عرض">
              <FiEye className="size-3.5" />
            </button>
            <button type="button" className="rounded p-1.5 text-[#64748b] hover:bg-white hover:text-[#0d658a]" aria-label="تحميل">
              <FiDownload className="size-3.5" />
            </button>
          </span>
        </li>
      ))}
    </ul>

    <label className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-dashed border-[#bae6fd] bg-[#f0f9ff] px-3 py-4 text-center">
      <FiUploadCloud className="size-6 text-[#94a3b8]" />
      <span className="text-[11px] font-bold text-[#475569]">إسقاط ملفات إضافية هنا أو تصفح</span>
      <span className="text-[9.5px] font-medium text-[#94a3b8]">الحد الأقصى للملف 25 ميجابايت (PDF, DOCX, ZIP)</span>
      <input type="file" className="sr-only" multiple />
    </label>
  </article>
);

function FileInfo({ file }) {
  return (
    <div className="min-w-0 flex-1 text-right">
      <p className="truncate text-[11.5px] font-bold text-[#1e293b]">{file.name}</p>
      <p className="text-[10px] text-[#64748b]">
        {file.size}
        {file.verified ? " • موثق" : ""}
      </p>
    </div>
  );
}

export default Attachments;