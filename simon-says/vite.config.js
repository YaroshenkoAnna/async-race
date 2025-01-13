import Inspect from "vite-plugin-inspect";

export default {
  base: "./",
  build: {
    minify: false,
    sourcemap: true,
    target: "esnext",
    compact: false,
  },
  css: {
    minify: false,
    devSourcemap: true,
  },
  plugins: [Inspect()],
};
