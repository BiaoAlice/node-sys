const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cityListSchema = new Schema({
    data:{
        type:Object
    }
})

module.exports = cityList = mongoose.model('cityList',cityListSchema)