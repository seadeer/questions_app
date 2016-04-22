var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {
    create: function(req, res){
        console.log(req.body);
        User.findOne({_id: req.body.user_id}, function(err, user){
            var answer = new Answer(req.body);
            answer._user = user._id;
            user.answers.push(answer);
            answer.save(function(err){
                user.save(function(err){
                    if(err){
                        res.json(err)
                    }
                    else{
                        Question.findOne({_id:req.body.question_id}, function(err, question){
                            answer._question = question._id;
                            question.answers.push(answer);
                            question.save(function(err){
                                if(err){
                                    res.json(err)
                                }
                                else{
                                    res.json("Success!")
                                }
                            });
                        })
                    }
                });
            });
        });
    },

    like: function(req, res){
        console.log(req.body);
        var likes = req.body.likes
        Answer.findByIdAndUpdate(req.params.id, {$set: {likes: likes}}, function(err, answer){
            if(err){
                res.json(err)
            }
            else{
                res.json(answer)
            }
        })
    },
};
