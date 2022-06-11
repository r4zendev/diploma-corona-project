const {
  DEBUG_BUILD,
  IS_TEST,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
} = require('./environment.config');

const presets = [
  [
    '@babel/env',
    {
      debug: DEBUG_BUILD && !IS_TEST,
      corejs: 3,
      loose: true,
      modules: IS_TEST ? 'commonjs' : false,
      targets: IS_TEST ? { node: 'current' } : undefined,
      useBuiltIns: 'usage',
      forceAllTransforms: IS_PRODUCTION,
    },
  ],

  ['@babel/preset-react', { runtime: 'automatic' }],

  ['@babel/preset-typescript'],
];

const plugins = ['react-hot-loader/babel'];

module.exports = function (api) {
  api.cache(() => IS_DEVELOPMENT);

  return {
    presets,
    plugins,
  };
};
