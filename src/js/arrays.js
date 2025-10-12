/* ========================================
   arrays.js - Tempat Simpan Soalan Quiz! 📚
   ========================================
   
   File ni macam buku soalan.
   Semua soalan quiz ada dalam sini.
   
   APA DIA BUAT?
   - Simpan soalan Addition (tambah)
   - Simpan soalan Subtraction (tolak)
   - Simpan soalan Mixed (campur tambah dan tolak)
   
   MACAM MANA DATA DISUSUN?
   Kita ada 1 kotak besar nama QUIZ_DATA
   Dalam kotak tu ada 3 bahagian:
   1. addition   - Soalan tambah (1+1, 2+4)
   2. subtraction - Soalan tolak (2-1, 4-2) 
   3. mixed      - Soalan campur (1+1-1, 2-1+3)
   
   SETIAP SOALAN ADA:
   - Nombor (id: 1, 2, 3...)
   - Gambar (image: '/img/...')
   - Soalan (question: '1 + 1')
   - 4 pilihan jawapan (choices: ['1', '2', '3', '4'])
   - Jawapan betul (answer: 1)
   
   PENTING!
   - answer: 0 means pilihan pertama (A)
   - answer: 1 means pilihan kedua (B)
   - answer: 2 means pilihan ketiga (C)
   - answer: 3 means pilihan keempat (D)
   
   SENANG KAN?
   Macam kotak menyimpan mainan, ada label untuk setiap mainan! 
*/

const QUIZ_DATA = {
  // ========== SOALAN TAMBAH ==========
  // Untuk belajar tambah nombor
  addition: [
    // Soalan 1: 1 + 1 = 2
    // answer: 1 maksudnya pilihan kedua (B) yang betul
    { id: 1, image: '/img/addition/1+1.png', question: '1 + 1', choices: ['1', '2', '3', '4'], answer: 1 },
    
    // Soalan 2: 2 + 4 = 6
    { id: 2, image: '/img/addition/2+4.png', question: '2 + 4', choices: ['5', '6', '4', '7'], answer: 1 },
    
    // Soalan 3: 3 + 2 = 5
    { id: 3, image: '/img/addition/3+2.png', question: '3 + 2', choices: ['4', '5', '6', '3'], answer: 1 },
    
    // Soalan 4: 3 + 3 = 6
    { id: 4, image: '/img/addition/3+3.png', question: '3 + 3', choices: ['5', '6', '7', '4'], answer: 1 },
    
    // Soalan 5: 4 + 1 = 5
    { id: 5, image: '/img/addition/4+1.png', question: '4 + 1', choices: ['4', '5', '6', '3'], answer: 1 },
    
    // Soalan 6: 4 + 2 = 6
    { id: 6, image: '/img/addition/4+2.png', question: '4 + 2', choices: ['5', '6', '7', '4'], answer: 1 }
  ],
  
  // ========== SOALAN TOLAK ==========
  // Untuk belajar tolak nombor
  subtraction: [
    // Soalan 1: 2 - 1 = 1
    { id: 1, image: '/img/subtraction/2-1.png', question: '2 - 1', choices: ['0', '1', '2', '3'], answer: 1 },
    
    // Soalan 2: 2 - 2 = 0
    // answer: 0 maksudnya pilihan pertama (A) yang betul
    { id: 2, image: '/img/subtraction/2-2.png', question: '2 - 2', choices: ['0', '1', '2', '3'], answer: 0 },
    
    // Soalan 3: 3 - 1 = 2
    { id: 3, image: '/img/subtraction/3-1.png', question: '3 - 1', choices: ['1', '2', '3', '4'], answer: 1 },
    
    // Soalan 4: 3 - 2 = 1
    { id: 4, image: '/img/subtraction/3-2.png', question: '3 - 2', choices: ['0', '1', '2', '3'], answer: 1 },
    
    // Soalan 5: 4 - 1 = 3
    { id: 5, image: '/img/subtraction/4-1.png', question: '4 - 1', choices: ['2', '3', '4', '1'], answer: 1 },
    
    // Soalan 6: 4 - 2 = 2
    { id: 6, image: '/img/subtraction/4-2.png', question: '4 - 2', choices: ['1', '2', '3', '4'], answer: 1 }
  ],
  
  // ========== SOALAN CAMPUR ==========
  // Campur tambah DAN tolak - susah skit
  mixed: [
    // Soalan 1: 1 + 1 - 0 = 2
    // Kira dari kiri ke kanan: 1+1=2, then 2-0=2
    { id: 1, image: '/img/mixed/1+1-1.png', question: '1 + 1 - 0', choices: ['1', '2', '3', '0'], answer: 1 },
    
    // Soalan 2: 2 - 1 + 3 = 4
    // Kira: 2-1=1, then 1+3=4
    { id: 2, image: '/img/mixed/2-1+3.png', question: '2 - 1 + 3', choices: ['1', '2', '3', '4'], answer: 3 },
    
    // Soalan 3: 2 - 2 + 3 = 3
    // Kira: 2-2=0, then 0+3=3
    { id: 3, image: '/img/mixed/2-2+3.png', question: '2 - 2 + 3', choices: ['2', '3', '4', '1'], answer: 1 },
    
    // Soalan 4: 3 - 1 + 2 = 4
    // Kira: 3-1=2, then 2+2=4
    { id: 4, image: '/img/mixed/3-1+2.png', question: '3 - 1 + 2', choices: ['3', '4', '2', '5'], answer: 1 },
    
    // Soalan 5: 3 - 2 + 3 = 4
    // Kira: 3-2=1, then 1+3=4
    { id: 5, image: '/img/mixed/3-2+3.png', question: '3 - 2 + 3', choices: ['3', '4', '5', '2'], answer: 2 },
    
    // Soalan 6: 3 - 3 + 3 = 3
    // Kira: 3-3=0, then 0+3=3
    { id: 6, image: '/img/mixed/3-3+3.png', question: '3 - 3 + 3', choices: ['2', '3', '1', '4'], answer: 1 }
  ]
};

// ========== BAGI FILE LAIN BOLEH GUNA ==========
// Ni macam kita letak buku soalan kat meja, supaya semua orang boleh baca
// functions.js dan dom.js boleh ambil soalan dari sini
window.QUIZ_DATA = QUIZ_DATA;
