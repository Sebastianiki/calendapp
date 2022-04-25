FROM node:16.14-alpine as build

WORKDIR /app
COPY . ./
RUN npm install --production
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
ENV VIRTUAL_HOST=calendar.sebastianreyes.cl,www.calendar.sebastianreyes.cl
ENV LETSENCRYPT_HOST=calendar.sebastianreyes.cl,www.calendar.sebastianreyes.cl
ENV LETSENCRYPT_EMAIL=sebastian@sebastianreyes.cl

CMD ["nginx", "-g", "daemon off;"]
