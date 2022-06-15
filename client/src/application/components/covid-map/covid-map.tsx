import { useEffect } from 'react';
import { render } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Spin } from 'antd';
const { Content } = Layout;

import {
  STATS_CACHED,
  GET_COUNTRY_CODE_MAP,
} from 'client/libs/graphql/queries';
import { StatsCached as StatsCachedData } from 'client/libs/graphql/queries/Stats/__generated__/StatsCached';
import { Util as UtilData } from 'client/libs/graphql/queries/Util/__generated__/Util';

interface CovidMapProps {
  position: { latitude: number; longitude: number };
}

export function CovidMap({ position }: CovidMapProps) {
  const { data, loading } = useQuery<StatsCachedData>(STATS_CACHED);

  const { data: getCountryCodeMapData, loading: countryCodeMapLoading } =
    useQuery<UtilData>(GET_COUNTRY_CODE_MAP);

  const renderMap = async () => {
    const mapContainer = document.getElementById('map-container');

    const map = new google.maps.Map(mapContainer, {
      center: new google.maps.LatLng({
        lat: position.latitude,
        lng: position.longitude,
      }),
      zoom: 4,
    });

    if (!data?.statsCached || !getCountryCodeMapData?.getCountryCodeMap) {
      render(
        <span>
          Was unable to load required data, so the map stays without markers...
        </span>,
        mapContainer
      );
    }

    data.statsCached.map((countryInfo) => {
      const foundCountryCodeMapping =
        getCountryCodeMapData.getCountryCodeMap.find(
          (mapElement) =>
            mapElement.countryName.includes(countryInfo.countryName) ||
            mapElement.countryCode.includes(countryInfo.countryName)
        );

      const icon = foundCountryCodeMapping
        ? {
            url: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${foundCountryCodeMapping.countryCode.toUpperCase()}.svg`,
            scaledSize: new google.maps.Size(30, 20),
            origin: new google.maps.Point(3, 2),
            anchor: new google.maps.Point(0, 0),
          }
        : null;

      const title = countryInfo.confirmed
        ? `${countryInfo.confirmed} confirmed cases in ${
            countryInfo.regionName ? countryInfo.regionName + ', ' : ''
          }${countryInfo.countryName}`
        : 'No data for this region';

      return new google.maps.Marker({
        position: { lat: countryInfo.lat, lng: countryInfo.lng },
        map,
        title,
        icon,
      });
    });
  };

  useEffect(() => {
    if (!loading && !countryCodeMapLoading) {
      renderMap();
    }
  }, [loading, countryCodeMapLoading]);

  if (loading) {
    return (
      <Content className="map-loading">
        <Spin size="large" tip="Loading COVID-19 map..." />
      </Content>
    );
  }

  return <div id="map-container">{/* Container for map */}</div>;
}
