"use client";

import { useRouter } from "next/navigation";
import VendorsTap from "../Home/Details/VendorsTap";
import Cards from "./Cards";
import Header from "./Header";

const VendorQuotes = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Header
        compareCount={3}
        onCompare={() =>
          router.push("/accounts/Purches/quote-requests/1/compare")
        }
        onCreate={() => router.push("/accounts/Purches/vendor-quotes/Add")}
      />
      <Cards />
      <VendorsTap />
    </div>
  );
};

export default VendorQuotes;
