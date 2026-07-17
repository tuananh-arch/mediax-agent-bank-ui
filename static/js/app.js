/**
 * MediaX Agent Bank - 100% Exact Interactive Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation / Tab Switching between #qa and #documents
    const navQa = document.getElementById('nav-qa');
    const navDocs = document.getElementById('nav-documents');
    const qaView = document.getElementById('qa-view');
    const docsView = document.getElementById('documents-view');
    const pageTitleText = document.getElementById('page-title-text');
    const pageSubtitleText = document.getElementById('page-subtitle-text');

    function switchTab(target) {
        if (target === 'qa' || target === '#qa') {
            navQa.classList.add('active');
            navDocs.classList.remove('active');
            qaView.classList.add('active');
            docsView.classList.remove('active');
            pageTitleText.textContent = 'Hỏi đáp AI';
            pageSubtitleText.textContent = 'Truy vấn dữ liệu và phân tích nghiệp vụ với sự trợ giúp từ Đội chuyên gia AI';
            history.pushState(null, '', '#qa');
        } else if (target === 'documents' || target === '#documents') {
            navDocs.classList.add('active');
            navQa.classList.remove('active');
            docsView.classList.add('active');
            qaView.classList.remove('active');
            pageTitleText.textContent = 'Kho tài liệu';
            pageSubtitleText.textContent = 'Quản lý dữ liệu và tri thức nghiệp vụ của hệ thống';
            history.pushState(null, '', '#documents');
        }
    }

    // Check initial hash
    if (window.location.hash === '#documents') {
        switchTab('documents');
    } else {
        switchTab('qa');
    }

    navQa.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('qa');
    });

    navDocs.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('documents');
    });

    window.addEventListener('hashchange', () => {
        switchTab(window.location.hash || 'qa');
    });

    // 2. Chat Interaction & Multi-Agent Decomposition Simulation
    const chatInput = document.getElementById('chat-input');
    const btnSend = document.getElementById('btn-send');
    const chatMessagesArea = document.getElementById('chat-messages-area');
    const emptyState = document.getElementById('empty-chat-state');
    const coordEmptyState = document.getElementById('coord-empty-state');
    const coordAgentsList = document.getElementById('coord-agents-list');

    // Sample question clicks
    document.querySelectorAll('.sample-q-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            chatInput.value = text;
            sendMessage();
        });
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Hide empty state if first message
        if (emptyState && emptyState.style.display !== 'none') {
            emptyState.style.display = 'none';
        }
        if (coordEmptyState && coordEmptyState.style.display !== 'none') {
            coordEmptyState.style.display = 'none';
        }

        // Add user bubble
        const userRow = document.createElement('div');
        userRow.className = 'message-row user';
        userRow.innerHTML = `<div class="message-bubble">${text}</div>`;
        chatMessagesArea.appendChild(userRow);
        chatInput.value = '';
        chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;

        // Trigger right panel multi-agent coordination steps
        addCoordinationNode('Trưởng Đội AI Điều phối', 'Đang phân tích ý định & phân rã nghiệp vụ...', 'processing');

        setTimeout(() => {
            updateCoordinationNode(0, 'Trưởng Đội AI Điều phối', 'Đã phân rã 2 tác vụ con', 'ready');
            addCoordinationNode('Chuyên viên Tra cứu Tài liệu', `Tra cứu quy trình & chính sách tín dụng liên quan đến "${text.substring(0, 20)}..."`, 'processing');
        }, 800);

        setTimeout(() => {
            updateCoordinationNode(1, 'Chuyên viên Tra cứu Tài liệu', 'Trích xuất 3 tài liệu khớp (Độ tin cậy 98.4%)', 'ready');
            addCoordinationNode('Chuyên gia Phân tích Rủi ro & DTI', 'Tổng hợp số liệu chuẩn theo quy định 2026', 'processing');
        }, 1800);

        setTimeout(() => {
            updateCoordinationNode(2, 'Chuyên gia Phân tích Rủi ro & DTI', 'Hoàn tất đánh giá nghiệp vụ', 'ready');
            
            // Add AI response bubble
            const aiRow = document.createElement('div');
            aiRow.className = 'message-row ai';
            aiRow.innerHTML = `
                <div class="message-bubble">
                    <strong>[Đội chuyên gia AI MediaX phản hồi]</strong><br><br>
                    Dựa trên <em>Quy trình cấp tín dụng 2026.pdf</em> và <em>Chính sách chấm điểm tín dụng.pdf</em> trong Kho tri thức:<br><br>
                    • <strong>Tỷ lệ DTI tối đa:</strong> Đối với khoản vay mua nhà/bất động sản, tỷ lệ DTI áp dụng tiêu chuẩn là <strong><= 50%</strong> (hoặc tối đa 60% đối với nhóm khách hàng hạng A).<br>
                    • <strong>Quy trình KYC & Thẩm định:</strong> Hệ thống tự động đối chiếu CIC trực tuyến trong 30 giây và xác minh thu nhập qua hóa đơn điện tử hoặc sao kê tài khoản ngân hàng.<br><br>
                    <em>Bạn có muốn tôi xuất bảng tính chi tiết cho hồ sơ tín dụng cụ thể không?</em>
                </div>
            `;
            chatMessagesArea.appendChild(aiRow);
            chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
        }, 2800);
    }

    function addCoordinationNode(role, task, status) {
        const node = document.createElement('div');
        node.className = 'agent-node-card';
        node.innerHTML = `
            <div class="agent-node-header">
                <span>🤖 ${role}</span>
                <span class="agent-status-badge ${status === 'ready' ? 'ready' : 'processing'}">${status === 'ready' ? '• Hoàn thành' : '• Đang xử lý'}</span>
            </div>
            <div style="color: #64748b; font-size: 11.5px;">${task}</div>
        `;
        coordAgentsList.appendChild(node);
    }

    function updateCoordinationNode(index, role, task, status) {
        const nodes = coordAgentsList.querySelectorAll('.agent-node-card');
        if (nodes[index]) {
            nodes[index].innerHTML = `
                <div class="agent-node-header">
                    <span>🤖 ${role}</span>
                    <span class="agent-status-badge ${status === 'ready' ? 'ready' : 'processing'}">${status === 'ready' ? '• Sẵn sàng' : '• Đang xử lý'}</span>
                </div>
                <div style="color: #64748b; font-size: 11.5px;">${task}</div>
            `;
        }
    }

    if (btnSend && chatInput) {
        btnSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // 3. New Session Button
    const btnNewSession = document.getElementById('btn-new-session');
    const btnNewSessionPill = document.getElementById('btn-new-session-pill');
    const sessionList = document.getElementById('session-list');

    function createNewSession() {
        const count = sessionList.children.length + 1;
        
        // Deactivate existing
        sessionList.querySelectorAll('.session-item').forEach(item => item.classList.remove('active'));
        
        // Create new session item
        const newItem = document.createElement('a');
        newItem.href = '#';
        newItem.className = 'session-item active';
        newItem.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Hội thoại mới #${count}</span>
        `;
        sessionList.insertBefore(newItem, sessionList.firstChild);

        // Update badge
        const badgeCount = document.querySelector('.badge-count');
        if (badgeCount) badgeCount.textContent = `• ${sessionList.children.length}`;

        // Reset chat area
        chatMessagesArea.innerHTML = '';
        if (emptyState) {
            emptyState.style.display = 'block';
            chatMessagesArea.appendChild(emptyState);
        }
        if (coordEmptyState) {
            coordEmptyState.style.display = 'flex';
        }
        coordAgentsList.innerHTML = '';
    }

    if (btnNewSession) btnNewSession.addEventListener('click', createNewSession);
    if (btnNewSessionPill) btnNewSessionPill.addEventListener('click', createNewSession);

    // 4. Document Table Search Filtering
    const searchInput = document.getElementById('doc-search-input');
    const tableRows = document.querySelectorAll('#docs-table-body tr');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            let visibleCount = 0;
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(term)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            const footerCount = document.getElementById('footer-doc-count');
            if (footerCount) {
                footerCount.textContent = `Hiển thị 1-${visibleCount} trong tổng số ${tableRows.length} tài liệu`;
            }
        });
    }

    // 5. Upload Modal Simulation
    const btnUpload = document.getElementById('btn-upload');
    const uploadModal = document.getElementById('upload-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');

    if (btnUpload && uploadModal) {
        btnUpload.addEventListener('click', () => uploadModal.classList.add('active'));
        if (btnCloseModal) btnCloseModal.addEventListener('click', () => uploadModal.classList.remove('active'));
        uploadModal.addEventListener('click', (e) => {
            if (e.target === uploadModal) uploadModal.classList.remove('active');
        });
    }
});
