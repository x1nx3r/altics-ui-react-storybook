# syntax=docker/dockerfile:1

# Build the static Storybook from this snapshot.
FROM node:22-alpine AS build
WORKDIR /app

# Copy the manifests and the vendored package first. npm reads the
# "file:./vendor/altics-ui" dependency here, so vendor must arrive before
# `npm ci`. This order keeps the dependency layer cached across story and
# config edits.
COPY package.json package-lock.json ./
COPY vendor ./vendor
RUN npm ci

COPY . .
RUN npm run build-storybook

# Serve the static output with nginx. Only the built files cross over.
FROM nginx:alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
