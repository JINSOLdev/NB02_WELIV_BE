/*
  Warnings:

  - Added the required column `apartmentDong` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentHo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apartmentDong" TEXT NOT NULL,
ADD COLUMN     "apartmentHo" TEXT NOT NULL,
ADD COLUMN     "apartmentName" TEXT NOT NULL;
