# Helsinki city bike app

This project provides a frontend and backend solution for managing and displaying data from a MongoDB database. The backend is running in a Docker container and provides an API for the frontend. The frontend is built using React.js and displays the locations of the stations on a map. It allows users to search for stations by name and view their stats in a separate window. 

Additionally, you can add and remove stations from the database.

## [DemoaApp](https://hsl-1s0l.onrender.com)

## RUN APP
Backend
```sh
cd bike-app-backend
npm i
docker compose up -d
```
Frontend
```sh
cd bike-app frontend
npm i
npm start
```
## Technologies
- backend node.js 
- frontend React
- Docker
