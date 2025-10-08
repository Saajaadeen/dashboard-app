import { prisma } from "./db.server";

export async function createCard(
  name: string,
  url: string,
  imageUrl: string,
  dashboardId: string,
) {
  const card = await prisma.card.create({
    data: {
      name,
      url,
      imageUrl,
      dashboardId,
    },
  });
  return card;
}

export async function getCards(dashboardId: string) {
    const cards = await prisma.card.findMany({
        where: { dashboardId },
    });
    
    return cards;
}

export async function getCard(cardId: string | undefined) {
  if (!cardId) return null;
  
  const card = await prisma.card.findUnique({
    where: { id: cardId },
  });
  
  return card;
}

export async function updateCard(
  cardId: string,
  name: string,
  url: string,
  imageUrl: string,
) {
  const card = await prisma.card.update({
    where: { id: cardId },
    data: {
      name,
      url,
      imageUrl,
    },
  });
  
  return card;
}

export async function deleteCard(cardId: string) {
  const card = await prisma.card.delete({
    where: { id: cardId },
  });
  
  return card;
}
