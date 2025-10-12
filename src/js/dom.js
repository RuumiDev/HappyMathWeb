/* ==========================================
   dom.js - Tempat Buat Tampilan Quiz! 
   ==========================================
   
   File ni buat semua benda yang user nampak on screen!
   
   APA DIA BUAT?
   - Tunjuk soalan on screen
   - Bila user click, tahu apa user buat
   - Tukar color/show message bila jawab
   - Reset quiz bila nak main lagi
   
   FUNCTIONS DALAM NI:
   - initializeQuiz() - Start quiz
   - renderQuestionCard() - Tunjuk soalan
   - CheckAnswer() - Check jawapan bila submit
   - TakeQuizAgain() - Main lagi
   - updateSubmitButtonState() - Enable/disable button
*/

(function () {
  
  // ========== SIMPAN BUTTON & CONTAINER ==========
  // Cari button/container sekali je, lepas tu guna berkali-kali
  // Lagi pantas dari cari berulang kali!
  //
  const questionsContainer = document.getElementById('questions-container');
  const submitBtn = document.getElementById('submit-answer');
  const nextBtn = document.getElementById('next-question');
  const currentQSpan = document.getElementById('current-question');
  const totalQSpan = document.getElementById('total-questions');
  const timerSpan = document.getElementById('timer');
  const resultSummary = document.getElementById('result-summary');
  const scoreFill = document.getElementById('score-fill');
  const correctCountSpan = document.getElementById('correct-count');
  const totalQSpan2 = document.getElementById('total-questions-2');
  const resultSticker = document.getElementById('result-sticker');
  const retakeBtn = document.getElementById('retake-quiz');
  const resultMessage = document.getElementById('result-message');

  // ========== VARIABLES UNTUK TRACK STATE ==========
  // Variables ni simpan info pasal quiz - macam mana progress sekarang
  //
  let quizType = document.querySelector('[data-quiz]')?.dataset?.quiz || 'addition';  // Jenis quiz apa
  let quizArray = [];  // Soalan asal
  let shuffledQuestions = [];  // Soalan dah shuffle
  let userAnswers = [];  // Jawapan user
  const TOTAL_QUESTIONS = 6;  // Ada 6 soalan

  // ========== FUNCTION: updateSubmitButtonState() ==========
  // Apa dia buat? Enable/disable submit button
  //
  // Kalau dah jawab semua, button boleh click! Kalau belum, tak boleh click!
  //
  function updateSubmitButtonState() {
    
    // Check dah jawab semua ke belum
    const validation = QuizFns.validateAllAnswered(shuffledQuestions);
    
    // Kalau dah jawab semua
    if (validation.allAnswered) {
      submitBtn.disabled = false;  // Boleh click!
      submitBtn.textContent = '✨ Submit Answer';
      submitBtn.className = submitBtn.className.replace(/opacity-50/, 'opacity-100');
    } 
    // Kalau belum jawab semua
    else {
      submitBtn.disabled = true;  // Tak boleh click!
      submitBtn.textContent = `📝 Answer All Questions (${validation.answeredCount}/${validation.totalCount})`;
      
      if (!submitBtn.className.includes('opacity-50')) {
        submitBtn.className += ' opacity-50';
      }
    }
  }

  // ========== FUNCTION: initializeQuiz() ==========
  // Apa dia buat? Start quiz dari mula!
  //
  // Bila guna? Bila page load first time, atau bila click "Main Lagi"
  //
  function initializeQuiz(type) {
    
    // Step 1: Ambil jenis quiz apa (addition/subtraction/mixed)
    quizType = type || quizType;
    
    // Step 2: Ambil soalan dari QUIZ_DATA
    quizArray = (window.QUIZ_DATA && window.QUIZ_DATA[quizType]) ? [...window.QUIZ_DATA[quizType]] : [];
    
    // Step 3: Pastikan ada 6 soalan je
    quizArray.length = TOTAL_QUESTIONS;

    // Step 4: Shuffle soalan & reset jawapan
    shuffledQuestions = QuizFns.shuffleArray([...quizArray]);
    userAnswers = Array(shuffledQuestions.length).fill(null);

    // Step 5: Update nombor soalan kat atas
    currentQSpan.textContent = 1;
    totalQSpan.textContent = shuffledQuestions.length;
    totalQSpan2.textContent = shuffledQuestions.length;

    // Step 6: Reset semua benda
    questionsContainer.innerHTML = '';  // Buang soalan lama
    resultSummary.classList.add('hidden');  // Sorok result
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submit Answer';
    nextBtn.classList.add('hidden');

    // Step 7: Tunjuk semua soalan on screen
    shuffledQuestions.forEach((q, idx) => {
      const card = renderQuestionCard(q, idx);
      questionsContainer.appendChild(card);
    });
    
    // Step 8: Check button state
    updateSubmitButtonState();
    
  }

  // ========== FUNCTION: renderQuestionCard() ==========
  // Apa dia buat? Buat HTML untuk satu soalan
  //
  // Macam buat kad soalan - ada gambar, choices A/B/C/D!
  //
  function renderQuestionCard(q, idx) {
    
    // Buat kotak card
    const cardWrap = document.createElement('div');
    cardWrap.className = 'relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden';
    
    // Tambah sparkle ✨
    const sparkleDecor = document.createElement('div');
    sparkleDecor.className = 'absolute top-4 left-4 text-yellow-300 text-xl animate-pulse';
    sparkleDecor.textContent = '✨';
    cardWrap.appendChild(sparkleDecor);

    // Tambah badge "Question 1", "Question 2"...
    const questionBadge = document.createElement('div');
    questionBadge.className = 'absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg';
    questionBadge.textContent = `Question ${idx + 1}`;
    cardWrap.appendChild(questionBadge);

    // Buat container untuk gambar
    const imgContainer = document.createElement('div');
    imgContainer.className = 'bg-white/90 rounded-2xl p-6 mb-6 shadow-inner';
    
    // Letak gambar soalan
    const img = document.createElement('img');
    img.src = q.image || '/img/addition/1.png';
    img.alt = `Question ${idx + 1} visual`;
    img.className = 'mx-auto w-full max-w-2xl rounded-xl object-contain drop-shadow-lg';
    imgContainer.appendChild(img);
    cardWrap.appendChild(imgContainer);

    // Letak text soalan (contoh: "1 + 1")
    const qText = document.createElement('h3');
    qText.id = `q${idx + 1}_text`;
    qText.className = 'text-3xl font-black text-white mb-6 text-center drop-shadow-lg bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent';
    qText.textContent = q.question || '';
    cardWrap.appendChild(qText);

    // Buat feedback area (sorok dulu, tunjuk bila submit)
    const feedbackArea = document.createElement('div');
    feedbackArea.id = `q${idx + 1}_feedback`;
    feedbackArea.className = 'hidden absolute top-16 right-6 flex items-center space-x-6 bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 shadow-xl transform scale-0 transition-all duration-500';
    feedbackArea.innerHTML = `
      <img class="w-12 h-12 animate-bounce" src="" alt="feedback" />
      <span class="text-white font-bold text-base drop-shadow"></span>
    `;
    cardWrap.appendChild(feedbackArea);

    // Buat grid untuk 4 choices (A, B, C, D)
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    // Loop buat 4 choices
    for (let i = 0; i < 4; i++) {
      
      // Buat button untuk satu choice
      const optionLabel = document.createElement('label');
      const inputId = `q${idx + 1}_choice_${i}`;
      const inputName = `q${idx + 1}`;
      optionLabel.className = 'answer-option relative flex flex-col items-center justify-center bg-gradient-to-br from-white/12 to-white/6 text-white py-8 px-6 rounded-2xl border-2 border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-white/20 hover:to-white/10 min-h-[100px] group';
      optionLabel.setAttribute('data-choice-index', i);

      // Buat radio button (sorok, user tak nampak)
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = inputId;
      input.name = inputName;
      input.value = i;
      input.className = 'sr-only answer-radio';

      // Buat badge letter (A, B, C, D)
      const letter = document.createElement('span');
      letter.className = 'absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200';
      letter.textContent = ['A', 'B', 'C', 'D'][i];

      // Buat text jawapan (contoh: "1", "2", "3", "4")
      const text = document.createElement('span');
      text.className = 'text-2xl font-bold drop-shadow-lg group-hover:scale-105 transition-transform duration-200';
      text.textContent = q.choices[i] || '';

      // Buat selection ring (border bila user click)
      const selectionRing = document.createElement('div');
      selectionRing.className = 'absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-200';

      // Letak semua dalam label
      optionLabel.appendChild(input);
      optionLabel.appendChild(letter);
      optionLabel.appendChild(text);
      optionLabel.appendChild(selectionRing);

      // Bila user click, highlight choice ni
      optionLabel.addEventListener('click', () => {
        
        // Buang highlight dari semua choices
        const siblingLabels = optionLabel.parentElement.querySelectorAll('label');
        siblingLabels.forEach(l => {
          l.classList.remove('ring-4', 'ring-blue-400', 'bg-blue-500/30');
          const ring = l.querySelector('div:last-child');
          if (ring) ring.className = 'absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-200';
        });
        
        // Tambah highlight kat choice ni
        optionLabel.classList.add('ring-4', 'ring-blue-400', 'bg-blue-500/30');
        selectionRing.className = 'absolute inset-0 rounded-2xl border-4 border-blue-400 transition-all duration-200 animate-pulse';
        
        // Tick radio button
        input.checked = true;
        
        // Update submit button
        updateSubmitButtonState();
      });

      // Keyboard support (tekan Enter/Space pun boleh!)
      optionLabel.tabIndex = 0;
      optionLabel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          optionLabel.click();
        }
      });

      // Letak choice dalam grid
      optionsGrid.appendChild(optionLabel);
      
    }

    // Letak grid dalam card
    cardWrap.appendChild(optionsGrid);

    return cardWrap;  // Dah siap card!
    
  }

  // ========== FUNCTION: CheckAnswer() ==========
  // Apa dia buat? Check jawapan bila user click Submit
  //
  // Workflow:
  // 1. Kumpul semua jawapan
  // 2. Highlight betul (green) dan salah (red)
  // 3. Tunjuk feedback untuk setiap soalan
  // 4. Kira markah total
  // 5. Tunjuk result screen dengan sticker!
  //
  function CheckAnswer() {
    
    // Collect semua jawapan user
    // Collect semua jawapan user
    for (let qi = 0; qi < shuffledQuestions.length; qi++) {
      const name = `q${qi + 1}`;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      userAnswers[qi] = checked ? parseInt(checked.value, 10) : null;
    }

    // Tunjuk feedback untuk setiap soalan
    for (let qi = 0; qi < shuffledQuestions.length; qi++) {
      
      const q = shuffledQuestions[qi];
      const card = questionsContainer.children[qi];
      const labels = card.querySelectorAll('label');
      
      const feedbackArea = card.querySelector(`#q${qi + 1}_feedback`);
      const feedbackImg = feedbackArea.querySelector('img');
      const feedbackText = feedbackArea.querySelector('span');
      
      const selected = userAnswers[qi];
      const hasAnswer = selected !== null && selected !== undefined;
      const isCorrect = hasAnswer && selected === q.answer;
      
      // ----- Get feedback data from business logic (functions.js) -----
      // Returns object: {sticker, message, bgClass, borderClass}
      const feedback = QuizFns.getFeedbackForAnswer(isCorrect, hasAnswer);
      
      // ----- Process each option label -----
      labels.forEach(label => {
        const idx = parseInt(label.getAttribute('data-choice-index'), 10);
        const input = label.querySelector('input');
        
        // Disable radio button (prevent changes after submission)
        if (input) input.disabled = true;
        
        // Remove previous selection styling (blue rings)
        label.classList.remove('ring-4', 'ring-blue-400', 'bg-blue-500/30');
        const ring = label.querySelector('div:last-child');
        if (ring) ring.className = 'absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-200';
        
        // Highlight CORRECT answer in GREEN (always show correct answer!)
        // This helps student learn even if they got it wrong
        if (idx === q.answer) {
          label.classList.add('bg-green-600/90', 'border-green-400', 'ring-4', 'ring-green-400', 'shadow-green-400/50', 'shadow-xl');
        }
      });

      // ----- Highlight WRONG selection in RED (if user answered incorrectly) -----
      if (hasAnswer && !isCorrect) {
        // Find the label user selected (but was wrong)
        const wrongLabel = card.querySelector(`label[data-choice-index="${selected}"]`);
        if (wrongLabel) {
          // Add red styling (distinct from green correct answer)
          wrongLabel.classList.add('bg-red-600/90', 'border-red-400', 'ring-4', 'ring-red-400', 'shadow-red-400/50', 'shadow-xl');
        }
      }
      
      // ----- Show feedback area with sticker and message -----
      feedbackImg.src = feedback.sticker;           // Sticker image path
      feedbackText.textContent = feedback.message;   // "Great job!" or "Try again!"
      feedbackArea.classList.remove('hidden');       // Make visible
      feedbackArea.classList.add(feedback.bgClass, feedback.borderClass); // Color theme
      
      // ----- Animate feedback appearance dengan stagger effect -----
      // Stagger = delay based on question index (creates wave effect)
      // Q1 appears at 0ms, Q2 at 300ms, Q3 at 600ms, etc
      setTimeout(() => {
        feedbackArea.classList.remove('scale-0');  // Remove shrunk state
        feedbackArea.classList.add('scale-100');   // Pop to full size!
      }, qi * 300); // 300ms delay per question (0, 300, 600, 900, 1200, 1500)
    } // End of per-question feedback loop

    // ===== PHASE 3: CALCULATE FINAL SCORE =====
    // Use business logic from functions.js to compute results
    
    // Calculate how many questions were answered correctly
    // Returns object: {correctCount: 4, total: 6}
    const { correctCount, total } = QuizFns.calculateScore(userAnswers, shuffledQuestions);
    
    // Update score display numbers
    correctCountSpan.textContent = correctCount; // "4"
    totalQSpan2.textContent = total;             // "6"
    
    // Calculate percentage (rounded to whole number)
    // Example: 4/6 = 0.6667 * 100 = 66.67 -> rounds to 67%
    const percent = Math.round((correctCount / total) * 100);
    
    // Update progress bar fill width
    // Example: 4/6 = 66.67% -> bar fills 66.67% of container
    scoreFill.style.width = `${(correctCount / total) * 100}%`;
    
    // ===== PHASE 4: SET RESULT STICKER & MESSAGE =====
    // Use business logic to get appropriate sticker and message
    
    resultSticker.src = QuizFns.getStickerPath(percent);        // Get sticker based on score
    resultMessage.textContent = QuizFns.getResultMessage(percent); // Get message based on score
    
    // ===== PHASE 5: ANIMATE RESULTS SECTION =====
    
    // ----- Sticker Animation: Bouncy Pop Effect -----
    resultSticker.classList.remove('scale-90', 'opacity-0');
    
    // Custom easing: cubic-bezier creates bouncy/springy effect
    // (0.68, -0.55, 0.265, 1.55) = overshoot and bounce back
    resultSticker.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    resultSticker.classList.add('scale-110'); // Enlarge slightly
    
    // Secondary animation: scale back to normal after bounce
    setTimeout(() => {
      resultSticker.style.transform = 'scale(1)'; // Return to 100% size
    }, 600); // 600ms = same duration as transition
    
    // ----- Message Animation: Slide Up & Fade In -----
    resultMessage.style.transition = 'all 0.5s ease-out';
    resultMessage.style.transform = 'translateY(20px)'; // Start 20px below
    resultMessage.style.opacity = '0';                  // Start invisible
    
    // Animate to final position
    setTimeout(() => {
      resultMessage.style.transform = 'translateY(0)'; // Move to normal position
      resultMessage.style.opacity = '1';                // Fade to fully visible
    }, 300); // Slight delay (0.3s) so sticker appears first
    
    // NOTE: The message content is already set by getResultMessage() above
    // This duplicate code below is legacy (should be removed but kept for safety)
    // The actual message comes from QuizFns.getResultMessage(percent)
    if (percent >= 95) {
      resultMessage.textContent = 'Perfect! You are a math champion! 🏆';
    } else if (percent >= 80) {
      resultMessage.textContent = 'Excellent work! You really know your math! ⭐';
    } else if (percent >= 60) {
      resultMessage.textContent = 'Good job! Keep practicing to get even better! 👍';
    } else if (percent >= 40) {
      resultMessage.textContent = 'Nice try! Practice more and you\'ll improve! 🌟';
    } else {
      resultMessage.textContent = 'Keep learning! Every mistake helps you grow! 💪';
    }
    
    // ----- Make Results Section Visible -----
    resultSummary.classList.remove('hidden'); // Remove Tailwind hidden class

    // ===== PHASE 6: SCROLL TO RESULTS =====
    // Auto-scroll so user sees their achievement without manual scrolling
    setTimeout(() => {
      resultSummary.scrollIntoView({ 
        behavior: 'smooth',  // Smooth animated scroll (not instant jump)
        block: 'center',     // Align results to center of viewport
        inline: 'nearest'    // Horizontal alignment (usually not needed)
      });
    }, 500); // 500ms delay - let per-question animations finish first

    // NOTE: Not using progress bar here because all questions shown at once
    // Progress tracking happens in updateSubmitButtonState() instead

    // ===== PHASE 7: DISABLE SUBMIT BUTTON =====
    // Prevent user from clicking Submit again (already submitted!)
    submitBtn.disabled = true;
    
  } // End of CheckAnswer()

  // ==================== FUNCTION: TakeQuizAgain() ====================
  // PURPOSE: Reset quiz and start fresh attempt with loading animation
  //
  // USER FLOW:
  // User sees results -> clicks "Retake Quiz" -> loading overlay appears ->
  // -> questions re-shuffle -> quiz resets -> ready for new attempt!
  //
  // WHY LOADING OVERLAY?
  // - Gives visual feedback that something is happening
  // - Creates anticipation and engagement
  // - Hides the "flash" of questions being removed and re-rendered
  // - Professional UX (like real apps!)
  //
  // RESPONSIBILITIES:
  // 1. Hide results section
  // 2. Scroll to top of page
  // 3. Show animated loading overlay
  // 4. Prevent background scrolling during load
  // 5. Animate progress bar
  // 6. Call initializeQuiz() to reset
  // 7. Remove overlay after delay
  //
  // CALLED BY:
  // "Retake Quiz" button click event
  //
  /**
   * TakeQuizAgain() - Enhanced loading screen and quiz reset with better visual design
   * - Shows animated loading overlay with confetti and engaging elements
   * - Manages background scroll prevention and smooth transitions
   * - Resets quiz state and reshuffles questions using business logic
   */
  function TakeQuizAgain() {
    
    // ===== STEP 1: HIDE RESULTS =====
    // Remove previous results from view
    resultSummary.classList.add('hidden');
    
    // ===== STEP 2: SCROLL TO TOP =====
    // Ensure loading overlay and fresh quiz visible (not buried below)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // ===== STEP 3: CREATE LOADING OVERLAY =====
    // Build overlay element programmatically (like renderQuestionCard approach)
    const overlay = document.createElement('div');
    overlay.id = 'retake-overlay'; // ID for potential future reference
    
    // Styling: Full-screen fixed overlay dengan high z-index
    // z-[9999] ensures it appears above EVERYTHING (even modals!)
    // fixed inset-0 = cover entire viewport
    // opacity-0 initially (will fade in)
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md opacity-0 transition-opacity duration-500';
    
    // ----- Floating decorative elements (animated emojis) -----
    // Creates playful, engaging atmosphere during loading
    const floatingElements = `
      <div class="absolute top-20 left-20 text-yellow-300 text-2xl animate-bounce">🌟</div>
      <div class="absolute top-32 right-32 text-pink-300 text-xl animate-pulse">✨</div>
      <div class="absolute bottom-40 left-40 text-blue-300 text-lg animate-ping">🎯</div>
      <div class="absolute bottom-20 right-20 text-green-300 text-xl animate-bounce">🎉</div>
    `;
    
    // ----- Main overlay content using template literals -----
    // Uses innerHTML for complex nested structure (easier than createElement spam)
    overlay.innerHTML = `
      ${floatingElements}
      <div class="relative w-full max-w-lg bg-gradient-to-br from-white/20 to-white/10 rounded-3xl p-10 text-center border border-white/30 shadow-2xl backdrop-blur-sm">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl animate-pulse"></div>
        <div class="relative z-10">
          <div class="mb-6">
            <img src="/img/stickers/takingNotes.png" alt="loading" class="mx-auto w-56 h-56 animate-pulse drop-shadow-2xl" />
          </div>
          <h3 class="text-2xl font-bold text-white mb-6 drop-shadow-lg">🎲 Shuffling New Questions!</h3>
          <div class="w-full bg-white/20 rounded-full h-6 overflow-hidden mx-auto mb-6 shadow-inner">
            <div id="retake-progress" class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-6 w-0 transition-all duration-2000 shadow-lg"></div>
          </div>
          <p id="retake-tip" class="text-white/90 text-lg font-semibold animate-pulse">Get ready for your next challenge! 🚀</p>
        </div>
      </div>
    `;
    
    // ===== STEP 4: ADD OVERLAY TO PAGE =====
    // Append to body (not questionsContainer - needs to cover whole page!)
    document.body.appendChild(overlay);
    
    // Prevent background scrolling while overlay visible
    // User shouldn't be able to scroll behind the overlay
    document.body.style.overflow = 'hidden';
    
    // ===== STEP 5: FADE IN OVERLAY =====
    // requestAnimationFrame ensures DOM updated before animation starts
    // WHY? Without it, opacity-0 removal might happen instantly (no transition)
    requestAnimationFrame(() => overlay.classList.remove('opacity-0'));

    // ===== STEP 6: ANIMATE PROGRESS BAR =====
    // Slight delay before progress starts (looks more natural)
    setTimeout(() => { 
      const p = document.getElementById('retake-progress');
      if (p) p.style.width = '100%'; // Animate from 0% to 100%
    }, 200); // 200ms delay
    
    // ===== STEP 7: CLEANUP & REINITIALIZE =====
    // Keep overlay visible for 3 seconds (enough time to see animation)
    setTimeout(() => {
      
      // Remove overlay from DOM
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
      
      // Restore background scrolling
      document.body.style.overflow = ''; // Reset to default
      
      // Reinitialize quiz dengan shuffle!
      // This calls shuffleArray() inside, so questions randomized again
      initializeQuiz(quizType);
      
    }, 3000); // 3000ms = 3 seconds (balanced: not too fast, not too slow)
    
  } // End of TakeQuizAgain()

  // ==================== EVENT LISTENERS ====================
  // Attach event handlers to buttons
  //
  // WHY e.preventDefault()?
  // Prevents default button behavior (like form submission or page reload)
  // We handle everything via JavaScript, don't want browser default actions!
  //
  // PATTERN: Arrow function syntax
  // (e) => { ... } is same as: function(e) { ... }
  // But arrow functions are modern and concise!
  //
  
  // Submit button: Grade quiz when clicked
  submitBtn.addEventListener('click', (e) => { 
    e.preventDefault();  // Stop any default action
    CheckAnswer();       // Call grading function
  });
  
  // Retake button: Restart quiz when clicked
  retakeBtn.addEventListener('click', (e) => { 
    e.preventDefault();  // Stop any default action
    TakeQuizAgain();     // Call reset function
  });

  // ==================== EXPOSE TO GLOBAL SCOPE ====================
  // Make certain functions accessible outside this IIFE
  //
  // WHY EXPOSE?
  // Even though we use IIFE for privacy, some functions need to be called:
  // - From HTML onclick attributes (if any)
  // - From browser console (for debugging)
  // - From other scripts (if needed)
  //
  // PATTERN:
  // window.functionName = localFunction
  // This attaches function to global window object
  //
  window.CheckAnswer = CheckAnswer;       // Expose grading function
  window.TakeQuizAgain = TakeQuizAgain;   // Expose reset function
  window.initializeQuiz = initializeQuiz; // Expose initialization (for manual calls)

  // ==================== AUTO-INITIALIZE ON PAGE LOAD ====================
  // Start quiz automatically when DOM is ready
  //
  // DOMContentLoaded EVENT:
  // Fires when HTML fully loaded and parsed (but images might still load)
  // Perfect timing untuk initialize quiz - all elements exist in DOM!
  //
  // ALTERNATIVE: window.onload
  // Would wait for ALL resources (images, CSS, etc) - too slow!
  //
  document.addEventListener('DOMContentLoaded', () => initializeQuiz());
  
})(); // End of IIFE - Execute immediately!

// ==================== END OF dom.js ====================
// This file handles ALL UI interactions untuk quiz app
// Combined dengan functions.js (logic) and arrays.js (data)

