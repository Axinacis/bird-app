const mongoose = require('mongoose');
const birdSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }, place: {
        type: String,
        require: true
    }, count: {
        type: Number,
        default: 1,
        validate: (x) => {
            return x > 0 && Number.isInteger(x)
        }

    }


});

const Bird = mongoose.model('Bird', birdSchema);
module.exports = Bird;

/*validator: function (v) {
    return v.length > 1
}*/

/*
number: {
    type     : Number,
        required : true,
        unique   : true,
        validate : {
        validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
    }
}*/
