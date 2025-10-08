import { useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { getUserDetails, updateUserInfo } from "server/dashboard.queries.server";
import { getUserId, requireUserId } from "server/session.server";
import UserSettingsModal from "~/components/modals/UserSettingsModal";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  const user = await getUserDetails(userId);
  return { user };
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const firstName = formData.get("firstName")?.toString() || undefined;
  const lastName = formData.get("lastName")?.toString() || undefined;
  const email = formData.get("email")?.toString() || undefined;
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (newPassword && confirmPassword && newPassword === confirmPassword) {
    return updateUserInfo(userId, firstName, lastName, email, newPassword);
  }
  return updateUserInfo(userId, firstName, lastName, email, undefined);
}


export default function UserSettings() {
  const { user } = useLoaderData<typeof loader>();
  return <UserSettingsModal user={user}/>;
}
