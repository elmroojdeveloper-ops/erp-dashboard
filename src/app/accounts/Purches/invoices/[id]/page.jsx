import { Suspense } from "react";
import Details from "../../../components/utils/Purches/Invoices/Details";

export const instant = false;

async function InvoiceDetails({ params }) {
  const { id } = await params;
  return <Details id={decodeURIComponent(id)} />;
}

const page = ({ params }) => (
  <Suspense
    fallback={
      <div className="py-10 text-center text-sm text-muted">جاري التحميل...</div>
    }
  >
    <InvoiceDetails params={params} />
  </Suspense>
);

export default page;