angular.module('restaurante', [])
 .controller('produtosController', ['$scope', '$http', '$window', function($scope, $http, $window) {

     $scope.categorias =  getCategorias();

    function getCategorias() {
        $http({
            method:'GET',
            url:'http://tecprime.com.br/api/categories'})
            .success(function(data){
                $scope.categorias = data;
        });
    }

     $scope.getProdutos = function() {
         $http({
             method:'POST',
             url:'http://tecprime.com.br/api/products',
             data: {'category': $scope.categorias.value}})
             .success(function(data){
                 $scope.produtos = [];
                 var _data = data;
                 angular.forEach(_data, function(produto) {
                     var _produto = produto;
                     _produto.quantidade = 1;
                     $scope.produtos.push(_produto);
                 });
             });
     };

     $scope.adicionarItem = function(produto) {
         var data = {
             produtoId : produto.id,
             nome : produto.nome,
             preco : produto.preco,
             categoriaId: produto.categoria_id,
             quantidade: produto.quantidade,
             status : "ADICIONANDO"
         };

         $http({
             method:'POST',
             url:' http://localhost:8080/itens/',
             data: JSON.stringify(data)})
             .success(function(data){
                 $window.alert("Produto adicionado");
             });

     };

}]);
