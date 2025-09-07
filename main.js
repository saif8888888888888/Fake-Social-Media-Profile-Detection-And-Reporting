document.addEventListener('DOMContentLoaded', function() {
    // Platform selection
    const platformIcons = document.querySelectorAll('.platform-icon');
    platformIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            platformIcons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update placeholder based on platform
            const platform = this.getAttribute('data-platform');
            const urlInput = document.getElementById('profile-url');
            
            switch(platform) {
                case 'facebook':
                    urlInput.placeholder = 'https://www.facebook.com/username';
                    break;
                case 'twitter':
                    urlInput.placeholder = 'https://www.twitter.com/username';
                    break;
                case 'instagram':
                    urlInput.placeholder = 'https://www.instagram.com/username';
                    break;
                case 'tiktok':
                    urlInput.placeholder = 'https://www.tiktok.com/@username';
                    break;
            }
        });
    });
    
    // Form submission
    const form = document.getElementById('profile-check-form');
    const results = document.getElementById('results');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        submitBtn.disabled = true;
        
        // Get form data
        const profileUrl = document.getElementById('profile-url').value;
        const additionalContext = document.getElementById('additional-context').value;
        const platform = document.querySelector('.platform-icon.active').getAttribute('data-platform');
        
        // API call to detect fake profile
        detectFakeProfile(profileUrl, platform, additionalContext)
            .then(data => {
                // Display results
                displayResults(data);
                
                // Scroll to results
                results.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while analyzing the profile. Please try again.');
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
    
    // Function to detect fake profile using API
    async function detectFakeProfile(url, platform, context) {
        // This would be replaced with your actual API endpoint
        const API_URL = 'https://your-api-endpoint.com/detect';
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real implementation, you would use fetch or axios
            /*
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    platform: platform,
                    context: context
                })
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            return await response.json();
            */
            
            // Simulated response for demonstration
            return simulateApiResponse(platform);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    // Function to display results
    function displayResults(data) {
        const results = document.getElementById('results');
        const scoreElement = document.querySelector('.profile-score');
        const riskFactorsContainer = document.querySelector('.risk-factors');
        
        // Update score
        scoreElement.textContent = `${data.score}% Fake`;
        
        // Update score color
        if (data.score >= 70) {
            scoreElement.className = 'profile-score score-high';
        } else if (data.score >= 40) {
            scoreElement.className = 'profile-score score-medium';
        } else {
            scoreElement.className = 'profile-score score-low';
        }
        
        // Update risk factors
        riskFactorsContainer.innerHTML = '';
        data.riskFactors.forEach(factor => {
            const riskElement = document.createElement('div');
            riskElement.className = 'risk-factor';
            riskElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>${factor}</span>
            `;
            riskFactorsContainer.appendChild(riskElement);
        });
        
        // Show results
        results.style.display = 'block';
        
        // Store results for dashboard
        localStorage.setItem('profileAnalysis', JSON.stringify(data));
    }
    
    // Simulate API response based on platform
    function simulateApiResponse(platform) {
        let score, riskFactors;
        
        switch(platform) {
            case 'facebook':
                score = Math.floor(Math.random() * 20) + 70; // 70-90%
                riskFactors = [
                    "Profile has very few friends",
                    "Recent account creation date",
                    "Limited profile information",
                    "Suspicious posting patterns",
                    "Profile picture appears stock or stolen",
                    "No tagged photos with others",
                    "Limited engagement on posts"
                ];
                break;
            case 'twitter':
                score = Math.floor(Math.random() * 30) + 60; // 60-90%
                riskFactors = [
                    "High follower-to-following ratio",
                    "Repetitive content patterns",
                    "Suspicious account name",
                    "Recently created account",
                    "Mostly retweets with little original content",
                    "Spammy posting behavior"
                ];
                break;
            case 'instagram':
                score = Math.floor(Math.random() * 25) + 65; // 65-90%
                riskFactors = [
                    "Low engagement on posts",
                    "Stock photo profile picture",
                    "Inconsistent posting history",
                    "Few personal photos",
                    "High number of hashtags with little context",
                    "Follower count seems inflated"
                ];
                break;
            case 'tiktok':
                score = Math.floor(Math.random() * 35) + 55; // 55-90%
                riskFactors = [
                    "Content copied from other accounts",
                    "Suspicious commenting patterns",
                    "Recently created account",
                    "Inconsistent video quality",
                    "Low view count despite high follower count",
                    "Generic or repetitive content"
                ];
                break;
            default:
                score = Math.floor(Math.random() * 65) + 30; // 30-95%
                riskFactors = [
                    "Profile has very few friends/followers",
                    "Account was created very recently",
                    "Limited personal information provided",
                    "Profile picture appears stock or stolen"
                ];
        }
        
        return {
            score: score,
            riskFactors: riskFactors,
            platform: platform,
            timestamp: new Date().toISOString()
        };
    }
});