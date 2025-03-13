import Inspect from "vite-plugin-inspect";

export default {
  base: "./",
  build: {
    sourcemap: true,
    target: "esnext",
    compact: false,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [Inspect()],
};
