/*
  Warnings:

  - A unique constraint covering the columns `[keyTec]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `cash` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `debit` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `role` INTEGER NOT NULL DEFAULT 3;

-- CreateIndex
CREATE UNIQUE INDEX `User_keyTec_key` ON `User`(`keyTec`);
