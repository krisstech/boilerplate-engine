FROM node:latest as build-stage

WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
