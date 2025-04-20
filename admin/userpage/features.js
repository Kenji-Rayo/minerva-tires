// features.js
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    featureObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        features.forEach(feature => {
            // Add the initial hidden class
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(30px)';
            feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            featureObserver.observe(feature);
        });
    }
    
    // Add animation styles
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .feature:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            }
            
            @keyframes pulse-animation {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        </style>
    `);
    
    // Mobile navigation toggle (for future enhancements)
    const handleMobileView = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Responsive adjustments can be added here
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                // Mobile view settings
            } else {
                // Desktop view settings
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize(); // Initial check
    };
    
    handleMobileView();
    
    // Change the feature icons color to match theme
    const featureIcons = document.querySelectorAll('.feature div[style*="color: #ff0000"]');
    featureIcons.forEach(icon => {
        icon.style.color = '#ff3e00';
    });
});