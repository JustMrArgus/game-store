-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "buyCount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
