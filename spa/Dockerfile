FROM node:18.16.1-alpine

WORKDIR '/app'

RUN npm install
RUN npm build

EXPOSE 4200

CMD ["npm", "start"]