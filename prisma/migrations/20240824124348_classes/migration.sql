/*
  Warnings:

  - You are about to drop the column `class` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `class`,
    MODIFY `shift` ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral') NOT NULL;

-- CreateTable
CREATE TABLE `Classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `shift` ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral') NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Classes_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
