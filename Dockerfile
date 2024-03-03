# syntax=docker/dockerfile:1
FROM node:20-alpine as angular
WORKDIR /ng-app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=angular /ng-app/dist/dent-forms /usr/share/nginx/html
EXPOSE 80
