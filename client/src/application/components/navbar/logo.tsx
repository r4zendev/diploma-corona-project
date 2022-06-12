import { Typography } from 'antd';
const { Title } = Typography;

import { LogoIcon } from './logo.icon';

export function Logo() {
  return (
    <div>
      <div>
        <LogoIcon />
      </div>
      <Title
        level={1}
        style={{
          margin: '0 10px',
          fontSize: 30,
          fontWeight: 700,
          color: '#fff',
        }}
      >
        CoronaNews
      </Title>
    </div>
  );
}
