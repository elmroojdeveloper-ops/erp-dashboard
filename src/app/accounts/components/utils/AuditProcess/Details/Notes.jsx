"use client";

import React from "react";
import { FiClock } from "react-icons/fi";

/* ============================================================
   بيانات تجريبية مطابقة للصورة (استبدلها ببيانات الـ API)
============================================================ */
const MOCK_GENERAL_NOTES = [
  {
    id: "NOTE-1",
    content:
      "تم رصد عدم تطابق في الأرصدة الافتتاحية مقارنة بميزان المراجعة للعام السابق.",
    timeAgo: "منذ 20 دقيقة",
  },
  {
    id: "NOTE-2",
    content:
      "وُجدت مستندات غير معتمدة من الإدارة المختصة لتأكيد صحة الصرف.",
    timeAgo: "منذ 20 دقيقة",
  },
  {
    id: "NOTE-3",
    content:
      "توجد قيود يومية مرحلة دون وجود مستندات مؤيدة أو فواتير داعمة.",
    timeAgo: "منذ 20 دقيقة",
  },
  {
    id: "NOTE-4",
    content:
      "يلزم إجراء جرد فعلي للمخزون أو الأصول الثابتة لمطابقتها مع الدفاتر المحاسبية.",
    timeAgo: "منذ 20 دقيقة",
  },
  {
    id: "NOTE-5",
    content:
      "تم اكتشاف فروقات في التسوية البنكية لم يتم تسويتها في حينه.",
    timeAgo: "منذ 20 دقيقة",
  },
];

const cx = (...c) => c.filter(Boolean).join(" ");

const Notes = ({
  title = "ملاحظات عامه",
  notes = MOCK_GENERAL_NOTES,
  onSelectNote,
  className = "",
}) => {
  return (
    <section
      dir="rtl"
      className={cx(
        "rounded-[22px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* ===== عنوان القسم ===== */}
      <h2 className="mb-4 text-[15px] font-extrabold text-[#1f2937]">
        {title}
      </h2>

      {/* ===== قائمة الملاحظات ===== */}
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            role={onSelectNote ? "button" : undefined}
            tabIndex={onSelectNote ? 0 : undefined}
            onClick={() => onSelectNote?.(note)}
            onKeyDown={(e) => {
              if (!onSelectNote) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectNote(note);
              }
            }}
            className={cx(
              "rounded-xl bg-[#E6E8EC] px-4 py-3 text-right transition-colors",
              onSelectNote && "cursor-pointer hover:bg-[#ebeff3]"
            )}
          >
            <p className="text-[12.5px] font-semibold leading-[20px] text-[#374151]">
              {note.content}
            </p>

            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-[#8c96a0]">
              <FiClock size={11} />
              <span>{note.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notes;