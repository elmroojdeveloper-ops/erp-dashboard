import BottomSection from "../utils/Accounting/FixedAssets/BottomSection";
import Header from "../utils/Accounting/FixedAssets/Header";
import Table from "../utils/Accounting/FixedAssets/Table";

export const FixedAsset = () => {
  return (
    <div className="flex flex-col gap-4 pb-2 sm:gap-5 lg:gap-6">
      <Header />
      <Table />
      <BottomSection />
    </div>
  );
};
