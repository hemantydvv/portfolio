/* =========================
   PARTICLES.JS CONFIG
========================= */
particlesJS('particles', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ['#ff4b5c', '#facc15', '#3b82f6', '#10b981'] },
    shape: { type: ['circle', 'triangle', 'star'] },
    opacity: { value: 0.4, random: true },
    size: { value: 4, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#facc15',
      opacity: 0.3,
      width: 1
    },
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

/* =========================
   NAVIGATION
========================= */
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Smooth scrolling
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

// Intersection observer animation
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

// Active section on scroll
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

// Keyboard navigation
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      link.click();
    }
  });
});

/* =========================
   EMAILJS CONTACT FORM
========================= */

// Initialize EmailJS
(function () {
  emailjs.init("62TSAZMzhPuymxjhr"); // 🔴 PUT YOUR EMAILJS PUBLIC KEY
})();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_hoy6918",   // 🔴 PUT YOUR SERVICE ID
      "template_78ttljc",  // 🔴 PUT YOUR TEMPLATE ID
      this
    )
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting me.",
        showConfirmButton: false,
        timer: 2000
      });
      contactForm.reset();
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to send message. Please try again later."
      });
    });
  });
}
