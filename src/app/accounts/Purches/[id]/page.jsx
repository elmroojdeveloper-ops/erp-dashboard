import Details from "../../components/utils/Purches/Home/Details";

const page = async ({ params }) => {
  const { id } = await params;
  return <Details id={decodeURIComponent(id)} />;
};

export default page;
