/*
  Warnings:

  - You are about to drop the `Champion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Champion";

-- CreateTable
CREATE TABLE "Champions" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Champions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Champions_id_key" ON "Champions"("id");
