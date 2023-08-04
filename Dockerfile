FROM node:18-alpine
WORKDIR /home/node/app
COPY . .
RUN npm ci
CMD [ "npm", "run", "start" ]
