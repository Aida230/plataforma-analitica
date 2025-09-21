-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'ANALYST', 'EXEC');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'EXEC';
