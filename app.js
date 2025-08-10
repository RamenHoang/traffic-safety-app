const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Parse JSON bodies
app.use(express.json());

// Load data files
const loadData = (filename) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, filename), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
};

// Load all data
const questions = loadData('question.json');
const penalties = loadData('penalties.json');
const bienBaoCam = loadData('knowledges/bien-bao-cam.json');
const bienBaoNguyHiem = loadData('knowledges/bien-bao-nguy-hiem.json');
const bienBaoHieuLenh = loadData('knowledges/bien-bao-hieu-lenh.json');

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        bienBaoCam,
        bienBaoNguyHiem,
        bienBaoHieuLenh
    });
});

app.get('/quiz', (req, res) => {
    if (questions.length === 0) {
        return res.status(500).json({ error: 'No questions available' });
    }
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json(randomQuestion);
});

app.post('/quiz/answer', (req, res) => {
    const { questionId, answer } = req.body;
    
    const question = questions.find(q => q.id === questionId);
    if (!question) {
        return res.status(404).json({ error: 'Question not found' });
    }
    
    const isCorrect = answer === question.correctAnswer;
    let penalty = null;
    
    if (!isCorrect && penalties.length > 0) {
        penalty = penalties[Math.floor(Math.random() * penalties.length)];
    }
    
    // Get next random question
    const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    res.json({
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        penalty,
        nextQuestion
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
