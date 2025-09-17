/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `auth_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secret` to the `auth_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."auth_tokens" ADD COLUMN     "secret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_tokens_secret_key" ON "public"."auth_tokens"("secret");
