import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect, useLoaderData, useParams } from "react-router";
import { createCard } from "server/card.queries.server";
import { getDashboard, getUserDetails } from "server/dashboard.queries.server";
import { requireUserId, getUserId } from "server/session.server";
import CardCreateModal from "~/components/modals/CardCreateModal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  const user = await getUserDetails(userId);
  const dashboard = await getDashboard(params.id);

  return { user, dashboard };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const dashboardId = formData.get("dashboardId") as string;

  await createCard( name, url, imageUrl, dashboardId)
  return redirect(`/dashboard?panel=${dashboardId}`);
}

export default function CardCreate() {
  const { id: dashboardId } = useParams();
  const { dashboard } = useLoaderData<typeof loader>();

  return (
    <CardCreateModal
      dashboardId={dashboardId!}
      dashboard={dashboard}
    />
  );
}
