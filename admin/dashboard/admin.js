document.addEventListener('DOMContentLoaded', function() {
    // Navigation Menu Functionality
    const navLinks = document.querySelectorAll('.admin-nav ul li a');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Hide all sections and show the selected one
            const targetSection = this.getAttribute('data-section');
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // Date Range Filter Event
    const dateRange = document.getElementById('date-range');
    dateRange.addEventListener('change', function() {
        updateDashboardData(this.value);
    });
    
    // Search Button Event
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = document.getElementById('order-search').value;
            searchOrders(searchTerm);
        });
    }
    
    // View Order Button Events
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Viewing details for order ${orderId}`);
        });
    });
    
    // Initialize Charts
    initializeCharts();
    
    // Logout Button Event
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            alert('Logout successful!');
        }
    });
});

// Function to update dashboard data based on selected date range
function updateDashboardData(dateRange) {
    console.log(`Updating dashboard data for: ${dateRange}`);
    
    // Simulate data fetching with timeout
    setTimeout(() => {
        // Update Statistics
        const statsData = getStatsByDateRange(dateRange);
        document.getElementById('total-orders').textContent = statsData.orders;
        document.getElementById('total-revenue').textContent = statsData.revenue;
        document.getElementById('new-customers').textContent = statsData.customers;
        document.getElementById('avg-rating').textContent = statsData.rating;
        
        // Update Charts
        updateCharts(dateRange);
        
        // Update Recent Orders
        updateRecentOrders(dateRange);
    }, 500);
}

// Function to search orders
function searchOrders(term) {
    console.log(`Searching for orders with term: ${term}`);
    alert(`Search results for: ${term}`);
}

// Simulate getting statistics by date range
function getStatsByDateRange(range) {
    // Mock data - in a real app, this would be fetched from an API
    const stats = {
        'Today': { 
            orders: '127', 
            revenue: '$8,240', 
            customers: '24', 
            rating: '4.9/5' 
        },
        'Yesterday': { 
            orders: '143', 
            revenue: '$9,320', 
            customers: '31', 
            rating: '4.7/5' 
        },
        'Last 7 days': { 
            orders: '892', 
            revenue: '$62,450', 
            customers: '215', 
            rating: '4.8/5' 
        },
        'Last 30 days': { 
            orders: '1,254', 
            revenue: '$85,240', 
            customers: '324', 
            rating: '4.8/5' 
        },
        'This Month': { 
            orders: '652', 
            revenue: '$45,120', 
            customers: '178', 
            rating: '4.8/5' 
        },
        'Last Month': { 
            orders: '1,120', 
            revenue: '$79,850', 
            customers: '298', 
            rating: '4.9/5' 
        }
    };
    
    return stats[range] || stats['Last 30 days'];
}

// Function to update orders table
function updateRecentOrders(dateRange) {
    // This would typically fetch data from an API based on the date range
    console.log(`Updating orders table for: ${dateRange}`);
}

// Initialize Chart.js charts
function initializeCharts() {
    // Monthly Sales Chart
    const salesCtx = document.getElementById('monthlySalesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Sales ($)',
                data: [65000, 59000, 80000, 81000, 56000, 55000, 70000, 75000, 82000, 85000, 90000, 95000],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Demographics Chart
    const demoCtx = document.getElementById('demographicsChart').getContext('2d');
    const demoChart = new Chart(demoCtx, {
        type: 'pie',
        data: {
            labels: ['Individual', 'Distributor', 'Corporate', 'Retail'],
            datasets: [{
                label: 'Customer Demographics',
                data: [45, 25, 20, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Function to update charts based on date range
function updateCharts(dateRange) {
    // This would update chart data based on the selected date range
    console.log(`Updating charts for: ${dateRange}`);
    // In a real app, this would fetch new data and update chart datasets
}