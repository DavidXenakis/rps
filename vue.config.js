module.exports = {
  configureWebpack: {
    output: {
      globalObject: "this"
    }
  },
  devServer: {
    disableHostCheck: true,
    host: "192.168.183.128",
    port: 8080
  },
  runtimeCompiler: true
};
