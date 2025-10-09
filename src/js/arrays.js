/* arrays.js
   Purpose: store quiz question arrays and metadata for each quiz type.
   - Each quiz is an array of question objects: {id, image, question, choices: [a,b,c,d], answer: index (0-3)}
   - There are exactly 6 questions per quiz as requested.
   - This file exports a global `QUIZ_DATA` object used by functions.js and dom.js.

   NOTE: Questions are placeholder; replace the `image` paths and text with your real content later.
*/

const QUIZ_DATA = {
  addition: [
    { id: 1, image: '/img/addition/1+1.png', question: '1 + 1', choices: ['1', '2', '3', '4'], answer: 1 },
    { id: 2, image: '/img/addition/2+4.png', question: '2 + 4', choices: ['5', '6', '4', '7'], answer: 1 },
    { id: 3, image: '/img/addition/3+2.png', question: '3 + 2', choices: ['4', '5', '6', '3'], answer: 1 },
    { id: 4, image: '/img/addition/3+3.png', question: '3 + 3', choices: ['5', '6', '7', '4'], answer: 1 },
    { id: 5, image: '/img/addition/4+1.png', question: '4 + 1', choices: ['4', '5', '6', '3'], answer: 1 },
    { id: 6, image: '/img/addition/4+2.png', question: '4 + 2', choices: ['5', '6', '7', '4'], answer: 1 }
  ],
  subtraction: [
    { id: 1, image: '/img/subtraction/2-1.png', question: '2 - 1', choices: ['0', '1', '2', '3'], answer: 1 },
    { id: 2, image: '/img/subtraction/2-2.png', question: '2 - 2', choices: ['0', '1', '2', '3'], answer: 0 },
    { id: 3, image: '/img/subtraction/3-1.png', question: '3 - 1', choices: ['1', '2', '3', '4'], answer: 1 },
    { id: 4, image: '/img/subtraction/3-2.png', question: '3 - 2', choices: ['0', '1', '2', '3'], answer: 1 },
    { id: 5, image: '/img/subtraction/4-1.png', question: '4 - 1', choices: ['2', '3', '4', '1'], answer: 1 },
    { id: 6, image: '/img/subtraction/4-2.png', question: '4 - 2', choices: ['1', '2', '3', '4'], answer: 1 }
  ],
  mixed: [
  { id: 1, image: '/img/mixed/1+1-1.png', question: '1 + 1 - 0', choices: ['1', '2', '3', '0'], answer: 1 },
    { id: 2, image: '/img/mixed/2-1+3.png', question: '2 - 1 + 3', choices: ['1', '2', '3', '4'], answer: 3 },
    { id: 3, image: '/img/mixed/2-2+3.png', question: '2 - 2 + 3', choices: ['2', '3', '4', '1'], answer: 1 },
    { id: 4, image: '/img/mixed/3-1+2.png', question: '3 - 1 + 2', choices: ['3', '4', '2', '5'], answer: 1 },
    { id: 5, image: '/img/mixed/3-2+3.png', question: '3 - 2 + 3', choices: ['3', '4', '5', '2'], answer: 2 },
    { id: 6, image: '/img/mixed/3-3+3.png', question: '3 - 3 + 3', choices: ['2', '3', '1', '4'], answer: 1 }
  ]
};

// expose QUIZ_DATA to global scope for simplicity
window.QUIZ_DATA = QUIZ_DATA;
