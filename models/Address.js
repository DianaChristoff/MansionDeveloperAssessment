const mongoose = require ('mongoose');

const addressSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    address1:{
        type: String,
        required:true,
    },
    address2:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    postal_code:{
        type:String,
        required:true,
    },
    phone_num: {
        type:String,
        required:true,
    },
    country:{
        type:String,
    },
    bonus_code: {
        type:Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('Address', addressSchema);