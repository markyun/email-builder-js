import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(),visualizer({open: true})],
  base: '/email-builder/',
  dedupe: [],
  mode: 'production', // 生产模式
  build: {
    emptyOutDir: true,
    // minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    // 关闭压缩
    minify: false,
    assetsDir: 'assets', // 默认 assets
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    rollupOptions: {
      // external: ['react','react-dom'],
      output: {
        // globals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM',
        // },
        manualChunks: {
          // 将 React 相关库打包成单独的 react-vendor 中
          'react-vendor': ['react', 'react-dom'],
          // 将组件库的代码打包
          'material': ['@mui/icons-material', '@mui/material'],
          'document-Core': ['@usewaypoint/document-core'],
          'usewaypoint-Builder': ['@usewaypoint/email-builder'],
        },
      },
    }
  }
});
