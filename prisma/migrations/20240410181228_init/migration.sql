/*
  Warnings:

  - You are about to drop the column `profile_image_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `registration_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_image_url",
DROP COLUMN "registration_date",
DROP COLUMN "salt";
