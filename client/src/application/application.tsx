import { Layout } from 'antd';

import { Navbar } from 'client/components';
import { Root } from './root';

export function Application() {
  return (
    <Layout>
      <Navbar />
      <Root />
    </Layout>
  );
}
