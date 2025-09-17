# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a **Turborepo monorepo** with the following structure:
- `apps/web/` - Next.js 15 frontend application with React 19
- `apps/api/` - Bun-based API server using Elysia and GraphQL Yoga
- `packages/codegen/` - GraphQL code generation utilities
- `packages/tsconfig/` - Shared TypeScript configurations

The system uses **GraphQL** for API communication between the frontend and backend, with automated type generation.

## Development Commands

### Root Level (Turborepo)
- `bun dev` - Start all apps in development mode
- `bun build` - Build all applications
- `bun lint` - Run linting across all workspaces

### Frontend (apps/web)
- `bun dev` - Start Next.js development server with Turbopack
- `bun build` - Build the Next.js application
- `bun lint` - Run Biome linting
- `bun format` - Format code with Biome

### API (apps/api)
- `bun dev` - Start API server with hot reload
- Database located at `apps/api/prisma/schema.prisma`

### Code Generation
- `bun run generate` (in packages/codegen) - Generate GraphQL types from API schema
- API must be running on localhost:3333 for codegen to work

## Key Technologies & Tools

- **Package Manager**: Bun (specified in packageManager field)
- **Build System**: Turborepo with Turbopack for Next.js
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)
- **Database**: Prisma ORM
- **API**: Elysia + GraphQL Yoga + Pothos (schema-first GraphQL)
- **Frontend**: Next.js 15 + React 19 + Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: Jotai
- **HTTP Client**: ky
- **Authentication**: JWT with bcrypt

## API Modules

The API is organized into modules in `apps/api/src/modules/`:
- **auth** - Authentication (login, registration, JWT tokens)
- **users** - User management and profiles
- **organizations** - Organization/tenant management
- **leads** - Lead management and tracking
- **contacts** - Contact management
- **pipelines** - Pipeline/workflow management
- **dashboard** - Dashboard metrics and analytics

### Adding New Modules
1. Create folder in `apps/api/src/modules/[module-name]/`
2. Add `index.ts`, `[module].types.ts`, `[module].resolvers.ts`
3. Import module in `apps/api/src/schema.ts`
4. Run codegen to generate frontend types

## Development Workflow

1. Start the API server first: `cd apps/api && bun dev`
2. Run codegen to generate types: `cd packages/codegen && bun run generate`
3. Start the web app: `cd apps/web && bun dev`

The codegen step is required when GraphQL schema changes to keep frontend types in sync.

## Dashboard Analytics

The dashboard module provides key metrics:
- **Total Leads**: Count of all active leads in organization
- **New Leads (Monthly)**: Leads created in current month
- **Leads in Process**: Leads with status CONTACTED, QUALIFIED, or PROPOSAL
- **Monthly Growth**: Percentage growth comparing current vs previous month

Query: `dashboardMetrics` returns `DashboardMetrics` type with authentication required.

## User Interface & Localization

### Internationalization
The application interface is primarily in **Portuguese (pt-BR)**:
- All table headers, labels, and user-facing text translated to Portuguese
- Status values displayed in Portuguese (e.g., "Novo", "Contatado", "Qualificado")
- Priority levels translated (e.g., "Baixa", "Média", "Alta", "Urgente")

### Data Tables
Generic data table component located at `apps/web/src/components/common/data-table.tsx`:
- Fully translated to Portuguese
- Reusable across different modules
- Supports pagination, sorting, filtering
- Includes drag-and-drop functionality

Module-specific tables in `apps/web/src/components/tables/`:
- **Contacts Table**: Nome, Email, Telefone, Empresa, Criado em
- **Leads Table**: Nome, Email, Telefone, Empresa, Descrição, Criado em
- **Pipelines Table**: Título, Descrição, Status, Prioridade, Usuário Atribuído, Contato, Lead, Criado em

### Pipelines Management

#### Status Values (GraphQL Enum)
```
NEW → "Novo"
CONTACTED → "Contatado"
QUALIFIED → "Qualificado"
PROPOSAL → "Proposta"
WON → "Ganho"
LOST → "Perdido"
CANCELED → "Cancelado"
DISCARDED → "Descartado"
```

#### Priority Values (GraphQL Enum)
```
LOW → "Baixa"
MEDIUM → "Média"
HIGH → "Alta"
URGENT → "Urgente"
```

#### View Modes
Pipelines can be viewed in two modes via URL parameter hook `usePipelineViewParams`:
- **Kanban View** (default): `?view=kanban` - Drag-and-drop cards by status
- **Table View**: `?view=table` - Traditional tabular format

Component: `apps/web/src/app/(dashboard)/pipelines/_components/pipelines-data-views.tsx`

#### Analytics & Charts
Pipeline analytics chart shows active vs completed pipelines over time:
- **Active**: NEW, CONTACTED, QUALIFIED, PROPOSAL status
- **Completed**: WON, LOST status
- Data grouped by month of creation
- Located in dashboard at `DashboardChart` component
- Uses `fetchPipelineAnalytics()` action for data processing

## Important File Locations

### Core Components
- Generic data table: `apps/web/src/components/common/data-table.tsx`
- Pipeline status options: `apps/web/src/utils/pipeline-status-options.ts`
- Pipeline view hook: `apps/web/src/hooks/use-pipeline-view-params.ts`

### Actions & Queries
- Dashboard actions: `apps/web/src/app/(dashboard)/actions.ts`
- Pipeline actions: `apps/web/src/app/(dashboard)/pipelines/actions.ts`
- GraphQL queries: `apps/web/src/graphql/queries.ts`
- GraphQL mutations: `apps/web/src/graphql/mutations.ts`

### Translation Utilities
Status and priority translations are handled in table column definitions with mapping objects for consistent Portuguese display throughout the application.