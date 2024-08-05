/*
  Warnings:

  - Added the required column `ranking` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debit` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyTec` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `css` VARCHAR(191) NULL,
    ADD COLUMN `ranking` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `active` BOOLEAN NOT NULL,
    ADD COLUMN `cash` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `debit` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `keyTec` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ToDo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TalktoUs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `msg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tecReported` VARCHAR(191) NOT NULL,
    `msg` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserve` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `new` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
