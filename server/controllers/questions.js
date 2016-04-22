var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {
    index: function(req, res){
        Question.find({}, function(err, questions){
            if(err){
                res.json(err);
            }
            else if(questions.lenfth < 1){
                res.json("No questions yet!");
            }
            else{
                res.json(questions);
            }
        });
    },

    create: function(req, res){
        console.log(req.body);
        Question.findOne({question: req.body.question}, function(err, question){
            if(err){
                res.json(err);
            }
            else if(question){
                    res.json("Question already exists!");
            }
            
            else {
                User.findOne({_id:req.body._user}, function(err, user){
                    var question = new Question(req.body);
                    //refer to user
                    question._user = req.body._user;
                    user.questions.push(question);

                    //save the question
                    question.save(function(err, question){
                        if(err){
                            res.json(err);
                        }
                        else{
                            console.log("Saving question...");
                            user.save(function(err){
                                if(err){
                                    res.json(err)
                                }
                                else{
                                    res.json(question)
                                }
                            })
                        }
                    });
                });
            }
        });
    },

    show: function(req, res){
        Question.findOne({_id:req.params.id}).populate('answers').exec(function(err, question){
            if(err){
                res.json(err);
            }
            else{
                res.json(question);
            }
        })
    }


};
