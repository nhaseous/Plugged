const express = require('express');
const router = express.Router();
const passport = require('passport');
var ticketmaster = require('ticketmaster');

router.post('/', (req, res) => {
  req.body.size = "5";
  req.body.keyword = "music";
  req.body.countryCode = "US";
  if (req.body.startDateTime) {
    req.body.startDateTime = req.body.startDateTime.split(".")[0] + 'Z';
  }
  if (req.body.endDateTime) {
  req.body.endDateTime = req.body.endDateTime.split(".")[0] + 'Z';
  }
  req.body.sort = "date,name,asc";
  ticketmaster('ZN1JHs4X6QNhe6FG7nSyy35pXZWpSCXt').discovery.v2.event.all(req.body)
      .then(function(result) {
        // "result" is an object of Ticketmaster events information
        console.log("Found events that matched your search:");
        console.log({page: result.page, qs: result.qs});
        res.json(result);
      });
});

module.exports = router;
