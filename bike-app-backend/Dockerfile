FROM node:16.13.2
#FROM node:11-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ENV PORT 3003
CMD ["npm", "run", "start"]
