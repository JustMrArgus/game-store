-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'UAH');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "balanceCurrency" "Currency" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "primaryImage" TEXT NOT NULL,
    "additionalImages" TEXT[],
    "logo" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "developer" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "platforms" TEXT[],
    "minimumOS" TEXT NOT NULL,
    "minimumCPU" TEXT NOT NULL,
    "minimumMemory" TEXT NOT NULL,
    "minimumGPU" TEXT NOT NULL,
    "minimumStorage" TEXT NOT NULL,
    "recommendedOS" TEXT NOT NULL,
    "recommendedCPU" TEXT NOT NULL,
    "recommendedMemory" TEXT NOT NULL,
    "recommendedGPU" TEXT NOT NULL,
    "recommendedStorage" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartId","gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
