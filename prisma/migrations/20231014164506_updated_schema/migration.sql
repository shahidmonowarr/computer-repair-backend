/*
  Warnings:

  - You are about to drop the column `categoryId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `specializationId` on the `technicians` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specializations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_profileId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "technicians" DROP CONSTRAINT "technicians_specializationId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "categoryId",
DROP COLUMN "location";

-- AlterTable
ALTER TABLE "technicians" DROP COLUMN "specializationId";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "specializations";
