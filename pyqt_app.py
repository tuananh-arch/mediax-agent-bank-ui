#!/usr/bin/env python3
"""
MediaX Agent Bank — Native Python Desktop Application (PyQt6)
Tái hiện 100% thiết kế giao diện Hỏi đáp AI và Kho tri thức bằng Python GUI.

Cách chạy:
    python pyqt_app.py
"""

import sys
import os
from PyQt6.QtCore import Qt, QSize
from PyQt6.QtGui import QFont, QIcon, QColor, QPalette
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QLabel, QPushButton, QLineEdit, QStackedWidget, QFrame,
    QTableWidget, QTableWidgetItem, QHeaderView, QAbstractItemView,
    QGridLayout, QScrollArea, QSizePolicy
)

# ==============================================================================
# QSS STYLE SHEET (100% PIXEL PERFECT DESIGN TOKENS)
# ==============================================================================
APP_QSS = """
* {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

QMainWindow, #MainContainer {
    background-color: #F8F9FB;
}

/* Sidebar */
#Sidebar {
    background-color: #FFFFFF;
    border-right: 1px solid #E2E8F0;
}

#BrandText {
    font-size: 15px;
    font-weight: 700;
    color: #0F172A;
}

#BrandSub {
    font-size: 11px;
    font-weight: 500;
    color: #64748B;
}

#SidebarToggle {
    background-color: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    color: #64748B;
    font-weight: bold;
    font-size: 11px;
}
#SidebarToggle:hover {
    color: #0F172A;
    border-color: #94A3B8;
}

/* Navigation Buttons */
QPushButton.NavButton {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    color: #64748B;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    padding: 10px 14px;
}
QPushButton.NavButton:hover {
    background-color: #F8FAFC;
    color: #0F172A;
}
QPushButton.NavButton[active="true"] {
    background-color: #F3E8FF;
    color: #4A154B;
    font-weight: 600;
}

/* User Profile Footer */
#UserProfile {
    border-top: 1px solid #F1F5F9;
}
#UserAvatar {
    background-color: #4A154B;
    color: #FFFFFF;
    border-radius: 10px;
    font-weight: bold;
    font-size: 13px;
}
#UserName {
    font-size: 13px;
    font-weight: 600;
    color: #0F172A;
}
#UserRole {
    font-size: 11px;
    color: #64748B;
}

/* Header */
#TopHeader {
    background-color: #FFFFFF;
    border-bottom: 1px solid #E2E8F0;
}
#PageTitle {
    font-size: 16px;
    font-weight: 700;
    color: #0F172A;
}
#PageSubtitle {
    font-size: 12px;
    color: #64748B;
}

/* Panels */
QFrame.CardPanel {
    background-color: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
}

QLabel.PanelHeaderTitle {
    font-size: 11px;
    font-weight: 700;
    color: #64748B;
}

QLabel.BadgeCount {
    background-color: #EFF6FF;
    color: #2563EB;
    font-size: 11px;
    font-weight: 600;
    border-radius: 10px;
    padding: 2px 8px;
}

/* Buttons inside QA Panel */
QPushButton#BtnNewSession {
    background-color: #F8FAFC;
    border: 1px dashed #CBD5E1;
    border-radius: 10px;
    color: #64748B;
    font-size: 13px;
    font-weight: 500;
    padding: 10px;
}
QPushButton#BtnNewSession:hover {
    background-color: #F1F5F9;
    color: #0F172A;
}

QPushButton.SessionItem {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    color: #64748B;
    font-size: 13px;
    text-align: left;
    padding: 10px 12px;
}
QPushButton.SessionItem:hover {
    background-color: #F8FAFC;
    color: #0F172A;
}
QPushButton.SessionItem[active="true"] {
    background-color: #F3E8FF;
    color: #4A154B;
    font-weight: 500;
}

QPushButton#BtnNewSessionPill {
    background-color: #ECFDF5;
    color: #059669;
    border: 1px solid #D1FAE5;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
}
QPushButton#BtnNewSessionPill:hover {
    background-color: #D1FAE5;
}

/* Chat Input */
QFrame#ChatInputContainer {
    background-color: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
}
QLineEdit#ChatInput {
    background-color: transparent;
    border: none;
    font-size: 13px;
    color: #0F172A;
}
QPushButton#BtnSend {
    background-color: #F1F5F9;
    border: none;
    border-radius: 15px;
    color: #64748B;
    font-weight: bold;
}
QPushButton#BtnSend:hover {
    background-color: #4A154B;
    color: #FFFFFF;
}

/* Summary Cards (Documents) */
QFrame.SummaryCard {
    background-color: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
}
QLabel.SummaryValue {
    font-size: 24px;
    font-weight: 700;
    color: #0F172A;
}
QLabel.SummaryLabel {
    font-size: 13px;
    color: #64748B;
}

/* Search Box & Upload Button */
QLineEdit#DocSearchInput {
    background-color: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
    color: #0F172A;
}
QPushButton#BtnUpload {
    background-color: #4A154B;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
}
QPushButton#BtnUpload:hover {
    background-color: #380A38;
}

/* Table */
QTableWidget {
    background-color: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    gridline-color: #F1F5F9;
    selection-background-color: #F8FAFC;
    selection-color: #0F172A;
    font-size: 13px;
}
QHeaderView::section {
    background-color: #F8FAFC;
    color: #64748B;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 16px;
    border: none;
    border-bottom: 1px solid #E2E8F0;
}
"""

class StatusBadge(QLabel):
    """Widget tạo badge trạng thái (Sẵn sàng, Đang xử lý, Hết hiệu lực) giống hệt thiết kế web."""
    def __init__(self, text, badge_type="ready"):
        super().__init__()
        self.setText(f"• {text}")
        self.setAlignment(Qt.AlignmentFlag.AlignCenter)
        if badge_type == "ready":
            self.setStyleSheet("background-color: #ECFDF5; color: #059669; border-radius: 12px; padding: 4px 10px; font-size: 12px; font-weight: 500;")
        elif badge_type == "processing":
            self.setStyleSheet("background-color: #EFF6FF; color: #2563EB; border-radius: 12px; padding: 4px 10px; font-size: 12px; font-weight: 500;")
        else:
            self.setStyleSheet("background-color: #FFFBEB; color: #D97706; border-radius: 12px; padding: 4px 10px; font-size: 12px; font-weight: 500;")


class MediaXAgentBankApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("MediaX Agent Bank — Hỏi đáp & Kho tri thức AI (PyQt6)")
        self.resize(1380, 850)
        self.init_ui()

    def init_ui(self):
        central_widget = QWidget()
        central_widget.setObjectName("MainContainer")
        self.setCentralWidget(central_widget)

        main_layout = QHBoxLayout(central_widget)
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        # 1. LEFT SIDEBAR
        self.sidebar = QFrame()
        self.sidebar.setObjectName("Sidebar")
        self.sidebar.setFixedWidth(250)
        sidebar_layout = QVBoxLayout(self.sidebar)
        sidebar_layout.setContentsMargins(16, 20, 16, 16)

        # Brand Header
        brand_layout = QHBoxLayout()
        logo_box = QLabel("✨")
        logo_box.setFixedSize(36, 36)
        logo_box.setAlignment(Qt.AlignmentFlag.AlignCenter)
        logo_box.setStyleSheet("background-color: #4A154B; color: white; border-radius: 10px; font-size: 18px;")
        
        brand_text_box = QVBoxLayout()
        brand_text_box.setSpacing(1)
        brand_title = QLabel("MediaX")
        brand_title.setObjectName("BrandText")
        brand_sub = QLabel("Agent Bank")
        brand_sub.setObjectName("BrandSub")
        brand_text_box.addWidget(brand_title)
        brand_text_box.addWidget(brand_sub)

        brand_layout.addWidget(logo_box)
        brand_layout.addLayout(brand_text_box)
        brand_layout.addStretch()

        sidebar_layout.addLayout(brand_layout)
        sidebar_layout.addSpacing(24)

        # Nav Buttons
        self.btn_nav_qa = QPushButton("💬  Hỏi đáp AI")
        self.btn_nav_qa.setProperty("class", "NavButton")
        self.btn_nav_qa.setProperty("active", "true")

        self.btn_nav_docs = QPushButton("📚  Kho tri thức")
        self.btn_nav_docs.setProperty("class", "NavButton")
        self.btn_nav_docs.setProperty("active", "false")

        sidebar_layout.addWidget(self.btn_nav_qa)
        sidebar_layout.addWidget(self.btn_nav_docs)
        sidebar_layout.addStretch()

        # User Profile Footer
        user_footer = QFrame()
        user_footer.setObjectName("UserProfile")
        user_layout = QHBoxLayout(user_footer)
        user_layout.setContentsMargins(0, 16, 0, 0)

        avatar = QLabel("TA")
        avatar.setObjectName("UserAvatar")
        avatar.setFixedSize(36, 36)
        avatar.setAlignment(Qt.AlignmentFlag.AlignCenter)

        user_text = QVBoxLayout()
        user_text.setSpacing(1)
        user_name = QLabel("Trần Minh Anh")
        user_name.setObjectName("UserName")
        user_role = QLabel("Chuyên viên tín dụng")
        user_role.setObjectName("UserRole")
        user_text.addWidget(user_name)
        user_text.addWidget(user_role)

        btn_more = QPushButton("•••")
        btn_more.setFixedSize(28, 28)
        btn_more.setStyleSheet("border: none; color: #94A3B8; font-weight: bold;")

        user_layout.addWidget(avatar)
        user_layout.addLayout(user_text)
        user_layout.addStretch()
        user_layout.addWidget(btn_more)

        sidebar_layout.addWidget(user_footer)
        main_layout.addWidget(self.sidebar)

        # 2. MAIN CONTENT AREA (Header + Stacked Pages)
        content_wrapper = QVBoxLayout()
        content_wrapper.setContentsMargins(0, 0, 0, 0)
        content_wrapper.setSpacing(0)

        # Top Header
        self.top_header = QFrame()
        self.top_header.setObjectName("TopHeader")
        self.top_header.setFixedHeight(68)
        header_layout = QVBoxLayout(self.top_header)
        header_layout.setContentsMargins(28, 12, 28, 12)
        header_layout.setSpacing(2)

        self.page_title = QLabel("Hỏi đáp AI")
        self.page_title.setObjectName("PageTitle")
        self.page_subtitle = QLabel("Truy vấn dữ liệu và phân tích nghiệp vụ với sự trợ giúp từ Đội chuyên gia AI")
        self.page_subtitle.setObjectName("PageSubtitle")

        header_layout.addWidget(self.page_title)
        header_layout.addWidget(self.page_subtitle)
        content_wrapper.addWidget(self.top_header)

        # Stacked Pages
        self.stacked_widget = QStackedWidget()
        self.stacked_widget.addWidget(self.create_qa_page())
        self.stacked_widget.addWidget(self.create_docs_page())

        content_wrapper.addWidget(self.stacked_widget)
        main_layout.addLayout(content_wrapper)

        # Connect Navigation
        self.btn_nav_qa.clicked.connect(lambda: self.switch_page(0))
        self.btn_nav_docs.clicked.connect(lambda: self.switch_page(1))

    def switch_page(self, index):
        self.stacked_widget.setCurrentIndex(index)
        if index == 0:
            self.btn_nav_qa.setProperty("active", "true")
            self.btn_nav_docs.setProperty("active", "false")
            self.page_title.setText("Hỏi đáp AI")
            self.page_subtitle.setText("Truy vấn dữ liệu và phân tích nghiệp vụ với sự trợ giúp từ Đội chuyên gia AI")
        else:
            self.btn_nav_qa.setProperty("active", "false")
            self.btn_nav_docs.setProperty("active", "true")
            self.page_title.setText("Kho tài liệu")
            self.page_subtitle.setText("Quản lý dữ liệu và tri thức nghiệp vụ của hệ thống")
        
        self.btn_nav_qa.style().unpolish(self.btn_nav_qa)
        self.btn_nav_qa.style().polish(self.btn_nav_qa)
        self.btn_nav_docs.style().unpolish(self.btn_nav_docs)
        self.btn_nav_docs.style().polish(self.btn_nav_docs)

    def create_qa_page(self):
        page = QWidget()
        layout = QHBoxLayout(page)
        layout.setContentsMargins(24, 20, 24, 20)
        layout.setSpacing(16)

        # Panel 1: PHIÊN HỎI ĐÁP (Left)
        panel_sessions = QFrame()
        panel_sessions.setProperty("class", "CardPanel")
        panel_sessions.setFixedWidth(260)
        p1_layout = QVBoxLayout(panel_sessions)
        p1_layout.setContentsMargins(16, 16, 16, 16)

        p1_header = QHBoxLayout()
        t1 = QLabel("PHIÊN HỎI ĐÁP")
        t1.setProperty("class", "PanelHeaderTitle")
        b1 = QLabel("• 3")
        b1.setProperty("class", "BadgeCount")
        p1_header.addWidget(t1)
        p1_header.addStretch()
        p1_header.addWidget(b1)
        p1_layout.addLayout(p1_header)
        p1_layout.addSpacing(12)

        btn_new = QPushButton("+ Tạo phiên mới")
        btn_new.setObjectName("BtnNewSession")
        p1_layout.addWidget(btn_new)
        p1_layout.addSpacing(10)

        # Session Items
        s1 = QPushButton("💬  Hội thoại mới #3")
        s1.setProperty("class", "SessionItem")
        s1.setProperty("active", "true")
        s2 = QPushButton("💬  Kiểm tra tỷ lệ DTI")
        s2.setProperty("class", "SessionItem")
        s3 = QPushButton("💬  Danh mục hồ sơ còn...")
        s3.setProperty("class", "SessionItem")

        p1_layout.addWidget(s1)
        p1_layout.addWidget(s2)
        p1_layout.addWidget(s3)
        p1_layout.addStretch()

        layout.addWidget(panel_sessions)

        # Panel 2: HỎI ĐÁP VỚI CHUYÊN GIA (Center Chat)
        panel_chat = QFrame()
        panel_chat.setProperty("class", "CardPanel")
        p2_layout = QVBoxLayout(panel_chat)
        p2_layout.setContentsMargins(20, 20, 20, 20)

        p2_header = QHBoxLayout()
        t2 = QLabel("HỎI ĐÁP VỚI CHUYÊN GIA")
        t2.setProperty("class", "PanelHeaderTitle")
        btn_pill = QPushButton("• Phiên mới")
        btn_pill.setObjectName("BtnNewSessionPill")
        p2_header.addWidget(t2)
        p2_header.addStretch()
        p2_header.addWidget(btn_pill)
        p2_layout.addLayout(p2_header)

        # Center Empty State
        empty_box = QVBoxLayout()
        empty_box.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        icon_star = QLabel("✨")
        icon_star.setFont(QFont("Inter", 32))
        icon_star.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        empty_title = QLabel("Bắt đầu cuộc trò chuyện với Đội chuyên gia")
        empty_title.setFont(QFont("Inter", 13, QFont.Weight.Bold))
        empty_title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        empty_title.setStyleSheet("color: #1E293B; margin-top: 8px;")

        empty_sub = QLabel("Nhập câu hỏi tín dụng hoặc sử dụng câu hỏi mẫu bên dưới.")
        empty_sub.setFont(QFont("Inter", 11))
        empty_sub.setAlignment(Qt.AlignmentFlag.AlignCenter)
        empty_sub.setStyleSheet("color: #64748B; margin-top: 4px;")

        empty_box.addStretch()
        empty_box.addWidget(icon_star)
        empty_box.addWidget(empty_title)
        empty_box.addWidget(empty_sub)
        empty_box.addStretch()

        p2_layout.addLayout(empty_box)

        # Bottom Chat Input Area
        input_container = QFrame()
        input_container.setObjectName("ChatInputContainer")
        input_layout = QHBoxLayout(input_container)
        input_layout.setContentsMargins(16, 6, 8, 6)

        self.chat_input = QLineEdit()
        self.chat_input.setObjectName("ChatInput")
        self.chat_input.setPlaceholderText("Nhập câu hỏi nghiệp vụ...")

        btn_send = QPushButton("↑")
        btn_send.setObjectName("BtnSend")
        btn_send.setFixedSize(30, 30)

        input_layout.addWidget(self.chat_input)
        input_layout.addWidget(btn_send)

        p2_layout.addWidget(input_container)

        disclaimer = QLabel("Đội chuyên gia AI có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.")
        disclaimer.setAlignment(Qt.AlignmentFlag.AlignCenter)
        disclaimer.setStyleSheet("color: #94A3B8; font-size: 11px; margin-top: 6px;")
        p2_layout.addWidget(disclaimer)

        layout.addWidget(panel_chat, 1)

        # Panel 3: Sẵn sàng phân rã & điều phối (Right)
        panel_coord = QFrame()
        panel_coord.setProperty("class", "CardPanel")
        panel_coord.setFixedWidth(290)
        p3_layout = QVBoxLayout(panel_coord)
        p3_layout.setContentsMargins(20, 24, 20, 24)
        p3_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        coord_icon = QLabel("🧭")
        coord_icon.setFont(QFont("Inter", 28))
        coord_icon.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        coord_title = QLabel("Sẵn sàng phân rã & điều phối")
        coord_title.setFont(QFont("Inter", 13, QFont.Weight.Bold))
        coord_title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        coord_title.setStyleSheet("color: #1E293B; margin-top: 12px;")

        coord_sub = QLabel("Nhập câu hỏi ở khung chat bên trái. Sơ đồ tương tác và nhật ký phân tích nghiệp vụ của từng chuyên gia con sẽ được cập nhật trực quan tại đây.")
        coord_sub.setFont(QFont("Inter", 11))
        coord_sub.setAlignment(Qt.AlignmentFlag.AlignCenter)
        coord_sub.setWordWrap(True)
        coord_sub.setStyleSheet("color: #64748B; margin-top: 8px; line-height: 1.4;")

        p3_layout.addStretch()
        p3_layout.addWidget(coord_icon)
        p3_layout.addWidget(coord_title)
        p3_layout.addWidget(coord_sub)
        p3_layout.addStretch()

        layout.addWidget(panel_coord)

        return page

    def create_docs_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        layout.setContentsMargins(24, 20, 24, 20)
        layout.setSpacing(16)

        # 1. Top Summary Cards Grid
        grid_cards = QHBoxLayout()
        grid_cards.setSpacing(16)

        cards_data = [
            ("1.284", "Tổng tài liệu"),
            ("1.247", "Sẵn sàng"),
            ("24", "Đang xử lý"),
            ("13", "Cần kiểm tra")
        ]

        for val, label in cards_data:
            card = QFrame()
            card.setProperty("class", "SummaryCard")
            c_layout = QVBoxLayout(card)
            c_layout.setContentsMargins(20, 16, 20, 16)
            
            lbl_val = QLabel(val)
            lbl_val.setProperty("class", "SummaryValue")
            lbl_lbl = QLabel(label)
            lbl_lbl.setProperty("class", "SummaryLabel")
            
            c_layout.addWidget(lbl_val)
            c_layout.addWidget(lbl_lbl)
            grid_cards.addWidget(card)

        layout.addLayout(grid_cards)

        # 2. Search & Upload Bar
        action_bar = QHBoxLayout()
        search_input = QLineEdit()
        search_input.setObjectName("DocSearchInput")
        search_input.setPlaceholderText("🔍  Tìm trong kho tài liệu")
        search_input.setFixedWidth(320)

        btn_upload = QPushButton("↑  Tải tài liệu lên")
        btn_upload.setObjectName("BtnUpload")

        action_bar.addWidget(search_input)
        action_bar.addStretch()
        action_bar.addWidget(btn_upload)
        layout.addLayout(action_bar)

        # 3. Documents Table
        table = QTableWidget(8, 4)
        table.setHorizontalHeaderLabels(["Tên tệp", "Cập nhật", "Dung lượng", "Trạng thái"])
        table.horizontalHeader().setSectionResizeMode(0, QHeaderView.ResizeMode.Stretch)
        table.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeMode.ResizeToContents)
        table.horizontalHeader().setSectionResizeMode(2, QHeaderView.ResizeMode.ResizeToContents)
        table.horizontalHeader().setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)
        table.verticalHeader().setVisible(False)
        table.setSelectionBehavior(QAbstractItemView.SelectionBehavior.SelectRows)
        table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
        table.setShowGrid(False)

        # Table rows data exact match
        doc_rows = [
            ("Quy trình cấp tín dụng 2026.pdf", "15/07/2026", "4,8 MB", "Sẵn sàng", "ready", "📕"),
            ("Chính sách chấm điểm tín dụng.pdf", "08/07/2026", "3,6 MB", "Sẵn sàng", "ready", "📕"),
            ("Báo cáo CIC khách hàng.pdf", "14/07/2026", "1,7 MB", "Sẵn sàng", "ready", "📕"),
            ("Quy định tài sản bảo đảm.pdf", "12/07/2026", "2,1 MB", "Sẵn sàng", "ready", "📕"),
            ("Danh mục kiểm tra KYC.pdf", "10/07/2026", "860 KB", "Sẵn sàng", "ready", "📕"),
            ("Danh mục hồ sơ vay doanh nghiệp.docx", "09/07/2026", "540 KB", "Đang xử lý", "processing", "📘"),
            ("Biểu phí tín dụng doanh nghiệp.pdf", "01/07/2026", "1,2 MB", "Sẵn sàng", "ready", "📕"),
            ("Chính sách tín dụng 2024.pdf", "22/12/2024", "5,4 MB", "Hết hiệu lực", "expired", "📕")
        ]

        for row_idx, (fname, date_str, size_str, status_text, status_type, icon_char) in enumerate(doc_rows):
            # Tên tệp
            item_name = QTableWidgetItem(f"{icon_char}   {fname}")
            item_name.setFont(QFont("Inter", 10, QFont.Weight.Medium))
            table.setItem(row_idx, 0, item_name)

            # Cập nhật
            item_date = QTableWidgetItem(date_str)
            item_date.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            table.setItem(row_idx, 1, item_date)

            # Dung lượng
            item_size = QTableWidgetItem(size_str)
            item_size.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            table.setItem(row_idx, 2, item_size)

            # Trạng thái (Custom Badge Widget)
            badge_widget = QWidget()
            badge_layout = QHBoxLayout(badge_widget)
            badge_layout.setContentsMargins(8, 6, 8, 6)
            badge = StatusBadge(status_text, status_type)
            badge_layout.addWidget(badge)
            table.setCellWidget(row_idx, 3, badge_widget)

            table.setRowHeight(row_idx, 52)

        layout.addWidget(table)

        # 4. Table Footer / Pagination
        footer_layout = QHBoxLayout()
        footer_text = QLabel("Hiển thị 1-8 trong tổng số 8 tài liệu")
        footer_text.setStyleSheet("color: #64748B; font-size: 12px;")

        footer_size = QLabel("Số dòng: [ 10 ⌄ ]")
        footer_size.setStyleSheet("color: #64748B; font-size: 12px;")

        footer_layout.addWidget(footer_text)
        footer_layout.addStretch()
        footer_layout.addWidget(footer_size)
        layout.addLayout(footer_layout)

        return page


def main():
    app = QApplication(sys.argv)
    app.setStyleSheet(APP_QSS)
    window = MediaXAgentBankApp()
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
