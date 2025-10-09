/* dom.js
   Purpose: DOM manipulation and UI interactions only
   Responsibilities:
   - initializeQuiz(quizType): load quiz data, shuffle questions, reset UI
   - renderQuestionCard(): create individual question cards with enhanced visuals
   - CheckAnswer(): handle UI update    // Use business logic for sticker and message
    resultSticker.src = QuizFns.getStickerPath(percent);
    resultMessage.textContent = QuizFns.getResultMessage(percent);
    
    // animate sticker pop with enhanced effect
    resultSticker.classList.remove('scale-90', 'opacity-0');
    resultSticker.classList.add('scale-110', 'animate-bounce');
    
    // Show results with delayed animation after all feedback is shown
    setTimeout(() => {
      resultSummary.classList.remove('hidden');
    }, shuffledQuestions.length * 300 + 800); // Show after all feedback animationssion
   - TakeQuizAgain(): manage loading screen and quiz reset UI
   - updateSubmitButtonState(): handle submit button validation UI

   Note: All business logic is handled by functions in functions.js
*/

(function () {
  // Cached DOM refs
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

  // runtime state
  let quizType = document.querySelector('[data-quiz]')?.dataset?.quiz || 'addition';
  let quizArray = [];
  let shuffledQuestions = [];
  let userAnswers = []; // selected index per question or null
  const TOTAL_QUESTIONS = 6;

  // Function to check if all questions are answered and enable/disable submit button
  function updateSubmitButtonState() {
    const validation = QuizFns.validateAllAnswered(shuffledQuestions);
    
    if (validation.allAnswered) {
      submitBtn.disabled = false;
      submitBtn.textContent = '✨ Submit Answer';
      submitBtn.className = submitBtn.className.replace(/opacity-50/, 'opacity-100');
    } else {
      submitBtn.disabled = true;
      submitBtn.textContent = `📝 Answer All Questions (${validation.answeredCount}/${validation.totalCount})`;
      if (!submitBtn.className.includes('opacity-50')) {
        submitBtn.className += ' opacity-50';
      }
    }
  }

  // Initialize quiz: load data, shuffle, render all questions
  function initializeQuiz(type) {
    quizType = type || quizType;
    quizArray = (window.QUIZ_DATA && window.QUIZ_DATA[quizType]) ? [...window.QUIZ_DATA[quizType]] : [];
    quizArray.length = TOTAL_QUESTIONS; // enforce 6

    // shuffle questions and reset state
    shuffledQuestions = QuizFns.shuffleArray([...quizArray]);
    userAnswers = Array(shuffledQuestions.length).fill(null);

    // update header totals
    currentQSpan.textContent = 1;
    totalQSpan.textContent = shuffledQuestions.length;
    totalQSpan2.textContent = shuffledQuestions.length;

  // reset UI
    questionsContainer.innerHTML = '';
    resultSummary.classList.add('hidden');
    submitBtn.disabled = true; // Start disabled until questions are answered
    submitBtn.textContent = 'Submit Answer';
    nextBtn.classList.add('hidden');

    // render all question cards
    shuffledQuestions.forEach((q, idx) => {
      const card = renderQuestionCard(q, idx);
      questionsContainer.appendChild(card);
    });
    
    // Check if submit should be enabled after rendering
    updateSubmitButtonState();
  }

  // Render a single question card with enhanced visual design
  function renderQuestionCard(q, idx) {
    const cardWrap = document.createElement('div');
    // Enhanced card design with gradient border and glass effect
    cardWrap.className = 'relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden';
    
    // Add animated sparkle decoration
    const sparkleDecor = document.createElement('div');
    sparkleDecor.className = 'absolute top-4 left-4 text-yellow-300 text-xl animate-pulse';
    sparkleDecor.textContent = '✨';
    cardWrap.appendChild(sparkleDecor);

    // Question number badge
    const questionBadge = document.createElement('div');
    questionBadge.className = 'absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg';
    questionBadge.textContent = `Question ${idx + 1}`;
    cardWrap.appendChild(questionBadge);

    // image container with enhanced styling
    const imgContainer = document.createElement('div');
    imgContainer.className = 'bg-white/90 rounded-2xl p-6 mb-6 shadow-inner';
    
    const img = document.createElement('img');
    img.src = q.image || '/img/addition/1.png';
    img.alt = `Question ${idx + 1} visual`;
    img.className = 'mx-auto w-full max-w-2xl rounded-xl object-contain drop-shadow-lg';
    imgContainer.appendChild(img);
    cardWrap.appendChild(imgContainer);

    // question text with enhanced styling
    const qText = document.createElement('h3');
    qText.id = `q${idx + 1}_text`;
    qText.className = 'text-3xl font-black text-white mb-6 text-center drop-shadow-lg bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent';
    qText.textContent = q.question || '';
    cardWrap.appendChild(qText);

    // feedback area for per-question encouragement (initially hidden)
    const feedbackArea = document.createElement('div');
    feedbackArea.id = `q${idx + 1}_feedback`;
    feedbackArea.className = 'hidden absolute top-16 right-6 flex items-center space-x-6 bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 shadow-xl transform scale-0 transition-all duration-500';
    feedbackArea.innerHTML = `
      <img class="w-12 h-12 animate-bounce" src="" alt="feedback" />
      <span class="text-white font-bold text-base drop-shadow"></span>
    `;
    cardWrap.appendChild(feedbackArea);

    // options grid with enhanced spacing and design
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    for (let i = 0; i < 4; i++) {
      const optionLabel = document.createElement('label');
      const inputId = `q${idx + 1}_choice_${i}`;
      const inputName = `q${idx + 1}`; // required: name/ID per question number

      // Enhanced option button design with gradient and better interactions
      optionLabel.className = 'answer-option relative flex flex-col items-center justify-center bg-gradient-to-br from-white/12 to-white/6 text-white py-8 px-6 rounded-2xl border-2 border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-white/20 hover:to-white/10 min-h-[100px] group';
      optionLabel.setAttribute('data-choice-index', i);

      const input = document.createElement('input');
      input.type = 'radio';
      input.id = inputId;
      input.name = inputName;
      input.value = i;
      input.className = 'sr-only answer-radio';

      // Enhanced letter badge with gradient
      const letter = document.createElement('span');
      letter.className = 'absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200';
      letter.textContent = ['A', 'B', 'C', 'D'][i];

      // Enhanced option text
      const text = document.createElement('span');
      text.className = 'text-2xl font-bold drop-shadow-lg group-hover:scale-105 transition-transform duration-200';
      text.textContent = q.choices[i] || '';

      // Add animated selection indicator
      const selectionRing = document.createElement('div');
      selectionRing.className = 'absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-200';

      optionLabel.appendChild(input);
      optionLabel.appendChild(letter);
      optionLabel.appendChild(text);
      optionLabel.appendChild(selectionRing);

      // Enhanced selection highlight with animation
      optionLabel.addEventListener('click', () => {
        // Remove selection from siblings
        const siblingLabels = optionLabel.parentElement.querySelectorAll('label');
        siblingLabels.forEach(l => {
          l.classList.remove('ring-4', 'ring-blue-400', 'bg-blue-500/30');
          const ring = l.querySelector('div:last-child');
          if (ring) ring.className = 'absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-200';
        });
        
        // Add selection to current option with animation
        optionLabel.classList.add('ring-4', 'ring-blue-400', 'bg-blue-500/30');
        selectionRing.className = 'absolute inset-0 rounded-2xl border-4 border-blue-400 transition-all duration-200 animate-pulse';
        input.checked = true;
        
        // Update submit button state after selection
        updateSubmitButtonState();
      });

      // keyboard accessibility: allow space/enter to activate
      optionLabel.tabIndex = 0;
      optionLabel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          optionLabel.click();
        }
      });

      optionsGrid.appendChild(optionLabel);
    }

    cardWrap.appendChild(optionsGrid);

    return cardWrap;
  }

  /**
   * CheckAnswer() - Check the answer and calculate the quiz score after user completes the quiz
   * - Validates all questions are answered
   * - Calculates score and displays congratulation/motivational messages
   * - Shows per-question feedback with stickers
   * - Disables radio buttons after submission
   * - Displays overall result summary with appropriate sticker
   */
  function CheckAnswer() {
    // gather all user selections
    const cards = questionsContainer.querySelectorAll('[data-choice-index]');
    // for each question, find checked input
    for (let qi = 0; qi < shuffledQuestions.length; qi++) {
      const name = `q${qi + 1}`;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      userAnswers[qi] = checked ? parseInt(checked.value, 10) : null;
    }

    // disable all inputs, color answers, and show per-question feedback using business logic
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
      
      // Get feedback data from business logic
      const feedback = QuizFns.getFeedbackForAnswer(isCorrect, hasAnswer);
      
      labels.forEach(label => {
        const idx = parseInt(label.getAttribute('data-choice-index'), 10);
        const input = label.querySelector('input');
        if (input) input.disabled = true;
        
        // Remove all selection styling
        label.classList.remove('ring-4', 'ring-blue-400', 'bg-blue-500/30');
        const ring = label.querySelector('div:last-child');
        if (ring) ring.className = 'absolute inset-0 rounded-2xl border-4 border-transparent transition-all duration-200';
        
        // Highlight correct answer with enhanced green styling
        if (idx === q.answer) {
          label.classList.add('bg-green-600/90', 'border-green-400', 'ring-4', 'ring-green-400', 'shadow-green-400/50', 'shadow-xl');
        }
      });

      // Highlight wrong selection with enhanced red styling
      if (hasAnswer && !isCorrect) {
        const wrongLabel = card.querySelector(`label[data-choice-index="${selected}"]`);
        if (wrongLabel) {
          wrongLabel.classList.add('bg-red-600/90', 'border-red-400', 'ring-4', 'ring-red-400', 'shadow-red-400/50', 'shadow-xl');
        }
      }
      
      // Show animated feedback using business logic
      feedbackImg.src = feedback.sticker;
      feedbackText.textContent = feedback.message;
      feedbackArea.classList.remove('hidden');
      feedbackArea.classList.add(feedback.bgClass, feedback.borderClass);
      
      // Animate feedback appearance with stagger
      setTimeout(() => {
        feedbackArea.classList.remove('scale-0');
        feedbackArea.classList.add('scale-100');
      }, qi * 300); // Increased stagger for better visual effect
    }

    // compute score and show summary using business logic
    const { correctCount, total } = QuizFns.calculateScore(userAnswers, shuffledQuestions);
    correctCountSpan.textContent = correctCount;
    totalQSpan2.textContent = total;
    const percent = Math.round((correctCount / total) * 100);
    scoreFill.style.width = `${(correctCount / total) * 100}%`;
    
    // Use business logic for sticker and message
    resultSticker.src = QuizFns.getStickerPath(percent);
    resultMessage.textContent = QuizFns.getResultMessage(percent);
    
    // Enhanced animate sticker pop with bouncy entrance
    resultSticker.classList.remove('scale-90', 'opacity-0');
    resultSticker.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    resultSticker.classList.add('scale-110');
    
    // Add a secondary bounce effect
    setTimeout(() => {
      resultSticker.style.transform = 'scale(1)';
    }, 600);
    
    // Enhanced result message animation
    resultMessage.style.transition = 'all 0.5s ease-out';
    resultMessage.style.transform = 'translateY(20px)';
    resultMessage.style.opacity = '0';
    
    setTimeout(() => {
      resultMessage.style.transform = 'translateY(0)';
      resultMessage.style.opacity = '1';
    }, 300);
    
    // set message based on score
    if (percent >= 95) {
      resultMessage.textContent = 'Perfect! You are a math champion! �';
    } else if (percent >= 80) {
      resultMessage.textContent = 'Excellent work! You really know your math! ⭐';
    } else if (percent >= 60) {
      resultMessage.textContent = 'Good job! Keep practicing to get even better! 👍';
    } else if (percent >= 40) {
      resultMessage.textContent = 'Nice try! Practice more and you\'ll improve! 🌟';
    } else {
      resultMessage.textContent = 'Keep learning! Every mistake helps you grow! 💪';
    }
    resultSummary.classList.remove('hidden');

    // Smooth scroll to the result section to highlight the sticker and congratulate message
    setTimeout(() => {
      resultSummary.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center', 
        inline: 'nearest' 
      });
    }, 500); // Delay to allow result animation to start

  // progress (count filled answers) - the page shows all questions at once so no progress bar

    // disable submit
    submitBtn.disabled = true;
  }

  /**
   * TakeQuizAgain() - Enhanced loading screen and quiz reset with better visual design
   * - Shows animated loading overlay with confetti and engaging elements
   * - Manages background scroll prevention and smooth transitions
   * - Resets quiz state and reshuffles questions using business logic
   */
  function TakeQuizAgain() {
    resultSummary.classList.add('hidden');
    // scroll to top so the loading overlay / refreshed quiz is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // create enhanced overlay with animations
    const overlay = document.createElement('div');
    overlay.id = 'retake-overlay';
    // much higher z-index to ensure it appears above all content including question cards
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md opacity-0 transition-opacity duration-500';
    
    // Add floating animation elements
    const floatingElements = `
      <div class="absolute top-20 left-20 text-yellow-300 text-2xl animate-bounce">🌟</div>
      <div class="absolute top-32 right-32 text-pink-300 text-xl animate-pulse">✨</div>
      <div class="absolute bottom-40 left-40 text-blue-300 text-lg animate-ping">🎯</div>
      <div class="absolute bottom-20 right-20 text-green-300 text-xl animate-bounce">🎉</div>
    `;
    
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
    
    // append overlay and prevent background scroll while visible
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // fade in overlay
    requestAnimationFrame(() => overlay.classList.remove('opacity-0'));

    // animate progress after a short delay
    setTimeout(() => { 
      const p = document.getElementById('retake-progress'); 
      if (p) p.style.width = '100%'; 
    }, 200);
    
    // keep overlay visible longer with enhanced timing
    setTimeout(() => {
      // remove overlay and reinitialize (shuffle happens inside initializeQuiz)
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
      document.body.style.overflow = '';
      initializeQuiz(quizType);
    }, 3000); // Increased to 3 seconds for better UX
  }

  // events
  submitBtn.addEventListener('click', (e) => { e.preventDefault(); CheckAnswer(); });
  retakeBtn.addEventListener('click', (e) => { e.preventDefault(); TakeQuizAgain(); });

  // expose
  window.CheckAnswer = CheckAnswer;
  window.TakeQuizAgain = TakeQuizAgain;
  window.initializeQuiz = initializeQuiz;

  document.addEventListener('DOMContentLoaded', () => initializeQuiz());
})();
