/* Career Compass AI — Reusable UI Components */

function renderNavbar(activePage) {
  const pages = [
  { href: 'index.html', label: 'Home' },
  { href: 'assessment.html', label: 'Assessment' },
  { href: 'results.html', label: 'Results' },
  { href: 'explorer.html', label: 'Explore Careers' }
];

  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a></li>`
  ).join('');

  return `
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="navbar-brand">
          <span class="logo-icon">🧭</span>
          Career Compass AI
        </a>
        <button class="navbar-toggle" aria-label="Toggle menu" onclick="toggleMobileNav()">☰</button>
        <ul class="navbar-links" id="navLinks">${links}</ul>
      </div>
    </nav>`;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="navbar-brand">
              <span class="logo-icon">🧭</span>
              Career Compass AI
            </div>
            <p>AI-powered career guidance helping students discover the most suitable technology career paths based on skills, experience, and interests.</p>
          </div>
          <div class="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="assessment.html">Career Assessment</a></li>
              <li><a href="resume.html">Resume Upload</a></li>
              <li><a href="results.html">Results Dashboard</a></li>
              <li><a href="explorer.html">Career Explorer</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Features</h4>
            <ul>
              <li><a href="index.html#features">Career Matching</a></li>
              <li><a href="index.html#features">Skill Gap Analysis</a></li>
              <li><a href="index.html#features">Learning Roadmap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>`;
}

function mountLayout(activePage) {
  const navSlot = document.getElementById('navbar-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = renderNavbar(activePage);
  if (footerSlot) footerSlot.innerHTML = renderFooter();
}

function toggleMobileNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
}

function renderCareerCard(career, options = {}) {
  const { onClick = '', compact = false } = options;
  const clickAttr = onClick ? `onclick="${onClick}"` : '';
  const demandClass = getDemandBadgeClass(career.industry_demand);

  return `
    <div class="card career-card" ${clickAttr} data-career-id="${career.id}">
      <div class="career-card-header">
        <span class="career-card-name">${career.icon || ''} ${career.name}</span>
        <span class="career-card-badge ${demandClass}">${career.industry_demand} Demand</span>
      </div>
      <div class="career-meta">
        <span class="meta-tag">💰 ${career.salary}</span>
        <span class="meta-tag">🚧 ${career.entry_barrier} Barrier</span>
        <span class="meta-tag">💼 ${career.work_style}</span>
      </div>
      ${compact ? '' : `<p class="career-card-desc">${career.description}</p>`}
      <div class="career-card-footer">
        <span>👤 ${career.recommended_for}</span>
        ${onClick ? '<span>View details →</span>' : ''}
      </div>
    </div>`;
}

function renderCareerInsightCard(insight, title) {
  const data = insight || {};
  return `
    <div class="card">
      ${title ? `<h3 class="card-title">${title}</h3>` : ''}
      <div class="insight-grid">
        <div class="insight-item">
          <div class="label">Salary</div>
          <div class="value">${data.salary || 'N/A'}</div>
        </div>
        <div class="insight-item">
          <div class="label">Industry Demand</div>
          <div class="value">${data.industry_demand || 'N/A'}</div>
        </div>
        <div class="insight-item">
          <div class="label">Entry Barrier</div>
          <div class="value">${data.entry_barrier || 'N/A'}</div>
        </div>
        <div class="insight-item">
          <div class="label">Work Style</div>
          <div class="value">${data.work_style || 'N/A'}</div>
        </div>
        <div class="insight-item">
          <div class="label">Recommended For</div>
          <div class="value">${data.recommended_for || 'N/A'}</div>
        </div>
      </div>
      ${data.description ? `<div class="insight-description">${data.description}</div>` : ''}
    </div>`;
}

function renderProgressBar(label, value, delay = 0) {
  const pct = Math.min(100, Math.max(0, value));
  return `
    <div class="progress-bar-wrapper">
      <div class="progress-bar-header">
        <span class="progress-bar-label">${label}</span>
        <span class="progress-bar-value">${pct}%</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" data-value="${pct}" style="width: 0; transition-delay: ${delay}ms"></div>
      </div>
    </div>`;
}

function animateProgressBars(container) {
  requestAnimationFrame(() => {
    container.querySelectorAll('.progress-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.value + '%';
    });
  });
}

function renderReadinessScoreCard(score, level) {
  const circumference = 2 * Math.PI * 75;
  const offset = circumference - (score / 100) * circumference;
  const levelClass = getReadinessLevelClass(level);

  return `
    <div class="card readiness-card">
      <div class="readiness-ring">
        <svg viewBox="0 0 180 180">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1"/>
              <stop offset="100%" stop-color="#a855f7"/>
            </linearGradient>
          </defs>
          <circle class="bg" cx="90" cy="90" r="75"/>
          <circle class="fill" cx="90" cy="90" r="75"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"/>
        </svg>
        <div class="readiness-score-text">
          <span class="score">${score}</span>
          <span class="of">out of 100</span>
        </div>
      </div>
      <div class="readiness-level ${levelClass}">${level}</div>
      <p style="color: var(--text-secondary); font-size: 0.9rem;">Career Readiness Score</p>
    </div>`;
}

function renderCertificationCard(cert) {
  const priorityClass = `cert-priority-${(cert.priority || 'medium').toLowerCase()}`;
  return `
    <div class="card cert-card">
      <div class="cert-name">${cert.name}</div>
      <div class="cert-provider">${cert.provider}</div>
      <div class="cert-meta">
        <span class="cert-badge cert-level">${cert.level}</span>
        <span class="cert-badge ${priorityClass}">${cert.priority} Priority</span>
      </div>
    </div>`;
}

function renderRoadmapTimeline(steps) {
  if (!steps || !steps.length) {
    return '<div class="empty-state">No learning path available.</div>';
  }

  let html = '<div class="roadmap-timeline">';
  steps.forEach((step, i) => {
    const label = typeof step === 'string' ? step : step.title || step.name;
    html += `
      <div class="roadmap-step">
        <div class="roadmap-node${i === 0 ? ' active' : ''}">${label}</div>
      </div>`;
    if (i < steps.length - 1) {
      html += '<div class="roadmap-connector"></div>';
    }
  });
  html += '</div>';
  return html;
}

function renderSkillTags(skills, options = {}) {
  const { selectable = false, selected = [], missing = false } = options;
  const selectedSet = new Set(selected);

  return `
    <div class="skill-tags">
      ${skills.map(skill => {
        const isSelected = selectedSet.has(skill);
        const classes = ['skill-tag'];
        if (selectable && isSelected) classes.push('selected');
        if (missing) classes.push('missing');
        const click = selectable ? `onclick="toggleSkillTag(this, '${skill.replace(/'/g, "\\'")}')"` : '';
        return `<span class="${classes.join(' ')}" data-skill="${skill}" ${click}>${skill}</span>`;
      }).join('')}
    </div>`;
}

function renderModal(title, content) {
  return `
    <div class="modal-overlay" id="careerModal" onclick="closeModalOnOverlay(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="closeCareerModal()" aria-label="Close">&times;</button>
        </div>
        ${content}
      </div>
    </div>`;
}

function openCareerModal(career) {
  let modal = document.getElementById('careerModal');
  if (!modal) {
    document.body.insertAdjacentHTML('beforeend', renderModal('', ''));
    modal = document.getElementById('careerModal');
  }

  const modalInner = modal.querySelector('.modal');
  modalInner.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">${career.icon || ''} ${career.name}</h2>
      <button class="modal-close" onclick="closeCareerModal()" aria-label="Close">&times;</button>
    </div>
    ${renderCareerInsightCard(career, '')}
    <div style="margin-top: 1.5rem; text-align: center;">
      <a href="assessment.html" class="btn btn-primary">Take Assessment for This Career</a>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCareerModal() {
  const modal = document.getElementById('careerModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalOnOverlay(event) {
  if (event.target.id === 'careerModal') closeCareerModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCareerModal();
});
