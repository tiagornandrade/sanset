# Build stage
FROM node:20.19-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage: Node serves SPA + API
FROM node:20.19-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY server ./server

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "server/index.js"]
