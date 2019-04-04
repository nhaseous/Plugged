const express = require('express');
const router = express.Router();

// Require Post model in our routes module
let Post = require('../models/Post');

// Defined store route
router.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(post => {
    res.status(200).json(post);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
router.route('/').get(function (req, res) {
    Post.find(function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts.reverse());
    }
  });
});

// Defined delete | remove | destroy route
router.route('/delete/:id').get(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = router;
