import EntryDetails from "../../../components/utils/AuditProcess/Details/EntryDetails/EntryDetails";

const page = async ({ params }) => {
  const { id, entryId } = await params;

  return (
    <EntryDetails
      auditId={decodeURIComponent(id)}
      entryId={decodeURIComponent(entryId)}
    />
  );
};

export default page;
