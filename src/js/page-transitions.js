// Page Transition Animations and Interactive Effects
class HappyMathTransitions {
    constructor() {
        this.initializePageAnimations();
        this.setupWelcomeAnimations();
        this.addNavigationTransitions();
    }

    // Initialize page load animations
    initializePageAnimations() {
        // Add fade-in animation to body
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Animate on page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            }, 100);
        });

        // Immediate fade-in if already loaded
        if (document.readyState === 'complete') {
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Setup welcome animations for specific elements
    setupWelcomeAnimations() {
        // Animate logo with bounce effect
        setTimeout(() => {
            const logos = document.querySelectorAll('.logo-container, .nav-logo');
            logos.forEach((logo, index) => {
                if (logo) {
                    logo.style.animation = `welcomeBounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s both`;
                }
            });
        }, 300);

        // Animate navigation items
        setTimeout(() => {
            const navItems = document.querySelectorAll('.nav-link, .quiz-card');
            navItems.forEach((item, index) => {
                if (item) {
                    item.style.animation = `slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s both`;
                }
            });
        }, 500);

        // Add sparkle effects
        this.createSparkleEffects();
    }

    // Add smooth transitions for navigation links
    addNavigationTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href && href !== '#') {
                    this.transitionToPage(href);
                }
            });
        });
    }

    // Smooth transition to new page
    transitionToPage(href) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-logo">
                    <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-2xl relative">
                        <span class="absolute top-1 left-2 text-white text-sm font-bold animate-pulse">+</span>
                        <span class="absolute top-1 right-2 text-white text-sm font-bold animate-pulse" style="animation-delay: 0.5s;">−</span>
                        <span class="absolute bottom-1 left-2 text-white text-sm font-bold animate-pulse" style="animation-delay: 1s;">×</span>
                        <span class="absolute bottom-1 right-2 text-white text-sm font-bold animate-pulse" style="animation-delay: 1.5s;">÷</span>
                        <div class="bg-white/30 rounded px-2 py-1">
                            <span class="text-white font-bold text-sm">123</span>
                        </div>
                    </div>
                </div>
                <div class="transition-text">
                    <h3 class="text-2xl font-bold text-white mb-2">Preparing your math adventure...</h3>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                </div>
                <div class="floating-symbols">
                    <span class="symbol symbol-1">+</span>
                    <span class="symbol symbol-2">−</span>
                    <span class="symbol symbol-3">×</span>
                    <span class="symbol symbol-4">÷</span>
                    <span class="symbol symbol-5">123</span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate overlay in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        // Navigate after animation
        setTimeout(() => {
            window.location.href = href;
        }, 1200);
    }

    // Create sparkle effects for visual enhancement
    createSparkleEffects() {
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';
        sparkleContainer.innerHTML = `
            <div class="sparkle sparkle-1">✨</div>
            <div class="sparkle sparkle-2">⭐</div>
            <div class="sparkle sparkle-3">💫</div>
            <div class="sparkle sparkle-4">🌟</div>
            <div class="sparkle sparkle-5">✨</div>
        `;
        
        document.body.appendChild(sparkleContainer);

        // Animate sparkles periodically
        setInterval(() => {
            this.animateSparkles();
        }, 3000);
    }

    // Animate floating sparkles
    animateSparkles() {
        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach((sparkle, index) => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            const randomDelay = Math.random() * 2;
            
            sparkle.style.left = randomX + 'px';
            sparkle.style.top = randomY + 'px';
            sparkle.style.animationDelay = randomDelay + 's';
            sparkle.style.animation = 'none';
            
            setTimeout(() => {
                sparkle.style.animation = 'sparkleFloat 4s ease-in-out infinite';
            }, 10);
        });
    }

    // Add hover effects to interactive elements
    addInteractiveEffects() {
        // Enhanced hover effects for buttons and cards
        const interactiveElements = document.querySelectorAll('.quiz-card, .nav-link, button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
                element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '';
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new HappyMathTransitions();
});


const style = document.createElement('style');
style.textContent = `
    /* Page transition overlay */
    .transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .transition-content {
        text-align: center;
        position: relative;
    }

    .transition-logo {
        margin-bottom: 2rem;
        animation: logoSpin 2s linear infinite;
    }

    .transition-text h3 {
        background: linear-gradient(45deg, #ffffff, #fbbf24, #f97316);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: textGlow 2s ease-in-out infinite alternate;
    }

    .loading-bar {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin: 1rem auto;
        overflow: hidden;
    }

    .loading-progress {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #fbbf24, #f97316, #dc2626);
        border-radius: 2px;
        animation: loadingProgress 1.2s ease-in-out infinite;
    }

    .floating-symbols {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .symbol {
        position: absolute;
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.6);
        animation: floatSymbol 3s ease-in-out infinite;
    }

    .symbol-1 { top: 20%; left: 20%; animation-delay: 0s; }
    .symbol-2 { top: 30%; right: 20%; animation-delay: 0.5s; }
    .symbol-3 { bottom: 30%; left: 15%; animation-delay: 1s; }
    .symbol-4 { bottom: 20%; right: 15%; animation-delay: 1.5s; }
    .symbol-5 { top: 50%; left: 50%; animation-delay: 2s; transform: translate(-50%, -50%); }

    /* Sparkle effects */
    .sparkle-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    }

    .sparkle {
        position: absolute;
        font-size: 1.5rem;
        opacity: 0;
        animation: sparkleFloat 4s ease-in-out infinite;
    }

    /* Keyframe animations */
    @keyframes welcomeBounce {
        0% { transform: translateY(-20px) scale(0.8); opacity: 0; }
        60% { transform: translateY(5px) scale(1.1); opacity: 1; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
    }

    @keyframes slideInUp {
        0% { transform: translateY(30px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
    }

    @keyframes logoSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes textGlow {
        0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
        100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(251, 191, 36, 0.5); }
    }

    @keyframes loadingProgress {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
    }

    @keyframes floatSymbol {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }

    @keyframes sparkleFloat {
        0% { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.5); }
        25% { opacity: 1; transform: translateY(-10px) rotate(90deg) scale(1); }
        50% { opacity: 0.8; transform: translateY(-20px) rotate(180deg) scale(1.2); }
        75% { opacity: 0.6; transform: translateY(-15px) rotate(270deg) scale(1); }
        100% { opacity: 0; transform: translateY(-30px) rotate(360deg) scale(0.5); }
    }

    /* Enhanced hover effects */
    .quiz-card, .nav-link, button {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;

document.head.appendChild(style);