import { Card, Layout, List, Typography } from 'antd';
import { CountryCode, Filters } from 'client/interfaces';
import { useCallback, useState } from 'react';
const { Content } = Layout;

import { useQuery } from '@apollo/react-hooks';
import { STATS } from 'client/libs/graphql/queries';
import {
  Stats as StatsData,
  StatsVariables,
} from 'client/libs/graphql/queries/Stats/__generated__/Stats';

import { FilterOptions, Switcher } from './components';

const { Title, Text } = Typography;

export function Main() {
  const [filterStatus, setFilterStatus] = useState<Filters>({
    country: CountryCode.GLOBAL,
    timestamp: null,
  });

  const formatStatsQueryVariables = useCallback(() => {
    return {
      country: filterStatus.country === 'global' ? null : filterStatus.country,
      timestamp: filterStatus.timestamp,
    };
  }, [filterStatus]);

  const generateReadableCaption = useCallback(() => {
    let caption = 'Worldwide stats for COVID-19';

    if (filterStatus.country && filterStatus.country !== CountryCode.GLOBAL) {
      const [countryName] = Object.entries(CountryCode).find(
        ([, countryISO]) => countryISO === filterStatus.country
      );

      const countryNameFormatted = countryName
        .split('_')
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');

      caption =
        countryNameFormatted + ' ' + caption.split(' ').slice(1).join(' ');
    }

    if (filterStatus.timestamp) {
      caption =
        caption +
        ` from ${filterStatus.timestamp.startDate} to ${filterStatus.timestamp.endDate}`;
    }

    return caption;
  }, [filterStatus]);

  const { data, loading } = useQuery<StatsData, StatsVariables>(STATS, {
    variables: formatStatsQueryVariables(),
    fetchPolicy: 'cache-and-network',
  });

  const getListToRender = useCallback(() => {
    if (!loading && data?.stats) {
      return (
        <List
          className="home__content__stats"
          grid={{ gutter: 16, column: 3 }}
          loading={loading}
          dataSource={Object.entries(data.stats)}
          renderItem={([key, value]) => (
            <List.Item key={key}>
              <Card
                title={
                  key &&
                  key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/[A-Z]/g, ' $&')
                }
              >
                {value && value > 1
                  ? value.toString()
                  : 'Data is not available.'}
              </Card>
            </List.Item>
          )}
        />
      );
    } else if (!loading && !data?.stats) {
      return (
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          <Text>No data available for this country!</Text>
        </div>
      );
    } else {
      return (
        <List
          grid={{ gutter: 16, column: 3 }}
          loading={loading}
          dataSource={new Array(6).fill('random')}
          renderItem={(value, idx) => (
            <List.Item key={idx}>
              <Card loading={loading}>{value}</Card>
            </List.Item>
          )}
        />
      );
    }
  }, [loading]);

  return (
    <Layout className="home">
      <Content className="home__content">
        <Title level={3} className="home__content__title">
          {generateReadableCaption()}
        </Title>
        <div className="home__content__filters">
          <FilterOptions
            value={filterStatus}
            setter={setFilterStatus}
          ></FilterOptions>
          <Switcher />
        </div>
        {getListToRender()}
      </Content>
    </Layout>
  );
}
