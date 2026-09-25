# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Hardened Runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

# Run under non-root node user (Principle of Least Privilege)
USER node
EXPOSE 3000
CMD ["node", "app.js"]
