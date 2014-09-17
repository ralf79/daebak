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
    .controller('BoardAddCtrl', ['$location', '$scope', '$modal','$fileService', '$boardService','$routeParams', function($location, $scope, $modal, $fileService, $boardService, $routeParams) {
        console.log('BaordWriteCtrl.....');
        $scope.editedItem = {};
        $scope.editedItem.title = '';
        $scope.board_id = 1;
        $scope.editedItem.categories_id = '-1';
        $scope.summernote = {};
        $scope.categoriesOption = {};
        var ipromise = $boardService.boardInfo([], '/'+$scope.board_id);
        ipromise.then(function(data){
            $scope.categoriesOption.data = data.categories;
        });

        $scope.summerOptions = {
            height: 300,
            focus: true,
            oninit:function(){
                console.log('Summernote is launched');
            },
            onImageUpload: function(files, editor, $editable) {
                console.log('image upload:', files, editor, $editable);
                $fileService.saveImage(files[0], editor, $editable);
            },
            onpaste: function(e){
                console.log('Called event paste');
            },
            setSummernode: function(summer){
                $scope.summernote = summer;
            }

        };
        $scope.addBoard = function(){
            var q = $scope.editedItem;
            q.id = 0;
            q.content = $scope.summernote.code();
            q.author = "test";
            console.log(q);
            var pp = $boardService.add(q, '');
            pp.then(function(data){
                console.log('------------- addBoard result is ');
                console.log(data);
                if(data.success == '200'){
                    $location.path('/board/list');
                }
            });

        }

        $scope.moveList = function(){
            $location.path('/board/list');
        }


    }])
    .controller('BoardViewCtrl', ['$location', '$scope', '$modal', '$boardService','$routeParams', function($location, $scope, $modal, $boardService,$routeParams) {
        $scope.$routeParams = $routeParams;
        $scope.board={};
        $scope.board_id = 1;
        $scope.board.commentsOption = {};
        $scope.board.id = $routeParams.id;
        console.log('$scope.detail : ' + $scope.board.id);
        var pp = $boardService.view([],'/'+$scope.board.id);

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

        $scope.tableOptions =
        {
            "lengthMenu": [
                [10, 20, 50, 100],
                [10, 20, 50, 100] // change per page values here
            ],
            "pageLength": 20, // default record count per page
            "ajax": {
                "base_url":"/api/v1.0/board/list/:categories_id/:isall",
                "url": "" , // ajax source
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
