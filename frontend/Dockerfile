# Stage 1: Node (React)
FROM node:19-alpine3.15 AS build

WORKDIR /usr/src/frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: Nginx
FROM nginx:1.23.2

COPY --from=build /usr/src/frontend/build /var/www/frontend

COPY --from=build /usr/src/frontend/nginx.conf /etc/nginx/conf.d/default.conf
