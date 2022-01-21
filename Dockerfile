ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine as builder

ARG CI_COMMIT_REF_SLUG=dev
ENV CI_COMMIT_REF_SLUG $CI_COMMIT_REF_SLUG

COPY . /app

RUN cd /app \
    && yarn --frozen-lockfile \
    && yarn build \
    && yarn build \
    && sed -i "s/.css/.css?v=$CI_COMMIT_REF_SLUG/g" public/index.html \
    && sed -i "s/.js/.js?v=$CI_COMMIT_REF_SLUG/g" public/index.html


FROM nginx:alpine

COPY --from=builder /app/public /usr/share/nginx/html

ADD nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=10s --timeout=10s \
  CMD curl -f http://localhost/ || exit 1
