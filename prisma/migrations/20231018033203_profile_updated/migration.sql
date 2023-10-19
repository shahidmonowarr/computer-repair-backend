-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "role" SET DEFAULT 'customer',
ALTER COLUMN "phoneNumber" DROP NOT NULL;
