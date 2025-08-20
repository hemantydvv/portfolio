 // Initialize particles.js with vibrant settings
    particlesJS('particles', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#ff4b5c', '#facc15', '#3b82f6', '#10b981'] },
        shape: { type: ['circle', 'triangle', 'star'] },
        opacity: { value: 0.4, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#facc15', opacity: 0.3, width: 1 },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });

    function toggleMenu() {
      const navMenu = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    }

    // Smooth scrolling and active link highlighting
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          currentSection = section.getAttribute('id');
        }
      });
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });

    // Keyboard navigation support
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });

    // Contact form validation
    document.getElementById('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      let hasError = false;

      if (name.length < 2) {
        document.getElementById('name-error').textContent = 'Name must be at least 2 characters long';
        document.getElementById('name').classList.add('error');
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email').classList.add('error');
        hasError = true;
      }

      if (message.length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
        document.getElementById('message').classList.add('error');
        hasError = true;
      }

      if (!hasError) {
        alert(`Thank you, ${name}! Your message has been sent.\n\nEmail: ${email}\nMessage: ${message}`);
        this.reset();
      }
    });