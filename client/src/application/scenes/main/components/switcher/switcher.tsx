import { Breadcrumbs, Typography } from '@mui/material';
import { Language, Timeline } from '@mui/icons-material';

export interface SwitcherProps {}

export function Switcher({}: SwitcherProps) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography
        color="text.secondary"
        sx={{
          textDecoration: 'underline',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Language sx={{ mr: 0.5 }} fontSize="inherit" />
        Switch to graphs
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          textDecoration: 'underline',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Timeline sx={{ mr: 0.5 }} fontSize="inherit" />
        Show map
      </Typography>
    </Breadcrumbs>
  );
}
