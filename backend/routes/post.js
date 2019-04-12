const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Post model in our routes module
let Post = require('../models/post');
let User = require('../models/User');

// Defined store route
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res) => {
  let post = new Post({sender: req.user._id, body: req.body.body});
  post.save()
    .then(post => {
    res.status(200).json(post);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
router.get('/',passport.authenticate('jwt', { session: false }), (req, res) => {
    let me = {id: req.user._id, name: req.user.name, avatar: req.user.avatar};
    let users = [];
    let friends = [];

    User.findOne({_id: me.id})
        .then(user => {
          if (user) {
            User.getAcceptedFriends(user)
            .then((friendships) => {
              let friends = friendships.map(function(element){return {
                  id: element.friend._id,
                  name: element.friend.name,
                  avatar: element.friend.avatar}});
              users = friends;
              users.push(me);

              let userIds = users.map(function(element) {return element.id});
              console.log(`fetching posts from user IDs:`);
              console.log(userIds);

              Post.find({sender: {$in: userIds}}, function (err, posts){
                if(err){
                  console.log(err);
                }
                else {
                  res.json((posts.reverse()).map(function(post) {
                    return {
                      user: users.find(friend => (friend.id).equals(post.sender)),
                      post: post
                    };
                  }));
                }
              });
          });
          }
        }
      );
});

router.get('/me',passport.authenticate('jwt', { session: false }), (req, res) => {
    let me = {id: req.user._id, name: req.user.name, avatar: req.user.avatar};
    let users = [];

    User.findOne({_id: me.id})
        .then(user => {
          if (user) {
              users.push(me);
              let userIds = users.map(function(element) {return element.id});
              console.log(`fetching posts from user IDs:`);
              console.log(userIds);

              Post.find({sender: {$in: userIds}}, function (err, posts){
                if(err){
                  console.log(err);
                }
                else {
                  res.json({user: me, posts: posts.reverse()});
                }
              });
          }
        }
      );
});

// Defined delete | remove | destroy route
router.route('/delete/:id').get(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = router;
