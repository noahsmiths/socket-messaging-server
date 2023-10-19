# syntax=docker/dockerfile:1

FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm install typescript -g
RUN tsc

RUN npm install pm2 -g
CMD ["pm2-runtime", "dist/index.js"]
EXPOSE 8080