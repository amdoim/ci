/*
  Warnings:

  - You are about to drop the column `ranking` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `ranking`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `ranking` INTEGER NOT NULL DEFAULT 0;
