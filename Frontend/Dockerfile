# Build stage — Debian-slim supports Chromium for prerendering
FROM node:20-slim AS builder

WORKDIR /app

# Install Chromium and dependencies for prerendering
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    libgbm1 \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libcups2 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to use system Chromium instead of downloading its own
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copy package files from Frontend
COPY Frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code from Frontend
COPY Frontend/ .

# Build the application with prerendering enabled
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Limit worker processes to avoid resource exhaustion on Railway
RUN sed -i 's/worker_processes  auto;/worker_processes 2;/' /etc/nginx/nginx.conf

# Copy nginx config template (PORT will be substituted by start.sh)
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy custom start script that handles PORT substitution
COPY Frontend/start.sh /start.sh
RUN sed -i 's/\r$//' /start.sh && chmod +x /start.sh

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Use custom entrypoint to bypass nginx docker entrypoint scripts
ENTRYPOINT ["/start.sh"]
