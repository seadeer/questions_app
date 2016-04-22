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
            $session.storage.currUser = output;
            console.log($sessionStorage.currUser);
            callback(output);
        });
    }
})

//USER CONTROLLER

//QUESTION FACTORY

//QUESTION CONTROLLER

//ANSWER FACTORY

//ANSWER CONTROLLER

