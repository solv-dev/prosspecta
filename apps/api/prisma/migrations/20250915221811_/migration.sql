/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by_id` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `pipelines` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by_id` on the `pipelines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."contacts" DROP CONSTRAINT "contacts_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."contacts" DROP CONSTRAINT "contacts_updated_by_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."leads" DROP CONSTRAINT "leads_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."leads" DROP CONSTRAINT "leads_updated_by_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."pipelines" DROP CONSTRAINT "pipelines_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."pipelines" DROP CONSTRAINT "pipelines_updated_by_id_fkey";

-- DropIndex
DROP INDEX "public"."contacts_created_by_id_idx";

-- DropIndex
DROP INDEX "public"."leads_created_by_id_idx";

-- DropIndex
DROP INDEX "public"."pipelines_created_by_id_idx";

-- AlterTable
ALTER TABLE "public"."contacts" DROP COLUMN "created_by_id",
DROP COLUMN "updated_by_id";

-- AlterTable
ALTER TABLE "public"."leads" DROP COLUMN "created_by_id",
DROP COLUMN "updated_by_id";

-- AlterTable
ALTER TABLE "public"."pipelines" DROP COLUMN "created_by_id",
DROP COLUMN "updated_by_id";
