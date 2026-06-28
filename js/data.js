/* Career Compass AI — Static Data */

const CAREERS = [
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    salary: '₹13 – ₹16 LPA',
    industry_demand: 'High',
    entry_barrier: 'High',
    work_style: 'Analytical, Research-driven',
    recommended_for: 'Strong in math, statistics, and Python',
    description: 'Extract insights from complex datasets using statistics, machine learning, and programming to drive data-informed business decisions.',
    icon: '📊'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    salary: '₹6 – ₹8 LPA',
    industry_demand: 'High',
    entry_barrier: 'Medium',
    work_style: 'Detail-oriented, Collaborative',
    recommended_for: 'Excel lovers, SQL enthusiasts, storytellers with data',
    description: 'Transform raw data into actionable reports and dashboards that help organizations understand trends and make better decisions.',
    icon: '📈'
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    salary: '₹10 – ₹18 LPA',
    industry_demand: 'Very High',
    entry_barrier: 'High',
    work_style: 'Experimental, Technical',
    recommended_for: 'Deep learners with strong math and coding skills',
    description: 'Design, train, and deploy machine learning models and AI systems that solve real-world problems at scale.',
    icon: '🤖'
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    salary: '₹6 – ₹12 LPA',
    industry_demand: 'High',
    entry_barrier: 'Medium',
    work_style: 'Creative, User-focused',
    recommended_for: 'Visual thinkers who enjoy building interfaces',
    description: 'Build responsive, accessible web interfaces using HTML, CSS, JavaScript, and modern frameworks like React or Vue.',
    icon: '🎨'
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    salary: '₹7 – ₹14 LPA',
    industry_demand: 'High',
    entry_barrier: 'Medium',
    work_style: 'Logical, System-oriented',
    recommended_for: 'Problem solvers who prefer server-side logic',
    description: 'Develop server-side applications, APIs, and databases that power web and mobile applications behind the scenes.',
    icon: '⚙️'
  },
  {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    salary: '₹6 – ₹16 LPA',
    industry_demand: 'Very High',
    entry_barrier: 'High',
    work_style: 'Versatile, End-to-end',
    recommended_for: 'Generalists who enjoy both frontend and backend',
    description: 'Work across the entire application stack — from user interfaces to databases — building complete software solutions.',
    icon: '🔗'
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    salary: '₹6 – ₹10 LPA',
    industry_demand: 'Very High',
    entry_barrier: 'High',
    work_style: 'Vigilant, Investigative',
    recommended_for: 'Detail-oriented minds with a security mindset',
    description: 'Protect organizations by monitoring networks, detecting threats, and implementing security measures against cyber attacks.',
    icon: '🔒'
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    salary: '₹8 – ₹18 LPA',
    industry_demand: 'Very High',
    entry_barrier: 'High',
    work_style: 'Infrastructure-focused, Scalable',
    recommended_for: 'Systems thinkers interested in AWS, Azure, or GCP',
    description: 'Design, deploy, and manage cloud infrastructure and services to ensure scalable, reliable, and secure applications.',
    icon: '☁️'
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    salary: '₹8 – ₹22 LPA',
    industry_demand: 'High',
    entry_barrier: 'High',
    work_style: 'Automation-driven, Collaborative',
    recommended_for: 'Bridge-builders between dev and operations teams',
    description: 'Automate deployment pipelines, manage infrastructure as code, and ensure smooth continuous integration and delivery.',
    icon: '🔄'
  },
  {
    id: 'mobile-app-developer',
    name: 'Mobile App Developer',
    salary: '₹7 – ₹9 LPA',
    industry_demand: 'High',
    entry_barrier: 'Medium',
    work_style: 'Product-focused, Platform-aware',
    recommended_for: 'Creators who enjoy iOS, Android, or cross-platform apps',
    description: 'Build native or cross-platform mobile applications for iOS and Android using Swift, Kotlin, Flutter, or React Native.',
    icon: '📱'
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    salary: '₹4 – ₹12 LPA',
    industry_demand: 'High',
    entry_barrier: 'Medium',
    work_style: 'Creative, Empathetic',
    recommended_for: 'Visual designers with user empathy and prototyping skills',
    description: 'Design intuitive user experiences and visually appealing interfaces through research, wireframing, and prototyping.',
    icon: '✨'
  },
  {
    id: 'qa-engineer',
    name: 'QA Engineer',
    salary: '₹3.5 – ₹8 LPA',
    industry_demand: 'Medium',
    entry_barrier: 'Low',
    work_style: 'Methodical, Quality-focused',
    recommended_for: 'Detail-oriented testers who catch what others miss',
    description: 'Ensure software quality through manual and automated testing, identifying bugs and verifying product requirements.',
    icon: '✅'
  }
];

const SKILL_OPTIONS = [
  'Python', 'SQL', 'Machine Learning', 'Deep Learning', 'Statistics',
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'TypeScript',
  'Java', 'C++', 'Go', 'Rust', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'Linux', 'Git', 'CI/CD',
  'Figma', 'Adobe XD', 'UI Design', 'UX Research',
  'Power BI', 'Tableau', 'Excel', 'Data Visualization',
  'Flutter', 'React Native', 'Swift', 'Kotlin',
  'Cybersecurity', 'Networking', 'Penetration Testing',
  'Selenium', 'Jest', 'Manual Testing', 'Automation Testing',
  'MongoDB', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL'
];

const CAREER_INTERESTS = CAREERS.map(c => c.name);

function getCareerById(id) {
  return CAREERS.find(c => c.id === id || c.name === id);
}

function getDemandBadgeClass(demand) {
  const d = (demand || '').toLowerCase();
  if (d.includes('very high') || d === 'high') return 'badge-high';
  if (d.includes('medium')) return 'badge-medium';
  return 'badge-low';
}

function getBarrierBadgeClass(barrier) {
  const b = (barrier || '').toLowerCase();
  if (b === 'high') return 'badge-low';
  if (b === 'medium') return 'badge-medium';
  return 'badge-high';
}

function getReadinessLevelClass(level) {
  const map = {
    'Excellent': 'level-excellent',
    'Job Ready': 'level-job-ready',
    'Developing': 'level-developing',
    'Beginner': 'level-beginner',
    'Needs Improvement': 'level-needs-improvement'
  };
  return map[level] || 'level-developing';
}
