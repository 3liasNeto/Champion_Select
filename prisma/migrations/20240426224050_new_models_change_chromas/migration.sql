/*
  Warnings:

  - A unique constraint covering the columns `[chromaId]` on the table `Skins` will be added. If there are existing duplicate values, this will fail.
  - Made the column `chromaId` on table `Skins` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Skins" DROP CONSTRAINT "Skins_chromaId_fkey";

-- DropIndex
DROP INDEX "Chromas_skinId_key";

-- AlterTable
ALTER TABLE "Skins" ALTER COLUMN "chromaId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Skins_chromaId_key" ON "Skins"("chromaId");

-- AddForeignKey
ALTER TABLE "Chromas" ADD CONSTRAINT "Chromas_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skins"("chromaId") ON DELETE RESTRICT ON UPDATE CASCADE;
