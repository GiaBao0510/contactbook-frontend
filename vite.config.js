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
  //Thuộc tính resolve cho phép bạn tùy chỉnh cách thức Vite giải quyết các import trong code của bạn.
  resolve: {
    //Thuộc tính alias chứa 1 cặp key-value. Trong đó "@" là key ,còn "fileURLToPath(new URL('./src', import.meta.url))" là value
    alias: {
      //hàm fileURLToPath():  được sử dụng để chuyển đổi một URL file thành một đường dẫn file trên hệ thống.
      //Biến import.meta.url: chứa URL của module hiện tại đang được thực thi.
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    post: 3001,
    /*
       Để không cần phải gán cứng hostname/ip của API server trong dự án thì cần phải hiệu chỉnh lại tệp tin này,
      cấu hình proxy chuyển yêu cầu có URL chứa /api xuất phát từ ứng dụng VUE.
    */
   proxy:{
    "/api":{
      target: "http://localhost:3000/",
      changeOrigin: true,
    }
   }
  },
  
});
