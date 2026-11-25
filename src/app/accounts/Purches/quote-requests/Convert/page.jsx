import { redirect } from "next/navigation";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const prId = params?.pr ? String(params.pr) : "1";
  redirect(`/accounts/Purches/${encodeURIComponent(prId)}`);
};

export default page;
