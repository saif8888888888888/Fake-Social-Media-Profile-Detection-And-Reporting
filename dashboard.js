document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initCharts();
    
    // Load user data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('username').textContent = user.name;
    }
    
    // Load scan history
    loadScanHistory();
});

// Initialize charts
function initCharts() {
    // Results chart
    const resultsCtx = document.getElementById('resultsChart').getContext('2d');
    const resultsChart = new Chart(resultsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Fake', 'Genuine', 'Suspicious'],
            datasets: [{
                data: [16, 8, 5],
                backgroundColor: [
                    'rgba(255, 7, 58, 0.8)',
                    'rgba(57, 255, 20, 0.8)',
                    'rgba(255, 165, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 7, 58, 1)',
                    'rgba(57, 255, 20, 1)',
                    'rgba(255, 165, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0ff'
                    }
                }
            }
        }
    });
    
    // Platforms chart
    const platformsCtx = document.getElementById('platformsChart').getContext('2d');
    const platformsChart = new Chart(platformsCtx, {
        type: 'bar',
        data: {
            labels: ['Instagram', 'Facebook', 'Twitter', 'TikTok'],
            datasets: [{
                label: '# of Scans',
                data: [12, 8, 7, 2],
                backgroundColor: [
                    'rgba(225, 48, 108, 0.8)',
                    'rgba(59, 89, 152, 0.8)',
                    'rgba(29, 161, 242, 0.8)',
                    'rgba(0, 0, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(225, 48, 108, 1)',
                    'rgba(59, 89, 152, 1)',
                    'rgba(29, 161, 242, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#e0e0ff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e0ff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Load scan history
function loadScanHistory() {
    // In a real application, this would come from an API
    const scanHistory = [
        {
            url: 'https://instagram.com/john.doe',
            platform: 'Instagram',
            date: 'Oct 15, 2025',
            result: 'Fake'
        },
        {
            url: 'https://instagram.com/jane_smith',
            platform: 'Instagram',
            date: 'Oct 14, 2025',
            result: 'Genuine'
        },
        {
            url: 'https://facebook.com/robert_jones',
            platform: 'Facebook',
            date: 'Oct 13, 2025',
            result: 'Fake'
        },
        {
            url: 'https://tiktok.com/@sarah_miller',
            platform: 'TikTok',
            date: 'Oct 12, 2025',
            result: 'Suspicious'
        }
    ];
    
    // This would be implemented to populate the table with real data
}