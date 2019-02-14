FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD config config/
ADD models models/
ADD routes routes/
ADD .env ./
ADD server.js ./

ADD client client/
WORKDIR client/
RUN npm install
WORKDIR /app

CMD npm start