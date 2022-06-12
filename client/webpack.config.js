// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DefinePlugin = require('webpack/lib/DefinePlugin');

const packages = require('./package.json');
const ENVIRONMENT = require('./environment.config');

const SOURCE_DIR = path.resolve(__dirname, ENVIRONMENT.PROJECT.SOURCE_DIR);
const OUTPUT_DIR = path.resolve(__dirname, ENVIRONMENT.PROJECT.OUTPUT_DIR);

const aliases = Object.entries(packages.aliases).reduce(
  (accum, [name, source]) => ({
    ...accum,
    [name]: path.resolve(__dirname, source),
  }),
  {}
);

const stats = {
  all: undefined,
  assets: true,
  assetsSort: 'name',
  chunks: false,
  entrypoints: true,
  assetsSpace: Number.MAX_SAFE_INTEGER,
  moduleAssets: false,
  groupAssetsByChunk: false,
  groupAssetsByEmitStatus: false,
  groupAssetsByInfo: false,
  groupModulesByAttributes: false,
  warnings: true,
  errors: true,
  errorDetails: true,
};

const server = {
  historyApiFallback: true,
  liveReload: false, // we don't need to hot reload if we have react-hot-loader
  compress: false,
  open: false, // https://webpack.js.org/configuration/dev-server/#devserveropen
  port: ENVIRONMENT.APPLICATION.PORT,
  host: ENVIRONMENT.APPLICATION.HOST,
  hot: true,
  client: {
    overlay: false,
  },
  proxy: {
    [ENVIRONMENT.API_URL]: 'http://localhost:9000',
  },
};

module.exports = {
  target: ['browserslist'],
  mode: ENVIRONMENT.IS_PRODUCTION ? 'production' : 'development',
  // Stop compilation early in production
  bail: ENVIRONMENT.IS_PRODUCTION,

  devtool: ENVIRONMENT.IS_PRODUCTION ? 'source-map' : 'cheap-module-source-map',

  devServer: ENVIRONMENT.IS_DEVELOPMENT ? server : undefined,

  stats,

  entry: {
    application: [
      'react-hot-loader/patch',
      path.resolve(SOURCE_DIR, 'index.ts'),
    ],
  },

  output: {
    path: OUTPUT_DIR,
    filename: ENVIRONMENT.IS_PRODUCTION
      ? 'assets/js/[name].[contenthash:8].js'
      : 'assets/js/[name].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: ENVIRONMENT.IS_PRODUCTION
      ? 'assets/js/[name].[contenthash:8].chunk.js'
      : 'assets/js/[name].chunk.js',

    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: `${ENVIRONMENT.APPLICATION.PUBLIC_URL}/`,

    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules'],
    alias: aliases,
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        // Include ts, tsx, js and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
          'sass-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(
      ENVIRONMENT.IS_PRODUCTION
        ? {
            issue: {
              exclude: [
                { file: '**/*.test.ts' },
                { file: '**/*.test.tsx' },
                { file: '**/test-utils/*' },
              ],
            },
          }
        : {}
    ),

    new DefinePlugin({
      'process.env': Object.entries(ENVIRONMENT).reduce(
        (accum, [key, value]) => ({
          ...accum,
          [key]: JSON.stringify(value),
        }),
        {}
      ),
    }),

    new HtmlWebpackPlugin({
      title: ENVIRONMENT.APPLICATION.TITLE,
      description: ENVIRONMENT.APPLICATION.DESCRIPTION,
      googleApiKey: ENVIRONMENT.GOOGLE_API_KEY,
      filename: path.resolve(OUTPUT_DIR, 'index.html'),
      template: path.resolve(SOURCE_DIR, 'public/index.html'),
      inject: true,
      minify: ENVIRONMENT.IS_PRODUCTION && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].[chunkhash].css',
    }),
  ],

  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'named',

    splitChunks: {
      name: 'vendors',
      chunks: 'all',
      cacheGroups: {
        react: {
          name: 'vendors~react',
          test: /[\\/]node_modules[\\/](react|react-dom|react-hot-loader|react-router|react-router-dom)[\\/]/,
          chunks: 'all',
        },

        polyfills: {
          name: 'vendors~polyfills',
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          chunks: 'all',
        },

        // Only create one CSS file to avoid
        // problems with code-split CSS loading in different orders
        // causing inconsistent/non-deterministic styling
        // See https://github.com/gatsbyjs/gatsby/issues/11072
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },

    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: true,
  },
};
