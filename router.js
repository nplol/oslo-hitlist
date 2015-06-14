"use strict";

const express = require('express');

let router = {};
router.api = express.Router();

router.api.get('/', function(req, res) {
  res.json({ places: null });
});

router.api.get('/:id', function(req, res) {
  res.json({ place: null });
});

module.exports = router;
