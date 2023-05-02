# Backend for HSL bike app

This is backend for hsl fronted and convert csv files to mongodb and make data validations before save. Mongodb is in docker file. 

## Installation

Install the dependencies and start the server.

```sh
cd bike-app-backend
npm i
docker compose up -d
node index.js 

dev npm run dev
```

## Sotre csv files to mongo db

To convert csv files to mongo run node convert.js.
Run stations to mongo use:  readStationData('path_to_csv_file')
Run jorneys to mongo use: readJorneyData('path_to_csv_file')




