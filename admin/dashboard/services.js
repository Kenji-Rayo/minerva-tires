
        // Modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('service-modal');
            const addBtn = document.getElementById('add-service-btn');
            const closeBtn = document.querySelector('.close-btn');
            const cancelBtn = document.querySelector('.cancel-btn');
            
            // Open modal
            addBtn.addEventListener('click', function() {
                modal.style.display = 'block';
            });
            
            // Close modal
            function closeModal() {
                modal.style.display = 'none';
            }
            
            closeBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
            
            // Category tabs functionality
            const categoryTabs = document.querySelectorAll('.category-tab');
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Here you would normally filter the services table
                    // based on the selected category
                    console.log('Selected category:', this.dataset.category);
                });
            });
            
            // Handle form submission (prevent default for demo)
            const serviceForm = document.getElementById('service-form');
            serviceForm.addEventListener('submit', function(event) {
                event.preventDefault();
                // Here you would normally handle the form data
                console.log('Form submitted');
                closeModal();
            });
        });