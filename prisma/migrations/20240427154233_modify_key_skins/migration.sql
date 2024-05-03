/*
  Warnings:

  - A unique constraint covering the columns `[skinsId]` on the table `Champions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Champions" DROP CONSTRAINT "Champions_skinsId_fkey";

-- DropIndex
DROP INDEX "Skins_skinId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Champions_skinsId_key" ON "Champions"("skinsId");

-- AddForeignKey
ALTER TABLE "Skins" ADD CONSTRAINT "Skins_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Champions"("skinsId") ON DELETE RESTRICT ON UPDATE CASCADE;
