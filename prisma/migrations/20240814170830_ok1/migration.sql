/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `born` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    ADD COLUMN `born` VARCHAR(191) NOT NULL,
    ADD COLUMN `class` VARCHAR(191) NOT NULL,
    ADD COLUMN `shift` ENUM('Matutino', 'Vespertino', 'Noturno') NOT NULL;
