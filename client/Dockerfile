FROM node:16.14-alpine as build

ENV NODE_ENV production
WORKDIR /app
COPY . ./
RUN npm install --production
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]