/* Career Compass AI — Assessment Page */

const selectedSkills = new Set();
const selectedInterests = new Set();

function toggleSkillTag(el, skill) {
  if (selectedSkills.has(skill)) {
    selectedSkills.delete(skill);
    el.classList.remove('selected');
  } else {
    selectedSkills.add(skill);
    el.classList.add('selected');
  }
}

function toggleInterest(el, interest) {
  if (selectedInterests.has(interest)) {
    selectedInterests.delete(interest);
    el.classList.remove('selected');
  } else {
    selectedInterests.add(interest);
    el.classList.add('selected');
  }
}

function initAssessmentPage() {
  mountLayout('assessment.html');

  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer) {
    skillsContainer.innerHTML = renderSkillTags(SKILL_OPTIONS, { selectable: true });
  }

  const interestsContainer = document.getElementById('interestsContainer');
  if (interestsContainer) {
    interestsContainer.innerHTML = CAREER_INTERESTS.map(interest =>
      `<button type="button" class="interest-chip" onclick="toggleInterest(this, '${interest.replace(/'/g, "\\'")}')">${interest}</button>`
    ).join('');
  }

  const saved = loadAssessmentFromSession();
  if (saved) {
    document.getElementById('cgpa').value = saved.cgpa || '';
    document.getElementById('projects').value = saved.projects || '';
    document.getElementById('certifications').value = saved.certifications || '';

    (saved.skills || []).forEach(skill => {
      selectedSkills.add(skill);
      document.querySelector(`.skill-tag[data-skill="${CSS.escape(skill)}"]`)?.classList.add('selected');
    });

    (saved.interests || []).forEach(interest => {
      selectedInterests.add(interest);
      [...document.querySelectorAll('.interest-chip')].forEach(btn => {
        if (btn.textContent === interest) btn.classList.add('selected');
      });
    });
  }

  document.getElementById('assessmentForm')?.addEventListener('submit', handleAssessmentSubmit);
}

async function handleAssessmentSubmit(e) {
  e.preventDefault();

  const formData = {
    skills: [...selectedSkills],
    cgpa: document.getElementById('cgpa').value,
    projects: document.getElementById('projects').value,
    certifications: document.getElementById('certifications').value,
    interests: [...selectedInterests]
  };

  if (formData.skills.length === 0) {
    alert('Please select at least one skill.');
    return;
  }

  if (formData.interests.length === 0) {
    alert('Please select at least one career interest.');
    return;
  }

  saveAssessmentToSession(formData);

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';

  try {
    const results = await fetchRecommendation(formData);
    saveResultsToSession(results);
  } catch (err) {
    console.warn('Backend unavailable, using demo data:', err.message);
    const demoResults = getDemoResults(formData);
    saveResultsToSession(demoResults);
  }

  window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', initAssessmentPage);
