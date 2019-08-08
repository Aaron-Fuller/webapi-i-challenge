// implement your API here
const express = require('express')
const db = require('./data/db.js')
const server = express()

server.use(express.json());
//console.log(user);

server.post('/users', (req, res) => {
    const newPost =req.body;
    if (newPost.bio && newPost.name) {
        db.insert(newPost)
        .then(post => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            res.status(500).json({message: 'There was an error while saving the user to the database'})
        })
    }else{
        res.status(400).json({ message: "Please provide name and bio for the user." })
    }
});

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({
            message: "The users information could not be retrieved."
        });
    });
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params;

    if(id) {
        db.findById(id)
        .then(user => {
            res.json(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved."
            })
        })
    }else{
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
 });

 server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deletedUser => {
            if(deletedUser) { 
                res.json({deletedUser})
            }else{
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user information could not be retrieved.'
        });
    });
});

server.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.update(id, changes)
      .then(updateUser => {
        if (updateUser) {
          res.json(updateUser);
        } else {
          res.status(418).json({
            message: "invalid user id"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          err: err,
          message: "failed to update user"
        });
      });
  });

server.listen(4000, () => {
    console.log('Sever is listening on port 4000')
});