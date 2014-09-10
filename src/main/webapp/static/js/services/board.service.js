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
        return obj;
    })

;