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

## Development Workflow

1. Start the API server first: `cd apps/api && bun dev`
2. Run codegen to generate types: `cd packages/codegen && bun run generate`
3. Start the web app: `cd apps/web && bun dev`

The codegen step is required when GraphQL schema changes to keep frontend types in sync.