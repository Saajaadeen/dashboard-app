import {
    redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import {
  createDashboard,
  getUserDetails,
} from "server/dashboard.queries.server";
import { requireUserId, getUserId } from "server/session.server";
import DashboardCreateModal from "~/components/modals/DashboardCreateModal";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  const user = await getUserDetails(userId);

  return { user };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const userId = formData.get("userId") as string | null;
  const visibilityRaw = formData.get("visibility") as string;
  const visibility = JSON.parse(visibilityRaw) as string[];
  const permissionsRaw = formData.get("permissions") as string;
  const permissions = permissionsRaw.split(",");
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await createDashboard(userId, visibility, permissions, name, description);

  return redirect("/dashboard");
}

export default function DashboardCreate() {
  const { user } = useLoaderData<typeof loader>();
  return <DashboardCreateModal isAdmin={user?.isAdmin} userId={user?.id} />;
}
