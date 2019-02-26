
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const BSchema   = new Schema({
	amount: String,
    cardNumber: String,
    month: String,
    year: String,
 
});

module.exports = mongoose.model('User', BSchema);
