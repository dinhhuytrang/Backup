import axios from 'axios';

// Tạo một instance axios với cấu hình cơ bản
const instance = axios.create({
  baseURL: 'http://192.168.0.102:9999',
});

// Thêm interceptor để xử lý lỗi
instance.interceptors.response.use(
  response => response,
  error => {
    // Xử lý lỗi chung ở đây
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

// Xuất instance để sử dụng trong các file khác
export default instance;
