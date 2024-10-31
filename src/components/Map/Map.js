import { LoadScriptNext, GoogleMap, Circle } from '@react-google-maps/api';

const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '35vh',
  };

  const center = {
    lat: 51.0447,
    lng: -114.0633,
  };

  const circleOptions = {
    strokeColor: '#71B2AB',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#71B2AB',
    fillOpacity: 0.25,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };

  return (
    <LoadScriptNext googleMapsApiKey={MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          scrollwheel: false,
          gestureHandling: 'cooperative',
        }}
      >
        <Circle radius={400} center={center} options={circleOptions} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
