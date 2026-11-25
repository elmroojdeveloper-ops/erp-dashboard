import { Suspense } from "react";
import Details from "../../../components/utils/Purches/Orders/Details";

export const instant = false;

async function OrderDetailsPage({ params }) {
  const { id } = await params;
  return <Details id={decodeURIComponent(id)} />;
}

const page = ({ params }) => (
  <Suspense
    fallback={
      <div className="py-10 text-center text-sm text-[#64748b]">جاري التحميل…</div>
    }
  >
    <OrderDetailsPage params={params} />
  </Suspense>
);

export default page;