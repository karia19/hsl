# Backend for HSL bike app

This is backend for hsl fronted and convert csv files to mongodb and make data validations before save. Mongodb is in docker file. 

## Installation

Install the dependencies and start the server.

```sh
cd bike-app-backend
npm i
docker compose up -d
node index.js 
```
In develope 
```sh
  npm run dev
```

## Store csv files to mongo db

To convert csv files to mongo run node convert.js.
- Run stations to mongo use:  readStationData('path_to_csv_file')
- Run jorneys to mongo use: readJorneyData('path_to_csv_file')



## Tech

- node.js - evented I/O for the backend
- Express - fast node.js network app framework
- csvtojson - convert csv file json object
- mongoose - mongo db connection


## API ENDPOINTS 

- /api/v1/jorneys/, get jorney data from jorneys and stats 
- /api/v1/stations/, get station data all or one station
- /api/v1/store/, store new staion or jorney data end point is post get and delete 



