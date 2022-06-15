import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { StockOutlined } from '@ant-design/icons';
import { ROUTES } from 'client/constants';

export interface SwitcherProps {}

export function Switcher({}: SwitcherProps) {
  return (
    <Breadcrumb className="home__content__filters__breadcrumbs">
      <Breadcrumb.Item>
        <StockOutlined />
        <Link to={ROUTES.STATUS}>Switch to charts</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
