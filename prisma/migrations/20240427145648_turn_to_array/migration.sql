/*
  Warnings:

  - The `playStyle` column on the `Champions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roles` column on the `Champions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Champions" DROP COLUMN "playStyle",
ADD COLUMN     "playStyle" TEXT[],
DROP COLUMN "roles",
ADD COLUMN     "roles" TEXT[];
