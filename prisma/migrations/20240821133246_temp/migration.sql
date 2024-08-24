-- CreateTable
CREATE TABLE `DataStorage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableName` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
