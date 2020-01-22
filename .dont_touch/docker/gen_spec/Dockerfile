FROM node:13.0 

ARG PROJECT_PART

ENV PROJECT_PART "$PROJECT_PART"

RUN echo $PROJECT_PART

RUN mkdir -p /var/www/app

RUN mkdir -p /var/www/spec

RUN mkdir -p /var/www/sql

RUN cd /var/www/app

COPY ./genspec.js /var/www/app/genspec.js

RUN node /var/www/app/genspec.js

WORKDIR /var/www/app

CMD ["echo", "OK"]