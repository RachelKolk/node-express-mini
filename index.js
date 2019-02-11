// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


//endpoints

server.post('/api/users', (req, res) => {
    const user = req.body
    db
    .insert(user)
    .then(user => {
        res.status(201).json({success: true, user});
    }) 
    .catch = () => {
        res.status(500).json({success: false, user});
    };
});


server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json({success: true, users});
    })
    .catch = () => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    };
});

server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
}); 