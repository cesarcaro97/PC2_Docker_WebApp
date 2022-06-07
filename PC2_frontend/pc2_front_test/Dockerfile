FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY . /app

RUN npm install

RUN npm install -g wait-for-it.sh

CMD ["npm", "start"]