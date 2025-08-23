document.addEventListener('DOMContentLoaded', function () {
  // Original navigation functionality
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking links or outside
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Enhanced smooth scrolling with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: targetPosition - navHeight,
        behavior: 'smooth'
      });
    });
  });

  // Skills data (structured) — uses Font Awesome icons already included in the page
  const skillsData = [
    {
      title: '<i class="fab fa-python"></i> Programming Languages',
      categories: [
        {
          type: 'bars', items: [
            { name: 'Python', progress: 90, icon: 'fab fa-python' },
            { name: 'C', progress: 85, icon: 'fas fa-code' },
            { name: 'C++', progress: 80, icon: 'fas fa-code' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-brain"></i> Artificial Intelligence & Machine Learning',
      categories: [
        {
          heading: 'Libraries', tags: [
            { name: 'NumPy', icon: 'fas fa-calculator' },
            { name: 'Pandas', icon: 'fas fa-table' },
            { name: 'Scikit-learn', icon: 'fas fa-cogs' },
            { name: 'TensorFlow', icon: 'fab fa-tensorflow' },
            { name: 'Keras', icon: 'fas fa-project-diagram' },
            { name: 'OpenCV', icon: 'fas fa-eye' }
          ]
        },
        {
          heading: 'Visualization', tags: [
            { name: 'Matplotlib', icon: 'fas fa-chart-area' },
            { name: 'Seaborn', icon: 'fas fa-chart-bar' }
          ]
        },
        {
          heading: 'Algorithms & Techniques', tags: [
            { name: 'Supervised Learning', icon: 'fas fa-check-circle' },
            { name: 'Unsupervised Learning', icon: 'fas fa-layer-group' }
          ]
        },
        {
          heading: 'Tools & Platforms', tags: [
            { name: 'Google Colab', icon: 'fab fa-google' },
            { name: 'JupyterLab', icon: 'fas fa-book' },
            { name: 'Anaconda', icon: 'fas fa-cube' },
            { name: 'Kaggle', icon: 'fas fa-trophy' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-chart-line"></i> Data Analysis & Business Intelligence',
      categories: [
        {
          heading: null, tags: [
            { name: 'Data Cleaning, Exploration, and Statistical Analysis', icon: 'fas fa-search' },
            { name: 'Dashboard Design and Reporting (Power BI)', icon: 'fas fa-table' },
            { name: 'Business Intelligence & Insight Extraction', icon: 'fas fa-lightbulb' },
            { name: 'Data-driven Decision Making', icon: 'fas fa-balance-scale' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-database"></i> Database Management',
      categories: [
        {
          heading: null, tags: [
            { name: 'MySQL', icon: 'fas fa-database' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-network-wired"></i> Computer Networks',
      categories: [
        {
          heading: null, tags: [
            { name: 'Cisco Certified Network Associate (CCNA)', icon: 'fas fa-certificate' },
            { name: 'Routing & Switching', icon: 'fas fa-route' },
            { name: 'Network Security', icon: 'fas fa-shield-alt' },
            { name: 'Infrastructure Configuration', icon: 'fas fa-cogs' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-globe"></i> Web Development',
      categories: [
        {
          heading: 'Frontend', tags: [
            { name: 'HTML', icon: 'fab fa-html5' },
            { name: 'CSS', icon: 'fab fa-css3-alt' },
            { name: 'Basic JavaScript', icon: 'fab fa-js' }
          ]
        },
        {
          heading: 'Backend', tags: [
            { name: 'Basic PHP', icon: 'fab fa-php' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-paint-brush"></i> Computer Graphics & UI/UX',
      categories: [
        {
          heading: null, tags: [
            { name: '2D Graphics Programming with OpenGL', icon: 'fas fa-vector-square' },
            { name: 'Adobe Photoshop', icon: 'fab fa-adobe' },
            { name: 'Adobe Illustrator', icon: 'fab fa-adobe' },
            { name: 'Canva', icon: 'fab fa-canva' },
            { name: 'Adobe XD (UI/UX Design)', icon: 'fab fa-adobe' }
          ]
        }
      ]
    },
    {
      title: '<i class="fas fa-tools"></i> Software & Tools',
      categories: [
        {
          heading: null, tags: [
            { name: 'Microsoft Office Suite (Word, Excel, PowerPoint)', icon: 'fab fa-microsoft' },
            { name: 'Google Workspace (Docs, Sheets, Slides)', icon: 'fab fa-google' },
            { name: 'Visual Studio Code', icon: 'fas fa-code' },
            { name: 'Code::Blocks', icon: 'fas fa-box-open' },
            { name: 'PyCharm', icon: 'fab fa-python' },
            { name: 'Cisco Packet Tracer', icon: 'fas fa-network-wired' }
          ]
        }
      ]
    }
  ];

  function renderSkills() {
    const container = document.getElementById('skill-grid');
    if (!container) return;

    container.innerHTML = skillsData.map(section => {
      // Build categories HTML
      const cats = section.categories.map(cat => {
        if (cat.type === 'bars') {
          const bars = cat.items.map(i => `
            <div class="skill-bar">
              <span class="skill-name"><i class="${i.icon || 'fas fa-check-circle'}"></i> ${i.name}</span>
              <div class="progress-bar" style="width:0%" data-progress="${i.progress}"></div>
            </div>
          `).join('');
          return `<div class="skill-category"><div class="skill-bars">${bars}</div></div>`;
        } else if (cat.tags) {
          const heading = cat.heading ? `<h4>${cat.heading}</h4>` : '';
          const tags = cat.tags.map(t => `<span><i class="${t.icon || 'fas fa-check-circle'}"></i> ${t.name}</span>`).join('');
          return `<div class="skill-category">${heading}<div class="skill-tags">${tags}</div></div>`;
        } else {
          return '';
        }
      }).join('');

      return `
        <div class="skill-item slide-in-left">
          <h3>${section.title}</h3>
          ${cats}
        </div>
      `;
    }).join('');
  }

  // Render skills now so they exist before observers and animations run
  renderSkills();

  // Enhanced intersection observer for animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate progress bars with randomized delays
        if (entry.target.classList.contains('skill-item')) {
          entry.target.querySelectorAll('.progress-bar').forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = bar.getAttribute('data-progress') + '%';
            }, index * 200);
          });
        }

        // Animate numbers when visible
        if (entry.target.classList.contains('animate-number')) {
          animateNumber(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe card / item elements for subtle reveal only (no large section movement)
  const cardTargets = document.querySelectorAll('.course-card, .education-card, .skill-item, .project-card, .course-card, .education-card');
  cardTargets.forEach(el => animateOnScroll.observe(el));

  // Number animation function
  function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Contact Form Enhancements
  const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
  const formGroups = document.querySelectorAll('.form-group');

  // Add floating label and icon functionality
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    if (input && label) {
      // Add icons based on input type
      const icon = document.createElement('i');
      icon.className = `input-icon fas fa-${input.type === 'email' ? 'envelope' :
          input.type === 'text' ? 'user' :
            'comment'
        }`;
      group.appendChild(icon);

      // Handle input state
      input.addEventListener('input', () => {
        if (input.value) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
    }
  });

  // Animate form on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(contactForm);

  // Replace existing form submission handling with a Google Forms-backed handler
  contactForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const scriptURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqzpfEfoPsz1syll5lqKcDjTOoCI-RgOVIinP9Pb_2Ci27cw/formResponse";
    const userName = document.getElementById("name").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const userMessage = document.getElementById("message").value.trim();
    const popupMessage = document.getElementById("popupMessage");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Basic client-side validation
    if (!userName || !userEmail || !userMessage) {
      showPopup("Please fill all fields before sending.", "error");
      return;
    }

    // Disable button to prevent duplicate clicks
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    const formData = new FormData();
    // Use the exact entry IDs you supplied
    formData.append("entry.1951388164", userName);
    formData.append("entry.825770403", userEmail);
    formData.append("entry.1020935326", userMessage);

    // Google Forms accepts POSTs from the browser but often requires no-cors mode.
    fetch(scriptURL, { method: "POST", body: formData, mode: "no-cors" })
      .then(() => {
        showPopup(`✅ Thank you, ${userName}! Message sent successfully.`, "success");
        contactForm.reset();
        // reset floating labels if present
        document.querySelectorAll('.form-group label').forEach(l => l.classList.remove('active'));
      })
      .catch(() => {
        showPopup("❌ Oops! Something went wrong. Please try again.", "error");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      });

    function showPopup(message, type) {
      if (!popupMessage) return;
      popupMessage.textContent = message;
      popupMessage.className = `popup ${type} show`;

      // Hide after 2 seconds
      setTimeout(() => {
        popupMessage.className = "popup hidden";
      }, 2000);
    }
  });

  function showMessage(text, type) {
    const message = document.createElement('div');
    // type expected 'success' or 'error' -> map to class names used by CSS
    message.className = type === 'success' ? 'success-message' : 'error-message';
    message.textContent = text;

    document.body.appendChild(message);

    // Trigger reflow for animation
    message.offsetHeight;

    message.classList.add('show');

    setTimeout(() => {
      message.classList.remove('show');
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  // Add ripple effect to submit button
  const submitButton = contactForm.querySelector('button');
  submitButton.addEventListener('click', function (e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute'; // ensure absolute positioning if CSS didn't apply yet
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

  // Role text rotation
  const roles = document.querySelectorAll('.role-text');
  let currentRole = 0;

  function rotateRoles() {
    roles.forEach(role => {
      role.classList.remove('current');
      role.style.transform = 'translateY(100%) scale(0.9)';
      role.style.opacity = '0';
    });

    setTimeout(() => {
      roles[currentRole].classList.add('current');
      roles[currentRole].style.transform = 'translateY(0) scale(1)';
      roles[currentRole].style.opacity = '1';
      currentRole = (currentRole + 1) % roles.length;
    }, 500); // Match transition duration
  }

  setInterval(rotateRoles, 3000);

  // Typing effect
  const text = "Mubtasim Fuad Opee";
  const typingText = document.querySelector('.typing-text');
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent = text.substring(0, i + 1);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => {
        i = 0;
        typeWriter();
      }, 5000);
    }
  }

  typeWriter();

  // Smooth scroll for CTA buttons
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const navHeight = document.querySelector('nav').offsetHeight;

      window.scrollTo({
        top: targetSection.offsetTop - navHeight,
        behavior: 'smooth'
      });
    });
  });

  const backBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (!backBtn) return;
    backBtn.classList.toggle('visible', window.scrollY > 300);
  });
  backBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#home');
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
    window.scrollTo({ top: (target ? target.offsetTop : 0) - navHeight, behavior: 'smooth' });
  });
});