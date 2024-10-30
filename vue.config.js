const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Håndterer .raw filer
    config.module
      .rule('raw')
      .test(/\.(raw)$/)
      .use('file-loader')
      .loader('file-loader')
      .end();

    // Håndterer .avif filer
    config.module
      .rule('avif')
      .test(/\.(avif)$/)
      .use('file-loader')
      .loader('file-loader')
      .end();
  },
});
