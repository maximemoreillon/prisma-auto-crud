FROM node:20

WORKDIR /usr/src/app
COPY . .

RUN npm install
EXPOSE 80

CMD [ "npm", "run", "start"]
