const Owner = require('../models/owner');

module.exports = {
    index, 
    new: newOne
}

function index(req, res) {
    res.render('owner/index')
}

function newOne(req, res) {
    res.render('owner/new')
}