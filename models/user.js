const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

module.exports = mongoose.model('User', userSchema);