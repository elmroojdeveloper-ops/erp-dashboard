import React from 'react'
import Header from './Header'
import Filter from './Filter'
import Cards from './Cards'
import Chart from './Chart'
import Quality from './Quality'
import SubMetrics from './SubMetrics'
import AuditTable from './Table'

const OpeningBalanceReports = () => {
  return <>
  <Header/>
  <Filter/>
  <Cards/>
  <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
    <Chart />
    <Quality/>
  </div>
  <SubMetrics/>
  <AuditTable/>
  </>
}

export default OpeningBalanceReports
