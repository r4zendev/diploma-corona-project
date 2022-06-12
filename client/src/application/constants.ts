import { Environment } from 'client/interfaces';

export const ENVIRONMENT: Environment = process.env as never;

const ROUTES_ROOT = '/';

export const ROUTES = {
  ROOT: ROUTES_ROOT,
  INFO: `${ROUTES_ROOT}/info`,
  NEWS: `${ROUTES_ROOT}/news`,
  CURING: `${ROUTES_ROOT}/curing`,
  STATUS: `${ROUTES_ROOT}/status`,
  ABOUT: `${ROUTES_ROOT}/about`,
};

export const ItemTypes = {
  MODULE: 'module',
};
