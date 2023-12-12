FROM node:18

WORKDIR /usr/app
COPY . /usr/app

RUN [ "npm", "install" ]