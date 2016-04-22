var users = require('../controllers/users');
var questions = require('../controllers/questions');
var answers = require('../controllers/answers');

module.exports = function(app){
    app.get('/', function(req, res){
        console.log("Hello, the app is working!");
    });

    app.get('/logout', function(req, res){
        console.log('logged out');
    });

    app.post('/login', function(req, res){
        users.login(req, res);
    });

    app.post('/questions/new', function(req, res){
        questions.create(req, res);
    });

    app.get('/questions', function(req, res){
        questions.index(req, res);
    });

    app.get('/questions/:id', function(req, res){
        questions.show(req, res);
    });

    app.post('/answers/new', function(req, res){
        answers.create(req, res);
    })

    app.post('/answers/:id', function(req, res){
        answers.like(req, res)
    })
};
