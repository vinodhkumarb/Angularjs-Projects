var app = angular.module('myApp',['ngRoute','firebase']);

// configure our routes

   app.config(function($routeProvider,$locationProvider) {
        $routeProvider
 
            // route for the student page
            .when('/', {
                templateUrl : 'pages/students.html',
                controller  : 'studentCtrl'
            })
            
            // route for the add student page
            .when('/add-student', {
                templateUrl : 'pages/add-student.html',
                controller  : 'addStudentCtrl'
            })
       
            // route for the add student page
            .when('/edit-student/:id', {
                templateUrl : 'pages/edit-student.html',
                controller  : 'editStudentCtrl'
            })
       
            .otherwise({
                redirectTo: '/'
            });
       
    $locationProvider.hashPrefix('!');
       
    });

    // controller 

    app.controller('studentCtrl', function($scope,$firebaseArray) {
     
        
        $scope.msg1 = false;
        
         var ref = firebase.database().ref("students");
		$scope.data = $firebaseArray(ref);
        
        $scope.deleteStudent = function(info) {
    
            $scope.data.$remove(info).then(function(ref){
                $scope.msg1 = "student delete successfully !";
                window.setTimeout(function() {
                    $scope.$apply(function() {
                          $scope.msg1 = false;
                    })
                },2000);
                console.log(info);
            },
                function(error) {
                console.log(error);
            })
        }
        
        
    });

    app.controller('addStudentCtrl', function($scope,$firebaseArray) {
       
            $scope.msg2 = false;
        
        $scope.addStudent = function() {
            

          var ref = firebase.database().ref("students");
		$firebaseArray(ref).$add($scope.student)
           .then(
			function(ref){
                 $scope.student.name = "";
				$scope.student.department = "";
				$scope.student.year = "";
                $scope.msg2 = "student added successfully !";
                 window.setTimeout(function() {
                    $scope.$apply(function() {
                          $scope.msg2 = false;
                    })
                },2000);
                },
                    function(error) {
                        console.log(error);
                    }
            )
            
        }
        
    });

    app.controller('editStudentCtrl', function($scope,$firebaseArray,$firebaseObject,$routeParams) {
     
         $scope.msg3 = false;
        
         var id = $routeParams.id;
      var ref = firebase.database().ref("students/"+id);
        
        $scope.student = $firebaseObject(ref);
       
        
        $scope.editStudent = function(id) {
               var ref = firebase.database().ref("students/"+id);
            console.log(id);
            
             ref.update({
                 name : $scope.student.name,
                department : $scope.student.department,
                year : $scope.student.year
             })
            .then(function(ref){
                  $scope.student.name = "";
				$scope.student.department = "";
				$scope.student.year = "";
                 
                   $scope.msg3 = "student updated successfully !";
                  window.setTimeout(function() {
                    $scope.$apply(function() {
                        
                    })
                },100);
                 window.setTimeout(function() {
                    $scope.$apply(function() {
                          $scope.msg3 = false;
                    })
                },2000);
                 
             },function(error) {
                  console.log(error);
             })
        }
        
    })


