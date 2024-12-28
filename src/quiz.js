import { multipleChoiceQuestions, identificationQuestions, trueFalseQuestions, hardQuestions } from './quizData.js';
import { updateQuizUI, selectOption, updateProgress, showResult, showFinalScore } from './quizUI.js';

export function startQuiz() {
    let currentQuestion = 0;
    let score = 0;
    const allQuestions = [
        ...multipleChoiceQuestions.map(q => ({ ...q, type: 'multiple-choice' })),
        ...identificationQuestions.map(q => ({ ...q, type: 'identification' })),
        ...trueFalseQuestions.map(q => ({ ...q, type: 'true-false' })),
        ...hardQuestions.map(q => ({ ...q, type: 'hard' }))
    ];
    const totalQuestions = allQuestions.length;

    const optionsContainer = document.getElementById('options-container');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');

    function showQuestion() {
        showResult('');
        updateProgress(currentQuestion, totalQuestions);
        const question = allQuestions[currentQuestion];
        updateQuizUI(question, question.type, optionsContainer, answerInput);
        submitButton.style.display = 'block';
    }

    function checkAnswer() {
        const question = allQuestions[currentQuestion];
        let isCorrect = false;
        
        switch(question.type) {
            case 'multiple-choice':
                const selected = document.querySelector('.quiz-option.selected');
                if (!selected) {
                    showResult('Please select an answer!');
                    return;
                }
                isCorrect = selected.textContent === question.correct;
                break;
                
            case 'true-false':
                const selectedOption = document.querySelector('.quiz-option.selected');
                if (!selectedOption) {
                    showResult('Please select True or False!');
                    return;
                }
                isCorrect = (selectedOption.textContent === 'True') === question.answer;
                break;
                
            case 'identification':
            case 'hard':
                const userAnswer = answerInput.value.trim().toLowerCase();
                if (!userAnswer) {
                    showResult('Please enter an answer!');
                    return;
                }
                isCorrect = userAnswer === question.answer.toLowerCase();
                break;
        }

        if (isCorrect) {
            score++;
            showResult('Correct!');
        } else {
            showResult('Incorrect!');
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


