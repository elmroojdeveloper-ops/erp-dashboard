import React from 'react'
import Header from './Header'
import Filter from './Filter'
import Cards from './Cards'
import Chart from './Chart'
import ThisMonth from './ThisMonth'
import Distribute from './Distribute'
import Table from './Table'

const AssetReports = () => {
  return <>
  <Header/>
  <Filter/>
  <Cards/>
  <div className='grid my-6 grid-cols-1 gap-4 lg:grid-cols-3'>
    <Chart/>
    <ThisMonth/>
  </div>
  <Distribute/>
  <Table/>
  </>
}

export default AssetReports
