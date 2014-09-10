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
    .controller('BoardViewCtrl', ['$location', '$scope', '$modal', '$boardService','$routeParams', function($location, $scope, $modal, $boardService,$routeParams) {
        $scope.$routeParams = $routeParams;
        $scope.board={};
        $scope.board.id = $routeParams.id;
        console.log('$scope.detail : ' + $scope.board.id);
        var pp = $boardService.view([],'/'+$scope.board.id);
//        $scope.board.content = "";
//        $scope.board.title = "";
//        $scope.board.author = "";
//        $scope.board.cdate = "";

        pp.then(function(data) {
            console.log(data);
            $scope.board.content = data.content;
            $scope.board.title = data.title;
            $scope.board.author = data.author;
            $scope.board.cdate = data.cdate;
            console.log($scope.board);
        });
    }])
    .controller('BoardListCtrl', ['$location', '$scope', '$modal', '$boardService', function($location, $scope, $modal, $boardService) {
        $scope.current_path = '#' + $location.url();
        $scope.editedItem = {};
        var editDlg;
        $scope.detail = function(id){
            console.log('$scope.detail : ' + id);
            var pp = $boardService.view([],'/'+id);
            pp.then(function(data){
                console.log(data);
                $scope.editedItem.title = data.title;
                $scope.editedItem.content = data.content;
                $scope.editedItem.author = data.author;
                editDlg = $dialogs.create(CONFIG.preparePartialTemplateUrl('board-view'), 'ModalInstanceCtrl', {editedItem:$scope.editedItem}, {key:false, back:'static'});
                editDlg.result.then(function(editedItem){
                    console.log('modal result is -------');
                    console.log(editedItem);
//                    if(!_.isUndefined(editedItem.modalcmd) && editedItem.modalcmd == 'delete'){
//                        $scope.delete();
//                    }else{
//                        $scope.editedItem = editedItem;
//                        $scope.save();
//                    }
                });

            });
        }

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
                [1, "asc"]
            ] // set first column as a default sort by asc
        }

    }])
;
