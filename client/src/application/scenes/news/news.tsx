import { useCallback } from 'react';
import { Avatar, Layout, List, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks';
const { Content } = Layout;
const { Title, Text } = Typography;

import { NEWS } from 'client/libs/graphql/queries';
import { News as NewsData } from 'client/libs/graphql/queries/News/__generated__/News';
import { LogoIconSmall } from 'client/components';

export function News() {
  const { data, loading } = useQuery<NewsData>(NEWS, {
    fetchPolicy: 'cache-and-network',
  });

  const isExistingAvatar = (imageUrl: string) => {
    return imageUrl && !(imageUrl === 'default');
  };

  const getNews = useCallback(() => {
    if (!loading && !data?.news) {
      return (
        <div
          className="news__content__empty-wrapper"
          style={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          <Text className="news__content__empty-wrapper__empty-text">
            Sorry, no available news could be fetched.
          </Text>
        </div>
      );
    }

    return (
      <List
        className="news__content__news-list"
        grid={{ gutter: 16, column: 3 }}
        loading={loading}
        itemLayout="horizontal"
        dataSource={data?.news}
        pagination={{
          className: 'pagination',
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        renderItem={(item) => {
          return (
            <List.Item key={item.createdDate}>
              <List.Item.Meta
                avatar={
                  <a href={item.url}>
                    {isExistingAvatar(item.imageUrl) ? (
                      <Avatar src={item.imageUrl} />
                    ) : (
                      <Avatar
                        icon={<LogoIconSmall />}
                        style={{ backgroundColor: 'rgba(29,165,122, 0.12)' }}
                      />
                    )}
                  </a>
                }
                title={<a href={item.url}>{item.type}</a>}
                description={item.title}
              >
                <Text>{item.byString}</Text>
              </List.Item.Meta>
            </List.Item>
          );
        }}
      />
    );
  }, [loading]);

  return (
    <Layout className="news">
      <Content className="news__content">
        <Title level={2} className="news__content__title">
          Recent news of COVID-19
        </Title>
        {getNews()}
      </Content>
    </Layout>
  );
}
