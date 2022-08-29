const Owner = require('../models/owner');

module.exports = {
    index
}

function index(req, res) {
    res.render('owner/index')
}