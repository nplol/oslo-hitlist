"use strict";

const express   = require('express');
const Place     = require('./models/place');

let router = {
  api: {}
};

router.api.places = express.Router();

// Index route: GET all places
router.api.places.get('/', function(req, res) {
  Place.fetchAll()
    .then(function (places) {
      res.json({ places: places });
    }).catch(function (err) {
      res.status(500).json({ error: err });
    });
});

// Create route: CREATE new place
router.api.places.post('/', function(req, res) {
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

// Delete route: DELETE all places
router.api.places.delete('/', function(req, res) {
  Place.fetchAll().then(function (places) {
    places.forEach(function (place) { place.destroy(); });
    res.json({ message: 'places deleted' });
  }).catch(function (err) {
    res.status(404).json({ error: err });
  });
});

// Show route: GET a single place
router.api.places.get('/:id', function(req, res) {
  // get place
  Place.forge({ id: req.params.id }).fetch({ require: true})
  .then(function (place) {
    res.json(place);
  }).catch(function(err) {
    res.status(404).json({ error: err }); 
  });
});

// Update route: UPDATE a single place
router.api.places.put('/:id', function(req, res) {
  // update place
});

// Delete route: DELETE a single place
router.api.places.delete('/:id', function(req, res) {
  // delete place
});

module.exports = router;
