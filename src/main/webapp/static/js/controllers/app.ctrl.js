/**
 * Created by system on 2014. 5. 14..
 */
angular.module('MyApp.ctrl',[])

    .controller('AppCtrl', ['$location', '$scope', function($location, $scope) {
        $scope.current_path = '#' + $location.url();
    }])
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, items){
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('UserCtrl', ['$location', '$scope','$routeParams','$appUser', '$Base64',
        function($location, $scope, $routeParams, $user, $Base64){
            console.log('UserCtrl started....');
            // $scope.user = {};
            $scope.email = 'a1234@airplug.com';
            $scope.password = '12345';

            var prevurl = $routeParams.prevurl;
            prevurl = '/index'
            console.log(prevurl)
            $scope.user = $user.isLogined().user;

            $scope.submit = function(){
                if($scope.email && $scope.password){
                    var promise = $user.login($scope.email, $scope.password);
                    promise.then(function(data){
                        $scope.user = data;
                        if($scope.user){
                            console.log();
                            $location.path(prevurl);
                        }
                    });
                }
            };

            $scope.logout = function(){
                if($user.logout()){
                    $location.path('/login');
                }
            };
        }])

;