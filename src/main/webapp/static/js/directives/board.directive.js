/**
 * Created by system on 2014. 5. 14..
 */
var module = angular.module('MyApp.board.directive', [])

        .directive('gridTable', ['$compile','$window', function($compile,$window){
            return function(scope, element, attrs){
                var tableOptions = {};
                if(attrs.gridTable.length>0){
                    tableOptions = scope.$eval(attrs.gridTable);
                } else {

                }

                var options = {
                    src: $(element),
                    onSuccess: function (grid) {
                        // execute some code after table records loaded
                    },
                    onError: function (grid) {
                        // execute some code on network or other general error
                    },
                    loadingMessage: 'Loading...',
                    dataTable: tableOptions

                };
                var isInitGrid = false;
                var grid = new $window.Datatable();
//                options.dataTable.ajax.url = options.dataTable.ajax.base_url.replace(':categories_id', options.dataTable.categories_id).replace(':isall', options.dataTable.isall);

                var render = function(){
                    options.dataTable.ajax.url = options.dataTable.ajax.base_url.replace(':categories_id', options.dataTable.categories_id).replace(':isall', options.dataTable.isall);
                    console.log(options.dataTable.ajax.url);
                    if(!isInitGrid){
                        grid.init(options);
                        isInitGrid = true;
                    }else{
                        grid.getDataTable().ajax.url(options.dataTable.ajax.url).load();
                    }

                }
                scope.$watch(function(){
                    return options.dataTable.categories_id;
                }, function(value){
                        console.log('------ gridTable watch options.data......>>' + value + '<<<');
                        if(angular.isDefined(value))
                            render();
                });
            };

        }])

        .directive('ngSummernote', ['$compile','$window', function($compile,$window){
            return function(scope, element, attrs){
                var summerOptions = {};
                if(attrs.ngSummernote.length>0){
                    summerOptions = scope.$eval(attrs.ngSummernote);
                } else {
                    summerOptions = {
                        height:300,
                        focus:true
                    }
                }
                var summernode = $(element).summernote(summerOptions);
                if(summerOptions.setSummernode)
                    summerOptions.setSummernode(summernode);

            };

        }])

        .directive('ngCategories', ['$compile','$window', function($compile,$window){
            return function(scope, element, attrs){
                var options = {};
                if(attrs.ngCategories.length>0){
                    options = scope.$eval(attrs.ngCategories);
                }

                var render = function(data){
                    var htmlarr = [];
                    for(var k=0;data && k<data.length;k++){
                        var d = data[k];
                        htmlarr.push('<div class="btn-group" style="padding-left:5px;"><a class="btn default yellow-stripe" ng-click="move('+ d.id+','+ d.isall+')"><span class="hidden-480">'+ d.name+'</span></a></div>');
                    }
                    element.append($compile( htmlarr.join("") )(scope));
                }
                scope.$watch(function(){
                    console.log('------ ngCategories watch options.data...... ');
                    return JSON.stringify(options.data);
                }, function(value){
                    render(options.data);
                });
            };

        }])

        .directive('ngCategoryList', ['$compile','$window', function($compile,$window){
            return function(scope, element, attrs){
                var options = {};
                if(attrs.ngCategoryList.length>0){
                    options = scope.$eval(attrs.ngCategoryList);
                }

                var render = function(data){
                    var htmlarr = [];
                    for(var k=0;data && k<data.length;k++){
                        var d = data[k];
//                        htmlarr.push('<div class="btn-group" style="padding-left:5px;"><a class="btn default yellow-stripe" ng-click="move('+ d.id+','+ d.isall+')"><span class="hidden-480">'+ d.name+'</span></a></div>');
                        if(d.isall == '0')
                            htmlarr.push('<option value="'+ d.id+'">'+ d.name+'</option>');
                    }
                    element.append($compile( htmlarr.join("") )(scope));
                }
                scope.$watch(function(){
//                    console.log('------ ngCategoryList watch options.data...... ');
//                    console.log(JSON.stringify(options.data));
                    return JSON.stringify(options.data);
                }, function(value){
                    render(options.data);
                });
            };

        }])
        .directive('ngComments', ['$compile','$window', function($compile,$window){
                return function(scope, element, attrs){
                    var options = {};
                    if(attrs.ngComments.length>0){
                        options = scope.$eval(attrs.ngComments);
                    }
//                    var data = options.data;

                    var render = function(data){
                        element.empty();
                        console.log('---------ngComments render ----------' + data );
                        var comment_html = [];
                        for(var k=0;data && k<data.length;k++){
                            var d = data[k];
                            comment_html.push(makeCommentHtml(d.nextlevel, d.idtree, d.parent, d.author, d.content, d.cdate, d.likecnt, d.hatecnt, d.id));
                            var nextlevel = parseInt(d.nextlevel);
                            console.log(nextlevel);
//                            if(nextlevel > -1){
                                comment_html.push(Array(nextlevel+2).join('</div></div>'));
//                            }
                        }
                        console.log('comment_html is '+ comment_html.join(""));
                        element.append($compile( comment_html.join("") )(scope));
                    }
                    var makeCommentHtml = function(nextlevel, idtree, parent, author, content, cdate, likecnt, hatecnt, id){
                        return '<div class="media"> '+
                            '<a href="#" class="pull-left"> '+
                            '<img alt="" src="/static/assets/admin/layout2/img/avatar2.jpg" class="media-object"> '+
                            '</a> '+
                            '<div class="media-body"> '+
                            '<h4 class="media-heading">'+ (nextlevel + '-' +idtree + '-' +parent) +' <span> '+cdate+' / <a href="" ng-click="post_reply('+id+')">Reply </a>  / <a href="" ng-click="post_edit(\''+parent+'\',\''+id+'\',\''+content+'\',\''+author+'\')">Edit </a></span> '+
                            '</h4> '+
                            '<div id="_comment_'+id+'" ><p> '+ content + ' </p></div>';
                    }

//                    var html = render(options.data);
                    console.log('---------- ngComments result html is ------------');
                    console.log(options.data);
                    scope.$watch(function(){
                        console.log('------ ngComments watch options.data...... ');
                        console.log(JSON.stringify(options.data));
                        return JSON.stringify(options.data);
                    }, function(value){
                        render(options.data);
                    });
                };
           }])

        .directive('ngCommentAdd', ['$compile','$window', function($compile,$window){
            return function(scope, element, attrs){
                var render = function(){
                    var _html_ = makeCommentHtml();
                    console.log('---------ngCommentAdd render ----------' );
                    console.log(_html_);
                    console.log('---------ngCommentAdd render ----------' );
                    element.replaceWith($compile( _html_ )(scope));
                }
                var makeCommentHtml = function(){
                    // return  '<textarea class="col-md-10 form-control" rows="8" ng-model="editedItem.comment.content"></textarea><button class="margin-top-20 btn blue" type="submit" ng-click="post_save()">Post a Comment</button>'
                    return '<div class="post-comment" id="_post_add__"> '+
                        '<h3>Leave a Comment</h3> '+
                        '<div class="form-group"> '+
                        '<label class="control-label">Message <span class="required"> * </span> '+
                        '</label> '+
                        '<textarea class="col-md-10 form-control" rows="8" ng-model="editedItem.comment.content"></textarea> '+
                        '</div> '+
                        '<button class="margin-top-20 btn blue" type="submit" ng-click="post_save()">Post a Comment</button> '+
                        '</div>';
                };

                render();
            };
        }])
        .directive('ngCommentEdit', ['$compile','$window', function($compile,$window){
            return function(scope, element, attrs){

                var render = function(){
                    var _html_ = makeCommentHtml();
                    console.log('---------ngCommentEdit render ----------' );
                    console.log(_html_);
                    console.log('---------ngCommentEdit render ----------' );
                    element.replaceWith($compile( _html_ )(scope));
                }
                var makeCommentHtml = function(){
                    return  '<textarea class="col-md-10 form-control" rows="8" ng-model="editedItem.comment.content"></textarea><button class="margin-top-20 btn blue" type="submit" ng-click="post_save()">Post a Comment</button>'
                };
                render();
            };
        }])
        .directive('ngConfirmClick', [
            function(){
                return {
                    link: function (scope, element, attr) {
                        var msg = attr.ngConfirmClick || "Are you sure?";
                        var clickAction = attr.confirmedClick;
                        element.bind('click',function (event) {
                            if ( window.confirm(msg) ) {
                                scope.$eval(clickAction)
                            }
                        });
                    }
                };
            }])
    ;
