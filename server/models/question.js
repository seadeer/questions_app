var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = new mongoose.Schema({
    question: String,
    description: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

var Question = mongoose.model('Question', QuestionSchema);
