/*
  Warnings:

  - Added the required column `buyCount` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "buyCount" INTEGER NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL;
