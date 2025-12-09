/*
  Warnings:

  - You are about to drop the column `apartmentDong` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentHo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `officeNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startComplexNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endComplexNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDongNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDongNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startFloorNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endFloorNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startHoNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endHoNumber` on table `Apartment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Apartment" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "officeNumber" SET NOT NULL,
ALTER COLUMN "startComplexNumber" SET NOT NULL,
ALTER COLUMN "endComplexNumber" SET NOT NULL,
ALTER COLUMN "startDongNumber" SET NOT NULL,
ALTER COLUMN "endDongNumber" SET NOT NULL,
ALTER COLUMN "startFloorNumber" SET NOT NULL,
ALTER COLUMN "endFloorNumber" SET NOT NULL,
ALTER COLUMN "startHoNumber" SET NOT NULL,
ALTER COLUMN "endHoNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "Complaint" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Notice" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "apartmentDong",
DROP COLUMN "apartmentHo",
DROP COLUMN "apartmentName",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_name_key" ON "Apartment"("name");

-- CreateIndex
CREATE INDEX "Resident_apartmentId_dong_ho_idx" ON "Resident"("apartmentId", "dong", "ho");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");
