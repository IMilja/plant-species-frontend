module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/biljne-vrste' : '/',
  transpileDependencies: [
    'vuetify',
  ],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
    },
  },
};
