import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;

import { LogoIcon } from '../icons';

export function Logo() {
  const navigate = useNavigate();

  const onHeaderClick = () => {
    navigate('/');
  };

  return (
    <div onClick={onHeaderClick} className="header-logo">
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
