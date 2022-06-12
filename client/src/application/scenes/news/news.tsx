import { Layout, Typography } from 'antd';
const { Content } = Layout;

const { Title, Paragraph } = Typography;

export function News() {
  return (
    <Layout className="news">
      <Content className="news__content"></Content>
    </Layout>
  );
}
