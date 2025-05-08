// products.js
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
    
    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, 100 * Array.from(productCards).indexOf(entry.target)); // Staggered animation
                    productObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        productCards.forEach(card => {
            // Add the initial hidden class
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            productObserver.observe(card);
        });
    }
    
    // Add animation styles
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            @keyframes pulse-animation {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            /* Add parallax effect to hero section */
            .hero {
                background-attachment: fixed;
            }
            
            /* Add hover effect to product cards */
            .product-card:hover .product-info h3 {
                color: #ff3e00;
                transition: color 0.3s ease;
            }
            
            /* Add subtle loading animation for images */
            @keyframes imageLoad {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .product-image img {
                animation: imageLoad 0.5s ease;
            }
        </style>
    `);
    
    // Load product images with fade-in effect
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        // Store original src
        const originalSrc = img.src;
        // Clear src temporarily to show loading effect
        img.src = '';
        
        // Set a small timeout to simulate loading
        setTimeout(() => {
            img.src = originalSrc;
        }, 100);
    });
    
    // Handle mobile navigation
    const handleMobileView = () => {
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                // Add active class to current page in navigation
                const currentPage = window.location.pathname.split('/').pop();
                document.querySelectorAll('nav ul li a').forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                        link.style.color = '#ff3e00';
                    }
                });
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize(); // Initial check
    };
    
    handleMobileView();
    
    // Optional: Add hover effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 5px 15px rgba(255, 62, 0, 0.3)';
        });
        
        btn.addEventListener('mouseout', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Change hero section based on scroll position
    let heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }
});