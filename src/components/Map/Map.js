import { LoadScriptNext, GoogleMap } from '@react-google-maps/api';

const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const Map = () => {
  return (
    <LoadScriptNext googleMapsApiKey={MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '200px' }}
        center={{ lat: 40.748817, lng: -73.985428 }}
        zoom={10}
        options={{
          disableDefaultUI: true,
        }}
      >
        {/* Additional map features/components can go here */}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
