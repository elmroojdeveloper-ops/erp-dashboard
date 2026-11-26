import React from 'react'
import Header from './Header'
import Filters from './Filters'
import Cards from './Cards'
import Chart from './Chart'
import DistributionAndWorkflow from './DistributionAndWorkflow'
import Table from './Table'
import AuditGovernance from './AuditGovernance'
import AuditFooter from './AuditFooter'

const AuditReports = () => {
  return <>
  <Header/>
  <Filters/>
  <Cards/>
  <Chart/>
  <DistributionAndWorkflow/>
  <Table/>
  <AuditGovernance/>
  <AuditFooter/>
  </>
}

export default AuditReports
