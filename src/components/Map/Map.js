import { LoadScriptNext, GoogleMap, Circle } from '@react-google-maps/api';

const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const Map = ({ lat, lng }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '35vh',
  };

  const center = {
    lat,
    lng,
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
        zoom={15}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          zoomControl: false,
          scrollwheel: false,
          gestureHandling: 'none',
          fullscreenControl: true,
          keyboardShortcuts: false,
        }}
      >
        <Circle radius={300} center={center} options={circleOptions} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
