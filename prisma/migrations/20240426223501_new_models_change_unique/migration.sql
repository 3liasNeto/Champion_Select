-- DropForeignKey
ALTER TABLE "Skins" DROP CONSTRAINT "Skins_chromaId_fkey";

-- AlterTable
ALTER TABLE "Skins" ALTER COLUMN "chromaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Skins" ADD CONSTRAINT "Skins_chromaId_fkey" FOREIGN KEY ("chromaId") REFERENCES "Chromas"("skinId") ON DELETE SET NULL ON UPDATE CASCADE;
