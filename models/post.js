const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
   content: String,
   createdAt: Date,
   author: {
       type: Schema.Types.ObjectId,
       ref: 'user'
   } 
});

module.exports = mongoose.model('Post', postSchema);