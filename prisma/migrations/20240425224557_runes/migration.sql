-- CreateTable
CREATE TABLE "Runes" (
    "id" SERIAL NOT NULL,
    "runeId" INTEGER[],
    "name" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "longDesc" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "endOfGameStats" TEXT[],
    "recommendations" TEXT[],
    "description" TEXT NOT NULL,

    CONSTRAINT "Runes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunesRecommendations" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "perkIds" INTEGER[],
    "primaryPerkStyleId" INTEGER NOT NULL,
    "summonerSpellIds" BIGINT[],
    "championId" INTEGER NOT NULL,

    CONSTRAINT "RunesRecommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Runes_id_key" ON "Runes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Runes_runeId_key" ON "Runes"("runeId");

-- AddForeignKey
ALTER TABLE "RunesRecommendations" ADD CONSTRAINT "RunesRecommendations_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
