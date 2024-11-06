import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
        copyDtsFiles: true,
        cleanVueFileName: true,
        rollupTypes: true,
        tsconfigPath: "./tsconfig.build.json" ,
        include: ['src/'],
    }),
  ],
  build: {
    lib: {
      entry: '/src/index.tsx',
      formats: ['es', 'cjs'],
      name: 'index',
      fileName: 'index'
    },
    rollupOptions: {
      // 确保 Rollup 能够找到并包含 TypeScript 编译后的文件
      external: ['react'],
      output: {
        globals: {},
        // 其他输出选项...
      }
    },
  },
});