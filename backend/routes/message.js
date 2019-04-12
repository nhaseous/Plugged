const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Messages model in our routes module
let Message = require('../models/Message');
let User = require('../models/User');

// Defined store route
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({_id: req.user.id})
      .then(user1 => {
        if (user1) {
          User.findOne({_id: req.body.id})
              .then(user2 => {
                if (user2) {
                  let users = [user1, user2];
                  const message = new Message({
                    message: {text: req.body.message},
                    users: [user1, user2],
                    sender: user1
                  });
                  console.log(message);
                  message.save();

                  let connections = (user1.connections).filter(item => !(item._id).equals(user2._id));
                  if (!(JSON.stringify(connections)).includes(JSON.stringify({_id: user2._id}))) {
                    console.log('adding new user');
                    connections.push(user2);
                    user1.connections = connections;
                    user1.save();
                  } else {
                    (user1.connections).map(function(element) {
                      console.log(element);
                    });
                  }

                  connections = (user2.connections).filter(item => !(item._id).equals(user1._id));
                  if (!(JSON.stringify(connections)).includes(JSON.stringify({_id: user1._id}))) {
                    console.log('adding new user');
                    connections.push(user1);
                    user2.connections = connections;
                    user2.save();
                  } else {
                    (user2.connections).map(function(element) {
                      console.log(element);
                    });
                  }

                  res.json('post added');
                }
              });
        }
      });
});

router.post('/add/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({_id: req.user.id})
      .then(user1 => {
        if (user1) {
          User.findOne({email: req.body.email})
              .then(user2 => {
                if (user2) {
                  let connections = (user1.connections).filter(item => !(item._id).equals(user2._id));
                  if (!(JSON.stringify(connections)).includes(JSON.stringify({_id: user2._id}))) {
                    console.log('adding new user');
                    connections.push(user2);
                    user1.connections = connections;
                    user1.save();
                  } else {
                    (user1.connections).map(function(element) {
                      console.log(element);
                    });
                  }
                  res.json(user1.connections);
                }
              });
        }
      });
});

// Defined get data(index or listing) route

router.post('/get', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({_id: req.user.id})
      .then(user1 => {
        if (user1) {
          User.findOne({_id: req.body.id})
              .then(user2 => {
                if (user2) {
                  Message.find({ users: { "$all" : [user1,user2]} })
                    .sort({ updatedAt: -1 })
                    .limit(20)
                    .then(messages => {
                      console.log("found messages between users:");
                      console.log([user1._id, user2._id]);
                      res.json(messages);
                    })
                }
              });
        }
      });
});

module.exports = router;
