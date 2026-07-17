#!/usr/bin/env python3
"""
MediaX Agent Bank — Streamlit Application
Giao diện Hỏi đáp AI và Kho tri thức trên nền tảng Streamlit với Custom CSS.

Cách chạy:
    streamlit run streamlit_app.py
"""

import streamlit as st
import pandas as pd

st.set_page_config(
    page_title="MediaX Agent Bank",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS cho theme MediaX Agent Bank
st.markdown("""
<style>
    /* Main colors and typography */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    .main {
        background-color: #F8F9FB;
    }
    
    /* Sidebar styling */
    section[data-testid="stSidebar"] {
        background-color: #FFFFFF !important;
        border-right: 1px solid #E2E8F0;
    }
    
    .mediax-logo-box {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0 20px 0;
        border-bottom: 1px solid #F1F5F9;
        margin-bottom: 16px;
    }
    
    .mediax-icon {
        background-color: #4A154B;
        color: white;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
    }
    
    .mediax-title {
        font-size: 16px;
        font-weight: 700;
        color: #0F172A;
        margin: 0;
        line-height: 1.2;
    }
    
    .mediax-sub {
        font-size: 12px;
        color: #64748B;
        margin: 0;
    }
    
    /* Summary Cards */
    .summary-card {
        background: white;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 18px;
        text-align: left;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    
    .summary-val {
        font-size: 24px;
        font-weight: 700;
        color: #0F172A;
    }
    
    .summary-lbl {
        font-size: 13px;
        color: #64748B;
    }
</style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.markdown("""
    <div class="mediax-logo-box">
        <div class="mediax-icon">✨</div>
        <div>
            <p class="mediax-title">MediaX</p>
            <p class="mediax-sub">Agent Bank</p>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    page_choice = st.radio(
        "Chuyển hướng",
        ["💬 Hỏi đáp AI (#qa)", "📚 Kho tri thức (#documents)"],
        label_visibility="collapsed"
    )
    
    st.divider()
    st.write("👤 **Trần Minh Anh**")
    st.caption("Chuyên viên tín dụng | TA")

# Page 1: Hỏi đáp AI
if "Hỏi đáp AI" in page_choice:
    st.title("Hỏi đáp AI")
    st.caption("Truy vấn dữ liệu và phân tích nghiệp vụ với sự trợ giúp từ Đội chuyên gia AI")
    st.divider()
    
    col1, col2, col3 = st.columns([1.2, 2.5, 1.3])
    
    with col1:
        st.subheader("PHIÊN HỎI ĐÁP")
        st.button("+ Tạo phiên mới", use_container_width=True)
        st.info("💬 **Hội thoại mới #3**")
        st.write("💬 Kiểm tra tỷ lệ DTI")
        st.write("💬 Danh mục hồ sơ còn...")
        
    with col2:
        st.subheader("HỎI ĐÁP VỚI CHUYÊN GIA")
        
        if "messages" not in st.session_state:
            st.session_state["messages"] = []
            
        if not st.session_state["messages"]:
            st.markdown("""
            <div style="text-align: center; padding: 40px 20px; background: white; border-radius: 14px; border: 1px solid #E2E8F0;">
                <h2 style="color: #94A3B8;">✨</h2>
                <h4 style="color: #1E293B;">Bắt đầu cuộc trò chuyện với Đội chuyên gia</h4>
                <p style="color: #64748B; font-size: 13px;">Nhập câu hỏi tín dụng hoặc sử dụng câu hỏi mẫu bên dưới.</p>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button("Tỷ lệ DTI cho vay mua nhà quy định 2026 là bao nhiêu?"):
                st.session_state["messages"].append({"role": "user", "content": "Tỷ lệ DTI cho vay mua nhà quy định 2026 là bao nhiêu?"})
                st.session_state["messages"].append({"role": "assistant", "content": "Theo **Quy trình cấp tín dụng 2026.pdf**, tỷ lệ DTI tối đa tiêu chuẩn cho khoản vay mua nhà là **<= 50%** (hoặc 60% đối với nhóm khách hàng hạng A)."})
                st.rerun()
                
        for msg in st.session_state["messages"]:
            with st.chat_message(msg["role"]):
                st.markdown(msg["content"])
                
        user_input = st.chat_input("Nhập câu hỏi nghiệp vụ...")
        if user_input:
            st.session_state["messages"].append({"role": "user", "content": user_input})
            st.session_state["messages"].append({"role": "assistant", "content": f"Đội chuyên gia AI đang tra cứu trong Kho tri thức để phân tích câu hỏi: **{user_input}**..."})
            st.rerun()
            
    with col3:
        st.subheader("SẴN SÀNG PHÂN RÃ")
        st.markdown("""
        <div style="background: white; padding: 20px; border-radius: 14px; border: 1px solid #E2E8F0; text-align: center;">
            <h3 style="color: #64748B;">🧭</h3>
            <h5 style="color: #1E293B; margin-top: 10px;">Điều phối tự động</h5>
            <p style="color: #64748B; font-size: 12px; line-height: 1.5;">Nhập câu hỏi ở khung chat bên trái. Sơ đồ tương tác và nhật ký phân tích nghiệp vụ của từng chuyên gia con sẽ cập nhật tại đây.</p>
        </div>
        """, unsafe_allow_html=True)

# Page 2: Kho tri thức (#documents)
else:
    st.title("Kho tài liệu")
    st.caption("Quản lý dữ liệu và tri thức nghiệp vụ của hệ thống")
    st.divider()
    
    # 4 Summary cards
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        st.markdown('<div class="summary-card"><div class="summary-val">1.284</div><div class="summary-lbl">Tổng tài liệu</div></div>', unsafe_allow_html=True)
    with c2:
        st.markdown('<div class="summary-card"><div class="summary-val">1.247</div><div class="summary-lbl">Sẵn sàng</div></div>', unsafe_allow_html=True)
    with c3:
        st.markdown('<div class="summary-card"><div class="summary-val">24</div><div class="summary-lbl">Đang xử lý</div></div>', unsafe_allow_html=True)
    with c4:
        st.markdown('<div class="summary-card"><div class="summary-val">13</div><div class="summary-lbl">Cần kiểm tra</div></div>', unsafe_allow_html=True)
        
    st.write("")
    scol1, scol2 = st.columns([3, 1])
    with scol1:
        search_query = st.text_input("Tìm trong kho tài liệu", placeholder="🔍 Nhập từ khóa...")
    with scol2:
        st.write("")
        st.button("↑ Tải tài liệu lên", type="primary", use_container_width=True)
        
    # Table data exact match
    data = [
        {"Tên tệp": "📕 Quy trình cấp tín dụng 2026.pdf", "Cập nhật": "15/07/2026", "Dung lượng": "4,8 MB", "Trạng thái": "🟢 • Sẵn sàng"},
        {"Tên tệp": "📕 Chính sách chấm điểm tín dụng.pdf", "Cập nhật": "08/07/2026", "Dung lượng": "3,6 MB", "Trạng thái": "🟢 • Sẵn sàng"},
        {"Tên tệp": "📕 Báo cáo CIC khách hàng.pdf", "Cập nhật": "14/07/2026", "Dung lượng": "1,7 MB", "Trạng thái": "🟢 • Sẵn sàng"},
        {"Tên tệp": "📕 Quy định tài sản bảo đảm.pdf", "Cập nhật": "12/07/2026", "Dung lượng": "2,1 MB", "Trạng thái": "🟢 • Sẵn sàng"},
        {"Tên tệp": "📕 Danh mục kiểm tra KYC.pdf", "Cập nhật": "10/07/2026", "Dung lượng": "860 KB", "Trạng thái": "🟢 • Sẵn sàng"},
        {"Tên tệp": "📘 Danh mục hồ sơ vay doanh nghiệp.docx", "Cập nhật": "09/07/2026", "Dung lượng": "540 KB", "Trạng thái": "🔵 • Đang xử lý"},
        {"Tên tệp": "📕 Biểu phí tín dụng doanh nghiệp.pdf", "Cập nhật": "01/07/2026", "Dung lượng": "1,2 MB", "Trạng thái": "🟢 • Sẵn sàng"},
        {"Tên tệp": "📕 Chính sách tín dụng 2024.pdf", "Cập nhật": "22/12/2024", "Dung lượng": "5,4 MB", "Trạng thái": "🟠 • Hết hiệu lực"}
    ]
    
    df = pd.DataFrame(data)
    if search_query:
        df = df[df["Tên tệp"].str.contains(search_query, case=False)]
        
    st.table(df)
    st.caption(f"Hiển thị 1-{len(df)} trong tổng số {len(df)} tài liệu | Số dòng: 10")
