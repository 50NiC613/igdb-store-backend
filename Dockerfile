# Utiliza la imagen base de MongoDB
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9090
CMD npm run start-gateway-server