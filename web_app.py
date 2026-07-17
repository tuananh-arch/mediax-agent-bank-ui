#!/usr/bin/env python3
"""
MediaX Agent Bank — Python Web Application Server (Port 3000)
Chạy trên localhost:3000 theo đúng 100% thiết kế giao diện Hỏi đáp AI (#qa) và Kho tài liệu (#documents).

Cách chạy:
    python web_app.py
    # Sau đó mở trình duyệt tại: http://localhost:3000
"""

import os
import sys
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Đảm bảo đúng MIME types cho CSS và JS
mimetypes.init()
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("image/svg+xml", ".svg")

class MediaXHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        # Trả về index.html khi truy cập đường dẫn gốc hoặc các đường dẫn SPA (#qa, #documents)
        if self.path == "/" or self.path.startswith("/#") or self.path in ["/qa", "/documents"]:
            self.path = "/templates/index.html"
        return super().do_GET()

    def log_message(self, format, *args):
        # Ghi log gọn gàng với màu sắc
        print(f"\033[96m[MediaX Web Server]\033[0m {self.client_address[0]} - - {format%args}")

def run_server(port=PORT):
    server_address = ('', port)
    httpd = HTTPServer(server_address, MediaXHTTPRequestHandler)
    print("=" * 65)
    print(f"\033[95m[MediaX Agent Bank AI] Web Application Server khởi động...\033[0m")
    print(f"👉 Giao diện Hỏi đáp AI:    \033[92mhttp://localhost:{port}/#qa\033[0m")
    print(f"👉 Giao diện Kho tri thức:  \033[92mhttp://localhost:{port}/#documents\033[0m")
    print("=" * 65)
    print("Nhấn Ctrl+C để dừng server.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[MediaX Web Server] Đã dừng server.")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
