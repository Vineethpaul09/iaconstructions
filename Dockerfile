# Build stage
FROM node:20-alpine AS builder

# Accept Supabase env vars at build time (required for Vite to bake them in)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

WORKDIR /app

# Copy package files from Frontend
COPY Frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code from Frontend
COPY Frontend/ .

# Build the application (skip prerender — no Chrome in Alpine)
ENV SKIP_PRERENDER=true
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
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
