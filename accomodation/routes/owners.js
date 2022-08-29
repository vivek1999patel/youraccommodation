var express = require('express');
var router = express.Router();
const ownerCtrl = require('../controllers/owners')

/* GET users listing. */
router.get('/owners', ownerCtrl.index);

// add new listing
router.get('/owners/new', ownerCtrl.new);

module.exports = router;
