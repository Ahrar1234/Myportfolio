document.addEventListener('DOMContentLoaded', function() {
  try {
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
    try {
      if (localStorage.getItem('theme') === 'dark' || 
          (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    } catch (error) {
      console.warn('Theme initialization failed:', error);
    }
  
    // Function to toggle theme
    function toggleTheme() {
      try {
        if (htmlElement.classList.contains('dark')) {
          htmlElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'light' } }));
        } else {
          htmlElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'dark' } }));
        }
      } catch (error) {
        console.error('Theme toggle failed:', error);
      }
    }
  
    // Add event listeners to both theme toggle buttons
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
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
  
    // Scroll animation for fade-in elements - optimized performance
    const fadeElements = document.querySelectorAll('.fade-in');
    let ticking = false;
    
    function checkFade() {
      if (!ticking) {
        requestAnimationFrame(() => {
          fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100 && rect.bottom > 0) {
              element.classList.add('visible');
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }
  
    // Initial check for elements in view
    checkFade();
    
    // Check on scroll with throttling
    window.addEventListener('scroll', checkFade, { passive: true });
  
    // Contact form submission with enhanced security
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
          const nameEl = document.getElementById('name');
          const emailEl = document.getElementById('email');
          const messageEl = document.getElementById('message');
          
          if (!nameEl || !emailEl || !messageEl) {
            throw new Error('Form elements not found');
          }
          
          const name = nameEl.value.trim();
          const email = emailEl.value.trim();
          const message = messageEl.value.trim();
          
          // Enhanced validation
          if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
          }
          
          // Sanitize inputs
          const sanitizedName = sanitizeInput(name);
          const sanitizedMessage = sanitizeInput(message);
          
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
          }
          
          // Simulate secure form submission (HTTPS would be used in production)
          showFormMessage(`Thank you for your message, ${sanitizedName}! I'll get back to you soon.`, 'success');
          
          // Reset the form
          contactForm.reset();
        } catch (error) {
          console.error('Form submission error:', error);
          showFormMessage('An error occurred. Please try again.', 'error');
        }
      });
    }
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        try {
          const targetId = this.getAttribute('href');
          if (!targetId || !targetId.startsWith('#')) return;
          
          e.preventDefault();
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
              mobileMenu.classList.remove('active');
            }
          }
        } catch (error) {
          console.error('Navigation error:', error);
        }
      });
    });
    
    // Helper functions
    function sanitizeInput(input) {
      return input.replace(/[<>"'&]/g, function(match) {
        const escapeMap = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return escapeMap[match];
      });
    }
    
    function showFormMessage(message, type) {
      // Create or update message element
      let messageEl = document.getElementById('form-message');
      if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'form-message';
        messageEl.className = 'mt-4 p-3 rounded-md text-center';
        document.getElementById('contact-form').appendChild(messageEl);
      }
      
      messageEl.textContent = message;
      messageEl.className = `mt-4 p-3 rounded-md text-center ${
        type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
      }`;
      
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        if (messageEl) {
          messageEl.remove();
        }
      }, 5000);
    }
    
  } catch (error) {
    console.error('Script initialization error:', error);
  }
});