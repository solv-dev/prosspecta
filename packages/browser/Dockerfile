# Use Bun runtime
FROM oven/bun:1-slim as base
WORKDIR /app

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb* /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Copy dependencies and source code
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build the application
RUN bun build src/index.ts --outdir dist --target bun

# Production stage
FROM base AS release
COPY --from=build /app/dist/index.js .
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/prisma prisma
COPY package.json .

# Expose port
EXPOSE 3000/tcp

# Set environment to production
ENV NODE_ENV=production

# Run migrations and start the app
CMD ["sh", "-c", "bunx prisma generate && bun run index.js"]
