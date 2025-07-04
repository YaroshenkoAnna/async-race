export default {
  base: "./",
  build: {
    sourcemap: false,
    target: "esnext",
    compact: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    devSourcemap: false,
  },
};
