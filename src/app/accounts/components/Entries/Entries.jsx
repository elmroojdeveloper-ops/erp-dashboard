import Cards from "../utils/Accounting/Entries/Cards";
import Header from "../utils/Accounting/Entries/Header";
import Table from "../utils/Accounting/Entries/Table";

const Entries = () => {
  return (
    <div className="flex flex-col gap-4 pb-2 sm:gap-5 lg:gap-6">
      <Header />
      <Cards />
      <Table />
    </div>
  );
};

export default Entries;
