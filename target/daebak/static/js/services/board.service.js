/**
 * Created by system on 2014. 9. 9..
 */
angular.module('MyApp.board.service', [])

    .factory('$boardService', function($q, $http, $window, $baseService, $remoteurl){
        var obj = Object.create($baseService);
        var appUrl = $remoteurl.get('/api/v1.0/board');
        var keyPrefix = 'board-'
        obj.set(appUrl, keyPrefix);
        console.log('after creation $boardService url is ' + obj.getUrl());

        obj.boardInfo = function(q, suffix){
            var method = 'GET';
            var that = this;
            var deferred = $q.defer();
            var url = this.appUrl + '/info' + (angular.isDefined(suffix)?suffix:'');
            console.log('Object url is ' + url);

            that.query(q, url, method, function(q, data){
                console.log(that.keyPrefix + ' get success ');
                console.log(data);
                console.log('--------------------------');
                deferred.resolve(data);
            }, function(q){
                console.log(that.keyPrefix + ' get failure error q is ' + q);
            });

            return deferred.promise;
        }
        return obj;
    })

;