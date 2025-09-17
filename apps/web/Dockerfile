# Build stage
FROM node:20-alpine AS builder

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat bash curl

# Set working directory
WORKDIR /app

# Copy package files from monorepo root and all workspaces
COPY package.json bun.lockb* ./
COPY apps/web/package.json ./apps/web/
COPY packages/codegen/package.json ./packages/codegen/
COPY packages/tsconfig/package.json ./packages/tsconfig/

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Install dependencies
RUN bun install --frozen-lockfile

# Copy all package sources
COPY packages/ ./packages/

# Build codegen package if it has a build script
WORKDIR /app/packages/codegen
RUN bun run build 2>/dev/null || echo "No build script for codegen"

# Copy web app source
WORKDIR /app/apps/web
COPY apps/web/ .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application without Turbopack
RUN bun run next build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/apps/web/public ./public

# Set correct permissions for pre-compiled cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

# Switch to nextjs user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]