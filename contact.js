// contact.js
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form form');
  
  // Create success message element
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Your message has been sent successfully! We will get back to you shortly.';
  contactForm.insertBefore(successMessage, contactForm.firstChild);
  
  // Add error message elements to each form group
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      
      const input = group.querySelector('input, select, textarea');
      if (input) {
          switch (input.id) {
              case 'name':
                  errorMessage.textContent = 'Please enter your name';
                  break;
              case 'email':
                  errorMessage.textContent = 'Please enter a valid email address';
                  break;
              case 'inquiry-type':
                  errorMessage.textContent = 'Please select an inquiry type';
                  break;
              case 'message':
                  errorMessage.textContent = 'Please enter your message';
                  break;
          }
          group.appendChild(errorMessage);
          
          // Add input event listeners
          input.addEventListener('input', function() {
              validateInput(input);
          });
          
          input.addEventListener('blur', function() {
              validateInput(input);
          });
      }
  });
  
  // Form submission handler
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all inputs
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const inquiryType = document.getElementById('inquiry-type');
      const message = document.getElementById('message');
      
      const isNameValid = validateInput(name);
      const isEmailValid = validateInput(email);
      const isInquiryTypeValid = validateInput(inquiryType);
      const isMessageValid = validateInput(message);
      
      // If all inputs are valid, submit the form
      if (isNameValid && isEmailValid && isInquiryTypeValid && isMessageValid) {
          // Show loading state
          const submitButton = contactForm.querySelector('.btn');
          const originalText = submitButton.textContent;
          submitButton.textContent = 'Sending...';
          submitButton.disabled = true;
          
          // Simulate AJAX request with a timeout
          setTimeout(() => {
              // Show success message
              successMessage.style.display = 'block';
              
              // Clear form fields
              contactForm.reset();
              
              // Reset button
              submitButton.textContent = originalText;
              submitButton.disabled = false;
              
              // Hide success message after 5 seconds
              setTimeout(() => {
                  successMessage.style.display = 'none';
              }, 5000);
          }, 1500);
      }
  });
  
  // Input validation function
  function validateInput(input) {
      const formGroup = input.closest('.form-group');
      let isValid = true;
      
      switch (input.id) {
          case 'name':
              isValid = input.value.trim() !== '';
              break;
          case 'email':
              isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
              break;
          case 'inquiry-type':
              isValid = input.value !== '';
              break;
          case 'message':
              isValid = input.value.trim() !== '';
              break;
      }
      
      if (isValid) {
          formGroup.classList.remove('error');
      } else {
          formGroup.classList.add('error');
      }
      
      return isValid;
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth'
              });
          }
      });
  });
});