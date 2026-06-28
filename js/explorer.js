/* Career Compass AI — Career Explorer */

let activeFilter = 'all';
let searchQuery = '';

function initExplorerPage() {
  mountLayout('explorer.html');
  renderExplorerCareers();
  setupExplorerControls();
}

function setupExplorerControls() {
  const searchInput = document.getElementById('careerSearch');
  searchInput?.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderExplorerCareers();
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderExplorerCareers();
    });
  });
}

function filterCareers() {
  return CAREERS.filter(career => {
    const matchesSearch = !searchQuery ||
      career.name.toLowerCase().includes(searchQuery) ||
      career.description.toLowerCase().includes(searchQuery) ||
      career.recommended_for.toLowerCase().includes(searchQuery) ||
      career.work_style.toLowerCase().includes(searchQuery);

    let matchesFilter = true;
    if (activeFilter === 'high-demand') {
      matchesFilter = career.industry_demand.toLowerCase().includes('high');
    } else if (activeFilter === 'low-barrier') {
      matchesFilter = career.entry_barrier.toLowerCase() === 'low' || career.entry_barrier.toLowerCase() === 'medium';
    } else if (activeFilter === 'high-salary') {
      const nums = career.salary.match(/\d[\d,]*/g) || [];
      const values = nums.map(n => parseInt(n.replace(/,/g, ''), 10));
      const maxSalary = Math.max(...values, 0);
      matchesFilter = maxSalary >= 120000;
    }

    return matchesSearch && matchesFilter;
  });
}

function renderExplorerCareers() {
  const grid = document.getElementById('explorerGrid');
  const filtered = filterCareers();

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state card" style="grid-column: 1 / -1;">No careers match your search. Try different filters.</div>';
    return;
  }

  grid.innerHTML = filtered.map(career =>
    renderCareerCard(career, { onClick: `openCareerModalById('${career.id}')` })
  ).join('');
}

function openCareerModalById(id) {
  const career = getCareerById(id);
  if (career) openCareerModal(career);
}

document.addEventListener('DOMContentLoaded', initExplorerPage);
