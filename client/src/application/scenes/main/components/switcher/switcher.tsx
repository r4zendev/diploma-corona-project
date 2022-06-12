import { Breadcrumb, Typography } from 'antd';
import { StockOutlined, GlobalOutlined } from '@ant-design/icons';
const { Link } = Typography;

export interface SwitcherProps {}

export function Switcher({}: SwitcherProps) {
  return (
    <Breadcrumb className="home__content__filters__breadcrumbs">
      <Breadcrumb.Item>
        <StockOutlined />
        <Link>Switch to charts</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <GlobalOutlined />
        <Link>Show map</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
