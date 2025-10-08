import { useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { getCards } from "server/card.queries.server";
import { getDashboards, getNotification, getUserDetails } from "server/dashboard.queries.server";
import { getUserId, requireUserId } from "server/session.server";
import DashboardForm from "~/components/forms/DashboardForm";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  const user = await getUserDetails(userId);
  const notifications = await getNotification();
  const userDashboards = await getDashboards(userId);

  const url = new URL(request.url);
  const panelId = url.searchParams.get("panel");

  let cards = [];
  let selectedDashboard = null;

  if (panelId) {
    selectedDashboard = userDashboards.find(d => d.id === panelId) ?? null;
    cards = await getCards(panelId);
  }

  return { user, notifications, userDashboards, cards, selectedDashboard };
}

export default function Dashboard() {
  const { user, notifications, userDashboards, cards, selectedDashboard } = useLoaderData<typeof loader>();

  return (
    <>
      <DashboardForm 
        notifications={notifications}
        user={user}
        userDashboards={userDashboards}
        selectedDashboard={selectedDashboard}
        cards={cards}
      />;
    </>
  )
}
