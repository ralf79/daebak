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

                var grid = new $window.Datatable();
                grid.init(options);
                var render = function(){
                    console.log('gridTable------------>>>>>>>>>');
                    var newurl = options.dataTable.ajax.url + '/' + options.dataTable.categories_id + '/' + options.dataTable.isall;
//                    console.log(options.dataTable);
                    grid.getDataTable().ajax.url(newurl).load();
                }
                scope.$watch(function() {
                    return options.dataTable.categories_id;
                    }, function(value){
                        console.log('------ gridTable watch options.data...... ' + value);
                        render();
                });
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

        .directive('ngComments', ['$compile','$window', function($compile,$window){
                return function(scope, element, attrs){
                    var options = {};
                    if(attrs.ngComments.length>0){
                        options = scope.$eval(attrs.ngComments);
                    }
//                    var data = options.data;

                    var render = function(data){
                        console.log('---------ngComments render ----------' + data );
                        var comment_html = [];
                        for(var k=0;data && k<data.length;k++){
                            var d = data[k];
                            comment_html.push(makeCommentHtml(d.nextlevel, d.idtree, d.parent, d.author, d.content, d.cdate, d.likecnt, d.hatecnt));
                            var nextlevel = parseInt(d.nextlevel);
                            console.log(nextlevel);
//                            if(nextlevel > -1){
                                comment_html.push(Array(nextlevel+2).join('</div></div>'));
//                            }
                        }
                        console.log('comment_html is '+ comment_html.join(""));
//                        element.replaceWith($compile( comment_html.join("") )(scope));
                        element.append($compile( comment_html.join("") )(scope));
                    }
                    var makeCommentHtml = function(nextlevel, idtree, parent, author, content, cdate, likecnt, hatecnt){
                        return ' <div class="media"> '+
                            ' <a href="#" class="pull-left"> '+
                            '     <img alt="" src="/static/assets/admin/layout2/img/avatar2.jpg" class="media-object"> '+
                            '     </a> '+
                            '     <div class="media-body"> '+
                            '     <h4 class="media-heading">'+ (nextlevel + '-' +idtree + '-' +parent) +' <span> '+cdate+' / <a href="#">Reply </a> </span> '+
                            '     </h4> '+
                            '     <p> '+ content + ' </p> ';
                    }

//                    var html = render(options.data);
                    console.log('---------- ngComments result html is ------------');
                    console.log(options.data);
                    scope.$watch(function(){
                        console.log('------ ngComments watch options.data...... ');
//                        console.log(JSON.stringify(options.data));
                        return JSON.stringify(options.data);
                    }, function(value){
                        render(options.data);
                    });
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
