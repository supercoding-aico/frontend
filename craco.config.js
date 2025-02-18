const path = require('path');

const config = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@axios': path.resolve(__dirname, 'src/axios'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
        @use './src/styles/base/mixins' as mixins;
        @use './src/styles/base/variables' as *;
      `,
      },
    },
  },
};

module.exports = config;
