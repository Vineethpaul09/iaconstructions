# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files from Frontend
COPY Frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code from Frontend
COPY Frontend/ .

# Build the application (skip prerender — no Chrome in Alpine)
ENV SKIP_PRERENDER=true
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config as a template (PORT will be substituted at runtime)
COPY Frontend/nginx.conf /etc/nginx/templates/default.conf.template

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Railway provides PORT env var; default to 80 for local Docker
ENV PORT=80
# Only substitute $PORT in nginx template (preserve $uri and other nginx vars)
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d
EXPOSE ${PORT}

# nginx:alpine auto-runs envsubst on .template files in /etc/nginx/templates/
CMD ["nginx", "-g", "daemon off;"]
