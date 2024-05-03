/*
  Warnings:

  - You are about to alter the column `summonerSpellIds` on the `RunesRecommendations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "RunesRecommendations" ALTER COLUMN "summonerSpellIds" SET DATA TYPE INTEGER[];
