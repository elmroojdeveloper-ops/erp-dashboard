import Details from "../../components/utils/PaymentReview/Details";

const page = async ({ params }) => {
  const { id } = await params;

  return <Details id={decodeURIComponent(id)} />;
};

export default page;
