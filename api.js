document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user profile in the top bar
    const userProfile = document.querySelector('.user-profile span');
    if (userProfile) {
        userProfile.textContent = currentUser.name;
    }
    
    // Get analysis data from localStorage
    const analysisData = JSON.parse(localStorage.getItem('profileAnalysis')) || {
        score: 78,
        riskFactors: [
            "Profile has very few friends/followers",
            "Account was created very recently",
            "Limited personal information provided",
            "Profile picture appears stock or stolen"
        ],
        platform: 'facebook',
        timestamp: new Date().toISOString()
    };
    
    // Initialize charts
    initCharts(analysisData);
    
    // Initialize circle progress
    initCircleProgress(analysisData.score);
    
    // Display API data if available
    displayApiData(analysisData);
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('profileAnalysis');
            window.location.href = 'login.html';
        });
    }
    
    // Display API data in dashboard
    function displayApiData(data) {
        if (!data.apiData) return;
        
        const apiDataContainer = document.createElement('div');
        apiDataContainer.className = 'api-data-section';
        apiDataContainer.style.marginTop = '30px';
        apiDataContainer.style.padding = '20px';
        apiDataContainer.style.background = 'var(--card-bg)';
        apiDataContainer.style.borderRadius = 'var(--border-radius)';
        apiDataContainer.style.border = '1px solid rgba(0, 243, 255, 0.3)';
        
        apiDataContainer.innerHTML = `
            <h2 style="color: var(--cyber-blue); margin-bottom: 20px;">Extracted Social Media Data</h2>
            <div class="api-data-grid">
                ${data.apiData.emails && data.apiData.emails.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fas fa-envelope"></i> Emails</h3>
                        <ul>
                            ${data.apiData.emails.map(email => `<li>${email}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.phones && data.apiData.phones.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fas fa-phone"></i> Phone Numbers</h3>
                        <ul>
                            ${data.apiData.phones.map(phone => `<li>${phone}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.linkedins && data.apiData.linkedins.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fab fa-linkedin"></i> LinkedIn Profiles</h3>
                        <ul>
                            ${data.apiData.linkedins.map(profile => `<li><a href="${profile}" target="_blank">${profile}</a></li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.twitters && data.apiData.twitters.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fab fa-twitter"></i> Twitter Profiles</h3>
                        <ul>
                            ${data.apiData.twitters.map(profile => `<li><a href="${profile}" target="_blank">${profile}</a></li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.instagrams && data.apiData.instagrams.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fab fa-instagram"></i> Instagram Profiles</h3>
                        <ul>
                            ${data.apiData.instagrams.map(profile => `<li><a href="${profile}" target="_blank">${profile}</a></li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.facebooks && data.apiData.facebooks.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fab fa-facebook"></i> Facebook Profiles</h3>
                        <ul>
                            ${data.apiData.facebooks.map(profile => `<li><a href="${profile}" target="_blank">${profile}</a></li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.youtubes && data.apiData.youtubes.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fab fa-youtube"></i> YouTube Channels</h3>
                        <ul>
                            ${data.apiData.youtubes.map(channel => `<li><a href="${channel}" target="_blank">${channel}</a></li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.apiData.tiktoks && data.apiData.tiktoks.length > 0 ? `
                    <div class="api-data-item">
                        <h3><i class="fab fa-tiktok"></i> TikTok Profiles</h3>
                        <ul>
                            ${data.apiData.tiktoks.map(profile => `<li><a href="${profile}" target="_blank">${profile}</a></li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Add CSS for the grid
        const style = document.createElement('style');
        style.textContent = `
            .api-data-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .api-data-item {
                padding: 15px;
                background: rgba(0, 0, 20, 0.5);
                border-radius: 8px;
                border: 1px solid rgba(0, 243, 255, 0.2);
            }
            
            .api-data-item h3 {
                color: var(--cyber-blue);
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .api-data-item ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .api-data-item li {
                padding: 5px 0;
                border-bottom: 1px solid rgba(0, 243, 255, 0.1);
            }
            
            .api-data-item li:last-child {
                border-bottom: none;
            }
            
            .api-data-item a {
                color: var(--text-color);
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .api-data-item a:hover {
                color: var(--cyber-blue);
            }
        `;
        
        document.head.appendChild(style);
        
        // Insert API data section after the detailed analysis
        const detailedAnalysis = document.querySelector('.detailed-analysis');
        if (detailedAnalysis) {
            detailedAnalysis.after(apiDataContainer);
        } else {
            document.querySelector('.content').appendChild(apiDataContainer);
        }
    }
    
    // Initialize charts
    function initCharts(data) {
        // Risk Factor Distribution Chart
        const riskCtx = document.getElementById('riskChart').getContext('2d');
        const riskChart = new Chart(riskCtx, {
            type: 'doughnut',
            data: {
                labels: ['High Risk', 'Medium Risk', 'Low Risk'],
                datasets: [{
                    data: [5, 2, 1],
                    backgroundColor: [
                        'rgba(255, 7, 58, 0.8)',
                        'rgba(255, 165, 0, 0.8)',
                        'rgba(57, 255, 20, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 7, 58, 1)',
                        'rgba(255, 165, 0, 1)',
                        'rgba(57, 255, 20, 1)'
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
        
        // Timeline Chart
        const timelineCtx = document.getElementById('timelineChart').getContext('2d');
        const timelineChart = new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Fake Probability',
                    data: [65, 59, 70, 72, 75, data.score || 78],
                    fill: false,
                    borderColor: 'rgba(255, 7, 58, 1)',
                    tension: 0.1,
                    pointBackgroundColor: 'rgba(255, 7, 58, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 7, 58, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100,
                        ticks: {
                            color: '#e0e0ff'
                        },
                        grid: {
                            color: 'rgba(224, 224, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#e0e0ff'
                        },
                        grid: {
                            color: 'rgba(224, 224, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0ff'
                        }
                    }
                }
            }
        });
    }
    
    // Initialize circle progress
    function initCircleProgress(score) {
        const circleProgress = document.querySelector('.circle-progress');
        if (circleProgress) {
            // Set the conic gradient based on score
            circleProgress.style.background = `conic-gradient(var(--cyber-red) 0% ${score}%, rgba(255, 7, 58, 0.2) ${score}% 100%)`;
            
            // Update the score text
            const scoreText = circleProgress.querySelector('span');
            if (scoreText) {
                scoreText.textContent = `${score}%`;
            }
        }
    }
});