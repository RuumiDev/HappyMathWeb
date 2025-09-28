
// HappyMath Interactive Features

document.addEventListener("DOMContentLoaded", function() {
  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  document.body.style.background = 'transparent';
  
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Remove any progress bars that might exist
    const progressBars = document.querySelectorAll('#scroll-progress, [id*="progress"]');
    progressBars.forEach(bar => bar.remove());
  });

  // Prevent white flashes and ensure smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  document.body.style.scrollBehavior = 'smooth';
  
  // Remove any white backgrounds that might appear
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.style && node.style.backgroundColor === 'white') {
              node.style.backgroundColor = 'transparent';
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Add confetti effect function
  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.innerHTML = ['🎉', '✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.fontSize = '20px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.animation = 'confettiFall 3s linear forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }

  // Add confetti CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Trigger confetti on button clicks
  document.querySelectorAll('button, .btn').forEach(button => {
    button.addEventListener('click', function(e) {
      if (!e.target.closest('.modal')) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createConfetti(), i * 100);
        }
      }
    });
  });

  // Add math facts ticker
  const mathFacts = [
    "🧮 Did you know? Zero is both positive and negative!",
    "📊 Fun fact: A googol has 100 zeros!",
    "🎯 Amazing: Pi has been calculated to over 31 trillion digits!",
    "⭐ Cool: The word 'mathematics' comes from Greek meaning 'learning'!",
    "🌟 Wow: There are more ways to arrange a deck of cards than atoms on Earth!"
  ];

  let factIndex = 0;
  
  function showMathFact() {
    const factElement = document.createElement('div');
    factElement.innerHTML = mathFacts[factIndex];
    factElement.style.position = 'fixed';
    factElement.style.bottom = '100px';
    factElement.style.right = '20px';
    factElement.style.background = 'rgba(255, 255, 255, 0.9)';
    factElement.style.padding = '15px 20px';
    factElement.style.borderRadius = '25px';
    factElement.style.fontSize = '14px';
    factElement.style.fontWeight = 'bold';
    factElement.style.color = '#333';
    factElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    factElement.style.zIndex = '999';
    factElement.style.transform = 'translateX(100%)';
    factElement.style.transition = 'transform 0.5s ease';
    factElement.style.maxWidth = '300px';
    factElement.style.cursor = 'pointer';
    
    document.body.appendChild(factElement);
    
    setTimeout(() => {
      factElement.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      factElement.style.transform = 'translateX(100%)';
      setTimeout(() => {
        factElement.remove();
      }, 500);
    }, 4000);
    
    factElement.addEventListener('click', () => {
      factElement.style.transform = 'translateX(100%)';
      setTimeout(() => {
        factElement.remove();
      }, 500);
    });
    
    factIndex = (factIndex + 1) % mathFacts.length;
  }

  // Show math facts every 10 seconds
  setInterval(showMathFact, 10000);
  
  // Show first fact after 3 seconds
  setTimeout(showMathFact, 3000);

  // Add number counter animation
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }

  // Header transparency based on scroll
  const header = document.getElementById('main-header');
  
  function updateHeaderTransparency() {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight * 0.8; // 80% of viewport height
    
    if (scrollY < heroHeight) {
      // In hero section - completely transparent
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.borderBottom = 'none';
    } else {
      // Past hero section - add blur and background
      header.style.background = 'rgba(255, 255, 255, 0.1)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
    }
  }

  // Add interactive elements on scroll
  let hasAnimatedCounters = false;
  
  window.addEventListener('scroll', () => {
    // Update header transparency
    updateHeaderTransparency();
    
    // Animate counters when they come into view
    if (!hasAnimatedCounters && window.scrollY > 200) {
      hasAnimatedCounters = true;
      // You can add counter elements here if needed
    }
    
    // Scroll progress tracking (without visual indicator)
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Remove any existing progress bar
    const existingProgressBar = document.getElementById('scroll-progress');
    if (existingProgressBar) {
      existingProgressBar.remove();
    }
  });

  // Add Easter egg - Konami code
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Easter egg activated!
        for (let i = 0; i < 50; i++) {
          setTimeout(() => createConfetti(), i * 50);
        }
        
        const message = document.createElement('div');
        message.innerHTML = '🎉 MATH MASTER ACTIVATED! 🎉';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        message.style.color = 'white';
        message.style.padding = '20px 40px';
        message.style.borderRadius = '20px';
        message.style.fontSize = '24px';
        message.style.fontWeight = 'bold';
        message.style.textAlign = 'center';
        message.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        message.style.zIndex = '10000';
        message.style.animation = 'bounce 1s ease infinite';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
          message.remove();
        }, 3000);
        
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Add click sound effect (visual feedback)
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn') || e.target.tagName === 'A') {
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      const rect = e.target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      e.target.style.position = 'relative';
      e.target.style.overflow = 'hidden';
      e.target.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });

  // Add ripple effect CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
});

