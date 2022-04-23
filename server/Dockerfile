FROM node:16.14-alpine
ENV NODE_ENV production

WORKDIR /app
COPY . ./
RUN npm install --production

CMD "npm" "start"