import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  const fetchCountry = async () => {
    if (position) {
      const geocoder = new google.maps.Geocoder();

      const response = await geocoder.geocode({
        location: { lat: position.latitude, lng: position.longitude },
      });

      if (response?.results[0]) {
        const country = response.results[0].address_components.find(
          (component) => component.types.includes('country')
        );

        if (country) {
          setCountry(country.long_name);
        }
      }
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [position]);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      return setError('Geolocation is not supported');
    }

    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { position, country, error };
}
