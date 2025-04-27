# Dockerfile

# Stage 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# Install all dependencies (dev + prod)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build


# Stage 2: runtime
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy Next.js build output
COPY --from=builder /app/.next ./.next

# (If you have a public folder, uncomment the next line)
# COPY --from=builder /app/public ./public

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
