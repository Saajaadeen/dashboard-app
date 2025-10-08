import { prisma } from "./db.server";
import bcrypt from "bcryptjs";

export async function getUserDetails(userId: string) {
  const userDetails = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      isAdmin: true,
    },
  });
  return userDetails;
}

export async function updateLoginInfo(loginName: string, loginImgUrl: string) {
  const loginInfo = await prisma.appSettings.upsert({
    where: { id: "DEFAULT" },
    update: {
      loginName,
      loginImgUrl,
    },
    create: {
      id: "DEFAULT",
      loginName,
      loginImgUrl,
    },
  });

  return loginInfo;
}

export async function sendNotification(
  title: string, 
  message: string,
) {
  const notification = await prisma.notifications.create({
    data: {
      title,
      message,
    },
  });
  return notification;
}

export async function getNotification() {
  const notification = await prisma.notifications.findMany({
    select: {
      id: true,
      title: true,
      message: true,
      createdAt: true,
      readById: true,
    },
  });
  return notification;
}

export async function deleteNotification(id: string) {
  return await prisma.notifications.delete({
    where: {
      id: id,
    },
  });
}

export async function getLoginInfo() {
  const loginInfo = await prisma.appSettings.upsert({
    where: { id: "DEFAULT" },
    update: {},
    create: {
      id: "DEFAULT",
      loginName: "Welcome Back",
      loginImgUrl: "",
    },
  });

  return loginInfo;
}

export async function updateUserInfo(
  userId: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
) {
  const data: any = {
    firstName,
    lastName,
    email,
    updatedAt: new Date(),
  };

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    data.password = hashed;
  }

  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

export async function createDashboard(
  userId: string | null,
  visibility: string[],
  permissions: string[],
  name: string,
  description: string
) {
  const data: any = {
    name,
    description,
    visibility,
    permissions,
  };

  if (userId) {
    data.user = { connect: { id: userId } };
  }

  const dashboard = await prisma.dashboard.create({ data });
  return dashboard;
}

export async function getDashboards(){
  const dashboard = await prisma.dashboard.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return dashboard;
}

export async function getDashboard(dashboardId: string){
  const dashboard = await prisma.dashboard.findUnique({
    where: { id: dashboardId},
  });

  return dashboard;
}

export async function updateDashboard(
  dashboardId: string,
  visibility: string[],
  permissions: string[],
  name: string, 
  description: string,
  userId?: string | null,
) {
  const data: any = {
    visibility,
    permissions,
    name,
    description,
  };

  if (userId) {
    data.user = { connect: { id: userId } };
  } else if (visibility.includes("PRIVATE") === false) {
    data.user = { disconnect: true };
  }

  const dashboard = await prisma.dashboard.update({
    where: { id: dashboardId },
    data,
  });

  return dashboard;
}

export async function deleteDashboard(dashboardId: string) {
  const dashboard = await prisma.dashboard.delete({
    where: { id: dashboardId },
  });
  return dashboard;
}