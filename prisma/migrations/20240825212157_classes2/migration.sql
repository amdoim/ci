-- AlterTable
ALTER TABLE `Classes` MODIFY `shift` ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral', 'Professor') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `shift` ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral', 'Professor') NOT NULL;
