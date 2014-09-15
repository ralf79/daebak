angular.module('MyApp.user.service', [])

    .factory('$User', ['$q', '$http', '$window', '$baseService','$remoteurl', function($q, $http, $window, $baseService, $remoteurl){
        var obj = Object.create($baseService);
        var appUrl = $remoteurl.get('/api/v1.0/user');
        var keyPrefix = 'user-'
        obj.set(appUrl, keyPrefix);
        console.log('after creation $User url is ' + obj.getUrl());
        return obj;

    }])