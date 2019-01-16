const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    studentId:{
        type:String,
        required:true
    },
    studentName:{
        type:String,
        required:true
    },
    studentPsd:{
        type:String,
        required:true
    },
})

module.exports = user = mongoose.model('user',userSchema);