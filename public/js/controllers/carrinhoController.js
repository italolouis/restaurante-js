angular.module('restaurante', [])
 .controller('carrinhoController', ['$scope', '$http', '$window', function($scope, $http, $window) {

     $scope.produtos =  getProdutos();

    function getProdutos() {
        $http({
            method:'GET',
            url:'http://localhost:8080/itens'})
            .success(function(data){
                $scope.produtos = data;
        });
    }

    $scope.totalPedido = calculaTotalPedido();

     function calculaTotalPedido(){
         $scope.produtos
     }

     $scope.confirmarPedido = function() {
         var data = {
             cliente: $scope.nomeCliente,
             valor : $scope.totalPedido
         };

         $http({
             method:'POST',
             url:' http://localhost:8080/pedidos',
             data: JSON.stringify(data)})
             .success(function(data){
                 $window.alert("Pedido Criado");
                 $scope.produtos = [];
                 $scope.nomeCliente = undefined;
                 $scope.totalPedido = undefined;
             });

     };

     $scope.$watch("produtos",function(newValue,oldValue){
         calculaTotal();
     });

     $scope.$watch("produtos.values",function(newValue,oldValue){
         calculaTotal();
     });

     function calculaTotal(){
         var soma = 0;
         angular.forEach($scope.produtos, function(produto) {
             var valor = produto.preco * produto.quantidade;
             soma = soma + valor;
         });
         $scope.totalPedido = soma;
     }

     $scope.excluirItem = function(produto) {
         var data = {
             id: produto.id
         };
         $http({
             method:'DELETE',
             url:'http://localhost:8080/itens',
             data: JSON.stringify(data)})
             .success(function(data){
                 $window.alert("Produto excluido");
                 $scope.produtos = [];
                 getProdutos();
             });
     }

     $scope.adicionarQuantidade = function(row) {
         calculaTotal();
     };


}]);
