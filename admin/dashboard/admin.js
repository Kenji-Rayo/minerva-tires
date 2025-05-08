document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    setupNavigation();
    
    // Initialize charts
    initializeCharts();
    
    // Set up date range filter functionality
    setupDateRangeFilter();
    
    // Set up logout functionality
    setupLogout();
    
    // Initialize "View" buttons in the recent orders table
    setupViewButtons();
});

/**
 * Sets up the navigation menu functionality
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav a');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle clicks for non-external pages
            const href = this.getAttribute('href');
            if (href.includes('.html')) {
                // This is a link to another page, let the browser handle it
                return;
            }
            
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Hide all content sections
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });
    
    // Set active class based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

/**
 * Initializes the charts on the dashboard
 */
function initializeCharts() {
    // Monthly Sales Chart
    const salesCtx = document.getElementById('monthlySalesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sales',
                    data: [45000, 48000, 52000, 55000, 59000, 65000, 70000, 68000, 72000, 75000, 82000, 85000],
                    borderColor: '#4a6cf7',
                    backgroundColor: 'rgba(74, 108, 247, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Demographics Chart
    const demographicsCtx = document.getElementById('demographicsChart');
    if (demographicsCtx) {
        new Chart(demographicsCtx, {
            type: 'doughnut',
            data: {
                labels: ['New Customers', 'Returning Customers', 'Wholesale', 'Corporate'],
                datasets: [{
                    data: [35, 45, 15, 5],
                    backgroundColor: [
                        '#4a6cf7',
                        '#6c757d',
                        '#ffc107',
                        '#20c997'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }
}

/**
 * Sets up date range filter functionality
 */
function setupDateRangeFilter() {
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            // Get selected date range
            const selectedRange = this.value;
            
            // In a real application, you would fetch new data based on the selected range
            // For this demo, we'll just simulate by updating the dashboard with random data
            updateDashboardStatistics(selectedRange);
        });
    }
}

/**
 * Updates dashboard statistics based on selected date range
 * @param {string} dateRange - The selected date range
 */
function updateDashboardStatistics(dateRange) {
    // This is a simulation - in a real app, you would fetch real data
    console.log(`Fetching data for range: ${dateRange}`);
    
    // Generate some random data based on the date range
    let orderMultiplier = 1.0;
    let revenueMultiplier = 1.0;
    let customerMultiplier = 1.0;
    
    switch(dateRange) {
        case 'Today':
            orderMultiplier = 0.05;
            revenueMultiplier = 0.04;
            customerMultiplier = 0.03;
            break;
        case 'Yesterday':
            orderMultiplier = 0.06;
            revenueMultiplier = 0.05;
            customerMultiplier = 0.04;
            break;
        case 'Last 7 days':
            orderMultiplier = 0.25;
            revenueMultiplier = 0.23;
            customerMultiplier = 0.2;
            break;
        case 'Last 30 days':
            orderMultiplier = 1.0;
            revenueMultiplier = 1.0;
            customerMultiplier = 1.0;
            break;
        case 'This Month':
            orderMultiplier = 0.85;
            revenueMultiplier = 0.9;
            customerMultiplier = 0.8;
            break;
        case 'Last Month':
            orderMultiplier = 0.95;
            revenueMultiplier = 0.92;
            customerMultiplier = 0.9;
            break;
    }
    
    // Update the dashboard statistics
    const totalOrders = Math.floor(1254 * orderMultiplier);
    const totalRevenue = Math.floor(85240 * revenueMultiplier);
    const newCustomers = Math.floor(324 * customerMultiplier);
    
    // Update the DOM
    document.getElementById('total-orders').textContent = totalOrders.toLocaleString();
    document.getElementById('total-revenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('new-customers').textContent = newCustomers.toLocaleString();
    
    // You would also update the charts here with new data
    // For this demo, we'll leave the charts unchanged
}

/**
 * Sets up logout button functionality
 */
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            // In a real application, you might want to confirm before logging out
            const confirmLogout = confirm('Are you sure you want to log out?');
            if (!confirmLogout) {
                e.preventDefault();
            }
            // If confirmed, the browser will follow the link to the login page
        });
    }
}

/**
 * Sets up view buttons in the recent orders table
 */
function setupViewButtons() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the order ID from the row
            const row = this.closest('tr');
            const orderId = row.cells[0].textContent;
            
            // In a real application, you would redirect to an order details page
            // or open a modal with the order details
            alert(`Viewing details for order ${orderId}`);
            
            // Example of redirecting to an order details page:
            // window.location.href = `order-details.html?id=${orderId.substring(1)}`; // Remove the # from the ID
        });
    });
}