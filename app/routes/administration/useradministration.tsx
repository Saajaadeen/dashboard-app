import { redirect, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { authenticateAdmin } from "server/auth.queries.server";
import { getLoginInfo, updateLoginInfo } from "server/dashboard.queries.server";
import { requireUserId } from "server/session.server";
import UserAdministrationModal from "~/components/modals/UserAdministrationModal";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const isAdmin = await authenticateAdmin(userId);
  const loginInfo = await getLoginInfo()

  if (!isAdmin) {  return redirect("/dashboard"); }
  return { isAdmin, loginInfo };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const loginName   = formData.get("loginName")?.toString() || undefined;
  const loginImgUrl = formData.get("loginImgUrl")?.toString() || undefined;

  return updateLoginInfo( loginName, loginImgUrl)
}

export default function UserAdministration() {
  const { isAdmin, loginInfo } = useLoaderData<typeof loader>();
  if (!isAdmin) return null;
  return <UserAdministrationModal loginInfo={loginInfo}/>;
}
