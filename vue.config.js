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
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
};
