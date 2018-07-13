var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    description: String,
    user:String,
    path: String,
    isSave: Boolean
})

module.exports = mongoose.model('Post', PostSchema);