# syntax=docker/dockerfile:1.7
# =============================================================================
# ZerosAndOnes Website — Docker image
# -----------------------------------------------------------------------------
# Two-stage build:
#   1) builder  : Node 20 alpine installs deps and runs `vite build`
#                 (which internally runs `tsc -b && vite build`).
#   2) runtime  : nginx alpine serves the pre-built `dist/` on port 4500.
#
# The SPA uses react-router-dom, so nginx.conf ships a try_files fallback
# to /index.html so deep links like /about, /services, /contact all work.
# =============================================================================

# --------------------- Stage 1: build the static bundle ---------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first so this layer caches on unchanged package files.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and produce the production bundle in /app/dist.
COPY . .
RUN npm run build


# --------------------- Stage 2: serve the bundle with nginx ------------------
FROM nginx:1.27-alpine AS runtime

# Replace the default site with our SPA-aware config listening on 4500.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Publish the built assets into nginx's document root.
COPY --from=builder /app/dist /usr/share/nginx/html

# `wget` is already present in nginx:alpine; used by the healthcheck below
# and by the Jenkins smoke-test stage.
EXPOSE 4500

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:4500/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
