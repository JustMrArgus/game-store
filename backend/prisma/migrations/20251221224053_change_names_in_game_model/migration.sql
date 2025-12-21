/*
  Warnings:

  - You are about to drop the column `minimumCPU` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `minimumGPU` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `minimumMemory` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `minimumOS` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `minimumStorage` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedCPU` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedGPU` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedMemory` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedOS` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedStorage` on the `Game` table. All the data in the column will be lost.
  - Added the required column `minCPU` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minGPU` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minMemory` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minOS` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minStorage` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recCPU` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recGPU` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recMemory` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recOS` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recStorage` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "minimumCPU",
DROP COLUMN "minimumGPU",
DROP COLUMN "minimumMemory",
DROP COLUMN "minimumOS",
DROP COLUMN "minimumStorage",
DROP COLUMN "recommendedCPU",
DROP COLUMN "recommendedGPU",
DROP COLUMN "recommendedMemory",
DROP COLUMN "recommendedOS",
DROP COLUMN "recommendedStorage",
ADD COLUMN     "minCPU" TEXT NOT NULL,
ADD COLUMN     "minGPU" TEXT NOT NULL,
ADD COLUMN     "minMemory" TEXT NOT NULL,
ADD COLUMN     "minOS" TEXT NOT NULL,
ADD COLUMN     "minStorage" TEXT NOT NULL,
ADD COLUMN     "recCPU" TEXT NOT NULL,
ADD COLUMN     "recGPU" TEXT NOT NULL,
ADD COLUMN     "recMemory" TEXT NOT NULL,
ADD COLUMN     "recOS" TEXT NOT NULL,
ADD COLUMN     "recStorage" TEXT NOT NULL;
