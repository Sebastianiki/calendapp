FROM node:16.14-alpine as build

ENV NODE_ENV production
WORKDIR /app
COPY . ./
RUN npm install --production
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENV VIRTUAL_HOST=calendar.sebastianreyes.cl,www.calendar.sebastianreyes.cl
ENV LETSENCRYPT_HOST=calendar.sebastianreyes.cl,www.calendar.sebastianreyes.cl
ENV LETSENCRYPT_EMAIL=sebastian@sebastianreyes.cl
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]