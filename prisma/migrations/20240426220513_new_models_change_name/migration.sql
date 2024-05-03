/*
  Warnings:

  - You are about to drop the column `loadScrennArt` on the `Skins` table. All the data in the column will be lost.
  - Added the required column `loadScreenArt` to the `Skins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skins" DROP COLUMN "loadScrennArt",
ADD COLUMN     "loadScreenArt" TEXT NOT NULL;
