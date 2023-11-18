module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    /* Use localhost for connecting to local back-end or */
    proxy: {
      '^/api': {
        target: 'http://localhost:8001',
        // target: 'https://maksuametnik.ringikoor.ee',
        changeOrigin: true
      },
    }
  }
}
