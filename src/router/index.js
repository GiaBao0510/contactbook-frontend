import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/view/ContactBook.vue";

const routes = [
    {
        path:"/",
        name: "contactbook",
        component: ContactBook,
    },
    //Trường hợp không tìm thấy trang
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/view/NotFound.vue"),
    }
];

// hàm createRouter được cung cấp bởi Vue Router để tạo ra một router instance.
const router = createRouter({
    //Thuộc tính history thiết lập chế độ history navigation cho router.
    //createWebHistory(import.meta.env.BASE_URL): tạo ra một history instance sử dụng Web History API.
    //import.meta.env.BASE_URL: là một biến môi trường đặc biệt trong Vue 3, chứa đường dẫn gốc của ứng dụng web.
    /*
         Đối tượng import.meta.env chứa các biến môi trường cho ứng dụng quản lý bởi Vite. env.BASE_URL trả về URL cơ sở
        của ứng dụng trên máy chủ web. Giá trị này cũng được xác định bởi tùy chọn "base" trong file e vite.config.js 
        (mặc định là "/" - ứng dụng được triển khai ngay tại document root của máy chủ web). 
    */
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;