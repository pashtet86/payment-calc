module.exports = {
  lintOnSave: undefined,
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true,
    loaderOptions: { // global import
      // sass: {
      //   data: `
      //     @import "@/assets/styles/base/variables.scss";
      //     @import "@/assets/styles/base/mixins.scss";
      //   `,
      // },
    },
  },
};
