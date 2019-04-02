const express = require('express');
require('dotenv').config();
const mc = require('./controllers/messagesController');
const session = require('express-session');

const { SERVER_PORT, SESSION_SECRET } = process.env
const app = (express());

app.use((req, res, next) => {
    let badWords = ['bad', 'word'];
    if (req.body.message) {
        for (let i = 0; i < badWords.length; i++) {
            let regex = RegExp(badWords[i], 'g');
            req.body.message = req.body.message.replace(regex, '****');
        };
    };
    next();
});

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
}));

app.get('/api/messages', mc.getAllMessages);
app.post('/api/messages', mc.createMessage);
app.get('/api/messages/history', mc.history);

app.listen(SERVER_PORT, () => {console.log(`server is running on ${SERVER_PORT}`)});