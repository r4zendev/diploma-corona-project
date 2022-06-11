import { Environment } from 'client/interfaces';

export const ENVIRONMENT: Environment = process.env as never;

const ROUTES_ROOT = '/';

export const ROUTES = {
  ROOT: ROUTES_ROOT,
  NEWS: `${ROUTES_ROOT}/news`,
};

export const ItemTypes = {
  MODULE: 'module',
};
