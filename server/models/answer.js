var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AnswerSchema = new mongoose.Schema({

    answer: String,
    details: String,
    likes: Number,
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

var Answer = mongoose.model('Answer', AnswerSchema);
