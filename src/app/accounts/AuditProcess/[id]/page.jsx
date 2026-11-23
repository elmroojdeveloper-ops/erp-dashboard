import React from 'react'
import Details from '../../components/utils/AuditProcess/Details'

const page = async ({ params }) => {
  const { id } = await params;

  return <Details id={decodeURIComponent(id)} />;
};

export default page
