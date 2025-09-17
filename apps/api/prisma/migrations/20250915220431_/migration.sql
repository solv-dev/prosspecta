/*
  Warnings:

  - The values [lead,contact] on the enum `entity_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [low,medium,high,urgent] on the enum `priority` will be removed. If these variants are still used in the database, this will fail.
  - The values [root,admin,user,guest] on the enum `roles` will be removed. If these variants are still used in the database, this will fail.
  - The values [new,contacted,qualified,proposal,won,lost,canceled,discarded] on the enum `status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `deleted_at` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `pipelines` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."entity_type_new" AS ENUM ('LEAD', 'CONTACT');
ALTER TABLE "public"."pipelines" ALTER COLUMN "entityType" TYPE "public"."entity_type_new" USING ("entityType"::text::"public"."entity_type_new");
ALTER TYPE "public"."entity_type" RENAME TO "entity_type_old";
ALTER TYPE "public"."entity_type_new" RENAME TO "entity_type";
DROP TYPE "public"."entity_type_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."priority_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
ALTER TABLE "public"."pipelines" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "public"."pipelines" ALTER COLUMN "priority" TYPE "public"."priority_new" USING ("priority"::text::"public"."priority_new");
ALTER TYPE "public"."priority" RENAME TO "priority_old";
ALTER TYPE "public"."priority_new" RENAME TO "priority";
DROP TYPE "public"."priority_old";
ALTER TABLE "public"."pipelines" ALTER COLUMN "priority" SET DEFAULT 'LOW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."roles_new" AS ENUM ('ROOT', 'ADMIN', 'USER', 'GUEST');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."users" ALTER COLUMN "role" TYPE "public"."roles_new" USING ("role"::text::"public"."roles_new");
ALTER TYPE "public"."roles" RENAME TO "roles_old";
ALTER TYPE "public"."roles_new" RENAME TO "roles";
DROP TYPE "public"."roles_old";
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."status_new" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'CANCELED', 'DISCARDED');
ALTER TABLE "public"."contacts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."leads" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."pipelines" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."leads" ALTER COLUMN "status" TYPE "public"."status_new" USING ("status"::text::"public"."status_new");
ALTER TABLE "public"."contacts" ALTER COLUMN "status" TYPE "public"."status_new" USING ("status"::text::"public"."status_new");
ALTER TABLE "public"."pipelines" ALTER COLUMN "status" TYPE "public"."status_new" USING ("status"::text::"public"."status_new");
ALTER TYPE "public"."status" RENAME TO "status_old";
ALTER TYPE "public"."status_new" RENAME TO "status";
DROP TYPE "public"."status_old";
ALTER TABLE "public"."contacts" ALTER COLUMN "status" SET DEFAULT 'NEW';
ALTER TABLE "public"."leads" ALTER COLUMN "status" SET DEFAULT 'NEW';
ALTER TABLE "public"."pipelines" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterTable
ALTER TABLE "public"."contacts" DROP COLUMN "deleted_at",
ALTER COLUMN "status" SET DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "public"."leads" DROP COLUMN "deleted_at",
ALTER COLUMN "status" SET DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "public"."organizations" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "public"."pipelines" DROP COLUMN "deleted_at",
ALTER COLUMN "status" SET DEFAULT 'NEW',
ALTER COLUMN "priority" SET DEFAULT 'LOW';

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "deleted_at",
ALTER COLUMN "role" SET DEFAULT 'USER';
