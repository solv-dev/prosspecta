# Use Bun official image
FROM oven/bun:1-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy Prisma schema and generate client
COPY prisma/ ./prisma/
RUN bun run prisma generate

# Copy source code
COPY src/ ./src/

# Expose port
EXPOSE 3333

# Set production environment
ENV NODE_ENV=production

# Run database migrations and start the server
CMD ["sh", "-c", "bun run prisma db push && bun run src/server.ts"]