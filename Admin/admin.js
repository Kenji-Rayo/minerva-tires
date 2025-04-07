// Admin Dashboard JavaScript for YOKOHAMA - Minerva Tires

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initSidebar();
    initCharts();
    initDateFilter();
    initQuickActions();
    initActivityTable();
    initToastNotifications();
});

// Sidebar Toggle Functionality
function initSidebar() {
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'toggle-sidebar';
    toggleBtn.innerHTML = '◀';
    document.body.appendChild(toggleBtn);
    
    const sidebar = document.querySelector('.admin-sidebar');
    const navItems = document.querySelectorAll('.admin-nav li a span:not(.icon)');
    
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            toggleBtn.innerHTML = '▶';
            navItems.forEach(item => {
                item.style.display = 'none';
            });
        } else {
            toggleBtn.innerHTML = '◀';
            navItems.forEach(item => {
                item.style.display = 'inline';
            });
        }
    });
    
    // Handle active menu items
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.admin-nav li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            item.classList.add('active');
        }
    });
}

// Initialize Charts
function initCharts() {
    // Add refresh and options buttons to chart headers
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const header = container.querySelector('h2');
        const optionsSpan = document.createElement('span');
        optionsSpan.className = 'chart-options';
        optionsSpan.innerHTML = '⋮';
        header.appendChild(optionsSpan);
        
        // Options click event
        optionsSpan.addEventListener('click', function() {
            showChartOptions(container);
        });
        
        // Initialize chart based on container ID or class
        const chart = container.querySelector('.chart');
        if (chart.classList.contains('sales-chart')) {
            renderSalesChart(chart);
        } else if (chart.classList.contains('services-chart')) {
            renderServicesChart(chart);
        }
    });
}

// Render Sales Chart
function renderSalesChart(chartElement) {
    // Simulating chart loading
    chartElement.classList.add('loading');
    
    setTimeout(() => {
        chartElement.classList.remove('loading');
        
        // This is where you would normally use a charting library like Chart.js
        // For this example, we'll create a simple visual representation
        chartElement.innerHTML = '';
        
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const salesData = [12500, 15000, 14200, 16800, 15400, 17200];
        
        const chartVisualization = document.createElement('div');
        chartVisualization.style.width = '100%';
        chartVisualization.style.height = '100%';
        chartVisualization.style.display = 'flex';
        chartVisualization.style.alignItems = 'flex-end';
        chartVisualization.style.justifyContent = 'space-between';
        chartVisualization.style.padding = '20px 0';
        
        // Create bars for the chart
        for (let i = 0; i < monthLabels.length; i++) {
            const percentage = (salesData[i] / Math.max(...salesData)) * 100;
            
            const barContainer = document.createElement('div');
            barContainer.style.display = 'flex';
            barContainer.style.flexDirection = 'column';
            barContainer.style.alignItems = 'center';
            barContainer.style.width = `${100 / monthLabels.length}%`;
            
            const value = document.createElement('span');
            value.textContent = `$${(salesData[i] / 1000).toFixed(1)}k`;
            value.style.fontSize = '12px';
            value.style.marginBottom = '5px';
            
            const bar = document.createElement('div');
            bar.style.width = '60%';
            bar.style.height = `${percentage}%`;
            bar.style.backgroundColor = '#e60012';
            bar.style.borderRadius = '3px 3px 0 0';
            bar.style.transition = 'height 1s ease';
            
            const label = document.createElement('span');
            label.textContent = monthLabels[i];
            label.style.fontSize = '12px';
            label.style.marginTop = '8px';
            
            barContainer