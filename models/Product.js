const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
    //    data: Buffer,
        type: String,
        required: true
    },
    availQty: {
        type: Number,
        min: 0,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = mongoose.model('Products', ProductSchema);