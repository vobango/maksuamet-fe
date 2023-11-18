module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    /* Use localhost for connecting to local back-end or production server */
    proxy: {
      '^/api': {
        target: 'http://localhost:8001',
        // target: 'https://maksuametnik.ringikoor.ee', // NB! Do not make POST requests when using this for testing
        changeOrigin: true
      },
    }
  }
}
