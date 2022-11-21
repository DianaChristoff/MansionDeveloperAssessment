const mongoose = require ('mongoose');

const bonusCodeSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    bonus_code: {
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BonusCode', bonusCodeSchema);