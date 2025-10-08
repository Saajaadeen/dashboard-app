import type { ActionFunctionArgs } from "react-router";
import { logoutUser, requireUserId } from "server/session.server";
import LogoutForm from "~/components/forms/LogoutForm";

export async function loader({ request }: ActionFunctionArgs) {
  await requireUserId(request);
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  await requireUserId(request);
  return logoutUser(request);
}

export default function Logout() {
  return <LogoutForm />;
}
