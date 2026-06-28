/* Career Compass AI — API Integration */

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API error: ${response.status}`);
  }

  return response.json();
}

function buildAssessmentPayload(formData) {
  return {
    skills: formData.skills || [],
    cgpa: parseFloat(formData.cgpa) || 0,
    number_of_projects: parseInt(formData.projects, 10) || 0,
    number_of_certifications: parseInt(formData.certifications, 10) || 0,
    career_interests: formData.interests || []
  };
}

async function fetchRecommendation(formData) {
  const payload = buildAssessmentPayload(formData);
  return apiRequest('/recommendation', payload);
}

async function fetchCareerMatch(formData) {
  const payload = buildAssessmentPayload(formData);
  return apiRequest('/career-match', payload);
}

async function fetchCareerReadiness(formData) {
  const payload = buildAssessmentPayload(formData);
  return apiRequest('/career-readiness', payload);
}

async function fetchSkillGap(formData) {
  const payload = buildAssessmentPayload(formData);
  return apiRequest('/skill-gap', payload);
}

async function fetchCareerInfo(careerName) {
  return apiRequest('/career-info', { career: careerName });
}

function saveAssessmentToSession(formData) {
  sessionStorage.setItem('careerAssessment', JSON.stringify(formData));
}

function loadAssessmentFromSession() {
  const raw = sessionStorage.getItem('careerAssessment');
  return raw ? JSON.parse(raw) : null;
}

function saveResultsToSession(results) {
  sessionStorage.setItem('careerResults', JSON.stringify(results));
}

function loadResultsFromSession() {
  const raw = sessionStorage.getItem('careerResults');
  return raw ? JSON.parse(raw) : null;
}

/* Demo fallback when backend is unavailable */
function getDemoResults(formData) {
  const skills = formData?.skills || [];
  const hasML = skills.some(s => /machine learning|python|statistics/i.test(s));
  const hasWeb = skills.some(s => /react|javascript|html|css/i.test(s));
  const hasCloud = skills.some(s => /aws|docker|kubernetes/i.test(s));

  let topMatches = [
    { career: 'Data Analyst', match_percentage: 72 },
    { career: 'Frontend Developer', match_percentage: 65 },
    { career: 'QA Engineer', match_percentage: 58 }
  ];

  if (hasML) {
    topMatches = [
      { career: 'Data Scientist', match_percentage: 82 },
      { career: 'AI/ML Engineer', match_percentage: 74 },
      { career: 'Data Analyst', match_percentage: 68 }
    ];
  } else if (hasWeb) {
    topMatches = [
      { career: 'Frontend Developer', match_percentage: 85 },
      { career: 'Full Stack Developer', match_percentage: 76 },
      { career: 'UI/UX Designer', match_percentage: 62 }
    ];
  } else if (hasCloud) {
    topMatches = [
      { career: 'Cloud Engineer', match_percentage: 80 },
      { career: 'DevOps Engineer', match_percentage: 75 },
      { career: 'Backend Developer', match_percentage: 68 }
    ];
  }

  const cgpa = parseFloat(formData?.cgpa) || 7;
  const projects = parseInt(formData?.projects, 10) || 2;
  const certs = parseInt(formData?.certifications, 10) || 1;
  const score = Math.min(95, Math.round(45 + cgpa * 4 + projects * 3 + certs * 2 + skills.length * 1.5));

  let readiness_level = 'Needs Improvement';
  if (score >= 90) readiness_level = 'Excellent';
  else if (score >= 75) readiness_level = 'Job Ready';
  else if (score >= 60) readiness_level = 'Developing';
  else if (score >= 45) readiness_level = 'Beginner';

  const topCareer = topMatches[0].career;
  const careerData = typeof getCareerById === 'function'
    ? getCareerById(topCareer)
    : null;

  return {
    career_readiness_score: score,
    readiness_level,
    top_career_matches: topMatches,
    missing_skills: ['Statistics', 'Machine Learning', 'Data Visualization'].filter(
      s => !skills.some(sk => sk.toLowerCase().includes(s.toLowerCase().split(' ')[0]))
    ),
    recommended_certifications: [
      { name: 'Google Data Analytics Certificate', provider: 'Google / Coursera', level: 'Beginner', priority: 'High' },
      { name: 'AWS Cloud Practitioner', provider: 'Amazon Web Services', level: 'Foundational', priority: 'Medium' },
      { name: 'IBM Data Science Professional', provider: 'IBM / Coursera', level: 'Intermediate', priority: 'Medium' }
    ],
    recommended_learning_path: [
      'Python Fundamentals',
      'Statistics',
      'SQL',
      'Machine Learning',
      'Projects',
      'Portfolio'
    ],
    career_insight: careerData || {
      salary: '$95,000 – $140,000',
      industry_demand: 'High',
      entry_barrier: 'High',
      work_style: 'Analytical, Research-driven',
      recommended_for: 'Strong in math, statistics, and Python',
      description: 'Extract insights from complex datasets using statistics, machine learning, and programming.'
    }
  };
}
