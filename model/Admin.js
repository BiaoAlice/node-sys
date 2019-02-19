const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    userPsd:{
        type:String,
        required:true
    }
})

module.exports = admin = mongoose.model('admin',adminSchema);