import React from 'react'
import Details from '../../components/utils/DiscountNotifications/Details';

const page =  async ({ params }) => {
  const { id } = await params;

  return <Details id={id} />;
};

export default page
