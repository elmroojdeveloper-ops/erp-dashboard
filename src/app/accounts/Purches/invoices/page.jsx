import Link from "next/link";

const page = () => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-card sm:p-8">
      <h1 className="text-xl font-bold text-primary sm:text-2xl">
        فاتورة الشراء
      </h1>
      <p className="mt-3 text-sm text-muted">الصفحة قيد التصميم.</p>
      <Link
        href="/accounts/Purches"
        className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
      >
        الرجوع لطلب شراء
      </Link>
    </section>
  );
};

export default page;
