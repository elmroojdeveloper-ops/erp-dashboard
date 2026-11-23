import Details from "../../components/utils/Accounting/FixedAssets/Details";

const page = async ({ params }) => {
  const { id } = await params;

  return <Details id={id} />;
};

export default page;
