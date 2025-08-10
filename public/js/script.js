class TrafficSafetyApp {
    constructor() {
        this.currentQuestion = null;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Quiz button click
        const quizBtn = document.getElementById('quiz-btn');
        if (quizBtn) {
            quizBtn.addEventListener('click', () => this.startQuiz());
        }

        // Modal close buttons
        const closeModalBtn = document.getElementById('close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal('quiz-modal'));
        }

        const closeResultBtn = document.getElementById('close-result-btn');
        if (closeResultBtn) {
            closeResultBtn.addEventListener('click', () => this.closeModal('result-modal'));
        }

        // Next question button
        const nextQuestionBtn = document.getElementById('next-question-btn');
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => this.loadNextQuestion());
        }

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    async startQuiz() {
        this.showModal('quiz-modal');
        await this.loadQuestion();
    }

    async loadQuestion() {
        const quizContent = document.getElementById('quiz-content');
        if (!quizContent) return;

        // Show loading
        quizContent.innerHTML = `
            <div class="loading">
                <span class="material-icons rotating">hourglass_empty</span>
                <p>Đang tải câu hỏi...</p>
            </div>
        `;

        try {
            const response = await fetch('/quiz');
            if (!response.ok) {
                throw new Error('Failed to load question');
            }

            const question = await response.json();
            this.currentQuestion = question;
            this.displayQuestion(question);
        } catch (error) {
            console.error('Error loading question:', error);
            quizContent.innerHTML = `
                <div class="error">
                    <span class="material-icons">error</span>
                    <p>Có lỗi xảy ra khi tải câu hỏi. Vui lòng thử lại.</p>
                    <button class="btn btn-primary" onclick="app.loadQuestion()">
                        <span class="material-icons">refresh</span>
                        Thử lại
                    </button>
                </div>
            `;
        }
    }

    displayQuestion(question) {
        const quizContent = document.getElementById('quiz-content');
        if (!quizContent) return;

        const optionsHtml = question.options.map((option, index) => `
            <button class="option-btn" onclick="app.selectAnswer('${option}')">
                ${option}
            </button>
        `).join('');

        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    }

    async selectAnswer(answer) {
        if (!this.currentQuestion) return;

        // Disable all option buttons
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });

        try {
            const response = await fetch('/quiz/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId: this.currentQuestion.id,
                    answer: answer
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit answer');
            }

            const result = await response.json();
            this.showResult(result, answer);
        } catch (error) {
            console.error('Error submitting answer:', error);
            // Re-enable buttons on error
            optionBtns.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
            });
        }
    }

    showResult(result, userAnswer) {
        this.closeModal('quiz-modal');
        
        const resultTitle = document.getElementById('result-title');
        const resultContent = document.getElementById('result-content');
        
        if (!resultTitle || !resultContent) return;

        if (result.correct) {
            resultTitle.textContent = 'Chính xác!';
            resultContent.innerHTML = `
                <div class="result-correct">
                    <div class="result-icon">
                        <span class="material-icons">check_circle</span>
                    </div>
                    <div class="result-message">
                        Bạn đã trả lời đúng!
                    </div>
                    <div class="correct-answer">
                        <strong>Đáp án:</strong> ${result.correctAnswer}
                    </div>
                </div>
            `;
        } else {
            resultTitle.textContent = 'Chưa chính xác';
            let penaltyHtml = '';
            
            if (result.penalty) {
                penaltyHtml = `
                    <div class="penalty-message">
                        <div class="penalty-title">
                            <span class="material-icons">warning</span>
                            Hình phạt
                        </div>
                        <div class="penalty-text">${result.penalty}</div>
                    </div>
                `;
            }

            resultContent.innerHTML = `
                <div class="result-incorrect">
                    <div class="result-icon">
                        <span class="material-icons">cancel</span>
                    </div>
                    <div class="result-message">
                        Câu trả lời chưa chính xác
                    </div>
                    <div class="correct-answer">
                        <strong>Đáp án đúng:</strong> ${result.correctAnswer}
                    </div>
                    ${penaltyHtml}
                </div>
            `;
        }

        // Store next question for later use
        this.nextQuestion = result.nextQuestion;
        
        this.showModal('result-modal');
    }

    loadNextQuestion() {
        this.closeModal('result-modal');
        
        if (this.nextQuestion) {
            this.currentQuestion = this.nextQuestion;
            this.nextQuestion = null;
            this.showModal('quiz-modal');
            this.displayQuestion(this.currentQuestion);
        } else {
            this.startQuiz();
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TrafficSafetyApp();
});

// Utility functions for smooth scrolling
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some visual feedback for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.card-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.parentElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999;">
                    <span class="material-icons" style="font-size: 3rem;">image_not_supported</span>
                </div>
            `;
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add keyboard navigation for quiz
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quiz-modal').classList.contains('show')) {
        const optionBtns = document.querySelectorAll('.option-btn:not([disabled])');
        
        if (e.key >= '1' && e.key <= '9') {
            const index = parseInt(e.key) - 1;
            if (index < optionBtns.length) {
                optionBtns[index].click();
            }
        }
    }
});
