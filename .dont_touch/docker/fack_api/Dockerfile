FROM node:13.0 

RUN mkdir -p /var/www/app

RUN cd /var/www/app

COPY ./src/package.json /var/www/app/package.json

RUN yarn --cwd /var/www/app install

WORKDIR /var/www/app