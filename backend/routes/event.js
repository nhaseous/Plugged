const express = require('express');
const router = express.Router();
const passport = require('passport');
var ticketmaster = require('ticketmaster');

let User = require('../models/User');

router.post('/', (req, res) => {
  req.body.size = "5";
  req.body.countryCode = "US";
  req.body.sort = "date,name,asc";
  ticketmaster('ZN1JHs4X6QNhe6FG7nSyy35pXZWpSCXt').discovery.v2.event.all(req.body)
      .then(function(result) {
        // "result" is an object of Ticketmaster events information
        if (result.page.totalElements) {
          console.log("Found events that matched your search:");
          console.log({page: result.page, qs: result.qs});
        }
        res.json(result);
      })
      .catch(function(error) {
        console.log(error);
        res.json(error);
      });
});

router.post('/add',passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({_id: req.user.id})
      .then(user => {
          if(!user) {
              errors.email = 'User not found';
              return res.status(404).json(errors);
          }
          if (req.body.status) {
            if (!(req.body.status === 'going' || req.body.status === 'interested')) {
              errors.status = 'wrong status';
              return res.status(404).json(errors);
            }
          } else {
            errors.status = 'missing status';
            return res.status(404).json(errors);
          }

          const status = user.events.find(function(element) {return element.event.id === req.body.event.id});
          if (status) {
            user.events = user.events.filter(element => element.event.id !== req.body.event.id);
          }
          user.events.push({event: req.body.event, status: req.body.status});
          user
            .save()
            .then(user => {
                console.log(`registered ${req.body.event.id} to events`);
                res.json({event: req.body.event, status: req.body.status});
            });
      });
});

router.get('/remove/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({_id: req.user.id})
      .then(user => {
          if(!user) {
              errors.email = 'User not found';
              return res.status(404).json(errors);
          }

          user.events = user.events.filter(element => element.event.id !== req.params.id);
          user
            .save()
            .then(user => {
                res.json(req.params.id);
            });
      });
});

router.get('/get/:id', (req, res) => {
  ticketmaster('ZN1JHs4X6QNhe6FG7nSyy35pXZWpSCXt').discovery.v2.event.all({id: req.params.id})
      .then(function(result) {
        // "result" is an object of Ticketmaster events information
        if (result.page.totalElements) {
          console.log("Found events that matched your search:");
          console.log({page: result.page, qs: result.qs});
        }
        res.json(result);
      })
      .catch(function(error) {
        console.log(error);
        res.json(error);
      });
});

router.get('/going',passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user.events);
});

module.exports = router;
