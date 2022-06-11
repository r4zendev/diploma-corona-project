import { Box, Typography } from '@mui/material';

import { LogoIcon } from './logo.icon';

export function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ mr: 2 }}>
        <LogoIcon />
      </Box>
      <Typography
        variant="h4"
        noWrap
        component="h1"
        fontSize={20}
        fontWeight={900}
      >
        CoronaNews
      </Typography>
    </Box>
  );
}
