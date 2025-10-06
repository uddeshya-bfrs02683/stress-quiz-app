FROM node:22.16.0-alpine3.21 AS build
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm i
COPY --chown=node:node . .
RUN npm run build

FROM nginx:1.29.1-alpine3.22 AS app
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist ./
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]