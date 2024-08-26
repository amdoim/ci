/*
  Warnings:

  - You are about to drop the column `classesId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_classesId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `classesId`;

-- CreateTable
CREATE TABLE `UsersOnClasses` (
    `userId` INTEGER NOT NULL,
    `classesId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `classesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnClasses` ADD CONSTRAINT `UsersOnClasses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnClasses` ADD CONSTRAINT `UsersOnClasses_classesId_fkey` FOREIGN KEY (`classesId`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
