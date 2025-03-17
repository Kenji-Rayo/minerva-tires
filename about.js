document.addEventListener('DOMContentLoaded', function() {
  // Add active class to current navigation item
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'homepage.html') ||
          (currentPage === 'about.html' && linkHref === 'about.html')) {
          link.style.color = '#ff3e00';
          link.style.fontWeight = '700';
          const underline = document.createElement('span');
          underline.style.position = 'absolute';
          underline.style.bottom = '-2px';
          underline.style.left = '0';
          underline.style.width = '100%';
          underline.style.height = '2px';
          underline.style.backgroundColor = '#ff3e00';
          link.appendChild(underline);
      }
  });
  
  // Animate about content on load
  const aboutContent = document.querySelector('.about-content');
  
  if (aboutContent) {
      // Initial state
      aboutContent.style.opacity = '0';
      aboutContent.style.transform = 'translateY(30px)';
      aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      // Animate in after a short delay
      setTimeout(() => {
          aboutContent.style.opacity = '1';
          aboutContent.style.transform = 'translateY(0)';
      }, 300);
      
      // Add text reveal animation to paragraphs
      const paragraphs = aboutContent.querySelectorAll('p');
      
      paragraphs.forEach((paragraph, index) => {
          paragraph.style.opacity = '0';
          paragraph.style.transform = 'translateY(20px)';
          paragraph.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          paragraph.style.transitionDelay = `${0.5 + (index * 0.2)}s`;
          
          setTimeout(() => {
              paragraph.style.opacity = '1';
              paragraph.style.transform = 'translateY(0)';
          }, 300);
      });
  }
  
  // Add header shrink effect on scroll
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
          header.style.padding = '10px 30px';
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      } else {
          header.style.padding = '15px 30px';
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
      
      lastScrollTop = scrollTop;
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70, // Account for header height
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Create mobile menu toggle for responsive design
  const createMobileMenu = () => {
      if (window.innerWidth <= 768) {
          const nav = document.querySelector('nav');
          const navUl = nav.querySelector('ul');
          
          // Check if mobile menu already exists
          if (!document.querySelector('.mobile-menu-toggle')) {
              // Hide navigation initially
              navUl.style.display = 'none';
              
              // Create toggle button
              const toggleButton = document.createElement('div');
              toggleButton.classList.add('mobile-menu-toggle');
              toggleButton.innerHTML = '☰';
              toggleButton.style.fontSize = '1.8rem';
              toggleButton.style.cursor = 'pointer';
              toggleButton.style.color = '#fff';
              
              // Insert before the nav
              nav.parentNode.insertBefore(toggleButton, nav);
              
              // Add toggle functionality
              toggleButton.addEventListener('click', () => {
                  if (navUl.style.display === 'none' || navUl.style.display === '') {
                      navUl.style.display = 'flex';
                      navUl.style.flexDirection = 'column';
                      navUl.style.alignItems = 'center';
                      navUl.style.marginTop = '15px';
                      toggleButton.innerHTML = '✕';
                  } else {
                      navUl.style.display = 'none';
                      toggleButton.innerHTML = '☰';
                  }
              });
          }
      } else {
          // Remove mobile menu if window is resized
          const mobileToggle = document.querySelector('.mobile-menu-toggle');
          if (mobileToggle) {
              mobileToggle.remove();
              document.querySelector('nav ul').style.display = 'flex';
              document.querySelector('nav ul').style.flexDirection = 'row';
          }
      }
  };
  
  // Initialize mobile menu
  createMobileMenu();
  
  // Update on window resize
  window.addEventListener('resize', createMobileMenu);
  
  // Add back to top button
  const backToTopButton = document.createElement('div');
  backToTopButton.classList.add('back-to-top');
  backToTopButton.innerHTML = '&uarr;';
  backToTopButton.style.position = 'fixed';
  backToTopButton.style.bottom = '20px';
  backToTopButton.style.right = '20px';
  backToTopButton.style.backgroundColor = '#ff3e00';
  backToTopButton.style.color = 'white';
  backToTopButton.style.width = '40px';
  backToTopButton.style.height = '40px';
  backToTopButton.style.borderRadius = '50%';
  backToTopButton.style.display = 'flex';
  backToTopButton.style.justifyContent = 'center';
  backToTopButton.style.alignItems = 'center';
  backToTopButton.style.cursor = 'pointer';
  backToTopButton.style.opacity = '0';
  backToTopButton.style.transition = 'opacity 0.3s ease';
  backToTopButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  backToTopButton.style.zIndex = '999';
  
  document.body.appendChild(backToTopButton);
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTopButton.style.opacity = '1';
      } else {
          backToTopButton.style.opacity = '0';
      }
  });
  
  backToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});