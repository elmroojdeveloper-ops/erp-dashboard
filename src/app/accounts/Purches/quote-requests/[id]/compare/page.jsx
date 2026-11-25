import { Suspense } from "react";
import CompareOffers from "../../../../components/utils/Purches/QuoteRequests/CompareOffers";

export const instant = false;

async function CompareContent({ params }) {
  const { id } = await params;
  return <CompareOffers id={decodeURIComponent(id)} />;
}

const page = ({ params }) => (
  <Suspense
    fallback={
      <div className="py-10 text-center text-sm text-muted">جاري التحميل...</div>
    }
  >
    <CompareContent params={params} />
  </Suspense>
);

export default page;
