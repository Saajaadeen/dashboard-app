import { 
  useParams, 
  useLoaderData, 
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs 
} from "react-router";
import CardEditModal from "~/components/modals/CardEditModal";
import { getCard, updateCard, deleteCard, getCardInfo } from "server/card.queries.server";
import { getDashboard } from "server/dashboard.queries.server";
import { requireUserId } from "server/session.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUserId(request);
  const { dashboardId, cardId } = params;

  const card = await getCard(cardId!);

  const dashboard = await getDashboard(dashboardId!);
  const cardsInfo = await getCardInfo(dashboardId!);

  return { card, dashboard, cardsInfo };
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireUserId(request);
  const { dashboardId, cardId } = params;
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "delete") {
    await deleteCard(cardId!);
    return redirect(`/dashboard?panel=${dashboardId}`);
  }

  if (intent === "update") {
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const cardGroup = formData.get("cardGroup") as string;
    const position = Number(formData.get("position"));
    const size = formData.get("size") as "SM" | "MD" | "LG" | "XL";

    await updateCard(cardId, name, url, imageUrl, cardGroup, position, size );
    return redirect(`/dashboard?panel=${dashboardId}`);
  }

  return redirect(`/dashboard?panel=${dashboardId}`);
}

export default function CardEdit() {
  const { dashboardId } = useParams();
  const { card, dashboard, cardsInfo } = useLoaderData<typeof loader>();

  if (!card) return <p className="text-white">Card not found</p>;

  return (
    <CardEditModal
      dashboardId={dashboardId!}
      dashboard={dashboard}
      card={card}
      cards={cardsInfo} // pass the cards info for groups & positions
    />
  );
}
