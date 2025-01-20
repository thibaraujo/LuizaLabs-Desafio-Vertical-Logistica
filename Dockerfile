FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g rimraf ts-node jest eslint nodemon

EXPOSE 8000

ENV DATABASE_NAME=production
ENV DATABASE_USER=admin
ENV DATABASE_PASSWORD=admin
ENV DATABASE_HOST=cluster0.qfklv.mongodb.net
ENV SERVER_PORT=8000

CMD ["npm", "run", "start:build"]
