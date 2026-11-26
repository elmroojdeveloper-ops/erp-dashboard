import React from 'react'
import Header from './Header'
import Cards from './Cards'
import Filters from './Filters'
import Chart from './Chart'
import ThisMonth from './ThisMonth'
import Distribute from './Distribute'
import Table from './Table'

const AccountsReports = () => {
  return <>
  <Header/>
  <Filters/>
  <Cards/>
  <div className='grid my-6 grid-cols-1 lg:grid-cols-3 gap-4'>
    <Chart/>
    <ThisMonth/>
  </div>
  <Distribute/>
  <Table/>
  </>
}

export default AccountsReports
