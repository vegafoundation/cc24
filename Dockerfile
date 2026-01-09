# Next.js Frontend Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments
ARG NEXT_PUBLIC_DOMAIN=online
ARG NEXT_PUBLIC_API_URL=https://cc24-api.vercel.app
ARG NEXT_PUBLIC_BASE_PATH=
ARG NEXT_PUBLIC_GA_ID_ONLINE=
ARG NEXT_PUBLIC_GA_ID_VIP=
ARG DOCKER_BUILD=false

# Environment variables
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_GA_ID_ONLINE=$NEXT_PUBLIC_GA_ID_ONLINE
ENV NEXT_PUBLIC_GA_ID_VIP=$NEXT_PUBLIC_GA_ID_VIP
ENV NODE_ENV=production
ENV DOCKER_BUILD=$DOCKER_BUILD

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
