import { multipleChoiceQuestions, identificationQuestions } from './quizData.js';
import { updateQuizUI, selectOption, updateProgress, showResult, showFinalScore } from './quizUI.js';

export function startQuiz() {
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = multipleChoiceQuestions.length + identificationQuestions.length;

    const optionsContainer = document.getElementById('options-container');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');

    function showQuestion() {
        showResult('');
        updateProgress(currentQuestion, totalQuestions);

        const isMultipleChoice = currentQuestion < multipleChoiceQuestions.length;
        const question = isMultipleChoice 
            ? multipleChoiceQuestions[currentQuestion]
            : identificationQuestions[currentQuestion - multipleChoiceQuestions.length];

        updateQuizUI(question, isMultipleChoice, optionsContainer, answerInput);
        submitButton.style.display = 'block';
    }

    function checkAnswer() {
        const isMultipleChoice = currentQuestion < multipleChoiceQuestions.length;
        
        if (isMultipleChoice) {
            const selected = document.querySelector('.quiz-option.selected');
            if (!selected) {
                showResult('Please select an answer!');
                return;
            }
            
            if (selected.textContent === multipleChoiceQuestions[currentQuestion].correct) {
                score++;
                showResult('Correct!');
            } else {
                showResult('Incorrect!');
            }
        } else {
            const userAnswer = answerInput.value.trim().toLowerCase();
            const correctAnswer = identificationQuestions[currentQuestion - multipleChoiceQuestions.length].answer.toLowerCase();
            
            if (!userAnswer) {
                showResult('Please enter an answer!');
                return;
            }
            
            if (userAnswer === correctAnswer) {
                score++;
                showResult('Correct!');
            } else {
                showResult('Incorrect!');
            }
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < totalQuestions) {
                showQuestion();
            } else {
                showFinalScore(score, totalQuestions, () => {
                    currentQuestion = 0;
                    score = 0;
                    showQuestion();
                });
            }
        }, 1000);
    }

    submitButton.onclick = checkAnswer;
    showQuestion();
}