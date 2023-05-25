FROM node:16.13.2
#FROM node:11-alpine

FROM mongo:latest

FROM mongo:latest

WORKDIR /app
COPY package*.json ./
RUN npm install --quiet --no-cache


COPY . .

ENV PORT 3003
CMD ["npm", "run", "start"]
