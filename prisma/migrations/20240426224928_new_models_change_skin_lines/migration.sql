-- DropForeignKey
ALTER TABLE "SkinsLines" DROP CONSTRAINT "SkinsLines_id_fkey";

-- DropIndex
DROP INDEX "Skins_skinLineId_key";

-- AddForeignKey
ALTER TABLE "Skins" ADD CONSTRAINT "Skins_skinLineId_fkey" FOREIGN KEY ("skinLineId") REFERENCES "SkinsLines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
