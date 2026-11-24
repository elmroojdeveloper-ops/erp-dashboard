"use client";

import { FiFileText, FiImage } from "react-icons/fi";
import { BsFiletypePdf } from "react-icons/bs";

const cardClass =
  "rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-6";

const fieldBoxClass =
  "flex h-11 items-center justify-center rounded-full bg-[#F0F4F8] px-4";

const InfoItem = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-1.5 text-[12px] font-medium text-[#94A3B8]">{label}</p>
    <div className={fieldBoxClass}>
      <p className="truncate text-sm font-semibold text-[#475569]">{value}</p>
    </div>
  </div>
);

const DetailsTap = ({ data }) => {
  return (
    <>
      <section className={cardClass}>
        <div className="mb-4 flex items-center gap-2 border-b border-[#E8EEF2] pb-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#EAF3F7] text-primary">
            <FiFileText className="size-4" />
          </span>
          <h2 className="text-[15px] font-bold text-primary">معلومات الطلب</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
          <InfoItem label="تاريخ الطلب" value={data.requestDate} />
          <InfoItem label="تصنيف الشراء" value={data.category} />
          <InfoItem label="القسم الطالب" value={data.department} />
          <InfoItem
            label="الميزانية التقديرية"
            value={`${data.budget} ر.س`}
          />
          <InfoItem label="العملة" value={data.currency} />

          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <p className="mb-1.5 text-[12px] font-medium text-[#94A3B8]">
              الملاحظات
            </p>
            <div className="flex min-h-11 items-center rounded-full bg-[#F0F4F8] px-4 py-2.5">
              <p className="text-sm leading-6 text-[#475569]">
                &ldquo;{data.notes}&rdquo;
              </p>
            </div>
          </div>
          <InfoItem label="تاريخ الاستحقاق" value={data.dueDate} />
        </div>
      </section>

      <section className={cardClass}>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-primary">بنود الطلب</h2>
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
            {data.items.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-right">
            <thead>
              <tr className="border-b border-cool-gray bg-[#eef3f6] text-[13px] font-semibold text-muted">
                <th className="w-12 rounded-tr-xl px-4 py-3">#</th>
                <th className="px-4 py-3">اسم الصنف</th>
                <th className="w-28 px-4 py-3">الكمية</th>
                <th className="w-28 rounded-tl-xl px-4 py-3">الوحدة</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-cool-gray last:border-0"
                >
                  <td className="px-4 py-3.5 text-sm font-bold text-primary">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-deep">
                    {item.name}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-deep">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-deep">{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${cardClass} w-full lg:w-3/4`}>
        <div className="mb-4 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#EAF3F7] text-primary">
            <FiFileText className="size-4" />
          </span>
          <h2 className="text-[15px] font-bold text-[#334155]">المرفقات</h2>
        </div>

        <div className="flex w-full flex-col gap-2.5">
          {data.attachments.map((file) => {
            const isPdf = /\.pdf$/i.test(file.name);
            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);

            return (
              <div
                key={file.id}
                className="flex w-full items-center gap-3 rounded-[12px] bg-[#EEF3F6] px-4 py-3.5"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-[9px] ${
                    isPdf
                      ? "bg-[#FCE8E8] text-[#E53935]"
                      : isImage
                        ? "bg-[#E3EDFB] text-[#3B82F6]"
                        : "bg-[#EAF3F7] text-primary"
                  }`}
                >
                  {isPdf ? (
                    <BsFiletypePdf className="size-5" />
                  ) : isImage ? (
                    <FiImage className="size-5" />
                  ) : (
                    <FiFileText className="size-5" />
                  )}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-[#1E293B]">
                    {file.label || file.name}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#94A3B8]">{file.size}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default DetailsTap;
