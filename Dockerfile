FROM node:18-alpine as angular
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/abc /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]