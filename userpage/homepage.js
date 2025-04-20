document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
          header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
          header.style.backgroundColor = '#000';
          header.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
  });
  
  // Mobile menu toggle (prepare for future implementation)
  // This will be useful when you want to add a hamburger menu for mobile
  const createMobileMenu = () => {
      const nav = document.querySelector('nav');
      const mobileMenuBtn = document.createElement('div');
      mobileMenuBtn.className = 'mobile-menu-btn';
      mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
      
      // Add mobile menu button to DOM when you're ready to implement
      // document.querySelector('header').appendChild(mobileMenuBtn);
      
      // Toggle mobile menu
      // mobileMenuBtn.addEventListener('click', () => {
      //     nav.classList.toggle('active');
      //     mobileMenuBtn.classList.toggle('active');
      // });
  };
  
  // Uncomment the line below when ready to implement mobile menu
  // createMobileMenu();
  
  // Add button hover effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
      button.addEventListener('mouseover', () => {
          button.style.boxShadow = '0 5px 15px rgba(230, 0, 18, 0.4)';
      });
      
      button.addEventListener('mouseout', () => {
          button.style.boxShadow = 'none';
      });
  });
  
  // Page load animation
  const animateOnLoad = () => {
      const hero = document.querySelector('.hero');
      const heroElements = hero.querySelectorAll('h1, p, .btn');
      
      setTimeout(() => {
          heroElements.forEach((element, index) => {
              setTimeout(() => {
                  element.style.opacity = '1';
                  element.style.transform = 'translateY(0)';
              }, 200 * index);
          });
      }, 300);
  };
  
  // Add initial styles for animation
  const initAnimations = () => {
      const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn');
      heroElements.forEach(element => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      });
  };
  
  initAnimations();
  animateOnLoad();
});