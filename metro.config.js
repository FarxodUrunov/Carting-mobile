const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

const projectRoot = __dirname;

const { withNativeWind } = require("nativewind/metro");
module.exports = withNativeWind(config, {
  input: "global.css",
  projectRoot,
  inlineRem: false,
});
