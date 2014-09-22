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
    .controller('BoardEditCtrl', ['$location', '$scope', '$modal','$fileService', '$boardService','$routeParams', function($location, $scope, $modal, $fileService, $boardService, $routeParams) {
        console.log('BaordEditCtrl.....');
        $scope.editedItem = {};
        $scope.editedItem.title = '';
        $scope.board_id = 1;
        $scope.editedItem.categories_id = '-1';
        $scope.summernote = {};
        $scope.categoriesOption = {};
        $scope.editedItem.id = $routeParams.id;

        var ipromise = $boardService.boardInfo([], '/'+$scope.board_id);
        ipromise.then(function(data){
            $scope.categoriesOption.data = data.categories;
        });
        var pp = $boardService.view([],'/'+$scope.editedItem.id);

        pp.then(function(data) {
            console.log(data);
            var detail = data.board;
//            $scope.editedItem.content = detail.content;
            $scope.editedItem.id = detail.id;
            $scope.editedItem.title = detail.title;
            $scope.editedItem.author = detail.author;
            $scope.editedItem.cdate = detail.cdate;
            $scope.summernote.code(detail.content);
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

        $scope.save= function(){
            var q = $scope.editedItem;
//            q.id = 0;
            q.content = $scope.summernote.code();
            q.author = "test";
            var pp = $boardService.edit(q, '');
            pp.then(function(data){
                if(data.success == '200'){
                    $location.path('/board/list');
                }
            });

        }

        $scope.list = function(){
            $location.path('/board/list');
        }


    }])
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
        $scope.save = function(){
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

        $scope.list = function(){
            $location.path('/board/list');
        }


    }])

    .controller('BoardViewCtrl', ['$location', '$scope', '$modal', '$boardService','$commentService','$routeParams', function($location, $scope, $modal, $boardService, $commentService, $routeParams) {
        $scope.board={};
        $scope.board_id = 1;
        $scope.board.commentsOption = {};
        $scope.$routeParams = $routeParams;
        $scope.board.id = $routeParams.id;

        $scope.commentAddOptions = {};

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

        $scope.delete = function(){
            // authority check
            var q = $scope.board;
            delete q.commentsOption;
            
            var pp = $boardService.delete(q,'');
            pp.then(function(data){
                console.log('------------- delete result is ');
                console.log(data);
                if(data.success == '200'){
                    $location.path('/board/list');
                }
            });
        };

        $scope.edit = function(){
            console.log('$scope.edit');
            // authority check
            $location.path('/board/edit/'+$scope.board.id);

        };

        $scope.list = function(){
            console.log('$scope.list');
            // authority check
            $location.path('/board/list');

        };

        $scope.showpostinsert = true;
        $scope.comment = {};
        $scope.comment.board_id = $scope.board.id;
//        $scope.post_add = function(parent){
//
//        };

        $scope.post_edit = function(parent, id, content, author){
            $scope.comment.id = id;
            $scope.comment.content = content;
            $scope.comment.author = author;
//            $scope.commentAddOptionsforEdit.data = {'status':'1'};
            $('#_comment_'+id).replaceWith('<div class="post-comment" ng-comment-add="commentAddOptions">');
        };

        $scope.post_save = function(parent, id){
            var q = $scope.comment;
            if(!angular.isDefined(parent)){
                q.parent = 0
            }else{
                q.parent = parent;
            }
            if(!angular.isDefined(id)){
                q.id = 0
            }else{
                q.id = id;
            }

            var pp = $commentService.add(q,'');
            pp.then(function(data){
                if(data.success = '200'){
                    $scope.board.commentsOption.data = data.comments;
                }
            });
        };

        $scope.post_delete = function(id){
            var q = $scope.comment;
            q.id = id;
            var pp = $commentService.edit(q,'');
            pp.then(function(data){
                if(data.success = '200'){
                    $scope.board.commentsOption.data = data.comments;
                    $scope.comment = {};
                }
            });
        };
        $scope.post_reply = function(id){
            var nextid = $('#_comment_'+id).next().attr('id');
            if(nextid != '_post_add__'){
//                $scope.commentAddOptionsforReply.data = {'status':'1'};
                $('#_comment_'+id).after('<div class="post-comment" ng-comment-add="commentAddOptions">');
            }
        }

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
