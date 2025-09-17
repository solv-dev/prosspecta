-- CreateEnum
CREATE TYPE "public"."roles" AS ENUM ('root', 'admin', 'user', 'guest');

-- CreateEnum
CREATE TYPE "public"."priority" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'canceled', 'discarded');

-- CreateEnum
CREATE TYPE "public"."entity_type" AS ENUM ('lead', 'contact');

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."roles" NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."auth_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "status" "public"."status" NOT NULL DEFAULT 'new',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "organization_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "status" "public"."status" NOT NULL DEFAULT 'new',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "organization_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pipelines" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."status" NOT NULL DEFAULT 'new',
    "priority" "public"."priority" NOT NULL DEFAULT 'low',
    "entityType" "public"."entity_type" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "organization_id" TEXT NOT NULL,
    "assigned_user_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "lead_id" TEXT,
    "contact_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pipelines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "public"."organizations"("slug");

-- CreateIndex
CREATE INDEX "organizations_slug_idx" ON "public"."organizations"("slug");

-- CreateIndex
CREATE INDEX "organizations_is_active_idx" ON "public"."organizations"("is_active");

-- CreateIndex
CREATE INDEX "users_organization_id_idx" ON "public"."users"("organization_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "public"."users"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_organization_id_key" ON "public"."users"("email", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_tokens_token_key" ON "public"."auth_tokens"("token");

-- CreateIndex
CREATE INDEX "auth_tokens_userId_idx" ON "public"."auth_tokens"("userId");

-- CreateIndex
CREATE INDEX "auth_tokens_expiration_date_idx" ON "public"."auth_tokens"("expiration_date");

-- CreateIndex
CREATE INDEX "auth_tokens_is_revoked_idx" ON "public"."auth_tokens"("is_revoked");

-- CreateIndex
CREATE INDEX "leads_organization_id_idx" ON "public"."leads"("organization_id");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "public"."leads"("status");

-- CreateIndex
CREATE INDEX "leads_is_active_idx" ON "public"."leads"("is_active");

-- CreateIndex
CREATE INDEX "leads_created_by_id_idx" ON "public"."leads"("created_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_organization_id_key" ON "public"."leads"("email", "organization_id");

-- CreateIndex
CREATE INDEX "contacts_organization_id_idx" ON "public"."contacts"("organization_id");

-- CreateIndex
CREATE INDEX "contacts_status_idx" ON "public"."contacts"("status");

-- CreateIndex
CREATE INDEX "contacts_is_active_idx" ON "public"."contacts"("is_active");

-- CreateIndex
CREATE INDEX "contacts_created_by_id_idx" ON "public"."contacts"("created_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_organization_id_key" ON "public"."contacts"("email", "organization_id");

-- CreateIndex
CREATE INDEX "pipelines_organization_id_idx" ON "public"."pipelines"("organization_id");

-- CreateIndex
CREATE INDEX "pipelines_assigned_user_id_idx" ON "public"."pipelines"("assigned_user_id");

-- CreateIndex
CREATE INDEX "pipelines_created_by_id_idx" ON "public"."pipelines"("created_by_id");

-- CreateIndex
CREATE INDEX "pipelines_status_idx" ON "public"."pipelines"("status");

-- CreateIndex
CREATE INDEX "pipelines_priority_idx" ON "public"."pipelines"("priority");

-- CreateIndex
CREATE INDEX "pipelines_entityType_entity_id_idx" ON "public"."pipelines"("entityType", "entity_id");

-- CreateIndex
CREATE INDEX "pipelines_is_active_idx" ON "public"."pipelines"("is_active");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."auth_tokens" ADD CONSTRAINT "auth_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."leads" ADD CONSTRAINT "leads_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."leads" ADD CONSTRAINT "leads_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."leads" ADD CONSTRAINT "leads_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pipelines" ADD CONSTRAINT "pipelines_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pipelines" ADD CONSTRAINT "pipelines_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pipelines" ADD CONSTRAINT "pipelines_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pipelines" ADD CONSTRAINT "pipelines_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pipelines" ADD CONSTRAINT "pipelines_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pipelines" ADD CONSTRAINT "pipelines_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
