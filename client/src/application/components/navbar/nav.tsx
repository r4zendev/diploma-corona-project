import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const pages = [
  {
    name: 'Home',
    url: '/ingestions',
    icon: <Home style={{ marginRight: '10px' }} />,
  },
];

const NavLinkStyled = styled(NavLink)(
  ({ theme }) => `
    color: ${theme.palette.primary.contrastText};
    font-weight: 600;
    font-size: 16px;
    margin: 0 10px;
    padding: 0 4px;
    height: 56px;
    display: flex;
    align-items: center;
    text-decoration: none;
    border-bottom: 2px solid transparent;

    &.active {
      border-color: #00BAA5;
    }
  `
);

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
