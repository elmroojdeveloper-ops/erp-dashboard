import React from 'react'
import Details from '../../components/utils/Suppliers/Home/Details';

const page  = async ({ params }) => {
  const { id } = await params;

  return <Details id={id} />;
};


export default page
