/*
  Warnings:

  - You are about to drop the column `email` on the `feedback_forms` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `feedback_forms` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `feedback_forms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedback_forms" DROP COLUMN "email",
DROP COLUMN "phoneNumber",
DROP COLUMN "userName";
