/* functions.js
   Purpose: Pure functions for quiz logic. These functions don't touch DOM directly.
   - shuffleArray(arr): Fisher-Yates shuffle
   - calculateScore(userAnswers, quizArray): returns {correctCount, total}
   - getStickerPath(percentage): returns sticker path based on percentage
   - checkAnswer(questionIndex, selectedIndex, quizArray): returns boolean
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
  // map percentage to sticker images we have in /img/stickers/
  // 90-100: congratulate, 70-89: thumbsUp, 50-69: cheery, 0-49: encourage
  if (percentage >= 90) return '/img/stickers/congratulate.png';
  if (percentage >= 70) return '/img/stickers/thumbsUp.png';
  if (percentage >= 50) return '/img/stickers/cheery.png';
  return '/img/stickers/encourage.png';
}

function checkAnswer(questionObj, selectedIndex) {
  return selectedIndex === questionObj.answer;
}

// expose functions for dom.js
window.QuizFns = {
  shuffleArray,
  calculateScore,
  getStickerPath,
  checkAnswer
};
