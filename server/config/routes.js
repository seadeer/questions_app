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
};
