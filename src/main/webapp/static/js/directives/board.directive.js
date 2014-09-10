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

                } // end of else
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

                };// end of options
                var grid = new $window.Datatable();
                grid.init(options);

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
