const express = require('express');
const connection = require('./config/config');
const user = require('./controller/user/user');
const login = require('./controller/user/login');

const jwt = require('jsonwebtoken')

// const path = require('path');
const app = express();
const port = process.env.PORT || 5000;


connection.db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database music');
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(404);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req,user = user
        next()
    })
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded());

app.set('port', process.env.port || port); // set express to use this port

app.post('/signup', user.createUser);
app.post('/login',  login.loginUser);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
