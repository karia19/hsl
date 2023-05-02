# Backend for HSL bike app

This is backend for [hsl fronted](https://github.com/karia19/hsl/tree/master/bike-app-frontend) and convert csv files to mongodb and make data validations before save. Mongodb is in docker file. 

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


## REST API 

- /api/v1/jorneys/
  - api/v1/orneys/longestDistance
  - api/v1/jorneys//longestDuration
  
- /api/v1/stations/
- /api/v1/store/ 



