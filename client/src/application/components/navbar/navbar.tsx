import { AppBar, Box, Container, Toolbar } from '@mui/material';

import { Logo } from './logo';
import { Nav } from './nav';

export function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={(_theme) => ({
        bgcolor: 'background.dark',
        // ...theme.mixins.navbar,
      })}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters variant="dense">
          <Box sx={{ mr: 4 }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Nav />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
