/*
  Warnings:

  - You are about to drop the column `profileId` on the `feedback_forms` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `feedback_forms` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `time_slots` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `time_slots` table. All the data in the column will be lost.
  - Added the required column `email` to the `feedback_forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `feedback_forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `feedback_forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotTime` to the `time_slots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedback_forms" DROP CONSTRAINT "feedback_forms_profileId_fkey";

-- DropForeignKey
ALTER TABLE "feedback_forms" DROP CONSTRAINT "feedback_forms_serviceId_fkey";

-- DropIndex
DROP INDEX "time_slots_endTime_key";

-- DropIndex
DROP INDEX "time_slots_startTime_key";

-- AlterTable
ALTER TABLE "feedback_forms" DROP COLUMN "profileId",
DROP COLUMN "serviceId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "time_slots" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "slotTime" TEXT NOT NULL;
