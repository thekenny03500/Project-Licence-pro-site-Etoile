FROM node:13.0 

RUN mkdir -p /var/www/app/spec

RUN cd /var/www/app

COPY ./src/package.json /var/www/app/package.json
COPY ./src/index.html /var/www/app/index.html

COPY ./src/run.sh /var/www/app/run.sh

RUN chmod +x /var/www/app/run.sh

RUN yarn --cwd /var/www/app install

WORKDIR /var/www/app

CMD /var/www/app/run.sh