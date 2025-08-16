document.addEventListener('DOMContentLoaded', function () {
  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Dynamic Text Animation
  const dynamicText = document.querySelector('.dynamic-text');
  const words = ["Machine Learning Enthusiast", "AI Developer", "Competitive Programmer", "Web Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentText;

    if (!isDeleting && charIndex < currentWord.length) {
      // If not deleting and still has letters to add, do the following
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      // If deleting and still has letters to remove, do the following
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      // If word is complete, then
      isDeleting = !isDeleting;
      wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
      setTimeout(typeEffect, 1200);
    }
  }

  typeEffect();

  // Project Modal
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.close');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const project = card.dataset.project;

      let title, description;

      switch (project) {
        case 'weather-prediction':
          title = 'Weather Prediction of Dhaka Using Machine Learning';
          description = 'Developed a machine learning model to predict the weather in Dhaka using historical data.';
          break;
        case 'crop-recommendation':
          title = 'Crop Recommendation System';
          description = 'Analyzing environment for recommending crops';
          break;
        case 'e-learning':
          title = '15 Minute Course';
          description = 'An e-learning platform.';
          break;
        case 'portfolio-website':
          title = 'Portfolio Website';
          description = 'This website itself.';
          break;
      }

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  // Skills Dynamic Content
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    const skill = card.dataset.skill;
    let description = '';
    let skillList = [];

    switch (skill) {
      case 'programming-languages':
        description = 'Proficient in a variety of programming languages.';
        skillList = ['Python', 'C', 'C++'];
        break;
      case 'software-tools':
        description = 'Experienced with a wide range of software and tools.';
        skillList = ['OpenGL', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Microsoft Office', 'Google Workspace', 'Visual Studio Code', 'Google Colab', 'Anaconda', 'JupyterLab'];
        break;
      case 'machine-learning':
        description = 'Knowledgeable in various machine learning techniques and tools.';
        skillList = ['NumPy', 'Pandas', 'Scikit-Learn', 'Supervised Learning', 'Unsupervised Learning', 'Data Visualization', 'OpenCV', 'TensorFlow', 'Keras'];
        break;
      case 'computer-networks':
        description = 'Expertise in computer networks and related technologies.';
        skillList = ['CCNA', 'Routing & Switching', 'Network Security', 'Infrastructure Configuration'];
        break;
      case 'database-management':
        description = 'Skilled in database management systems.';
        skillList = ['MySQL'];
        break;
      case 'computer-graphics':
        description = 'Expertise in computer graphics programming and design tools.';
        skillList = ['2D Graphics Programming', '3D Graphics Programming', 'OpenGL', 'Adobe Photoshop', 'Adobe Illustrator'];
        break;
      case 'web-development':
        description = 'Proficient in both frontend and backend web development.';
        skillList = ['HTML', 'CSS', 'JavaScript', 'PHP'];
        break;
      case 'core-competencies':
        description = 'Strong in essential core competencies.';
        skillList = ['Problem Solving', 'Algorithm Design', 'Cross-functional Communication', 'Creative Technical Solutions', 'Agile Time Management', 'Attention to Detail', 'Technical Mentorship'];
        break;
    }

    card.querySelector('p').textContent = description;

    // Add skill items to the skill card
    const skillItemsContainer = document.createElement('div');
    skillItemsContainer.classList.add('skill-items');

    skillList.forEach(skillItemText => {
      const skillItem = document.createElement('div');
      skillItem.classList.add('skill-item');
      skillItem.textContent = skillItemText;
      skillItemsContainer.appendChild(skillItem);
    });

    card.appendChild(skillItemsContainer);
  });
});