/* functions.js
   Purpose: Pure functions for quiz logic and business rules. These functions don't touch DOM directly.
   - shuffleArray(arr): Fisher-Yates shuffle
   - calculateScore(userAnswers, quizArray): returns {correctCount, total}
   - getStickerPath(percentage): returns sticker path based on percentage
   - checkAnswer(questionIndex, selectedIndex, quizArray): returns boolean
   - getResultMessage(percentage): returns appropriate message for score
   - getFeedbackForAnswer(isCorrect, hasAnswer): returns feedback sticker and message
   - validateAllAnswered(totalQuestions): checks if submit should be enabled
*/

// shuffle an array in place (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// compute score
function calculateScore(userAnswers, quizArray) {
  let correct = 0;
  for (let i = 0; i < quizArray.length; i++) {
    if (userAnswers[i] === quizArray[i].answer) correct++;
  }
  return { correctCount: correct, total: quizArray.length };
}

// return sticker path based on percentage thresholds
function getStickerPath(percentage) {
  // map percentage to new sticker collection in /img/stickers/
  if (percentage >= 95) return '/img/stickers/congratulate.png';
  if (percentage >= 80) return '/img/stickers/enaHappy.png';
  if (percentage >= 60) return '/img/stickers/cheery.png';
  if (percentage >= 40) return '/img/stickers/encourage.png';
  return '/img/stickers/thinking.png';
}

// get result message based on percentage
function getResultMessage(percentage) {
  if (percentage >= 95) {
    return 'Perfect! You are a math champion! 🏆';
  } else if (percentage >= 80) {
    return 'Excellent work! You really know your math! ⭐';
  } else if (percentage >= 60) {
    return 'Good job! Keep practicing to get even better! 👍';
  } else if (percentage >= 40) {
    return 'Nice try! Practice more and you\'ll improve! 🌟';
  } else {
    return 'Keep learning! Every mistake helps you grow! 💪';
  }
}

// get feedback for individual answer
function getFeedbackForAnswer(isCorrect, hasAnswer) {
  if (!hasAnswer) {
    return {
      sticker: '/img/stickers/thinking.png',
      message: 'No answer',
      bgClass: 'bg-yellow-500/20',
      borderClass: 'border-yellow-400'
    };
  } else if (isCorrect) {
    return {
      sticker: '/img/stickers/congratulate.png',
      message: 'Great job!',
      bgClass: 'bg-green-500/20',
      borderClass: 'border-green-400'
    };
  } else {
    return {
      sticker: '/img/stickers/encourage.png',
      message: 'Try again!',
      bgClass: 'bg-red-500/20',
      borderClass: 'border-red-400'
    };
  }
}

// check if all questions are answered for submit validation
function validateAllAnswered(shuffledQuestions) {
  const totalAnswered = shuffledQuestions.filter((_, idx) => {
    const name = `q${idx + 1}`;
    return document.querySelector(`input[name="${name}"]:checked`);
  }).length;
  
  return {
    allAnswered: totalAnswered === shuffledQuestions.length,
    answeredCount: totalAnswered,
    totalCount: shuffledQuestions.length
  };
}

function checkAnswer(questionObj, selectedIndex) {
  return selectedIndex === questionObj.answer;
}

// expose functions for dom.js
window.QuizFns = {
  shuffleArray,
  calculateScore,
  getStickerPath,
  getResultMessage,
  getFeedbackForAnswer,
  validateAllAnswered,
  checkAnswer
};
