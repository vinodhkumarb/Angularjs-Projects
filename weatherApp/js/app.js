var app = angular.module('weatherApp',[]);

// controller

app.controller('weatherCtrl', function ($scope, $http, $log) {


    $scope.$watch('search', function () {
        fetch();
    });

    $scope.search = "";

    function fetch() {
        $http.get("http://api.openweathermap.org/data/2.5/find?q=" + $scope.search + "&type=like&mode=json&APPID=14076262f98221cb01c03772232a4082")
            .then(function (response) {
                $scope.details = response.data;
            },function(error) {
            console.log(error);
        });
    }


});
