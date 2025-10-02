const roadmaps = [
  // 1. MERN Stack
  {
    topic: 'MERN Stack Developer',
    category: 'Full-Stack',
    description: 'Master MongoDB, Express.js, React, and Node.js for full-stack web development.',
    difficulty: 'Intermediate',
    steps: [
      { title: '1. Web Foundations', description: 'Master semantic HTML, modern CSS (Flexbox, Grid), and advanced JavaScript (ES6+).', resources: [{ name: 'MDN Web Docs', url: 'https://developer.mozilla.org/' }] },
      { title: '2. React & Tailwind CSS', description: 'Learn component-based UI with React hooks and utility-first styling.', resources: [{ name: 'React Docs', url: 'https://react.dev/' }] },
      { title: '3. Node.js & Express.js', description: 'Build server-side REST APIs with the Express framework.', resources: [{ name: 'Express.js Guide', url: 'https://expressjs.com/' }] },
      { title: '4. MongoDB & Mongoose', description: 'Learn NoSQL concepts and use Mongoose for data modeling.', resources: [{ name: 'MongoDB University', url: 'https://learn.mongodb.com/' }] }
    ]
  },
  // 2. Frontend Developer
  {
    topic: 'Frontend Developer',
    category: 'Frontend',
    description: 'A complete guide to becoming a modern frontend developer.',
    difficulty: 'Beginner',
    steps: [
      { title: '1. Core Web Fundamentals', description: 'The essential building blocks of the web (HTML, CSS, JS).', resources: [{ name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/' }] },
      { title: '2. Version Control (Git)', description: 'Learn how to manage your code and collaborate with others.', resources: [{ name: 'GitHub Skills', url: 'https://skills.github.com/' }] },
      { title: '3. Pick a Framework (React)', description: 'Learn the most popular library for building user interfaces.', resources: [{ name: 'React Docs', url: 'https://react.dev/' }] },
      { title: '4. Working with APIs', description: 'Understand how to fetch and display data from external sources.', resources: [{ name: 'Public APIs List', url: 'https://github.com/public-apis/public-apis' }] }
    ]
  },
  // 3. Python with Django
  {
    topic: 'Full-Stack Python (Django)',
    category: 'Backend',
    description: 'Learn to build powerful web applications using Python and the Django framework.',
    difficulty: 'Intermediate',
    steps: [
      { title: '1. Python Fundamentals', description: 'Master Python\'s core concepts, including data structures and OOP.', resources: [{ name: 'Official Python Docs', url: 'https://docs.python.org/3/' }] },
      { title: '2. Learn Django', description: 'Understand the MVT architecture, URL routing, and the Django ORM.', resources: [{ name: 'Django Project Docs', url: 'https://www.djangoproject.com/start/' }] },
      { title: '3. Django REST Framework', description: 'Build robust REST APIs to serve data to a front-end application.', resources: [{ name: 'DRF Tutorial', url: 'https://www.django-rest-framework.org/tutorial/quickstart/' }] },
      { title: '4. Authentication & Permissions', description: 'Learn to secure your Django application with user accounts and role-based access.', resources: [] },
    ]
  },
  // 4. Mobile App Development
  {
    topic: 'Mobile App Development (React Native)',
    category: 'Mobile',
    description: 'Use your React skills to build cross-platform mobile apps for iOS and Android.',
    difficulty: 'Intermediate',
    steps: [
      { title: '1. React Fundamentals', description: 'Ensure a strong understanding of React components, state, and hooks.', resources: [{ name: 'React Docs', url: 'https://react.dev/' }] },
      { title: '2. React Native & Expo', description: 'Learn about native components, styling, and setting up your environment with Expo.', resources: [{ name: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started' }] },
      { title: '3. Navigation', description: 'Master screen navigation with React Navigation to build multi-screen apps.', resources: [{ name: 'React Navigation', url: 'https://reactnavigation.org/' }] },
      { title: '4. Working with Native APIs', description: 'Learn how to access device features like the camera, GPS, and push notifications.', resources: [{ name: 'Expo Docs', url: 'https://docs.expo.dev/' }] }
    ]
  },
  // 5. DevOps Engineer
  {
    topic: 'DevOps Engineer',
    category: 'DevOps',
    description: 'Learn the tools and methodologies to automate the software development lifecycle.',
    difficulty: 'Advanced',
    steps: [
      { title: '1. Learn a Language (Python/Go)', description: 'Essential for scripting and automation.', resources: [{ name: 'Learn Python', url: 'https://www.python.org/' }] },
      { title: '2. Containerization (Docker)', description: 'Learn to package applications into containers.', resources: [{ name: 'Docker Docs', url: 'https://docs.docker.com/' }] },
      { title: '3. Orchestration (Kubernetes)', description: 'Learn to manage and scale containerized applications.', resources: [{ name: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/' }] },
      { title: '4. CI/CD (GitHub Actions)', description: 'Automate your build, test, and deployment pipelines.', resources: [{ name: 'GitHub Actions', url: 'https://github.com/features/actions' }] }
    ]
  },
  // 6. Data Science
  {
    topic: 'Data Science',
    category: 'Data Science',
    description: 'Learn the skills for data analysis, visualization, and machine learning.',
    difficulty: 'Intermediate',
    steps: [
      { title: '1. Master Python & SQL', description: 'Learn Python (Pandas, NumPy) and SQL for database queries.', resources: [{ name: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/' }] },
      { title: '2. Mathematics & Statistics', description: 'Understand the core concepts of linear algebra, calculus, and statistics.', resources: [{ name: 'Khan Academy', url: 'https://www.khanacademy.org/math' }] },
      { title: '3. Data Visualization', description: 'Learn to create insightful charts and plots using libraries like Matplotlib and Seaborn.', resources: [] },
      { title: '4. Machine Learning Fundamentals', description: 'Study algorithms for regression and classification with Scikit-learn.', resources: [{ name: 'Scikit-learn', url: 'https://scikit-learn.org/' }] },
    ]
  },
  // 7. Cybersecurity Analyst
  {
    topic: 'Cybersecurity Analyst',
    category: 'Security',
    description: 'Learn to protect systems and networks from cyber threats.',
    difficulty: 'Intermediate',
    steps: [
      { title: '1. Networking Fundamentals', description: 'Master TCP/IP, DNS, routing, and switching.', resources: [] },
      { title: '2. Operating Systems (Linux & Windows)', description: 'Learn system administration, permissions, and command-line tools.', resources: [] },
      { title: '3. Security Principles & Models', description: 'Understand the CIA triad, risk assessment, and threat modeling.', resources: [] },
      { title: '4. Ethical Hacking & Penetration Testing', description: 'Learn to think like an attacker by using tools like Metasploit and Nmap.', resources: [] },
    ]
  },
];
module.exports = roadmaps;