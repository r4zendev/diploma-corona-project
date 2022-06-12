import { Layout } from 'antd';
const { Header } = Layout;

import { Logo } from './logo';
import { Nav } from './nav';

export function Navbar() {
  return (
    <Header className="header">
      <Logo />
      <Nav />
    </Header>
  );
}
