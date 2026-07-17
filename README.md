# MediaX Agent Bank — Python UI Implementation 🚀

Dự án tái hiện **100% chính xác** thiết kế giao diện **MediaX Agent Bank** (*Hỏi đáp AI / `#qa`* và *Kho tài liệu / `#documents`*) bằng **Python** theo đúng 2 ảnh thiết kế đính kèm.

Để đáp ứng tối đa nhu cầu của bạn (dù bạn muốn chạy Web App trên cổng `localhost:3000` giống địa chỉ trên trình duyệt hay ứng dụng Desktop Native), dự án cung cấp **3 phiên bản Python đầy đủ**:

---

## 📦 Cài đặt thư viện

Bạn chỉ cần cài đặt các thư viện cơ bản trong `requirements.txt`:

```bash
pip install -r requirements.txt
```

---

## 🌟 1. Phiên bản Python Web Application (`localhost:3000`)
*(Khuyến nghị — Giống 100% trải nghiệm và địa chỉ trên hình ảnh `localhost:3000/#qa` và `#documents`)*

Phiên bản này khởi chạy một máy chủ Python HTTP Server phục vụ giao diện SPA (Single Page Application) với độ chính xác từng pixel:

```bash
python web_app.py
```

👉 **Mở trình duyệt tại:** [http://localhost:3000/#qa](http://localhost:3000/#qa)
- Click vào **Hỏi đáp AI** (`#qa`) hoặc **Kho tri thức** (`#documents`) trên thanh Sidebar bên trái để chuyển đổi tức thì.
- **Tính năng tương tác:** 
  - Khung Chat có mô phỏng phân rã nghiệp vụ đa đại diện (Multi-Agent Decomposition) trực quan bên bảng phải!
  - Tìm kiếm và lọc tài liệu theo thời gian thực trong bảng *Kho tài liệu*.
  - Modal mô phỏng tải tài liệu lên và tạo phiên hội thoại mới.

---

## 🖥️ 2. Phiên bản Python Desktop GUI Native (`PyQt6`)
*(Dành cho ứng dụng GUI phần mềm máy tính Desktop)*

Khởi chạy giao diện cửa sổ ứng dụng gốc trên hệ điều hành (macOS / Windows / Linux) với QSS (Qt Style Sheets) được tinh chỉnh đúng 100% màu sắc và tỷ lệ:

```bash
python pyqt_app.py
```

- Sử dụng các Widget tùy chỉnh (`StatusBadge`, `CardPanel`, `QStackedWidget`) cho từng thẻ hội thoại, bảng dữ liệu và thẻ thống kê.

---

## 📊 3. Phiên bản Streamlit Web App (`streamlit_app.py`)
*(Dành cho các hệ thống nội bộ AI / RAG nhanh)*

Nếu bạn triển khai hệ thống AI trên nền tảng Streamlit, bạn có thể chạy ngay phiên bản đã tích hợp sẵn Custom CSS của MediaX:

```bash
streamlit run streamlit_app.py
```

---

## 📁 Cấu trúc thư mục

```text
mediax-agent-bank2/
├── web_app.py            # Python HTTP Server chạy trên port 3000
├── templates/
│   └── index.html        # Giao diện HTML5 chuẩn 100% thiết kế
├── static/
│   ├── css/
│   │   └── style.css     # Design system, màu sắc #4A154B, tokens & typography Inter
│   └── js/
│       └── app.js        # Logic tương tác (chuyển tab, chat AI, lọc bảng)
├── pyqt_app.py           # Ứng dụng Desktop GUI bằng PyQt6
├── streamlit_app.py      # Ứng dụng Streamlit với Custom CSS
└── requirements.txt      # Danh sách thư viện Python
```

---
*Phát triển bởi Đội chuyên gia AI Antigravity — MediaX Agent Bank.*
