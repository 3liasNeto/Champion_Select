/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Champions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Champions_name_key" ON "Champions"("name");
