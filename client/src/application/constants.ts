import { Environment } from 'client/interfaces';

export const ENVIRONMENT: Environment = process.env as never;

const ROUTES_ROOT = '/';

export const ROUTES = {
  ROOT: ROUTES_ROOT,
  INFO: 'info',
  NEWS: 'news',
  CURING: 'curing',
  STATUS: 'status',
  ABOUT: 'about',
};

export const ItemTypes = {
  MODULE: 'module',
};
