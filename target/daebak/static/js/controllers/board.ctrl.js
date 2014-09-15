/**
 * Created by system on 2014. 9. 9..
 */
angular.module('MyApp.board.ctrl',[])
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, data){
        $scope.editedItem = data.editedItem;
        $scope.save = function(){
            $modalInstance.close($scope.editedItem);
        };
        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        }; // end of cancel
        $scope.delete = function(){
            $scope.editedItem.modalcmd = 'delete';
            $modalInstance.close($scope.editedItem);
        }
    })
    .controller('BoardAddCtrl', ['$location', '$scope', '$modal', '$boardService','$routeParams', function($location, $scope, $modal, $boardService,$routeParams) {
        console.log('BaordWriteCtrl.....');

    }])
    .controller('BoardViewCtrl', ['$location', '$scope', '$modal', '$boardService','$routeParams', function($location, $scope, $modal, $boardService,$routeParams) {
        $scope.$routeParams = $routeParams;
        $scope.board={};
        $scope.board.commentsOption = {};
        $scope.board.id = $routeParams.id;
        console.log('$scope.detail : ' + $scope.board.id);
        var pp = $boardService.view([],'/'+$scope.board.id);
//        $scope.board.content = "";
//        $scope.board.title = "";
//        $scope.board.author = "";
//        $scope.board.cdate = "";

        pp.then(function(data) {
            console.log(data);
            var detail = data.board;
            $scope.board.content = detail.content;
            $scope.board.title = detail.title;
            $scope.board.author = detail.author;
            $scope.board.cdate = detail.cdate;

            $scope.board.commentsOption.data = data.comments;

            console.log($scope.board);
        });
    }])
    .controller('BoardListCtrl', ['$location', '$scope', '$modal', '$boardService', function($location, $scope, $modal, $boardService) {
        $scope.current_path = '#' + $location.url();
        $scope.editedItem = {};
        $scope.board_id = 1;
        $scope.categoriesOption = {};
        var ipromise = $boardService.boardInfo([], '/'+$scope.board_id);
        ipromise.then(function(data){
            $scope.categoriesOption.data = data.categories;
        });
//        $scope.tableOptions.categories_id = -1;
//        $scope.tableOptions.isall = 1;

        $scope.tableOptions =
        { // here you can define a typical datatable settings from http://datatables.net/usage/options
            "lengthMenu": [
                [10, 20, 50, 100, 150, -1],
                [10, 20, 50, 100, 150, "All"] // change per page values here
            ],
            "pageLength": 10, // default record count per page
            "ajax": {
                "url": "/api/v1.0/board/list", // ajax source
                "type":"GET"
            },
            "order": [
                [1, "asc"] // set first column as a default sort by asc,
            ],
            "categories_id":-1,
            "isall":1
        }

        $scope.move = function(categories_id, isall){
            console.log('$scope.move---------->>>>>>>>>' + categories_id + ':' +isall);
            $scope.tableOptions.isall = isall;
            $scope.tableOptions.categories_id = categories_id;

        }

    }])
;
