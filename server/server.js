const express = require('express');
require('dotenv').config();
const mc = require('./controllers/messagesController');
const session = require('express-session');

const { SERVER_PORT, SESSION_SECRET } = process.env
const app = (express());

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}));

app.get('/api/messages', mc.getAllMessages);
app.post('/api/messages', mc.createMessage);

app.listen(SERVER_PORT, () => {console.log(`server is running on ${SERVER_PORT}`)});