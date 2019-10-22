FROM node:carbon
WORKDIR /usr/src/app

COPY . .

RUN git config --global url."https://github.com/".insteadOf git@github.com:
RUN git config --global url."https://".insteadOf git://

RUN npm install
RUN npm run bootstrap
RUN npm run compile

EXPOSE 3000
EXPOSE 8100

CMD ["npm", "run", "node"]
