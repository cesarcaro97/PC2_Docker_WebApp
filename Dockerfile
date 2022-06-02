FROM node:14

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g wait-for-it.sh

RUN git clone https://github.com/vishnubob/wait-for-it.git