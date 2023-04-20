
import React, { useState, useEffect } from 'react';
import {createRoot} from 'react-dom/client';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import {IconLayer, LineLayer, ScatterplotLayer} from '@deck.gl/layers';
import Icon from '../images/map-marker.png'
import axios from 'axios';
import { ModStationData } from '../services/stationData';
// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 24.945831,
  latitude:60.192059,
  zoom: 11,
  pitch: 0,
  bearing: 0
};
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const MAP_VIEW = new MapView({repeat: true});
const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

const data = [{ name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', exits: 4214,  coordinates: [24.840319,60.16582] }]

// DeckGL react component
const MapApp = () => {
  
  const [ stationsData, setStationsData ] = useState([])
  const [ hoverInfo, setHoverInfo ] = useState();


  useEffect(() => {
    (async() => {
      const resStations = await axios.get('http://localhost:3003/api/v1/stations')
      const modData = await ModStationData(resStations.data)
      setStationsData(modData)
    })();
  },[])   

  function statioClick (){
    console.log("station click");
    console.log(hoverInfo);

  }

  const layer = [
      new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: stationsData,
        opacity: 1,
        getFillColor: d =>  d.Color,
        radiusMinPixels: 1,
        onHover: (info, event) => console.log('Hovered:', info, event),
        onClick: info => setHoverInfo(info.position),

        //data: [
        //  { position: [24.840319,60.16582], radius: 5 , Color: [225, 140, 0],},
        //  { position: [24.827467,60.171524], radius: 5 , Color: [225, 240, 0],}
        
        //],
        //data: stationsData,
        radiusScale: 40,
      }),
     
  ]
  //console.log(layer)

    return(
        <DeckGL
            layers={layer}
            getTooltip={({object}) => object && object.radius}
            pickable={true}
            views={MAP_VIEW}
            initialViewState={INITIAL_VIEW_STATE}
            //controller={{dragRotate: false}}
            controller={true}

            //onViewStateChange={hideTooltip}
            onClick={(x) => console.log(x)}

                  
            //getTooltip={() => stationsData && `${stationsData.name}\n${stationsData.address}`} 
            //getTooltip={({stationsData}) => stationsData && `${stationsData.name}\n${stationsData.address}`}


            >
             {hoverInfo && (
              <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: hoverInfo.x, top: hoverInfo.y}}>
               { hoverInfo.object.message }
              </div>
            )}

            <Map  reuseMaps mapLib={maplibregl} mapStyle={MAP_STYLE} preventStyleDiffing={true} /> 

            
        </DeckGL>
    )
}

export default MapApp;