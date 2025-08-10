# 🚦 Ứng dụng web An toàn Giao thông

Một ứng dụng web giáo dục về an toàn giao thông được xây dựng bằng Express.js và EJS, giúp người dùng học hỏi về các biển báo giao thông và kiểm tra kiến thức thông qua trò chơi trắc nghiệm.

## ✨ Tính năng

### 🏠 Trang chủ
- **Hiển thị kiến thức về biển báo giao thông:**
  - Biển báo cấm (10 loại)
  - Biển báo nguy hiểm (4 loại)
  - Biển báo hiệu lệnh (5 loại)
- **Giao diện Material Design** với các thẻ (cards) hiện đại
- **Responsive design** tương thích mọi thiết bị

### 🎯 Trò chơi Trắc nghiệm
- **35 câu hỏi** về an toàn giao thông
- **Hệ thống câu hỏi ngẫu nhiên**
- **Logic trò chơi:**
  - ✅ **Trả lời đúng:** Chuyển sang câu hỏi tiếp theo
  - ❌ **Trả lời sai:** Hiển thị hình phạt ngẫu nhiên, sau đó chuyển câu hỏi tiếp theo
- **7 loại hình phạt** đa dạng (lùi bước, về điểm xuất phát, dừng lượt, v.v.)

## 🛠️ Công nghệ sử dụng

- **Backend:** Express.js
- **Frontend:** EJS Templates
- **Styling:** CSS3 với Material Design
- **Icons:** Material Icons
- **JavaScript:** Vanilla JS (ES6+)

## 📁 Cấu trúc thư mục

```
tracnghiem/
├── app.js                 # File chính của ứng dụng Express
├── package.json          # Dependencies và scripts
├── views/
│   └── index.ejs         # Template trang chủ
├── public/
│   ├── css/
│   │   └── style.css     # Stylesheet chính
│   └── js/
│       └── script.js     # JavaScript frontend
├── images/               # Hình ảnh biển báo
│   ├── bien-bao-cam/
│   ├── bien-bao-nguy-hiem/
│   └── bien-bao-hieu-lenh/
├── knowledges/           # Dữ liệu kiến thức
│   ├── bien-bao-cam.json
│   ├── bien-bao-nguy-hiem.json
│   └── bien-bao-hieu-lenh.json
├── question.json         # 35 câu hỏi trắc nghiệm
└── penalties.json        # 7 loại hình phạt
```

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js (v14 hoặc cao hơn)
- npm

### Các bước cài đặt

1. **Clone repository:**
```bash
git clone <repository-url>
cd tracnghiem
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy ứng dụng:**
```bash
# Chạy production
npm start

# Chạy development (với nodemon)
npm run dev
```

4. **Truy cập ứng dụng:**
Mở trình duyệt và truy cập: `http://localhost:3000`

## 📖 Hướng dẫn sử dụng

### 🏠 Trang chủ
1. Cuộn xuống để xem các loại biển báo
2. Mỗi biển báo có hình ảnh và mô tả chi tiết
3. Giao diện được chia thành 3 phần:
   - **Biển báo Cấm** (màu đỏ)
   - **Biển báo Nguy hiểm** (màu vàng)
   - **Biển báo Hiệu lệnh** (màu xanh)

### 🎯 Trò chơi Trắc nghiệm
1. Nhấn nút **"Trả lời câu hỏi"** trên thanh menu
2. Đọc câu hỏi và chọn đáp án
3. Xem kết quả ngay lập tức:
   - **Đúng:** Hiển thị thông báo chúc mừng
   - **Sai:** Hiển thị đáp án đúng và hình phạt
4. Nhấn **"Câu hỏi tiếp theo"** để tiếp tục

### ⌨️ Phím tắt
- **Escape:** Đóng modal
- **1-9:** Chọn đáp án trong quiz (theo thứ tự)

## 📊 Dữ liệu

### 🚫 Biển báo Cấm (10 loại)
- Biển đường cấm 101
- Biển cấm đi ngược chiều 102
- Biển cấm đi thẳng 401
- Biển cấm rẽ phải/trái 402/403
- Biển cấm quay đầu 405
- Biển cấm đỗ xe 406/407
- Biển cấm đi bộ 606
- Biển cấm xe đạp 607

### ⚠️ Biển báo Nguy hiểm (4 loại)
- Giao nhau với đường sắt có rào chắn
- Công trường thi công
- Giao nhau có tín hiệu đèn
- Giao nhau với đường ưu tiên

### 🔵 Biển báo Hiệu lệnh (5 loại)
- Các xe chỉ được đi thẳng (R.301a)
- Các xe chỉ được rẽ phải (R.301b/R.301d)
- Các xe chỉ được rẽ trái (R.301c/R.301e)

### ❓ Câu hỏi Trắc nghiệm (35 câu)
Bao gồm các chủ đề:
- An toàn khi tham gia giao thông
- Quy tắc đi bộ và xe đạp
- Sử dụng mũ bảo hiểm
- Hiểu biết về biển báo
- Xử lý tình huống giao thông

### 🎯 Hình phạt (7 loại)
- Lùi 3 bước
- Đi đến ngã tư/ngã 3 gần nhất
- Về ô bắt đầu
- Đi đến ô đèn báo hiệu gần nhất
- Đổ 2 lần xúc xắc chẵn
- Dừng 2 lượt đi

## 🎨 Thiết kế

- **Material Design:** Giao diện hiện đại, thân thiện
- **Responsive:** Tương thích desktop, tablet, mobile
- **Accessibility:** Hỗ trợ phím tắt và screen reader
- **Performance:** Tối ưu hóa loading và animations
- **Color Scheme:** 
  - Primary: Blue (#1976d2)
  - Success: Green (#4caf50)
  - Warning: Orange (#ff9800)
  - Error: Red (#f44336)

## 🔧 Scripts

```bash
# Chạy production
npm start

# Chạy development với auto-reload
npm run dev
```

## 📝 License

ISC License

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Liên hệ

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue trong repository.

---

**Made with ❤️ for Traffic Safety Education**
