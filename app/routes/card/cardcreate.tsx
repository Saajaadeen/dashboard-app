import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams
} from "react-router";
import { createCard, getCardInfo } from "server/card.queries.server";
import { getDashboard, getUserDetails } from "server/dashboard.queries.server";
import { requireUserId, getUserId } from "server/session.server";
import CardCreateModal from "~/components/modals/CardCreateModal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  const user = await getUserDetails(userId);
  const dashboard = await getDashboard(params.id);
  const cardsInfo = await getCardInfo(params.id)

  return { user, dashboard, cardsInfo };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const dashboardId = formData.get("dashboardId") as string;
  const cardGroup = formData.get("cardGroup") as string;
  const position = Number(formData.get("position"));
  const size = formData.get("size") as string;

  await createCard(
    name,
    url,
    imageUrl,
    dashboardId,
    cardGroup,
    position,
    size,
  );

  return redirect(`/dashboard?panel=${dashboardId}`);
}

export default function CardCreate() {
  const { id: dashboardId } = useParams();
  const { dashboard, cardsInfo } = useLoaderData<typeof loader>();

  return (
    <CardCreateModal
      dashboardId={dashboardId!}
      dashboard={dashboard}
      cards={cardsInfo}
    />
  );
}
