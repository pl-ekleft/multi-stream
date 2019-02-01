// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // передача настроек в sass-loader
      sass: {
        // @ - это псевдоним к каталогу src
        data: `
          @import "@/assets/scss/import/_variables.scss";
          @import "@/assets/scss/import/_mixins.scss";
          @import "@/assets/scss/import/_images.scss";
        `,
      },
    },
  },
}
