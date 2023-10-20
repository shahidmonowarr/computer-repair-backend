/*
  Warnings:

  - You are about to drop the column `feedbackComment` on the `feedback_forms` table. All the data in the column will be lost.
  - Added the required column `feedbackDescription` to the `feedback_forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackSubject` to the `feedback_forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback_forms" DROP COLUMN "feedbackComment",
ADD COLUMN     "feedbackDescription" TEXT NOT NULL,
ADD COLUMN     "feedbackSubject" TEXT NOT NULL;
