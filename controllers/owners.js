const Owner = require('../models/owner');
const request = require('request')
const fs = require('fs')

module.exports = {
    index, 
    new: newOne,
    create, 
    delete: deleteOne,
    edit,
    update
}

function base64_encode(image) {
    // read binary data
    var binary = fs.readFileSync(image);
    // convert binary to base64 data type
    return binary.toString('base64');
}

function index(req, res) {
    console.log(req.user)
    Owner.findById(req.user._id, function(err, owner) {
        if(err) return console.log(err)
        res.render('owner/index', {owner})
    })
}

function newOne(req, res) {
    Owner.findById(req.params.id, function(err, owner) {
        if(err) return console.log(err)
        res.render('owner/new', {owner})
    })
}

function create(req, res) {
    let image = base64_encode(req.file.path)
    const options = {
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
        formData: {
          image: image,
          type: 'base64'
        },
      };    
    Owner.findById(req.params.id, function(err, owner) {
        if(err) return console.log(err)
        request(options, function(err, response) {
            if(err) return console.log(err);
            let body = JSON.parse(response.body)
            req.body.image = body.data.link;
            owner.properties.push(req.body)
            owner.save(function(err) {
                if(err) console.log(err)
                res.render('owner/new', {owner})
            })
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
        let property = owner.properties.id(req.params.id)
        console.log("Before Changes", property)
        property.address = req.body.address
        property.moveInDate = req.body.moveInDate
        property.bedroom = req.body.bedroom
        property.bathroom = req.body.bathroom
        property.utility = req.body.utility
        property.furnish = req.body.furnish
        property.parking = req.body.parking
        property.rent = req.body.rent
        console.log(property)
        owner.save(function(err){
            res.render('owner/index', {owner})
        })
    })
}