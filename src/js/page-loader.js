/* page-loader.js
   Purpose: Create engaging page loader with math tips and stickers
   Features: 
   - Animated loading screen with progress bar
   - Random math tips rotation
   - Sticker animations
   - Smooth page transitions
   - Immediate loading to prevent content flash
*/

// Immediate execution to prevent any content flash
(function() {
  // First: Create and show loader immediately
  let tipInterval;
  let loaderDuration = 4500; // Default duration
  
  // Detect navigation type and adjust timing
  const referrer = document.referrer;
  const currentPath = window.location.pathname;
  
  // Longer duration when coming from quiz pages to home
  if (referrer && (referrer.includes('addition') || referrer.includes('subtraction') || referrer.includes('mixed')) && 
      (currentPath === '/' || currentPath.includes('index'))) {
    loaderDuration = 6000; // 6 seconds for quiz-to-home navigation
  }
  
  const mathTips = [
    { text: "Did you know? Zero is the only number that is neither positive nor negative! 🤔", sticker: "/img/stickers/thinking.png" },
    { text: "Fun fact: A 'googol' is the number 1 followed by 100 zeros! 🤯", sticker: "/img/stickers/albedoThink.png" },
    { text: "Math magic: The word 'mathematics' comes from the Greek word 'mathema' meaning 'knowledge'! 📚", sticker: "/img/stickers/takingNotes.png" },
    { text: "Cool pattern: 111,111,111 × 111,111,111 = 12,345,678,987,654,321! ✨", sticker: "/img/stickers/sparkle.png" },
    { text: "Ancient wisdom: The equals sign (=) was invented in 1557! 📜", sticker: "/img/stickers/understood.png" },
    { text: "Shape fact: A circle has infinite corners and infinite sides! 🌀", sticker: "/img/stickers/furinaDismiss.png" },
    { text: "Number mystery: 40 is the only number whose letters are in alphabetical order! 🔤", sticker: "/img/stickers/enaHappy.png" },
    { text: "Pizza math: A pizza with radius 'z' and thickness 'a' has volume π×z×z×a! 🍕", sticker: "/img/stickers/mualaniPeace.png" },
    { text: "Speed fact: Light travels 186,282 miles per second! That's super fast! ⚡", sticker: "/img/stickers/congratulate.png" },
    { text: "Pattern power: Every odd number is the difference between two consecutive squares! 🔢", sticker: "/img/stickers/cheery.png" }
  ];

  let currentTipIndex = 0;
  let tipRotationCount = 0;
  const maxTipRotations = 10;
  let usedTipIndices = []; // Track which tips have been shown

  function getRandomTipIndex() {
    const randomIndex = Math.floor(Math.random() * mathTips.length);
    currentTipIndex = randomIndex;
    usedTipIndices.push(randomIndex);
    tipRotationCount = 1; // Start counting from the first tip
    return randomIndex;
  }

  function createPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-0 transition-all duration-1000 ease-in-out';
    
    // Get current page's math symbol
    const pageIcon = getPageIcon();
    
    loader.innerHTML = `
      <!-- Custom CSS for smooth animations -->
      <style>
        @keyframes slideInFromTop {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromBottom {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInScale {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
      
      <!-- Floating background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-20 text-yellow-300 text-3xl animate-bounce transform transition-transform duration-1000 ease-out" style="animation-delay: 0s; animation-duration: 2s;">✨</div>
        <div class="absolute top-40 right-40 text-pink-300 text-2xl animate-pulse transform transition-transform duration-1000 ease-out" style="animation-delay: 1s; animation-duration: 2.5s;">🌟</div>
        <div class="absolute bottom-60 left-60 text-blue-300 text-xl animate-ping transform transition-transform duration-1000 ease-out" style="animation-delay: 2s; animation-duration: 3s;">💫</div>
        <div class="absolute bottom-40 right-60 text-green-300 text-2xl animate-bounce transform transition-transform duration-1000 ease-out" style="animation-delay: 1.5s; animation-duration: 2.2s;">⭐</div>
        <div class="absolute top-60 left-1/3 text-purple-300 text-lg animate-pulse transform transition-transform duration-1000 ease-out" style="animation-delay: 0.5s; animation-duration: 2.8s;">🎯</div>
        <div class="absolute bottom-80 right-1/3 text-orange-300 text-xl animate-bounce transform transition-transform duration-1000 ease-out" style="animation-delay: 2.5s; animation-duration: 2.3s;">🎪</div>
      </div>

      <!-- Main loader content -->
      <div class="relative z-10 text-center max-w-2xl mx-auto px-8">
        <!-- Logo and title -->
        <div class="mb-8 transform transition-all duration-1000 ease-out" style="animation: slideInFromTop 1s ease-out;">
          <div class="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-4xl animate-pulse mx-auto mb-4 shadow-2xl transform transition-transform duration-700 ease-out hover:scale-110">
            ${pageIcon}
          </div>
          <h1 class="text-4xl font-black text-white mb-2 drop-shadow-lg transform transition-all duration-800 ease-out">HappyMath</h1>
          <p class="text-white/80 text-lg transform transition-all duration-900 ease-out">Loading your math adventure...</p>
        </div>

        <!-- Progress bar -->
        <div class="w-full bg-white/20 rounded-full h-4 overflow-hidden mx-auto mb-8 shadow-inner transform transition-all duration-1000 ease-out" style="animation: slideInFromLeft 1.2s ease-out;">
          <div id="loader-progress" class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-4 w-0 transition-all duration-1000 ease-out shadow-lg"></div>
        </div>

        <!-- Tip section -->
        <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-1200 ease-out" style="animation: slideInFromBottom 1.5s ease-out;">
          <div class="flex items-center justify-center space-x-8 mb-6">
            <img id="tip-sticker" src="${mathTips[getRandomTipIndex()].sticker}" alt="tip" class="w-20 h-20 animate-bounce transform transition-all duration-500 ease-out" />
            <h3 class="text-xl font-bold text-white transform transition-all duration-600 ease-out">💡 Math Tip</h3>
          </div>
          <p id="tip-text" class="text-white/90 text-lg font-medium leading-relaxed transform transition-all duration-700 ease-out">${mathTips[currentTipIndex].text}</p>
        </div>

        <!-- Loading dots -->
        <div class="flex justify-center space-x-2 mt-8 transform transition-all duration-1300 ease-out" style="animation: slideInFromBottom 1.8s ease-out;">
          <div class="w-3 h-3 bg-white/60 rounded-full animate-bounce transition-all duration-300 ease-out" style="animation-delay: 0s;"></div>
          <div class="w-3 h-3 bg-white/60 rounded-full animate-bounce transition-all duration-300 ease-out" style="animation-delay: 0.2s;"></div>
          <div class="w-3 h-3 bg-white/60 rounded-full animate-bounce transition-all duration-300 ease-out" style="animation-delay: 0.4s;"></div>
        </div>
      </div>
    `;

    return loader;
  }

  function getPageIcon() {
    const path = window.location.pathname;
    if (path.includes('addition')) return '➕';
    if (path.includes('subtraction')) return '➖';
    if (path.includes('mixed')) return '🎲';
    return '🧮'; // Default for index
  }

  function rotateTip() {
    const tipSticker = document.getElementById('tip-sticker');
    const tipText = document.getElementById('tip-text');
    
    if (tipSticker && tipText && tipRotationCount < maxTipRotations) {
      // Get a random tip that hasn't been used yet
      let newTipIndex;
      if (usedTipIndices.length >= mathTips.length) {
        // All tips used, reset the used array
        usedTipIndices = [];
      }
      
      do {
        newTipIndex = Math.floor(Math.random() * mathTips.length);
      } while (usedTipIndices.includes(newTipIndex) && usedTipIndices.length < mathTips.length);
      
      usedTipIndices.push(newTipIndex);
      currentTipIndex = newTipIndex;
      tipRotationCount++;
      
      const tip = mathTips[currentTipIndex];
      
      // Enhanced smooth fade out with transform
      tipSticker.style.transition = 'all 0.4s ease-out';
      tipText.style.transition = 'all 0.4s ease-out';
      tipSticker.style.opacity = '0';
      tipSticker.style.transform = 'scale(0.8) translateY(-10px)';
      tipText.style.opacity = '0';
      tipText.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        tipSticker.src = tip.sticker;
        tipText.textContent = tip.text;
        
        // Enhanced smooth fade in with transform
        tipSticker.style.opacity = '1';
        tipSticker.style.transform = 'scale(1) translateY(0)';
        tipText.style.opacity = '1';
        tipText.style.transform = 'translateY(0)';
      }, 400);
    }
  }

  function animateProgress(duration = 4500) {
    const progressBar = document.getElementById('loader-progress');
    if (!progressBar) return;

    let progress = 0;
    const increment = 100 / (duration / 50);
    
    const interval = setInterval(() => {
      progress += increment;
      progressBar.style.width = Math.min(progress, 100) + '%';
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 50);
  }

  function showLoader(duration = 3000, autoHide = false) {
    const existingLoader = document.getElementById('page-loader');
    if (existingLoader) {
      existingLoader.remove();
    }

    // Reset tip rotation variables for new loader session
    tipRotationCount = 0;
    usedTipIndices = [];

    const loader = createPageLoader();
    
    // Immediately hide page content once loader is created
    const hideStyle = document.createElement('style');
    hideStyle.id = 'page-loader-hide-style';
    hideStyle.textContent = `
      body > *:not(#page-loader) { opacity: 0 !important; visibility: hidden !important; }
      #page-loader { opacity: 1 !important; visibility: visible !important; z-index: 99999 !important; }
    `;
    
    // Ensure loader appears immediately, even if body doesn't exist
    function appendLoader() {
      if (document.body) {
        document.body.appendChild(loader);
        document.head.appendChild(hideStyle);
        // Smooth entrance animation
        requestAnimationFrame(() => {
          loader.style.opacity = '1';
          loader.style.transform = 'scale(1)';
        });
      } else {
        // If body doesn't exist, create loader and wait for body
        if (document.documentElement) {
          document.documentElement.appendChild(loader);
          if (document.head) {
            document.head.appendChild(hideStyle);
          }
          // Move to body when it becomes available
          const checkBody = setInterval(() => {
            if (document.body && !document.body.contains(loader)) {
              document.body.appendChild(loader);
              if (!document.head.contains(hideStyle)) {
                document.head.appendChild(hideStyle);
              }
              clearInterval(checkBody);
            }
          }, 10);
        }
        // Smooth entrance animation
        requestAnimationFrame(() => {
          loader.style.opacity = '1';
          loader.style.transform = 'scale(1)';
        });
      }
    }
    
    appendLoader();
    
    // Start progress animation with minimal delay for faster start
    setTimeout(() => animateProgress(duration), 100);
    
    // Rotate tips every 2.5 seconds for smoother experience
    const tipInterval = setInterval(rotateTip, 2500);
    
    // Only auto-hide if specified (for manual control)
    if (autoHide) {
      setTimeout(() => {
        clearInterval(tipInterval);
        loader.style.transition = 'all 0.8s ease-in-out';
        loader.style.opacity = '0';
        loader.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (loader.parentNode && loader.parentNode.contains(loader)) {
            loader.parentNode.removeChild(loader);
          }
        }, 800);
      }, duration);
    }
    
    // Return interval ID for manual cleanup
    return tipInterval;
  }

  // Show loader immediately when script loads
  tipInterval = showLoader(loaderDuration, false);
  
  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    const existingLoader = document.getElementById('page-loader');
    if (existingLoader) {
      // Clear the tip rotation interval
      if (tipInterval) {
        clearInterval(tipInterval);
      }
      
      // Minimum display time based on navigation type
      const minDisplayTime = loaderDuration > 5000 ? 1200 : 800;
      
      // Ensure minimum display time for smooth UX, then hide
      setTimeout(() => {
        if (existingLoader && existingLoader.parentNode) {
          // Start smooth transition: fade out loader while fading in content
          existingLoader.style.transition = 'all 0.8s ease-in-out';
          existingLoader.style.opacity = '0';
          existingLoader.style.transform = 'scale(0.95)';
          
          // Remove hiding style to allow content to become visible
          const hideStyle = document.getElementById('page-loader-hide-style');
          if (hideStyle) {
            // Update style to show content with transition
            hideStyle.textContent = `
              body > *:not(#page-loader) { opacity: 1 !important; visibility: visible !important; transition: opacity 0.8s ease-in-out !important; }
              #page-loader { opacity: 0 !important; }
            `;
          }
          
          setTimeout(() => {
            // Remove loader and cleanup
            if (existingLoader && existingLoader.parentNode && existingLoader.parentNode.contains(existingLoader)) {
              existingLoader.parentNode.removeChild(existingLoader);
            }
            // Remove hiding style completely
            if (hideStyle) {
              hideStyle.remove();
            }
          }, 800);
        }
      }, minDisplayTime);
    }
  });

  // Expose functions globally
  window.PageLoader = {
    show: showLoader,
    mathTips: mathTips
  };

  // Fallback: Ensure content is always visible after 10 seconds
  setTimeout(() => {
    const hideStyle = document.getElementById('page-loader-hide-style');
    if (hideStyle) {
      hideStyle.remove();
    }
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
    // Ensure all content is visible
    const allElements = document.querySelectorAll('body > *:not(#page-loader)');
    allElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
  }, 10000); // 10 second failsafe

})();