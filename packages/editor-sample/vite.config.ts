import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
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
    chunkSizeWarningLimit: 800, // chunk 大小警告的限制
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
  },
  server: {
    fs:{
      strict: false,
    },
    proxy: {
      // 代理所有 /ceg 开头的请求到

      '/ceg/': {
        target: 'http://10.45.80.101:8090/ceg/',
        // target: 'http://10.10.194.74/ceg/',
        changeOrigin: true,
      },

      // 淘宝
      '/rap2api/': {
        target: 'http://rap2api.taobao.org/app/mock/320728',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rap2api/, '')
      }

    }
  }
});
