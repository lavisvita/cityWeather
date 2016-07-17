var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CitiesSchema = new Schema({
    title: String
});

var Cities = mongoose.model('CitiesSchema', CitiesSchema);
module.exports = Cities;