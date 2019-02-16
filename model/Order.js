const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    tell:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    msg:{
        type:Object,
        required:true
    }
})

module.exports = order = mongoose.model('order',orderSchema);
