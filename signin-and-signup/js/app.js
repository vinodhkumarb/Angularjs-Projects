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
                userService.setUser($scope.user.email);
                $location.path('/dashboard');
                 $scope.errMsg = false;
            }).catch(function(error) {
                console.log(error);
                $scope.errMsg = true;
                $scope.errMessage = error.message;
            });
            
        };
        
         var auth = $firebaseAuth();
        
         auth.$onAuthStateChanged(function(firebaseUser) {
             if(firebaseUser) {
                 console.log('signed in as:',firebaseUser.uid);
             } else {
                 console.log('signed out')
             }
         });
        
    });


    app.controller('signupCtrl', function($scope,$firebaseAuth,$location) {
       
        $scope.signUp = function() {
            
              var username = $scope.user.email;
            var password = $scope.user.password;
            
            var auth = $firebaseAuth();
            
               auth.$createUserWithEmailAndPassword(username, password).then(function(user){
                console.log(user.uid);
                   
                   alert('You have successfully registered go to sign in page');
                   
                   $location.path('/home');
                       $scope.errMsg = false;
            }).catch(function(error) {
                console.log(error);
                   $scope.errMsg = true;
                $scope.errMessage = error.message;
            });
            
            
        };
        
        
    });

  
    app.controller('dashboardCtrl', function($scope,$firebaseAuth,$location,userService) {
       
         $scope.username = userService.getUser();
        
        if(!$scope.username) {
         $location.path('/home');
           }
        
        
        $scope.logOut = function() {
            userService.logoutUser();
            alert('You have successfully logged out!');
        }
    });


// service

 app.service('userService',function($location,$firebaseAuth) {
          
          var user = '';
           var auth = $firebaseAuth();
          
          return {
              getUser: function() {
              if(user == "") {
              user = localStorage.getItem('userEmail');
                }
          return user;
          },
              setUser: function(value) {
                  user = localStorage.setItem('userEmail',value);
                  user = value;   
              },
              logoutUser: function() {
                  auth.$signOut().then(function(){
                      user = "";
                      localStorage.removeItem('userEmail');
                      localStorage.clear();
                      $location.hash('/home');
                     
                  })
                  .catch(function(error){
                      console.log(error)
                  })
              }
          }
          
        
    });
