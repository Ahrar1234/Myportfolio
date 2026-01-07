document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const htmlElement = document.documentElement;
  
  // Mobile menu functionality
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Check for saved theme preference or use system preference
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
  
  // Function to toggle theme
  function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'light' } }));
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'dark' } }));
    }
  }
  
  // Add event listeners to both theme toggle buttons
  themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  });
  
  // Scroll animation for fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        element.classList.add('visible');
      } else if (elementBottom < 0 || elementTop > windowHeight) {
        // Optional: Reset animation when element leaves viewport completely
        // element.classList.remove('visible');
      }
    });
  }
  
  // Initial check for elements in view
  checkFade();
  
  // Check on scroll
  window.addEventListener('scroll', checkFade);
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      
      // Reset the form
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});