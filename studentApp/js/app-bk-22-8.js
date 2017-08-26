var app = angular.module('myApp',['ngRoute','firebase']);

// configure our routes

   app.config(function($routeProvider,$locationProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mainCtrl'
            })

            // route for the signin page
            .when('/signin', {
                templateUrl : 'pages/signin.html',
                controller  : 'signinCtrl'
            })

            // route for the signup page
            .when('/signup', {
                templateUrl : 'pages/signup.html',
                controller  : 'signupCtrl'
            })
       
            // route for the dashboard page
            .when('/dashboard', {
                templateUrl : 'pages/dashboard.html',
                controller  : 'dashboardCtrl'
            })
       
            .otherwise({
                redirectTo: '/home'
            });
       
    $locationProvider.hashPrefix('!');
       
    });

// controller 

   app.controller('mainCtrl', function($scope) {
        $scope.messageHead = 'Sign up and sign in using fireBase';
       $scope.messageSub = 'Demo Projects';
    });

    app.controller('signinCtrl', function($scope,$firebaseAuth,$location,userService) {
             
        $scope.username = userService.getUser();
        
        if($scope.username) {
         $location.path('/dashboard');
           }
        
        $scope.signIn = function() {

            var username = $scope.user.email;
            var password = $scope.user.password;
            
            var auth = $firebaseAuth();
            
            auth.$signInWithEmailAndPassword(username, password).then(function(user){
                console.log(user.uid);
//                userService.getUser($scope.user.email);
                $location.path('/dashboard');
                
            }).catch(function(error) {
                console.log(error);
            });
            
        };
        
         var auth = $firebaseAuth();
        
         auth.$onAuthStateChanged(function(firebaseUser) {
             if(firebaseUser) {
                 console.log('signed in as:',firebaseUser.uid);
             } else {
                 console.log('signed out!')
             }
         });
        
    });

      app.service('userService',function($location,$firebaseAuth) {
          
          var user = '';
           var auth = $firebaseAuth();
          
          return {
              getUser : function() {
              if(user == "") {
              user = localStorage.getItem('userEmail');
                }
          return user;
          },
              setUser : function() {
                  user = localStorage.setItem('userEmail',value);
                  user = value;
                  
              } 
          };
          
        
    });


    app.controller('signupCtrl', function($scope,$firebaseAuth) {
       
        $scope.signUp = function() {
            
              var username = $scope.user.email;
            var password = $scope.user.password;
            
            var auth = $firebaseAuth();
            
               auth.$createUserWithEmailAndPassword(username, password).then(function(user){
                console.log(user.uid);
            }).catch(function(error) {
                console.log(error);
            });
            
            
        };
        
        
    });

  

    app.controller('dashboardCtrl', function($scope,$firebaseAuth,$location,userService) {
       
        $scope.username = userService.getUser();
        
        if(!$scope.username) {
         $location.path('/home');
           }
        
    });