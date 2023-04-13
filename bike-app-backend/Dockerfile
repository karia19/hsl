FROM node:16.13.2
#FROM node:11-alpine
WORKDIR /app
COPY package*.json ./

RUN if [ "$NODE_ENV"= "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

ENV PORT 3003
CMD ["node", "index.js"]