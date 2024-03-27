import axios from "axios";

const commonConfig = {
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
};

//Tạo 1 tham số xuất khẩu mặc định nhận 1 tham số baseURL & trả về 1 đối tượng Axios
export default (baseURL) => {
    //axios.create(): Hàm tạo một đối tượng Axios mới với các tùy chọn cấu hình được cung cấp.
    return axios.create({
        baseURL,        //Thuộc tính thiết lập URL cơ sở cho các yêu cầu API.
        ...commonConfig, // Sử dụng toán tử spread để hợp nhất các thuộc tính từ đối tượng commonConfig vào cấu hình Axios.
    });
};