const mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    address: String,
    moveInDate: Date,
    bedroom: Number, 
    bathroom: Number, 
    utility: String, 
    furnish: String, 
    parking: Number,
    rent: Number,
    image: String
}, {
    timestamps: true
});

var ownerSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    avatar: String, 
    properties: [propertySchema],
    googleId: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Owner', ownerSchema);