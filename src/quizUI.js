// UI-related functions for the quiz
export function updateQuizUI(question, questionType, optionsContainer, answerInput) {
    document.getElementById('question').textContent = question.question;
    
    switch(questionType) {
        case 'multiple-choice':
            optionsContainer.innerHTML = '';
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'quiz-option';
                button.onclick = () => selectOption(button);
                optionsContainer.appendChild(button);
            });
            answerInput.style.display = 'none';
            optionsContainer.style.display = 'block';
            break;
            
        case 'true-false':
            optionsContainer.innerHTML = '';
            ['True', 'False'].forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'quiz-option';
                button.onclick = () => selectOption(button);
                optionsContainer.appendChild(button);
            });
            answerInput.style.display = 'none';
            optionsContainer.style.display = 'block';
            break;
            
        case 'identification':
        case 'hard':
            optionsContainer.style.display = 'none';
            answerInput.style.display = 'block';
            answerInput.value = '';
            break;
    }
}

export function selectOption(button) {
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}

export function updateProgress(current, total) {
    document.getElementById('quiz-progress').textContent = `Question ${current + 1} of ${total}`;
}

export function showResult(message) {
    document.getElementById('quiz-result').textContent = message;
}

export function showFinalScore(score, total, onRestart) {
    const questionEl = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');
    const progressEl = document.getElementById('quiz-progress');
    const resultEl = document.getElementById('quiz-result');

    questionEl.textContent = 'Quiz Complete!';
    optionsContainer.innerHTML = '';
    answerInput.style.display = 'none';
    submitButton.style.display = 'none';
    progressEl.textContent = '';
    resultEl.textContent = `Your score: ${score} out of ${total}`;
    
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.className = 'quiz-button';
    restartButton.onclick = onRestart;
    optionsContainer.appendChild(restartButton);
}