// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


//endpoints


//  POST - creates a user using the information sent inside the request body
server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log(user);
    if (user.name == null || user.bio == null) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db
        .insert(user)
        .then(user => {
            res.status(201).json({success: true, user});
        }) 
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database" });
        });
    }   
});


//  GET - returns an array of all of the users contained in the database
server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json({success: true, users});
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    });
});


//  GET by ID - returns the user object with the specified id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db
      .findById(id)
      .then(user => {
          if (user) {
            res.status(201).json({success: true, user});
          } else {
              res.status(404).json({ message: "The user with the specified ID does not exist." });
          }   
      })
      .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." });
      });
});


//  DELETE - removes the user with the specified id and also returns that user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db
      .remove(id)
      .then(user => {
          if (user) {
              res.status(201).json({success: true, user});
          } else {
              res.status(404).json({ message: "The user with the specified ID does not exist."});
          }
      })
      .catch(err => {
          res.status(500).json({ error: "The user could not be removed" });
    });
});


// PUT - updates the user with the entered info and returns the new user info
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if (user.name == null || user.bio == null) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
    db
      .update(id, user)
      .then(updated => {
          if (updated) {
            res.status(201).json({success: true, user});  
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
          }
      })
      .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." });
      }
      )};
});

server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
});


