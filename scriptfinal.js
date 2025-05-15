// — SMOOTH SCROLL & ACTIVE LINK —
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Обновите закрытие меню при клике вне области
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('account-dropdown');
  const accountBtn = document.querySelector('.account-wrapper .user-account-btn');
  
  if (!accountBtn.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
  }
});

// — TABS SWITCHING —
const tabs     = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    contents.forEach(c => c.classList.add('hidden'));
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
  });
});

 // Question Database with 3 difficulty levels (Easy, Medium, Hard)
 const quizQuestions = {
  easy: [
      {
          question: "Как называется сумма, которую банк начисляет на вклад?",
          options: ["Проценты", "Дивиденды", "Комиссия"],
          correctAnswer: "Проценты",
          points: 10,
          time: 10
      },
      {
          question: "Что такое кредит?",
          options: ["Деньги, взятые в долг", "Вид страхования", "Инвестиция в акции"],
          correctAnswer: "Деньги, взятые в долг",
          points: 10,
          time: 10
      },
      {
          question: "Что из перечисленного является дебетовой картой?",
          options: ["Зарплатная карта", "Кредитная карта", "Карта с овердрафтом"],
          correctAnswer: "Зарплатная карта",
          points: 10,
          time: 10
      },
      {
          question: "Как называется ценная бумага, подтверждающая долю владения компанией?",
          options: ["Акция", "Облигация", "Вексель"],
          correctAnswer: "Акция",
          points: 10,
          time: 12
      },
      {
          question: "Что такое инфляция?",
          options: ["Рост общего уровня цен", "Снижение стоимости валюты", "Увеличение производства"],
          correctAnswer: "Рост общего уровня цен",
          points: 10,
          time: 13
      }
  ],
  medium: [
      {
          question: "Что такое диверсификация инвестиций?",
          options: ["Распределение средств между разными активами", "Вложение всех средств в один актив", "Ежемесячное пополнение инвестиций"],
          correctAnswer: "Распределение средств между разными активами",
          points: 15,
          time: 15
      },
      {
          question: "Что такое ликвидность актива?",
          options: ["Возможность быстро продать без потери стоимости", "Высокая доходность", "Низкий риск"],
          correctAnswer: "Возможность быстро продать без потери стоимости",
          points: 15,
          time: 15
      },
      {
          question: "Что означает аббревиатура ETF?",
          options: ["Exchange-Traded Fund", "Efficient Tax Framework", "Electronic Transfer Facility"],
          correctAnswer: "Exchange-Traded Fund",
          points: 15,
          time: 15
      },
      {
          question: "Что такое капитализация процентов?",
          options: ["Начисление процентов на проценты", "Выплата дивидендов акциями", "Конвертация валюты"],
          correctAnswer: "Начисление процентов на проценты",
          points: 15, 
          time: 15
      },
      {
          question: "Что такое фондовый индекс?",
          options: ["Показатель изменения стоимости группы акций", "Процентная ставка по облигациям", "Рейтинг надежности банка"],
          correctAnswer: "Показатель изменения стоимости группы акций",
          points: 15,
          time: 15
      }
  ],
  hard: [
      {
          question: "Что такое волатильность на рынке ценных бумаг?",
          options: ["Показатель изменчивости цены", "Устойчивый рост стоимости", "Государственное регулирование"],
          correctAnswer: "Показатель изменчивости цены",
          points: 20,
          time: 20
      },
      {
          question: "Что такое хеджирование инвестиций?",
          options: ["Страхование от рисков", "Краткосрочная спекуляция", "Вложение в драгоценные металлы"],
          correctAnswer: "Страхование от рисков",
          points: 20,
          time: 20
      },
      {
          question: "Что означает термин P/E ratio (Price-to-Earnings ratio)?",
          options: ["Отношение цены акции к прибыли на акцию", "Отношение активов к обязательствам", "Процент годовой доходности"],
          correctAnswer: "Отношение цены акции к прибыли на акцию",
          points: 20,
          time: 20
      },
      {
          question: "Что такое бычий и медвежий рынок?",
          options: ["Растущий и падающий рынок", "Рынки разных стран", "Типы биржевых площадок"],
          correctAnswer: "Растущий и падающий рынок",
          points: 20,
          time: 20
      },
      {
          question: "Что такое чистая приведенная стоимость (NPV)?",
          options: ["Разница между текущей стоимостью денежных притоков и оттоков", "Общая сумма инвестиций", "Рыночная капитализация компании"],
          correctAnswer: "Разница между текущей стоимостью денежных притоков и оттоков",
          points: 20,
          time: 25
      }
  ]
};

// Variables
let selectedDifficulty = 'easy'; // Default difficulty
let currentScore = 0;
let currentQuestion = 0;
let timerInterval;
let remainingTime = 0;
let activePage = 'investor-quiz-page';
let currentQuestions = []; // Will store the questions for the selected difficulty

// ======== Authentication Functions ========

// Show login page
function showLoginPage() {
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('register-page').style.display = 'none';
  document.getElementById('confirm-page').style.display = 'none';
  document.getElementById('forgot-password-page').style.display = 'none';
}

// Show register page
function showRegisterPage() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('register-page').style.display = 'flex';
  document.getElementById('confirm-page').style.display = 'none';
  document.getElementById('forgot-password-page').style.display = 'none';
}

// Show confirm page
function showConfirmPage() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('register-page').style.display = 'none';
  document.getElementById('confirm-page').style.display = 'flex';
  document.getElementById('forgot-password-page').style.display = 'none';
}

// Show forgot password page
function showForgotPasswordPage() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('register-page').style.display = 'none';
  document.getElementById('confirm-page').style.display = 'none';
  document.getElementById('forgot-password-page').style.display = 'flex';
}

// Send reset code for forgot password
function sendResetCode() {
  const email = document.getElementById('reset-email')?.value;
  
  // Simple validation
  if (!email) {
      alert('Please enter your email');
      return;
  }
  
  // Here you would normally send a reset code via your backend
  console.log('Sending reset code to:', email);
  
  // Show confirmation message
  alert('Reset code has been sent to your email');
}

// Login user
function loginUser() {
  const email = document.getElementById('login-email')?.value;
  const password = document.getElementById('login-password')?.value;
  
  // Simple validation
  if (!email || !password) {
      alert('Please enter both email and password');
      return;
  }
  
  // Here you would normally authenticate with your backend
  console.log('Logging in with:', email);
  
  // Show main app
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  
  // Initialize the app
  initializeApp();
}

// Register user
function registerUser() {
  const firstName = document.getElementById('first-name')?.value;
  const lastName = document.getElementById('last-name')?.value;
  const age = document.getElementById('age')?.value;
  const school = document.getElementById('school')?.value;
  const password = document.getElementById('new-password')?.value;
  const email = document.getElementById('email')?.value;
  
  // Simple validation
  if (!firstName || !lastName || !age || !school || !password || !email) {
      alert('Please fill in all fields');
      return;
  }
  
  // Here you would normally register with your backend and request a verification code
  console.log('Registering user:', firstName, lastName, email);
  
  // Store registration data
  localStorage.setItem('registerData', JSON.stringify({
      firstName,
      lastName,
      age,
      school,
      password,
      email
  }));
  
  // Show confirmation page
  showConfirmPage();
}

// Confirm code
function confirmCode() {
  const code = document.getElementById('verification-code')?.value;
  
  // Simple validation
  if (!code) {
      alert('Please enter the verification code');
      return;
  }
  
  // Here you would normally verify the code with your backend
  console.log('Verifying code:', code);
  
  // Show congratulations message
  document.getElementById('congrats-message').style.display = 'block';
  
  // Get registration data
  const registerData = JSON.parse(localStorage.getItem('registerData') || '{}');
  console.log('Registration completed for:', registerData.email);
  
  // Redirect to main app after delay
  setTimeout(() => {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('app-container').style.display = 'block';
      
      // Initialize the app
      initializeApp();
  }, 3000);
}

// Logout user
function logoutUser() {
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('app-container').style.display = 'none';
  
  // Reset form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  
  // Show login page
  showLoginPage();
}

// Show register form from within the app
function showRegisterFormFromApp() {
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('app-container').style.display = 'none';
  showRegisterPage();
}

// Toggle account dropdown
function toggleAccountMenu() {
  const dropdown = document.getElementById('account-dropdown');
  if (dropdown.style.display === 'flex') {
      dropdown.style.display = 'none';
  } else {
      dropdown.style.display = 'flex';
  }
}

// ======== App Initialization ========

// Initialize app
function initializeApp() {
  // Show Investor Quiz page by default
  document.getElementById('investor-quiz-page').style.display = 'block';
  document.getElementById('investor-quiz-link').classList.add('active');
  
  // Setup nav links
  setupNavLinks();
  
  // Setup event listeners
  document.getElementById('start-button').addEventListener('click', startQuiz);
  
  // Check image loading
  checkImageLoading();
  
  // Close account dropdown when clicking outside
  document.addEventListener('click', function(event) {
      const dropdown = document.getElementById('account-dropdown');
      const accountBtn = document.querySelector('.user-account-btn');
      
      if (dropdown.style.display === 'flex' && 
          !accountBtn.contains(event.target) && 
          !dropdown.contains(event.target)) {
          dropdown.style.display = 'none';
      }
  });
}

// Setup navigation links
function setupNavLinks() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const pageMap = {
    'home-link': 'home-page',
    'budget-calculator-link': 'budget-calculator-page',
    'investor-quiz-link': 'investor-quiz-page',
    'learning-hub-link': 'learning-hub-page',
    'stock-calculator-link': 'stock-calculator-page',
    'goal-tracker-link': 'goal-tracker-page',
    'about-us-link': 'about-us-page',
    'contact-link': 'contact-page'
  };

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.id === 'logout-link' || this.id === 'signin-link') return;
      
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      const pages = document.querySelectorAll('.page-content');
      pages.forEach(page => page.style.display = 'none');
      
      const pageId = pageMap[this.id];
      if (!pageId) {
        console.error('No page mapping for:', this.id);
        return;
      }
      
      const pageElement = document.getElementById(pageId);
      if (pageElement) {
        pageElement.style.display = 'block';
        window.scrollTo({
          top: pageElement.offsetTop,
          behavior: 'smooth'
        });
      } else {
        console.error('Page not found:', pageId);
      }
    });
  });
}

// Check if images are loading correctly
function checkImageLoading() {
  const imagesToCheck = ['boy.png', 'gameover.png', 'start.png', 'background.png', 'MoneyWise.png', 'boymessage.png', 'account-icon.png'];
  
  imagesToCheck.forEach(imgSrc => {
      const testImg = new Image();
      testImg.src = imgSrc;
      testImg.onerror = function() {
          console.error(`Error loading ${imgSrc}. Please make sure the file is in the correct location.`);
          
          // If it's a critical image, show a placeholder
          if (imgSrc === 'boy.png') {
              const characterImages = document.querySelectorAll('.character-image, .pixel-character, .auth-character');
              characterImages.forEach(img => {
                  img.style.backgroundColor = '#ff6b81';
                  img.style.width = '150px';
                  img.style.height = '250px';
                  img.alt = 'Character (Image Missing)';
                  img.onerror = null;
              });
          }
          
          if (imgSrc === 'boymessage.png') {
              const messageImages = document.querySelectorAll('.message-image');
              messageImages.forEach(img => {
                  img.style.backgroundColor = 'white';
                  img.style.width = '250px';
                  img.style.height = '100px';
                  img.style.borderRadius = '10px';
                  img.alt = 'Message (Image Missing)';
                  img.onerror = null;
              });
          }
          
          if (imgSrc === 'account-icon.png') {
              const accountIcons = document.querySelectorAll('.account-icon');
              accountIcons.forEach(icon => {
                  icon.style.display = 'none';
                  const parentButton = icon.closest('.user-account-btn');
                  if (parentButton) {
                      parentButton.innerHTML = '<span style="color: white; font-size: 14px;">Account</span>';
                  }
              });
          }
      };
  });
}

// ======== Quiz Functionality ========

// Set the difficulty based on user selection
function setDifficulty(difficulty) {
  selectedDifficulty = difficulty;
  
  // Highlight the selected button
  const buttons = document.querySelectorAll('.difficulty-btn');
  buttons.forEach(btn => {
      btn.classList.remove('selected');
  });
  
  // Add selected class to the clicked button
  const selectedButton = document.querySelector(`.difficulty-btn.${difficulty}`);
  if (selectedButton) {
      selectedButton.classList.add('selected');
  }
}

// Prepare questions based on selected difficulty
function prepareQuestions() {
  if (selectedDifficulty === 'mixed') {
      // For mixed difficulty, select random questions from each level
      currentQuestions = [];
      
      // Get 2 random easy questions
      const easyQuestions = getRandomQuestions(quizQuestions.easy, 2);
      // Get 2 random medium questions
      const mediumQuestions = getRandomQuestions(quizQuestions.medium, 2);
      // Get 1 random hard question
      const hardQuestions = getRandomQuestions(quizQuestions.hard, 1);
      
      // Combine all questions
      currentQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
      
      // Shuffle the combined questions
      shuffleArray(currentQuestions);
  } else {
      // Use all questions from the selected difficulty
      currentQuestions = [...quizQuestions[selectedDifficulty]];
  }
}

// Get random questions from an array
function getRandomQuestions(questionsArray, count) {
  const shuffled = [...questionsArray];
  shuffleArray(shuffled);
  return shuffled.slice(0, count);
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start the quiz
function startQuiz() {
  // Reset score
  currentScore = 0;
  
  // Prepare questions based on selected difficulty
  prepareQuestions();
  
  // Hide welcome screen
  document.getElementById('welcome-screen').style.display = 'none';
  
  // Create question elements dynamically
  createQuestionElements();
  
  // Show first question
  currentQuestion = 1;
  showQuestion(currentQuestion);
}

// Create question elements dynamically
function createQuestionElements() {
  const questionsContainer = document.getElementById('questions-container');
  
  // Clear any existing questions
  questionsContainer.innerHTML = '';
  
  // Create question elements for each question in currentQuestions
  for (let i = 0; i < currentQuestions.length; i++) {
      const questionNumber = i + 1;
      const question = currentQuestions[i];
      
      // Create question container
      const questionElement = document.createElement('div');
      questionElement.className = 'quiz-container question-screen';
      questionElement.id = `question${questionNumber}`;
      questionElement.style.display = 'none';
      
      // Create question header
      const headerElement = document.createElement('div');
      headerElement.className = 'quiz-header';
      
      const progressElement = document.createElement('div');
      progressElement.className = 'quiz-progress';
      progressElement.textContent = `Вопрос ${questionNumber} из ${currentQuestions.length}`;
      
      const scoreElement = document.createElement('div');
      scoreElement.className = 'quiz-score';
      scoreElement.id = `score${questionNumber}`;
      scoreElement.textContent = 'Счёт: 0';
      
      const timerElement = document.createElement('div');
      timerElement.className = 'quiz-timer';
      timerElement.id = `timer${questionNumber}`;
      timerElement.textContent = `⏱ ${question.time} сек`;
      
      headerElement.appendChild(progressElement);
      headerElement.appendChild(scoreElement);
      headerElement.appendChild(timerElement);
      
      // Create question box
      const questionBoxElement = document.createElement('div');
      questionBoxElement.className = 'quiz-question-box';
      
      const questionTextElement = document.createElement('h2');
      questionTextElement.className = 'quiz-question';
      questionTextElement.textContent = question.question;
      
      const difficultyElement = document.createElement('div');
      difficultyElement.className = 'quiz-difficulty';
      
      // Set difficulty text based on points
      let difficultyText = 'Легкий';
      if (question.points === 15) {
          difficultyText = 'Средний';
      } else if (question.points === 20) {
          difficultyText = 'Сложный';
      }
      
      difficultyElement.textContent = `${difficultyText} (${question.points} баллов)`;
      
      questionBoxElement.appendChild(questionTextElement);
      questionBoxElement.appendChild(difficultyElement);
      
      // Create options
      const optionsElement = document.createElement('div');
      optionsElement.className = 'quiz-options';
      
      // Add options
      for (let j = 0; j < question.options.length; j++) {
          const option = question.options[j];
          const isCorrect = option === question.correctAnswer;
          
          const optionElement = document.createElement('button');
          optionElement.className = 'quiz-option';
          optionElement.textContent = option;
          
          // Use a closure to capture the current values
          optionElement.onclick = (function(qNum, opt, correct, pts) {
              return function(event) {
                  checkAnswer(qNum, opt, correct, pts, event);
              };
          })(questionNumber, option, isCorrect, question.points);
          
          optionsElement.appendChild(optionElement);
      }
      
      // Assemble question element
      questionElement.appendChild(headerElement);
      questionElement.appendChild(questionBoxElement);
      questionElement.appendChild(optionsElement);
      
      // Add to container
      questionsContainer.appendChild(questionElement);
  }
}

// Show a specific question
function showQuestion(questionNumber) {
  // Hide all question screens
  document.querySelectorAll('.question-screen').forEach(screen => {
      screen.style.display = 'none';
  });
  
  // If we've gone through all questions, show results
  if (questionNumber > currentQuestions.length) {
      showResults();
      return;
  }
  
  // Show the current question
  const questionElement = document.getElementById('question' + questionNumber);
  if (questionElement) {
      questionElement.style.display = 'flex';
      
      // Update score on the question
      const scoreElement = document.getElementById('score' + questionNumber);
      if (scoreElement) {
          scoreElement.textContent = 'Счёт: ' + currentScore;
      }
      
      // Start timer for the question
      startTimer(questionNumber);
  }
}

// Timer functionality with visual countdown
function startTimer(questionNumber) {
  // Clear any existing interval
  clearInterval(timerInterval);
  
  // Get timer element for current question
  const timerElement = document.getElementById('timer' + questionNumber);
  
  // Set initial time based on question
  remainingTime = currentQuestions[questionNumber - 1].time;
  timerElement.innerHTML = '⏱ ' + remainingTime + ' сек';
  
  // Start countdown
  timerInterval = setInterval(function() {
      remainingTime--;
      
      // Update timer display
      timerElement.innerHTML = '⏱ ' + remainingTime + ' сек';
      
      // Check if time is up
      if (remainingTime <= 0) {
          clearInterval(timerInterval);
          
          // Auto move to next question after delay
          setTimeout(function() {
              currentQuestion++;
              showQuestion(currentQuestion);
          }, 1000);
      }
  }, 1000);
}

// Check answer for any question
function checkAnswer(questionNumber, answer, isCorrect, points, event) {
  // Stop the timer
  clearInterval(timerInterval);
  
  // Get the clicked button
  const clickedOption = event.target;
  
  // Disable all buttons for this question
  const allButtons = document.querySelectorAll('#question' + questionNumber + ' .quiz-option');
  allButtons.forEach(btn => {
      btn.disabled = true;
  });
  
  // Update button appearance based on correctness
  if (isCorrect) {
      clickedOption.classList.add('correct');
      currentScore += points; // Add points for correct answer
      
      // Update score display
      const scoreElement = document.getElementById('score' + questionNumber);
      if (scoreElement) {
          scoreElement.textContent = 'Счёт: ' + currentScore;
      }
  } else {
      clickedOption.classList.add('incorrect');
      
      // Find and highlight the correct answer
      allButtons.forEach(btn => {
          if (btn.textContent === currentQuestions[questionNumber - 1].correctAnswer) {
              btn.classList.add('correct');
          }
      });
  }
  
  // Move to next question after a delay
  setTimeout(function() {
      currentQuestion++;
      showQuestion(currentQuestion);
  }, 1500);
}

// Show results screen
function showResults() {
  // Hide all question screens
  document.querySelectorAll('.question-screen').forEach(screen => {
      screen.style.display = 'none';
  });
  
  // Set result title and emoji based on absolute score
  let resultTitle, resultEmoji, progressWidth;
  
  if (currentScore <= 20) {
      resultTitle = "Financial student!";
      resultEmoji = "🥉";
      progressWidth = "30%";
  } else if (currentScore <= 30) {
      resultTitle = "Financial expert!";
      resultEmoji = "🥈";
      progressWidth = "60%";
  } else if (currentScore <= 40) {
      resultTitle = "Financial master!";
      resultEmoji = "🥇";
      progressWidth = "80%";
  } else {
      resultTitle = "Financial genius!";
      resultEmoji = "🏆";
      progressWidth = "100%";
  }
  
  // Update result screen content
  document.getElementById('result-status').textContent = resultTitle;
  document.getElementById('result-emoji').textContent = resultEmoji;
  document.getElementById('result-points').textContent = currentScore;
  
  // Show results screen
  document.getElementById('results-screen').style.display = 'flex';
  
  // Set progress fill
  setTimeout(function() {
      document.getElementById('progress-fill').style.width = progressWidth;
  }, 500);
}

// Restart the quiz
function restartQuiz() {
  // Reset score and question
  currentScore = 0;
  currentQuestion = 0;
  
  // Hide results and show welcome screen
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('welcome-screen').style.display = 'flex';
  document.getElementById('progress-fill').style.width = '0%';
  
  // Reset all buttons
  document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('correct', 'incorrect');
  });
}

// ======== Stock Calculator functionality ========
function calculateStockReturn() {
  const startCapital = parseFloat(document.getElementById('start-capital').value) || 0;
  const annualYield = parseFloat(document.getElementById('annual-yield').value) || 0;
  const investmentPeriod = parseInt(document.getElementById('investment-period').value) || 0;
  const monthlyReplenishment = parseFloat(document.getElementById('monthly-replenishment').value) || 0;
  
  if (startCapital <= 0 || annualYield <= 0 || investmentPeriod <= 0) {
      // Instead of alert, just clear the results
      document.getElementById('years-result').textContent = investmentPeriod || '0';
      document.getElementById('invested-funds').textContent = '—';
      document.getElementById('earned-growth').textContent = '—';
      return;
  }
  
  // Calculate investment results
  const monthlyRate = annualYield / 100 / 12;
  let totalInvested = startCapital;
  let finalAmount = startCapital;
  
  for (let i = 0; i < investmentPeriod * 12; i++) {
      finalAmount = finalAmount * (1 + monthlyRate) + monthlyReplenishment;
      totalInvested += monthlyReplenishment;
  }
  
  const earned = finalAmount - totalInvested;
  
  // Update results with formatted numbers
  document.getElementById('years-result').textContent = investmentPeriod;
  
  // Format numbers with spaces for thousands
  const formatNumber = (num) => {
      return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  document.getElementById('invested-funds').textContent = formatNumber(totalInvested);
  document.getElementById('earned-growth').textContent = formatNumber(earned);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Show login page by default
  showLoginPage();
  
  // Check for authentication session
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated === 'true') {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('app-container').style.display = 'block';
      initializeApp();
  }
});






// — BUDGET CALCULATOR API & UI —
const API_URL = 'http://localhost:3000/budget';
const fields  = [
  'salary','freelance','passive','gifts',
  'housing','food','transport','health',
  'entertainment','shopping','dining','travel',
  'emergency','investments','retirement','goal-saving'
];
function updateProgress(data) {
  const income       = +data.salary + +data.freelance + +data.passive + +data.gifts;
  const essential    = +data.housing + +data.food + +data.transport + +data.health;
  const nonessential = +data.entertainment + +data.shopping + +data.dining + +data.travel;
  const savingsSum   = +data.emergency + +data.investments + +data.retirement + +data['goal-saving'];
  const spending     = essential + nonessential + savingsSum;
  const balance      = income - spending;
  document.getElementById('p-income').textContent   = `${income} tg`;
  document.getElementById('p-spending').textContent = `${spending} tg`;
  document.getElementById('p-balance').textContent  = `${balance} tg`;
}
async function loadData() {
  const res  = await fetch(API_URL);
  const data = await res.json();
  fields.forEach(f => {
    const el = document.getElementById(f);
    el.value = data[f] || 0;
    ['input','change'].forEach(evt => el.addEventListener(evt, onInputChange));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault(); onInputChange(e); el.blur();
      }
    });
  });
  updateProgress(data);
}
let debounceTimer;
async function onInputChange(e) {
  clearTimeout(debounceTimer);
  const key   = e.target.id;
  const value = e.target.value || 0;
  const current = {};
  fields.forEach(f => current[f] = (f === key ? value : document.getElementById(f).value || 0));
  updateProgress(current);
  debounceTimer = setTimeout(async () => {
    await fetch(API_URL, {
      method:  'PATCH',
      headers: {'Content-Type': 'application/json'},
      body:    JSON.stringify({ [key]: value })
    });
  }, 500);
}
loadData();





document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('goal-form');
  const quote     = form.querySelector('.quote');
  const doneBtn   = document.getElementById('goal-done');
  const nameIn    = document.getElementById('goal-name');
  const dlIn      = document.getElementById('goal-deadline');
  const tgtIn     = document.getElementById('goal-target');
  const svIn      = document.getElementById('goal-saved');
  const moti      = document.getElementById('motivation');
  const err       = document.getElementById('error-message');
  const addBtn    = document.getElementById('add-goal');
  const palette   = document.getElementById('color-palette');
  const dots      = document.querySelectorAll('.color-dot');
  const list      = document.getElementById('goals-list');

  let bgColor     = '#0057e7';
  let accentColor = '#003f8f';

  // Переключение палитры
  addBtn.addEventListener('click', () => {
    palette.style.display = palette.style.display === 'block' ? 'none' : 'block';
  });

  // Выбор цвета
  dots.forEach(dot => {
    dot.style.background = dot.dataset.bg;
    dot.addEventListener('click', () => {
      bgColor     = dot.dataset.bg;
      accentColor = dot.dataset.accent;
      palette.style.display = 'none';
      form.style.backgroundColor    = bgColor;
      quote.style.backgroundColor   = accentColor;
      doneBtn.style.backgroundColor = accentColor;
    });
  });

  // Обработка отправки формы
  form.addEventListener('submit', e => {
    e.preventDefault();
    err.textContent = '';
    moti.textContent = '';

    const name  = nameIn.value.trim();
    const dl    = dlIn.value.trim();
    const tgt   = parseFloat(tgtIn.value.replace(/\D/g, ''), 10);
    const saved = parseFloat(svIn.value.replace(/\D/g, ''), 10);

    if (!name || !dl || isNaN(tgt) || isNaN(saved) || tgt <= 0) {
      err.textContent = 'Заполните все поля корректно.';
      return;
    }

    const pct = Math.round((saved / tgt) * 100);
    moti.textContent = `You’re ${pct}% closer to your dream!`;

    // Добавляем в список
    const item = document.createElement('div');
    item.className = 'goal-item';
    item.style.backgroundColor = bgColor;
    item.innerHTML = `
      <h3>${name}</h3>
      <span class="more">more…</span>
      <div class="details">
        <p><strong>Deadline:</strong> ${dl}</p>
        <p><strong>Target:</strong> ${tgt.toLocaleString()} tg</p>
        <p><strong>Saved:</strong> ${saved.toLocaleString()} tg</p>
      </div>
    `;
    list.appendChild(item);

    // «more…» переключает подробности
    const moreBtn = item.querySelector('.more');
    const details = item.querySelector('.details');
    moreBtn.addEventListener('click', () => {
      const shown = details.style.display === 'block';
      details.style.display = shown ? 'none' : 'block';
      moreBtn.textContent    = shown ? 'more…' : 'less…';
    });

    form.reset();
  });
});



// — FAQ TOGGLER —
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const block = btn.parentElement;
    block.classList.toggle('active');
    btn.querySelector('.icon').textContent = block.classList.contains('active') ? '–' : '+';
  });
});


// ===== Логика на странице Contact =====
document.getElementById('send-btn').addEventListener('click', () => {
  const name  = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();
  const fb    = document.getElementById('form-feedback');

  if (!name || !email || !msg) {
    fb.textContent = 'Please fill in all fields.';
    fb.style.color = 'red';
    return;
  }

  fb.textContent = 'Сообщение отправлено!';
  fb.style.color = 'green';

  // Если нужно — можно очистить форму:
  // document.getElementById('full-name').value = '';
  // document.getElementById('email').value     = '';
  // document.getElementById('message').value   = '';
});

