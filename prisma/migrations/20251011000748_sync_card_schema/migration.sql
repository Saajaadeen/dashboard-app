/*
  Warnings:

  - Added the required column `cardGroup` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Card" ADD COLUMN     "cardGroup" TEXT NOT NULL,
ADD COLUMN     "pingEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pingStatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" INTEGER,
ADD COLUMN     "size" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Card_dashboardId_idx" ON "public"."Card"("dashboardId");

-- CreateIndex
CREATE INDEX "Card_cardGroup_idx" ON "public"."Card"("cardGroup");
