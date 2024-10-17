import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      copyDtsFiles: true,
      cleanVueFileName: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.build.json',
      include: ['src/'],
    }),
  ],
  build: {
    // target: 'es2015', // 你希望的目标浏览器环境的目标版本
    emptyOutDir: true,
    minify: 'esbuild',
    // minify: false,
    sourcemap: false,
    lib: {
      // entry: '/src/index.tsx',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      // 排除列表，不打包这些依赖
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
