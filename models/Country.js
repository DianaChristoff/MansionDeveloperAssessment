const mongoose = require ('mongoose');

const countrySchema = new mongoose.Schema({
    country_id:{
        type:Number,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Country', countrySchema);