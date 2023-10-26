// const LocationOnMap = () => {
//   return (
//     <div className='py-4'>
//       <h2>Nơi bạn sẽ đến</h2>
//     </div>
//   );
// };
// export default LocationOnMap;

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {Map} from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicHAzMTEiLCJhIjoiY2xvMW9hazBtMWRuczJ0cWh0eDl1andncCJ9.cINZ3UYbzs7plrM2seqPjg'

//get coordinates from API
const coordinates = {
  lng:108.20898,
  lat:16.05364
}
const LocationOnMap=() => {
  const mapContainer = useRef<HTMLDivElement|null>(null);
  const map = useRef<Map|null>(null);
  const [lng, setLng] = useState(coordinates.lng);
  const [lat, setLat] = useState(coordinates.lat);
  const [zoom, setZoom] = useState(17);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/pp311/clo1ucw6g00fd01r26ds09u1z',
      center: [lng, lat],
      zoom: zoom
    });
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
    map.current.on('move', () => {
      setLng(Number(map.current?.getCenter().lng.toFixed(4)));
      setLat(Number(map.current?.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current?.getZoom().toFixed(2)));
    });
  });

  return (
    <div>
      <h1 className='text-xl text-cyan-800 font-bold pb-2 pt-5'>Nơi bạn cần đến</h1>
      {/* <div className="sidebar" style={{backgroundColor: 'rgba(35, 55, 75, 0.3)', color:'#fff',position:'absolute'}}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div ref={mapContainer} className="map-container" style={{ height: '600px' }}/>
    </div>
  );
}
export default LocationOnMap;