/**
 * MediaX Agent Bank — app.js
 * Full state machine: runStep 0→4, agent trace, source overlay
 */
'use strict';

// ============================================================
// SVG Icons (inline)
// ============================================================
const ICON = {
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  sparkles24: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  loader: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
  compass: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  alert: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  file: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  msg: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  graph: `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  fileUp: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  doc: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
};

// ============================================================
// State
// ============================================================
let state = {
  sessions: [
    { id: 1, name: 'Hội thoại mới #3', active: false },
    { id: 2, name: 'Kiểm tra tỷ lệ DTI', active: true  },
    { id: 3, name: 'Danh mục hồ sơ còn...', active: false },
  ],
  nextSessionId: 4,
  messages: [],
  isProcessing: false,
  runStep: 0,
  activeSourceFile: null,
};

// Source data store
const SOURCES = {
  'Chính sách chấm điểm tín dụng.pdf': {
    category: 'Chính sách tín dụng',
    folder: '/Quy trình & Chính sách/2026',
    updated: '08/07/2026',
    excerpt: 'Tỷ lệ nợ trên thu nhập (DTI) tối đa cho phép đối với khoản vay có tài sản bảo đảm là bất động sản là 40% tổng thu nhập ròng hàng tháng. Đối với nhóm khách hàng ưu tiên (CIC ≥ 700), ngưỡng DTI được mở rộng lên 45%.',
    agents: ['Chuyên gia Tín dụng', 'RAG / Điều phối']
  },
  'Quy trình cấp tín dụng 2026.pdf': {
    category: 'Quy trình nghiệp vụ',
    folder: '/Quy trình & Chính sách/2026',
    updated: '15/07/2026',
    excerpt: 'Quy trình phê duyệt tín dụng áp dụng mô hình 4 mắt, bao gồm: (1) Thẩm định ban đầu, (2) Kiểm tra KYC/AML tự động, (3) Phân tích tài chính và tài sản bảo đảm, (4) Phê duyệt cuối cùng bởi Hội đồng tín dụng.',
    agents: ['Chuyên gia Tín dụng', 'Chuyên gia Tuân thủ', 'Chuyên gia Vận hành']
  }
};

// Agent trace cards definition
const AGENT_CARDS = [
  {
    minStep: 1,
    from: 'RAG / Điều phối', to: 'Chuyên gia Tín dụng',
    time: '02:14:03',
    msg: 'Hãy đánh giá khả năng cấp khoản vay 2,5 tỷ dựa trên hồ sơ khách hàng, CIC và tỷ lệ DTI.',
    status: 'done', statusText: 'Đã chuyển yêu cầu',
  },
  {
    minStep: 2,
    from: 'Chuyên gia Tín dụng', to: 'Chuyên gia Tuân thủ',
    time: '02:14:05',
    msg: 'Kiểm tra trạng thái KYC/AML và các điều kiện hạn chế cấp tín dụng.',
    status: 'done', statusText: 'Hoàn thành',
  },
  {
    minStep: 2,
    from: 'Chuyên gia Tín dụng', to: 'Chuyên gia Vận hành',
    time: '02:14:05',
    msg: 'Kiểm tra tính đầy đủ của hồ sơ và đối chiếu báo cáo tài chính.',
    status: 'done', statusText: 'Hoàn thành',
  },
  {
    minStep: 3,
    from: 'Chuyên gia Tuân thủ', to: 'Chuyên gia Tín dụng',
    time: '02:14:07',
    msg: 'Không phát hiện cảnh báo KYC/AML. Khách hàng đáp ứng điều kiện tuân thủ.',
    status: 'done', statusText: 'Đã phản hồi',
  },
  {
    minStep: 3,
    from: 'Chuyên gia Vận hành', to: 'Chuyên gia Tín dụng',
    time: '02:14:08',
    msg: 'Hồ sơ cơ bản đầy đủ. Cần bổ sung sao kê tài khoản trong 3 tháng gần nhất.',
    status: 'warning', statusText: 'Cần bổ sung',
  },
  {
    minStep: 4,
    from: 'Chuyên gia Tín dụng', to: 'RAG / Điều phối',
    time: '02:14:10',
    msg: 'CIC 742 và DTI 38,5% nằm trong ngưỡng cho phép. Đề xuất phê duyệt có điều kiện.',
    status: 'done', statusText: 'Đã tổng hợp',
  },
];

const AI_ANSWER_TEXT = `Tỷ lệ DTI 38,5% nằm trong ngưỡng cho phép (trần 40%), tuy nhiên đang ở mức cảnh báo cần theo dõi dòng tiền.<br><br>
Dựa trên hồ sơ khách hàng với điểm CIC 742 và mức DTI hiện tại, <strong>Đội chuyên gia AI MediaX</strong> đề xuất:<br>
• Phê duyệt có điều kiện với hạn mức tối đa <strong>2,5 tỷ VNĐ</strong><br>
• Yêu cầu bổ sung sao kê tài khoản 3 tháng gần nhất<br>
• Áp dụng lãi suất ưu tiên nhóm A2 (11,5%/năm)`;

// ============================================================
// Render helpers
// ============================================================
function getBadgeCount(label) {
  const len = state.sessions.length;
  return `<span class="badge badge-info">&bull; ${len}</span>`;
}

function getStatusIcon(status) {
  if (status === 'done')    return `<span class="spinning">${ICON.loader}</span>`;
  if (status === 'pending') return `<span class="spinning">${ICON.loader}</span>`;
  if (status === 'warning') return ICON.alert;
  return '';
}
function getStatusEl(card) {
  const cls = card.status === 'done' ? 'status-done'
            : card.status === 'pending' ? 'status-pending'
            : 'status-warning';
  const icon = card.status === 'done'    ? ICON.check
             : card.status === 'pending' ? `<span class="spinning">${ICON.loader}</span>`
             : ICON.alert;
  return `<span class="agent-card-status ${cls}">${icon} ${card.statusText}</span>`;
}

function traceCountLabel(step) {
  const map = { 1: '1 lượt', 2: '3 lượt', 3: '5 lượt', 4: '6 lượt' };
  return map[step] || '';
}

// ============================================================
// Render Sessions Panel
// ============================================================
function renderSessions() {
  const list  = document.getElementById('session-list');
  const badge = document.getElementById('session-badge');
  if (!list) return;

  badge.innerHTML = `<span class="badge badge-info">&bull; ${state.sessions.length}</span>`;
  list.innerHTML = '';
  state.sessions.forEach(s => {
    const div = document.createElement('div');
    div.className = 'session-item' + (s.active ? ' active' : '');
    div.dataset.id = s.id;
    div.innerHTML = `
      <span class="session-item-icon">${ICON.msg}</span>
      <span class="session-item-name" title="${s.name}">${s.name}</span>
      <button class="btn-delete-session" data-id="${s.id}" title="Xoá phiên">
        ${ICON.trash}
      </button>
    `;
    div.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete-session')) return;
      activateSession(s.id);
    });
    div.querySelector('.btn-delete-session').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteSession(s.id);
    });
    list.appendChild(div);
  });
}

function activateSession(id) {
  state.sessions = state.sessions.map(s => ({ ...s, active: s.id === id }));
  renderSessions();
}

function deleteSession(id) {
  state.sessions = state.sessions.filter(s => s.id !== id);
  if (!state.sessions.find(s => s.active) && state.sessions.length > 0) {
    state.sessions[0].active = true;
  }
  renderSessions();
}

function createNewSession() {
  const newS = { id: state.nextSessionId++, name: `Hội thoại mới #${state.sessions.length + 1}`, active: true };
  state.sessions = state.sessions.map(s => ({ ...s, active: false }));
  state.sessions.unshift(newS);
  state.messages = [];
  state.runStep = 0;
  state.isProcessing = false;
  renderSessions();
  renderChat();
  renderTrace();
}

// ============================================================
// Render Chat Panel
// ============================================================
function renderChatHeader() {
  const badge = document.getElementById('chat-badge');
  if (!badge) return;
  if (state.messages.length === 0) {
    badge.innerHTML = `<span class="badge badge-success">&bull; Phiên mới</span>`;
  } else {
    const cnt = state.messages.filter(m => m.kind === 'user').length;
    badge.innerHTML = `<span class="badge badge-neutral">${cnt} lượt</span>`;
  }
}

function renderChat() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  renderChatHeader();

  container.innerHTML = '';

  // Empty state
  if (state.messages.length === 0 && !state.isProcessing) {
    container.innerHTML = `
      <div class="chat-empty">
        <div class="chat-empty-icon">${ICON.sparkles24}</div>
        <h3 class="chat-empty-title">Bắt đầu cuộc trò chuyện với Đội chuyên gia</h3>
        <p class="chat-empty-desc">Nhập câu hỏi tín dụng hoặc sử dụng câu hỏi mẫu bên dưới.</p>
        <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
          <button class="qa-source-link sample-q" data-q="Tỷ lệ DTI nợ DTI 38,5% có vượt ngưỡng không?">Tỷ lệ nợ DTI 38,5% có vượt ngưỡng không?</button>
          <button class="qa-source-link sample-q" data-q="Điều kiện KYC/AML cho khoản vay doanh nghiệp SME?">Điều kiện KYC/AML cho khoản vay doanh nghiệp SME?</button>
          <button class="qa-source-link sample-q" data-q="Quy trình thẩm định tài sản bảo đảm là bất động sản?">Quy trình thẩm định tài sản bảo đảm là bất động sản?</button>
        </div>
      </div>
    `;
    container.querySelectorAll('.sample-q').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('composer-input').value = btn.dataset.q;
        sendMessage(btn.dataset.q);
      });
    });
    return;
  }

  // Messages
  state.messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'fade-slide-up';
    if (msg.kind === 'user') {
      div.innerHTML = `
        <div class="msg-row">
          <div class="msg-avatar user">TA</div>
          <div class="msg-body">
            <div class="msg-author">Bạn</div>
            <div class="msg-bubble-user">${msg.text}</div>
          </div>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="msg-row">
          <div class="msg-avatar ai">${ICON.sparkles}</div>
          <div class="msg-body">
            <div class="msg-author">Đội chuyên gia AI</div>
            <div class="msg-bubble-ai">${msg.text}</div>
            <div class="msg-meta">
              <span class="msg-meta-reliability">${ICON.shield}&nbsp;Độ tin cậy ${msg.reliability}%</span>
              <span class="msg-meta-agents">${ICON.users}&nbsp;${msg.agents} chuyên gia tham gia</span>
            </div>
            <div class="msg-sources">
              <div class="msg-sources-label">Nguồn trích dẫn</div>
              <div class="msg-sources-links">
                ${msg.sources.map(f => `<button class="qa-source-link" data-file="${f}">${ICON.file}&nbsp;${f}</button>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      div.querySelectorAll('.qa-source-link').forEach(btn => {
        btn.addEventListener('click', () => openSourceOverlay(btn.dataset.file));
      });
    }
    container.appendChild(div);
  });

  // Loading
  if (state.isProcessing) {
    const loadDiv = document.createElement('div');
    loadDiv.id = 'loading-msg';
    loadDiv.className = 'msg-loading fade-slide-up';
    loadDiv.innerHTML = `
      <div class="msg-avatar ai"><span class="spinning">${ICON.loader}</span></div>
      <div class="loading-body">
        <div class="loading-title">
          <span class="spinning" style="color:var(--purple)">${ICON.loader}</span>
          Đội chuyên gia AI đang phân tích dữ liệu...
        </div>
        <div class="skeleton-line" style="width:100%;"></div>
        <div class="skeleton-line"></div>
      </div>
    `;
    container.appendChild(loadDiv);
  }

  // Scroll to bottom
  setTimeout(() => { container.scrollTop = container.scrollHeight; }, 0);
}

// ============================================================
// Render Trace Panel
// ============================================================
function renderTrace() {
  const emptyEl = document.getElementById('trace-empty');
  const listEl  = document.getElementById('trace-list');
  const headerBadge = document.getElementById('trace-badge');
  if (!emptyEl || !listEl) return;

  if (state.runStep === 0) {
    emptyEl.style.display = 'flex';
    listEl.style.display  = 'none';
    if (headerBadge) headerBadge.innerHTML = '';
    return;
  }

  emptyEl.style.display = 'none';
  listEl.style.display  = 'flex';
  if (headerBadge) {
    headerBadge.innerHTML = `<span class="badge badge-neutral">${traceCountLabel(state.runStep)}</span>`;
  }

  // Only append new cards (avoid re-rendering all)
  const existingCount = listEl.children.length;
  const cardsToShow = AGENT_CARDS.filter(c => state.runStep >= c.minStep);
  cardsToShow.slice(existingCount).forEach(card => {
    const div = document.createElement('div');
    div.className = 'agent-card';
    div.style.animationDelay = '0ms';
    div.innerHTML = `
      <div class="agent-card-route">
        <div class="agent-card-agents">
          <span>${card.from}</span>
          <span class="arrow">→</span>
          <span>${card.to}</span>
        </div>
        <span class="agent-card-time">${card.time}</span>
      </div>
      <div class="agent-card-msg">${card.msg}</div>
      ${getStatusEl(card)}
    `;
    listEl.appendChild(div);
    setTimeout(() => { listEl.scrollTop = listEl.scrollHeight; }, 50);
  });
}

// ============================================================
// Send Message — State Machine
// ============================================================
function sendMessage(text) {
  text = (text || document.getElementById('composer-input').value).trim();
  if (!text || state.isProcessing) return;

  document.getElementById('composer-input').value = '';
  autoResizeTextarea(document.getElementById('composer-input'));

  // Add user message
  state.messages.push({ kind: 'user', text });
  state.isProcessing = true;
  state.runStep = 1;

  renderChat();
  renderChatHeader();
  renderTrace();
  updateComposerState();

  // Step 2 → 2500ms
  setTimeout(() => {
    state.runStep = 2;
    renderTrace();
  }, 2500);

  // Step 3 → 5500ms
  setTimeout(() => {
    state.runStep = 3;
    renderTrace();
  }, 5500);

  // Step 4 + answer → 8000ms
  setTimeout(() => {
    state.runStep = 4;
    state.isProcessing = false;
    state.messages.push({
      kind: 'answer',
      text: AI_ANSWER_TEXT,
      reliability: 81,
      agents: 2,
      sources: ['Chính sách chấm điểm tín dụng.pdf', 'Quy trình cấp tín dụng 2026.pdf'],
    });
    renderTrace();
    renderChat();
    renderChatHeader();
    updateComposerState();
  }, 8000);
}

function updateComposerState() {
  const input = document.getElementById('composer-input');
  const btn   = document.getElementById('btn-send');
  if (!input || !btn) return;
  input.disabled = state.isProcessing;
  btn.disabled   = state.isProcessing;
}

// ============================================================
// Auto-resize textarea
// ============================================================
function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// ============================================================
// Source Overlay
// ============================================================
function openSourceOverlay(filename) {
  const data = SOURCES[filename];
  if (!data) return;
  state.activeSourceFile = filename;

  document.getElementById('source-header-filename').textContent = filename;
  document.getElementById('source-meta-category').textContent  = data.category;
  document.getElementById('source-meta-folder').textContent    = data.folder;
  document.getElementById('source-meta-updated').textContent   = data.updated;
  document.getElementById('source-excerpt').innerHTML          = data.excerpt;

  const agentsList = document.getElementById('source-agents-list');
  agentsList.innerHTML = data.agents.map(a =>
    `<div class="source-agent-item">${ICON.checkCircle}<span>${a}</span></div>`
  ).join('');

  document.getElementById('overlay-backdrop').classList.add('open');
  document.getElementById('source-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSourceOverlay() {
  document.getElementById('overlay-backdrop').classList.remove('open');
  document.getElementById('source-panel').classList.remove('open');
  document.body.style.overflow = '';
  state.activeSourceFile = null;
}

// ============================================================
// Page Navigation (QA ↔ Documents)
// ============================================================
function switchPage(page) {
  const navQa   = document.getElementById('nav-qa');
  const navDocs = document.getElementById('nav-docs');
  const qaView  = document.getElementById('qa-view');
  const docsView= document.getElementById('documents-view');
  const pageTitle    = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  if (page === 'qa') {
    navQa.classList.add('active'); navDocs.classList.remove('active');
    qaView.classList.add('active'); docsView.classList.remove('active');
    pageTitle.textContent    = 'Hỏi đáp AI';
    pageSubtitle.textContent = 'Truy vấn dữ liệu và phân tích nghiệp vụ với sự trợ giúp từ Đội chuyên gia AI';
    history.pushState(null, '', '#qa');
  } else {
    navDocs.classList.add('active'); navQa.classList.remove('active');
    docsView.classList.add('active'); qaView.classList.remove('active');
    pageTitle.textContent    = 'Kho tài liệu';
    pageSubtitle.textContent = 'Quản lý dữ liệu và tri thức nghiệp vụ của hệ thống';
    history.pushState(null, '', '#documents');
  }
}

// ============================================================
// Bootstrap
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Initial render
  renderSessions();
  renderChat();
  renderTrace();
  updateComposerState();

  // Initial page from hash
  const hash = window.location.hash;
  switchPage(hash === '#documents' ? 'documents' : 'qa');

  // Nav
  document.getElementById('nav-qa')  .addEventListener('click', () => switchPage('qa'));
  document.getElementById('nav-docs').addEventListener('click', () => switchPage('documents'));

  // New session
  document.getElementById('btn-new-session').addEventListener('click', createNewSession);

  // Composer: Enter to send, Shift+Enter for newline
  const composerInput = document.getElementById('composer-input');
  composerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  composerInput.addEventListener('input', () => autoResizeTextarea(composerInput));

  // Send button
  document.getElementById('btn-send').addEventListener('click', () => sendMessage());

  // Source overlay: backdrop click to close
  document.getElementById('overlay-backdrop').addEventListener('click', closeSourceOverlay);
  document.getElementById('btn-close-source').addEventListener('click', closeSourceOverlay);

  // Doc search filter
  const docSearch = document.getElementById('doc-search');
  if (docSearch) {
    docSearch.addEventListener('input', () => {
      const q = docSearch.value.toLowerCase();
      document.querySelectorAll('#doc-tbody tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
});
