const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    index: true,
    unique: true,
    minLength:4,
    maxLength:12,
    required:true,
},
  email:{
    type:String,
    required:true,
},
  name:{
    type:String,
    required:true,
},
  password:{
    type:String,
    required:true,
},
  add_info: {
    type:Boolean, default:false
},
  date: {
    type: Date,
    default: Date.now
} 
});

module.exports = mongoose.model('User', userSchema);