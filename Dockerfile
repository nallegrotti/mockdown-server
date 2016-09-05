from node:6

WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
RUN npm install

ADD . /usr/src/app

CMD npm start

EXPOSE 3000