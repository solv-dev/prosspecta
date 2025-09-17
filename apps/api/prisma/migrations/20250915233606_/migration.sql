-- AlterTable
ALTER TABLE "public"."auth_tokens" ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false;
