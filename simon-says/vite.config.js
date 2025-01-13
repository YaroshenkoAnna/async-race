import Inspect from "vite-plugin-inspect";

export default {
  base: "./",
  build: {
    minify: false,
    outDir: "dist",
  },
  css: {
    modules: {
      scopeBehaiour: "local",
    },
  },
  plugins: [Inspect()],
};
