"use client";

const cardClass =
  "rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(35,70,90,0.04)] sm:p-6";

const ActivityTap = () => {
  return (
    <section className={`${cardClass} py-12 text-center`}>
      <p className="text-sm font-semibold text-muted">
        تبويب «سجل النشاطات» قيد التجهيز.
      </p>
    </section>
  );
};

export default ActivityTap;
