/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: ["@snowpack/plugin-typescript"],
  routes: [],
  packageOptions: {},
  devOptions: {
    port: 6030,
  },
  buildOptions: {},
  optimize: {
    bundle: true,
    treeshake: true,
    target: "es2017",
  },
};
