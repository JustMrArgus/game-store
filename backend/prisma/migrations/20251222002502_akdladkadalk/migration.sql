/*
  Warnings:

  - You are about to drop the column `key` on the `Game` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "key",
ADD COLUMN     "keys" TEXT[],
ADD COLUMN     "quantity" TEXT NOT NULL;
