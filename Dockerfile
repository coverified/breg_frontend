ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine as builder

COPY . /app

RUN cd /app \
    && yarn --frozen-lockfile \
    && yarn build


FROM nginx:alpine

COPY --from=builder /app/public /usr/share/nginx/html

ADD nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=10s --timeout=10s \
  CMD curl -f http://localhost/ || exit 1
