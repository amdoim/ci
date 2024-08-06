/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Classes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Classes` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Classes_userId_key` ON `Classes`(`userId`);

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
