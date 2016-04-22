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

//QUESTION CONTROLLER

//ANSWER FACTORY

//ANSWER CONTROLLER

