/* dom.js
   Purpose: manipulate DOM, wire up events, render questions and answers
   Responsibilities:
   - initializeQuiz(quizType)
   - render current question (image + question text + 4 radio options)
   - handle selection coloring and radio naming/id per question index
   - handle Submit (CheckAnswer) and Retake (TakeQuizAgain)

   Note: This file uses QUIZ_DATA and QuizFns from arrays.js and functions.js.
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
    submitBtn.disabled = false;
    nextBtn.classList.add('hidden');

    // render all question cards
    shuffledQuestions.forEach((q, idx) => {
      const card = renderQuestionCard(q, idx);
      questionsContainer.appendChild(card);
    });
  }

  // Render a single question card (image + radios 2x2)
  function renderQuestionCard(q, idx) {
  const cardWrap = document.createElement('div');
  // stronger card background and shadow so cards don't blend into the page background
  cardWrap.className = 'bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl';

    // image (visual) - each question has its own picture
    const img = document.createElement('img');
    img.src = q.image || '/img/addition/1.png';
    img.alt = `Question ${idx + 1} visual`;
  img.className = 'mx-auto w-full max-w-2xl rounded-lg object-contain mb-4 drop-shadow-lg';
    cardWrap.appendChild(img);

    // question text
    const qText = document.createElement('h3');
    qText.id = `q${idx + 1}_text`;
  qText.className = 'text-2xl font-extrabold text-white mb-4 text-center';
    qText.textContent = q.question || '';
    cardWrap.appendChild(qText);

    // options grid (2x2)
  const optionsGrid = document.createElement('div');
  optionsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

    for (let i = 0; i < 4; i++) {
      const optionLabel = document.createElement('label');
      const inputId = `q${idx + 1}_choice_${i}`;
      const inputName = `q${idx + 1}`; // required: name/ID per question number

    // clearer option surface, slightly elevated and with minimum height for tappability
    optionLabel.className = 'answer-option relative flex flex-col items-start justify-center bg-white/8 text-white py-6 px-6 rounded-2xl border border-white/20 cursor-pointer transition-transform duration-150 hover:scale-[1.02] min-h-[72px]';
      optionLabel.setAttribute('data-choice-index', i);

      const input = document.createElement('input');
      input.type = 'radio';
      input.id = inputId;
      input.name = inputName;
      input.value = i;
      input.className = 'sr-only answer-radio';

  const letter = document.createElement('span');
  letter.className = 'font-bold mb-1 text-sm text-white/80';
      letter.textContent = ['A', 'B', 'C', 'D'][i];

  const text = document.createElement('span');
  text.className = 'text-xl font-semibold';
      text.textContent = q.choices[i] || '';

      optionLabel.appendChild(input);
      optionLabel.appendChild(letter);
      optionLabel.appendChild(text);

      // selection highlight (static blue)
      optionLabel.addEventListener('click', () => {
        // unring siblings in same card
        const siblingLabels = optionLabel.parentElement.querySelectorAll('label');
        siblingLabels.forEach(l => l.classList.remove('ring-4', 'ring-blue-400'));
        optionLabel.classList.add('ring-4', 'ring-blue-400');
        input.checked = true;
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

  // Grade entire quiz when submit is pressed
  function CheckAnswer() {
    // gather all user selections
    const cards = questionsContainer.querySelectorAll('[data-choice-index]');
    // for each question, find checked input
    for (let qi = 0; qi < shuffledQuestions.length; qi++) {
      const name = `q${qi + 1}`;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      userAnswers[qi] = checked ? parseInt(checked.value, 10) : null;
    }

    // disable all inputs and color answers
    for (let qi = 0; qi < shuffledQuestions.length; qi++) {
      const q = shuffledQuestions[qi];
      const card = questionsContainer.children[qi];
      const labels = card.querySelectorAll('label');
      labels.forEach(label => {
        const idx = parseInt(label.getAttribute('data-choice-index'), 10);
        const input = label.querySelector('input');
        if (input) input.disabled = true;
        label.classList.remove('ring-4', 'ring-blue-400');
        if (idx === q.answer) {
          // correct answer
          label.classList.add('bg-green-600', 'border-green-700');
        }
      });

      // highlight wrong selected in red
      const selected = userAnswers[qi];
      if (selected !== null && selected !== undefined && selected !== shuffledQuestions[qi].answer) {
        const wrongLabel = card.querySelector(`label[data-choice-index="${selected}"]`);
        if (wrongLabel) wrongLabel.classList.add('bg-red-600', 'border-red-700');
      }
    }

    // compute score and show summary
    const { correctCount, total } = QuizFns.calculateScore(userAnswers, shuffledQuestions);
    correctCountSpan.textContent = correctCount;
    totalQSpan2.textContent = total;
    const percent = Math.round((correctCount / total) * 100);
    scoreFill.style.width = `${(correctCount / total) * 100}%`;
    // sticker and message
    resultSticker.src = QuizFns.getStickerPath(percent);
    // animate sticker pop
    resultSticker.classList.remove('scale-90', 'opacity-0');
    resultSticker.classList.add('scale-110');
    // set message based on score
    if (percent >= 90) {
      resultMessage.textContent = 'Amazing! You did a fantastic job! 🎉';
    } else if (percent >= 70) {
      resultMessage.textContent = 'Great work! A little more practice and you\'ll master it! 👍';
    } else if (percent >= 40) {
      resultMessage.textContent = 'Nice try — keep going and you\'ll improve! 🌟';
    } else {
      resultMessage.textContent = 'Don\'t give up! Try again and focus on counting carefully. 💪';
    }
    resultSummary.classList.remove('hidden');

  // progress (count filled answers) - the page shows all questions at once so no progress bar

    // disable submit
    submitBtn.disabled = true;
  }

  // Retake flow: loading overlay, then shuffle and re-render questions
  function TakeQuizAgain() {
    resultSummary.classList.add('hidden');
    // scroll to top so the loading overlay / refreshed quiz is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // create overlay
    const overlay = document.createElement('div');
  overlay.id = 'retake-overlay';
  // darker backdrop and slight blur to make overlay content pop; start hidden (opacity 0)
  overlay.className = 'fixed inset-0 z-90 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300';
    overlay.innerHTML = `
      <div class="w-full max-w-md bg-white/6 rounded-2xl p-6 text-center">
        <img src="/img/stickers/takingNotes.png" alt="loading" class="mx-auto w-48 h-48 mb-4 animate-pulse" />
        <div class="w-full bg-white/10 rounded-full h-4 overflow-hidden mx-auto mb-4">
          <div id="retake-progress" class="bg-blue-400 h-4 w-0 transition-all duration-1000"></div>
        </div>
        <p id="retake-tip" class="text-white/90 text-lg font-semibold">Tip: Try counting the animals in the picture!</p>
      </div>
    `;
    // append overlay and prevent background scroll while visible
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    // fade in overlay
    requestAnimationFrame(() => overlay.classList.remove('opacity-0'));

    // animate progress after a short delay
    setTimeout(() => { const p = document.getElementById('retake-progress'); if (p) p.style.width = '100%'; }, 100);
    // keep overlay visible longer so sticker and tip are readable
    setTimeout(() => {
      // remove overlay and reinitialize (shuffle happens inside initializeQuiz)
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
      document.body.style.overflow = '';
      initializeQuiz(quizType);
    }, 2400);
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
