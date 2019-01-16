const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jdListSchema = new Schema({
    label:{
        type:String
    },
    name:{
        type:String
    }
})

module.exports = jdList = mongoose.model('jdList',jdListSchema);