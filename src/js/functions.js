/* ==========================================
   functions.js - Tempat Simpan Fungsi! 🧠
   ==========================================
   
   File ni macam toolbox.
   Semua function yang kita guna ada dalam ni.
   
   APA YANG ADA DALAM NI?
   1. shuffleArray() - Untuk shuffle/campur soalan (macam shuffle cards!)
   2. calculateScore() - Kira markah berapa dapat
   3. getStickerPath() - Pilih sticker mana nak bagi
   4. getResultMessage() - Pilih message nak cakap apa
   5. getFeedbackForAnswer() - Cakap betul ke salah
   6. validateAllAnswered() - Check dah jawab semua ke belum
   7. checkAnswer() - Tengok jawapan betul ke tak
*/

// ========== FUNCTION 1: shuffleArray() ==========
// Apa dia buat? Campur-campur soalan supaya tak sama setiap kali
// Macam shuffle kad - setiap kali main, order lain!
//
// Contoh:
// Asal: [Q1, Q2, Q3, Q4, Q5, Q6]
// Lepas shuffle: [Q3, Q1, Q6, Q2, Q4, Q5]  <-- Order dah lain!
//
function shuffleArray(array) {
  // Kira dari belakang ke depan
  for (let i = array.length - 1; i > 0; i--) {
    
    // Pilih nombor random (macam roll dice!)
    const j = Math.floor(Math.random() * (i + 1));
    
    // Tukar tempat - macam tukar card position
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;  // Dah siap shuffle!
}

// ========== FUNCTION 2: calculateScore() ==========
// Apa dia buat? Kira berapa soalan betul
//
// Contoh:
// Kalau jawab betul 4 dari 6 soalan, dia kira dan bagitau
//
function calculateScore(userAnswers, quizArray) {
  let correct = 0; // Start dengan 0
  
  // Check semua jawapan satu per satu
  for (let i = 0; i < quizArray.length; i++) {
    
    // Kalau jawapan sama dengan yang betul, tambah markah
    if (userAnswers[i] === quizArray[i].answer) {
      correct++;  // Tambah 1
    }
  }
  
  // Bagitau berapa dapat
  return { 
    correctCount: correct,  // Berapa betul
    total: quizArray.length  // Jumlah soalan
  };
}

// ========== FUNCTION 3: getStickerPath() ==========
// Apa dia buat? Pilih sticker mana nak bagi based on markah
//
// Markah tinggi = happy sticker, Markah rendah = thinking sticker
//
function getStickerPath(percentage) {
  
  if (percentage >= 95) {
    return '/img/stickers/congratulate.png';  // Terbaik!
  }
  
  if (percentage >= 80) {
    return '/img/stickers/enaHappy.png';  // Bagus!
  }
  
  if (percentage >= 60) {
    return '/img/stickers/cheery.png';  // OK lah!
  }
  
  if (percentage >= 40) {
    return '/img/stickers/encourage.png';  // Cuba lagi!
  }
  
  return '/img/stickers/thinking.png';  // Kena belajar lagi!
}

// ========== FUNCTION 4: getResultMessage() ==========
// Apa dia buat? Pilih message nak cakap apa based on markah
//
// Contoh: Kalau dapat 100%, cakap "Perfect! You are a math champion! 🏆"
//
function getResultMessage(percentage) {
  
  if (percentage >= 95) {
    return 'Perfect! You are a math champion! 🏆';
  } 
  else if (percentage >= 80) {
    return 'Excellent work! You really know your math! ⭐';
  } 
  else if (percentage >= 60) {
    return 'Good job! Keep practicing to get even better! 👍';
  } 
  else if (percentage >= 40) {
    return 'Nice try! Practice more and you\'ll improve! 🌟';
  } 
  else {
    return 'Keep learning! Every mistake helps you grow! 💪';
  }
}

// ========== FUNCTION 5: getFeedbackForAnswer() ==========
// Apa dia buat? Bagi feedback untuk setiap soalan (betul/salah/tak jawab)
//
// Contoh: Kalau betul, cakap "Great job!" dengan green color
//
function getFeedbackForAnswer(isCorrect, hasAnswer) {
  
  // Kalau tak jawab langsung
  if (!hasAnswer) {
    return {
      sticker: '/img/stickers/thinking.png',
      message: 'No answer',
      bgClass: 'bg-yellow-500/20',  // Yellow = tak jawab
      borderClass: 'border-yellow-400'
    };
  } 
  
  // Kalau jawab dan BETUL!
  else if (isCorrect) {
    return {
      sticker: '/img/stickers/congratulate.png',
      message: 'Great job!',
      bgClass: 'bg-green-500/20',  // Green = betul
      borderClass: 'border-green-400'
    };
  } 
  
  // Kalau jawab tapi SALAH
  else {
    return {
      sticker: '/img/stickers/encourage.png',
      message: 'Try again!',
      bgClass: 'bg-red-500/20',  // Red = salah
      borderClass: 'border-red-400'
    };
  }
}

// ========== FUNCTION 6: validateAllAnswered() ==========
// Apa dia buat? Check semua soalan dah jawab ke belum
//
// Contoh: Kalau ada 6 soalan, tapi baru jawab 4, dia bagitau "belum siap!"
//
function validateAllAnswered(shuffledQuestions) {
  
  // Kira berapa soalan dah dijawab
  const totalAnswered = shuffledQuestions.filter((_, idx) => {
    
    // Cari radio button untuk soalan ni
    const name = `q${idx + 1}`;  // q1, q2, q3...
    const checkedInput = document.querySelector(`input[name="${name}"]:checked`);
    
    // Kalau ada yang tick, masuk kira!
    return checkedInput !== null;
  }).length;  // .length = berapa banyak
  
  // Bagitau result
  return {
    allAnswered: totalAnswered === shuffledQuestions.length,  // Semua dah jawab ke?
    answeredCount: totalAnswered,  // Berapa dah jawab
    totalCount: shuffledQuestions.length  // Total soalan
  };
}

// ========== FUNCTION 7: checkAnswer() ==========
// Apa dia buat? Check jawapan betul ke tak untuk satu soalan
//
// Contoh: User pilih B, jawapan betul B, function cakap "BETUL!"
//
function checkAnswer(questionObj, selectedIndex) {
  // Bandingkan je - sama ke tak?
  return selectedIndex === questionObj.answer;
}

// ========== BAGI FILE LAIN BOLEH GUNA ==========
// Kumpul semua functions dalam satu tempat, supaya senang guna!
//
window.QuizFns = {
  shuffleArray,          // Shuffle soalan
  calculateScore,        // Kira markah
  getStickerPath,        // Pilih sticker
  getResultMessage,      // Pilih message
  getFeedbackForAnswer,  // Bagi feedback
  validateAllAnswered,   // Check semua jawab
  checkAnswer            // Check satu jawapan
};
