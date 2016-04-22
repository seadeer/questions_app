var questionsApp = angular.module('questionsApp', ['ngRoute', 'ngStorage']);

//CONFIG
questionsApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })

    .when('/login', {
        templateUrl: 'partials/login.html'
    })

    .when('/home', {
        templateUrl: 'partials/questions.html'
    })

    .when('/questions/new', {
        templateUrl: 'partials/newquestion.html'
    })

    .when('/logout', {
        redirectTo: '/login'
    })

    .when('/questions/:id/newanswer', {
        templateUrl: 'partials/newanswer.html'
    })

    .when('/questions/:id', {
        templateUrl: 'partials/showquestion.html'
    })

    .otherwise({
        redirectTo: '/home'
    })

})
//USER FACTORY
questionsApp.factory('userFactory', function($http, $sessionStorage){
    var factory = {};
    //initialize session storing user
    $sessionStorage.currUser;

    //get user name from db or create new user, store in session
    factory.login = function(newUser, callback){
        console.log("user logging in", newUser)
        $http.post('/login', newUser).success(function(output){
            $sessionStorage.currUser = output;
            console.log($sessionStorage.currUser);
            callback(output);
        });
    }

    factory.logout = function(callback){
        console.log("logged out!");
        $sessionStorage.$reset();
        $sessionStorage.currUser = {};
        callback();
    };

    factory.user = function(){
        return $sessionStorage.currUser;
    };

    return factory;
})

//USER CONTROLLER
questionsApp.controller('usersController', function(userFactory, $location){
    var that = this;
    this.error = ''
    this.user = userFactory.user()
    
    this.login = function(){
        if(typeof(that.newUser) != 'undefined' && that.newUser.name.length >= 3){
        userFactory.login(that.newUser, function(data){
            that.newUser = data;

            $location.url('/home');
        });
    }
    else{
        that.error = "User name should be longer than 3 characters!"
    }
    };



    this.logout = function(){
        console.log(that.user);
        userFactory.logout(function(){
            that.user = {};
            $location.url('/login');
        });
    };

})


//QUESTION FACTORY
questionsApp.factory('questionFactory', function($http){
    var factory = {};
    factory.questions = {};

    factory.index = function(callback){
        $http.get('/questions').success(function(output){
            factory.questions = output;
            callback(factory.questions);
        })
    };

    factory.create = function(question, callback){
        console.log("Sending this off to db", question);
        $http.post('/questions/new', question).success(function(output){
            callback(output)
        })
    }

    return factory;
})
//QUESTION CONTROLLER
questionsApp.controller('questionsController', function(userFactory, questionFactory, $location){
    var that = this;
    this.questions = [];
    this.user = userFactory.user();
    this.errors = [];

    this.index = function(){
        questionFactory.index(function(data){
            if(data){
                that.questions = data;
            }
        });
    };

    this.index();

    this.create = function(){
        that.errors = [];
        //Question validations
        console.log(that.newQuestion);
        if(typeof that.newQuestion.question !== 'undefined'){
            if(that.newQuestion.question.length < 10){
                that.errors.push("Question too short!")
            }
        }
        else{
            that.errors.push("Empty question!")
        }
        console.log("Error check: ", that.errors);
        //If no errors, send off to factory
        if(that.errors.length <= 0){
            console.log("Creating new question, validations passed!")
            var question = {
                question: that.newQuestion.question,
                description: that.newQuestion.description,
                _user: that.user._id
            };
            console.log(question)
            questionFactory.create(question, function(data){
                console.log(data);
                that.newQuestion = {};
            });
            $location.url('/home');
            that.index();
        }
    };

    this.logout = function(){
        console.log(that.user);
        userFactory.logout(function(){
            $location.url('/login');
            that.user = {};
        });
    };

})
//ANSWER FACTORY

//ANSWER CONTROLLER

