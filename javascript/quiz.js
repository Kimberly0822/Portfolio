const quizData = [
    {
        type: 'single-choice',
        question: 'What is the highest attainable spell slot?',
        options: ['10th', '8th', '7th', '9th'],
        correctAnswer: '9th'
    },
    {
        type: 'multiple-choice',
        question: 'Which of the following are monster types?',
        options: ['Elemental', 'Fiend', 'Skeleton', 'Mythical'],
        correctAnswers: ['Elemental', 'Fiend']
    },
    {
        type: 'free-flow',
        question: 'What dice is used for most rolls in dnd (attacks, skills, saving throws)?',
        correctAnswer: 'd20'
    },
    {
        type: 'single-choice',
        question: 'What stat can you use to increase your Armor Class?',
        options: ['Agility', 'Dexterity', 'Defense', 'Fortify'],
        correctAnswer: 'Dexterity'
    },
    {
        type: 'multiple-choice',
        question: 'Which are stats used in dnd?',
        options: ['Charm', 'Strength', 'Constitution', 'Wisdom'],
        correctAnswers: ['Strength', 'Constitution', 'Wisdom']
    },
    {
        type: 'free-flow',
        question: 'What does dnd stand for?',
        correctAnswer: 'Dungeons and Dragons'
    }
            // Add more questions here
        ];

const quizForm = document.getElementById('quiz-form');
const resultsContainer = document.getElementById('results-container');
const resultsDiv = document.getElementById('results');
const scoreDisplay = document.getElementById('score-display');
const submitButton = document.querySelector('button_quiz[onclick="submitQuiz()"]');
const restartButton = document.getElementById('restart-button');
const errorMessage = document.getElementById('error-message');

function renderQuiz() {
    quizForm.innerHTML = ''; // Clear previous questions
    quizData.forEach((questionData, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>${index + 1}. ${questionData.question}</h3>`;
        questionDiv.dataset.questionIndex = index;  // Store index for checking answers
        
        if (questionData.type === 'single-choice') {
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
            questionData.options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${index}`;
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(` ${option}`));
                optionsDiv.appendChild(label);
            });
            
            questionDiv.appendChild(optionsDiv);
        } else if (questionData.type === 'multiple-choice') {
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
            questionData.options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `question-${index}[]`; // Use array notation for multiple choices
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(` ${option}`));
                optionsDiv.appendChild(label);
            });
            
            questionDiv.appendChild(optionsDiv);
        } else if (questionData.type === 'free-flow') {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('free-flow-input');
            input.name = `question-${index}`;
            questionDiv.appendChild(input);
        }
        
        quizForm.appendChild(questionDiv);
    });
}

function checkAllAnswered() {
    for (let i = 0; i < quizData.length; i++) {
        const questionData = quizData[i];
        const questionName = `question-${i}`;
        
        if (questionData.type === 'single-choice') {
            const checked = quizForm.querySelector(`input[name="${questionName}"]:checked`);
            if (!checked) {
                return false;
            }
        
        } else if (questionData.type === 'multiple-choice') {
            const checked = quizForm.querySelectorAll(`input[name="${questionName}[]"]:checked`);
            if (checked.length === 0) {
                return false;
            }
        
        } else if (questionData.type === 'free-flow') {
            const input = quizForm.querySelector(`input[name="${questionName}"]`);
            if (!input || input.value.trim() === '') {
                return false;
            }
        }
    }
    return true;
}

function submitQuiz() {
    if (!checkAllAnswered()) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }
    
    let score = 0;
    const userAnswers = {};
    
    quizData.forEach((questionData, index) => {
        const questionName = `question-${index}`;
        
        if (questionData.type === 'single-choice') {
            const selectedOption = quizForm.querySelector(`input[name="${questionName}"]:checked`);
            if (selectedOption) {
                userAnswers[questionName] = selectedOption.value;
                if (selectedOption.value === questionData.correctAnswer) {
                    score++;
                }
            }
        
        } else if (questionData.type === 'multiple-choice') {
            const selectedOptions = Array.from(quizForm.querySelectorAll(`input[name="${questionName}[]"]:checked`)).map(input => input.value);
            userAnswers[questionName] = selectedOptions;
            const correctAnswers = questionData.correctAnswers.sort();
            const userSelectedSorted = selectedOptions.sort();
            
            if (JSON.stringify(correctAnswers) === JSON.stringify(userSelectedSorted)) {
                score++;
            }
        
        } else if (questionData.type === 'free-flow') {
            const userAnswer = quizForm.querySelector(`input[name="${questionName}"]`).value.trim();
            userAnswers[questionName] = userAnswer;
            
            if (userAnswer.toLowerCase() === questionData.correctAnswer.toLowerCase()) {
                score++;
            }
        }
    });

displayResults(score, quizData.length, userAnswers);
submitButton.style.display = 'none'; // Hide submit button after submission
restartButton.style.display = 'inline-block'; // Show restart button
}

function displayResults(score, totalQuestions, userAnswers) {
    scoreDisplay.textContent = `You scored ${score} out of ${totalQuestions}!`;
    resultsDiv.innerHTML = ''; // Clear previous results
    
    quizData.forEach((questionData, index) => {
        const questionResultDiv = document.createElement('div');
        questionResultDiv.innerHTML = `<strong>${index + 1}. ${questionData.question}</strong><br>`;
        
        const userAnswer = userAnswers[`question-${index}`];
        
        if (questionData.type === 'single-choice') {
            questionResultDiv.innerHTML += `Your answer: ${userAnswer || 'Not answered'}<br>`;
            if (userAnswer === questionData.correctAnswer) {
                questionResultDiv.classList.add('correct');
                questionResultDiv.innerHTML += `Correct answer: ${questionData.correctAnswer}`;
            } else {
                questionResultDiv.classList.add('incorrect');
                questionResultDiv.innerHTML += `Correct answer: ${questionData.correctAnswer}`;
            }
        
        } else if (questionData.type === 'multiple-choice') {
            questionResultDiv.innerHTML += `Your answers: ${userAnswer && userAnswer.length > 0 ? userAnswer.join(', ') : 'Not answered'}<br>`;
            const correctAnswers = questionData.correctAnswers.sort();
            const userSelectedSorted = (userAnswer || []).sort();
            if (JSON.stringify(correctAnswers) === JSON.stringify(userSelectedSorted)) {
                questionResultDiv.classList.add('correct');
                questionResultDiv.innerHTML += `Correct answers: ${questionData.correctAnswers.join(', ')}`;
            } else {
                questionResultDiv.classList.add('incorrect');
                questionResultDiv.innerHTML += `Correct answers: ${questionData.correctAnswers.join(', ')}`;
            }
        
        } else if (questionData.type === 'free-flow') {
            questionResultDiv.innerHTML += `Your answer: ${userAnswer}<br>`;
            if (userAnswer && userAnswer.toLowerCase() === questionData.correctAnswer.toLowerCase()) {
                questionResultDiv.classList.add('correct');
                questionResultDiv.innerHTML += `Correct answer: ${questionData.correctAnswer}`;
            } else {
                questionResultDiv.classList.add('incorrect');
                questionResultDiv.innerHTML += `Correct answer: ${questionData.correctAnswer}`;
            }
        }
        
        resultsDiv.appendChild(questionResultDiv);
    });
    
    resultsContainer.style.display = 'block';
}

function restartQuiz() {
    resultsContainer.style.display = 'none'; // Hide results
    submitButton.style.display = 'inline-block'; // Show submit button
    restartButton.style.display = 'none'; // Hide restart button
    errorMessage.style.display = 'none'; // Hide any previous error message
    renderQuiz(); // Re-render the quiz questions
}

// Initialize the quiz when the page loads
renderQuiz();
restartButton.style.display = 'none'; // Initially hide the restart button