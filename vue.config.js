module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/biljne-vrste' : '/',
  transpileDependencies: [
    'vuetify',
  ],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
  },
};
