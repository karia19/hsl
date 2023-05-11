# React Bike Station App  

This React app allows users to view bike station data in an interactive map. It uses the [react-map-gl](https://github.com/uber/react-map-gl) library to render the map, and [Axios](https://github.com/axios/axios) to make HTTP requests to the server. 
It also uses [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) to display the stats from each station.  

When the app is loaded, the map will show bike station markers in different colors, depending on the number of bikes in each station. 

When a marker is clicked, a detailed view of the station's stats will be displayed, including the top five departure and return stations and the mean travel duration for the month of May. Users can also view stats for all months by clicking the "All Months" button.


## Installation To install this application, clone the repository and install the dependencies:  
``` 
git clone https://github.com/username/repo.git 

cd repo npm install 
``` 
Once the dependencies are installed, start the application with: 
``` npm start ``` 
The application should now be running on http://localhost:3000.
