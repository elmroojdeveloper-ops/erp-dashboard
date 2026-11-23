import Details from "../../components/utils/Accounting/Entries/Details";

const EntryPage = async ({ params }) => {
  const { id } = await params;

  return <Details id={id} />;
};

export default EntryPage;
