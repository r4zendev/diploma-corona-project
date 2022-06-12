import { Layout, Typography } from 'antd';

import { CovidMap } from 'client/components';
import { useGeolocation } from 'client/core';
import { ShareOptions } from './components';
const { Content } = Layout;
const { Title } = Typography;

export function Status() {
  const { position } = useGeolocation();

  return (
    <Layout className="status">
      <Content className="status__content">
        <div className="status__content__title-area">
          <Title level={2} className="status__content__title-area__title">
            Current status of COVID-19 infection
          </Title>
          <ShareOptions />
        </div>
        <div className="status__content__main">
          <iframe
            src="https://public.domo.com/cards/dwoBJ"
            width="100%"
            height="600"
          ></iframe>

          {position && <CovidMap position={position} />}
        </div>
      </Content>
    </Layout>
  );
}
