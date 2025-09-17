/*
  Warnings:

  - You are about to drop the column `entityType` on the `pipelines` table. All the data in the column will be lost.
  - You are about to drop the column `entity_id` on the `pipelines` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."pipelines_entityType_entity_id_idx";

-- AlterTable
ALTER TABLE "public"."pipelines" DROP COLUMN "entityType",
DROP COLUMN "entity_id";

-- DropEnum
DROP TYPE "public"."entity_type";
