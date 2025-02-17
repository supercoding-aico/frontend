const config = {
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
