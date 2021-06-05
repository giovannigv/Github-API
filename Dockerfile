FROM node:12.17.0-alpine
ENV NODE_ENV production
ENV SERVER_PORT 3000

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
RUN npm run start