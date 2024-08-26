/*
  Warnings:

  - You are about to drop the column `userId` on the `Classes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Classes_userId_key` ON `Classes`;

-- AlterTable
ALTER TABLE `Classes` DROP COLUMN `userId`;
