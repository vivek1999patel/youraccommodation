const mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    address: String,
    moveInDate: Date,
    bedroom: Number, 
    bathroom: Number, 
    utility: Boolean, 
    furnish: Boolean, 
    parking: Number
}, {
    timestamps: true
});

var ownerSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    avatar: String, 
    properties: [propertySchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Owner', ownerSchema);