/*
  Warnings:

  - You are about to drop the column `currency` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `balanceCurrency` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "currency";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "currency";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "balanceCurrency";

-- DropEnum
DROP TYPE "Currency";
