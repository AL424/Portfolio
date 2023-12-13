import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu/index.html'),
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
  base: './',
};
