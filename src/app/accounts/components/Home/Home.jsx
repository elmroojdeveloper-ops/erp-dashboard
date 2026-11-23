import Cards from "../utils/Home/Cards";
import ExpensesChart from "../utils/Home/ExpensesChart";
import Hero from "../utils/Home/Hero";
import LatestInvoices from "../utils/Home/LatestInvoices";
import LatestOrder from "../utils/Home/LatestOrder";
import SalesChart from "../utils/Home/SalesChart";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 pb-2 sm:gap-5 lg:gap-6">
      <Hero />
      <Cards />

      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1.55fr_1fr] lg:gap-6">
        <SalesChart />
        <ExpensesChart />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
        <LatestInvoices />
        <LatestOrder />
      </div>
    </div>
  );
};

export default Home;
