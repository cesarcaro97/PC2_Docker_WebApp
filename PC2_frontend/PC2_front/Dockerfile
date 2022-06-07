FROM node:14

# Set env variable
ARG REACT_APP_SERVER_IP
ENV REACT_APP_SERVER_IP=$REACT_APP_SERVER_IP

# that will be empty
RUN echo "REACT_APP_SERVER_IP: ": $REACT_APP_SERVER_IP

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY . /app

RUN npm install

RUN npm install -g wait-for-it.sh

CMD ["npm", "start"]