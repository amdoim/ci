/*
  Warnings:

  - A unique constraint covering the columns `[classesId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classesId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Classes` DROP FOREIGN KEY `Classes_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `classesId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_classesId_key` ON `User`(`classesId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_classesId_fkey` FOREIGN KEY (`classesId`) REFERENCES `Classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
