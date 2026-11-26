import React from 'react'
import Header from './Header'
import Cards from './Cards'
import MonthlyTrendChart from './MonthlyTrendChart'
import CategoryDistributionChart from './CategoryDistributionChart'
import VendorAgingReport from './VendorAgingReport'
import TopSuppliersTable from './TopSuppliersTable'
import PaymentTermsCard from './PaymentTermsCard'
import UpcomingInvoicesBar from './UpcomingInvoicesBar'

const SuppliersReports = () => {
  return <>
  <Header/>
  <Cards/>
  <div className='grid grid-cols-1 mt-8 lg:grid-cols-3 gap-5'>
     <MonthlyTrendChart/>
     <CategoryDistributionChart/>
  </div>
 <VendorAgingReport/>
  <div className='grid grid-cols-1 my-8 lg:grid-cols-3 gap-5'>
    <TopSuppliersTable/>
    <PaymentTermsCard/>
 </div>
 <UpcomingInvoicesBar/>
  </>
}

export default SuppliersReports
