/**
 * Created by system on 2014. 5. 14..
 */
angular.module('MyApp.user.ctrl',[])

    .controller('UsersCtrl', ['$location', '$scope','$routeParams','$User',
        function($location, $scope, $routeParams, $user) {
            console.log('------- start DataSetsCtrl Control -------');
            $scope.user_lists    = [];

            $scope.printUser = function(){
                var promise = $user.get();
                promise.then(function(data){
                    $scope.user_lists = data;
                });

            }
            $scope.printUser();
            console.log('------- start DataSetsCtrl Control -------');

        }])
