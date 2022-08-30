var express = require('express');
var router = express.Router();
const ownerCtrl = require('../controllers/owners')

/* GET users listing. */
router.get('/owners', ownerCtrl.index);
// redirect user to create new listing page
router.get('/owners/:id/new', ownerCtrl.new);
// Create new listing
router.post('/owners/:id', ownerCtrl.create);
// delete a listing
router.delete('/owners/:propertyId', ownerCtrl.delete);
// redirect user to edit listing
router.get('/owners/:id', ownerCtrl.edit)
// Update listing info
router.put('/owners/:id', ownerCtrl.update)

module.exports = router;
