FROM oven/bun:slim AS base

WORKDIR /usr/src/app

# --- Dependencies ---
FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lock* package-lock.json* /temp/dev/
RUN cd /temp/dev && bun --bun install --frozen-lockfile || cd /temp/dev && bun --bun install

RUN mkdir -p /temp/prod
COPY package.json bun.lock* package-lock.json* /temp/prod/
RUN cd /temp/prod && bun --bun install --frozen-lockfile --production || cd /temp/prod && bun --bun install --production

# --- Build ---
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun --bun run build

# --- Production ---
FROM oven/bun:distroless AS release

COPY --from=build /usr/src/app/.next/standalone /app
COPY --from=build /usr/src/app/.next/static /app/.next/static
COPY --from=build /usr/src/app/public /app/public

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD ["bun", "-e", "const res = await fetch('http://localhost:3000/health'); process.exit(res.ok ? 0 : 1)"]

ENTRYPOINT ["bun", "--bun", "run", "server.js"]
