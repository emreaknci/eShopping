FROM node:20-alpine

WORKDIR /usr/app

COPY . .

COPY .env .

RUN npm install && npm run build

CMD ["npm", "start"]
