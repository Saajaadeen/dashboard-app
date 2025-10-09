-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "oAuthId" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "resetRequested" BOOLEAN NOT NULL DEFAULT false,
    "resetRequestedAt" TIMESTAMP(3),
    "resetApproved" BOOLEAN NOT NULL DEFAULT false,
    "resetApprovedById" TEXT,
    "deleteRequested" BOOLEAN NOT NULL DEFAULT false,
    "deleteRequestedAt" TIMESTAMP(3),
    "deleteApproved" BOOLEAN NOT NULL DEFAULT false,
    "deleteApprovedById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dashboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "visibility" TEXT[],
    "permissions" TEXT[],
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT,
    "dashboardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppSettings" (
    "id" TEXT NOT NULL,
    "loginName" TEXT,
    "loginImgUrl" TEXT,
    "oAuthEnabled" BOOLEAN NOT NULL DEFAULT false,
    "oAuthRealm" TEXT,
    "oAuthClientId" TEXT,
    "oAuthClientSecret" TEXT,
    "oAuthUrl" TEXT,
    "landingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "landingDashboardId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readById" TEXT[],

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_oAuthId_key" ON "public"."User"("oAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Dashboard" ADD CONSTRAINT "Dashboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "public"."Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AppSettings" ADD CONSTRAINT "AppSettings_landingDashboardId_fkey" FOREIGN KEY ("landingDashboardId") REFERENCES "public"."Dashboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
