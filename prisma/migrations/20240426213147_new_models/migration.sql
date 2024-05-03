/*
  Warnings:

  - Added the required column `banUrlVoice` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chooseUrlVoice` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passiveId` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playStyle` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roles` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sfxUrl` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortBio` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skinsId` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squareUrl` to the `Champions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Champions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Champions" ADD COLUMN     "banUrlVoice" TEXT NOT NULL,
ADD COLUMN     "chooseUrlVoice" TEXT NOT NULL,
ADD COLUMN     "passiveId" INTEGER NOT NULL,
ADD COLUMN     "playStyle" TEXT NOT NULL,
ADD COLUMN     "roles" INTEGER NOT NULL,
ADD COLUMN     "sfxUrl" TEXT NOT NULL,
ADD COLUMN     "shortBio" TEXT NOT NULL,
ADD COLUMN     "skinsId" INTEGER NOT NULL,
ADD COLUMN     "squareUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Passives" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abilityVideo" TEXT NOT NULL,
    "abilityVideoImage" TEXT NOT NULL,
    "abilityIcon" TEXT NOT NULL,

    CONSTRAINT "Passives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinsLines" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SkinsLines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skins" (
    "id" INTEGER NOT NULL,
    "skinId" INTEGER NOT NULL,
    "skinLineId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "splashArt" TEXT NOT NULL,
    "uncenteredSplashArt" TEXT NOT NULL,
    "tileArt" TEXT NOT NULL,
    "loadScrennArt" TEXT NOT NULL,
    "skinType" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "isLegacy" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "chromaId" INTEGER NOT NULL,

    CONSTRAINT "Skins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chromas" (
    "id" INTEGER NOT NULL,
    "skinId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Chromas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skins_skinId_key" ON "Skins"("skinId");

-- CreateIndex
CREATE UNIQUE INDEX "Skins_skinLineId_key" ON "Skins"("skinLineId");

-- CreateIndex
CREATE UNIQUE INDEX "Chromas_skinId_key" ON "Chromas"("skinId");

-- AddForeignKey
ALTER TABLE "Champions" ADD CONSTRAINT "Champions_skinsId_fkey" FOREIGN KEY ("skinsId") REFERENCES "Skins"("skinId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Champions" ADD CONSTRAINT "Champions_passiveId_fkey" FOREIGN KEY ("passiveId") REFERENCES "Passives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinsLines" ADD CONSTRAINT "SkinsLines_id_fkey" FOREIGN KEY ("id") REFERENCES "Skins"("skinLineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skins" ADD CONSTRAINT "Skins_chromaId_fkey" FOREIGN KEY ("chromaId") REFERENCES "Chromas"("skinId") ON DELETE RESTRICT ON UPDATE CASCADE;
