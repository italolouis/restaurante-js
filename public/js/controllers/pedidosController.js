angular.module('restaurante', [])
 .controller('pedidosController', ['$scope', '$http', '$window', function($scope, $http, $window) {

     $scope.pedidos =  getProdutos();

    function getProdutos() {
        $http({
            method:'GET',
            url:'http://localhost:8080/pedidos'})
            .success(function(data){
                $scope.pedidos = data;
        });
    }
}]);
