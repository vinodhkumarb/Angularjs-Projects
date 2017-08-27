var app = angular.module('personalInfo',[]);

// controller

app.controller('personalCtrl', function ($scope,$http) {


  $http.get("json/test.json")
            .then(function (response) {
                $scope.info = response.data;
            });
    


});
