const mongoose = require('mongoose');

const houseownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const Houseowner = mongoose.model('Houseowner', houseownerSchema);

module.exports = Houseowner;
