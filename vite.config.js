import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
/* 
  + export được sử dụng để xuất một giá trị từ module Vue.js sang các module khác.
  + default cho biết đây là giá trị mặc định được xuất khi sử dụng import mà không ghi rõ tên.
  + defineConfig là một hàm được cung cấp bởi Vue CLI để định nghĩa cấu hình cho ứng dụng Vue.js. Hàm này trả về một đối tượng cấu hình.
*/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    post: 3001,
  },
});
