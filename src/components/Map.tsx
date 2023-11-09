import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { googleMapsKey } from "@utils/maps"

const containerStyle = {
  width: '50vw',
  height: '40vh'
};


function Map({schoolLat, schoolLong}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsKey
    })
    
    const [map, setMap] = React.useState(null)
    const center = {
      lat: schoolLat,
      lng: schoolLong
    };
    

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={center} />
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)