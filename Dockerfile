FROM node:23 AS builder

WORKDIR /src

# Install angular cli
RUN  npm i -g @angular/cli

# copy srcs into container
COPY angular.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.spec.json .
COPY public public
COPY src src

# Install the packages (ci is for continuos integgration) 
RUN npm ci

# Build angular application -> dist/day32-inclass_ws/browser
RUN ng build

# Copy Angular to Caddy
FROM caddy:2-alpine

LABEL maintainer="Aiken"

WORKDIR /www

# Copy the Angular artifacts and the Caddyfile
COPY --from=builder /src/dist/day33_calculator/browser browser
COPY Caddyfile .

EXPOSE 8080

SHELL ["/bin/sh", "-c"]
ENTRYPOINT caddy run --config ./Caddyfile