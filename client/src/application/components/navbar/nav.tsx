import {
  CopyOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const pages = [
  {
    name: 'Home',
    url: '/',
    icon: <HomeOutlined style={{ marginRight: 8 }} />,
  },
  {
    name: 'About COVID',
    url: '/info',
    icon: <InfoCircleOutlined style={{ marginRight: 8 }} />,
  },
  {
    name: 'Prevention & Curing',
    url: '/curing',
    icon: <ExperimentOutlined style={{ marginRight: 8 }} />,
  },
  {
    name: 'Status and Overview',
    url: '/status',
    icon: <DesktopOutlined style={{ marginRight: 8 }} />,
  },
  {
    name: 'News',
    url: '/news',
    icon: <CopyOutlined style={{ marginRight: 8 }} />,
  },
];

const NavLinkStyled = styled(NavLink)`
  font-weight: 600;
  font-size: 16px;
  margin: 0 15px;
  padding: 0 4px;
  height: 56px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &.active {
    border-color: #00baa5;
  }
`;

export function Nav() {
  return (
    <>
      {pages.map(({ name, url, icon }) => (
        <NavLinkStyled key={url} to={url} end>
          {icon}
          {name}
        </NavLinkStyled>
      ))}
    </>
  );
}
