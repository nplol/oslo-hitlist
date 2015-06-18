"use strict";

const express   = require('express');
const Place     = require('./models/place');

let router = {
  api: {}
};

router.api.places = express.Router();

router.api.places.get('/', function(req, res) {
  // get all places
  new Place().fetchAll()
    .then(function (places) {
      res.json({ places: places });
    }).catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.api.places.post('/', function(req, res) {
  // create place
  Place.forge({ 
    name: req.query.name,
    rating: req.query.rating      
  }).save()
  .then(function (place) {
    res.json({ place: place });
  }).catch(function (err) {
    res.status(404).json({ error: err });
  });
});

router.api.places.delete('/', function(req, res) {
});

router.api.places.get('/:id', function(req, res) {
  // get place
  res.json({ place: null });
});

router.api.places.put('/:id', function(req, res) {
  // edit place
});

router.api.places.delete('/:id', function(req, res) {
  // delete place
});

module.exports = router;
