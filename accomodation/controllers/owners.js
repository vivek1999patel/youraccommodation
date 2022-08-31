const Owner = require('../models/owner');

module.exports = {
    index, 
    new: newOne,
    create, 
    delete: deleteOne,
    edit,
    update
}

function index(req, res) {
    console.log(req.user)
    Owner.findById(req.user._id, function(err, owner) {
        if(err) return console.log(err)
        // console.log(owner)
        console.log(owner.properties)
        res.render('owner/index', {owner})
    })
}

function newOne(req, res) {
    // console.log(req.params.id)
    Owner.findById(req.params.id, function(err, owner) {
        // console.log(owner)
        if(err) return console.log(err)
        res.render('owner/new', {owner})
    })
}

function create(req, res) {
    Owner.findById(req.params.id, function(err, owner) {
        // console.log(owner)
        if(err) return console.log(err)
        owner.properties.push(req.body)
        owner.save(function(err) {
            if(err) console.log(err)
            // console.log(owner.properties)
            res.render('owner/new', {owner})
        })
    })
}

function deleteOne(req, res) {
    Owner.findOne({'properties._id' : req.params.propertyId}, function(err, owner) {
        owner.properties.id(req.params.propertyId).remove();
        owner.save(function(err){
            res.render('owner/index', {owner})
        })
    })
}

function edit(req, res) {
    Owner.findOne({'properties._id' : req.params.id}, function(err, ownerProperty) {
        console.log(ownerProperty)
        let property = ownerProperty.properties.id(req.params.id)
        console.log(property)
        res.render('owner/update', {property});
    })
}

function update(req, res){
    Owner.findOne({'properties._id' : req.params.id}, function(err, owner) {
        // console.log("Checking For Owner", ownerProperty)
        let property = owner.properties.id(req.params.id)
        console.log("Before Changes", property)
        property.address = req.body.address
        property.moveInDate = req.body.moveInDate
        property.bedroom = req.body.bedroom
        property.bathroom = req.body.bathroom
        property.utility = req.body.utility
        property.furnish = req.body.furnish
        property.parking = req.body.parking
        console.log(property)
        // console.log("After Checking For Owner", ownerProperty)
        owner.save(function(err){
            res.render('owner/index', {owner})
        })
    })
}