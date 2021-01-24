const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  eslint: {
    mode: 'file',
  },
  babel: {
    plugins: [
      ['react-remove-properties', { properties: ['data-testid'] }],
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'lodash',
      [
        'import',
        {
          libraryName: '@material-ui/core',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'core',
      ],
      [
        'import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'icons',
      ],
    ],
  },
  jest: {
    babel: {
      addPresets: false,
      addPlugins: false,
    },
    config: {
      coverageReporters: ['text', 'lcov'],
    },
  },
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.plugins.push(
          new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
          }),
        );
      }

      return webpackConfig;
    },
  },
};
